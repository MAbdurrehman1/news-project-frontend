import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { NewsPerPage, NewsSources } from "@/enums/filters";
import { StoreFiltersState, SearchState } from "@/types/filters";

const initialState: { filters: StoreFiltersState["filters"]; search: SearchState } = {
  filters: {
    query: "",
    categories: [],
    source: NewsSources.THE_GUARDIAN,
    startDate: undefined,
    endDate: undefined,
    pageSize: NewsPerPage.FIRST
  },
  search: {
    isSearching: false,
    query: ""
  }
};

export const filterSearchSlice = createSlice({
  name: "searchFilters",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<StoreFiltersState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.search.query = action.payload;
    },
    setIsSearching: (state, action: PayloadAction<boolean>) => {
      state.search.isSearching = action.payload;
    },
    resetSearch: (state) => {
      state.search = initialState.search;
    }
  }
});

export const { setFilters, resetFilters, setQuery, setIsSearching, resetSearch } =
  filterSearchSlice.actions;

export const selectFilter = (state: RootState) => state.searchFilters.filters;
export const selectSearch = (state: RootState) => state.searchFilters.search;

export default filterSearchSlice.reducer;
