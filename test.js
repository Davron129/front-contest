const data = require("./db.json")

/**
 * 
 * @param {"easy" | "medium" | "hard"} level 
 */
const getWordsByLevel = (level) => {
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



console.log(getWordsByLevel("medium"))