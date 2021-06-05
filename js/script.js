"use strict";

const startButton = document.querySelector(".firstButton button");
const infoButton = document.querySelector(".infoBox");
const exitButton = infoButton.querySelector(".button .quit");
const continueButton = infoButton.querySelector(".button .restart");
const quizStart = document.querySelector(".quizBox");
const option = document.querySelector(".optionList");
const timeCount = quizStart.querySelector(".timer .timer");
const timeLine = quizStart.querySelector("header .timeLine");
const timeOff = quizStart.querySelector("header .time");

let data = localStorage.getItem("questions");
let data1 = JSON.parse(data);
console.log(data1.questions);

//route to start the Quiz and show the list on click
startButton.onclick = () => {
    infoButton.classList.add("activeInfo");
};

//route to exit the quiz and return to home page
exitButton.onclick = () => {
    infoButton.classList.remove("activeInfo");
};

//route to continue the quiz
continueButton.onclick = () => {
    infoButton.classList.remove("activeInfo");
    quizStart.classList.add("activeQuiz");
    showQuestion(0);
    questionCounter(1);
    startTimer(15);
    startTimerLine(0);
};

let counter = 0;
let questionCounters = 1;
let counterTime;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const nextButton = quizStart.querySelector(".nextQuestion");
const resultBox = document.querySelector(".resultBox");
const restartQuiz = resultBox.querySelector(".button .result");
const exitQuiz = resultBox.querySelector(".button .finish");

exitQuiz.onclick = () => {
    window.location.reload();
};

restartQuiz.onclick = () => {
    quizStart.classList.add("activeQuiz");
    resultBox.classList.remove("activeResult");
    let counter = 0;
    let questionCounters = 1;
    let timeValue = 15;
    let widthValue = 0;
    let userScore = 0;
    showQuestion(counter);
    questionCounter(questionCounters);
    clearInterval(counterTime);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    nextButton.style.display = "none";
    timeOff.textContent = "time left";
};

nextButton.onclick = () => {
    if (counter < data1.length - 1) {
        counter++;
        questionCounters++;
        showQuestion(counter);
        questionCounter(questionCounters);
        clearInterval(counterTime);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        nextButton.style.display = "none";
        timeOff.textContent = "time left";
    } else {
        clearInterval(counterTime);
        clearInterval(counterLine);
        console.log("questions complete");
        showResultBox();
    }
};

function showQuestion(index) {
    const text = document.querySelector(".question");
    let tag = "<span>" + data1.questions + "." + data1.answer + "</span>";
    let optionTag =
        '<div class="option">' +
        data1.options[0] +
        "<span></span></div>" +
        '<div class="option">' +
        data1.options[1] +
        "<span></span></div>" +
        '<div class="option">' +
        data1.options[2] +
        "<span></span></div>" +
        '<div class="option">' +
        data1.options[3] +
        "<span></span></div>";
    text.innerHTML = tag;
    option.innerHTML = optionTag;
    const options = option.querySelectorAll(".option");
    for (let x = 0; x < options.length; x++) {
        options[x].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = '<div class="icon Tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon Cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
    clearInterval(counterTime);
    clearInterval(counterLine);
    let userAnswer = answer.textContent;
    let correctAnswer = data1.answer;
    let allOptions = option.children.length;
    if (userAnswer == correctAnswer) {
        userScore += 1;
        answer.classList.add("correct");
        console.log("answer correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    } else {
        answer.classList.add("wrong");
        console.log("answer wrong");
        answer.insertAdjacentHTML("beforeend", crossIcon);
        for (let x = 0; x < allOptions; x++) {
            if (option.children[x].textContent == correctAnswer) {
                option.children[x].setAttribute("class", "option correct");
                option.children[x].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    for (let x = 0; x < allOptions; x++) {
        option.children[x].classList.add("display");
    }

    nextButton.style.display = "block";
}

function showResultBox() {
    infoButton.classList.remove("activeInfo");
    quizStart.classList.remove("activeQuiz");
    resultBox.classList.add("activeResult");
    const scoreText = resultBox.querySelector(".scoreText");
    if (userScore > 3) {
        let scoreTag =
            "<span>and congrats, you get only<p>" +
            userScore +
            "</p>out of<p>" +
            data1.length +
            "</p></span>";
        scoreText.innerHTML = scoreTag;
    } else if (userScore > 1) {
        let scoreTag =
            "<span>and sorry, you get only<p>" +
            userScore +
            "</p>out of<p>" +
            data1.length +
            "</p></span>";
        scoreText.innerHTML = scoreTag;
    } else {
        let scoreTag =
            "<span>and sorry, you get only<p>" +
            userScore +
            "</p>out of<p>" +
            data1.length +
            "</p></span>";
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counterTime = setInterval(timer, 1000);

    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counterTime);
            timeCount.textContent = "00";
            timeOff.textContent = "time out";

            let correctAnswer = data1.answer;
            let allOptions = option.children.length;

            for (let x = 0; x < allOptions; x++) {
                if (option.children[x].textContent == correctAnswer) {
                    option.children[x].setAttribute("class", "option correct");
                    option.children[x].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
            for (let x = 0; x < allOptions; x++) {
                option.children[x].classList.add("display");
            }

            nextButton.style.display = "block";
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);

    function timer() {
        time += 1;
        timeLine.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}

function questionCounter(index) {
    const bottomQuestionCounter = quizStart.querySelector(".totalQuestion");

    let totalQuestionAnswer =
        "<span><p>" + index + "</p>OF<p>" + data1.length + "</p>Questions</span>";

    bottomQuestionCounter.innerHTML = totalQuestionAnswer;
}