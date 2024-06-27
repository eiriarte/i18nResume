/// <reference types="@testing-library/jest-dom" />
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import SectionCertificates from "../src/SectionCertificates";
import { LocaleContext } from "../src/I18NResume";
import React from "react";
import strings from "../src/strings.json";

const mockLocaleContext = {
  locale: "en",
  strings,
};

describe("SectionCertificates Component", () => {
  const renderWithLocale = (ui, { localeValue = mockLocaleContext } = {}) => {
    return render(
      <LocaleContext.Provider value={localeValue}>{ui}</LocaleContext.Provider>
    );
  };

  test("renders nothing when no certificates are provided", () => {
    renderWithLocale(<SectionCertificates certificates={undefined} />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("renders certificate list when certificates are provided", () => {
    const certificates = [
      {
        key: "1",
        name: "Certificate 1",
        issuer: "Issuer 1",
        date: "2023-06-01",
        url: "https://example.com",
        keywords: ["cert1"],
      },
    ];
    renderWithLocale(<SectionCertificates certificates={certificates} />, {
      localeValue: mockLocaleContext,
    });

    expect(
      screen.getByRole("heading", { name: "Certificates Collapse section" })
    ).toBeInTheDocument();
    expect(screen.getByText("Certificate 1")).toBeInTheDocument();
    expect(screen.getByText(". Issuer 1")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://example.com"
    );
  });

  test("renders certificate without link when url is not provided", () => {
    const certificates = [
      {
        key: "2",
        name: "Certificate 2",
        issuer: "Issuer 2",
        date: "2023-07-01",
        url: "",
        keywords: ["cert2"],
      },
    ];
    renderWithLocale(<SectionCertificates certificates={certificates} />, {
      localeValue: mockLocaleContext,
    });

    expect(
      screen.getByRole("heading", { name: "Certificates Collapse section" })
    ).toBeInTheDocument();
    expect(screen.getByText("Certificate 2")).toBeInTheDocument();
    expect(screen.getByText(". Issuer 2")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  test("applies OpacityFilter to certificates", () => {
    const certificates = [
      {
        key: "3",
        name: "Certificate 3",
        issuer: "Issuer 3",
        date: "2023-08-01",
        url: "",
        keywords: ["cert3"],
      },
    ];
    renderWithLocale(<SectionCertificates certificates={certificates} />, {
      localeValue: mockLocaleContext,
    });

    const filterElement = screen.getByText("Certificate 3").closest("div");
    expect(filterElement).toHaveClass("transition-opacity");
  });
});
