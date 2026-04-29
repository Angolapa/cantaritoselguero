import { AgencyCard } from "@/domain/types";

export interface OgAgencyCardsGridProps {
  cards: AgencyCard[];
  isLoading?: boolean;
  searchPlaceholder?: string;
}
