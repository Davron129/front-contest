"use strict";
import { data } from "../store/db.js";

const RATINGS = "ratings";
const USERS = "users";
const CUR_USER = "curUser";

/**
 *
 * @param {string} field
 * @returns {Array}
 */
function get(field, defaultValue = []) {
  const result = localStorage.getItem(field);

  if (result) {
    return JSON.parse(result);
  }

  return defaultValue;
}

/**
 *
 * @param {string} field
 * @param {string} value
 */
function set(field, value) {
  localStorage.setItem(field, JSON.stringify(value));
}

/**
 *
 * @param {string} field
 */
function remove(field) {
  localStorage.removeItem(field);
}

/**
 *
 * @param  {"easy" | "medium" | "hard"} level
 */
export function getQuestionsByLevel(level) {
  const questions = data.filter((question) => question.level === level);
  const questionsAmount = questions.length;

  const randomTenQuestions = {};

  while (Object.keys(randomTenQuestions).length !== 10) {
    const questionIndex = Math.floor(Math.random() * questionsAmount);

    if (!randomTenQuestions[questionIndex]) {
      randomTenQuestions[questionIndex] = questions[Number(questionIndex)];
    }
  }

  const result = Object.values(randomTenQuestions).map((question) => ({
    en: question.words[0],
    uz: question.words[1],
  }));

  return result;
}

/**
 *
 * @param {string} username
 * @param {"easy" | "medium" | "hard"} level
 * @param {number} score
 */
export function addToRating(username, level, score) {
  const rating = {
    id: Date.now(),
    username,
    level,
    score,
    time: Date.now(),
  };

  let ratings = get(RATINGS);

  if (!ratings) {
    set(RATINGS, ratings);
    ratings = [];
  }

  ratings.push(rating);

  set(RATINGS, ratings);
}

/**
 *
 * @param {"easy" | "medium" | "hard"} level
 */
export function getRatingsByLevel(level) {
  const ratings = get(RATINGS);

  return ratings.filter((rating) => rating.level === level);
}

/**
 *
 * @param {string} username
 * @param {string} password
 * @returns
 */
export function handleLogin(username, password) {
  const users = get(USERS);

  const filteredUser = users.filter(
    (user) => user.username === username && user.password === password
  );
  console.log(filteredUser, "sasas");
  const isExists = filteredUser.length > 0;

  if (isExists) {
    const curUser = filteredUser[0];
    set(CUR_USER, curUser);
  }

  return isExists;
}

export function isLogged() {
  const curUser = get(CUR_USER, false);

  if (Array.isArray(curUser)) {
    return curUser[0];
  }

  return curUser;
}

/**
 *
 * @param {string} name
 * @param {string} username
 * @param {string} password
 * @returns
 */
export function handleRegister(name, username, password) {
  const users = get(USERS);
  const isExists =
    users.filter((user) => user.username === username).length > 0;

  if (isExists) {
    return false;
  }

  const curUser = {
    name,
    username,
    password,
  };

  users.push(curUser);

  set(USERS, users);
  set(CUR_USER, curUser);

  return true;
}

/**
 *
 * @param {string} field
 */
export function handleLogout(field) {
  localStorage.removeItem(field);
}
