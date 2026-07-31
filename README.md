# DataVinci Assignment Submission

This repository contains my submission for the DataVinci recruitment assignment, covering two tasks:

1. **A/B Test Assignment — Upsell Popup**
2. **Front-End Assignment — AMZExpand Landing Page Recreation**

---

## Task 1: A/B Test Assignment — Upsell

### Overview
Implements an upsell popup that triggers when a user clicks specific plan options during checkout, encouraging an upgrade before continuing the flow.

### How it works
- Built as a self-contained **IIFE** in vanilla JavaScript (no dependencies).
- Listens for clicks on target plan elements using event delegation.
- Prevents default plan selection and displays the upsell modal instead.
- **Upgrade CTA** → programmatically selects the upgraded plan and continues checkout.
- **Decline** → closes the modal, keeps the originally selected plan.
- Handles **SPA navigation**: listeners are re-attached correctly if the user navigates away and returns, since the page doesn't fully reload.

### Files
- `task-1-ab-test-upsell/upsell.js` — main implementation
- `task-1-ab-test-upsell/notes.md` — detailed implementation notes and assumptions

### How to test
Open the target checkout page in the browser console and paste the script, or include it via a script tag. Click a target plan option to trigger the popup.

---

## Task 2: AMZExpand Landing Page Recreation

### Overview
A fully responsive recreation of the AMZExpand landing page based on the provided Figma design, using the given HTML structure as a base.

### Tech Stack
- HTML5 (semantic structure)
- CSS3 (custom properties, responsive breakpoints)
- Vanilla JavaScript (FAQ accordion, animated counters, testimonial carousel, expandable CTA)

### Responsive Breakpoints
- Desktop: 1440px and above
- Tablet: 768px – 1024px
- Mobile: 320px – 767px

### Files
- `task-2-amzexpand-landing/index.html`
- `task-2-amzexpand-landing/images/` — all image assets

### Live Preview
Neify - jazzy-tartufo-c09fe3.netlify.app

### How to run locally
Simply open `index.html` in any browser — no build step required.

---

## Notes
Content (headlines, pricing, product names, etc.) has been adapted with placeholder values where exact copy from the original design/client project wasn't required, per assignment instructions.
