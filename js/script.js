{
  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();
  let storage = [];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let displayWeekDaysNames = "<tr>";
  for (let dhead in days) {
    displayWeekDaysNames += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
  }
  // dataHead += "</tr>";

  document.getElementById("thead-month").innerHTML = displayWeekDaysNames;


  const monthAndYear = document.getElementById("monthAndYear");
  showCalendar(currentMonth, currentYear);



  function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
  }

  function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
  }

  function showCalendar(month, year) {

    const firstDay = (new Date(year, month)).getDay();
    // console.log(firstDay)

    const tbl = document.getElementById("calendar-body");


    tbl.innerHTML = "";


    monthAndYear.innerHTML = months[month] + " " + year;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {

      const row = document.createElement("tr");


      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          let cell = document.createElement("td");
          let cellText = document.createTextNode("");
          cell.appendChild(cellText);
          row.appendChild(cell);
        } else if (date > daysInMonth(month, year)) {
          // console.log(daysInMonth(month, year));
          break;
        } else {
          let cell = document.createElement("td");
          cell.setAttribute("data-date", date);
          cell.setAttribute("data-month", month + 1);
          cell.setAttribute("data-year", year);
          cell.setAttribute("data-month_name", months[month]);
          cell.className = "date-picker";
          cell.innerHTML = "<span>" + date + "</span>";

          if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
            cell.className = "date-picker selected";
          }
          row.appendChild(cell);
          date++;
        }


      }

      tbl.appendChild(row);
    }

    // Adding the event to single day in calendar
    const listener = document.querySelectorAll('.date-picker');
    listener.forEach(element => {
      element.addEventListener('click', function () {

        let chosenElement = element;

        let inividualArrayNumber = chosenElement.querySelector('.date-picker span').textContent
        console.log(inividualArrayNumber)
        console.log(storage[1])
        if (storage[1] === inividualArrayNumber) {
          return alert("one at the time")
        } else if (storage[1] !== inividualArrayNumber && storage.length > 1) {
          return alert("one at the time")
        }
        let input = prompt('remind of:')
        if (input === false || input === null || input === "" || storage.length > 0) {
          return
        } else {
          storage.push(input)
          storage.push(inividualArrayNumber)
          console.log(storage)
          const msg = `<div class="trick">${storage[0]}<div class="remove">left click to remove reminder</div>
        </div>`;
          chosenElement.style.backgroundColor = "lightblue"
          chosenElement.innerHTML = chosenElement.innerHTML + msg;
        }
        const taskList = document.querySelector('.trick');
        taskList.addEventListener('click', function check() {
          const msg = `<div class="trick">${storage[0]}</div>`;
          chosenElement.innerHTML = chosenElement.innerHTML - msg
          // taskList.display= "none"
          chosenElement.style.backgroundColor = "white"
          chosenElement.innerHTML = storage[1]
          storage = []
          
          showCalendar(month, year)
          
        })
      })
    });
  }

  //number of day in any month of any year
  function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
  }
}