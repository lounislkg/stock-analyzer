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
## 📝 Acknowledgments & Credits
The analysis is based on the methodologies of **IQ Invest** and **Guillaume**, two financial youtubers who prioritize different metrics in their evaluations.

## 📊 Data Used
The analysis is based on quantitative data and considers several evaluation axes:
### 1️⃣ **Profitability (Return on Capital)**
- **ROIC (Return on Invested Capital)**
  - **1 Year**: `>= 20% → +1 | >= 10% → +0.5 | < 10% → 0`
  - **5 Years**: `>= 20% → +1 | >= 10% → +0.5 | < 10% → 0`
- **ROCE (Return on Capital Employed)** - Total assets - Short-term debt

### 2️⃣ **Profitability**
- **Gross Margin** `(Revenue - Cost of production)`
  - `>= 50% → +1 | >= 30% → +0.5 | < 30% → 0`
- **Operating Margin** `(Gross Profits - Operating Costs)`
  - `>= 20% → +1 | >= 10% → +0.5 | < 10% → 0`
- **Net Margin** `(Operating Profits - Taxes, Interest, Depreciation & Amortization)`
  - `>= 20% → +1 | >= 10% → +0.5 | < 10% → 0`
- **FCF Margin** (Free Cash Flow / Revenue)
  - `>= 15% → +1 | >= 7% → +0.5 | < 7% → 0`
- **Capex/Operating Cash Flows** `(FCF/OCF - Capex expenditures)`
  - `<= 20% → +1 | <= 40% → +0.5 | > 40% → 0`

### 3️⃣ **Growth**
- **Revenue Growth (1 Year & 5 Years)**
  - `>= 10% → +1 | >= 5% → +0.5 | < 5% → 0`
- **FCF Growth (1 Year & 5 Years)**
  - `>= 10% → +1 | >= 5% → +0.5 | < 5% → 0`
- **EPS Growth (1 Year & 5 Years)**
  - `>= 10% → +1 | >= 5% → +0.5 | < 5% → 0`

### 4️⃣ **Debt**
- **Total Debt/EBITDA**
  - `<= 1.5 → +1 | <= 3 → +0.5 | > 3 → 0`
- **Payout Ratio**
  - `< 30% and > 10% → +1 | < 10% → +0.5 | > 30% → 0`
- **Outstanding Shares Growth**
  - `< 0 → +1`

## 🏆 Scoring System
Each company is rated according to a **point system** based on the above criteria.

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


