import { isNumeric } from "./utils";
import { useContext } from "react";
import { LocaleContext } from "./I18NResume";

interface PillProps {
  name: string;
  level?: number | string | null | undefined;
}

export default function Pill({ name, level = null }: PillProps) {
  const localeContext = useContext(LocaleContext);
  if (isNumeric(level)) {
    return (
      <span className="mt-2 mr-2 inline-flex items-center rounded-full bg-indigo-50 pr-2 text-indigo-600 lg:text-indigo-50 lg:bg-indigo-500 ring-1 ring-inset ring-indigo-500/10 truncate">
        <svg
          width={25}
          height={25}
          viewBox="0 0 50 50"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle
            r={16}
            cx={26}
            cy={26}
            fill="transparent"
            className="stroke-indigo-200 lg:stroke-indigo-400"
            strokeWidth={5}
            strokeDasharray="100px"
            strokeDashoffset={0}
          ></circle>
          <circle
            r={16}
            cx={26}
            cy={26}
            fill="transparent"
            className="stroke-indigo-600 lg:stroke-indigo-50"
            strokeWidth={5}
            strokeLinecap="round"
            strokeDashoffset={100 - (level as number) + "px"}
            strokeDasharray="100px"
          ></circle>
        </svg>
        &nbsp;
        <span className="text-sm font-medium">{name}</span>
        <span className="sr-only">
          {" " + (localeContext.strings.level ?? "Level")}: {level}
        </span>
      </span>
    );
  }
  return (
    <span className="mt-2 mr-2 inline-flex items-center rounded-full bg-indigo-50 px-2 text-indigo-600 lg:text-indigo-50 lg:bg-indigo-500 ring-1 ring-inset ring-indigo-500/10 truncate">
      <span className="text-sm font-medium">{name}</span>
      {level && <span className="ml-1 text-sm">({level})</span>}
    </span>
  );
}
