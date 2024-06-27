/// <reference types="@testing-library/jest-dom" />
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import SocialLink from "../src/SocialLink";
import { Profile } from "../src/interfaces";

describe("SocialLink Component", () => {
  test("renders the link with correct attributes", () => {
    const profile: Profile = {
      network: "twitter",
      url: "https://twitter.com/example",
    };

    render(<SocialLink profile={profile} />);

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", "https://twitter.com/example");
    expect(linkElement).toHaveAttribute("target", "_blank");
    expect(linkElement).toHaveAttribute("aria-label", "twitter");
  });

  test("renders the correct icon for known networks", () => {
    const profile: Profile = {
      network: "github",
      url: "https://github.com/example",
    };

    render(<SocialLink profile={profile} />);

    const svgElement = screen.getByRole("img");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute("height", "24");
    expect(svgElement).toHaveAttribute("width", "24");
  });

  test("renders the unknown icon for unrecognized networks", () => {
    const profile: Profile = {
      network: "myspace",
      url: "https://myspace.com/example",
    };

    render(<SocialLink profile={profile} />);

    const svgElement = screen.getByRole("img");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute("height", "20");
    expect(svgElement).toHaveAttribute("width", "20");
  });

  test("handles case-insensitive network names", () => {
    const profile: Profile = {
      network: "LinkedIn",
      url: "https://linkedin.com/in/example",
    };

    render(<SocialLink profile={profile} />);

    const svgElement = screen.getByRole("img");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute("height", "24");
    expect(svgElement).toHaveAttribute("width", "24");
  });

  test("renders correctly when network is undefined", () => {
    const profile: Profile = {
      url: "https://example.com",
    };

    render(<SocialLink profile={profile} />);

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", "https://example.com");

    const svgElement = screen.getByRole("img");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute("height", "20");
    expect(svgElement).toHaveAttribute("width", "20");
  });
});
