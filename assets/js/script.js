// Global Variables
var timeInterval = 0;
var timeLeft = 0;
var stimeLeft = document.getElementById("timeRemaining");
var questionArea = document.getElementById("questionA");
var answerArea = document.getElementById("answerArea");
var initials = document.getElementById("initials");
var questionNum = 0;
var maxNumQuestions = 5;

// Questions and answers for quiz
var question = [{
    q: "Inside which HTML element do we put the JavaScript?",
    a: ["<js>", "<script>", "<javascript>", "<scripting>"],
    ca: "<script>"
},
{
    q: "How to write an IF statement in JavaScript?",
    a: ["if i = 5 then", "if i == 5 then", "if i = 5", "if (i == 5)"],
    ca: "if (i == 5)"
},
{
    q: "How does a FOR loop start?",
    a: ["for i = 1 to 5", "for (i = 0; i <= 5)", "for(i <= 5; i++)", "for (i = 0; i <= 5; i++)"],
    ca: "for (i = 0; i <= 5; i++)"
},
{
    q: "How do you round the number 7.25, to the nearest integer?",
    a: ["round(7.25)", "Math.round(7.25)", "rnd(7.25)", "Math.rnd(7.25)"],
    ca: "Math.round(7.25)"
},
{
    q: "Which event occurs when the user clicks on an HTML element?",
    a: ["onclick", "onchange", "onmouseover", "onmouseclick"],
    ca: "onclick"
},
{
    q: "Which operator is used to assign a value to a variable?",
    a: ["X", "-", "*", "="],
    ca: "="
}
];

// Shuffle Questions Function
function shuffleQuestions() {
    for (i = question.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * i);
        k = question[i];
        question[i] = question[j];
        question[j] = k;
    }
}

// Shuffle Answers Function
function shuffleAnswers() {
    for (i = question[questionNum].a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * i);
        k = question[questionNum].a[i];
        question[questionNum].a[i] = question[questionNum].a[j];
        question[questionNum].a[j] = k;
    }
}

// Countdown Timer Function
function countdown() {
    timeInterval = setInterval(function () {
        if (timeLeft === 1) {
            stimeLeft.innerHTML = (timeLeft--) + " second left";
        }
        else if (timeLeft > 0) {
            stimeLeft.innerHTML = (timeLeft--) + " seconds left";
        }
        else {
            stimeLeft.innerHTML = "";
            clearInterval(timeInterval);
            alert("Time Up!!");
            timeLeft = 0;
            buildFinishPage();
        }
    }, 1000);
}

// Build Welcome Page Function
function buildWelcomePage() {
    var targetDiv = document.getElementById("welcome");
    targetDiv.style.display = "inline";

    var targetDiv2 = document.getElementById("questionA");
    targetDiv2.style.display = "none";

    var targetDiv2 = document.getElementById("finish");
    targetDiv2.style.display = "none";

    var targetDiv2 = document.getElementById("highScore");
    targetDiv2.style.display = "none";

    var timer = document.getElementById("timerData");
    timer.style.display = "none";
    stimeLeft.innerHTML = timeLeft;

    document.getElementById("hsp").classList.remove("disabled");

}

// Build Question Page Function
function buildQuestionPage() {
    var targetDiv = document.getElementById("welcome");
    targetDiv.style.display = "none";

    var targetDiv2 = document.getElementById("questionA");
    targetDiv2.style.display = "inline";

    var targetDiv2 = document.getElementById("finish");
    targetDiv2.style.display = "none";

    var targetDiv2 = document.getElementById("highScore");
    targetDiv2.style.display = "none";

    var timer = document.getElementById("timerData");
    timer.style.display = "inline";

    var lineBreak = document.getElementById("lineBreak");
    if (lineBreak) {
        lineBreak.remove();
    }

    var resultLine = document.getElementById("result");
    if (resultLine) {
        resultLine.remove();
    }

    shuffleAnswers();
    document.getElementById("question").textContent = question[questionNum].q;
    document.getElementById("answer1").textContent = question[questionNum].a[0];
    document.getElementById("answer2").textContent = question[questionNum].a[1];
    document.getElementById("answer3").textContent = question[questionNum].a[2];
    document.getElementById("answer4").textContent = question[questionNum].a[3];

    document.getElementById("answer1").removeAttribute("disabled");
    document.getElementById("answer2").removeAttribute("disabled");
    document.getElementById("answer3").removeAttribute("disabled");
    document.getElementById("answer4").removeAttribute("disabled");

}

// Build Finish Page Function
function buildFinishPage() {
    var targetDiv = document.getElementById("welcome");
    targetDiv.style.display = "none";

    var targetDiv2 = document.getElementById("questionA");
    targetDiv2.style.display = "none";

    var targetDiv2 = document.getElementById("finish");
    targetDiv2.style.display = "inline";

    var targetDiv2 = document.getElementById("highScore");
    targetDiv2.style.display = "none";

    var stimeLeft = document.getElementById("timeRemaining");
    document.getElementById("score").innerHTML = timeLeft;
}

