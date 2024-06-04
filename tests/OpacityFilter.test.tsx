/// <reference types="@testing-library/jest-dom" />
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { FilterContext } from "../src/I18NResume";
import OpacityFilter from "../src/OpacityFilter";

describe("OpacityFilter Component", () => {
  const renderWithFilterContext = (
    ui: React.JSX.Element,
    query: string[] = []
  ) => {
    return render(
      <FilterContext.Provider value={query}>{ui}</FilterContext.Provider>
    );
  };

  test("Renders children with full opacity when no keywords are provided", () => {
    renderWithFilterContext(
      <OpacityFilter keywords={[]}>
        <div>Test Content</div>
      </OpacityFilter>
    );
    const content = screen.getByText("Test Content").parentElement;
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass("opacity-100");
  });

  test("Renders children with reduced opacity when keywords do not match", () => {
    renderWithFilterContext(
      <OpacityFilter keywords={["keyword1"]}>
        <div>Test Content</div>
      </OpacityFilter>,
      ["keyword2"]
    );
    const content = screen.getByText("Test Content").parentElement;
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass("opacity-10");
  });

  test("Renders children with full opacity when keywords match", () => {
    renderWithFilterContext(
      <OpacityFilter keywords={["keyword1"]}>
        <div>Test Content</div>
      </OpacityFilter>,
      ["keyword1"]
    );
    const content = screen.getByText("Test Content").parentElement;
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass("opacity-100");
  });

  test("Applies inline style when inline prop is true", () => {
    renderWithFilterContext(
      <OpacityFilter keywords={[]} inline={true}>
        <div>Test Content</div>
      </OpacityFilter>
    );
    const content = screen.getByText("Test Content").parentElement;
    expect(content).toBeInTheDocument();
    expect(content).toHaveStyle("display: inline");
  });

  test("Doesn't apply inline style when inline prop is false", () => {
    renderWithFilterContext(
      <OpacityFilter keywords={[]} inline={false}>
        <div>Test Content</div>
      </OpacityFilter>
    );
    const content = screen.getByText("Test Content").parentElement;
    expect(content).toBeInTheDocument();
    expect(content).not.toHaveStyle("display: inline");
  });
});
