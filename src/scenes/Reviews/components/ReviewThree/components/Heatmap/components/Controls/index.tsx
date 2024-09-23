import { FC } from 'react';
import { Datafilter } from '../../../../../../../../assets/data/DataFilter';
import { Box, Typography, Select, Option } from '@mui/joy';

interface ControlsProps {
	value: Datafilter;
	onChange: (value: Datafilter) => void;
	sources: string[];
}

const Controls: FC<ControlsProps> = ({ value, onChange, sources }) => {
	return (
		<Box sx={{ display: 'flex', gap: 2 }}>
			<Box>
				<Typography level="body-xs">Gender</Typography>
				<Select
					size="sm"
					variant="plain"
					value={value.gender}
					onChange={(e, v) => {
						if (v) {
							onChange({ ...value, gender: v });
						}
					}}
				>
					<Option value="Combined">Combined</Option>
					<Option value="Men">Men</Option>
					<Option value="Women">Women</Option>
				</Select>
			</Box>
			<Box>
				<Typography level="body-xs">Source</Typography>
				<Select
					size="sm"
					variant="plain"
					value={value.source ?? 'null'}
					onChange={(e, v) => {
						if (v) {
							onChange({ ...value, source: v === 'null' ? null : v });
						}
					}}
				>
					<Option value="null">All</Option>
					{sources.map((s) => (
						<Option key={s} value={s}>
							{s}
						</Option>
					))}
				</Select>
			</Box>
		</Box>
	);
};
export default Controls;
