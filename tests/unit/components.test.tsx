import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProvenanceNote } from "@/components/Provenance";
import { dictionaries } from "@/lib/i18n";

describe("ProvenanceNote", () => {
  it("labels demo content", () => {
    render(<ProvenanceNote p={{ status: "demo", note: "Fictional." }} d={dictionaries.en} />);
    expect(screen.getByText("Demonstration content")).toBeInTheDocument();
    expect(screen.getByText("Fictional.")).toBeInTheDocument();
  });
  it("shows sources for verified content", () => {
    render(<ProvenanceNote p={{ status: "verified", sources: ["S06", "S08"], checked: "2026-11-11" }} d={dictionaries.ms} />);
    expect(screen.getByText(/S06, S08/)).toBeInTheDocument();
    expect(screen.getByText(/Daripada sumber awam UPM/)).toBeInTheDocument();
  });
});
