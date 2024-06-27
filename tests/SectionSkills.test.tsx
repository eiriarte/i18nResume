/// <reference types="@testing-library/jest-dom" />
import { render, screen } from "@testing-library/react";
import SectionSkills from "../src/SectionSkills";
import { describe, expect, test } from "vitest";
import { LocaleContext } from "../src/I18NResume";
import React from "react";
import strings from "../src/strings.json";

const mockLocaleContext = {
  locale: "en",
  strings,
};

describe("SectionSkills Component", () => {
  const renderWithLocale = (ui, { localeValue = mockLocaleContext } = {}) => {
    return render(
      <LocaleContext.Provider value={localeValue}>{ui}</LocaleContext.Provider>
    );
  };

  test("renders nothing when no skills are provided", () => {
    renderWithLocale(<SectionSkills skills={undefined} />);
    expect(
      screen.queryByRole("heading", { name: "Skills Collapse section" })
    ).not.toBeInTheDocument();
  });

  test("renders skills section with provided skills", () => {
    const skills = [
      {
        key: "1",
        name: "JavaScript",
        level: "Advanced",
        keywords: ["JavaScript", "Programming"],
      },
      {
        key: "2",
        name: "React",
        level: "Intermediate",
        keywords: ["React", "Frontend"],
      },
    ];
    renderWithLocale(<SectionSkills skills={skills} />, {
      localeValue: mockLocaleContext,
    });

    expect(
      screen.getByRole("heading", { name: "Skills Collapse section" })
    ).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("(Advanced)")).toBeInTheDocument();
    expect(screen.getByText("(Intermediate)")).toBeInTheDocument();
  });

  test("applies OpacityFilter to skills", () => {
    const skills = [
      {
        key: "3",
        name: "CSS",
        level: "Expert",
        keywords: ["CSS", "Styling"],
      },
    ];
    renderWithLocale(<SectionSkills skills={skills} />, {
      localeValue: mockLocaleContext,
    });

    const filterElement = screen.getByText("CSS").closest("div");
    expect(filterElement).toHaveClass("transition-opacity");
  });

  test("renders skills section with inline OpacityFilter", () => {
    const skills = [
      {
        key: "4",
        name: "Node.js",
        level: "Beginner",
        keywords: ["Node.js", "Backend"],
      },
    ];
    renderWithLocale(<SectionSkills skills={skills} />, {
      localeValue: mockLocaleContext,
    });

    const pillElement = screen.getByText("Node.js").closest("div");
    expect(pillElement).toHaveStyle("display: inline");
  });
});
