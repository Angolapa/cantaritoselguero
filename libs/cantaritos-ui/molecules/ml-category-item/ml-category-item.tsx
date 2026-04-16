"use client";

import Link from "next/link";

import { MlCategoryItemProps } from "./ml-category-item.types";

export function MlCategoryItem({ label, image, href }: MlCategoryItemProps) {
  const content = (
    <>
      <img
        src={image}
        alt={label.replace(/\n/g, " ")}
        style={{ width: "124px", height: "124px" }}
      />
      <span
        className="mt-2 whitespace-pre-line"
        style={{
          color: "#0F2230",
          textAlign: "center",
          fontFamily: "var(--font-barriecito), cursive",
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "82%",
          letterSpacing: "-0.44px",
          textTransform: "uppercase",
          width: "111px",
        }}
      >
        {label}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="flex flex-col items-center shrink-0">
        {content}
      </Link>
    );
  }

  return <div className="flex flex-col items-center shrink-0">{content}</div>;
}
