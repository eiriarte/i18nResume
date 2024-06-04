/// <reference types="@testing-library/jest-dom" />
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { LocaleContext } from "../src/I18NResume";
import strings from "../src/strings.json";
import Pill from "../src/Pill";

describe("Pill Component", () => {
  const renderWithLocale = (
    ui,
    { localeValue = { strings, locale: "en" } } = {}
  ) => {
    return render(
      <LocaleContext.Provider value={localeValue}>{ui}</LocaleContext.Provider>
    );
  };

  test("Pill with name and numeric level", () => {
    const localeValue = { strings, locale: "en" };
    renderWithLocale(<Pill name="Skill A" level={50} />, { localeValue });
    expect(screen.getByText("Skill A")).toBeInTheDocument();
    expect(screen.getByText("Level: 50")).toBeInTheDocument();
  });

  test("Pill with name and non-numeric level", () => {
    render(<Pill name="Skill B" level="Intermediate" />);
    expect(screen.getByText("Skill B")).toBeInTheDocument();
    expect(screen.getByText("(Intermediate)")).toBeInTheDocument();
  });

  test("Pill with name and no level", () => {
    render(<Pill name="Skill C" />);
    expect(screen.getByText("Skill C")).toBeInTheDocument();
    expect(screen.queryByText("(null)")).toBeNull();
  });

  test("Renders circle SVG when level is numeric", () => {
    const localeValue = { strings, locale: "en" };
    renderWithLocale(<Pill name="Skill D" level={75} />, { localeValue });
    const svg = screen.getByRole("img", { hidden: true });
    expect(svg).toBeInTheDocument();
  });

  test("Does not render circle SVG when level is non-numeric", () => {
    render(<Pill name="Skill E" level="Expert" />);
    const svg = screen.queryByRole("img", { hidden: true });
    expect(svg).toBeNull();
  });
});
