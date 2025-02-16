import { computeAverage, computedRatios } from "@/services/computer";
import { RawDatas } from "@/utils/dataDescription";

export default function Grade(data: RawDatas, ratios: computedRatios) {
    let grade = 0;
    /* Rentabilité */
    const ROIC1Y = ratios.ROICs[0];
    const ROIC5Y = computeAverage(ratios.ROICs);
    if (ROIC1Y >= 20) {
        grade += 1;
    }
    else if (ROIC1Y >= 10) {
        grade += 0.5;
    }
    if (ROIC5Y >= 20) {
        grade += 1;
    }
    else if (ROIC5Y >= 10) {
        grade += 0.5;
    }
    /* Profits */
    const grossMargin = computeAverage(ratios.grossMargins)
    const operatingMargin = computeAverage(ratios.operatingMargins)
    const netMargin = computeAverage(ratios.netMargins)
    const FCFMargin = computeAverage(ratios.FCFMargins)
    const capexOCF = computeAverage(ratios.capexOCFs)
    if (grossMargin >= 50) {
        grade += 1;
    }
    else if (grossMargin >= 30) {
        grade += 0.5;
    }
    if (operatingMargin >= 20) {
        grade += 1;
    }
    else if (operatingMargin >= 10) {
        grade += 0.5;
    }
    if (netMargin >= 20) {
        grade += 1;
    }
    else if (netMargin >= 10) {
        grade += 0.5;
    }
    if (FCFMargin >= 15) {
        grade += 1;
    }
    else if (FCFMargin >= 7) {
        grade += 0.5;
    }
    if (capexOCF <= 20) {
        grade += 1;
    }
    else if (capexOCF <= 40) {
        grade += 0.5;
    }
    /* Growth */
    const revenueGrowth1Y = data[0][0].revenue / data[0][1].revenue;
    const revenueGrowth5Y = (data[0][0].revenue / data[0][4].revenue) ** 0.2 - 1;
    const FCFGrowth1Y = ratios.FCFMargins[0];
    const FCFGrowth5Y = (ratios.FCFMargins[0] / ratios.FCFMargins[4]) ** 0.2 - 1;
    const EPSGrowth1Y = data[0][0].eps / data[0][1].eps;
    const EPSGrowth5Y = (data[0][0].eps / data[0][4].eps) ** 0.2 - 1;
    if (revenueGrowth1Y >= 10) {
        grade += 1;
    }
    else if (revenueGrowth1Y >= 5) {
        grade += 0.5;
    }
    if (FCFGrowth1Y >= 10) {
        grade += 1;
    }
    else if (FCFGrowth1Y >= 5) {
        grade += 0.5;
    }
    if (EPSGrowth1Y >= 10) {
        grade += 1;
    }
    else if (EPSGrowth1Y >= 5) {
        grade += 0.5;
    }
    if (EPSGrowth5Y >= 10) {
        grade += 1;
    }
    else if (EPSGrowth5Y >= 5) {
        grade += 0.5;
    }
    if (revenueGrowth5Y >= 10) {
        grade += 1;
    }
    else if (revenueGrowth5Y >= 5) {
        grade += 0.5;
    }
    if (FCFGrowth5Y >= 10) {
        grade += 1;
    }
    else if (FCFGrowth5Y >= 5) {
        grade += 0.5;
    }
    /* Financial Health */
    const totalDebtEBITDA = ratios.totalDebtEBITDA;
    if (totalDebtEBITDA <= 1.5) {
        grade += 1;
    }
    else if (totalDebtEBITDA <= 2.5) {
        grade += 0.5;
    }
    /* Shareholder Friendliness */
    const payoutRatio = computeAverage(ratios.payoutRatios);
    const weightedAverageShsOutGrowth = ratios.weightedAverageShsOutGrowth;
    if (payoutRatio < 0.3) {
        grade += 1;
    }
    if (weightedAverageShsOutGrowth < 0) {
        grade += 2;
    }
    return grade;
    
};
