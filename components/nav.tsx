import Link from "next/link";
import style from "./styles/nav.module.css";

export default function Nav() {
	return (
		<nav>
			<ul className={style.navList}>
				<li className={style.navItem}>
					<Link href="/">Home</Link>
				</li>
				<li className={style.navItem}>
					<Link href="/valuation">Valuation</Link>
				</li>
				<li className={style.navItem}>
					<Link href="/details">Details</Link>
				</li>
				<li className={style.navItem}>
					<Link href="/fundamentals">Fundamentals</Link>
				</li>
			</ul>
		</nav>
	);
}
