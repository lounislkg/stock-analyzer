import { type RawDatas } from "@/utils/dataDescription";

export type valuationRatios = {
	FCF_per_share: number;
	price_to_FCF: number;
	PEratio: number;
	FCFGrowth: number;
	year: string;
}[];

export type computedRatios = {
	ROCEs: { date: string; value: number }[];
	ROICs: number[];
	grossMargins: number[];
	operatingMargins: number[];
	netMargins: number[];
	capexOCFs: number[];
	FCFMargins: number[];
	payoutRatios: number[];
	netDebtFCF: number;
	totalDebtEBITDA: number;
	weightedAverageShsOutGrowth: number;
	currentYield: number;
};
export const computeRatios = async (
	data: RawDatas,
): Promise<computedRatios> => {
	/* Calcul des ROCE */
	const ROCEs = [];
	const EBITs = [];
	for (let i = 0; i < 5; i++) {
		const EBIT = data[0][i].ebitda + data[0][i].depreciationAndAmortization;
		let capitalEmployed;
		const capitalEmployedThisYear =
			data[1][i].totalAssets - data[1][i].totalCurrentLiabilities;
		if (i === 4) {
			capitalEmployed = capitalEmployedThisYear;
		} else {
			const capitalEmployedLastYear =
				data[1][i + 1].totalAssets - data[1][i + 1].totalCurrentLiabilities;
			capitalEmployed = (capitalEmployedThisYear + capitalEmployedLastYear) / 2;
		}
		const ROCE = EBIT / capitalEmployed;
		ROCEs.push({ date: data[0][i].calendarYear, value: ROCE });
		EBITs.push(EBIT);
	}
	/* Calcul des ROIC */
	const ROICs = [];
	for (let i = 0; i < 5; i++) {
		const taxRate = data[0][i].incomeTaxExpense / data[0][i].incomeBeforeTax;
		const NOPAT = EBITs[i] * (1 - taxRate);
		let investedCapital;
		const investedCapitalThisYear = data[1][i].totalEquity + data[1][i].netDebt;
		const investedCapitalNWC =
			data[1][i].netReceivables +
			data[1][i].inventory +
			data[1][i].otherCurrentAssets -
			data[1][i].accountPayables -
			data[1][i].otherCurrentLiabilities;

		if (i === 4) {
			investedCapital = investedCapitalThisYear;
		} else {
			const investedCapitalLastYear =
				data[1][i + 1].totalEquity + data[1][i + 1].netDebt;
			investedCapital = (investedCapitalThisYear + investedCapitalLastYear) / 2;
		}

		const ROIC = NOPAT / investedCapital;
		ROICs.push(ROIC);
	}
	/* Calcul des Gross Margins */
	const grossMargins = [];
	for (let i = 0; i < 5; i++) {
		const grossMargin = data[0][i].grossProfit / data[0][i].revenue;
		grossMargins.push(grossMargin);
	}
	/* Calcul des Operating Margins */
	const operatingMargins = [];
	for (let i = 0; i < 5; i++) {
		const operatingMargin = data[0][i].operatingIncome / data[0][i].revenue;
		operatingMargins.push(operatingMargin);
	}
	/* Calcul des Net Margins */
	const netMargins = [];
	for (let i = 0; i < 5; i++) {
		const netMargin = data[0][i].netIncome / data[0][i].revenue;
		netMargins.push(netMargin);
	}
	/* Calcul des %capex/OCF */
	const capexOCFs = [];
	for (let i = 0; i < 5; i++) {
		const capexOCF =
			Math.abs(data[2][i].capitalExpenditure) / data[2][i].operatingCashFlow;
		capexOCFs.push(capexOCF);
	}
	/* Calcul des FCF Margin */
	const FCFMargins = [];
	for (let i = 0; i < 5; i++) {
		const FCFMargin = data[2][i].freeCashFlow / data[0][i].revenue;
		FCFMargins.push(FCFMargin);
	}
	/* Payout Ratio */
	const payoutRatios = [];
	for (let i = 0; i < 5; i++) {
		const payoutRatio =
			Math.abs(data[2][i].dividendsPaid) / data[0][i].netIncome;
		payoutRatios.push(payoutRatio);
	}
	/* Yield */
	const currentYield = data[2][0].dividendsPaid / data[4].marketCapitalization;
	/* Net Debt / FCF */
	const netDebtFCF =
		Math.round((data[1][0].netDebt / data[2][0].freeCashFlow) * 100) / 100;
	/* Total Debt / EBIDTA */
	const totalDebtEBITDA =
		Math.round((data[1][0].totalDebt / data[0][0].ebitda) * 100) / 100;
	/* number of shares */
	const firstWeightedAverageShsOut =
		data[0][data[0].length - 1].weightedAverageShsOut;
	const lastWeightedAverageShsOut = data[0][0].weightedAverageShsOut;
	const weightedAverageShsOutGrowth =
		Math.round(
			(lastWeightedAverageShsOut / firstWeightedAverageShsOut - 1) * 100 * 100,
		) / 100;

	const ratios: computedRatios = {
		ROCEs,
		ROICs,
		grossMargins,
		operatingMargins,
		netMargins,
		capexOCFs,
		FCFMargins,
		payoutRatios,
		currentYield,
		netDebtFCF,
		totalDebtEBITDA,
		weightedAverageShsOutGrowth,
	};
	return ratios;
};

export const computeValuationRatio = async (
	data: RawDatas,
): Promise<valuationRatios> => {
	const valuationRatios = [];
	for (let i = 0; i < data[0].length; i++) {
		const FCF_per_share =
			Math.round(
				(data[2][i].freeCashFlow / data[0][i].weightedAverageShsOut) * 100,
			) / 100;
		let FCFGrowth;
		if (i === 4) {
			FCFGrowth = 0;
		} else {
			FCFGrowth =
				Math.round(
					(data[2][i].freeCashFlow / data[2][i + 1].freeCashFlow - 1) * 10000,
				) / 100;
		}
		let price_to_FCF;
		let PEratio;
		if (i === 0 && data[5] === undefined) {
			price_to_FCF = Math.round((data[3].c / FCF_per_share) * 100) / 100;
			PEratio = Math.round((data[3].c / data[0][0].eps) * 100) / 100;
		} else {
			if (data[5] !== undefined) {
				price_to_FCF =
					Math.round(data[5][i].priceToFreeCashFlowsRatio * 100) / 100;
				PEratio = Math.round(data[5][i].priceEarningsRatio * 100) / 100;
			} else {
				price_to_FCF = 0;
				PEratio = 0;
			}
		}
		const year = data[0][i].calendarYear;
		valuationRatios.push({
			FCF_per_share,
			price_to_FCF,
			PEratio,
			FCFGrowth,
			year,
		});
	}
	return valuationRatios;
};

export const computeAverageGrowth = (datas: number[]) => {
	const growths = [];
	datas.reverse();

	for (let i = 1; i < datas.length; i++) {
		const growth = (datas[i] / datas[i - 1] - 1) * 100;
		growths.push(growth);
	}
	let sum = 0;
	for (let i = 0; i < growths.length; i++) {
		sum += growths[i];
	}

	return Math.round((sum / growths.length) * 100) / 100;
};

export const computeAverage = (datas: number[]) => {
	let sum = 0;
	for (let i = 0; i < datas.length; i++) {
		sum += datas[i];
	}
	return Math.round((sum / datas.length) * 10000) / 100;
};
