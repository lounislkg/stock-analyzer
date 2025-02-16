# Fundamental Analysis - Financial Evaluation Project

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


## 📌 Project Description
This project performs a fundamental analysis of companies by assigning a score based on various financial criteria. The objective is to provide an objective and comparative evaluation of companies based on their past and current performance.

## 📊 Data Used
The analysis is based on quantitative data and considers several evaluation axes:

### 1️⃣ **Profitability (Return on Capital)**
- **ROE (Return on Equity)** - Shareholders' equity
- **ROA (Return on Assets)** - Total assets
- **ROIC (Return on Invested Capital)** - Shareholders' equity + Long-term debt
  - IQ Invest: **ROIC** is considered the most conservative of the four
    - `>=20% → +1 | >=10% → +0.5 | <10% → 0`
- **ROCE (Return on Capital Employed)** - Total assets - Short-term debt
  - Guillaume uses **ROCE** as the primary indicator

### 2️⃣ **Profitability**
- **Gross Margin** `(Revenue - Cost of production)`
  - `>=50% → +1 | >=30% → +0.5 | <30% → 0`
- **Operating Margin** `(Gross Profits - Operating Costs)`
  - `>=20% → +1 | >=10% → +0.5 | <10% → 0`
- **Net Margin** `(Operating Profits - Taxes, Interest, Depreciation & Amortization)`
  - `>=20% → +1 | >=10% → +0.5 | <10% → 0`
- **Capex/Operating Cash Flows** `(FCF/OCF - Capex expenditures)`
  - `<=20% → +1 | <=40% → +0.5 | >40% → 0`
- **FCF Margin** (Free Cash Flow / Revenue)
  - IQ Invest uses the first four criteria
  - Guillaume prioritizes **FCF Margin**

### 3️⃣ **Growth**
- **Revenue Growth** (Revenue Per Share)
  - IQ Invest: `>=10% → +1 | >=5% → +0.5 | <5% → 0`
  - Guillaume: `>=10% → +1`
- **FCF Growth** (FCF Per Share)
  - IQ Invest: `>=10% → +1 | >=5% → +0.5 | <5% → 0`
  - Guillaume: `>=10% → +1`

### 4️⃣ **Debt**
- **Net Debt/FCF**
  - Lower is better (`<3` recommended)
- **Total Debt/EBITDA**
  - `<=1.5 → +1 | <=2.5 → +0.5 | >2.5 → 0`
- **Payout Ratio**
- **Evolution of Outstanding Shares**
  - Stable or decreasing (`=0 or negative` recommended)

### 5️⃣ **Company Valuation**
- **FCF / Shares**
- **FCF Growth**
- **Price to FCF Ratio**
  - Guillaume uses these three metrics for company valuation

## 🏆 Scoring System
Each company is rated according to a **point system** based on the above criteria.

## 📝 Acknowledgments & Credits
This project is inspired by the analysis methodologies of:
- **IQ Invest**, which prioritizes **ROIC**, **operating margins**, and **long-term growth**.
- **Guillaume**, who emphasizes **ROCE**, **FCF Margins**, and **valuation via FCF per share and Price to FCF**.

## 🚀 How to Contribute?
1. Clone the repository:
   ```sh
   git clone git@github.com:your_username/repository_name.git
   ```
2. Create a new branch:
   ```sh
   git checkout -b new_feature
   ```
3. Add your modifications:
   ```sh
   git add .
   ```
4. Commit your changes:
   ```sh
   git commit -m "Added a new metric for analysis"
   ```
5. Push your changes:
   ```sh
   git push origin new_feature
   ```
6. Create a **Pull Request** on GitHub 🚀

---

This project is under **active development**. Feel free to propose improvements or contribute! 📈

