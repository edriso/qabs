import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

describe("Qabs", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
    window.scrollTo = vi.fn();
  });

  it("starts with a sourced passage and complete navigation", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "الاستعانة بالصبر" })).toBeInTheDocument();
    expect(screen.getByText("سورة البقرة")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "المقطع السابق" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "المقطع التالي" })).toBeInTheDocument();
  });

  it("filters by topic and opens a passage from its index", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "الدعاء" }));
    expect(screen.getByRole("heading", { name: "دعاء موسى" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /دعاء يونس/ }));
    expect(screen.getByRole("heading", { name: "دعاء يونس" })).toBeInTheDocument();
    expect(window.location.search).toBe("?q=no-god-but-you");
  });

  it("gives every interactive element an accessible name", () => {
    render(<App />);
    for (const element of screen.getAllByRole("button").concat(screen.getAllByRole("link"))) {
      expect(element).toHaveAccessibleName();
    }
  });
});
