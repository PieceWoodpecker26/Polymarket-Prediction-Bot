export interface MarketSignal {
  marketId: string;
  direction: 'BUY' | 'SELL';
  confidence: number;
  reasoning: string;
  strategy: string;
  suggestedSize: number;
  suggestedPrice: number;
}

export interface StrategyConfig {
  name: string;
  enabled: boolean;
  weight: number;
  params: Record<string, unknown>;
}

export interface AnalysisResult {
  market: string;
  signals: MarketSignal[];
  timestamp: number;
  overallSentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
}
