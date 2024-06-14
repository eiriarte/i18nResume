# i18nResume

React component to render multilanguage [json-resume](https://jsonresume.org/) compliant data.

## Features

- Switch between the available languages in your data.
- Filter your resume to show only items with certain keywords attached.
- Collapsible sections to hide non-relevant items.
- Automatically use brand icons for profiles in the following: Whatsapp, Telegram, X (Twitter), Instagram, Facebook, LinkedIn, Github, Stack Overflow.
- It allows you to add your photo (beware, though, that photos in CVs can lead to discrimination).
- Mobile-first responsive design.
- Built with accessibility in mind.
- If no photo is specified, a nice "CV" motif will be used instead.
- Zero dependencies (besides React, of course)
- Typed with TypeScript.

## Installation

Install i18nResume with npm (or your package manager of choice):

```bash
  npm install i18nresume@next
```

## Usage

```javascript
import I18NResume from "i18nresume";
import resumes from "./assets/my_resumes.json";
import "../node_modules/i18nresume/dist/style.css";

const locale = "es";
const keywords = ["backend", "devops"];

function App() {
  return <I18NResume data={resumes} locale={locale} filter={keywords} />;
}
```

- **`data`**: `TranslatedResume` object (see `src/interfaces.ts` for the definition).
- **`locale`**: `string` (it must be a locale supported by the `Intl.DateTimeFormat` and `Intl.DisplayNames` objects). Default is `"en"`.
- **`filter`**: array of `string`. The sections whose `keywords` property doesn't contain any of these strings will be faded out. Default is `[]`, which means "don't apply any filter".

**Note**: The root element of the resume has the class `.i18nresume`. You can use that to customize some CSS styles, like this:

```css
.i18nresume {
  font-family: "Source Serif 4";
}

.i18nresume h1,
h2 {
  font-family: "Oswald";
}
```

## Development

### Installation

```shell
npm install
```

### Dev server

```shell
npm run dev
```

### Running the tests

```shell
npm test
```

### Packaging

```shell
npm run build
```

## License

This project is licensed under the MIT License. See the [LICENSE file](./LICENSE) for the full license text.
