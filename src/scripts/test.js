'use strict'
import {data} from "../store/db.js"

/**
 * 
 * @param  {"easy" | "medium" | "hard"} level 
 */
function getWordsByLevel(level) {
    const questions = data.filter((question) => question.level === level);
    const questionsAmount = questions.length;

    const randomTenQuestions = {};

    while(Object.keys(randomTenQuestions).length !== 10) {
        const questionIndex = Math.floor(Math.random() * questionsAmount);

        if(!randomTenQuestions[questionIndex]) {
            randomTenQuestions[questionIndex] = questions[Number(questionIndex)]
        }
    }

    const result = Object.values(randomTenQuestions);

    return result;
}

/**
 * 
 * @param {string} username 
 * @param {"easy" | "medium" | "hard"} level 
 * @param {number} score 
 */
function addToRating(username, level, score) {
    const rating = {
        id: Date.now(),
        username,
        level,
        score,
        time: Date.now()
    }

    let ratings = JSON.parse(localStorage.getItem("ratings"));

    if(!ratings) {
        localStorage.setItem("ratings", JSON.stringify([]));
        ratings = [];
    }

    ratings.push(rating);

    localStorage.setItem('ratings', JSON.stringify(ratings));
}

/**
 * 
 * @param {"easy" | "medium" | "hard"} level 
 */
function getRatingsByLevel(level) {
    const ratings = localStorage.getItem("ratings") ?? [];

    return ratings.filter((rating) => rating.level === level)
}

const button = document.getElementById("button");
console.log(button)

button.addEventListener("click", () => {
    console.log(getRatingsByLevel("hard"));
})


// console.log(getWordsByLevel("medium"))
// addToRating("davron", "medium", 10)