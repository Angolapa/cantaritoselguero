import type { DirectorioTab } from "../og-directorio-hero/og-directorio-hero.types";

export interface OgDirectorioTabsProps {
  activeTab: DirectorioTab;
  onTabChange: (tab: DirectorioTab) => void;
}
