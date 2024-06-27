/// <reference types="@testing-library/jest-dom" />
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import SectionContact from "../src/SectionContact";
import { LocaleContext } from "../src/I18NResume";
import React from "react";
import strings from "../src/strings.json";

const mockLocaleContext = {
  locale: "en",
  strings,
};

describe("SectionContact Component", () => {
  const renderWithLocale = (ui, { localeValue = mockLocaleContext } = {}) => {
    return render(
      <LocaleContext.Provider value={localeValue}>{ui}</LocaleContext.Provider>
    );
  };

  test("renders nothing when no contact information is provided", () => {
    renderWithLocale(<SectionContact basics={undefined} />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("renders contact section with email", () => {
    const basics = {
      email: "test@example.com",
    };
    renderWithLocale(<SectionContact basics={basics} />, {
      localeValue: mockLocaleContext,
    });

    expect(
      screen.getByRole("heading", {
        name: "Contact information Collapse section",
      })
    ).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  test("renders contact section with phone", () => {
    const basics = {
      phone: "123-456-7890",
    };
    renderWithLocale(<SectionContact basics={basics} />, {
      localeValue: mockLocaleContext,
    });

    expect(
      screen.getByRole("heading", {
        name: "Contact information Collapse section",
      })
    ).toBeInTheDocument();
    expect(screen.getByText("123-456-7890")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
  });

  test("renders contact section with address", () => {
    const basics = {
      location: { city: "City", countryCode: "US" },
    };
    renderWithLocale(<SectionContact basics={basics} />, {
      localeValue: mockLocaleContext,
    });

    expect(
      screen.getByRole("heading", {
        name: "Contact information Collapse section",
      })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Address")).toBeInTheDocument();
  });

  test("renders contact section with all details", () => {
    const basics = {
      email: "test@example.com",
      phone: "123-456-7890",
      location: { city: "City", countryCode: "US" },
    };
    renderWithLocale(<SectionContact basics={basics} />, {
      localeValue: mockLocaleContext,
    });

    expect(
      screen.getByRole("heading", {
        name: "Contact information Collapse section",
      })
    ).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("123-456-7890")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
    expect(screen.getByLabelText("Address")).toBeInTheDocument();
  });
});
