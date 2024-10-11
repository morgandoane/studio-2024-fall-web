import Motion from '@components/Motion';
import { Event } from '@data/events/Event';
import { capFirst } from '@utils/capFirst';
import { FC } from 'react';

export interface EventCardProps {
	event: Event;
}

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const EventCard: FC<EventCardProps> = ({ event }) => {
	return (
		<div>
			<Motion.Arrive scale={0.98}>
				<div className="border-l-slate-200 border-l-4 pl-4 pt-2 pb-2">
					<p className="text-heading-6">{event.city || 'National Event'}</p>
					<p className="text-red-500 text-body-small font-semibold">
						{months[event.month - 1]} {event.year}
					</p>
					<div className="h-4" />
					<p className="text-body-medium max-w-prose">{event.content_eng}</p>
					{event.collaboration && event.collaboration.length > 0 && (
						<div>
							<div className="h-4" />
							<p className="font-bold text-slate-600">
								Collaboration: {event.collaboration.map(capFirst).join(', ')}
							</p>
						</div>
					)}
				</div>
			</Motion.Arrive>
		</div>
	);
};

export default EventCard;
