import ProgressCircle from "./component/progress-circle.js";

const valueInput = document.querySelector("#value");
const animateSwitcher = document.querySelector("#animate");
const hiddenSwitcher = document.querySelector("#hide");
const progressWrapper = document.querySelector("#progress-wrapper");

const progress = new ProgressCircle("#progress-wrapper", {
  size: 200,
  strokeWidth: 15,
  color: "#3457fc",
  value: valueInput.value,
  animated: animateSwitcher.checked,
  hidden: hiddenSwitcher.checked,
});

valueInput.addEventListener("input", (e) => {
  const value = parseFloat(e.target.value);
  progress.setValue(value, false);

  progressWrapper.setAttribute("aria-valuenow", value);

  if (isNaN(value) || value < 0 || value > 100) {
    valueInput.classList.add("error");
    e.target.setAttribute("aria-invalid", "true");
    e.target.setAttribute("aria-errormessage", "value-error");
    return;
  }

  e.target.removeAttribute("aria-invalid");
  e.target.removeAttribute("aria-errormessage");
  valueInput.classList.remove("error");
});

animateSwitcher.addEventListener("change", (e) => {
  progress.setAnimated(e.target.checked);
  e.target.setAttribute("aria-checked", e.target.checked);
});

hiddenSwitcher.addEventListener("change", (e) => {
  progress.setHidden(e.target.checked);
  e.target.setAttribute("aria-checked", e.target.checked);
});
