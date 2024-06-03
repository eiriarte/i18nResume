import type { Volunteer } from "./interfaces";
import CollapsibleSection from "./CollapsibleSection";
import ExternalLink from "./ExternalLink";
import DateRange from "./DateRange";
import { useContext } from "react";
import { LocaleContext } from "./I18NResume";
import OpacityFilter from "./OpacityFilter";

export default function SectionVolunteer({
  volunteer,
}: {
  volunteer: Volunteer[] | undefined;
}) {
  if (!volunteer?.length) return null;
  const localeContext = useContext(LocaleContext);
  return (
    <CollapsibleSection heading={localeContext.strings.volunteer}>
      <div className="space-y-2">
        {volunteer.map((work) => (
          <section key={work.key as string}>
            <OpacityFilter keywords={work.keywords ?? []}>
              <h3 className="font-bold text-xl">{work.position}</h3>
              <h4 className="text-xl">
                {work.url ? (
                  <ExternalLink
                    text={work.organization ?? ""}
                    href={work.url}
                  />
                ) : (
                  work.organization
                )}
              </h4>
              <p className="text-stone-500">
                <DateRange startDate={work.startDate} endDate={work.endDate} />
              </p>
              <p>{work.summary}</p>
              <ul className="list-disc pl-4">
                {(
                  (work.highlights as unknown as {
                    key: string;
                    value: string;
                  }[]) ?? []
                ).map((highlight: { key: string; value: string }) => (
                  <li key={highlight.key}>{highlight.value}</li>
                ))}
              </ul>
            </OpacityFilter>
          </section>
        ))}
      </div>
    </CollapsibleSection>
  );
}
