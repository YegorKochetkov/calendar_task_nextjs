import { persistentAtom } from "@nanostores/persistent";
import { atom } from "nanostores";

import { localStorageKey } from "@/lib/constants";

export type CalendarEvent = {
	id: string;
	title: string;
	labelColor: string;
	date: string;
};

export const $calendarEvents = persistentAtom<Record<string, CalendarEvent[]>>(
	localStorageKey.calendarEvents,
	{},
	{
		encode(value) {
			return JSON.stringify(value);
		},
		decode(value) {
			try {
				return JSON.parse(value);
			} catch {
				return new Map();
			}
		},
	},
);

export function getCalendarEvents() {
	return $calendarEvents.get();
}

export function setCalendarEvents(events: Record<string, CalendarEvent[]>) {
	$calendarEvents.set({ ...events });
}

export function addCalendarEvent(dayDate: string, event: CalendarEvent) {
	let events = $calendarEvents.get();
	let eventsForDate = events[dayDate];

	eventsForDate = eventsForDate ? [...eventsForDate, event] : [event];
	events = { ...events, [dayDate]: eventsForDate };

	$calendarEvents.set({ ...events });
}

export function updateCalendarEvent(dayDate: string, event: CalendarEvent) {
	let events = $calendarEvents.get();
	let eventsForDate = events[dayDate];

	for (let ev of eventsForDate) {
		if (ev.id === event.id) {
			ev = event;
		}
	}

	events = { ...events, [dayDate]: [event] };

	$calendarEvents.set({ ...events });
}

export function updateCalendarEventDate(dayDate: string, eventId: string) {
	let events = $calendarEvents.get();
	let eventsForDate = events[dayDate];

	for (let event of eventsForDate) {
		if (eventId === event.id) {
			event.date = dayDate;
		}
	}

	eventsForDate = eventsForDate.map((event) => {
		if (eventId === event.id) {
			event.date = dayDate;
		}

		return event;
	});

	events = { ...events, [dayDate]: eventsForDate };

	$calendarEvents.set({ ...events });
}

export function deleteCalendarEvent(dayDate: string, eventId: string) {
	let events = $calendarEvents.get();
	let eventsForDate = events[dayDate];

	const updatedEventsForDate = eventsForDate.filter((ev) => ev.id !== eventId);
	const clearedEvents: Record<string, CalendarEvent[]> = {};

	if (updatedEventsForDate.length === 0) {
		for (let date in events) {
			if (date !== dayDate) {
				clearedEvents[date] = events[date];
			}
		}
		events = { ...clearedEvents };
	} else {
		events = { ...events, [dayDate]: [...updatedEventsForDate] };
	}

	$calendarEvents.set({ ...events });
}

export const $calendarEventsQueryFilter = atom<string>("");

export function setCalendarEventsFilter(query: string) {
	$calendarEventsQueryFilter.set(query);
}
export const $calendarEventsLabelFilter = atom<string>("");

export function setCalendarEventsLabelFilter(query: string) {
	$calendarEventsLabelFilter.set(query);
}

export const $selectedCalendarEvent = atom<CalendarEvent | null>(null);

export function setSelectedCalendarEvent(event: CalendarEvent | null) {
	$selectedCalendarEvent.set(event);
}
