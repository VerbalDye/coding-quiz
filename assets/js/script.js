// declare
var startButtonEl = document.getElementById("start-btn");
var starterTextEl = document.getElementById("start");
var mainEl = document.querySelector("main");
var questionCounter = 0;

// questions array
var questions = [
    { id:"1", question:"What is the circumference of the world?", answer0:"Answer 1", answer1:"Big ole amount of roundness", answer2:"This is huge", answer3:"This is a lot of roundness" },
    { id:"2", question:"What is the quality of roundness?", answer1:"Answer hey 1", answer2:"smol if larger", answer3:"This is huge man", answer4:"This is roundness" }
]

// remove the start screen and setup questions elements
var setupQuiz = function() {
    starterTextEl.remove();

    var questionEl = document.createElement("h1");
    questionEl.innerHTML = "<span>Question " + questions[questionCounter].id + ":</span>" + questions[questionCounter].question;
    questionEl.className = "question";

    var answerListEl = document.createElement("ul");
    answerListEl.className = "answers";

    for (i = 0; i < 4; i++) {
    var answersEl = document.createElement("li");
    var indexgg = "answer" + i;
    answersEl.textContent = questions[i].indexgg;
    answerListEl.appendChild(answersEl);
    }

    mainEl.appendChild(questionEl);
    mainEl.appendChild(answerListEl);
}

// event listeners
startButtonEl.addEventListener("click", setupQuiz);