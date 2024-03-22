export const calendarRows = 6;
export const calendarColumns = 7;
export const weekStartDayIndex = 1; // use 0 for week starts on Sunday

export const getMonthGrid = (
	monthIndex = new Date().getMonth(),
	year = new Date().getFullYear(),
) => {
	const firstWeekDayOfMonth = getFirstWeekDayOfMonth(year, monthIndex);
	let currentDayInGrid = weekStartDayIndex - firstWeekDayOfMonth;

	const monthGrid = new Array(calendarRows).fill([]).map(() => {
		return new Array(calendarColumns).fill(null).map(() => {
			currentDayInGrid++;
			return new Date(year, monthIndex, currentDayInGrid);
		});
	});

	return monthGrid;
};

export const getFirstWeekDayOfMonth = (year: number, monthIndex: number) => {
	const date = new Date(year, monthIndex, 1);

	return date.getDay();
};

export const isLastDayOfMonth = (date: Date) => {
	return (
		date.getDate() ===
		new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
	);
};

export const isFirstDayOfMonth = (date: Date) => {
	return date.getDate() === 1;
};

// export const getAllDaysInMonthGrid = (
// 	monthIndex = new Date().getMonth(),
// 	year = new Date().getFullYear(),
// ) => {
// 	const dateWithLastMonthDay = new Date(year, monthIndex + 1, 0);
// 	const monthLastDay = dateWithLastMonthDay.getDate();
// 	const weekLastDay = getWeekLastDate(dateWithLastMonthDay).getDay();
// 	const weekDay = dateWithLastMonthDay.getDay();

// 	const days = Array.from(
// 		{ length: monthLastDay },
// 		(_, index) => new Date(dateWithLastMonthDay.setDate(index + 1)),
// 	);

// 	const weekLengthShiftToMonday = 7 - 1;
// 	const sunday = 0;
// 	let diff = weekLengthShiftToMonday - weekDay;

// 	while (diff >= weekLastDay && weekDay !== sunday) {
// 		const nextMonth = new Date(year, monthIndex + 1);
// 		console.log(nextMonth.getMonth());
// 		days.push(new Date(nextMonth.setDate(nextMonth.getDate() + diff)));
// 		diff--;
// 	}

// 	return days;
// };

// export const getWeekDaysName = (locale: string) => {
// 	const dayFormat = new Intl.DateTimeFormat(locale, {
// 		weekday: "short",
// 	});

// 	const days = Array.from({ length: 7 }, (_, index) =>
// 		dayFormat.format(new Date(0, 0, index)),
// 	);

// 	return days;
// };

// export const getWeekLastDate = (date: Date) => {
// 	const day = date.getDay();
// 	const weekLength = 7;
// 	const weekLastDate = new Date(date);
// 	let diff = weekLength - day;

// 	if (day === 0) {
// 		diff = 0;
// 	}

// 	weekLastDate.setDate(date.getDate() + diff);

// 	return weekLastDate;
// };
