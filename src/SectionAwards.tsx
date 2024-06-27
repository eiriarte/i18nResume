import type { Award } from "./interfaces";
import { useContext } from "react";
import CollapsibleSection from "./CollapsibleSection";
import { formatDate } from "./utils";
import { LocaleContext } from "./I18NResume";
import OpacityFilter from "./OpacityFilter";

export default function SectionAwards({
  awards,
}: {
  awards: Award[] | undefined;
}) {
  const localeContext = useContext(LocaleContext);
  if (!awards?.length) return null;
  const locale = localeContext.locale;
  return (
    <CollapsibleSection id="awards" heading={localeContext.strings.awards}>
      <ul className="list-disc pl-4">
        {awards.map((award) => (
          <li key={award.key as string}>
            <OpacityFilter keywords={award.keywords ?? []} inline={true}>
              <strong>{award.title}</strong>
              {". " + award.awarder}
              {award.date && (
                <time className="text-stone-500">
                  {", " + formatDate(award.date, locale)}.
                </time>
              )}
              <br />
              {award.summary}
            </OpacityFilter>
          </li>
        ))}
      </ul>
    </CollapsibleSection>
  );
}
