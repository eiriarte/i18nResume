import { useContext } from "react";
import { FilterContext } from "./I18NResume";

interface OpacityFilterProps {
  keywords: string[];
  children: React.ReactNode;
  inline?: boolean;
}

export default function OpacityFilter({
  keywords,
  children,
  inline = false,
}: OpacityFilterProps) {
  const style = inline ? { display: "inline" } : undefined;
  const query = useContext(FilterContext) ?? [];
  let opaque = true;
  if (keywords.length && query.length) {
    opaque = query.filter((keyword) => keywords.includes(keyword)).length > 0;
  }
  const className =
    "transition-opacity duration-200 " +
    (opaque ? "opacity-100" : "opacity-10");
  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
}
