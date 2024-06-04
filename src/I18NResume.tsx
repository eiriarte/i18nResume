"use client";

import type { Resume, Strings, TranslatedResume } from "./interfaces";
import { createContext } from "react";
import { addKeys } from "./utils";
import SocialLink from "./SocialLink";
import SectionWork from "./SectionWork";
import SectionPublications from "./SectionPublications";
import SectionProjects from "./SectionProjects";
import SectionVolunteer from "./SectionVolunteer";
import SectionCertificates from "./SectionCertificates";
import SectionEducation from "./SectionEducation";
import SectionContact from "./SectionContact";
import SectionSkills from "./SectionSkills";
import SectionAwards from "./SectionAwards";
import SectionReferences from "./SectionReferences";
import SectionLanguages from "./SectionLanguages";
import SectionInterests from "./SectionInterests";
import defaultStrings from "./strings.json";
import CVLogo from "./CVLogo";
import "./i18nresume.css";

interface ILocaleContext {
  strings: Strings;
  locale: string;
}

interface I18NResumeProps {
  data: TranslatedResume;
  locale: string;
  filter?: string[];
}

export const LocaleContext = createContext<ILocaleContext>({
  strings: defaultStrings,
  locale: "en",
});

export const FilterContext = createContext<string[]>([]);

export default function I18NResume({
  data,
  locale = "en",
  filter,
}: I18NResumeProps) {
  const resume: Resume = addKeys(data[locale].resume);
  const strings = data[locale].strings;
  const basics = resume.basics ?? {};
  const profiles = basics?.profiles ?? [];
  if (basics.email) {
    profiles.unshift({
      network: "email",
      key: basics.email,
      url: "mailto:" + basics.email,
    });
  }
  if (basics.url) {
    profiles.unshift({
      network: "personal",
      key: basics.url,
      url: basics.url,
    });
  }
  return (
    <div className="i18nresume">
      <div className="bg-stone-50 sm:p-12">
        <article className="bg-white text-stone-800 container m-auto max-w-screen-lg sm:rounded-xl lg:shadow-lg">
          <header className="lg:space-y-0 lg:flex lg:flex-row-reverse lg:items-stretch bg-stone-200 text-center sm:rounded-t-xl">
            <div className="p-4 pb-0 sm:p-8 sm:pb-0 lg:pb-8 lg:basis-1/3 lg:bg-stone-400 lg:text-stone-50 sm:rounded-tr-xl">
              {basics.image ? (
                <img
                  src={basics.image}
                  alt={strings.imageAlt ?? basics.name}
                  className="max-w-full rounded-full inline-block lg:relative lg:top-1/2 lg:-translate-y-1/2"
                />
              ) : (
                <CVLogo className="max-w-full inline-block lg:relative lg:top-1/2 lg:-translate-y-1/2" />
              )}
            </div>
            <div className="p-4 sm:p-8 lg:basis-2/3 space-y-4 md:space-y-6">
              <hgroup className="space-y-2">
                <h1
                  itemProp="name"
                  className="text-3xl md:text-4xl lg:text-5xl text-indigo-500 font-medium"
                >
                  {basics.name}
                </h1>
                <h2 className="text-xl md:text-3xl lg:text-4xl text-stone-500">
                  {basics.label}
                </h2>
              </hgroup>
              <p className="text-justify lg:text-lg">{basics.summary}</p>
              <ul className="space-x-4 space-y-2">
                {profiles.map((profile) => (
                  <SocialLink key={profile.key as string} profile={profile} />
                ))}
              </ul>
            </div>
          </header>
          <div className="lg:flex">
            <LocaleContext.Provider value={{ strings, locale }}>
              <FilterContext.Provider value={filter ?? []}>
                <div className="p-4 pb-0 sm:p-8 sm:pb-0 md:pb-0 lg:pb-8 lg:basis-2/3">
                  <SectionWork work={resume.work} />
                  <SectionPublications publications={resume.publications} />
                  <SectionProjects projects={resume.projects} />
                  <SectionVolunteer volunteer={resume.volunteer} />
                  <SectionCertificates certificates={resume.certificates} />
                  <SectionEducation education={resume.education} />
                </div>
                <aside className="p-4 pt-0 sm:p-8 sm:pt-0 md:pt-0 lg:pt-8 lg:bg-stone-200 lg:basis-1/3 overflow-x-auto">
                  <SectionContact basics={basics} />
                  <SectionSkills skills={resume.skills} />
                  <SectionAwards awards={resume.awards} />
                  <SectionReferences references={resume.references} />
                  <SectionLanguages languages={resume.languages} />
                  <SectionInterests interests={resume.interests} />
                </aside>
              </FilterContext.Provider>
            </LocaleContext.Provider>
          </div>
        </article>
      </div>{" "}
    </div>
  );
}
