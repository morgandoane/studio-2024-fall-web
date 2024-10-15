import { Event } from '@data/events/Event';
import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';
import EventCard from './components/EventCard';

export interface EventsDetailProps {
	events: Event[];
}

const EventsDetail: FC<EventsDetailProps> = ({ events }) => {
	return (
		<div>
			<div className="flex flex-col gap-8">
				{events.map((event, i) => (
					<EventCard key={i} event={event} index={i} />
				))}
				{
					<AnimatePresence>
						{events.length === 0 && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								<div className="border rounded-md p-8">
									<p className="text-body-medium">
										No KRC events occurred this month.
									</p>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				}
			</div>
		</div>
	);
};

export default EventsDetail;
