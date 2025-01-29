class ProgressCircle {
  constructor(selector, options = {}) {
    this.options = {
      size: options.size || 150,
      strokeWidth: options.strokeWidth || 8,
      color: options.color || "#007bff",
      bgColor: options.bgColor || "#ddd",
      value: options.value || 0,
      isAnimated: options.isAnimated || false,
      isHidden: options.isHidden || false,
    };

    this.radius = (this.options.size - this.options.strokeWidth) / 2;
    this.circumference = 2 * Math.PI * this.radius;

    this.container = document.querySelector(selector);
    this.container.innerHTML = this.getTemplate();

    this.progressArc = this.container.querySelector(".progress-arc");
    this.progressContainer = this.container.querySelector(
      ".progress-container",
    );

    this.progressArc.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
    this.setValue(this.options.value);
    this.setAnimated(this.options.isAnimated);
    this.setHidden(this.options.isHidden);
  }

  getTemplate() {
    return `
            <div class="progress-container" 
            style="width: ${this.options.size}px; height: ${this.options.size}px;">
                <svg class="progress-svg" width="${this.options.size}" height="${this.options.size}">
                    <circle class="progress-bg" cx="50%" cy="50%" r="${this.radius}"
                        stroke="${this.options.bgColor}" stroke-width="${this.options.strokeWidth}" fill="none"/>
                    
                    <circle class="progress-arc" cx="50%" cy="50%" r="${this.radius}"
                        stroke="${this.options.color}" stroke-width="${this.options.strokeWidth}"
                        fill="none" stroke-linecap="round" />
                </svg>
            </div>
        `;
  }

  setValue(value, isAnimated = true) {
    const clampedValue = Math.min(Math.max(value, 0), 100);
    const offset =
      this.circumference - (clampedValue / 100) * this.circumference;

    if (isAnimated) {
      this.animateValueChange(offset);
    } else {
      this.progressArc.style.strokeDashoffset = offset;
    }
  }

  animateValueChange(targetOffset) {
    const startOffset =
      parseFloat(this.progressArc.style.strokeDashoffset) || 0;
    const startTime = performance.now();
    const duration = 500;

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = progress * (2 - progress);

      this.progressArc.style.strokeDashoffset =
        startOffset + (targetOffset - startOffset) * easedProgress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  setAnimated(animated) {
    this.progressContainer.classList.toggle("animated", animated);
  }

  setHidden(hidden) {
    this.progressContainer.classList.toggle("hidden", hidden);
  }
}
