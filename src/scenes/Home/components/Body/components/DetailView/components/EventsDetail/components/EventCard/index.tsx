import { Event } from '@data/events/Event';
import { months } from '@utils/months';
import { motion } from 'framer-motion';
import { FC } from 'react';

export interface EventCardProps {
	event: Event;
	index: number;
}

const maxLen = 250;

const EventCard: FC<EventCardProps> = ({ event, index }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: index * 0.1 }}
		>
			<div>
				<p className="text-heading-6">
					{months[event.month - 1].long} {event.year}
				</p>
				<p className="text-body-medium max-w-prose">
					{event.content_eng.length > maxLen
						? event.content_eng.slice(0, maxLen) + '...'
						: event.content_eng}
				</p>
			</div>
		</motion.div>
	);
};

export default EventCard;
