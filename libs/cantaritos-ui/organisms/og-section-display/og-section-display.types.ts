import { Section } from "@/domain/types";

import { SectionBannerColor } from "../../molecules/ml-section-banner";

export interface OgSectionDisplayProps {
  section: Section;
  color?: SectionBannerColor;
  viewMoreHref?: string;
  viewMoreLabel?: string;
}
