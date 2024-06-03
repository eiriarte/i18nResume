import type { Language } from "./interfaces";
import { useContext } from "react";
import CollapsibleSection from "./CollapsibleSection";
import Pill from "./Pill";
import { LocaleContext } from "./I18NResume";
import OpacityFilter from "./OpacityFilter";

export default function SectionLanguages({
  languages,
}: {
  languages: Language[] | undefined;
}) {
  if (!languages?.length) return null;
  const localeContext = useContext(LocaleContext);
  return (
    <CollapsibleSection heading={localeContext.strings.languages}>
      <div className="flex flex-wrap">
        {languages.map((language) => (
          <OpacityFilter
            key={language.key as string}
            keywords={language.keywords ?? []}
            inline={true}
          >
            <Pill name={language.language ?? ""} level={language.fluency} />
          </OpacityFilter>
        ))}
      </div>
    </CollapsibleSection>
  );
}
