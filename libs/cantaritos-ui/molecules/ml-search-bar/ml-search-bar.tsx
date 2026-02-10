"use client";

import { Search } from "lucide-react";

import { AtInput } from "@/libs/cantaritos-ui/atoms";

import { MlSearchBarProps } from "./ml-search-bar.types";

export function MlSearchBar({
  placeholder = "Buscar...",
  value,
  onValueChange,
}: MlSearchBarProps) {
  return (
    <AtInput
      placeholder={placeholder}
      value={value}
      onValueChange={onValueChange}
      startContent={<Search className="h-4 w-4 text-gray-400" />}
      isClearable
      className="max-w-sm"
    />
  );
}
