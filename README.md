# 2 Calendars

A collection of 2 independently designed, fully functional calendar UIs built with HTML, CSS, Tailwind CSS, and JavaScript. Both calendars are self-contained single-page applications — no frameworks, no backend, no dependencies beyond the Tailwind CDN. Each calendar follows a distinct design approach while sharing the same core functionality.

---

## What This Project Does

This repository contains 2 calendar implementations, each living in its own folder. Both calendars dynamically render month grids using JavaScript's `Date` API, allow month-by-month navigation, and correctly calculate the starting weekday and number of days for any month across any year. Today's date is automatically highlighted.

---

## Calendars Included

### 1. First Calendar — `First_Calender/`

A clean, minimal calendar UI focused on clarity and readability.

- Renders the current month's grid on load, with day names (Sun–Sat) as column headers
- Uses JavaScript's `Date` object to determine the number of days in the month and the weekday the 1st falls on — no hard-coded values
- Today's date is visually highlighted to stand out from the rest of the grid
- Previous and next month navigation buttons allow browsing through any month and year
- The month and year heading updates dynamically as the user navigates
- Days from the previous month that fill empty leading cells are either hidden or shown as inactive, keeping the grid visually clean

---

### 2. Second Calendar — `Second_Calender/`

An alternative calendar design with a different visual style and layout approach, built on the same underlying logic.

- Same core month-rendering and navigation logic as the first calendar
- Distinct visual design — different color palette, spacing, and component structure, demonstrating how the same functionality can be presented with a completely different aesthetic
- Today's date highlighted using a contrasting style consistent with the new design language
- Month and year heading updates on navigation
- Fully standalone — no shared files between the two calendar folders

---

## Tech Stack

| Technology | Role |
|---|---|
| HTML5 | Calendar structure and layout markup |
| CSS3 | Base styling, grid layout for calendar cells |
| Tailwind CSS (CDN) | Utility classes for spacing, typography, and colors |
| JavaScript (Vanilla) | Date logic, dynamic grid rendering, month navigation |

---

## Core JavaScript Logic (Both Calendars)

Both calendars rely on the same fundamental date calculations:

- `new Date(year, month, 1).getDay()` — determines which weekday the 1st of the month falls on, used to offset the grid correctly
- `new Date(year, month + 1, 0).getDate()` — returns the total number of days in the current month (handles leap years and month lengths automatically)
- Navigation increments or decrements the month value and re-renders the full grid

---

## Project Structure

```
2_Calender/
├── First_Calender/
│   ├── index.html       # First calendar UI
│   ├── style.css        # Styles specific to the first calendar
│   └── script.js        # Calendar logic for the first design
├── Second_Calender/
│   ├── index.html       # Second calendar UI
│   ├── style.css        # Styles specific to the second calendar
│   └── script.js        # Calendar logic for the second design
└── README.md
```

---

## How to Run

1. Clone the repository
   ```bash
   git clone https://github.com/tripathipawan/2_Calender.git
   ```
2. Open `First_Calender/index.html` or `Second_Calender/index.html` directly in any modern browser — no server or build step needed.

---

## Repository

[https://github.com/tripathipawan/2_Calender](https://github.com/tripathipawan/2_Calender)
