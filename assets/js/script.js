var timeInterval = 0;
var timeLeft = 0;
var stimeLeft = document.getElementById("timeRemaining");
var questionArea = document.getElementById("questionA");
var answerArea = document.getElementById("answerArea");
var initials = document.getElementById("initials");
var questionNum = 0;
var maxNumQuestions = 1;

var question = [{
    q: "Sky color?",
    a: ["blue", "green", "red", "yellow"],
    ca: "blue"
},
{
    q: "2 + 2 =",
    a: ["22", "5", "4", "24"],
    ca: "4"
},
{
    q: "5 + 2 =",
    a: ["52", "7", "10", "2"],
    ca: "7"
},
{
    q: "10 + 10 =",
    a: ["20", "1010", "11", "100"],
    ca: "20"
},
{
    q: "15 * 2 =",
    a: ["17", "30", "152", "22"],
    ca: "30"
},
{
    q: "100 - 50 =",
    a: ["25", "150", "3", "50"],
    ca: "50"
}
];

// var maxNumQuestions = Object.keys(question).length - 1;
// console.log(maxNumQuestions);

function shuffleQuestions() {
    for (i = question.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * i);
        k = question[i];
        question[i] = question[j];
        question[j] = k;
    }
}

function shuffleAnswers() {
    for (i = question[questionNum].a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * i);
        k = question[questionNum].a[i];
        question[questionNum].a[i] = question[questionNum].a[j];
        question[questionNum].a[j] = k;
    }
}

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
            buildFinishPage();
        }

    }, 1000);
}

function buildWelcomePage() {
    var targetDiv = document.getElementById("welcome");
    console.log(targetDiv);
    targetDiv.style.display = "inline";

    var targetDiv2 = document.getElementById("questionA");
    console.log(targetDiv2);
    targetDiv2.style.display = "none";

    var targetDiv2 = document.getElementById("finish");
    console.log(targetDiv2);
    targetDiv2.style.display = "none";

    var targetDiv2 = document.getElementById("highScore");
    console.log(targetDiv2);
    targetDiv2.style.display = "none";

    var timer = document.getElementById("timerData");
    timer.style.display = "none";
    stimeLeft.innerHTML = timeLeft;

    document.getElementById("hsp").classList.remove("disabled");

}

function buildQuestionPage() {
    var targetDiv = document.getElementById("welcome");
    console.log(targetDiv);
    targetDiv.style.display = "none";

    var targetDiv2 = document.getElementById("questionA");
    console.log(targetDiv2);
    targetDiv2.style.display = "inline";

    var targetDiv2 = document.getElementById("finish");
    console.log(targetDiv2);
    targetDiv2.style.display = "none";

    var targetDiv2 = document.getElementById("highScore");
    console.log(targetDiv2);
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

function buildFinishPage() {
    var targetDiv = document.getElementById("welcome");
    console.log(targetDiv);
    targetDiv.style.display = "none";

    var targetDiv2 = document.getElementById("questionA");
    console.log(targetDiv2);
    targetDiv2.style.display = "none";

    var targetDiv2 = document.getElementById("finish");
    console.log(targetDiv2);
    targetDiv2.style.display = "inline";

    var targetDiv2 = document.getElementById("highScore");
    console.log(targetDiv2);
    targetDiv2.style.display = "none";

    var stimeLeft = document.getElementById("timeRemaining");
    console.log("Time Left = " + stimeLeft.innerHTML);
    document.getElementById("finishID").innerHTML = "score = " + stimeLeft.innerHTML;
    document.getElementById("score").innerHTML = timeLeft;
}

function buildHighScorePage() {
    var targetDiv = document.getElementById("welcome");
    console.log(targetDiv);
    targetDiv.style.display = "none";

    var targetDiv2 = document.getElementById("questionA");
    console.log(targetDiv2);
    targetDiv2.style.display = "none";

    var targetDiv2 = document.getElementById("finish");
    console.log(targetDiv2);
    targetDiv2.style.display = "none";

    var targetDiv2 = document.getElementById("highScore");
    console.log(targetDiv2);
    targetDiv2.style.display = "inline";

    var stimeLeft = document.getElementById("timeRemaining");
    console.log("Time Left = " + stimeLeft.innerHTML);
    var timer = document.getElementById("timerData");
    timer.style.display = "none";

    document.getElementById("hsp").classList.remove("disabled");

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

function askQuestion() {
    if (questionNum > maxNumQuestions) {
        clearInterval(timeInterval);
        buildFinishPage();
    }
    else {
        buildQuestionPage(questionNum);
    }
}

function init() {
    timeLeft = 100;
    questionNum = 0;
}

startQuizButton.addEventListener("click", function () {
    init();
    document.getElementById("hsp").classList.add("disabled");
    stimeLeft.innerHTML = timeLeft;
    shuffleQuestions();
    askQuestion();
    countdown();
});

if (answerArea) {
    answerArea.addEventListener("click", function (event) {
        // event.preventDefault();
        console.log("answer clicked!");
        console.log("event.target.textcontent: " + event.target.textContent);
        var isButton = event.target.nodeName === 'BUTTON';
        if (!isButton) {
            return;
        }

        // answerArea.removeEventListener("click", myFunction);
        document.getElementById("answer1").disabled = true;
        document.getElementById("answer2").disabled = true;
        document.getElementById("answer3").disabled = true;
        document.getElementById("answer4").disabled = true;

        answerArea.setAttribute("disabled", "true");

        console.log(event);
        console.log(event.target.id);

        var lineBreak = document.createElement("div");
        lineBreak.innerHTML = "<br><hr>";
        var resultEl = document.createElement("div");

        console.dir(event.target.id);
        if (event.target.textContent === question[questionNum].ca) {
            resultEl.textContent = "Correct!";
        } else {
            resultEl.textContent = "Incorrect!";
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
            askQuestion();
        }, 1000);
    });
}

finishButton.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("finish clicked!");

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
    console.log("storedUserDetails:");
    console.log(storedUserDetails);

    storedUserDetails.push(newUserDetails);
    console.log("storedUserDetails:");
    console.log(storedUserDetails);


    // Update local stored details
    localStorage.setItem("userDetails", JSON.stringify(storedUserDetails));


    // Read local storage into array
    // aStorage = getLocalStorage();
    // var aStorage
    // var storageArray = [];
    //     if (!JSON.parse(localStorage.getItem("scores"))) {
    //         return aStorage;
    //     }
    //     else {
    //         storageArray = JSON.parse(localStorage.getItem("scores"));
    //         return aStorage;
    //     }


    // // Push new object into array
    // aStorage = aStorage.push(userDetails);

    // // Set new submission to local storage 
    // localStorage.setItem("scores", JSON.stringify(aStorage));

    buildHighScorePage();
});

goBackButton.addEventListener("click", function () {
    console.log("goback clicked!");
    buildWelcomePage();
});

clearHighScoresButton.addEventListener("click", function () {
    console.log("clear high scores!");
    localStorage.clear();

    var tableBody = document.getElementById("tableBody");
    while (tableBody.lastElementChild) {
        tableBody.removeChild(tableBody.lastElementChild);
    }
});

hsp.addEventListener("click", function () {
    console.log("high score page!");
    buildHighScorePage();
    return false;
});


init();
buildWelcomePage();