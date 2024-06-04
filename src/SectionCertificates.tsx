import type { Certificate } from "./interfaces";
import { formatDate } from "./utils";
import CollapsibleSection from "./CollapsibleSection";
import ExternalLink from "./ExternalLink";
import { useContext } from "react";
import { LocaleContext } from "./I18NResume";
import OpacityFilter from "./OpacityFilter";

export default function SectionCertificates({
  certificates,
}: {
  certificates: Certificate[] | undefined;
}) {
  if (!certificates?.length) return null;
  const localeContext = useContext(LocaleContext);
  const locale = localeContext.locale;
  return (
    <CollapsibleSection id="certs" heading={localeContext.strings.certificates}>
      <ul className="list-disc pl-4">
        {certificates.map((certificate) => (
          <li key={certificate.key as string}>
            <OpacityFilter keywords={certificate.keywords ?? []} inline={true}>
              <strong>{certificate.name}</strong>
              {". " + certificate.issuer}
              <time className="text-stone-500">
                {certificate.url ? (
                  <ExternalLink
                    text={
                      certificate.date
                        ? ", " + formatDate(certificate.date, locale) + "."
                        : ""
                    }
                    href={certificate.url}
                  />
                ) : certificate.date ? (
                  ", " + formatDate(certificate.date, locale) + "."
                ) : (
                  ""
                )}
              </time>
            </OpacityFilter>
          </li>
        ))}
      </ul>
    </CollapsibleSection>
  );
}
