//create objects for questions
var dataObj = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: ["<script>", "<scripting>", "<js>", "<javascript>"],
        correctAnswer: 0
    },
    {
        question: "Which of the following type of variable is visible only within a function where it is defined?",
        answers: ["global variable", "local variable", "Both of the above", "None of the above"],
        correctAnswer: 1  
    }, 
    {
        question: "Which of the following function of Number object returns the number's value?",
        answers: ["toString()", "toLocaleString()", "toPrecision()", "valueOf()"],
        correctAnswer: 3  
    },
    {
        question: "Which of the following function of String object returns the calling string value converted to upper case?",
        answers: ["toLocaleUpperCase()", "toString()", "toUpperCase()", "substring()"],
        correctAnswer: 2  
    }
];

//Select and declare the DOM elements
var pageContentEl = document.querySelector(".main-container");
var timeCounter = document.querySelector(".time-counter span");

//Declare Timer Variable
var timer = 76;

/* //Obtain the first name from the user 
var userName = prompt("What is your first name?")
//display the username
var userNameDisplay = document.querySelector(".welcomeName span");
userNameDisplay.textContent = userName; */

//Welcome Message 
//div for the welcome msg
var welcomeMsg = document.createElement("div");
welcomeMsg.className = "quiz-container"
pageContentEl.appendChild(welcomeMsg);

//welcome message title
var welcomeMsgTitle = document.createElement("h2");
welcomeMsgTitle.textContent = "Code Quiz Challenge!";
welcomeMsg.appendChild(welcomeMsgTitle);

//Welcome msg content
var welcomeMsgContent = document.createElement("p");
welcomeMsgContent.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by 10 seconds!"
welcomeMsg.appendChild(welcomeMsgContent);

//Welcome msg button
var startQuizButton = document.createElement("button");
startQuizButton.textContent = "Start Quiz";
startQuizButton.className = "welcome-msg-button"
welcomeMsg.appendChild(startQuizButton);

var startQuizButtonButtonHandler = function () {
    //remove the welcom msg
    welcomeMsg.remove();
   //create a funtion for the timer
var timerFunc = setInterval(function() {
    if (timer > 0) {
        timer -= 1;
    //add the timer to the text content
    timeCounter.textContent = timer;
    }
    else {
        clearInterval(timerFunc);
    }
}, 1000);
}

//Variable for the question count
var questionCount = 0;

var quizFunc = function() {
    //create a new element for questions
    var quizContainer = document.createElement("div");
    quizContainer.className = "quiz-container";
    pageContentEl.appendChild(quizContainer);
    //quiz question
    var quizQuestions = document.createElement("h2");
    quizQuestions.className = "quiz-question";
    quizQuestions.textContent = dataObj[questionCount].question;
    quizContainer.appendChild(quizQuestions);
    
    //quiz answers
    var answerContainer = document.createElement("div");
    answerContainer.className = "answer-container";
    quizContainer.appendChild(answerContainer);
    for (var i = 0; i < dataObj[questionCount].answers.length; i++) {
        var answers = document.createElement("li");
        answers.setAttribute("answer-id", i);
        answers.className = "answer-list";
        answers.textContent = (i +1) + ". " + dataObj[questionCount].answers[i];
        answerContainer.appendChild(answers);
    }

    
    var answersList = document.querySelector(".answer-container");
    answersList.addEventListener("click", answerSubmit);

};



var resultFunc = function(answerResult) {
    var quizContainer = document.querySelector(".quiz-container");
    //create a div for the result
    var resultContainer = document.createElement("div");
    resultContainer.className = "result-container";
    quizContainer.appendChild(resultContainer);
    //create an h2 element to store the result
    var questionResult = document.createElement("h2");
    questionResult.className = "question-result";
    questionResult.textContent = answerResult + " Answer!";
    resultContainer.appendChild(questionResult);
};

// create a funtion to submit the asnwer
var answerSubmit = function(event) {
    if (event.target.matches(".answer-list")) {
        var answerId = parseInt(event.target.getAttribute("answer-id"));

        questionCount += 1;

        var quizContainer = document.querySelector(".quiz-container");
        quizContainer.remove();

        quizFunc();

        if (answerId === dataObj[questionCount - 1].correctAnswer) {
            var correct = "CORRECT";
            resultFunc(correct);
            
            
        } else {
            
            var incorrect = "INCORRECT";
            resultFunc(incorrect);;
        }
        
        
    }

    //
};



startQuizButton.addEventListener("click", startQuizButtonButtonHandler);

startQuizButton.addEventListener("click", quizFunc);








