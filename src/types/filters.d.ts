import { NewsSources } from "@/enums/filters";

export interface Option {
    value: string;
    label: string;
}

export interface Filters {
    query: string;
    source: NewsSources;
    categories: string[];
    startDate?: Date;
    endDate?: Date;
    pageSize: string;
}

export interface StoreFilters {
    query: string;
    source: NewsSources;
    categories: string[];
    startDate?: string;
    endDate?: string;
    pageSize: string;
}

export interface StoreFiltersState {
    filters: StoreFilters;
}

export interface FiltersState {
    filters: Filters;
}

export interface SearchState {
    isSearching: boolean;
    query: string;
}
