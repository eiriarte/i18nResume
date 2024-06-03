import type { Project } from "./interfaces";
import { useContext } from "react";
import CollapsibleSection from "./CollapsibleSection";
import ExternalLink from "./ExternalLink";
import DateRange from "./DateRange";
import { LocaleContext } from "./I18NResume";
import OpacityFilter from "./OpacityFilter";

export default function SectionProjects({
  projects,
}: {
  projects: Project[] | undefined;
}) {
  if (!projects?.length) return null;
  const localeContext = useContext(LocaleContext);
  return (
    <CollapsibleSection heading={localeContext.strings.projects}>
      <div className="space-y-2">
        {projects.map((project) => (
          <section key={project.key as string}>
            <OpacityFilter keywords={project.keywords ?? []}>
              <h3 className="font-bold text-xl">
                {project.url ? (
                  <ExternalLink text={project.name ?? ""} href={project.url} />
                ) : (
                  project.name
                )}
              </h3>
              <h4>
                <span className="text-stone-500">
                  <DateRange
                    startDate={project.startDate}
                    endDate={project.endDate}
                  />
                </span>
              </h4>
              <p>{project.description}</p>
              <ul className="list-disc pl-4">
                {(
                  (project.highlights as unknown as {
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
