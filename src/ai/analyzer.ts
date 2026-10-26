import { logger } from '../utils/logger';
import { PolymarketClient } from '../api/polymarket';
import { SentimentStrategy } from './strategies/sentiment';
import { MomentumStrategy } from './strategies/momentum';
import type { AnalysisResult, MarketSignal } from './types';

export class MarketAnalyzer {
  private sentiment: SentimentStrategy;
  private momentum: MomentumStrategy;
  private client: PolymarketClient;

  constructor(client: PolymarketClient) {
    this.client = client;
    this.sentiment = new SentimentStrategy();
    this.momentum = new MomentumStrategy();
    logger.info('Market Analyzer initialized with strategies: sentiment, momentum');
  }

  async analyzeMarket(marketId: string): Promise<AnalysisResult> {
    const market = await this.client.getMarket(marketId);
    const trades = await this.client.getTradesForMarket(marketId);

    const signals: MarketSignal[] = [];

    const sentimentSignal = await this.sentiment.analyze(market);
    if (sentimentSignal) signals.push(sentimentSignal);

    const momentumSignal = await this.momentum.analyze(market, trades);
    if (momentumSignal) signals.push(momentumSignal);

    const buySignals = signals.filter((s) => s.direction === 'BUY').length;
    const sellSignals = signals.filter((s) => s.direction === 'SELL').length;

    return {
      market: market.question,
      signals,
      timestamp: Date.now(),
      overallSentiment: buySignals > sellSignals ? 'BULLISH' : sellSignals > buySignals ? 'BEARISH' : 'NEUTRAL',
    };
  }

  async scanMarkets(limit = 20): Promise<AnalysisResult[]> {
    logger.info(`Scanning top ${limit} markets...`);
    const markets = await this.client.getMarkets(limit);
    const results: AnalysisResult[] = [];

    for (const market of markets) {
      try {
        const result = await this.analyzeMarket(market.id);
        if (result.signals.length > 0) {
          results.push(result);
        }
      } catch (error) {
        logger.warn(`Failed to analyze market ${market.id}: ${error}`);
      }
    }

    logger.info(`Found ${results.length} markets with signals`);
    return results;
  }
}
