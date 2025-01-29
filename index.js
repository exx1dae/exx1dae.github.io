const valueInput = document.querySelector("#value");
const animateSwitcher = document.querySelector("#animate");
const hiddenSwitcher = document.querySelector("#hide");

const progress = new ProgressCircle("#progress-wrapper", {
  size: 200,
  strokeWidth: 15,
  color: "#3457fc",
  value: valueInput.value,
  isAnimated: animateSwitcher.checked,
  isHidden: hiddenSwitcher.checked,
});

valueInput.addEventListener("input", (e) => {
  progress.setValue(e.target.value);
});

animateSwitcher.addEventListener("change", (e) => {
  progress.setAnimated(e.target.checked);
});

hiddenSwitcher.addEventListener("change", (e) => {
  progress.setHidden(e.target.checked);
});
