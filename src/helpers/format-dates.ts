import { NewsSources } from "@/enums/filters";

export function formatDateWithDay(dateString: string) {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return formatter.format(date);
}

export function formatDateForQuery(
  date: string | undefined,
  source: NewsSources,
  isStartDate: boolean = true
): string {
  let dateObject: Date;

  if (date) {
    dateObject = new Date(date);
  } else {
    const currentDate = new Date();
    if (source === NewsSources.NEWS_API) {
      dateObject = isStartDate
        ? new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 30)
        : currentDate;
    } else {
      dateObject = isStartDate
        ? new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        : new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    }
  }

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");

  return source === NewsSources.NEW_YORK_TIMES ? `${year}${month}${day}` : dateObject.toISOString();
}
