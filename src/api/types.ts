export interface Market {
  id: string;
  question: string;
  slug: string;
  outcomes: string[];
  outcomePrices: number[];
  volume: number;
  liquidity: number;
  endDate: string;
  active: boolean;
  category: string;
}

export interface OrderBook {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  spread: number;
}

export interface OrderBookEntry {
  price: number;
  size: number;
}

export interface Trade {
  id: string;
  marketId: string;
  side: 'BUY' | 'SELL';
  outcome: string;
  price: number;
  size: number;
  timestamp: number;
  trader: string;
}

export interface Position {
  marketId: string;
  outcome: string;
  size: number;
  avgPrice: number;
  currentPrice: number;
  pnl: number;
}
