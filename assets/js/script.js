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

var userObj = {
    name: ""
}

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


//create a funtion for the timer
var timerFunc = function() {
    setInterval(function() {
        if (timer > 0 && questionCount < dataObj.length) {
            timer -= 1;
        //add the timer to the text content
        timeCounter.textContent = timer;
        }
        else {
            clearInterval(timerFunc);
        }
    }, 1000);
}

//funtion for the start quiz button
var startQuizButtonButtonHandler = function () {
    //run the timer
    timerFunc();

    //remove the welcom msg
    welcomeMsg.remove();
    
    //generate the 1st quiz
    quizFunc();
};

//Variable for the question count
var questionCount = 0;

//funtion to generate the container and title
var generateQuestion = function(count) {
    var quizContainer = document.createElement("div");
    quizContainer.className = "quiz-container";
    pageContentEl.appendChild(quizContainer);
    //quiz question
    var quizQuestions = document.createElement("h2");
    quizQuestions.className = "quiz-question";
    quizQuestions.textContent = dataObj[count].question;
    quizContainer.appendChild(quizQuestions);

};

//funtion to generate the answers 
var generateAnswerList = function() {
    quizContainer = document.querySelector(".quiz-container");
    //generate the answers from the object
    var answerContainer = document.createElement("div");
    answerContainer.className = "answer-container";
    quizContainer.appendChild(answerContainer);
    for (var i = 0; i < dataObj[questionCount].answers.length; i++) {
        var answers = document.createElement("li");
        answers.setAttribute("answer-id", i);
        answers.className = "answer-list";
        answers.textContent = (i + 1) + ". " + dataObj[questionCount].answers[i];
        answerContainer.appendChild(answers);
    };
}

//funtion to display the final result Page
var finalResultPage = function() {
    //create the container
    var quizContainer = document.createElement("div");
    quizContainer.className = "quiz-container";
    pageContentEl.appendChild(quizContainer);

    //display the message
    var finalMsg = document.createElement("h2");
    finalMsg.className = "quiz-question";
    finalMsg.textContent = "All Done!";
    quizContainer.appendChild(finalMsg);

    //display the score
    var finalMsg = document.createElement("h2");
    finalMsg.className = "quiz-question";
    finalMsg.textContent = "Your Final Score is: " + timer;
    quizContainer.appendChild(finalMsg);

    //create a form to enter the name
    var nameForm = document.createElement("form");
    nameForm.className = "name-form";
    nameForm.setAttribute("id", "name-form-submit");
    var nameInput = document.createElement("input");
    nameInput.className = "name-input";
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", "your-name");
    nameInput.setAttribute("placeholder", "Enter-your-name");
    nameForm.appendChild(nameInput);
    quizContainer.appendChild(nameForm);

    //create a submit button
    var submitButton = document.createElement("button");
    submitButton.className = "name-submit";
    submitButton.textContent = "Submit";
    nameForm.appendChild(submitButton);

    nameForm.addEventListener("submit", nameSubmitFunc);

};


//submit name Function
var nameSubmitFunc = function(event) {
    event.preventDefault();
    var nameForm = document.querySelector("#name-form-submit");
    var userName = document.querySelector(".name-input").value;
    console.log(userName);
    console.log(event.target);

    userObj.name = userName;

    nameForm.reset();
};

var quizFunc = function() {
     if (questionCount < dataObj.length) {

    //Generate Questions
    generateQuestion(questionCount);
    
    //generate Answerlist
    generateAnswerList();

    //add an event lister for the answer list
    var answersList = document.querySelector(".answer-container");
    answersList.addEventListener("click", answerSubmit);

    timerStop();
    } else {
        //display the final result
        finalResultPage();
    }
};

//function to display the result
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

        //increase the question count by 1
        questionCount += 1;

        //remove the previous quiz
        var quizContainer = document.querySelector(".quiz-container");
        quizContainer.remove();

        //generate the new quiz
        quizFunc();

        //show the result
        if (answerId === dataObj[questionCount - 1].correctAnswer) {
            var correct = "CORRECT";
            resultFunc(correct);
            
            
        } else {     
            var incorrect = "INCORRECT";
            resultFunc(incorrect);
            //reduce the timer by 10 if the answer is incorrect
            timer -= 10;
        }
                
    }

};

//funtion to stop the timer if all question are answered.
var timerStop = function() {
    if (questionCount >= dataObj.length) {
        console.log("Test");
    }
}


startQuizButton.addEventListener("click", startQuizButtonButtonHandler);



// startQuizButton.addEventListener("click", quizFunc);








