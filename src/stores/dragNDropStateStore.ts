import { persistentAtom } from "@nanostores/persistent";

import { localStorageKey } from "@/lib/constants";

export const $draggingEventId = persistentAtom<string>(
	localStorageKey.draggingEventId,
	"",
);
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
