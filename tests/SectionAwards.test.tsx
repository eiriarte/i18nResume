/// <reference types="@testing-library/jest-dom" />
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import SectionAwards from "../src/SectionAwards";
import { LocaleContext } from "../src/I18NResume";
import type { Award } from "../src/interfaces";
import strings from "../src/strings.json";

const mockLocaleContext = {
  locale: "en",
  strings,
};

describe("SectionAwards Component", () => {
  test("renders nothing when awards array is empty", () => {
    const { container } = render(
      <LocaleContext.Provider value={mockLocaleContext}>
        <SectionAwards awards={[]} />
      </LocaleContext.Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  test("renders awards when provided", () => {
    const awards: Award[] = [
      {
        key: "award1",
        title: "Best Developer",
        awarder: "Tech Conference",
        date: "2023-05-15",
        summary: "Awarded for outstanding contributions to open source",
      },
      {
        key: "award2",
        title: "Innovation Prize",
        awarder: "Startup Incubator",
        summary: "Recognized for creating a groundbreaking app",
      },
    ];

    render(
      <LocaleContext.Provider value={mockLocaleContext}>
        <SectionAwards awards={awards} />
      </LocaleContext.Provider>
    );

    expect(screen.getByText("Awards")).toBeInTheDocument();
    expect(screen.getByText("Best Developer")).toBeInTheDocument();
    expect(screen.getByText("Innovation Prize")).toBeInTheDocument();
  });

  test("handles awards without dates", () => {
    const awards: Award[] = [
      {
        key: "award1",
        title: "Innovation Prize",
        awarder: "Startup Incubator",
        summary: "Recognized for creating a groundbreaking app",
      },
    ];

    render(
      <LocaleContext.Provider value={mockLocaleContext}>
        <SectionAwards awards={awards} />
      </LocaleContext.Provider>
    );

    expect(screen.queryByText(/\d{4}-\d{2}-\d{2}/)).not.toBeInTheDocument();
  });
});
