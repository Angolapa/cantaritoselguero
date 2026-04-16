import { Banner } from "@/domain/types";

export interface OgBannerCarouselProps {
  banners: Banner[];
  isLoading?: boolean;
  showArrows?: boolean;
  className?: string;
}
