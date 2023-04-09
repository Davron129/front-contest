import { getRatingsByLevel } from "./test.js";

export const showFilteredLeaderboard = (level) => {
  // Get the leaderboard from local storage
  const ratings = getRatingsByLevel(level);
  // Filter the leaderboard to only show entries with the specified level
  const filteredLeaderboard = ratings.filter((entry) => entry.level === level);

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
  const dateHeader = headerRow.insertCell();
  rankHeader.innerHTML = "Rank";
  rankHeader.classList.add("column__header");
  usernameHeader.innerHTML = "Username";
  usernameHeader.classList.add("column__header");
  scoreHeader.innerHTML = "Score";
  scoreHeader.classList.add("column__header");
  dateHeader.innerHTML = "Date";
  dateHeader.classList.add("column__header");

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
    const dateCell = row.insertCell();

    const date = `${new Date(entry.time).getDate()}/${new Date(
      entry.time
    ).getMonth()}/${new Date(entry.time).getFullYear()}`;

    dateCell.innerHTML = date;
    dateCell.classList.add("cell");
  });
};

export const easyButton = document.getElementById("easy-button");
export const mediumButton = document.getElementById("medium-button");
export const hardButton = document.getElementById("hard-button");
