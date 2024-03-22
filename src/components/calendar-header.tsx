"use client";

import React from "react";

import { useLocale } from "@/hooks/useLocale";

export const CalendarHeader = () => {
	const locale = useLocale();
	const intlToday = new Intl.DateTimeFormat(locale, {
		month: "long",
		year: "numeric",
	}).format(new Date());

	return (
		<header>
			<h1 className="visually-hidden">Calendar</h1>
			<time dateTime={new Date().toDateString()}>{intlToday}</time>
		</header>
	);
};
