/// <reference types="@testing-library/jest-dom" />
import { render, screen } from "@testing-library/react";
import SectionWork from "../src/SectionWork";
import { describe, expect, test } from "vitest";
import { LocaleContext } from "../src/I18NResume";
import React from "react";
import strings from "../src/strings.json";

const mockLocaleContext = {
  locale: "en",
  strings,
};

describe("SectionWork Component", () => {
  const renderWithLocale = (ui, { localeValue = mockLocaleContext } = {}) => {
    return render(
      <LocaleContext.Provider value={localeValue}>{ui}</LocaleContext.Provider>
    );
  };

  test("renders nothing when no work experiences are provided", () => {
    renderWithLocale(<SectionWork work={undefined} />);
    expect(
      screen.queryByRole("heading", { name: "Experience Collapse section" })
    ).not.toBeInTheDocument();
  });

  test("renders work section with provided experiences", () => {
    const work = [
      {
        key: "1",
        position: "Software Engineer",
        name: "Tech Company Inc.",
        url: "https://techcompany.com",
        startDate: "2022-01-01",
        endDate: "2023-01-01",
        summary: "Developed scalable web applications.",
        highlights: [
          { key: "1", value: "Implemented new features." },
          { key: "2", value: "Optimized database queries." },
        ],
        keywords: ["Software Engineering", "Web Development"],
      },
    ];

    renderWithLocale(<SectionWork work={work} />, {
      localeValue: mockLocaleContext,
    });

    expect(
      screen.getByRole("heading", { name: "Experience Collapse section" })
    ).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(
      screen.getByText("Developed scalable web applications.")
    ).toBeInTheDocument();
    expect(screen.getByText("Implemented new features.")).toBeInTheDocument();
    expect(screen.getByText("Optimized database queries.")).toBeInTheDocument();
  });

  test("renders ExternalLink for work with URL", () => {
    const work = [
      {
        key: "2",
        position: "Product Manager",
        name: "Product Development Co.",
        url: "https://productdevelopment.com",
        startDate: "2023-02-01",
        endDate: "2023-06-30",
        summary: "Managed product lifecycle and roadmap.",
        highlights: [
          { key: "1", value: "Launched new products." },
          { key: "2", value: "Led cross-functional teams." },
        ],
        keywords: ["Product Management", "Leadership"],
      },
    ];

    renderWithLocale(<SectionWork work={work} />, {
      localeValue: mockLocaleContext,
    });

    const externalLinkElement = screen.getByRole("link", {
      name: "External link",
    });
    expect(externalLinkElement).toBeInTheDocument();
    expect(externalLinkElement).toHaveAttribute(
      "href",
      "https://productdevelopment.com"
    );
  });
});
