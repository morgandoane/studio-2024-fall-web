export interface HeatmapProps<T> {
	data: T[];
	accessor: (d: T) => { x: number; y: number; value: number };
	color: string;
	width: number;
	opacityExponent?: number;
	onHover?: (row: number | null, col: number | null) => void;
	onClick?: (row: number, col: number) => void;
	hovered?: { row: number | null; col: number | null };
	labels: {
		row: (index: number) => string;
		col: (index: number) => string;
	};
	columns: number;
}

type Cell = {
	index: number;
	value: number;
};

type Row = {
	index: number;
	cells: Cell[];
};

export const getHeatmapRows = <D,>(props: HeatmapProps<D>): Row[] => {
	// Record<y, Record<x, value>>
	const rows: Record<number, Record<number, number>> = {};

	for (const d of props.data) {
		const { x, y, value } = props.accessor(d);
		if (!rows[y]) rows[y] = {};
		rows[y][x] = (rows[y][x] || 0) + value;
	}

	const res: Row[] = Object.entries(rows).map(([y, row]) => ({
		index: parseInt(y),
		cells: Object.entries(row)
			.map(([x, value]) => ({
				index: parseInt(x),
				value,
			}))
			.sort((a, b) => a.index - b.index),
	}));

	return res.sort((a, b) => a.index - b.index);
};

const Heatmap = <T,>(props: HeatmapProps<T>) => {
	const { color, width, opacityExponent = 2 } = props;
	const rows = getHeatmapRows(props);
	const columns = props.columns;
	const maxCellValue = Math.max(
		...rows.map((row) => Math.max(...row.cells.map((cell) => cell.value)))
	);
	const minCellValue = Math.min(
		...rows.map((row) => Math.min(...row.cells.map((cell) => cell.value)))
	);

	const getOpacity = (
		value: number,
		min: number,
		max: number,
		minOpacity = 0.1
	) =>
		minOpacity +
		(1 - minOpacity) * ((value - min) / (max - min)) ** opacityExponent;

	const rowTotals = rows.map((row) =>
		row.cells.reduce((acc, cell) => acc + cell.value, 0)
	);

	const minRowTotal = Math.min(...rowTotals);
	const maxRowTotal = Math.max(...rowTotals);

	const colTotals = Array.from({ length: columns }).map((_, i) =>
		rows.reduce((acc, row) => acc + (row.cells[i] ? row.cells[i].value : 0), 0)
	);
	const minColTotal = Math.min(...colTotals);
	const maxColTotal = Math.max(...colTotals);

	return (
		<div className="relative" onMouseLeave={() => props.onHover?.(null, null)}>
			<div className="flex">
				<div className="w-12" />
				{Array.from({ length: columns }).map((_, i) => (
					<div key={`col-${i}`} style={{ width: `${width / columns}px` }}>
						<p className="text-body-small text-center">{props.labels.col(i)}</p>
					</div>
				))}
			</div>
			{props.hovered?.col !== undefined && props.hovered?.col !== null && (
				<div
					className="absolute bg-gray-400"
					style={{
						top: '-8px',
						left: `${
							((props.hovered?.col ?? 0) + 1) * (width / columns) + 24
						}px`,
						height: '2px',
						width: `${width / columns}px`,
					}}
				/>
			)}
			{rows.map((row, rowIndex) => {
				const rowTotal = rowTotals[rowIndex];
				const rowPortion = rowTotal / maxRowTotal;
				return (
					<div key={`row-${rowIndex}`} className="flex relative">
						{props.hovered?.row === rowIndex && (
							<div
								style={{
									left: '-8px',
									top: '2px',
									bottom: '2px',
									width: '2px',
								}}
								className="absolute bg-gray-400"
							></div>
						)}
						<div className="w-12">
							<p className="text-body-small">{props.labels.row(rowIndex)}</p>
						</div>
						{Array.from({ length: columns }).map((_, cellIndex) => {
							const cell = row.cells.find((c) => c.index === cellIndex);
							return (
								<div
									onMouseEnter={() => props.onHover?.(rowIndex, cellIndex)}
									onClick={() => props.onClick?.(rowIndex, cellIndex)}
									key={`row-${rowIndex}-cell-${cellIndex}`}
									className="flex items-stretch"
									style={{
										padding: '1px',
										height: `${width / columns}px`,
										width: `${width / columns}px`,
									}}
								>
									<div
										className="flex-1"
										style={{
											opacity: cell
												? getOpacity(cell.value, minCellValue, maxCellValue)
												: 0,
											backgroundColor: color,
											borderRadius: '2px',
										}}
									/>
								</div>
							);
						})}
						<div />
						<div
							className="flex items-stretch ml-2"
							style={{
								width: `${(width / columns) * rowPortion * 3}px`,
								height: `${width / columns}px`,
								padding: '1px',
							}}
						>
							<div
								className="flex-1"
								style={{
									opacity: getOpacity(rowTotal, minRowTotal, maxRowTotal, 0.2),
									backgroundColor: color,
									borderRadius: '2px',
								}}
							/>
						</div>
					</div>
				);
			})}
			<div className="flex mt-2">
				<div className="w-12" />
				{Array.from({ length: columns }).map((_, cellIndex) => {
					const colTotal = colTotals[cellIndex];
					const colPortion = colTotal / maxColTotal;
					return (
						<div
							key={`row-${rows.length}-cell-${cellIndex}`}
							className="flex items-stretch"
							style={{
								padding: '1px',
								height: `${(width / columns) * 3 * colPortion}px`,
								width: `${width / columns}px`,
							}}
						>
							<div
								className="flex-1"
								style={{
									backgroundColor: color,
									opacity: getOpacity(colTotal, minColTotal, maxColTotal, 0.2),
									borderRadius: '2px',
								}}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Heatmap;
