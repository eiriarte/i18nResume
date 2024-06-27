/// <reference types="@testing-library/jest-dom" />
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import SectionInterests from "../src/SectionInterests";
import { LocaleContext } from "../src/I18NResume";
import React from "react";
import strings from "../src/strings.json";

const mockLocaleContext = {
  locale: "en",
  strings,
};

describe("SectionInterests Component", () => {
  const renderWithLocale = (ui, { localeValue = mockLocaleContext } = {}) => {
    return render(
      <LocaleContext.Provider value={localeValue}>{ui}</LocaleContext.Provider>
    );
  };

  test("renders nothing when no interests are provided", () => {
    renderWithLocale(<SectionInterests interests={undefined} />);
    expect(
      screen.queryByRole("heading", { name: "Interests" })
    ).not.toBeInTheDocument();
  });

  test("renders interests section with provided interests", () => {
    const interests = [
      {
        key: "1",
        name: "Coding",
        keywords: ["programming", "software"],
      },
      {
        key: "2",
        name: "Music",
        keywords: ["guitar", "piano"],
      },
    ];
    renderWithLocale(<SectionInterests interests={interests} />, {
      localeValue: mockLocaleContext,
    });

    expect(
      screen.getByRole("heading", { name: "Interests Collapse section" })
    ).toBeInTheDocument();
    expect(screen.getByText("Coding")).toBeInTheDocument();
    expect(screen.getByText("Music")).toBeInTheDocument();
  });

  test("applies OpacityFilter to interests", () => {
    const interests = [
      {
        key: "3",
        name: "Reading",
        keywords: ["books", "novels"],
      },
    ];
    renderWithLocale(<SectionInterests interests={interests} />, {
      localeValue: mockLocaleContext,
    });

    const filterElement = screen.getByText("Reading").closest("div");
    expect(filterElement).toHaveClass("transition-opacity");
  });

  test("renders interests section with inline pills", () => {
    const interests = [
      {
        key: "4",
        name: "Traveling",
        keywords: ["adventure", "exploring"],
      },
    ];
    renderWithLocale(<SectionInterests interests={interests} />, {
      localeValue: mockLocaleContext,
    });

    const pillElement = screen.getByText("Traveling").closest("div");
    expect(pillElement).toHaveStyle("display: inline");
  });
});
