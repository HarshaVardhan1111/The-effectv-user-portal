document.addEventListener('DOMContentLoaded', () => {
    const calendarContainer = document.getElementById('calendar-container');

    // Days of the week
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Months of the year
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const year = new Date().getFullYear(); // Current year

    months.forEach((month, index) => {
        const monthSection = document.createElement('div');
        monthSection.className = 'month';

        const monthTitle = document.createElement('h2');
        monthTitle.innerText = month;
        monthSection.appendChild(monthTitle);

        const calendar = document.createElement('div');
        calendar.className = 'calendar';

        // Add day headers
        daysOfWeek.forEach(day => {
            const header = document.createElement('div');
            header.className = 'day-header';
            header.innerText = day;
            calendar.appendChild(header);
        });

        const firstDay = new Date(year, index, 1).getDay();
        const lastDate = new Date(year, index + 1, 0).getDate();

        // Create empty slots for days before the start of the month
        for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'day';
            calendar.appendChild(emptyDay);
        }

        // Create day slots for each day in the month
        for (let day = 1; day <= lastDate; day++) {
            const daySlot = document.createElement('div');
            daySlot.className = 'day';
            daySlot.innerHTML = `<span class="day-number">${day}</span>`;

            // i add status (for demo purposes, you can customize this)
            const status = Math.random() > 0.5 ? '' : ''; // Random present (P) or empty
            if (status) {
                daySlot.innerHTML += `<span class="status">${status}</span>`;
            }

            calendar.appendChild(daySlot);
        }

        monthSection.appendChild(calendar);
        calendarContainer.appendChild(monthSection);
    });
});
