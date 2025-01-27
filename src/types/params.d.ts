import { NewsSources } from "@/enums/filters";

export interface NewsApiParam {
    source: NewsSources;
    query?: string;
    startDate?: string;
    endDate?: string;
    sortBy?: string;
    pageSize?: string;
    page?: string;
};

export interface FetchApiParams {
    query: string;
    source: NewsSources;
    categories?: string[];
    startDate?: string;
    endDate?: string;
    page?: string;
    pageSize?: string;
}
