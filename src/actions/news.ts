'use server';

import { newsApiEndpoints, sourceBaseURLs, sourceQueryParamFunctions } from "@/lib/utils";
import { FetchApiParams } from "@/types/params";

export async function getNewsData(params: FetchApiParams) {
    try {
        const ENDPOINT = newsApiEndpoints[params.source];
        const url = sourceBaseURLs[params.source];
        const getQueryParams = sourceQueryParamFunctions[params.source];
        const queryParams = getQueryParams(params);

        const fullUrl = `${url}${ENDPOINT}?${queryParams}`;

        const response = await fetch(fullUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(fullUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching news data:", error);
        throw error;
    }
}
