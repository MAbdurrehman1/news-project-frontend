import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  GUARDIAN_API_DOMAIN,
  GUARDIAN_API_ENDPOINT_SEARCH,
  GUARDIAN_API_KEY,
  NEWS_API_DOMAIN,
  NEWS_API_ENDPOINT_EVERYTHING,
  NEWS_API_KEY,
  NEWS_API_VERSION,
  NYTIMES_API_DOMAIN,
  NYTIMES_API_ENDPOINT_SEARCH,
  NYTIMES_API_KEY,
  NYTIMES_API_VERSION
} from "@/env";
import { Filters } from "@/types/filters";
import { NewsApiParamKeys, NewsPerPage, NewsSources } from "@/enums/filters";
import { NewsApiParam } from "@/types/params";
import { formatDateForQuery } from "@/helpers/format-dates";

export const sourceBaseURLs = {
  [NewsSources.NEWS_API]: `${NEWS_API_DOMAIN}${NEWS_API_VERSION}`,
  [NewsSources.NEW_YORK_TIMES]: `${NYTIMES_API_DOMAIN}${NYTIMES_API_VERSION}`,
  [NewsSources.THE_GUARDIAN]: `${GUARDIAN_API_DOMAIN}`
};

export const sourceQueryParamFunctions = {
  [NewsSources.NEWS_API]: getNewsApiQueryParams,
  [NewsSources.THE_GUARDIAN]: getNewsApiQueryParams,
  [NewsSources.NEW_YORK_TIMES]: getNewsApiQueryParams
};

export const newsApiKeys = {
  [NewsSources.NEWS_API]: NEWS_API_KEY,
  [NewsSources.THE_GUARDIAN]: GUARDIAN_API_KEY,
  [NewsSources.NEW_YORK_TIMES]: NYTIMES_API_KEY
};

export const newsApiEndpoints = {
  [NewsSources.NEWS_API]: NEWS_API_ENDPOINT_EVERYTHING,
  [NewsSources.THE_GUARDIAN]: GUARDIAN_API_ENDPOINT_SEARCH,
  [NewsSources.NEW_YORK_TIMES]: NYTIMES_API_ENDPOINT_SEARCH
};

export const newsApiParamKeys = {
  [NewsSources.NEWS_API]: {
    [NewsApiParamKeys.API_KEY]: "apiKey",
    [NewsApiParamKeys.END_DATE]: "to",
    [NewsApiParamKeys.START_DATE]: "from",
    [NewsApiParamKeys.QUERY]: "q",
    [NewsApiParamKeys.SORTED_BY]: "sortBy",
    [NewsApiParamKeys.PAGE]: "page",
    [NewsApiParamKeys.PAGE_SIZE]: "pageSize"
  },
  [NewsSources.THE_GUARDIAN]: {
    [NewsApiParamKeys.API_KEY]: "api-key",
    [NewsApiParamKeys.END_DATE]: "to-date",
    [NewsApiParamKeys.START_DATE]: "from-date",
    [NewsApiParamKeys.QUERY]: "q",
    [NewsApiParamKeys.SORTED_BY]: "order-by",
    [NewsApiParamKeys.PAGE]: "page",
    [NewsApiParamKeys.PAGE_SIZE]: "page-size"
  },
  [NewsSources.NEW_YORK_TIMES]: {
    [NewsApiParamKeys.API_KEY]: "api-key",
    [NewsApiParamKeys.END_DATE]: "end_date",
    [NewsApiParamKeys.START_DATE]: "begin_date",
    [NewsApiParamKeys.QUERY]: "q",
    [NewsApiParamKeys.SORTED_BY]: "sort",
    [NewsApiParamKeys.PAGE]: "page",
    [NewsApiParamKeys.PAGE_SIZE]: "page-size"
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isFilterAdded(filters: Filters) {
  if (filters.categories && filters.categories.length > 0) return true;
  if (filters.source !== NewsSources.THE_GUARDIAN) return true;
  if (filters.endDate) return true;
  if (filters.startDate) return true;
  if (filters.pageSize !== NewsPerPage.FIRST) return true;
  return false;
}

export function getNewsApiQueryParams({
  source,
  query = "",
  startDate,
  endDate,
  page = "1",
  pageSize = NewsPerPage.FIRST,
  sortBy
}: NewsApiParam) {
  const queryParamsKey = newsApiParamKeys[source];
  let queryParams = `${queryParamsKey[NewsApiParamKeys.QUERY]}=${query}`;

  queryParams += `&${queryParamsKey[NewsApiParamKeys.START_DATE]}=${formatDateForQuery(
    startDate,
    source
  )}`;

  queryParams += `&${queryParamsKey[NewsApiParamKeys.END_DATE]}=${formatDateForQuery(
    endDate,
    source,
    false
  )}`;

  if (page) queryParams += `&${queryParamsKey[NewsApiParamKeys.PAGE]}=${page}`;
  if (pageSize) queryParams += `&${queryParamsKey[NewsApiParamKeys.PAGE_SIZE]}=${pageSize}`;

  if (sortBy) {
    queryParams += `&${queryParamsKey[NewsApiParamKeys.SORTED_BY]}=${sortBy}`;
  }

  queryParams += `&${queryParamsKey[NewsApiParamKeys.API_KEY]}=${newsApiKeys[source]}`;

  return queryParams;
}
