import { type RawDatas } from "@/utils/dataDescription";
import {
	type computedRatios,
	computeAverageGrowth,
	computeAverage,
} from "@/services/computer";

export interface grading_numbers {
	ROIC1Y: number;
	ROIC5Y: number;
	grossMargin: number;
	operatingMargin: number;
	netMargin: number;
	FCFMargin: number;
	capexOCF: number;
	revenueGrowth1Y: number;
	revenueGrowth5Y: number;
	FCFGrowth1Y: number;
	FCFGrowth5Y: number;
	EPSGrowth1Y: number;
	EPSGrowth5Y: number;
	totalDebtEBITDA: number;
	payoutRatio: number;
	weightedAverageShsOutGrowth: number;
	grade: number;
	maxGrade: number;
}

export const computeGrade = async (
	data: RawDatas,
	ratios: computedRatios,
): Promise<grading_numbers> => {
	let grade = 0;
	let maxGrade = 0;
	/* Rentabilité */
	const ROIC1Y = Math.round(ratios.ROICs[0] * 100);
	const ROIC5Y = computeAverage(ratios.ROICs);
	maxGrade += 2;
	if (ROIC1Y >= 20) {
		grade += 1;
	} else if (ROIC1Y >= 10) {
		grade += 0.5;
	}
	if (ROIC5Y >= 20) {
		grade += 1;
	} else if (ROIC5Y >= 10) {
		grade += 0.5;
	}
	/* Profits */
	const grossMargin = computeAverage(ratios.grossMargins);
	const operatingMargin = computeAverage(ratios.operatingMargins);
	const netMargin = computeAverage(ratios.netMargins);
	const FCFMargin = computeAverage(ratios.FCFMargins);
	const capexOCF = computeAverage(ratios.capexOCFs);
	maxGrade += 5;
	if (grossMargin >= 50) {
		grade += 1;
	} else if (grossMargin >= 30) {
		grade += 0.5;
	}
	if (operatingMargin >= 20) {
		grade += 1;
	} else if (operatingMargin >= 10) {
		grade += 0.5;
	}
	if (netMargin >= 20) {
		grade += 1;
	} else if (netMargin >= 10) {
		grade += 0.5;
	}
	if (FCFMargin >= 15) {
		grade += 1;
	} else if (FCFMargin >= 7) {
		grade += 0.5;
	}
	if (capexOCF <= 20) {
		grade += 1;
	} else if (capexOCF <= 40) {
		grade += 0.5;
	}
	/* Growth */
	const revenueGrowth1Y =
		Math.round((data[0][0].revenue / data[0][1].revenue) * 100) - 100;
	const revenueGrowth5Y = computeAverageGrowth(
		data[0].map((item) => item.revenue),
	);
	const FCFGrowth1Y =
		Math.round((data[2][0].freeCashFlow / data[2][1].freeCashFlow) * 100) - 100;
	const FCFGrowth5Y = computeAverageGrowth(
		data[2].map((item) => item.freeCashFlow),
	);
	const EPSGrowth1Y = Math.round((data[0][0].eps / data[0][1].eps) * 100) - 100;
	const EPSGrowth5Y = computeAverageGrowth(data[0].map((item) => item.eps));
	maxGrade += 6;
	if (revenueGrowth1Y >= 10) {
		grade += 1;
	} else if (revenueGrowth1Y >= 5) {
		grade += 0.5;
	}
	if (FCFGrowth1Y >= 10) {
		grade += 1;
	} else if (FCFGrowth1Y >= 5) {
		grade += 0.5;
	}
	if (EPSGrowth1Y >= 10) {
		grade += 1;
	} else if (EPSGrowth1Y >= 5) {
		grade += 0.5;
	}
	if (EPSGrowth5Y >= 10) {
		grade += 1;
	} else if (EPSGrowth5Y >= 5) {
		grade += 0.5;
	}
	if (revenueGrowth5Y >= 10) {
		grade += 1;
	} else if (revenueGrowth5Y >= 5) {
		grade += 0.5;
	}
	if (FCFGrowth5Y >= 10) {
		grade += 1;
	} else if (FCFGrowth5Y >= 5) {
		grade += 0.5;
	}
	/* Financial Health */
	const totalDebtEBITDA = ratios.totalDebtEBITDA;
	maxGrade += 2;
	if (totalDebtEBITDA <= 1.5) {
		grade += 2;
	} else if (totalDebtEBITDA <= 3) {
		grade += 1;
	}
	/* Shareholder Friendliness */
	const payoutRatio = Math.round(ratios.payoutRatios[4] * 100) / 100;
	const weightedAverageShsOutGrowth = ratios.weightedAverageShsOutGrowth;
	maxGrade += 2;
	if (payoutRatio < 0.3 && payoutRatio > 0.1) {
		grade += 1;
	} else if (payoutRatio < 0.1) {
		grade += 0.5;
	}
	if (weightedAverageShsOutGrowth < 0) {
		grade += 1;
	}
	const grading_numbers = {
		ROIC1Y: ROIC1Y,
		ROIC5Y: ROIC5Y,
		grossMargin: grossMargin,
		operatingMargin: operatingMargin,
		netMargin: netMargin,
		FCFMargin: FCFMargin,
		capexOCF: capexOCF,
		revenueGrowth1Y: revenueGrowth1Y,
		revenueGrowth5Y: revenueGrowth5Y,
		FCFGrowth1Y: FCFGrowth1Y,
		FCFGrowth5Y: FCFGrowth5Y,
		EPSGrowth1Y: EPSGrowth1Y,
		EPSGrowth5Y: EPSGrowth5Y,
		totalDebtEBITDA: totalDebtEBITDA,
		payoutRatio: payoutRatio,
		weightedAverageShsOutGrowth: weightedAverageShsOutGrowth,
		grade: grade,
		maxGrade: maxGrade,
	};
	return grading_numbers;
};
