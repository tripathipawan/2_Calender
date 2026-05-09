# 2 Calendars

A collection of 2 independently designed, fully functional calendar UIs built with HTML, CSS, Tailwind CSS, and JavaScript. Both calendars are complete single-page applications — no frameworks, no backend, no dependencies beyond the Tailwind CDN. Each one follows a distinct visual design while sharing the same core date logic built on JavaScript's native `Date` API.

---

## What This Project Does

This repository contains 2 calendar implementations, each in its own folder. Both render a full monthly grid dynamically using JavaScript, handle month-by-month navigation with Previous and Next buttons, correctly calculate the starting weekday and day count for any month of any year, and automatically highlight today's date. No dates, day counts, or weekday offsets are hard-coded anywhere.

---

## Calendars Included

### 1. First Calendar — `First_Calender/`

A clean, minimal calendar focused on readability and a simple layout.

- On page load, the calendar renders the current month using `new Date()` to determine the present year and month
- `new Date(year, month, 1).getDay()` calculates which weekday the 1st falls on — this value determines how many empty cells to offset before the first date, ensuring every date lands in the correct column (0 = Sunday through 6 = Saturday)
- `new Date(year, month + 1, 0).getDate()` returns the exact number of days in the current month, automatically accounting for month length differences and leap years
- Today's date is compared against the rendered date on each grid cell and highlighted with a distinct CSS style
- Previous (`<`) and Next (`>`) navigation buttons decrement or increment the month value and call the render function again — the grid rebuilds completely on each navigation, and the month/year heading updates automatically
- The 7 day column headers (Sun through Sat) are rendered as static table headers above the grid

---

### 2. Second Calendar — `Second_Calender/`

An alternative calendar with a different visual design and layout structure, built on the identical underlying date logic.

- Uses the same `Date` API calculations (`getDay()` for offset, `getDate()` for day count) as the First Calendar — the logic is fully re-implemented, not shared, keeping each folder independent
- Applies a completely different color palette, typography, spacing, and component arrangement, demonstrating how the same functionality looks with a different design system
- Today's date is highlighted using a contrasting style consistent with the new design language
- Month/year heading and navigation buttons behave identically to the First Calendar but are styled separately

---

## Core JavaScript Logic (Both Calendars)

Both calendars independently implement the same 3 core calculations:

**1. Weekday offset**
```js
new Date(year, month, 1).getDay()
// Returns 0 (Sunday) through 6 (Saturday)
// Used to prepend empty cells before the 1st of the month
```

**2. Days in month**
```js
new Date(year, month + 1, 0).getDate()
// Returns 28, 29, 30, or 31 depending on month and leap year
// No manual month-length lookup tables needed
```

**3. Today's date detection**
```js
const today = new Date();
// Each grid cell's date is compared against today.getDate(),
// today.getMonth(), and today.getFullYear() to apply the highlight class
```

**4. Navigation**
```js
// Previous button: month--; if (month < 0) { month = 11; year--; }
// Next button:     month++; if (month > 11) { month = 0; year++; }
// After adjusting: call renderCalendar() to rebuild the grid
```

---

## Tech Stack

| Technology | Role |
|---|---|
| HTML5 | Calendar structure — heading, day labels, grid cells, navigation buttons |
| CSS3 | Base layout, grid structure for cells, today highlight styling |
| Tailwind CSS (CDN) | Utility classes for spacing, typography, colors, and responsive behavior |
| JavaScript (Vanilla) | Date API calculations, dynamic grid generation, navigation logic, today detection |

---

## Project Structure

```
2_Calender/
├── First_Calender/
│   ├── index.html       # First calendar UI and layout
│   ├── style.css        # Styles for the first calendar design
│   └── script.js        # Date calculations and grid rendering for first calendar
├── Second_Calender/
│   ├── index.html       # Second calendar UI and layout
│   ├── style.css        # Styles for the second calendar design
│   └── script.js        # Date calculations and grid rendering for second calendar
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
