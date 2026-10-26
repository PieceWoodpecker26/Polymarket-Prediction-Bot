import { logger } from '../utils/logger';
import { config } from '../config';
import { formatUSD } from '../utils/helpers';
import type { TradeOrder, RiskCheck } from './types';

export class RiskManager {
  private dailyLoss = 0;
  private dailyResetTime = 0;

  constructor() {
    this.resetDaily();
    logger.info('Risk manager initialized');
  }

  checkTrade(order: TradeOrder): RiskCheck {
    this.maybeResetDaily();

    if (order.size > config.risk.maxSingleTrade) {
      logger.warn(`Trade ${formatUSD(order.size)} exceeds single trade limit`);
      return {
        approved: true,
        reason: 'Size capped to max single trade limit',
        adjustedSize: config.risk.maxSingleTrade,
      };
    }

    if (this.dailyLoss >= config.risk.maxDailyLoss) {
      logger.error('Daily loss limit reached — all trades blocked');
      return { approved: false, reason: 'Daily loss limit reached' };
    }

    return { approved: true };
  }

  recordLoss(amount: number): void {
    this.dailyLoss += amount;
    logger.info(`Daily loss updated: ${formatUSD(this.dailyLoss)} / ${formatUSD(config.risk.maxDailyLoss)}`);
  }

  private maybeResetDaily(): void {
    if (Date.now() > this.dailyResetTime) {
      this.resetDaily();
    }
  }

  private resetDaily(): void {
    this.dailyLoss = 0;
    const tomorrow = new Date();
    tomorrow.setUTCHours(24, 0, 0, 0);
    this.dailyResetTime = tomorrow.getTime();
  }
}
