"use client";
import { useCompanyStore } from "@/store/useCompanyStore";
import { useState } from "react";
import {
	RawDatas,
	Profile,
	Price,
	Ratios,
	CashFlowStatement,
	IncomeStatement,
	BalanceSheet,
} from "@/utils/dataDescription";
type ItemType = RawDatas[number];
import styles from "./page.module.css";
export default function Details() {
	const { data } = useCompanyStore();
	const [selectedRows, setSelectedRows] = useState<number[]>([]);

	const handleRowClick = (index: number) => {
		if (selectedRows.includes(index)) {
			setSelectedRows(selectedRows.filter((i: number) => i !== index));
			return;
		}
		setSelectedRows([...selectedRows, index]);
	};

	if (!data || data.length < 0) return null;
	const tables = [
		"Income Statement",
		"Balance Sheet",
		"Cash Flow Statement",
		"Price",
		"Profile",
		"Ratios",
	];
	return (
		<div>
			<h1>Details</h1>
			<p>Click on a row to hilight it</p>

			<div className={styles.tableContainer}>
				{data.map((item: ItemType, i) => {
					if (item === undefined) {
						return null;
					}
					return (
						<div key={i}>
							<h2>{tables[i]}</h2>
							<div className={styles.tables}>
								<table>
									<thead>
										<tr>
											{Array.isArray(item) ? <th></th> : null}
											{Array.isArray(item)
												? item.map(
														(
															item_:
																| IncomeStatement
																| BalanceSheet
																| CashFlowStatement
																| Ratios,
															i: number,
														) => <th key={i}>{item_.calendarYear}</th>,
													)
												: null}
											{!Array.isArray(item) ? (
												<>
													<th>Key</th>
													<th>Value</th>
												</>
											) : null}
										</tr>
									</thead>
									<tbody>
										{Array.isArray(item)
											? Object.keys(item[0]).map((key: string, i: number) => {
													if (key in item[0]) {
														const typedKey = key as keyof (
															| IncomeStatement
															| BalanceSheet
															| CashFlowStatement
															| Ratios
														);
														return (
															<tr
																key={i}
																className={
																	selectedRows.includes(i)
																		? styles.selected
																		: ""
																}
																onClick={() => handleRowClick(i)}
															>
																<td onClick={() => console.log("cliqu")}>
																	{key}
																</td>
																{item.map(
																	(
																		item_:
																			| IncomeStatement
																			| BalanceSheet
																			| CashFlowStatement
																			| Ratios,
																		i: number,
																	) => (
																		<td key={i}>{item_[typedKey]}</td>
																	),
																)}
															</tr>
														);
													}
													return null;
												})
											: Object.entries(item as Profile | Price).map(
													([key, value], i) => (
														<tr key={i}>
															<td>{key}</td>
															<td>{value}</td>
														</tr>
													),
												)}
									</tbody>
								</table>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
