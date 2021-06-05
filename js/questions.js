"use strict";

// alert("You Must Enter 5 Question", "Exclamation Mark");

let questionQuiz = [];

// let questionsMark = document.getElementById("ques-name").value;
// let correctAnswer = document.getElementById("correct-answer").value;
// let firstQuestions = document.getElementById("first-question").value;
// let secondQuestions = document.getElementById("second-question").value;
// let thirdQuestions = document.getElementById("third-question").value;
// let fourQuestions = document.getElementById("four-question").value;

let addQuestion = (event) => {
    event.preventDefault();

    let userQuestion = {
        number: questionQuiz.length + 1,
        questions: document.getElementById("ques-name").value,
        answer: document.getElementById("correct-answer").value,
        options: [
            document.getElementById("first-question").value,
            document.getElementById("second-question").value,
            document.getElementById("third-question").value,
            document.getElementById("four-question").value,
        ],
    };

    questionQuiz.push(userQuestion);
    document.querySelector("form").reset();

    console.log("add to form", questionQuiz);

    let string = JSON.stringify(userQuestion);
    localStorage.setItem("questions", string);

    let data = localStorage.getItem("questions");
    let data1 = JSON.parse(data);
    // console.log(data1);
    // console.log(data1.questions);

    let pre = document.querySelector("#msg pre");
    pre.textContent = "\n" + data1.questions;
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("button").addEventListener("click", addQuestion);
});

// let questions = [{
//     number: 1,
//     questions: "what are you doing?????",
//     answer: "play",
//     options: [
//         "play",
//         "fuck my girlfriend",
//         "what you want...!!!!",
//         "not your business",
//     ],
// }, ];

const showBox = document.querySelector(".submit");
const infoBox = document.querySelector(".form");
const exitButton1 = infoBox.querySelector(".Exit");

showBox.onclick = () => {
    infoBox.classList.add("activeInfo");
};

exitButton1.onclick = () => {
    infoBox.classList.remove("activeInfo");
};