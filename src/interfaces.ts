export interface Strings {
  work: string;
  volunteer: string;
  education: string;
  awards: string;
  certificates: string;
  publications: string;
  skills: string;
  languages: string;
  interests: string;
  references: string;
  projects: string;
  imageAlt: string;
  score: string;
  level: string;
  contact: string;
  address: string;
  phone: string;
  email: string;
  externalLink: string;
  present: string;
}

export interface Location {
  address?: string;
  postalCode?: string;
  city?: string;
  countryCode?: string;
  region?: string;
  [k: string]: unknown;
}

export interface Profile {
  network?: string;
  username?: string;
  url?: string;
  [k: string]: unknown;
}

export interface Work {
  name?: string;
  location?: string;
  description?: string;
  position?: string;
  url?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
  keywords?: string[];
  [k: string]: unknown;
}

export interface Publication {
  name?: string;
  publisher?: string;
  releaseDate?: string;
  url?: string;
  summary?: string;
  keywords?: string[];
  [k: string]: unknown;
}

export interface Project {
  name?: string;
  description?: string;
  highlights?: string[];
  keywords?: string[];
  startDate?: string;
  endDate?: string;
  url?: string;
  roles?: string[];
  entity?: string;
  type?: string;
  [k: string]: unknown;
}

export interface Volunteer {
  organization?: string;
  position?: string;
  url?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
  keywords?: string[];
  [k: string]: unknown;
}

export interface Certificate {
  name?: string;
  date?: string;
  url?: string;
  issuer?: string;
  keywords?: string[];
  [k: string]: unknown;
}

export interface Education {
  institution?: string;
  url?: string;
  area?: string;
  studyType?: string;
  startDate?: string;
  endDate?: string;
  score?: string;
  courses?: string[];
  keywords?: string[];
  [k: string]: unknown;
}

export interface Basics {
  name?: string;
  label?: string;
  image?: string;
  email?: string;
  phone?: string;
  url?: string;
  summary?: string;
  location?: Location;
  profiles?: Profile[];
  [k: string]: unknown;
}

export interface Skill {
  name?: string;
  level?: string;
  keywords?: string[];
  [k: string]: unknown;
}

export interface Award {
  title?: string;
  date?: string;
  awarder?: string;
  summary?: string;
  keywords?: string[];
  [k: string]: unknown;
}

export interface Language {
  language?: string;
  fluency?: string;
  keywords?: string[];
  [k: string]: unknown;
}

export interface Interest {
  name?: string;
  keywords?: string[];
  [k: string]: unknown;
}

export interface Reference {
  name?: string;
  reference?: string;
  keywords?: string[];
  [k: string]: unknown;
}

export interface Resume {
  basics?: Basics;
  work?: Work[];
  volunteer?: Volunteer[];
  education?: Education[];
  awards?: Award[];
  certificates?: Certificate[];
  publications?: Publication[];
  skills?: Skill[];
  languages?: Language[];
  interests?: Interest[];
  references?: Reference[];
  projects?: Project[];
  meta?: {
    canonical?: string;
    version?: string;
    lastModified?: string;
    [k: string]: unknown;
  };
}

export interface TranslatedResume {
  [locale: string]: {
    strings: Strings;
    resume: Resume;
  };
}
