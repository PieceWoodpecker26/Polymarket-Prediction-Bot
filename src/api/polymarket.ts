import axios, { AxiosInstance } from 'axios';
import { config } from '../config';
import { logger } from '../utils/logger';
import type { Market, OrderBook, Trade } from './types';

export class PolymarketClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.polymarket.apiUrl,
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' },
    });

    logger.info('Polymarket client initialized');
  }

  async getMarkets(limit = 50): Promise<Market[]> {
    // TODO: Implement market fetching from Polymarket CLOB API
    logger.info(`Fetching ${limit} markets...`);
    const response = await this.client.get('/markets', { params: { limit } });
    return response.data;
  }

  async getMarket(id: string): Promise<Market> {
    // TODO: Implement single market fetch
    logger.info(`Fetching market ${id}...`);
    const response = await this.client.get(`/markets/${id}`);
    return response.data;
  }

  async getOrderBook(tokenId: string): Promise<OrderBook> {
    // TODO: Implement order book fetching
    logger.info(`Fetching order book for ${tokenId}...`);
    const response = await this.client.get(`/book`, { params: { token_id: tokenId } });
    return response.data;
  }

  async getTradesForMarket(marketId: string): Promise<Trade[]> {
    // TODO: Implement trade history fetching
    logger.info(`Fetching trades for market ${marketId}...`);
    const response = await this.client.get(`/trades`, { params: { market: marketId } });
    return response.data;
  }

  async placeLimitOrder(params: {
    tokenId: string;
    side: 'BUY' | 'SELL';
    price: number;
    size: number;
  }): Promise<string> {
    // TODO: Implement order placement with wallet signing
    logger.info(`Placing ${params.side} order: ${params.size} @ ${params.price}`);
    throw new Error('Order placement not yet implemented — configure wallet first');
  }
}
