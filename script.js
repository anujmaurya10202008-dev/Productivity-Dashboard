function openFeature() {
  let allElem = document.querySelectorAll(".elem");
  let fullElemPage = document.querySelectorAll(".fullElem");
  let fullElemPageBackBtn = document.querySelectorAll(".back");
  let motivationDiv = document.querySelector(".motivational-fullpage");
  allElem.forEach(function (elem) {
    elem.addEventListener(`click`, function () {
      document.querySelector(".allElem").style.display = "none";
      fullElemPage[elem.id].style.display = "block";
    });
  });

  fullElemPageBackBtn.forEach(function (back) {
    back.addEventListener(`click`, function () {
      fullElemPage[back.id].style.display = "none";
      document.querySelector(".allElem").style.display = "block";
    });
  });
}
openFeature();
function toDo() {
  let formInput = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form input");
  let taskDetailInput = document.querySelector(".addTask form textarea");
  let taskCheckInput = document.querySelector(".addTask form #check");

  let currentTask = [];
  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("The task list is empty😒");
  }

  function render() {
    let sum = "";
    let allTask = document.querySelector(".allTask");

    currentTask.forEach(function (elem, index) {
      sum += `<div class="task">
       <details>
              <summary>${elem.task}<span class=${elem.imp}>Imp</span></summary>
            <p>${elem.details}</p>
            </details>
           
                <button id=${index}>Mark Completed</button>
            </div>`;
    });
    allTask.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    let markBtn = document.querySelectorAll(".task button");
    markBtn.forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        render();
      });
    });
  }
  render();

  formInput.addEventListener("submit", function (e) {
    e.preventDefault();
    if (taskInput.value === "") {
      alert("Your Task is empty fill this MF...");
    } else {
      currentTask.push({
        task: taskInput.value,
        details: taskDetailInput.value,
        imp: taskCheckInput.checked,
      });
      formInput.reset();
      render();
    }
  });
}
toDo();

function dailyPlanner() {
  let dayPlanner = document.querySelector(".day-planner");
  let hour = Array.from({ length: 18 }, (elem, idx) => {
    let start = 5 + idx;
    let end = 7 + idx;

    return `${start}:00 ${start >= 12 ? "PM" : "AM"} - ${end}:00 ${end >= 12 ? "PM" : "AM"}`;
  });

  let dataPlanner = {};
  dataPlanner = JSON.parse(localStorage.getItem("dataPlanner")) || {};

  let hourSum = "";
  hour.forEach(function (elem, idx) {
    let savedData = dataPlanner[idx] || "";
    hourSum =
      hourSum +
      `<div class="day-planner-time">
            <p>${elem}</p>
            <input id=${idx} type="text" placeholder="..." value=${savedData}>
          </div>`;
  });
  dayPlanner.innerHTML = hourSum;
  let dayPlannerInput = document.querySelectorAll(".day-planner-time input");

  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dataPlanner[elem.id] = elem.value;

      localStorage.setItem("dataPlanner", JSON.stringify(dataPlanner));
    });
  });
}
dailyPlanner();

async function motivationalQuotes() {
  let motivationContent = document.querySelector(".motivation-2 p");
  let motivationAuthor = document.querySelector(".motivation-3 h2");
  const response = await fetch("https://api.api-ninjas.com/v2/randomquotes", {
    method: "GET",
    headers: {
      "X-Api-Key": "gB4X5ugBjgoIfnRFakqhVGFGKfVbGiw7UfsFmMiU",
    },
  });
  let data = await response.json();
  motivationContent.textContent = data[0].quote;
  motivationAuthor.textContent = "- " + data[0].author;
}
motivationalQuotes();

