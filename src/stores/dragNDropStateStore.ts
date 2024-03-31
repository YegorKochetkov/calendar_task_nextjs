import { persistentAtom } from "@nanostores/persistent";

export const $draggingEventId = persistentAtom<string>("draggingEventId", "");
export const $draggingEventNextDate = persistentAtom<string>(
	"draggingEventNextDate",
	"",
);

export function setDraggingEventId(id: string) {
	$draggingEventId.set(id);
}

export function getDraggingEventId() {
	return $draggingEventId.get();
}

export function setDraggingEventNextDate(date: string) {
	$draggingEventNextDate.set(date);
}

export function getDraggingEventNextDate() {
	return $draggingEventNextDate.get();
}
