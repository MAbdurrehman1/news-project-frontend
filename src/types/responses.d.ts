export interface GuardianApiResponse {
    response: {
        pages: number;
        results: GuardianApiArticle[];
    }
}

export interface GuardianApiArticle {
    webPublicationDate: string;
    webTitle: string;
    webUrl: string;
}

export interface NYTimesApiResponse {
    copyright: string;
    response: {
        docs: NYTimesApiArticle[];
        meta: {
            hits: number;
        }
    }
    status: string;
};

export interface NYTimesApiArticle {
    abstract: string;
    headline: {
        main: string;
    };
    pub_date: string;
    web_url: string;
    byline: {
        original: string;
    };
    multimedia: {
        type: string;
        url: string;
    }

};

export interface NewsApiResponse {
    articles: NewsApiArticle[];
    totalResults: number;
    status: string;
}

export interface NewsApiArticle {
    author: string;
    description: string;
    publishedAt: string;
    title: string;
    url: string;
    urlToImage: string;
}
