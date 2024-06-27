/// <reference types="@testing-library/jest-dom" />
import { render, screen } from "@testing-library/react";
import SectionVolunteer from "../src/SectionVolunteer";
import { describe, expect, test } from "vitest";
import { LocaleContext } from "../src/I18NResume";
import React from "react";
import strings from "../src/strings.json";

const mockLocaleContext = {
  locale: "en",
  strings,
};

describe("SectionVolunteer Component", () => {
  const renderWithLocale = (ui, { localeValue = mockLocaleContext } = {}) => {
    return render(
      <LocaleContext.Provider value={localeValue}>{ui}</LocaleContext.Provider>
    );
  };

  test("renders nothing when no volunteer experiences are provided", () => {
    renderWithLocale(<SectionVolunteer volunteer={undefined} />);
    expect(
      screen.queryByRole("heading", { name: "Volunteer Collapse section" })
    ).not.toBeInTheDocument();
  });

  test("renders volunteer section with provided experiences", () => {
    const volunteer = [
      {
        key: "1",
        position: "Volunteer Developer",
        organization: "Open Source Project",
        url: "https://example.com",
        startDate: "2023-01-01",
        endDate: "2023-12-31",
        summary: "Contributed actively to the development.",
        highlights: [
          { key: "1", value: "Implemented new features." },
          { key: "2", value: "Resolved critical bugs." },
        ],
        keywords: ["Open Source", "Development"],
      },
    ];

    renderWithLocale(<SectionVolunteer volunteer={volunteer} />, {
      localeValue: mockLocaleContext,
    });

    expect(
      screen.getByRole("heading", { name: "Volunteer Collapse section" })
    ).toBeInTheDocument();
    expect(screen.getByText("Volunteer Developer")).toBeInTheDocument();
    expect(
      screen.getByText("Contributed actively to the development.")
    ).toBeInTheDocument();
    expect(screen.getByText("Implemented new features.")).toBeInTheDocument();
    expect(screen.getByText("Resolved critical bugs.")).toBeInTheDocument();
  });

  test("renders ExternalLink for volunteer with URL", () => {
    const volunteer = [
      {
        key: "2",
        position: "Volunteer Designer",
        organization: "Design Community",
        url: "https://designcommunity.org",
        startDate: "2023-02-01",
        endDate: "2023-06-30",
        summary: "Designed user interfaces and conducted workshops.",
        highlights: [
          { key: "1", value: "Created engaging designs." },
          { key: "2", value: "Hosted design thinking sessions." },
        ],
        keywords: ["Design", "Community"],
      },
    ];

    renderWithLocale(<SectionVolunteer volunteer={volunteer} />, {
      localeValue: mockLocaleContext,
    });

    const externalLinkElement = screen.getByRole("link", {
      name: "External link",
    });
    expect(externalLinkElement).toBeInTheDocument();
    expect(externalLinkElement).toHaveAttribute(
      "href",
      "https://designcommunity.org"
    );
  });
});
