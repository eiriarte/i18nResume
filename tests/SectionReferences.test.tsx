/// <reference types="@testing-library/jest-dom" />
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import SectionReferences from "../src/SectionReferences";
import { LocaleContext } from "../src/I18NResume";
import strings from "../src/strings.json";

const mockLocaleContext = {
  locale: "en",
  strings,
};

describe("SectionReferences Component", () => {
  const renderWithLocale = (ui, { localeValue = mockLocaleContext } = {}) => {
    return render(
      <LocaleContext.Provider value={localeValue}>{ui}</LocaleContext.Provider>
    );
  };

  test("renders nothing when no references are provided", () => {
    renderWithLocale(<SectionReferences references={undefined} />);
    expect(
      screen.queryByRole("heading", { name: "References Collapse section" })
    ).not.toBeInTheDocument();
  });

  test("renders references section with provided references", () => {
    const references = [
      {
        key: "1",
        name: "Reference One",
        reference: "This is a reference from Reference One.",
        keywords: ["keyword1", "keyword2"],
      },
      {
        key: "2",
        name: "Reference Two",
        reference: "This is a reference from Reference Two.",
        keywords: ["keyword3", "keyword4"],
      },
    ];
    renderWithLocale(<SectionReferences references={references} />, {
      localeValue: mockLocaleContext,
    });

    expect(
      screen.getByRole("heading", { name: "References Collapse section" })
    ).toBeInTheDocument();
    expect(screen.getByText("Reference One")).toBeInTheDocument();
    expect(
      screen.getByText("This is a reference from Reference One.")
    ).toBeInTheDocument();
    expect(screen.getByText("Reference Two")).toBeInTheDocument();
    expect(
      screen.getByText("This is a reference from Reference Two.")
    ).toBeInTheDocument();
  });

  test("applies OpacityFilter to references", () => {
    const references = [
      {
        key: "3",
        name: "Reference Three",
        reference: "This is a reference from Reference Three.",
        keywords: ["keyword5", "keyword6"],
      },
    ];
    renderWithLocale(<SectionReferences references={references} />, {
      localeValue: mockLocaleContext,
    });

    const filterElement = screen.getByText("Reference Three").closest("div");
    expect(filterElement).toHaveClass("transition-opacity");
  });

  test("renders references section with inline OpacityFilter", () => {
    const references = [
      {
        key: "4",
        name: "Reference Four",
        reference: "This is a reference from Reference Four.",
        keywords: ["keyword7", "keyword8"],
      },
    ];
    renderWithLocale(<SectionReferences references={references} />, {
      localeValue: mockLocaleContext,
    });

    const pillElement = screen.getByText("Reference Four").closest("div");
    expect(pillElement).toHaveStyle("display: inline");
  });
});
