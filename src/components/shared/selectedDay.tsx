/** @jsxImportSource @emotion/react */
import React from "react";
import { useStore } from "@nanostores/react";

import { useLocale } from "@/hooks/useLocale";
import { $selectedDay } from "@/stores/selectedDayStore";

export const SelectedDay = ({
  formatter,
}: Record<string, Intl.DateTimeFormatOptions>) => {
  const locale = useLocale();
  const selectedDay = useStore($selectedDay);
  const selectedDayObj = new Date(selectedDay);
  const intlCurrentDate = new Intl.DateTimeFormat(locale, formatter).format(
    selectedDayObj,
  );

  return <time dateTime={new Date().toDateString()}>{intlCurrentDate}</time>;
};
