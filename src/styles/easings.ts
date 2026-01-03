// Animation Easing Functions for GSAP
export const easings = {
  // Standard easings
  "ease-in": "power2.in",
  "ease-out": "power2.out",
  "ease-in-out": "power2.inOut",

  // Smooth easings
  "smooth-in": "power3.in",
  "smooth-out": "power3.out",
  "smooth-in-out": "power3.inOut",

  // Strong easings
  "strong-in": "power4.in",
  "strong-out": "power4.out",
  "strong-in-out": "power4.inOut",

  // Elastic & Bounce
  "elastic-out": "elastic.out(1, 0.5)",
  "bounce-out": "bounce.out",

  // Custom cubic-bezier
  "custom-smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

export type EasingKey = keyof typeof easings;
