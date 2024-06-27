/// <reference types="@testing-library/jest-dom" />
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import SectionPublications from "../src/SectionPublications";
import { LocaleContext } from "../src/I18NResume";
import React from "react";
import strings from "../src/strings.json";

const mockLocaleContext = {
  locale: "en",
  strings,
};

describe("SectionPublications Component", () => {
  const renderWithLocale = (ui, { localeValue = mockLocaleContext } = {}) => {
    return render(
      <LocaleContext.Provider value={localeValue}>{ui}</LocaleContext.Provider>
    );
  };

  test("renders nothing when no publications are provided", () => {
    renderWithLocale(<SectionPublications publications={undefined} />);
    expect(
      screen.queryByRole("heading", { name: "Publications Collapse section" })
    ).not.toBeInTheDocument();
  });

  test("renders publications section with provided publications", () => {
    const publications = [
      {
        key: "1",
        name: "Publication One",
        publisher: "Publisher One",
        releaseDate: "2021-01-01",
        url: "https://publicationone.example.com",
        summary: "Summary of Publication One",
        keywords: ["keyword1", "keyword2"],
      },
      {
        key: "2",
        name: "Publication Two",
        publisher: "Publisher Two",
        releaseDate: "2020-01-01",
        url: "",
        summary: "Summary of Publication Two",
        keywords: ["keyword3", "keyword4"],
      },
    ];
    renderWithLocale(<SectionPublications publications={publications} />, {
      localeValue: mockLocaleContext,
    });

    expect(
      screen.getByRole("heading", { name: "Publications Collapse section" })
    ).toBeInTheDocument();
    expect(screen.getByText("Publication One")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://publicationone.example.com"
    );

    expect(screen.getByText("Publication Two")).toBeInTheDocument();
  });

  test("applies OpacityFilter to publications", () => {
    const publications = [
      {
        key: "3",
        name: "Publication Three",
        publisher: "Publisher Three",
        releaseDate: "2019-01-01",
        summary: "Summary of Publication Three",
        keywords: ["keyword5", "keyword6"],
      },
    ];
    renderWithLocale(<SectionPublications publications={publications} />, {
      localeValue: mockLocaleContext,
    });

    const filterElement = screen.getByText("Publication Three").closest("div");
    expect(filterElement).toHaveClass("transition-opacity");
  });

  test("renders publications section without URL", () => {
    const publications = [
      {
        key: "4",
        name: "Publication Four",
        publisher: "Publisher Four",
        releaseDate: "2018-01-01",
        summary: "Summary of Publication Four",
        keywords: ["keyword7", "keyword8"],
      },
    ];
    renderWithLocale(<SectionPublications publications={publications} />, {
      localeValue: mockLocaleContext,
    });

    expect(screen.getByText("Publication Four")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
