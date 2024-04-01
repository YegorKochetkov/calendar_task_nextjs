/** @jsxImportSource @emotion/react */
import React from "react";
import { useStore } from "@nanostores/react";

import { useLocale } from "@/hooks/useLocale";
import { $selectedDate } from "@/stores/selectedDateStore";

export const SelectedDate = ({
  formatter,
}: Record<string, Intl.DateTimeFormatOptions>) => {
  const locale = useLocale();
  const selectedDate = useStore($selectedDate);
  const selectedDateObj = new Date(
    selectedDate ? selectedDate : new Date().toISOString(),
  );
  const intlCurrentDate = new Intl.DateTimeFormat(locale, formatter).format(
    selectedDateObj,
  );

  return <time dateTime={new Date().toDateString()}>{intlCurrentDate}</time>;
};
