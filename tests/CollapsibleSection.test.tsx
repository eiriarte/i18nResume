/// <reference types="@testing-library/jest-dom" />
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { LocaleContext } from "../src/I18NResume";
import CollapsibleSection from "../src/CollapsibleSection";
import strings from "../src/strings.json";

describe("CollapsibleSection Component", () => {
  const renderWithLocale = (
    ui,
    { localeValue = { strings, locale: "en" } } = {}
  ) => {
    return render(
      <LocaleContext.Provider value={localeValue}>{ui}</LocaleContext.Provider>
    );
  };

  test("renders the section with heading and children", () => {
    const localeValue = { strings, locale: "en" };
    renderWithLocale(
      <CollapsibleSection id="section1" heading="Test Heading">
        <div>Test Content</div>
      </CollapsibleSection>,
      { localeValue }
    );
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  test("collapses and expands when button is clicked", async () => {
    const localeValue = { strings, locale: "en" };
    renderWithLocale(
      <CollapsibleSection id="section1" heading="Test Heading">
        <div>Test Content</div>
      </CollapsibleSection>,
      { localeValue }
    );

    const button = screen.getByRole("button");
    const content = screen.getByText("Test Content")
      .parentElement as HTMLElement;

    // Initially expanded
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(content).toHaveStyle("height: auto");

    // Click to collapse
    fireEvent.click(button);
    fireEvent.transitionEnd(content);
    await waitFor(() =>
      expect(button).toHaveAttribute("aria-expanded", "false")
    );
    expect(content).toHaveStyle("height: 0px");

    // Click to expand again
    fireEvent.click(button);
    fireEvent.transitionEnd(content);
    await waitFor(() =>
      expect(button).toHaveAttribute("aria-expanded", "true")
    );
    expect(content).toHaveStyle("height: auto");
  });

  test("applies aria-label correctly for expand and collapse states", async () => {
    const localeValue = { strings, locale: "en" };
    renderWithLocale(
      <CollapsibleSection id="section1" heading="Test Heading">
        <div>Test Content</div>
      </CollapsibleSection>,
      { localeValue }
    );

    const button = screen.getByRole("button");
    const content = screen.getByText("Test Content")
      .parentElement as HTMLElement;

    // Initially expanded
    expect(button.firstChild).toHaveAttribute("aria-label", "Collapse section");

    // Click to collapse
    fireEvent.click(button);
    fireEvent.transitionEnd(content);
    await waitFor(() =>
      expect(button.firstChild).toHaveAttribute("aria-label", "Expand section")
    );

    // Click to expand again
    fireEvent.click(button);
    fireEvent.transitionEnd(content);
    await waitFor(() =>
      expect(button.firstChild).toHaveAttribute(
        "aria-label",
        "Collapse section"
      )
    );
  });
});
