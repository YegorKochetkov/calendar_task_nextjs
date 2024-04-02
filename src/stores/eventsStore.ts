import { persistentAtom } from "@nanostores/persistent";
import { atom } from "nanostores";

import { localStorageKey } from "@/lib/constants";

export type CalendarEvent = {
	id: string;
	title: string;
	labelColor: string;
	date: string;
};

export const $calendarEvents = persistentAtom<CalendarEvent[]>(
	localStorageKey.calendarEvents,
	[],
	{
		encode(value) {
			return JSON.stringify(value);
		},
		decode(value) {
			try {
				return JSON.parse(value);
			} catch {
				return [];
			}
		},
	},
);

export function getCalendarEvents() {
	return $calendarEvents.get();
}

export function setCalendarEvents(events: CalendarEvent[]) {
	$calendarEvents.set([...events]);
}

export function addCalendarEvent(event: CalendarEvent) {
	let events = $calendarEvents.get();

	$calendarEvents.set([...events, event]);
}

export function updateCalendarEvent(event: CalendarEvent) {
	let events = $calendarEvents.get();

	const updatedEvents = events.map((ev) => (ev.id === event.id ? event : ev));

	$calendarEvents.set([...updatedEvents]);
}

export function updateCalendarEventDate(date: string, eventId: string) {
	let events = $calendarEvents.get();

	for (let event of events) {
		if (eventId === event.id) {
			event.date = date;
		}
	}

	$calendarEvents.set([...events]);
}

export function deleteCalendarEvent(eventId: string) {
	let events = $calendarEvents.get();

	const filteredEvent = events.filter((ev) => ev.id !== eventId);

	$calendarEvents.set([...filteredEvent]);
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
