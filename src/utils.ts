import type { Location } from "./interfaces";

export function formatDate(date: string | undefined, lang: string): string {
  let options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: "UTC",
  };
  if (date === undefined) {
    return "n/a";
  }
  if (date.length === 4) {
    options = { year: "numeric", timeZone: "UTC" };
  } else if (date.length === 7) {
    options = { year: "numeric", month: "short", timeZone: "UTC" };
  }
  const df = new Intl.DateTimeFormat(lang, options);

  return df.format(new Date(date));
}

export function isNumeric(n: any): boolean {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function formatAddress(location: Location, lang: string): string {
  const formattedAddress = [];
  formattedAddress.push(location.address);
  let town = undefined;
  if (location.city && location.region) {
    town = location.city + ", " + location.region;
  } else {
    town = location.city ?? location.region;
  }
  if (location.postalCode) {
    town = location.postalCode + " " + (town ?? "");
  }
  formattedAddress.push(town);
  if (location.countryCode) {
    const regionName = new Intl.DisplayNames([lang], { type: "region" });
    try {
      const region = regionName.of(location.countryCode);
      formattedAddress.push(region);
    } catch (err) {}
  }

  return formattedAddress.filter((part) => part).join(". ") + ".";
}

export function addKeys(resume: object) {
  function generateUniqueId() {
    return Math.random().toString(36).substring(2, 15);
  }

  // Recursive function to add keys to arrays
  function processArray(arr: Array<any>): Array<any> {
    return arr.map((item) => {
      if (Array.isArray(item)) {
        return processArray(item);
      } else if (typeof item === "string") {
        return { key: generateUniqueId(), value: item };
      } else if (typeof item === "object" && item !== null) {
        const newItem = { ...item, key: generateUniqueId() };
        for (const key in newItem) {
          if (Array.isArray(newItem[key]) && key !== "keywords") {
            newItem[key] = processArray(newItem[key]);
          }
        }
        return newItem;
      } else {
        return item;
      }
    });
  }

  // Deep copy the resume object
  const copiedResume = JSON.parse(JSON.stringify(resume));

  // Process arrays in the copied object
  for (const key in copiedResume) {
    if (Array.isArray(copiedResume[key])) {
      copiedResume[key] = processArray(copiedResume[key]);
    } else if (
      typeof copiedResume[key] === "object" &&
      copiedResume[key] !== null
    ) {
      for (const subKey in copiedResume[key]) {
        if (Array.isArray(copiedResume[key][subKey])) {
          copiedResume[key][subKey] = processArray(copiedResume[key][subKey]);
        }
      }
    }
  }

  return copiedResume;
}
