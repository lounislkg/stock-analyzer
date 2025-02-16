"use client";
import { useCompanyStore } from "@/store/useCompanyStore";
export default function Data() {
	const { data } = useCompanyStore();
	const { ratios, setRatios } = useState<computedRatios | null>(null);
	return (
		<div style={{ overflow: "scroll" }}>
			{data ? JSON.stringify(data) : "null"}
		</div>
	);
}
