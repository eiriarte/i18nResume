import React from "react";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { LocaleContext } from "../src/I18NResume";
import strings from "../src/strings.json";
import ExternalLink from "../src/ExternalLink";

describe("ExternalLink Component", () => {
  const renderWithLocale = (
    ui,
    { localeValue = { strings, locale: "en" } } = {}
  ) => {
    return render(
      <LocaleContext.Provider value={localeValue}>{ui}</LocaleContext.Provider>
    );
  };

  test("renders the link text correctly", () => {
    const localeValue = { strings, locale: "en" };
    renderWithLocale(
      <ExternalLink
        text="Click here for more info"
        href="https://example.com"
      />,
      { localeValue }
    );
    expect(screen.getByText("Click here for more")).toBeInTheDocument();
    expect(screen.getByText("info")).toBeInTheDocument();
  });

  test("renders the link with correct href", () => {
    const localeValue = { strings, locale: "en" };
    renderWithLocale(
      <ExternalLink
        text="Click here for more info"
        href="https://example.com"
      />,
      { localeValue }
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
  });

  test("applies the correct aria-label from context", () => {
    const localeValue = { strings, locale: "en" };
    renderWithLocale(
      <ExternalLink
        text="Click here for more info"
        href="https://example.com"
      />,
      { localeValue }
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("aria-label", "External link");
  });

  test("renders the SVG icon", () => {
    const localeValue = { strings, locale: "en" };
    renderWithLocale(
      <ExternalLink
        text="Click here for more info"
        href="https://example.com"
      />,
      { localeValue }
    );
    const svg = screen.getByRole("img", { hidden: true });
    expect(svg).toBeInTheDocument();
  });
});
