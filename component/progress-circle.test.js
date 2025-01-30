import { describe, it, expect, beforeEach } from "vitest";
import ProgressCircle from "./progress-circle.js";

describe("ProgressCircle", () => {
  let container;
  let progressCircle;

  beforeEach(() => {
    container = document.createElement("div");
    container.id = "test-container";
    document.body.appendChild(container);
    progressCircle = new ProgressCircle("#test-container", {
      size: 150,
      strokeWidth: 8,
      color: "#007bff",
      bgColor: "#ddd",
      value: 0,
      animated: false,
      hidden: false,
    });
  });

  it("should initialize with default values", () => {
    expect(progressCircle.options.size).toBe(150);
    expect(progressCircle.options.strokeWidth).toBe(8);
    expect(progressCircle.options.color).toBe("#007bff");
    expect(progressCircle.options.bgColor).toBe("#ddd");
    expect(progressCircle.options.value).toBe(0);
    expect(progressCircle.options.animated).toBe(false);
    expect(progressCircle.options.hidden).toBe(false);
  });

  it("should set value correctly", () => {
    progressCircle.setValue(50, false);
    const offset =
      progressCircle.circumference - (50 / 100) * progressCircle.circumference;
    expect(progressCircle.progressArc.style.strokeDashoffset).toBe(`${offset}`);
  });

  it("should clamp value between 0 and 100", () => {
    progressCircle.setValue(-10, false);
    expect(progressCircle.progressArc.style.strokeDashoffset).toBe(
      `${progressCircle.circumference}`,
    );

    progressCircle.setValue(150, false);
    expect(progressCircle.progressArc.style.strokeDashoffset).toBe("0");
  });

  it("should toggle animated class", () => {
    progressCircle.setAnimated(true);
    expect(
      progressCircle.progressContainer.classList.contains("animated"),
    ).toBe(true);

    progressCircle.setAnimated(false);
    expect(
      progressCircle.progressContainer.classList.contains("animated"),
    ).toBe(false);
  });

  it("should toggle hidden class", () => {
    progressCircle.setHidden(true);
    expect(progressCircle.progressContainer.classList.contains("hidden")).toBe(
      true,
    );

    progressCircle.setHidden(false);
    expect(progressCircle.progressContainer.classList.contains("hidden")).toBe(
      false,
    );
  });
});
