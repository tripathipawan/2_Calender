document.addEventListener('DOMContentLoaded', function () {
  // Current date
  let currentDate = new Date();
  let selectedDate = new Date(currentDate);

  // DOM Elements
  const calendarDaysEl = document.getElementById('calendar-days');
  const currentMonthEl = document.getElementById('current-month');
  const currentDateEl = document.getElementById('current-date');
  const selectedDayEl = document.getElementById('selected-day');
  const selectedMonthYearEl = document.getElementById('selected-month-year');
  const selectedWeekdayEl = document.getElementById('selected-weekday');
  const dayOfYearEl = document.getElementById('day-of-year');
  const weekNumberEl = document.getElementById('week-number');
  const daysLeftEl = document.getElementById('days-left');

  // Buttons
  const prevMonthBtn = document.getElementById('prev-month');
  const nextMonthBtn = document.getElementById('next-month');
  const prevYearBtn = document.getElementById('prev-year');
  const nextYearBtn = document.getElementById('next-year');
  const todayBtn = document.getElementById('today-btn');
  const monthJumpBtns = document.querySelectorAll('.month-jump');

  // Month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Day names
  const dayNames = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  // Initialize calendar
  function initCalendar() {
    renderCalendar(currentDate);
    updateSelectedDateInfo(selectedDate);
    updateCurrentDateInfo();
  }

  // Render calendar for a specific month/year
  function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Update month/year display
    currentMonthEl.textContent = `${monthNames[month]} ${year}`;
    currentMonthEl.classList.add('month-transition');

    // Clear previous calendar days
    calendarDaysEl.innerHTML = '';

    // Get first day of the month
    const firstDay = new Date(year, month, 1);
    // Get last day of the month
    const lastDay = new Date(year, month + 1, 0);
    // Get number of days in month
    const daysInMonth = lastDay.getDate();
    // Get day of the week for first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayIndex = firstDay.getDay();

    // Get previous month's last days
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    // Add days from previous month
    for (let i = firstDayIndex; i > 0; i--) {
      const day = prevMonthLastDay - i + 1;
      const dayElement = createDayElement(day, 'disabled', new Date(year, month - 1, day));
      calendarDaysEl.appendChild(dayElement);
    }

    // Add days from current month
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(year, month, i);
      let className = '';

      // Check if it's today
      if (dayDate.toDateString() === today.toDateString()) {
        className = 'today';
      }

      // Check if it's selected
      if (dayDate.toDateString() === selectedDate.toDateString()) {
        className += ' selected';
      }

      const dayElement = createDayElement(i, className, dayDate);
      calendarDaysEl.appendChild(dayElement);
    }

    // Add days from next month
    const totalCells = 42; // 6 weeks * 7 days
    const nextMonthDays = totalCells - (firstDayIndex + daysInMonth);

    for (let i = 1; i <= nextMonthDays; i++) {
      const dayElement = createDayElement(i, 'disabled', new Date(year, month + 1, i));
      calendarDaysEl.appendChild(dayElement);
    }

    // Remove transition class after animation completes
    setTimeout(() => {
      currentMonthEl.classList.remove('month-transition');
    }, 400);
  }

  // Create a day element
  function createDayElement(day, className, date) {
    const dayEl = document.createElement('div');
    dayEl.className = `calendar-day text-center p-3 md:p-4 rounded-lg ${className}`;
    dayEl.innerHTML = `<span class="text-lg font-medium">${day}</span>`;

    // Add event indicators for certain days
    if (date.getDate() === 25 && date.getMonth() === currentDate.getMonth()) {
      dayEl.innerHTML += '<div class="mt-1 w-1 h-1 rounded-full bg-blue-500 mx-auto"></div>';
    } else if (date.getDate() === 28 && date.getMonth() === currentDate.getMonth()) {
      dayEl.innerHTML += '<div class="mt-1 w-1 h-1 rounded-full bg-green-500 mx-auto"></div>';
    }

    // Add click event if not disabled
    if (!className.includes('disabled')) {
      dayEl.addEventListener('click', () => selectDate(date));

      // Style based on class
      if (className.includes('today')) {
        dayEl.classList.add('bg-blue-500', 'text-white', 'shadow-md');
      } else if (className.includes('selected')) {
        dayEl.classList.add('bg-indigo-100', 'border-2', 'border-indigo-500', 'text-indigo-700');
      } else {
        dayEl.classList.add('bg-gray-50', 'hover:bg-gray-100', 'cursor-pointer');
      }
    } else {
      dayEl.classList.add('text-gray-400');
    }

    return dayEl;
  }

  // Select a date
  function selectDate(date) {
    // Update selected date
    selectedDate = new Date(date);

    // Update calendar to highlight selected date
    renderCalendar(currentDate);

    // Update selected date info panel
    updateSelectedDateInfo(date);
  }

  // Update selected date info panel
  function updateSelectedDateInfo(date) {
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const weekday = dayNames[date.getDay()];

    // Calculate day of year
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Calculate week number
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);

    // Calculate days left in month
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const daysLeft = lastDayOfMonth.getDate() - date.getDate();

    // Update DOM
    selectedDayEl.textContent = day;
    selectedMonthYearEl.textContent = `${month} ${year}`;
    selectedWeekdayEl.textContent = weekday;
    dayOfYearEl.textContent = `${dayOfYear}${getOrdinalSuffix(dayOfYear)} day of the year`;
    weekNumberEl.textContent = `Week ${weekNumber}`;
    daysLeftEl.textContent = `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left in ${month}`;

    // Add animation
    selectedDayEl.parentElement.classList.add('slide-in');
    setTimeout(() => {
      selectedDayEl.parentElement.classList.remove('slide-in');
    }, 300);
  }

  // Update current date info
  function updateCurrentDateInfo() {
    const today = new Date();
    const dayName = dayNames[today.getDay()];
    const monthName = monthNames[today.getMonth()];
    const day = today.getDate();
    const year = today.getFullYear();

    currentDateEl.textContent = `Today is ${dayName}, ${monthName} ${day}, ${year}`;
  }

  // Get ordinal suffix for a number
  function getOrdinalSuffix(n) {
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  // Navigate to previous month
  prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  // Navigate to next month
  nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  // Navigate to previous year
  prevYearBtn.addEventListener('click', () => {
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    renderCalendar(currentDate);
  });

  // Navigate to next year
  nextYearBtn.addEventListener('click', () => {
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    renderCalendar(currentDate);
  });

  // Jump to today
  todayBtn.addEventListener('click', () => {
    currentDate = new Date();
    selectedDate = new Date(currentDate);
    renderCalendar(currentDate);
    updateSelectedDateInfo(selectedDate);
  });

  // Jump to specific month
  monthJumpBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const month = parseInt(btn.getAttribute('data-month'));
      currentDate.setMonth(month);
      renderCalendar(currentDate);

      // Highlight the active month button
      monthJumpBtns.forEach(b => b.classList.remove('bg-blue-500', 'text-white'));
      btn.classList.add('bg-blue-500', 'text-white');
    });
  });

  // Initialize the calendar
  initCalendar();
});