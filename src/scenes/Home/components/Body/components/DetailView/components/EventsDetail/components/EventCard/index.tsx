import { Event } from '@data/events/Event';
import { months } from '@utils/months';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import {
	Dialog,
	DialogPanel,
	DialogTitle,
	Description,
} from '@headlessui/react';

export interface EventCardProps {
	event: Event;
	index: number;
}

const maxLen = 250;

const EventCard: FC<EventCardProps> = ({ event, index }) => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: index * 0.1 }}
			>
				<div
					style={{
						cursor: 'pointer',
					}}
					onClick={() => setOpen(true)}
				>
					<p className="text-heading-6">{capFirstAllLetters(event.type)}</p>
					<p className="text-body-medium max-w-prose">
						{event.content_eng.length > maxLen
							? event.content_eng.slice(0, maxLen) + '...'
							: event.content_eng}
					</p>
					{event.collaboration && event.collaboration.length && (
						<div>
							<p className="font-bold pt-2 text-indigo-500">
								Collaboration:{' '}
								{event.collaboration.map(capFirstAllLetters).join(', ')}
							</p>
						</div>
					)}
				</div>
				<Dialog
					open={open}
					onClose={() => setOpen(false)}
					className="relative z-50"
				>
					<div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-50">
						<DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
							<DialogTitle className="font-bold text-2xl">
								{capFirstAllLetters(event.type)}
							</DialogTitle>
							<Description>{event.content_eng}</Description>
							{event.collaboration && event.collaboration.length && (
								<div>
									<p className="font-bold pt-2 text-indigo-500">
										Collaboration:{' '}
										{event.collaboration.map(capFirstAllLetters).join(', ')}
									</p>
								</div>
							)}
						</DialogPanel>
					</div>
				</Dialog>
			</motion.div>
		</>
	);
};

export default EventCard;

const capFirstAllLetters = (str: string) =>
	str
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
