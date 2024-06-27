import type { Reference } from "./interfaces";
import { useContext } from "react";
import CollapsibleSection from "./CollapsibleSection";
import { LocaleContext } from "./I18NResume";
import OpacityFilter from "./OpacityFilter";

export default function SectionReferences({
  references,
}: {
  references: Reference[] | undefined;
}) {
  const localeContext = useContext(LocaleContext);
  if (!references?.length) return null;
  return (
    <CollapsibleSection id="refs" heading={localeContext.strings.references}>
      <ul className="list-disc pl-4">
        {references.map((reference) => (
          <li key={reference.key as string}>
            <OpacityFilter keywords={reference.keywords ?? []} inline={true}>
              <strong>{reference.name}</strong>
              <br />
              {reference.reference}
            </OpacityFilter>
          </li>
        ))}
      </ul>
    </CollapsibleSection>
  );
}
