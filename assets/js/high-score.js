var tableEl = document.querySelector(".table table");
var buttonEl = document.querySelector("header button");

var scoresStr = localStorage.getItem("scores");
var scores = JSON.parse(scoresStr);

scores = scores.sort(function (a, b) {
    return b.score - a.score;
});
console.log(scores)

// tableEl.textContent = scores.initial + ": " + scores.score

for (i in scores) {
    var rowEl = document.createElement("tr");
    var initialsEl = document.createElement("td");
    var scoreEl = document.createElement("td");

    initialsEl.textContent = scores[i].initial;
    scoreEl.textContent = scores[i].score;

    rowEl.appendChild(initialsEl);
    rowEl.appendChild(scoreEl);
    tableEl.appendChild(rowEl);
};


var resetScore = function () {
    localStorage.removeItem("scores");
    tableEl.remove();
    alert("Scores reset!");
}

buttonEl.addEventListener("click", resetScore);
