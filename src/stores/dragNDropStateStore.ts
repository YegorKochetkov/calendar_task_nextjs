import { persistentAtom } from "@nanostores/persistent";
import { atom } from "nanostores";

import { localStorageKey } from "@/lib/constants";

export const $draggingEventId = persistentAtom<string>(
	localStorageKey.draggingEventId,
	"",
);
export function setDraggingEventId(id: string) {
	$draggingEventId.set(id);
}
export function getDraggingEventId() {
	return $draggingEventId.get();
}

export const $draggingEventNextDate = persistentAtom<string>(
	"draggingEventNextDate",
	"",
);
export function setDraggingEventNextDate(date: string) {
	$draggingEventNextDate.set(date);
}
export function getDraggingEventNextDate() {
	return $draggingEventNextDate.get();
}

export const $dayFromDragStart = atom<string>("");
export function setDayFromDragStart(date: string) {
	$dayFromDragStart.set(date);
}
export function getDayFromDragStart() {
	return $dayFromDragStart.get();
}
