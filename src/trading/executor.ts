import { logger } from '../utils/logger';
import { formatUSD } from '../utils/helpers';
import { PolymarketClient } from '../api/polymarket';
import { RiskManager } from './risk';
import type { TradeOrder, TradeResult } from './types';

export class TradeExecutor {
  private client: PolymarketClient;
  private risk: RiskManager;

  constructor(client: PolymarketClient) {
    this.client = client;
    this.risk = new RiskManager();
    logger.info('Trade executor initialized');
  }

  async execute(order: TradeOrder): Promise<TradeResult | null> {
    const riskCheck = this.risk.checkTrade(order);

    if (!riskCheck.approved) {
      logger.warn(`Trade rejected by risk manager: ${riskCheck.reason}`);
      return null;
    }

    const size = riskCheck.adjustedSize ?? order.size;

    logger.info(
      `Executing ${order.source} trade: ${order.side} ${formatUSD(size)} @ ${order.price} on ${order.marketId}`,
    );

    try {
      const orderId = await this.client.placeLimitOrder({
        tokenId: order.tokenId,
        side: order.side,
        price: order.price,
        size,
      });

      return {
        orderId,
        status: 'pending',
        filledSize: 0,
        avgPrice: order.price,
        timestamp: Date.now(),
      };
    } catch (error) {
      logger.error(`Trade execution failed: ${error}`);
      return null;
    }
  }
}
