export interface Event {
	city: string;
	year: number;
	month: number;
	content_eng: string;
	content_ko: string;
	type: string;
	target_audience: string;
	duration: string;
	size: string;
	frequency: string;
	index: number;
	day: number;
	collaboration: string[] | null;
	end_year: null;
	end_month: null;
	end_day: null;
}
