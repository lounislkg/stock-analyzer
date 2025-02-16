export type RawDatas = [
	Array<IncomeStatement>,
	Array<BalanceSheet>,
	Array<CashFlowStatement>,
	Price,
	Profile,
	Array<Ratios> | undefined,
];

export type Ratios = {
	symbol: string;
	date: string;
	calendarYear: string;
	period: string;
	currentRatio: number;
	quickRatio: number;
	cashRatio: number;
	daysOfSalesOutstanding: number;
	daysOfInventoryOutstanding: number;
	operatingCycle: number;
	daysOfPayablesOutstanding: number;
	cashConversionCycle: number;
	grossProfitMargin: number;
	operatingProfitMargin: number;
	pretaxProfitMargin: number;
	netProfitMargin: number;
	effectiveTaxRate: number;
	returnOnAssets: number;
	returnOnEquity: number;
	returnOnCapitalEmployed: number;
	netIncomePerEBT: number;
	ebtPerEbit: number;
	ebitPerRevenue: number;
	debtRatio: number;
	debtEquityRatio: number;
	longTermDebtToCapitalization: number;
	totalDebtToCapitalization: number;
	interestCoverage: number;
	cashFlowToDebtRatio: number;
	companyEquityMultiplier: number;
	receivablesTurnover: number;
	payablesTurnover: number;
	inventoryTurnover: number;
	fixedAssetTurnover: number;
	assetTurnover: number;
	operatingCashFlowPerShare: number;
	freeCashFlowPerShare: number;
	cashPerShare: number;
	payoutRatio: number;
	operatingCashFlowSalesRatio: number;
	freeCashFlowOperatingCashFlowRatio: number;
	cashFlowCoverageRatios: number;
	shortTermCoverageRatios: number;
	capitalExpenditureCoverageRatio: number;
	dividendPaidAndCapexCoverageRatio: number;
	dividendPayoutRatio: number;
	priceBookValueRatio: number;
	priceToBookRatio: number;
	priceToSalesRatio: number;
	priceEarningsRatio: number;
	priceToFreeCashFlowsRatio: number;
	priceToOperatingCashFlowsRatio: number;
	priceCashFlowRatio: number;
	priceEarningsToGrowthRatio: number;
	priceSalesRatio: number;
	dividendYield: number;
	enterpriseValueMultiple: number;
	priceFairValue: number;
};

export interface Profile {
	country: string; // Country code (e.g., "US")
	currency: string; // Currency used (e.g., "USD")
	estimateCurrency: string; // Estimated currency (e.g., "USD")
	exchange: string; // Stock exchange (e.g., "NASDAQ NMS - GLOBAL MARKET")
	finnhubIndustry: string; // Industry sector (e.g., "Technology")
	ipo: string; // IPO date in YYYY-MM-DD format
	logo: string; // URL to the company's logo
	marketCapitalization: number; // Market capitalization in million USD
	name: string; // Company name (e.g., "Apple Inc")
	phone: string; // Contact phone number
	shareOutstanding: number; // Number of shares outstanding
	ticker: string; // Stock ticker symbol (e.g., "AAPL")
	weburl: string; // Company's official website URL
}

export interface Price {
	c: number; // Current price
	d: number; // Daily change
	dp: number; // Daily change Percentage
	h: number; // High price
	l: number; // Low Price
	o: number; // Open price
	pc: number; // Previous close price
	t: number; // Time
}
export interface IncomeStatement {
	date: string; // e.g., "2024-09-28"
	symbol: string; // Stock ticker, e.g., "AAPL"
	reportedCurrency: string; // Currency, e.g., "USD"
	cik: string; // CIK number (Central Index Key), e.g., "0000320193"
	fillingDate: string; // e.g., "2024-11-01"
	acceptedDate: string; // e.g., "2024-11-01 06:01:36"
	calendarYear: string; // e.g., "2024"
	period: "FY" | "Q1" | "Q2" | "Q3" | "Q4"; // Fiscal Year or Quarter
	revenue: number; // Total revenue
	costOfRevenue: number;
	grossProfit: number;
	grossProfitRatio: number; // Percentage value (0-1)
	researchAndDevelopmentExpenses: number;
	generalAndAdministrativeExpenses: number;
	sellingAndMarketingExpenses: number;
	sellingGeneralAndAdministrativeExpenses: number;
	otherExpenses: number;
	operatingExpenses: number;
	costAndExpenses: number;
	interestIncome: number;
	interestExpense: number;
	depreciationAndAmortization: number;
	ebitda: number; // Earnings Before Interest, Taxes, Depreciation, and Amortization
	ebitdaratio: number; // EBITDA ratio (0-1)
	operatingIncome: number;
	operatingIncomeRatio: number;
	totalOtherIncomeExpensesNet: number;
	incomeBeforeTax: number;
	incomeBeforeTaxRatio: number;
	incomeTaxExpense: number;
	netIncome: number;
	netIncomeRatio: number;
	eps: number; // Earnings per share
	epsdiluted: number; // Diluted earnings per share
	weightedAverageShsOut: number; // Weighted average shares outstanding
	weightedAverageShsOutDil: number; // Diluted weighted average shares outstanding
	link: string; // SEC link
	finalLink: string; // Direct SEC document link
}

