import { formatDate } from "./utils";
import { useContext } from "react";
import { LocaleContext } from "./I18NResume";

interface DateRangeProps {
  startDate?: string | undefined;
  endDate?: string | undefined;
}

export default function DateRange({ startDate, endDate }: DateRangeProps) {
  if (!startDate && !endDate) return null;
  const localeContext = useContext(LocaleContext);
  const locale = localeContext.locale;
  return (
    <>
      <time>{formatDate(startDate, locale)}</time> -{" "}
      <time>
        {endDate ? formatDate(endDate, locale) : localeContext.strings.present}
      </time>
    </>
  );
}
