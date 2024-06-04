import type { Publication } from "./interfaces";
import { useContext } from "react";
import CollapsibleSection from "./CollapsibleSection";
import ExternalLink from "./ExternalLink";
import { LocaleContext } from "./I18NResume";
import OpacityFilter from "./OpacityFilter";
import { formatDate } from "./utils";

export default function SectionPublications({
  publications,
}: {
  publications: Publication[] | undefined;
}) {
  if (!publications?.length) return null;
  const localeContext = useContext(LocaleContext);
  return (
    <CollapsibleSection id="pubs" heading={localeContext.strings.publications}>
      <ul className="list-disc pl-4">
        {publications.map((publication) => (
          <li key={publication.key as string}>
            <OpacityFilter keywords={publication.keywords ?? []}>
              <strong className="font-bold">{publication.name}</strong>.
              {publication.publisher && " " + publication.publisher},
              <time className="text-stone-500">
                {" "}
                {publication.url ? (
                  <ExternalLink
                    text={
                      formatDate(
                        publication.releaseDate,
                        localeContext.locale
                      ) + "."
                    }
                    href={publication.url}
                  />
                ) : (
                  formatDate(publication.releaseDate, localeContext.locale) +
                  "."
                )}
              </time>
              <br />
              {publication.summary}
            </OpacityFilter>
          </li>
        ))}
      </ul>
    </CollapsibleSection>
  );
}
