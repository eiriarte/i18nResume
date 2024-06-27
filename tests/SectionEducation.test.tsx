/// <reference types="@testing-library/jest-dom" />
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import SectionEducation from "../src/SectionEducation";
import { LocaleContext } from "../src/I18NResume";
import React from "react";
import strings from "../src/strings.json";

const mockLocaleContext = {
  locale: "en",
  strings,
};

describe("SectionEducation Component", () => {
  const renderWithLocale = (ui, { localeValue = mockLocaleContext } = {}) => {
    return render(
      <LocaleContext.Provider value={localeValue}>{ui}</LocaleContext.Provider>
    );
  };

  test("renders nothing when no education data is provided", () => {
    renderWithLocale(<SectionEducation education={undefined} />);
    expect(
      screen.queryByRole("heading", { name: "Education Collapse section" })
    ).not.toBeInTheDocument();
  });

  test("renders education section with provided education data", () => {
    const education = [
      {
        key: "1",
        area: "Computer Science",
        studyType: "Bachelor",
        institution: "University of Testing",
        startDate: "2015-09-01",
        endDate: "2019-06-01",
        score: "3.8 GPA",
        url: "https://university.example.com",
        keywords: ["CS", "Bachelor"],
        courses: [
          { key: "course1", value: "Introduction to Programming" },
          { key: "course2", value: "Data Structures" },
        ],
      },
    ];
    renderWithLocale(<SectionEducation education={education} />, {
      localeValue: mockLocaleContext,
    });

    expect(
      screen.getByRole("heading", { name: "Education Collapse section" })
    ).toBeInTheDocument();
    expect(screen.getByText("Computer Science (Bachelor)")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "External link" })).toHaveAttribute(
      "href",
      "https://university.example.com"
    );
    expect(screen.getByText("Introduction to Programming")).toBeInTheDocument();
    expect(screen.getByText("Data Structures")).toBeInTheDocument();
  });

  test("renders education section without URL", () => {
    const education = [
      {
        key: "2",
        area: "Mathematics",
        studyType: "Master",
        institution: "College of Testing",
        startDate: "2016-09-01",
        endDate: "2018-06-01",
        score: "4.0 GPA",
        keywords: ["Math", "Master"],
        courses: [
          { key: "course3", value: "Calculus" },
          { key: "course4", value: "Linear Algebra" },
        ],
      },
    ];
    renderWithLocale(<SectionEducation education={education} />, {
      localeValue: mockLocaleContext,
    });

    expect(
      screen.getByRole("heading", { name: "Education Collapse section" })
    ).toBeInTheDocument();
    expect(screen.getByText("Mathematics (Master)")).toBeInTheDocument();
    expect(screen.getByText("College of Testing")).toBeInTheDocument();
    expect(screen.getByText("Calculus")).toBeInTheDocument();
    expect(screen.getByText("Linear Algebra")).toBeInTheDocument();
  });

  test("renders education section without score", () => {
    const education = [
      {
        key: "3",
        area: "Physics",
        studyType: "PhD",
        institution: "Institute of Testing",
        startDate: "2017-09-01",
        endDate: "2021-06-01",
        keywords: ["Physics", "PhD"],
        courses: [
          { key: "course5", value: "Quantum Mechanics" },
          { key: "course6", value: "Statistical Physics" },
        ],
      },
    ];
    renderWithLocale(<SectionEducation education={education} />, {
      localeValue: mockLocaleContext,
    });

    expect(
      screen.getByRole("heading", { name: "Education Collapse section" })
    ).toBeInTheDocument();
    expect(screen.getByText("Physics (PhD)")).toBeInTheDocument();
    expect(screen.getByText("Institute of Testing")).toBeInTheDocument();
    expect(screen.getByText("Quantum Mechanics")).toBeInTheDocument();
    expect(screen.getByText("Statistical Physics")).toBeInTheDocument();
  });
});