// Build Highscore Page Function
function buildHighScorePage() {
    var targetDiv = document.getElementById("welcome");
    targetDiv.style.display = "none";

    var targetDiv2 = document.getElementById("questionA");
    targetDiv2.style.display = "none";

    var targetDiv2 = document.getElementById("finish");
    targetDiv2.style.display = "none";

    var targetDiv2 = document.getElementById("highScore");
    targetDiv2.style.display = "inline";

    var stimeLeft = document.getElementById("timeRemaining");
    var timer = document.getElementById("timerData");
    timer.style.display = "none";

    document.getElementById("hsp").classList.remove("disabled");

    var tableBody = document.getElementById("tableBody");
    while (tableBody.lastElementChild) {
        tableBody.removeChild(tableBody.lastElementChild);
    }

    var storedUserDetails = [];
    if (localStorage.getItem("userDetails") === null) {
        // storedUserDetails
    }
    else {
        storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    }

    // Loop thru array and create a row for each object; append to table body
    var tableBody = document.getElementById("tableBody");
    for (let i = 0; i < storedUserDetails.length; i++) {
        // Create new row
        var initials = storedUserDetails[i].initials;
        var score = storedUserDetails[i].score;
        var newRow = document.createElement("TR");
        var tableData1 = document.createElement("TD");
        var tableData2 = document.createElement("TD");

        // Assign the text to the table data
        tableData1.textContent = initials;
        tableData2.textContent = score;

        // Append the data to the table row elements
        newRow.appendChild(tableData1);
        newRow.appendChild(tableData2);

        // Append new row
        tableBody.appendChild(newRow)
    }


}

// Ask a question function
function askQuestion() {
    if (questionNum > maxNumQuestions) {
        clearInterval(timeInterval);
        buildFinishPage();
    }
    else {
        buildQuestionPage(questionNum);
    }
}

// Initialize function
function init() {
    timeLeft = 100;
    questionNum = 0;
}

// Event listener for start button
startQuizButton.addEventListener("click", function () {
    init();
    document.getElementById("hsp").classList.add("disabled");
    stimeLeft.innerHTML = timeLeft;
    shuffleQuestions();
    askQuestion();
    countdown();
});

// Event listener for answer buttons
if (answerArea) {
    answerArea.addEventListener("click", function (event) {
        var isButton = event.target.nodeName === 'BUTTON';
        if (!isButton) {
            return;
        }

        document.getElementById("answer1").disabled = true;
        document.getElementById("answer2").disabled = true;
        document.getElementById("answer3").disabled = true;
        document.getElementById("answer4").disabled = true;

        answerArea.setAttribute("disabled", "true");

        var lineBreak = document.createElement("div");
        lineBreak.innerHTML = "<br><hr>";
        var resultEl = document.createElement("div");

        if (event.target.textContent === question[questionNum].ca) {
            resultEl.textContent = "Correct!";
        } else {
            resultEl.textContent = "Incorrect!";
            timeLeft = timeLeft - 10;
        }
        questionArea.appendChild(lineBreak);
        questionArea.appendChild(resultEl);
        lineBreak.setAttribute("id", "lineBreak");
        resultEl.setAttribute("id", "result");
        questionNum++;
        
        setTimeout(function () {
            document.getElementById(event.target.id).style.outline = "none";
            document.getElementById(event.target.id).style.boxShadow = "none";
            document.getElementById(event.target.id).style.background = "#007bff";
            if (timeLeft > 0) {
                askQuestion();
            }
            }, 1000);
    });
}

// Event listener for finish/submit button
finishButton.addEventListener("click", function (event) {
    // Create object of entered details
    var newUserDetails = {
        initials: initials.value.trim(),
        score: timeLeft,
    };

    var storedUserDetails = [];
    // Get existing stored details
    if (localStorage.getItem("userDetails") === null) {
        // storedUserDetails
    }
    else {
        storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    }
    storedUserDetails.push(newUserDetails);

    // Update local stored details
    localStorage.setItem("userDetails", JSON.stringify(storedUserDetails));

    buildHighScorePage();
});

// Event listener for Go Back button
goBackButton.addEventListener("click", function () {
    buildWelcomePage();
});

// Event listener for Clear Highscores button
clearHighScoresButton.addEventListener("click", function () {
    localStorage.clear();

    var tableBody = document.getElementById("tableBody");
    while (tableBody.lastElementChild) {
        tableBody.removeChild(tableBody.lastElementChild);
    }
});

// Event listener for Highscore page button
hsp.addEventListener("click", function () {
    buildHighScorePage();
});

// Run initial functions on load of page/script
init();
buildWelcomePage();