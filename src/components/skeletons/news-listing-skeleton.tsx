import ListingCardSkeleton from "./listing-card-skeleton";

const NewsListingCardSkeleton = () => {
    const emptyArray = new Array(6).fill(0);
    return (
        <section className="w-screen flex flex-col gap-6 p-6">
            <div className="container m-auto min-h-[calc(100vh-122px)] grid place-content-start place-items-start gap-6 w-full grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
                {emptyArray.map((value: number, index: number) => {
                    return (
                        <ListingCardSkeleton key={index} />
                    )
                })}
            </div>
        </section>

    )

};

export default NewsListingCardSkeleton;
