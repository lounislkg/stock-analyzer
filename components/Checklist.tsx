import React, { useState } from "react";

const items = [
	{
		category: "Products",
		items: [
			{
				id: "predictable-income",
				label: "Predictable?",
				tooltip:
					"Revenu coming from a subscription modelor something similar that is predictable?",
			},
			{
				id: "resistant-to-change",
				label: "Disruption risk?",
				tooltip:
					"Is it possible that the company gets disrupted by a new technology? ",
			},
			{
				id: "predictability-score",
				label: "GuruFocus Score (1-100)?",
				tooltip:
					"Company predictability score? (GuruFocus, measured from 1 to 100, the higher, the better)",
			},
			{
				id: "high-growth-potential",
				label: "Growth potential?",
				tooltip: "High growth potential? (growing market, growing company)",
			},
		],
	},
	{
		category: "Management",
		items: [
			{
				id: "capital-allocation",
				label: "Capital allocation?",
				tooltip:
					"Judicious capital allocation? (Standard = No, Exemplary = Yes)",
			},
			{
				id: "competent-management",
				label: "Past competence?",
				tooltip: "Competent management in the past?",
			},
			{
				id: "skin-in-the-game",
				label: "Skin in the Game?",
				tooltip:
					"Management 'Skin in the Game'? (ownership in company shares / family at the head of the company)",
			},
			{
				id: "share-buyback",
				label: "Share buyback?",
				tooltip: "Regular share buyback? (a good sign if yes)",
			},
		],
	},
	{
		category: "Moat",
		items: [
			{
				id: "morningstar-rating",
				label: "MOAT rating?",
				tooltip:
					"Morningstar rating? MOAT + moat growth (see IBKR Morningstar's report) Large/Narrow/No Moat",
			},
			{
				id: "moat-type",
				label: "Moat type?",
				tooltip:
					"Determine moat type (economies of scale, switching costs, network effect, efficient market, differentiation advantage)",
			},
			{
				id: "market-leader",
				label: "Market leader?",
				tooltip: "Market leader? (market share)",
			},
			{
				id: "competition-resistance",
				label: "Competition resistant?",
				tooltip: "Resistant to competition? (growing market, weak competition)",
			},
		],
	},
];

const Checklist: React.FC = () => {
	const [tooltip, setTooltip] = useState<string | null>(null);
	const [grade, setGrade] = useState<number>(0);

	const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
		setGrade((prev) => (event.target.checked ? prev + 2 : prev - 2));
	};
	return (
		<div className="relative">
			<ul>
				{items.map((section) => (
					<li key={section.category}>
						<h3>{section.category}</h3>
						<ul>
							{section.items.map((item) => (
								<li
									key={item.id}
									onMouseEnter={() => setTooltip(item.tooltip)}
									onMouseLeave={() => setTooltip(null)}
								>
									<input type="checkbox" id={item.id} onChange={handleCheck} />
									<label htmlFor={item.id}>{item.label}</label>
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
			{tooltip && <div>{tooltip}</div>}
			{grade > 0 && (
				<div>
					<h2>
						Grade: {grade}/20 {grade > 12 ? "✅" : "❌"}
					</h2>
				</div>
			)}
		</div>
	);
};

export default Checklist;