export interface BalanceSheet {
	date: string; // Report date (e.g., "2024-09-28")
	symbol: string; // Stock ticker (e.g., "AAPL")
	reportedCurrency: string; // Currency used in the report (e.g., "USD")
	cik: string; // Central Index Key (CIK) identifier (e.g., "0000320193")
	fillingDate: string; // Filing date (e.g., "2024-11-01")
	acceptedDate: string; // SEC acceptance date (e.g., "2024-11-01 06:01:36")
	calendarYear: string; // Fiscal year (e.g., "2024")
	period: "FY" | "Q1" | "Q2" | "Q3" | "Q4"; // Reporting period (Fiscal Year or Quarter)

	// Assets
	cashAndCashEquivalents: number;
	shortTermInvestments: number;
	cashAndShortTermInvestments: number;
	netReceivables: number;
	inventory: number;
	otherCurrentAssets: number;
	totalCurrentAssets: number;
	propertyPlantEquipmentNet: number;
	goodwill: number;
	intangibleAssets: number;
	goodwillAndIntangibleAssets: number;
	longTermInvestments: number;
	taxAssets: number;
	otherNonCurrentAssets: number;
	totalNonCurrentAssets: number;
	otherAssets: number;
	totalAssets: number;

	// Liabilities
	accountPayables: number;
	shortTermDebt: number;
	taxPayables: number;
	deferredRevenue: number;
	otherCurrentLiabilities: number;
	totalCurrentLiabilities: number;
	longTermDebt: number;
	deferredRevenueNonCurrent: number;
	deferredTaxLiabilitiesNonCurrent: number;
	otherNonCurrentLiabilities: number;
	totalNonCurrentLiabilities: number;
	otherLiabilities: number;
	capitalLeaseObligations: number;
	totalLiabilities: number;

	// Stockholders' Equity
	preferredStock: number;
	commonStock: number;
	retainedEarnings: number;
	accumulatedOtherComprehensiveIncomeLoss: number;
	othertotalStockholdersEquity: number;
	totalStockholdersEquity: number;
	totalEquity: number;
	totalLiabilitiesAndStockholdersEquity: number;
	minorityInterest: number;
	totalLiabilitiesAndTotalEquity: number;

	// Other financial metrics
	totalInvestments: number;
	totalDebt: number;
	netDebt: number;

	// SEC links
	link: string; // Link to the SEC filing index
	finalLink: string; // Direct link to the SEC report
}

export interface CashFlowStatement {
	date: string; // Report date (e.g., "2024-09-28")
	symbol: string; // Stock ticker (e.g., "AAPL")
	reportedCurrency: string; // Currency used in the report (e.g., "USD")
	cik: string; // Central Index Key (CIK) identifier (e.g., "0000320193")
	fillingDate: string; // Filing date (e.g., "2024-11-01")
	acceptedDate: string; // SEC acceptance date (e.g., "2024-11-01 06:01:36")
	calendarYear: string; // Fiscal year (e.g., "2024")
	period: "FY" | "Q1" | "Q2" | "Q3" | "Q4"; // Reporting period (Fiscal Year or Quarter)

	// Operating Activities
	netIncome: number;
	depreciationAndAmortization: number;
	deferredIncomeTax: number;
	stockBasedCompensation: number;
	changeInWorkingCapital: number;
	accountsReceivables: number;
	inventory: number;
	accountsPayables: number;
	otherWorkingCapital: number;
	otherNonCashItems: number;
	netCashProvidedByOperatingActivities: number;

	// Investing Activities
	investmentsInPropertyPlantAndEquipment: number;
	acquisitionsNet: number;
	purchasesOfInvestments: number;
	salesMaturitiesOfInvestments: number;
	otherInvestingActivites: number;
	netCashUsedForInvestingActivites: number;

	// Financing Activities
	debtRepayment: number;
	commonStockIssued: number;
	commonStockRepurchased: number;
	dividendsPaid: number;
	otherFinancingActivites: number;
	netCashUsedProvidedByFinancingActivities: number;

	// Cash & Cash Equivalents
	effectOfForexChangesOnCash: number;
	netChangeInCash: number;
	cashAtEndOfPeriod: number;
	cashAtBeginningOfPeriod: number;

	// Additional Metrics
	operatingCashFlow: number;
	capitalExpenditure: number;
	freeCashFlow: number;

	// SEC Links
	link: string; // Link to the SEC filing index
	finalLink: string; // Direct link to the SEC report
}
