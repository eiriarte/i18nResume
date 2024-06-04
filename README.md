# i18nresume

React component to render multilanguage [json-resume](https://jsonresume.org/) compliant data.

## Features

- Switch between the available languages in your data.
- Filter your resume to show only items with certain keywords attached.
- Collapsible sections to hide non-relevant items.
- Mobile-first responsive design.
- Accessibility aware.
- Typed with TypeScript.

## Usage

```javascript
import I18NResume from "i18nresume";
import resumes from "./assets/my_resumes.json";

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
