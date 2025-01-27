import { NewsPerPage, NewsSources } from "@/enums/filters";
import { Option } from "@/types/filters";

const NEWS_SOURCES = {
    [NewsSources.THE_GUARDIAN]: "The Guardian",
    [NewsSources.NEW_YORK_TIMES]: "New York Times",
    [NewsSources.NEWS_API]: "NewsAPI",
};

const RECORDS_PER_PAGE = {
    [NewsPerPage.FIRST]: "10 News Per page",
    [NewsPerPage.SECOND]: "15 News Per page",
    [NewsPerPage.THIRD]: "20 News Per page",
    [NewsPerPage.FOURTH]: "25 News Per page",
};

const SOURCES_LIST: Option[] = [
    { value: NewsSources.THE_GUARDIAN, label: "The Guardian" },
    { value: NewsSources.NEWS_API, label: "NewsAPI" },
    { value: NewsSources.NEW_YORK_TIMES, label: "New York Times" },
];

const CATEGORIES_LIST: Option[] = [
    { value: "politics", label: "Politics" },
    { value: "technology", label: "Technology" },
    { value: "sports", label: "Sports" },
    { value: "entertainment", label: "Entertainment" },
    { value: "health", label: "Health" },
    { value: "science", label: "Science" },
    { value: "business", label: "Business" },
    { value: "world", label: "World" },
    { value: "environment", label: "Environment" },
    { value: "education", label: "Education" },
];

export {
    SOURCES_LIST,
    CATEGORIES_LIST,
    NEWS_SOURCES,
    RECORDS_PER_PAGE
}
