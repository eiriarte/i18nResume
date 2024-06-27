/// <reference types="@testing-library/jest-dom" />
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import SectionLanguages from "../src/SectionLanguages";
import { LocaleContext } from "../src/I18NResume";
import React from "react";
import strings from "../src/strings.json";

const mockLocaleContext = {
  locale: "en",
  strings,
};

describe("SectionLanguages Component", () => {
  const renderWithLocale = (ui, { localeValue = mockLocaleContext } = {}) => {
    return render(
      <LocaleContext.Provider value={localeValue}>{ui}</LocaleContext.Provider>
    );
  };

  test("renders nothing when no languages are provided", () => {
    renderWithLocale(<SectionLanguages languages={undefined} />);
    expect(
      screen.queryByRole("heading", { name: "Languages Collapse section" })
    ).not.toBeInTheDocument();
  });

  test("renders languages section with provided languages", () => {
    const languages = [
      {
        key: "1",
        language: "English",
        fluency: "Native",
        keywords: ["English", "Native"],
      },
      {
        key: "2",
        language: "Spanish",
        fluency: "Fluent",
        keywords: ["Spanish", "Fluent"],
      },
    ];
    renderWithLocale(<SectionLanguages languages={languages} />, {
      localeValue: mockLocaleContext,
    });

    expect(
      screen.getByRole("heading", { name: "Languages Collapse section" })
    ).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Spanish")).toBeInTheDocument();
  });

  test("applies OpacityFilter to languages", () => {
    const languages = [
      {
        key: "3",
        language: "French",
        fluency: "Intermediate",
        keywords: ["French", "Intermediate"],
      },
    ];
    renderWithLocale(<SectionLanguages languages={languages} />, {
      localeValue: mockLocaleContext,
    });

    const filterElement = screen.getByText("French").closest("div");
    expect(filterElement).toHaveClass("transition-opacity");
  });

  test("renders languages section with inline pills", () => {
    const languages = [
      {
        key: "4",
        language: "German",
        fluency: "Beginner",
        keywords: ["German", "Beginner"],
      },
    ];
    renderWithLocale(<SectionLanguages languages={languages} />, {
      localeValue: mockLocaleContext,
    });

    const pillElement = screen.getByText("German").closest("div");
    expect(pillElement).toHaveStyle("display: inline");
  });
});
