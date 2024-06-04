import { useContext } from "react";
import { LocaleContext } from "./I18NResume";

interface ExternalLinkProps {
  text: string;
  href: string;
}

export default function ExternalLink({ text, href }: ExternalLinkProps) {
  const localeContext = useContext(LocaleContext);
  const words = text.split(" ");
  const lastWord = words.pop();
  return (
    <>
      {words.join(" ") + " "}
      <span className="whitespace-nowrap">
        {lastWord}
        <a
          href={href}
          target="_blank"
          className="inline text-indigo-500 hover:text-indigo-300 ml-1"
          aria-label={localeContext.strings.externalLink}
        >
          <svg
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            height={20}
            width={20}
            viewBox="0 0 20 20"
            fill="currentColor"
            className="inline w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </span>
    </>
  );
}
