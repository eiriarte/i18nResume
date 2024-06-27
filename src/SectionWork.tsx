import type { WorkWithKeys } from "./interfaces";
import { useContext } from "react";
import CollapsibleSection from "./CollapsibleSection";
import ExternalLink from "./ExternalLink";
import DateRange from "./DateRange";
import { LocaleContext } from "./I18NResume";
import OpacityFilter from "./OpacityFilter";

export default function SectionWork({
  work,
}: {
  work: WorkWithKeys[] | undefined;
}) {
  const localeContext = useContext(LocaleContext);
  if (!work?.length) return null;
  return (
    <CollapsibleSection id="work" heading={localeContext.strings.work}>
      <div className="space-y-2">
        {work.map((job) => (
          <OpacityFilter key={job.key as string} keywords={job.keywords ?? []}>
            <section>
              <h3 className="font-bold text-xl">{job.position}</h3>
              <h4 className="text-xl">
                {job.url ? (
                  <ExternalLink text={job.name ?? ""} href={job.url} />
                ) : (
                  job.name
                )}
              </h4>
              <p>
                <span className="text-stone-500">
                  <DateRange startDate={job.startDate} endDate={job.endDate} />
                </span>
              </p>
              <p>{job.summary}</p>
              <ul className="list-disc pl-4">
                {(job.highlights ?? []).map(
                  (highlight: { key: string; value: string }) => (
                    <li key={highlight.key}>{highlight.value}</li>
                  )
                )}
              </ul>
            </section>
          </OpacityFilter>
        ))}
      </div>
    </CollapsibleSection>
  );
}
