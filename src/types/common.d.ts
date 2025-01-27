import { FormattedResultKeys } from "@/enums/response";

export interface FormattedResults {
  [FormattedResultKeys.AUTHER]: string;
  [FormattedResultKeys.TITLE]: string;
  [FormattedResultKeys.DESCRIPTION]: string;
  [FormattedResultKeys.PUBLISHED_AT]: string;
  [FormattedResultKeys.NEWS_URL]: string;
  [FormattedResultKeys.IMAGE]?: string;
}
