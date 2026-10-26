export interface TrackedTrader {
  address: string;
  alias?: string;
  winRate: number;
  totalTrades: number;
  pnl: number;
  followSince: number;
}

export interface CopyTradeConfig {
  sourceTrader: string;
  copyPercentage: number;
  maxPositionSize: number;
  enabledMarkets: string[];
  blacklistedMarkets: string[];
}

export interface TradeEvent {
  trader: string;
  marketId: string;
  side: 'BUY' | 'SELL';
  outcome: string;
  price: number;
  size: number;
  timestamp: number;
  txHash: string;
}
