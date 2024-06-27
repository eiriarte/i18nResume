import type { Interest } from "./interfaces";
import { useContext } from "react";
import CollapsibleSection from "./CollapsibleSection";
import Pill from "./Pill";
import { LocaleContext } from "./I18NResume";
import OpacityFilter from "./OpacityFilter";

export default function SectionInterests({
  interests,
}: {
  interests: Interest[] | undefined;
}) {
  const localeContext = useContext(LocaleContext);
  if (!interests?.length) return null;
  return (
    <CollapsibleSection
      id="interests"
      heading={localeContext.strings.interests}
    >
      <div className="flex flex-wrap">
        {interests.map((interest) => (
          <OpacityFilter
            key={interest.key as string}
            keywords={interest.keywords ?? []}
            inline={true}
          >
            <Pill name={interest.name ?? ""} />
          </OpacityFilter>
        ))}
      </div>
    </CollapsibleSection>
  );
}
