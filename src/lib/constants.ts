import { CalendarEvent } from "@/stores/eventsStore";

export const labelsColors = [
	"purple",
	"green",
	"cyan",
	"teal",
	"yellow",
	"red",
];

export enum localStorageKey {
	draggingEventId = "draggingEventId",
	calendarEvents = "calendarEvents",
	selectedDate = "selectedDate",
}
