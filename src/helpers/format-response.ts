import { NewsSources } from "@/enums/filters";
import { FormattedResultKeys, GuardianApiKeys, NewsApiKey, NYTimesApiKeys } from "@/enums/response";
import { FormattedResults } from "@/types/common";
import { GuardianApiResponse, NewsApiResponse, NYTimesApiResponse } from "@/types/responses";

export interface formatResponseReturnType {
  numberOfPages: number;
  formattedResults: FormattedResults[];
}

export function formatResponse(source: NewsSources, response: unknown): formatResponseReturnType {
  const defaultresult = {
    numberOfPages: 0,
    formattedResults: []
  };
  if (source === NewsSources.THE_GUARDIAN) {
    const guardianResponse = response as GuardianApiResponse;
    console.log(guardianResponse);
    const results = guardianResponse.response.results;
    if (results.length == 0) return defaultresult;
    const numberOfPages = guardianResponse.response.pages;
    const formattedResults: FormattedResults[] = [];
    for (const result of results) {
      formattedResults.push({
        [FormattedResultKeys.AUTHER]: "",
        [FormattedResultKeys.DESCRIPTION]: "",
        [FormattedResultKeys.NEWS_URL]: result[GuardianApiKeys.URL],
        [FormattedResultKeys.PUBLISHED_AT]: result[GuardianApiKeys.PUBLICATION_DATE],
        [FormattedResultKeys.TITLE]: result[GuardianApiKeys.TITLE]
      });
    }
    return {
      numberOfPages,
      formattedResults
    };
  } else if (source === NewsSources.NEW_YORK_TIMES) {
    const nytimesResponse = response as NYTimesApiResponse;
    console.log(nytimesResponse);
    const results = nytimesResponse.response.docs;
    if (results.length == 0) return defaultresult;
    const numberOfPages = nytimesResponse.response.meta.hits;
    const formattedResults: FormattedResults[] = [];
    for (const result of results) {
      formattedResults.push({
        [FormattedResultKeys.AUTHER]: result[NYTimesApiKeys.BY_LINE][NYTimesApiKeys.AUTHER_NAME],
        [FormattedResultKeys.DESCRIPTION]: result[NYTimesApiKeys.DESCRIPTION],
        [FormattedResultKeys.NEWS_URL]: result[NYTimesApiKeys.URL],
        [FormattedResultKeys.PUBLISHED_AT]: result[NYTimesApiKeys.PUBLICATION_DATE],
        [FormattedResultKeys.TITLE]: result[NYTimesApiKeys.HEADLINE][NYTimesApiKeys.TITLE]
      });
    }
    return {
      numberOfPages,
      formattedResults
    };
  } else {
    const newsApiResponse = response as NewsApiResponse;
    console.log(newsApiResponse);
    const results = newsApiResponse.articles;
    if (results.length == 0) return defaultresult;
    const numberOfPages = newsApiResponse.totalResults;
    const formattedResults: FormattedResults[] = [];
    for (const result of results) {
      formattedResults.push({
        [FormattedResultKeys.AUTHER]: result[NewsApiKey.AUTHER],
        [FormattedResultKeys.DESCRIPTION]: result[NewsApiKey.DESCRIPTION],
        [FormattedResultKeys.NEWS_URL]: result[NewsApiKey.URL],
        [FormattedResultKeys.PUBLISHED_AT]: result[NewsApiKey.PUBLICATION_DATE],
        [FormattedResultKeys.TITLE]: result[NewsApiKey.TITLE],
        [FormattedResultKeys.IMAGE]: result[NewsApiKey.IMAGE_URL]
      });
    }
    return {
      numberOfPages,
      formattedResults
    };
  }
}
