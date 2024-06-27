import type { EducationWithKeys } from "./interfaces";
import CollapsibleSection from "./CollapsibleSection";
import ExternalLink from "./ExternalLink";
import DateRange from "./DateRange";
import { useContext } from "react";
import { LocaleContext } from "./I18NResume";
import OpacityFilter from "./OpacityFilter";

export default function SectionEducation({
  education,
}: {
  education: EducationWithKeys[] | undefined;
}) {
  const localeContext = useContext(LocaleContext);
  if (!education?.length) return null;
  const strings = localeContext.strings;
  return (
    <CollapsibleSection id="education" heading={strings.education}>
      <div className="space-y-2">
        {education.map((training) => (
          <OpacityFilter
            key={training.key as string}
            keywords={training.keywords ?? []}
          >
            <section>
              <h3 className="font-bold text-xl">
                {training.area}
                {training.studyType && " (" + training.studyType + ")"}
              </h3>
              <h4 className="text-lg">
                {training.url ? (
                  <ExternalLink
                    text={training.institution ?? ""}
                    href={training.url}
                  />
                ) : (
                  training.institution
                )}
              </h4>
              <p className="text-stone-500">
                <DateRange
                  startDate={training.startDate}
                  endDate={training.endDate}
                />
                {training.score && (
                  <span className="text-stone-500">
                    <span className="font-medium">
                      {" – " + strings.score}:
                    </span>{" "}
                    {training.score}
                  </span>
                )}
              </p>
              <ul className="list-disc pl-4">
                {(training.courses ?? []).map(
                  (course: { key: string; value: string }) => (
                    <li key={course.key}>{course.value}</li>
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
