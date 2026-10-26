import { logger } from '../utils/logger';
import { config } from '../config';
import { formatUSD, shortenAddress } from '../utils/helpers';
import { TraderTracker } from './tracker';
import type { TradeEvent } from './types';

export class TradeMirror {
  private tracker: TraderTracker;
  private isRunning = false;

  constructor(tracker: TraderTracker) {
    this.tracker = tracker;

    this.tracker.onTrade((event) => {
      this.handleTradeEvent(event);
    });

    logger.info('Trade Mirror engine initialized');
  }

  async start(): Promise<void> {
    this.isRunning = true;
    await this.tracker.startMonitoring();
    logger.info('Copy trading engine started');
  }

  async stop(): Promise<void> {
    this.isRunning = false;
    await this.tracker.stopMonitoring();
    logger.info('Copy trading engine stopped');
  }

  private async handleTradeEvent(event: TradeEvent): Promise<void> {
    if (!this.isRunning) return;

    const scaledSize = (event.size * config.copyTrading.copyPercentage) / 100;

    if (scaledSize > config.copyTrading.maxPositionSize) {
      logger.warn(
        `Trade size ${formatUSD(scaledSize)} exceeds max position size, capping at ${formatUSD(config.copyTrading.maxPositionSize)}`,
      );
    }

    const copySize = Math.min(scaledSize, config.copyTrading.maxPositionSize);

    logger.info(
      `Mirroring trade from ${shortenAddress(event.trader)}: ` +
        `${event.side} ${formatUSD(copySize)} on ${event.marketId}`,
    );

    // TODO: Execute the mirrored trade via PolymarketClient.placeLimitOrder()
    // TODO: Add slippage protection
    // TODO: Add retry logic with exponential backoff
  }
}
