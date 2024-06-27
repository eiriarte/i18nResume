import type { Basics } from "./interfaces";
import { useContext } from "react";
import CollapsibleSection from "./CollapsibleSection";
import { formatAddress } from "./utils";
import { LocaleContext } from "./I18NResume";

export default function SectionContact({
  basics,
}: {
  basics: Basics | undefined;
}) {
  const localeContext = useContext(LocaleContext);
  if (!basics?.email && !basics?.phone && !basics?.location) {
    return null;
  }
  const lang = localeContext.locale;
  return (
    <CollapsibleSection id="contact" heading={localeContext.strings.contact}>
      <address className="not-italic">
        <ul className="space-y-2">
          {basics.email && (
            <li className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height={20}
                width={20}
                viewBox="0 0 20 20"
                fill="currentColor"
                className="min-w-fit"
                aria-label={localeContext.strings.email}
              >
                <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
              </svg>

              <span>{basics.email}</span>
            </li>
          )}
          {basics.phone && (
            <li className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height={20}
                width={20}
                viewBox="0 0 20 20"
                fill="currentColor"
                className="min-w-fit"
                aria-label={localeContext.strings.phone}
              >
                <path
                  fillRule="evenodd"
                  d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z"
                  clipRule="evenodd"
                />
              </svg>

              <span>{basics.phone}</span>
            </li>
          )}
          {basics.location && (
            <li className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height={20}
                width={20}
                viewBox="0 0 20 20"
                fill="currentColor"
                className="min-w-fit"
                aria-label={localeContext.strings.address}
              >
                <path
                  fillRule="evenodd"
                  d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{formatAddress(basics.location, lang)}</span>
            </li>
          )}
        </ul>
      </address>
    </CollapsibleSection>
  );
}
