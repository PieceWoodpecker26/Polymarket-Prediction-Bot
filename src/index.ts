import { logger } from './utils/logger';
import { PolymarketClient } from './api/polymarket';
import { MarketAnalyzer } from './ai/analyzer';
import { TraderTracker } from './copy/tracker';
import { TradeMirror } from './copy/mirror';
import { TradeExecutor } from './trading/executor';

async function main() {
  logger.info('=== Polymarket AI Trading Bot ===');
  logger.info('Initializing modules...');

  const client = new PolymarketClient();
  const analyzer = new MarketAnalyzer(client);
  const tracker = new TraderTracker();
  const mirror = new TradeMirror(tracker);
  const executor = new TradeExecutor(client);

  logger.info('All modules initialized successfully');

  // AI Trading Mode
  logger.info('--- AI Market Scanner ---');
  const signals = await analyzer.scanMarkets(10);
  for (const result of signals) {
    logger.info(`Market: ${result.market} | Sentiment: ${result.overallSentiment}`);
    for (const signal of result.signals) {
      logger.info(
        `  Signal: ${signal.direction} (confidence: ${(signal.confidence * 100).toFixed(1)}%) — ${signal.reasoning}`,
      );
    }
  }

  // Copy Trading Mode
  logger.info('--- Copy Trading Engine ---');
  await mirror.start();

  logger.info(`Trade executor ready (source: ${executor ? 'active' : 'inactive'})`);
  logger.info('Bot is running. Press Ctrl+C to stop.');

  process.on('SIGINT', async () => {
    logger.info('Shutting down...');
    await mirror.stop();
    process.exit(0);
  });
}

main().catch((error) => {
  logger.error(`Fatal error: ${error}`);
  process.exit(1);
});
