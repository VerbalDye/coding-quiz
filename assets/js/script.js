// declare
var startButtonEl = document.getElementById("start-btn");
var starterTextEl = document.getElementById("start");
var mainEl = document.querySelector("main");

// questions array
var questions = [
    { id:"1", question:"What is the circumference of the world?", answer1:"Answer 1", answer2:"Big ole amount of roundness", answer3:"This is huge", answer4:"This is a lot of roundness" },
    { id:"2", question:"What is the quality of roundness?", answer1:"Answer hey 1", answer2:"smol if larger", answer3:"This is huge man", answer4:"This is roundness" }
]

// remove the start screen and setup questions elements
var setupQuiz = function() {
    starterTextEl.remove();

    var questionEl = document.createElement("h1");
    questionEl.innerHTML = "<span>Question 1:</span> What is the curcuumdferance of the Earth.";
    questionEl.className = "question";

    var answerListEl = document.createElement("ul");
    answerListEl.className = "answers";

    for (i = 0; i < 4; i++) {
    var answersEl = document.createElement("li");
    answersEl.textContent = "Answers" + i;
    answerListEl.appendChild(answersEl);
    }

    mainEl.appendChild(questionEl);
    mainEl.appendChild(answerListEl);
}

// event listeners
startButtonEl.addEventListener("click", setupQuiz);