import { persistentAtom } from "@nanostores/persistent";
import { atom } from "nanostores";

import { exampleCalendarEvents } from "@/lib/constants";

export type CalendarEvent = {
	id: number;
	title: string;
	labelColor: string;
	date: string;
};

export const $calendarEvents = persistentAtom<CalendarEvent[]>(
	"savedEvents",
	exampleCalendarEvents,
	{
		encode(value) {
			return JSON.stringify(value);
		},
		decode(value) {
			try {
				return JSON.parse(value);
			} catch {
				return exampleCalendarEvents;
			}
		},
	},
);

export function addCalendarEvent(event: CalendarEvent) {
	$calendarEvents.set([...$calendarEvents.get(), event]);
}

export function updateCalendarEvent(event: CalendarEvent) {
	$calendarEvents.set(
		$calendarEvents.get().map((ev) => (ev.id === event.id ? event : ev)),
	);
}

export function deleteCalendarEvent(event: CalendarEvent) {
	$calendarEvents.set($calendarEvents.get().filter((ev) => ev.id !== event.id));
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
