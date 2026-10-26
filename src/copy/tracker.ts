import { logger } from '../utils/logger';
import { config } from '../config';
import { shortenAddress } from '../utils/helpers';
import type { TrackedTrader, TradeEvent } from './types';

export class TraderTracker {
  private traders: Map<string, TrackedTrader> = new Map();
  private onTradeCallbacks: Array<(event: TradeEvent) => void> = [];

  constructor() {
    for (const address of config.copyTrading.trackedWallets) {
      this.addTrader(address);
    }
    logger.info(`Tracker initialized with ${this.traders.size} tracked wallets`);
  }

  addTrader(address: string, alias?: string): void {
    this.traders.set(address.toLowerCase(), {
      address: address.toLowerCase(),
      alias,
      winRate: 0,
      totalTrades: 0,
      pnl: 0,
      followSince: Date.now(),
    });
    logger.info(`Now tracking trader: ${alias || shortenAddress(address)}`);
  }

  removeTrader(address: string): void {
    this.traders.delete(address.toLowerCase());
    logger.info(`Stopped tracking: ${shortenAddress(address)}`);
  }

  onTrade(callback: (event: TradeEvent) => void): void {
    this.onTradeCallbacks.push(callback);
  }

  async startMonitoring(): Promise<void> {
    // TODO: Implement real-time monitoring via:
    // - Polymarket WebSocket feed for trade events
    // - Polling CLOB API for position changes
    // - On-chain event monitoring via ethers.js

    logger.info('Starting trade monitoring...');
    logger.warn('Monitoring not yet implemented — will use polling as fallback');
  }

  async stopMonitoring(): Promise<void> {
    logger.info('Stopping trade monitoring...');
  }

  getTrackedTraders(): TrackedTrader[] {
    return Array.from(this.traders.values());
  }
}
