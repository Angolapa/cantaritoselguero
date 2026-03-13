import { Banner } from "@/domain/types";

export interface OgBannerTableProps {
  banners: Banner[];
  onEdit: (banner: Banner) => void;
  onDelete?: (banner: Banner) => void;
  isLoading?: boolean;
}
