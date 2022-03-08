// finds the elements we need
var startButtonEl = document.getElementById("start-btn");
var starterTextEl = document.getElementById("start");
var mainEl = document.querySelector("main");
var popupEl = document.querySelector(".popup")
// counts which question we are on
var questionCounter = 0;

// questions array
var questions = [
    { id: "1", question: "What is the circumference of the world?", answer0: "Answer 1", answer1: "Big ole amount of roundness", answer2: "This is huge", answer3: "This is a lot of roundness", correct: "answer3" },
    { id: "2", question: "What is the quality of roundness?", answer0: "Answer hey 1", answer1: "smol if larger", answer2: "This is huge man", answer3: "This is roundness", correct: "answer1" },
    { id: "3", question: "What is the quality of roundness?", answer0: "Answer hey 1", answer1: "smol if larger", answer2: "This is huge man", answer3: "This is roundness", correct: "answer0" },
    { id: "4", question: "What is the quality of roundness?", answer0: "Answer hey 1", answer1: "smol if larger", answer2: "This is huge man", answer3: "This is roundness", correct: "answer0" },
    { id: "5", question: "What is the quality of roundness?", answer0: "Answer hey 1", answer1: "smol if larger", answer2: "This is huge man", answer3: "This is roundness", correct: "answer0" },
    { id: "6", question: "What is the quality of roundness?", answer0: "Answer hey 1", answer1: "smol if larger", answer2: "This is huge man", answer3: "This is roundness", correct: "answer0" },
    { id: "7", question: "What is the quality of roundness?", answer0: "Answer hey 1", answer1: "smol if larger", answer2: "This is huge man", answer3: "This is roundness", correct: "answer0" }
]

// remove the start screen and setup questions elements
var setupQuiz = function () {
    starterTextEl.remove();

    // creates the question element
    var questionEl = document.createElement("h1");
    questionEl.innerHTML = "<span>Question " + questions[questionCounter].id + ":</span> " + questions[questionCounter].question;
    questionEl.className = "question";

    // creates the list element that contains the answers
    var answerListEl = document.createElement("ul");
    answerListEl.className = "answers";

    // Iterates through all properties of the current questions and finds and fills in the answers
    for (key in questions[questionCounter]) {
        if (key.includes("answer")) {
            var answersEl = document.createElement("li");
            answersEl.textContent = questions[questionCounter][key];
            answersEl.id = key;
            answerListEl.appendChild(answersEl);
        }
    }

    // appends the newly created elements to the 'main' div
    mainEl.appendChild(questionEl);
    mainEl.appendChild(answerListEl);
}

var updateQuiz = function() {
    questionCounter++;
    var questionEl = document.querySelector(".question");
    questionEl.innerHTML = "<span>Question " + questions[questionCounter].id + ":</span> " + questions[questionCounter].question;

    for (key in questions[questionCounter]) {
        if (key.includes("answer")) {
            var answersEl = document.getElementById(key);
            console.log(answersEl);
            answersEl.textContent = questions[questionCounter][key];
        };
    };
};

// filters clicks on main to useful values
var interpretClick = function (event) {
    var targetEl = event.target;

    // if the click was on an answer send it to the answer valiadation functions
    if (targetEl.matches("li")) {
        answerValidation(targetEl);
        targetEl.style.background = "#1998ff";
    };
};

// validate if the answer is correct and then sends for the next question to be loaded
var answerValidation = function (targetEl) {
    if (targetEl.id == questions[questionCounter].correct) {
        popupEl.textContent = "Correct!";
    } else {
        popupEl.textContent = "Incorrect!";
    };
    fadeOut(popupEl);
    updateQuiz();
}

// animates the 'correct!' popup to fade out 
var fadeOut = function (fadeEl) {
    try {
    clearTimeout(timeOut);
    clearInterval(fade);
    } catch {
        console.log("Oops")
    }

    // shows the element to begin with
    fadeEl.style.display = "block";
    fadeEl.style.opacity = "1";

    // counter for opacity
    var opacity = 1;

    // timer to delay the fade so player has time to read
    var timeOut = setTimeout(function () {

        // interval function iterates the opacity value to zero
        var fade = setInterval(function () {
            fadeEl.style.opacity = opacity;
            opacity -= .04;
            
            // ends itself when it reaches .05 opacity
            if (opacity <= .05) {
                clearInterval(fade);
                fadeEl.style.display = "none";
            }
        }, 25);
    }, 500);
}

// event listeners
startButtonEl.addEventListener("click", setupQuiz);
mainEl.addEventListener("mousedown", function(event) {
    if (event.target.matches("li")) {
        event.target.style.background = "#115791";
    }
})
mainEl.addEventListener("mouseup", interpretClick);
