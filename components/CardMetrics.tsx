import style from "./styles/CardMetrics.module.css";

export default function CardMetrics({
	name,
	value,
	min,
	max,
}: {
	name: string;
	value: number;
	min?: number;
	max?: number;
}) {
	const color =
		(max != undefined && value > max) || (min != undefined && value < min)
			? style.red
			: style.green;
	return (
		<div className={style.card + " " + color}>
			<h3>{name}</h3>
			<p>{value}</p>
			<p>{max !== undefined ? "Maximum : " + max : "Minimum : " + min}</p>
		</div>
	);
}
