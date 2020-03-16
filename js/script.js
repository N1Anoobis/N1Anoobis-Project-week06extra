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
    let switched = true;
    const firstDay = (new Date(year, month)).getDay();
   

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
          //force to create just one .trick div when come cack from different month
          if (document.querySelector(`[data-date="${storage[1]}"]`) && document.querySelector(`[data-month="${storage[2]+1}"]`) && switched == true) {
            // console.log(document.querySelector(`[data-month="${storage[2]+1}"]`))
            // console.log(document.querySelector(`[data-date="${storage[1]}"]`))
            const msg = `<div class="trick">${storage[0]}<div class="remove">left click to remove reminder</div>
          </div>`;
            let savedReminder = document.querySelector(`[data-date="${storage[1]}"]`);
            savedReminder.style.backgroundColor = "lightblue"
            savedReminder.innerHTML = savedReminder.innerHTML + msg;
            switched = false
          }
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
            console.log(chosenElement.querySelector('.trick'))
            

            if (!chosenElement.querySelector('.date-picker span')) {
              return
            }
            let inividualArrayNumber = chosenElement.querySelector('.date-picker span').textContent

            if (storage[1] === inividualArrayNumber && (!chosenElement.querySelector('.trick'))) {
              return alert("one at the time")
            } else if (storage[1] !== inividualArrayNumber && storage.length > 1 && (!chosenElement.querySelector('.trick'))) {
              return alert("one at the time")
            }
            
            if (!chosenElement.querySelector('.trick')) {
              let input = prompt('remind of:')
                if (input === false || input === null || input === "" || storage.length > 0) {
                  return
                } else {
                  storage.push(input)
                  storage.push(inividualArrayNumber)
                  storage.push(month)


                  renderChosenBox()
               
                  console.log(storage)
                 
                  //Double listiner

                }
              }
              if (chosenElement.querySelector('.trick')) {



                const taskList = document.querySelector('.trick');
                taskList.addEventListener('click', function check() {
                  const msg = `<div class="trick">${storage[0]}</div>`;
                  chosenElement.innerHTML = chosenElement.innerHTML - msg
                  chosenElement.style.backgroundColor = "white"
                  console.log(inividualArrayNumber)
                  storage = []
                  showCalendar(month, year)
                })


                
              }

              function renderChosenBox() {
                const msg = `<div class="trick">${storage[0]}<div class="remove">left click to remove reminder</div>
          </div>`;
                chosenElement.style.backgroundColor = "lightblue"
                chosenElement.innerHTML = chosenElement.innerHTML + msg;
              }
            })
        });
    }

    //number of day in any month of any year
    function daysInMonth(iMonth, iYear) {
      return 32 - new Date(iYear, iMonth, 32).getDate();
    }
  }