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
        // listener for all dats cels
        const listener = document.querySelectorAll('.date-picker');
        //loop so listener can work for all cells
        listener.forEach(element => {
            // same sa above plus start of function triger by listiner
            element.addEventListener('click', function (e) {

                //   e.stopImmediatePropagation()
                // clicked element assigned to variable
                let chosenElement = element;
                console.log(chosenElement.innerHTML)
                // clicked element first child text content
                console.log(e.target.firstChild.textContent)
                if (chosenElement.innerHTML !== `<span>${e.target.firstChild.textContent}</span>`) {
                    return
                }
                // create clicked element uniqe index number assigned to variable
                let inividualArrayNumber = chosenElement.querySelector('.date-picker span').textContent

                if (storage[1] === inividualArrayNumber && (!chosenElement.querySelector('.trick'))) {
                    return alert("one at the time")
                }

                if (!chosenElement.querySelector('.trick')) {
                    let input = prompt('remind of:')
                    // if (input === false || input === null || input === "" || storage.length > 0)
                    if (input === false || input === null || input === "") {
                        return
                    } else {
                        storage.push({
                            '01': input,
                            '02': inividualArrayNumber,
                            '03': month
                        })
                        renderChosenBox()
                    }
                }






                function renderChosenBox() {
                    for (const i of storage) {
                        //creating visual effects for every chosen element
                        let textValue = i['01']
                        console.log(textValue)


                        const msg = `<div class="trick">${textValue}<div class="remove">left click to remove reminder</div>
          </div>`;
                        chosenElement.style.backgroundColor = "lightblue"
                        chosenElement.innerHTML = chosenElement.innerHTML + msg;
                        chosenElement.addEventListener('click', trickListinerTrigger);
                    }
                }
            })
        });
    }

    function trickListinerTrigger(e) {
        //clicked value of day
        let variable = e.target.parentElement.firstChild.textContent

        let eTargetCurrentBox = e.target.parentElement
        //box text content
        console.log(e.target.parentElement.firstChild.textContent)
        // box html
        console.log(eTargetCurrentBox)
        for (const i of storage) {
            //stored value of day
            let value = i['02']

            console.log(value)
            if (variable == value) {
                const msg = `<div class="trick"></div>`;
                eTargetCurrentBox.innerHTML = eTargetCurrentBox.innerHTML - msg
                eTargetCurrentBox.style.backgroundColor = "white"
                eTargetCurrentBox.innerHTML = `<span>${variable}</span>`;
                //FINDING INDEX OF CURRENT OBJECT AND REMOVE FROM ARRAY
                const index = storage.findIndex(i => i['02'] == variable)
                storage.splice(index, 1)
                return
            }
        }
    }
    // listiner for all reminders 
    const taskList = document.querySelectorAll('.date-picker .trick');

    for (const task of taskList) {
        task.addEventListener('click', trickListinerTrigger)
    }
    //number of day in any month of any year
    function daysInMonth(iMonth, iYear) {
        return 32 - new Date(iYear, iMonth, 32).getDate();
    }

    //LISTINER FOR SWITCH MONTHS
    const btnListiner = document.querySelectorAll('button')
    btnListiner.forEach(btn => {

        btn.addEventListener('click', (e) => {
            for (const i of storage) {
                if (currentMonth == i['03']) {
                    //recreating marked items again
                    const msg = `<div class="trick">${i['01']}<div class="remove">left click to remove reminder</div>
                  </div>`;
                    let savedReminder = document.querySelector(`[data-date="${i['02']}"]`);
                    console.log(savedReminder)
                    console.log(currentMonth)
                    savedReminder.style.backgroundColor = "lightblue"
                    savedReminder.innerHTML = savedReminder.innerHTML + msg;
                    //add listiner to every new created reminder -no succes
                    savedReminder.addEventListener('click', trickListinerTrigger);
                }
            }
        })
    });
}