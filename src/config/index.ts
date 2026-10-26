import dotenv from 'dotenv';

dotenv.config();

export const config = {
  polymarket: {
    apiUrl: process.env.POLYMARKET_API_URL || 'https://clob.polymarket.com',
    wsUrl: process.env.POLYMARKET_WS_URL || 'wss://ws-subscriptions-clob.polymarket.com/ws',
  },

  wallet: {
    privateKey: process.env.PRIVATE_KEY || '',
    rpcUrl: process.env.RPC_URL || 'https://polygon-rpc.com',
  },

  ai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: process.env.AI_MODEL || 'gpt-4',
  },

  copyTrading: {
    trackedWallets: (process.env.TRACKED_WALLETS || '').split(',').filter(Boolean),
    copyPercentage: Number(process.env.COPY_PERCENTAGE) || 50,
    maxPositionSize: Number(process.env.MAX_POSITION_SIZE) || 100,
  },

  risk: {
    maxDailyLoss: Number(process.env.MAX_DAILY_LOSS) || 500,
    maxSingleTrade: Number(process.env.MAX_SINGLE_TRADE) || 200,
    stopLossPercentage: Number(process.env.STOP_LOSS_PERCENTAGE) || 10,
  },

  logLevel: process.env.LOG_LEVEL || 'info',
} as const;
