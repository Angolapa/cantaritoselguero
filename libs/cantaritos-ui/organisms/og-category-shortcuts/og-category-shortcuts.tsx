"use client";

import { MlCategoryItem } from "../../molecules/ml-category-item";
import { OgCategoryShortcutsProps } from "./og-category-shortcuts.types";

export function OgCategoryShortcuts({
  categories,
  className = "",
}: OgCategoryShortcutsProps) {
  return (
    <nav className={`-mx-4 overflow-x-auto ${className}`}>
      <ul className="flex px-4 pb-2" style={{ gap: "31px" }}>
        {categories.map((category) => (
          <li key={category.label}>
            <MlCategoryItem {...category} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
