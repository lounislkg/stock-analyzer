"use client";
import Checklist from "@/components/Checklist";
import { useState } from "react";
import styles from "./page.module.css";
import SwotCard from "@/components/SwotCard";
export default function Fundamentals() {
	const [fundamentals, setFundamentals] = useState({});

	const [grade, setGrade] = useState(0);

	return (
		<div className={styles.fundamentals}>
			<h1>Fundamentals</h1>
			<p>
				This page is made to help you determine the fundamentals of a business
			</p>
			<div className={styles.recommandations}>
				<h3>Fundamental analysis allows you to :</h3>
				<ul>
					<li>Understand the business model</li>
					<li>Competitive advantages</li>
					<li>Competitors </li>
					<li>Management</li>
				</ul>
				<h3>Sources of informations : </h3>
				<ul>
					<li>Website (investor relations)</li>
					<li>Morningstar analysis (on IBKR)</li>
					<li>Zonebourse</li>
					<li>ChatGPT</li>
					<li>Google {"{company's name} + market shares"}</li>
					<li>
						Google{" "}
						{
							"{company's sector name, eg: cybersecurity} + market growth / ecosystem"
						}
					</li>
					<li>
						Youtube videos / Internet opinion (Last step in order to buil your
						own opinion about a business)
					</li>
				</ul>
			</div>
			<div className={styles.swotAnalysis}>
				<h2>SWOT analysis</h2>
				<div>
					<table>
						<tbody>
							<tr>
								<td> </td>
								<td>Pros</td>
								<td>Cons</td>
							</tr>
							<tr>
								<td>Internal : </td>
								<td>
									{" "}
									<SwotCard color="green" />
								</td>
								<td>
									<SwotCard color="red" />
								</td>
							</tr>
							<tr>
								<td>External : </td>
								<td>
									<SwotCard color="green" />
								</td>
								<td>
									<SwotCard color="red" />
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div className={styles.checklist}>
				<h2>Checklist</h2>
				<p>
					This checklist is contains 10 questions. You have to answer by yes or
					no (prefer no). Avoid answering (I don&apos;t know) this means you
					haven&apos;t made enough research about the business.{" "}
				</p>
				<p>
					yes = +2 | no = 0. You can consider that a grade higher than 12 is a
					good mark and below 12 as an indicator of a fragile business
					(it&apos;s an indicator)
				</p>

				<Checklist></Checklist>
			</div>
		</div>
	);
}