function allPomodoroTimer() {
  let totalSeconds = 1500;
  let pomoTime = document.querySelector(".pomo-timer h2");
  let startBtn = document.querySelector(".start-timer");
  let pauseBtn = document.querySelector(".pause-timer");
  let resetBtn = document.querySelector(".reset-timer");
  let timer;
  let isRunning = false;

  function pomodoroTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    pomoTime.innerHTML = `${String(minutes).padStart(2, 0)}:${String(seconds).padStart(2, 0)}`;
  }

  function startTimer() {
    clearInterval(timer);

    isRunning = true;
    timer = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        pomodoroTimer();
      } else {
        clearInterval(timer);
        isRunning = false;
      }
    }, 1000);
    if (totalSeconds <= 0) {
      totalSeconds = 1500; // 25 min reset
      pomodoroTimer();
    }
  }

  function pauseTimer() {
    clearInterval(timer);
  }

  function resetTimer() {
    clearInterval(timer); // timer stop
    totalSeconds = 1500; // value reset
    isRunning = false; // state reset
    pomodoroTimer(); // UI update
  }

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
  pomodoroTimer();
}
allPomodoroTimer();

function headerUi() {
  async function weatherApi() {
    let apikey = `11f835f55abf4c4bb7d155445260306`;
    let weatherLocation = "New Delhi";
    let data = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${weatherLocation}`,
    );

    let apiResponse = await data.json();
    let cityELement = document.querySelector("header .header1 .city");
    let temperatureElement = document.querySelector(
      "header .header2 .temperature",
    );
    let feellikeElement = document.querySelector("header .header2 .feellike");
    let heatElement = document.querySelector("header .header2 .heat-Index");
    let windElement = document.querySelector("header .header2 .wind");
    let humidityElement = document.querySelector("header .header2 .humidity");
    let city = apiResponse.location.name;
    let temperature = apiResponse.current.temp_c;
    let rain = apiResponse.current.condition.text;
    let heat = apiResponse.current.feelslike_c;
    let wind = apiResponse.current.wind_kph;
    let humidity = apiResponse.current.humidity;
    let heatTemperature = Math.floor(heat);
    cityELement.innerHTML = `${city}`;
    temperatureElement.innerHTML = `${temperature}°C`;
    feellikeElement.innerHTML = `${rain}`;
    heatElement.innerHTML = `Precipitation: ${heatTemperature}%`;
    windElement.innerHTML = `Wind: ${wind} Km/h`;
    humidityElement.textContent = `Humidity: ${humidity}%`;
  }
  weatherApi();

  function dateTime() {
    let date = new Date();
    let dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let dayOfWeek = dayNames[date.getDay()];
    let hour = date.getHours();
    let day = date.getDay();
    let dateOfMonth = date.getDate();
    let year = date.getFullYear();
    let month = monthNames[date.getMonth()];
    let amPM = hour >= 12 ? "PM" : "AM";
    let hourFormat = hour % 12 || 12;

    let monthElement = document.querySelector("header .header1 h2");
    let timeELement = document.querySelector("header .header1 h1");

    monthElement.innerHTML = `${dateOfMonth} ${month}, ${year}`;
    timeELement.innerHTML = `${dayOfWeek}, <span class="time"> ${String(hourFormat).padStart(2, 0)}:${String(minutes).padStart(2, 0)}:${String(seconds).padStart(2, 0)} ${amPM} </span>`;
  }
  setInterval(() => {
    dateTime();
  }, 1000);
}
headerUi();

function changeTheme() {
  let btnTheme = document.querySelector("nav .nav2 button");
  let rootElement = document.documentElement;
  let headerTheme = document.querySelector("header");
  let theme = 1;
  btnTheme.addEventListener("click", () => {
    if (theme === 0) {
      rootElement.style.setProperty("--pri", "#F1F5F9");
      rootElement.style.setProperty("--sec", "#020617");
      rootElement.style.setProperty("--tri1", "#A855F7");
      rootElement.style.setProperty("--tri2", "#EC4899");
      headerTheme.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1422466654108-5e533f591881?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
      theme = 1;
    } else if (theme === 1) {
      headerTheme.style.backgroundImage = "url('')";
      rootElement.style.setProperty("--pri", "#F5F7FA");
      rootElement.style.setProperty("--sec", "#1E293B");
      rootElement.style.setProperty("--tri1", "#3B82F6");
      rootElement.style.setProperty("--tri2", "#334155");
      headerTheme.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";

      theme = 2;
    } else if (theme === 2) {
      rootElement.style.setProperty("--pri", "#F6FFF8");
      rootElement.style.setProperty("--sec", "#1B4332");
      rootElement.style.setProperty("--tri1", "#52B788");
      rootElement.style.setProperty("--tri2", "#2D6A4F");

      headerTheme.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200')";

      theme = 3;
    } else if (theme === 3) {
      rootElement.style.setProperty("--pri", "#FFF8F0");
      rootElement.style.setProperty("--sec", "#4A2C2A");
      rootElement.style.setProperty("--tri1", "#D97706");
      rootElement.style.setProperty("--tri2", "#6F4E37");

      headerTheme.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200')";

      theme = 4;
    } else if (theme === 4) {
      rootElement.style.setProperty("--pri", "#F8F7FF");
      rootElement.style.setProperty("--sec", "#312E81");
      rootElement.style.setProperty("--tri1", "#8B5CF6");
      rootElement.style.setProperty("--tri2", "#4C1D95");

      headerTheme.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200')";

      theme = 0;
    }
  });
}
changeTheme();

function dailyGoals() {
  let dailyTask = document.querySelectorAll(".task-column .daily-goal-task");
  let todoColumn = document.querySelector("#todo-column");
  let progressColumn = document.querySelector("#progress-column");
  let doneColumn = document.querySelector("#done-column");
  let columns = [todoColumn, progressColumn, doneColumn];
  let dropElement = null;
  let allData = {};

  function addElementDiv(title, desc, column) {
    let div = document.createElement("div");
    div.setAttribute("draggable", "true");
    div.classList.add("daily-goal-task");
    div.innerHTML = `  <h2>${title}</h2>
              <p>${desc}</p>
              <button>Delete</button>`;
    column.append(div);

    const deleteBtn = div.querySelector("button");
    deleteBtn.addEventListener("click", function () {
      div.remove();
      updateCount();
    });

    div.addEventListener("drag", function () {
      dropElement = div;
    });
    return div;
  }

  function updateCount() {
    columns.forEach((col) => {
      let tasks = col.querySelectorAll(".daily-goal-task");
      let count = col.querySelector(".count");
      count.innerHTML = tasks.length;
      allData[col.id] = Array.from(tasks).map(function (t) {
        return {
          title: t.querySelector("h2").innerText,
          desc: t.querySelector("p").innerText,
        };
      });
      localStorage.setItem("tasks", JSON.stringify(allData));
    });
  }

  if (localStorage.getItem("tasks")) {
    let locData = JSON.parse(localStorage.getItem("tasks"));
    for (const col in locData) {
      const columnsData = document.querySelector(`#${col}`);
      locData[col].forEach(function (task) {
        addElementDiv(task.title, task.desc, columnsData);
      });
      updateCount();
    }
  }

  function dragEvents(column) {
    column.addEventListener("dragenter", function (e) {
      e.preventDefault();
      this.classList.add("active");
    });
    column.addEventListener("dragleave", function (e) {
      e.preventDefault();
      this.classList.remove("active");
    });
    column.addEventListener("dragover", function (e) {
      e.preventDefault();
    });
    column.addEventListener("drop", function (e) {
      e.preventDefault();
      column.appendChild(dropElement);
      this.classList.remove("active");

      updateCount();
    });
  }
  dragEvents(progressColumn);
  dragEvents(todoColumn);
  dragEvents(doneColumn);

  let addTaskButton = document.querySelector(".nav .right button");
  let modal = document.querySelector(".modal");
  let inputTaskBtn = document.querySelector(".center-task button");
  let bg = document.querySelector(".bg");

  addTaskButton.addEventListener("click", function () {
    modal.style.display = "flex";
  });
  bg.addEventListener("click", () => {
    modal.style.display = "none";
  });
  inputTaskBtn.addEventListener("click", function () {
    let dailyTextArea = document.querySelector(".center-task textarea");
    let dailyInput = document.querySelector(".center-task input");
    if (dailyInput.value.trim() === "") {
      alert("Bhai pehle task to likh de 😒");
    } else {
      addElementDiv(dailyInput.value, dailyTextArea.value, todoColumn);

      updateCount();

      modal.style.display = "none";
      dailyInput.value = "";
      dailyTextArea.value = "";
    }
  });
}
dailyGoals();
