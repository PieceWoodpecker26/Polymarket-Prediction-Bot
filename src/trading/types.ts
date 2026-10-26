export interface TradeOrder {
  marketId: string;
  tokenId: string;
  side: 'BUY' | 'SELL';
  price: number;
  size: number;
  source: 'ai' | 'copy' | 'manual';
}

export interface TradeResult {
  orderId: string;
  status: 'filled' | 'partial' | 'rejected' | 'pending';
  filledSize: number;
  avgPrice: number;
  timestamp: number;
}

export interface RiskCheck {
  approved: boolean;
  reason?: string;
  adjustedSize?: number;
}
