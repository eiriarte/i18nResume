import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import CVLogo from "../src/CVLogo";

describe("CVLogo Component", () => {
  test("Renders the SVG element", () => {
    render(<CVLogo className="test-class" />);
    const svgElement = screen.getByRole("img", { hidden: true });
    expect(svgElement).toBeInTheDocument();
  });

  test("Applies the correct className", () => {
    render(<CVLogo className="test-class" />);
    const svgElement = screen.getByRole("img", { hidden: true });
    expect(svgElement).toHaveClass("test-class");
  });

  test("Renders the SVG with correct attributes", () => {
    render(<CVLogo className="test-class" />);
    const svgElement = screen.getByRole("img", { hidden: true });
    expect(svgElement).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");
    expect(svgElement).toHaveAttribute("width", "200");
    expect(svgElement).toHaveAttribute("height", "200");
    expect(svgElement).toHaveAttribute("viewBox", "0 0 200 200");
    expect(svgElement).toHaveAttribute("fill", "currentColor");
  });
});
