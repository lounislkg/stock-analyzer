"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useCompanyStore } from "../store/useCompanyStore";
import CardMetrics from "@/components/CardMetrics";
import {
	type computedRatios,
	computeRatios,
	computeAverageGrowth,
	computeAverage,
} from "@/services/computer";
import { computeGrade, type grading_numbers } from "@/services/grade";

export default function Home() {
	const { data } = useCompanyStore();
	const [ratios, setRatios] = useState<computedRatios | null>(null);
	const [grade, setGrade] = useState<grading_numbers | null>(null);
	useEffect(() => {
		if (data) {
			computeRatios(data).then((ratios) => {
				setRatios(ratios);
			});
		}
	}, [data]);
	useEffect(() => {
		if (data && ratios) {
			computeGrade(data, ratios).then((grade: grading_numbers) => {
				setGrade(grade);
			});
		}
	}, [data, ratios]);
	return (
		<div className={styles.container}>
			<h1>Quantitative analysis</h1>
			{data && (
				<div className={styles.cardContainer}>
					<CardMetrics
						name="Revenu Growth"
						value={computeAverageGrowth(data[0].map((item) => item.revenue))}
						min={10}
					/>
					<CardMetrics
						name="FCF Growth"
						value={computeAverageGrowth(
							data[2].map((item) => item.freeCashFlow),
						)}
						min={10}
					/>
					<CardMetrics
						name="ROCE"
						value={
							ratios
								? computeAverage(ratios.ROCEs.map((item) => item.value))
								: 0
						}
						min={15}
					/>
					<CardMetrics
						name="Net Debt / FCF"
						value={ratios ? ratios.netDebtFCF : 0}
						max={3}
					/>
					<CardMetrics
						name="Outstanding Shares"
						value={ratios ? ratios.weightedAverageShsOutGrowth : 0}
						max={0}
					/>
					<CardMetrics
						name="FCF Margin"
						value={ratios ? computeAverage(ratios.FCFMargins) : 0}
						min={10}
					/>
				</div>
			)}
			<div className={styles.gradeHeader}>
				<h2>Quantitative Grade</h2>

				<p>
					Quantitative grade is a score between 0 and 20 that reflects the
					quality of the company&aposs financials
				</p>
				<p>It is calculated based on the following criteria:</p>
			</div>
			<div className={styles.quantitative_table}>
				<div>
					<h3>Rentabilité</h3>
					<p>
						ROIC 1Y (+1 : {">"} 20; +0.5 : {">"} 10) :{" "}
						{grade ? grade.ROIC1Y : "-"}
					</p>
					<p>
						ROIC 5Y (+1 : {">"} 20; +0.5 : {">"} 10) :{" "}
						{grade ? grade.ROIC5Y : "-"}
					</p>
				</div>
				<div>
					<h3>Profits</h3>
					<p>
						Gross Margin (+1 : {">"} 50; +0.5 : {">"} 20) :{" "}
						{grade ? grade.grossMargin : "-"}
					</p>
					<p>
						Operating Margin (+1 : {">"} 20; +0.5 : {">"} 10) :{" "}
						{grade ? grade.operatingMargin : "-"}
					</p>
					<p>
						Net Margin (+1 : {">"} 20; +0.5 : {">"} 10) :{" "}
						{grade ? grade.netMargin : "-"}
					</p>
					<p>
						FCF Margin (+1 : {">"} 15; +0.5 : {">"} 7) :{" "}
						{grade ? grade.FCFMargin : "-"}
					</p>
					<p>
						%Capex/OCF (+1 : {"<"} 20; +0.5 : {"<"} 40) :{" "}
						{grade ? grade.capexOCF : "-"}
					</p>
				</div>
				<div>
					<h3>Growth</h3>
					<p>
						Revenue Growth 1Y (+1 : {">"} 10; +0.5 : {">"} 5) :{" "}
						{grade ? grade.revenueGrowth1Y : "-"}
					</p>
					<p>
						Revenue Growth 5Y (+1 : {">"} 10; +0.5 : {">"} 5) :{" "}
						{grade ? grade.revenueGrowth5Y : "-"}
					</p>
				</div>
				<div>
					<h3>Benefits</h3>
					<p>
						FCF Growth 1Y (+1 : {">"} 10; +0.5 : {">"} 5) :{" "}
						{grade ? grade.FCFGrowth1Y : "-"}
					</p>
					<p>
						FCF Growth 5Y (+1 : {">"} 10; +0.5 : {">"} 5) :{" "}
						{grade ? grade.FCFGrowth5Y : "-"}
					</p>
					<p>
						EPS Growth 1Y (+1 : {">"} 10; +0.5 : {">"} 5) : {grade?.EPSGrowth1Y}
					</p>
					<p>
						EPS Growth 5Y (+1 : {">"} 10; +0.5 : {">"} 5) :{" "}
						{grade ? grade.EPSGrowth5Y : "-"}
					</p>
				</div>
				<div>
					<h3>Financial Health</h3>
					<p>
						Total Debt / EBITDA (+2 : {"<"} 1.5; +1 : {"<"} 3) :{" "}
						{grade ? grade.totalDebtEBITDA : "-"}
					</p>
				</div>
				<div>
					<h3>Shareholder Friendliness</h3>
					<p>
						Payout Ratio (+1 : {"<"} 0.6) : {grade ? grade.payoutRatio : "-"}
					</p>
					{
						//TODO : fix yields using the right data
					}
					<p>(Yield) : {ratios ? ratios?.currentYield : "-"}</p>
					<p>
						Weighted Average Shares Growth (+1 : {"<"} 0) :{" "}
						{grade ? grade.weightedAverageShsOutGrowth : "-"}
					</p>
				</div>
				<div>
					<h3>Grade</h3>
					<p>Grade : {grade ? grade.grade + "/" + grade.maxGrade : "-"}</p>
					<p>
						Grade out of 20 :{" "}
						{grade
							? Math.round((grade.grade / grade.maxGrade) * 20 * 100) / 100 +
								"/20"
							: " "}
						{grade
							? grade.grade / grade.maxGrade > 0.75
								? " ✅"
								: " ❌"
							: "-"}
					</p>
				</div>
			</div>
		</div>
	);
}
