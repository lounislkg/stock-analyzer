"use client";

import { useState, useEffect } from "react";
import { useCompanyStore } from "@/store/useCompanyStore";
import {
	type valuationRatios,
	computeValuationRatio,
	computeAverageGrowth,
	computeAverage,
} from "@/services/computer";
import { getRatios } from "@/services/companyService";
import styles from "./page.module.css";
import { RawDatas } from "@/utils/dataDescription";

export default function Calculator() {
	// data to help user to input the data
	const { data, setData } = useCompanyStore();
	const [metrics, setMetrics] = useState<valuationRatios>([]);

	// data inputed by the user
	const [fcf_per_share, setFcf_per_share] = useState<number>(0);
	const [fcf_growth, setFcf_growth] = useState<number>(0);
	const [price_to_fcf, setPrice_to_fcf] = useState<number>(0);
	const [years, setYears] = useState<number>(0);
	const [initial_value, setInitial_value] = useState<number>(0);

	// data calculated by the app
	const [stockValue, setStockValue] = useState(0);
	const [cagr, setCagr] = useState(0);
	const [fair_prices, setFair_prices] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
	const [margin_safety, setMargin_safety] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

	const processInputs = (elem: React.ChangeEvent<HTMLInputElement>) => {
		let input = elem.target.value;
		try {
			if (input.match(/[^0-9.,]/)) {
				throw new Error("Please enter a valid number");
			}
			if (input === "") {
				return 0;
			}
			if (input.includes(",")) {
				input = input.replace(",", ".");
			}
			const number = parseFloat(input);
			if (isNaN(number)) {
				throw new Error("Please enter a valid number");
			}
			return number;
		} catch (e) {
			if (e === "Please enter a valid number") {
				elem.target.style.border = "1px solid red";
			} else {
				console.error(e);
			}
		}
		return 0;
	};
	useEffect(() => {
		const calculateResults = () => {
			const valueOfStock =
				Math.round(
					fcf_per_share *
						Math.pow(1 + fcf_growth / 100, years) *
						price_to_fcf *
						100,
				) / 100;
			const cagrValue =
				Math.round(
					(Math.pow(valueOfStock / initial_value, 1 / years) - 1) * 10000,
				) / 100;
			const fair_prices: number[] = [];
			const marginOfsafety: number[] = [];

			const cagrs = [8, 9, 10, 11, 12, 13, 14, 15];
			for (let i = 0; i < cagrs.length; i++) {
				fair_prices[i] =
					Math.round((valueOfStock / (1 + cagrs[i] / 100) ** years) * 100) /
					100;
				marginOfsafety[i] =
					Math.round(
						((fair_prices[i] - initial_value) / initial_value) * 100 * 100,
					) / 100;
			}
			setMargin_safety(marginOfsafety);
			setStockValue(valueOfStock);
			setCagr(cagrValue);
			setFair_prices(fair_prices);
		};

		calculateResults();
	}, [fcf_per_share, fcf_growth, price_to_fcf, years, initial_value]);
	useEffect(() => {
		if (data) {
			computeValuationRatio(data).then((ratios) => {
				setMetrics(ratios);
				if (data[3].c !== undefined) {
					setInitial_value(data[3].c);
				}
			});
		}
	}, [data]);

	const handleExtendedPrices = async () => {
		if (!data) return;
		const response = await getRatios(data[0][0].symbol);
		console.log("response", response);
		setData([...data.slice(0, 5), [...response]] as RawDatas);
	};

	console.log("metrics", metrics);
	if (data && data[5] !== undefined) {
		console.log("data[5]", data[5]);
	}
	return (
		<div className={styles.main}>
			<div className={styles.top}>
				<h1>Stock Valuation Calculator</h1>
				{/* eslint-disable-next-line */}
				<button onClick={(e) => handleExtendedPrices()}>
					Extended Metrics
				</button>
			</div>
			<div>
				<div>
					<h2>Financial Metrics</h2>
					{data && metrics.length > 0 ? (
						<table className={styles.table}>
							<thead>
								<tr>
									{metrics[0]
										? Object.keys(metrics[0])
												.reverse()
												.map((item, index) => <th key={index}>{item}</th>)
										: null}
								</tr>
							</thead>
							<tbody>
								{metrics.map((item, index) => (
									<tr key={index}>
										<td>{item.year}</td>
										{/* TODO : ajouter une classe name pour structurer le tableau*/}
										<td>{item.FCFGrowth}</td>
										<td>{item.PEratio}</td>
										<td>{item.price_to_FCF}</td>
										<td>{item.FCF_per_share}</td>
									</tr>
								))}
								<tr>
									<td>Average</td>
									<td>
										{/*on met sur 100 parce que des fois je calcul la moyenne de ratios (en gros de trucs entre 0 et 1 et d'autres fois je calcul la moyenne de pourcentages (de trucs entre 0 et 100)*/}
										{computeAverage(
											metrics
												.filter((item) => item.FCFGrowth !== 0)
												.map((item) => item.FCFGrowth / 100),
										)}
									</td>
									<td>
										{data[5] !== undefined &&
											computeAverage(metrics.map((item) => item.PEratio / 100))}
									</td>
									<td>
										{data[5] !== undefined &&
											computeAverage(
												metrics.map((item) => item.price_to_FCF / 100),
											)}
									</td>
									<td>
										{computeAverage(
											metrics.map((item) => item.FCF_per_share / 100),
										)}
									</td>
								</tr>
							</tbody>
						</table>
					) : null}
				</div>{" "}
			</div>
			<div>
				<h2>Inputs</h2>

				<form className={styles.form}>
					<label>
						Free Cash Flow per share
						<span className={styles.floating_help}>Prefer the last one</span>
						<input
							type="number"
							value={fcf_per_share}
							onChange={(e) => setFcf_per_share(processInputs(e))}
						/>
					</label>
					<label>
						Free Cash Flow Growth
						<span className={styles.floating_help}>
							Prefer the Average (be conservative)
						</span>
						<input
							type="number"
							value={fcf_growth}
							onChange={(e) => setFcf_growth(processInputs(e))}
						/>
					</label>
					<label>
						Price to Free Cash Flow
						<span className={styles.floating_help}>
							Refer to the sector average
						</span>
						<input
							type="number"
							value={price_to_fcf}
							onChange={(e) => setPrice_to_fcf(processInputs(e))}
						/>
					</label>
					<label>
						Number of years
						<span className={styles.floating_help}>
							The number of years you expect the company to grow at the entered
							rate.
						</span>
						<input
							type="number"
							value={years}
							onChange={(e) => setYears(processInputs(e))}
						/>
					</label>
					<label>
						Initial Value
						<span className={styles.floating_help}>
							The current value of the stock
						</span>
						<input
							type="number"
							value={initial_value}
							onChange={(e) => setInitial_value(processInputs(e))}
						/>
					</label>
				</form>
			</div>
			<div>
				<h2>Results</h2>
				{cagr && stockValue && fair_prices && margin_safety ? (
					<>
						<p>
							<strong>Stock Value: {stockValue} </strong>
						</p>
						<p>
							{cagr > 10 ? (
								<strong className={styles.green}>CAGR: {cagr}%</strong>
							) : (
								<strong className={styles.red}>CAGR: {cagr}%</strong>
							)}
						</p>

						<table className={styles.results_table}>
							<thead>
								<tr>
									<th> </th>
									<th>8%</th>
									<th>9%</th>
									<th>10%</th>
									<th>11%</th>
									<th>12%</th>
									<th>13%</th>
									<th>14%</th>
									<th>15%</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Fair Prices</td>
									{fair_prices.map((item, index) => (
										<td key={index}>{item}</td>
									))}
								</tr>
								<tr>
									<td>Margin of Safety</td>
									{margin_safety.map((item, index) => (
										<td key={index}>{item}</td>
									))}
								</tr>
							</tbody>
						</table>
					</>
				) : null}
			</div>
		</div>
	);
}
