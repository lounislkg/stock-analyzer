"use client";
import { useCompanyStore } from "@/store/useCompanyStore";
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
export default function Details() {
	const { data } = useCompanyStore();
	if (!data || data.length < 0) return null;
	return (
		<div>
			<h1>Details</h1>
			<div>
				{data.map((item: ItemType, i) => (
					<table key={i}>
						<thead>
							<tr>
								<th> </th>
								{Array.isArray(item)
									? item.map((item_: any, i: number) => (
											<th key={i}>{item_.calendarYear}</th>
										))
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
								? Object.keys(item[0]).map(
										(
											key: keyof (
												| IncomeStatement
												| BalanceSheet
												| CashFlowStatement
												| Ratios
											),
										) => (
											<tr key={i}>
												{item.map(
													(
														item_:
															| IncomeStatement
															| BalanceSheet
															| CashFlowStatement
															| Ratios,
														i_: number,
													) => (
														<td key={i_}>{item_[key]}</td>
													),
												)}
											</tr>
										),
									)
								: null}
						</tbody>
					</table>
				))}
			</div>
		</div>
	);
}
