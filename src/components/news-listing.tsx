"use client";
import { useSearchParams } from "next/navigation";
import ListingCard from "./common/listing-card";
import { PaginationWithLinks, PaginationWithLinksProps } from "./common/pagination";
import { useAppSelector } from "@/redux/hooks";
import { selectFilter } from "@/redux/slices/searchFilters";
import { selectSearch, setIsSearching } from "@/redux/slices/searchFilters";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getNewsData } from "@/actions/news";
import NewsListingCardSkeleton from "./skeletons/news-listing-skeleton";
import { formatResponse } from "@/helpers/format-response";
import { FormattedResults } from "@/types/common";
import NoResultsBanner from "./common/banners/no-results-banner";
import WarningBanner from "./common/banners/warning-banner";

const defaultProps: PaginationWithLinksProps = {
  page: 1,
  totalCount: 500,
  pageSize: 20,
};

const NewsListing = () => {
    const searchParams = useSearchParams();
    const search = useAppSelector(selectSearch);
    const filters = useAppSelector(selectFilter);
    const dispatch = useDispatch();
    const { source, pageSize }= filters;
    const { isSearching, query } = search;
    const page = searchParams.get("page") || "1";
    const [data, setData] = useState<FormattedResults[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [numberOfPages, setNumberOfPages] = useState<number>(0);

    useEffect(() => {
        if(query){
            setIsError(false);
            setIsLoading(true);
            getNewsData({ ...filters, page, pageSize, query }).then((results: unknown) => {
                console.log(source, results);
                const { numberOfPages, formattedResults } = formatResponse(source, results);
                setNumberOfPages(numberOfPages);
                setData(formattedResults);
                console.log(numberOfPages, formattedResults);
                setIsLoading(false);
                dispatch(setIsSearching(false));
            }).catch((error) => {
                console.log(error);
                setIsError(true);
                setIsLoading(false);
                dispatch(setIsSearching(false));
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSearching, filters, page, pageSize]);

    if(isLoading) return <NewsListingCardSkeleton />

    if(isError){
        return(
            <NoResultsBanner />
        );
    } 

    if(data.length == 0){
        return(
            <WarningBanner />
        );
    } 

    return(
        <section className="w-screen flex flex-col gap-6 p-6">
            <div className="container m-auto min-h-[calc(100vh-122px)] grid place-content-start place-items-start gap-6 w-full grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
                {
                    data.map((item, index) => {
                        return(
                            <ListingCard key={index} defaultImageUrl="/no_image_available.jpg" item={item} />
                        );
                    })
                }
            </div>
            
            <div className="mb-6">
                <PaginationWithLinks {...defaultProps} totalCount={numberOfPages} page={ Number.parseInt(page)} pageSize={Number.parseInt(pageSize)} />
            </div>
        </section>
    );
};

export default NewsListing;
