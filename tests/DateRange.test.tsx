import React from "react";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import DateRange from "../src/DateRange";
import strings from "../src/strings.json";

describe("DateRange component", () => {
  test("Date Range without any date", () => {
    const { container } = render(<DateRange />);
    expect(container.firstChild).toBeNull();
  });

  test("DateRange with end date", () => {
    render(<DateRange startDate="2022-10-01" endDate="2022-11" />);
    expect(screen.getByText("10/1/2022")).toBeInTheDocument();
    screen.getByText("Nov 2022");
  });

  test("DateRange with just years", () => {
    render(<DateRange startDate="2022" endDate="2023" />);
    screen.getByText("2022");
    screen.getByText("2023");
  });

  test("DateRange without end date", () => {
    render(<DateRange startDate="2022-10-01" />);
    screen.getByText("10/1/2022");
    screen.getByText(strings.present);
  });
});
