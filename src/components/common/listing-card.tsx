"use client";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { FormattedResults } from "@/types/common";
import { formatDateWithDay } from "@/helpers/format-dates";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "../ui/tooltip";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { useState } from "react";

export interface ListingCardProps {
  defaultImageUrl: string,
  page?: number,
  item: FormattedResults
}

const ListingCard = ({
  defaultImageUrl,
  item
}: ListingCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  return (
    <Card className="overflow-clip h-full w-full cursor-pointer" onClick={() => window.open(item.url, '_blank')}>
        <CardContent className="relative h-[280px] mb-3">
          <Image src={item.image || defaultImageUrl} fill alt="News Image" />
        </CardContent>
        <CardFooter>
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-wrap justify-end items-center">
              {
                item.auther &&
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="max-w-[250px] truncate text-ellipsis overflow-hidden text-muted-foreground">
                        {item.auther}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.auther}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              }
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-xl font-semibold">{item.title}</div>
              <div className="text-sm text-muted-foreground">{formatDateWithDay(item["published-at"])}</div>
            </div>
            {
              item.description &&
              <div className="text-lg">
                {item.description}
              </div>
            }
            <div className="ml-auto" onClick={(e) => {
             e.stopPropagation()
              setIsBookmarked(!isBookmarked);
            }}>
              {
                isBookmarked?
                <FaBookmark />
                : <FaRegBookmark />
              }
            </div>
          </div>
        </CardFooter>
    </Card>
  );
}

export default ListingCard;
