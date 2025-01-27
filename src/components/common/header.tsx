"use client";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { TbFilterSearch } from "react-icons/tb";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../ui/dialog";
import { MultiSelect } from "../fields/multi-select";
import { DatePicker } from "../fields/date-picker";
import { CATEGORIES_LIST, NEWS_SOURCES, RECORDS_PER_PAGE } from "@/constants/filters";
import { useAppSelector } from "@/redux/hooks";
import {
    selectFilter,
    setFilters as storeSetFilters
} from "@/redux/slices/searchFilters";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Button } from "../ui/button";
import { Toggle } from "../ui/toggle";
import { isFilterAdded } from "@/lib/utils";
import Select from "../fields/select";
import { NewsPerPage, NewsSources } from "@/enums/filters";
import { selectSearch, setIsSearching, setQuery as setStoreQuery } from "@/redux/slices/searchFilters";
import { Filters } from "@/types/filters";

export interface FiltersDialogProps {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  updateFilter: (key: keyof Filters, value: unknown) => void;
  searchQuery: VoidFunction;
}

const DEFAULT_FILTER = {
    query: "",
    pageSize: NewsPerPage.FIRST,
    startDate: undefined,
    endDate: undefined,
    source: NewsSources.THE_GUARDIAN,
    categories: [],
};

const Header = () => {
    const storeFilters = useAppSelector(selectFilter);
    const search = useAppSelector(selectSearch);
    const { isSearching } = search;
    const { startDate: fromDate, endDate: toDate, source, categories } = storeFilters;
    const dispatch = useDispatch();
    const [filters, setFilters] = useState<Filters>({
        query: "",
        pageSize: '10',
        startDate: fromDate ? new Date(fromDate) : undefined,
        endDate: toDate ? new Date(toDate) : undefined,
        source: source,
        categories: categories || [],
    });

    const updateFilterState = (key: keyof Filters, value: unknown) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const onQueryChange = (value: string) => {
        updateFilterState("query", value);
        dispatch(setStoreQuery(value));
        console.log(filters["query"]);
        console.log(search)
        console.log(value);
        console.log(isSearching);
    };

    const searchQuery = () => {
        if(filters["query"]) {
            dispatch(setIsSearching(true));
        }
    };

    return (
        <section>
            <div className="container m-auto flex justify-between items-center p-4 w-100">
                <div className="text-xl font-bold">
                    <Link href={ROUTES.home}>
                        Logo
                    </Link>
                </div>
            </div>
            <Separator />
            <div className="flex justify-center items-center gap-3 p-3">
                <div className="search flex gap-2 items-center bg-white h-9 w-2/4 rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                    <div className="w-full">
                        <Input type="text" value={filters["query"]} onChange={(e) => onQueryChange(e.target.value)} className="border-none outline-none" style={{ all: 'unset', width: "100%" }} placeholder="Search Articles..." />
                    </div>
                    <div className="ml-auto">
                        <FiltersDialog filters={filters} setFilters={setFilters} updateFilter={updateFilterState} searchQuery={searchQuery} />
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <Button onClick={searchQuery} disabled={isSearching || !filters["query"]}>Search</Button>
                </div>
            </div>
            <Separator />
        </section>
    );
};

export default Header;

function FiltersDialog({filters, setFilters, updateFilter, searchQuery}: FiltersDialogProps) {
    const dispatch = useDispatch();
    
    const resetFilters = () => {
        setFilters(DEFAULT_FILTER);
    };

    const onApplyFilters = () => {
        dispatch(
            storeSetFilters({
                startDate: filters.startDate?.toISOString(),
                endDate: filters.endDate?.toISOString(),
                source: filters.source,
                categories: filters.categories,
                pageSize: filters.pageSize,
            })
        );
        searchQuery();
    };

    return (
        <Dialog>
            <DialogTrigger>
                <Toggle size={"sm"} pressed={isFilterAdded(filters)} aria-label="Toggle italic" asChild>
                    <TbFilterSearch />
                </Toggle>
            </DialogTrigger>
            <DialogContent onInteractOutside={(event) => event.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Article Filters</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <Select
                    items={NEWS_SOURCES}
                    selectedValue={filters["source"]}
                    onValueChange={(source: string) => updateFilter("source", source)}
                />
                {filters["source"] !== NewsSources.NEWS_API && (
                    <MultiSelect
                        options={CATEGORIES_LIST}
                        onValueChange={(categories: string[]) => updateFilter("categories", categories)}
                        defaultValue={filters["categories"]}
                        placeholder="Select Categories"
                        variant="inverted"
                        animation={2}
                        maxCount={5}
                    />
                )}
                <Select
                    items={RECORDS_PER_PAGE}
                    selectedValue={filters["pageSize"]}
                    onValueChange={(pageSize: string) => updateFilter("pageSize", pageSize)}
                />
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <DatePicker
                            label="Start date"
                            placeholder="Pick start date"
                            date={filters["startDate"]}
                            setDate={(date?: Date) => updateFilter("startDate", date)}
                        />
                        <DatePicker
                            label="End date"
                            placeholder="Pick end date"
                            date={filters["endDate"]}
                            setDate={(date?: Date) => updateFilter("endDate", date)}
                        />
                    </div>
                    {filters["source"] === NewsSources.NEWS_API && (
                        <p className="text-sm text-muted-foreground text-yellow-500">Please select a start date within the last 30 days.</p>
                    )}
                </div>

                <DialogFooter className="sm:justify-between">
                    <div className="flex justify-center items-center">
                        <Button onClick={resetFilters} variant="destructive">Reset Filters</Button>
                    </div>
                    <DialogClose asChild>
                        <Button type="button" onClick={onApplyFilters}>
                            Apply Filters
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
