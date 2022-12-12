import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export const getFormattedDate = (date: string): string => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localDate = format(utcToZonedTime(date, timezone), "PP");
  return localDate;
};
