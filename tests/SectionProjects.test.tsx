/// <reference types="@testing-library/jest-dom" />
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import SectionProjects from "../src/SectionProjects";
import { LocaleContext } from "../src/I18NResume";
import React from "react";
import strings from "../src/strings.json";

const mockLocaleContext = {
  locale: "en",
  strings,
};

describe("SectionProjects Component", () => {
  const renderWithLocale = (ui, { localeValue = mockLocaleContext } = {}) => {
    return render(
      <LocaleContext.Provider value={localeValue}>{ui}</LocaleContext.Provider>
    );
  };

  test("renders nothing when no projects are provided", () => {
    renderWithLocale(<SectionProjects projects={undefined} />);
    expect(
      screen.queryByRole("heading", { name: "Projects Collapse section" })
    ).not.toBeInTheDocument();
  });

  test("renders projects section with provided projects", () => {
    const projects = [
      {
        key: "1",
        name: "Project One",
        description: "Description of Project One",
        startDate: "2020-01-01",
        endDate: "2020-12-31",
        url: "https://projectone.example.com",
        keywords: ["keyword1", "keyword2"],
        highlights: [
          { key: "highlight1", value: "Highlight 1" },
          { key: "highlight2", value: "Highlight 2" },
        ],
      },
      {
        key: "2",
        name: "Project Two",
        description: "Description of Project Two",
        startDate: "2019-01-01",
        endDate: "2019-12-31",
        url: "",
        keywords: ["keyword3", "keyword4"],
        highlights: [
          { key: "highlight3", value: "Highlight 3" },
          { key: "highlight4", value: "Highlight 4" },
        ],
      },
    ];
    renderWithLocale(<SectionProjects projects={projects} />, {
      localeValue: mockLocaleContext,
    });

    expect(
      screen.getByRole("heading", { name: "Projects Collapse section" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://projectone.example.com"
    );
    expect(screen.getByText("Description of Project One")).toBeInTheDocument();
    expect(screen.getByText("Highlight 1")).toBeInTheDocument();
    expect(screen.getByText("Highlight 2")).toBeInTheDocument();

    expect(screen.getByText("Project Two")).toBeInTheDocument();
    expect(screen.getByText("Description of Project Two")).toBeInTheDocument();
    expect(screen.getByText("Highlight 3")).toBeInTheDocument();
    expect(screen.getByText("Highlight 4")).toBeInTheDocument();
  });

  test("applies OpacityFilter to projects", () => {
    const projects = [
      {
        key: "3",
        name: "Project Three",
        description: "Description of Project Three",
        startDate: "2018-01-01",
        endDate: "2018-12-31",
        keywords: ["keyword5", "keyword6"],
        highlights: [
          { key: "highlight5", value: "Highlight 5" },
          { key: "highlight6", value: "Highlight 6" },
        ],
      },
    ];
    renderWithLocale(<SectionProjects projects={projects} />, {
      localeValue: mockLocaleContext,
    });

    const filterElement = screen.getByText("Project Three").closest("div");
    expect(filterElement).toHaveClass("transition-opacity");
  });

  test("renders projects section without URL", () => {
    const projects = [
      {
        key: "4",
        name: "Project Four",
        description: "Description of Project Four",
        startDate: "2017-01-01",
        endDate: "2017-12-31",
        keywords: ["keyword7", "keyword8"],
        highlights: [
          { key: "highlight7", value: "Highlight 7" },
          { key: "highlight8", value: "Highlight 8" },
        ],
      },
    ];
    renderWithLocale(<SectionProjects projects={projects} />, {
      localeValue: mockLocaleContext,
    });

    expect(screen.getByText("Project Four")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Description of Project Four")).toBeInTheDocument();
    expect(screen.getByText("Highlight 7")).toBeInTheDocument();
    expect(screen.getByText("Highlight 8")).toBeInTheDocument();
  });
});
