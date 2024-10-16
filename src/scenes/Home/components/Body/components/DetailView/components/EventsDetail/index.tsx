import { Event } from '@data/events/Event';
import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';
import EventCard from './components/EventCard';

export interface EventsDetailProps {
	color: string;
	events: Event[];
}

const EventsDetail: FC<EventsDetailProps> = ({ events, color }) => {
	return (
		<div>
			<div
				className="flex flex-col gap-8 max-w-prose border-2 rounded-md p-8"
				style={{
					borderColor: events.length === 0 ? 'rgba(0,0,0,.05)' : color,
				}}
			>
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
								{/* <div className="border rounded-md p-8"> */}
								<p className="text-body-medium opacity-50">
									No KRC events occurred this month.
								</p>
								{/* </div> */}
							</motion.div>
						)}
					</AnimatePresence>
				}
			</div>
		</div>
	);
};

export default EventsDetail;
