const monthYear = document.getElementById("monthYear");
const calendarDays = document.getElementById("calendarDays");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let currentDate = new Date();

function renderCalendar() {
  calendarDays.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // Empty cells
  for (let i = 0; i < firstDay; i++) {
    calendarDays.innerHTML += `<div></div>`;
  }

  for (let day = 1; day <= lastDate; day++) {
    const isToday =
      day === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear();

    calendarDays.innerHTML += `
        <div class="cursor-pointer p-2 rounded-xl transition-all duration-300 
        ${isToday ? "bg-indigo-500 text-white scale-110" : "hover:bg-indigo-100"}
        animate-pop">
          ${day}
        </div>
      `;
  }
}

prev.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
};

next.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
};

renderCalendar();