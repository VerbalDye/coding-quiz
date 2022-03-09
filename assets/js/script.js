// finds the elements we need
var startButtonEl = document.getElementById("start-btn");
var starterTextEl = document.getElementById("start");
var timerEl = document.querySelector("#timer span");
var mainEl = document.querySelector("main");
var popupEl = document.querySelector(".popup")

// counts which question we are on
var questionCounter = 0;

// global variables declared to prevent functions from overwriting each other
var fade;
var opacity;
var doneQuiz = false;
var timeRemaining = 60;

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

    var timer = setInterval(function() {
        timeRemaining--;
        timerEl.textContent = timeRemaining;
        if (timeRemaining <= 0 || doneQuiz) {
            clearInterval(timer);
        } 
    }, 1000)
}

// funciton to load in new questions as the user answers the last ones
var updateQuiz = function() {

    // increaments the questions counter
    if (questionCounter < questions.length - 1) {
        questionCounter++;
    } else {

        // if question counter is at max moves user to the end screen 
        finishQuiz();
        return false;
    } 

    // grabs the question element and load in the next question
    var questionEl = document.querySelector(".question");
    questionEl.innerHTML = "<span>Question " + questions[questionCounter].id + ":</span> " + questions[questionCounter].question;

    //loops through the answers and places in the new values
    for (key in questions[questionCounter]) {
        if (key.includes("answer")) {
            var answersEl = document.getElementById(key);
            answersEl.textContent = questions[questionCounter][key];
        };
    };
};

// loads end screen
var finishQuiz = function() {

    // housekeeping other processes
    doneQuiz = true;
    timerEl.textContent = (timeRemaining);

    // find and remove quiz elements
    var questionEl = document.querySelector("main .question");
    var answerListEl = document.querySelector("main .answers");
    questionEl.remove();
    answerListEl.remove();

    // creates all new elements
    var congratsEl = document.createElement("h1");
    var paragraphEl = document.createElement("p");
    var formEl = document.createElement("form");
    var inputEl = document.createElement("input");
    var labelEl = document.createElement("label")
    var submitEl = document.createElement("input");

    // loads in element information
    congratsEl.textContent = "Congratulations!";
    congratsEl.className = "question"
    paragraphEl.textContent = "Your Score Was " + timeRemaining + ".";
    inputEl.type = "text";
    inputEl.id = "initials";
    inputEl.placeholder = "ie. DH";
    labelEl.htmlFor = "initials";
    labelEl.textContent = "Enter Initials:";
    submitEl.type = "submit";
    submitEl.className = "btn";

    // appends elements in the proper order
    mainEl.appendChild(congratsEl);
    mainEl.appendChild(paragraphEl);
    formEl.appendChild(labelEl);
    formEl.appendChild(inputEl);
    formEl.appendChild(submitEl);
    mainEl.append(formEl);

    // adds a listener for the new submit button
    formEl.addEventListener("submit", submitScore);
}

// capture user input and stores to local storage
var submitScore = function(event) {
    event.preventDefault();

    var initialsValue = document.querySelector("#initials").value;

    if (localStorage.getItem("scores")) {
        var scores = JSON.parse(localStorage.getItem("scores"));
    } else {
        var scores = [];
    };
    
    if (initialsValue.length != 2) {
        alert("Please type just 2 Letters");
        return false;
    };

    // packages score object
    scores.push({initial: initialsValue, score: timeRemaining});
    localStorage.setItem("scores",JSON.stringify(scores));
    location.href = "./high-score.html";
}

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

        // time is used as score so incorrect answer subtract from the score.
        timeRemaining -= 15;
    };
    fadeOut(popupEl);
    updateQuiz();
}

// animates the 'correct!' popup to fade out 
var fadeOut = function (fadeEl) {

    // my attempt to solve the run away opacity problem if you answer questions to fast 
    // it's not working not sure what to change
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
    opacity = 1;

    // timer to delay the fade so player has time to read
    var timeOut = setTimeout(function () {
        
        // interval function iterates the opacity value to zero
        fade = setInterval(function () {
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

// function to catch when the timer reaches zero so
var waitForEnd = function() {
    if (timeRemaining > 0) {
        setTimeout(waitForEnd, 50);
        return;
    };
    timeRemaining = 0;
    finishQuiz();
};

// changes the color of an answer when pressed
// also allows user to continue holding mouse button and move mouse to not choose that answer
var mouseDownEvent = function(event) {
    if (event.target.matches("li")) {
        event.target.style.background = "#115791";
    };
};

// event listeners
startButtonEl.addEventListener("click", setupQuiz);
mainEl.addEventListener("mousedown", mouseDownEvent);
mainEl.addEventListener("mouseup", interpretClick);

// calling the endfunctions to it starts listening for the end.
waitForEnd();