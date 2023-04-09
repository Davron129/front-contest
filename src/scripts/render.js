const leaderboard = [
  { id: 1, username: "user1", level: "easy", score: 10, time: "1:00" },
  { id: 2, username: "user2", level: "medium", score: 20, time: "1:30" },
  { id: 3, username: "user3", level: "hard", score: 30, time: "2:00" },
  { id: 4, username: "user4", level: "easy", score: 8, time: "1:20" },
  { id: 5, username: "user5", level: "medium", score: 18, time: "2:00" },
  { id: 6, username: "user6", level: "hard", score: 24, time: "2:30" },
  { id: 7, username: "user7", level: "easy", score: 6, time: "1:30" },
  { id: 8, username: "user8", level: "medium", score: 16, time: "1:45" },
  { id: 9, username: "user9", level: "hard", score: 18, time: "3:00" },
];

export const showFilteredLeaderboard = (level) => {
  // Get the leaderboard from local storage
  //   const leaderboard = JSON.parse(localStorage.getItem("leaderboard"));

  // Filter the leaderboard to only show entries with the specified level
  const filteredLeaderboard = leaderboard.filter(
    (entry) => entry.level === level
  );

  // Sort the filtered leaderboard by score in descending order
  filteredLeaderboard.sort((a, b) => b.score - a.score);

  // Get a reference to the HTML table element
  const table = document.getElementById("leaderboard-table");
  const leaderboardLevel = document.getElementById("leaderboard__level");
  leaderboardLevel.innerHTML = level.toUpperCase();

  // Clear the existing table contents
  table.innerHTML = "";

  // Add a header row with the leaderboard level
  const headerRow = table.insertRow();
  headerRow.classList.add("table__header");
  const rankHeader = headerRow.insertCell();
  const usernameHeader = headerRow.insertCell();
  const scoreHeader = headerRow.insertCell();
  const timeHeader = headerRow.insertCell();
  rankHeader.innerHTML = "Rank";
  rankHeader.classList.add("column__header");
  usernameHeader.innerHTML = "Username";
  usernameHeader.classList.add("column__header");
  scoreHeader.innerHTML = "Score";
  scoreHeader.classList.add("column__header");
  timeHeader.innerHTML = "Time";
  timeHeader.classList.add("column__header");

  // Add a row for each leaderboard entry
  filteredLeaderboard.forEach((entry, index) => {
    const row = table.insertRow();

    // Add the rank column
    const rankCell = row.insertCell();
    rankCell.innerHTML = index + 1;
    rankCell.classList.add("cell");

    // Add the username column
    const usernameCell = row.insertCell();
    usernameCell.innerHTML = entry.username;
    usernameCell.classList.add("cell");
    // Add the score column
    const scoreCell = row.insertCell();
    scoreCell.innerHTML = entry.score;
    scoreCell.classList.add("cell");
    // Add the time column
    const timeCell = row.insertCell();
    timeCell.innerHTML = entry.time;
    timeCell.classList.add("cell");
  });
};

export const easyButton = document.getElementById("easy-button");
export const mediumButton = document.getElementById("medium-button");
export const hardButton = document.getElementById("hard-button");

easyButton.addEventListener("click", () => {
  showFilteredLeaderboard("easy");
});

mediumButton.addEventListener("click", () => {
  showFilteredLeaderboard("medium");
});

hardButton.addEventListener("click", () => {
  showFilteredLeaderboard("hard");
});

export const triggerModal = () => {
  /* Opening modal window function */
  function openModal() {
    /* Get trigger element */
    var modalTrigger = document.getElementsByClassName("jsModalTrigger");

    /* Set onclick event handler for all trigger elements */
    for (var i = 0; i < modalTrigger.length; i++) {
      modalTrigger[i].onclick = function () {
        var target = this.getAttribute("href");
        var modalWindow = document.getElementById(target);

        modalWindow.classList
          ? modalWindow.classList.add("open")
          : (modalWindow.className += " " + "open");
      };
    }
  }

  function closeModal() {
    /* Get close button */
    var closeButton = document.getElementsByClassName("jsModalClose");
    var closeOverlay = document.getElementsByClassName("jsOverlay");

    /* Set onclick event handler for close buttons */
    for (var i = 0; i < closeButton.length; i++) {
      closeButton[i].onclick = function () {
        var modalWindow = this.parentNode.parentNode;

        modalWindow.classList
          ? modalWindow.classList.remove("open")
          : (modalWindow.className = modalWindow.className.replace(
              new RegExp(
                "(^|\\b)" + "open".split(" ").join("|") + "(\\b|$)",
                "gi"
              ),
              " "
            ));
      };
    }

    /* Set onclick event handler for modal overlay */
    for (var i = 0; i < closeOverlay.length; i++) {
      closeOverlay[i].onclick = function () {
        var modalWindow = this.parentNode;

        modalWindow.classList
          ? modalWindow.classList.remove("open")
          : (modalWindow.className = modalWindow.className.replace(
              new RegExp(
                "(^|\\b)" + "open".split(" ").join("|") + "(\\b|$)",
                "gi"
              ),
              " "
            ));
      };
    }
  }

  /* Handling domready event IE9+ */
  function ready(fn) {
    if (document.readyState != "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  /* Triggering modal window function after dom ready */
  ready(openModal);
  ready(closeModal);
};
