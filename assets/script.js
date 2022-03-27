var startbtn = document.getElementById("start-btn");
var time = document.getElementById("timer");
var secs = 60;
var timer = 0;
var questionsContainer = document.getElementById("questions");
var ulList = document.getElementById("answers")
var questionIndex = 0;
var score = 0;

const questionsAsked = [
    {
        title: "To insert a Javascript into a HTML page, which tag is used?",
        choices: ["<script=â€™javaâ€™>", "<javascript>", "<script>", "<js>"],
        answer: "<script>"
    },
    {
        title: "Which of the following options is used to assign a value to a variable",
        choices: ["$", "=", "+", ":"],
        answer: "="
    },
    {
        title: "What does the logical operator && mean",
        choices: ["or", "while", "and", "if"],
        answer: "and"
    },
    {
        title: "How do you create a function in javascript",
        choices: ["function = myFunction()", "function myFunction()", "function:myFunction", "create:function()"],
        answer: "function myFunction()"
    },
]

//his will capture click on the start button and activate the timer and all subsequent code
startbtn.addEventListener ("click", () => {
    if (timer === 0) {
        timer = setInterval(function () {
            secs--
            time.textContent = "Time: " + secs;
            if (secs <= 0) {
                clearInterval(timer)
                time.textContent = "Time is up!"
            }
        }, 1000)
    }
    displayChoices(questionIndex);
})


// Displays all the question and answers to the page

function displayChoices (questionIndex) {
    questionsContainer.innerHTML = "";
    ulList.innerHTML = "";
    for (var i = 0; i < questionsAsked.length; i++) {
        var questionDisplayed = questionsAsked[questionIndex].title
        var answerDisplayed = questionsAsked[questionIndex].choices
        questionsContainer.textContent = questionDisplayed
    }

    //Functional loop forEach will append all the possible choices to the page as buttons
    answerDisplayed.forEach(function(choice) {
        var listItem = document.createElement("button")
        listItem.textContent = choice
        questionsContainer.appendChild(ulList);
        ulList.appendChild(listItem)
        listItem.addEventListener("click", correctAnswer)
    })
}
// Compare the user's choice to the actual correct answer
function correctAnswer (event) {
    var compare = event.target;

    if (compare.matches("button")) {
        var newDiv = document.createElement("div")
        newDiv.setAttribute("id", "createDiv")
        if (compare.textContent == questionsAsked[questionIndex].answer){
            score++
            newDiv.textContent = "Your answer is correct!";
            setTimeout(function() {
                newDiv.innerHTML="";
            }, 1500);
        } else {
            secs = secs - 10;
            newDiv.textContent = "Your answer is incorrect!"
            setTimeout(function() {
                newDiv.innerHTML="";
            }, 1500);
        }

    }
    questionIndex++
    //QuestionIndex tracks that all questions have been displayed and will execute final code. 
    if (questionIndex >= questionsAsked.length) {
        quizComplete();
    } else {
        displayChoices (questionIndex)
    }
    questionsContainer.appendChild(newDiv)
}
// This will display the final page with the user's score
function quizComplete () {
    questionsContainer.innerHTML = "";
    time.innerHTML = "";

    var newH1 = document.createElement("h1");
    newH1.setAttribute("id", "newH1");
    newH1.textContent = "Quiz Completed!"

    questionsContainer.appendChild(newH1);
    
    var newP = document.createElement("p");
    
    if (secs >= 0) {
        var finalScore = secs
        clearInterval(timer)
        newP.textContent = "Your final score is: " + finalScore
        questionsContainer.appendChild(newP)
    }

    var newLabel = document.createElement("label")
    newLabel.textContent = "Enter your initials"
    questionsContainer.appendChild(newLabel)

    var newInput = document.createElement("input");
    newInput.textContent = "";
    newInput.setAttribute("type", "text")
    questionsContainer.appendChild(newInput);

    var newSubmit = document.createElement("button");
    newSubmit.textContent = "Submit";
    newSubmit.setAttribute = ("type", "submit");
    questionsContainer.appendChild(newSubmit);

    newSubmit.addEventListener("click", () => {
        var initials = newInput.value;

        if (initials) {
            const highscores = {
                name: initials,
                score: finalScore,
            }
            var savedScores = localStorage.getItem("savedScores");
            if (savedScores === null) {
                savedScores = [];
            } else {
                savedScores = JSON.parse(savedScores)
            }
            savedScores.push(highscores);
            var newScores = JSON.stringify(savedScores)
            localStorage.setItem("savedScores", newScores);

            window.location.replace("./highscores.html");

        } else {
            alert("You must enter you intials to save your score")
        }

    })

}