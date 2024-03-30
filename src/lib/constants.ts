import { CalendarEvent } from "@/stores/eventsStore";

export const labelsColors = [
	"purple",
	"green",
	"cyan",
	"teal",
	"yellow",
	"red",
];

export const exampleCalendarEvents: CalendarEvent[] = [
	{
		id: 1,
		title: "Event 1",
		labelColor: "cyan",
		date: new Date().toISOString(),
	},
	{
		id: 2,
		title: "Event 2",
		labelColor: "yellow",
		date: new Date().toISOString(),
	},
	{
		id: 3,
		title: "Event 3",
		labelColor: "red",
		date: new Date().toISOString(),
	},
	{
		id: 4,
		title: "Event 4",
		labelColor: "green",
		date: new Date().toISOString(),
	},
];
