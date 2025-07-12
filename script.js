const calendar = document.getElementById('calendar');
const monthAndYear = document.getElementById('monthAndYear');

const months = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];
const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function renderCalendar(month, year) {
  calendar.innerHTML = '';

  // Tampilkan nama hari
  for (let day of days) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day-name');
    dayElement.innerText = day;
    calendar.appendChild(dayElement);
  }

  // Tanggal pertama dan jumlah hari
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Kosong sebelum tanggal 1
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    calendar.appendChild(empty);
  }

  // Isi tanggal
  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement('div');
    day.classList.add('day');
    day.innerText = i;
    calendar.appendChild(day);
  }

  monthAndYear.innerText = `${months[month]} ${year}`;
}

function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
}

renderCalendar(currentMonth, currentYear);
