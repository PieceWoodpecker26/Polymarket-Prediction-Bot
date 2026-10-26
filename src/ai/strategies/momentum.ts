import { logger } from '../../utils/logger';
import type { MarketSignal } from '../types';
import type { Market, Trade } from '../../api/types';

export class MomentumStrategy {
  readonly name = 'momentum';

  async analyze(market: Market, recentTrades: Trade[]): Promise<MarketSignal | null> {
    // TODO: Implement momentum-based trading strategy
    // - Analyze recent trade volume and price movement
    // - Detect trending markets with increasing volume
    // - Generate signals based on momentum indicators

    logger.info(`[Momentum] Analyzing market: ${market.question}`);

    if (recentTrades.length < 10) return null;

    const buyVolume = recentTrades
      .filter((t) => t.side === 'BUY')
      .reduce((sum, t) => sum + t.size, 0);

    const sellVolume = recentTrades
      .filter((t) => t.side === 'SELL')
      .reduce((sum, t) => sum + t.size, 0);

    const totalVolume = buyVolume + sellVolume;
    if (totalVolume === 0) return null;

    const buyPressure = buyVolume / totalVolume;
    const direction = buyPressure > 0.6 ? 'BUY' : buyPressure < 0.4 ? 'SELL' : null;

    if (!direction) return null;

    return {
      marketId: market.id,
      direction,
      confidence: Math.abs(buyPressure - 0.5) * 2,
      reasoning: `Momentum detected: ${(buyPressure * 100).toFixed(1)}% buy pressure`,
      strategy: this.name,
      suggestedSize: 10,
      suggestedPrice: market.outcomePrices[0] ?? 0.5,
    };
  }
}
