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
    },
    {
        question: "What does HTML stands for?",
        answers: ["Hypertext Machine language", "Hypertext and links markup language", "Hypertext Markup Language", "Hightext machine language"],
        correctAnswer: 2
    }];

//Object for user data
var userObj = [];

//gloabal variable for highscore Status
var highScoreStatus = "";

//Select and declare the DOM elements
var pageContentEl = document.querySelector(".main-container");
var timeCounter = document.querySelector(".time-counter span");

//Declare Timer Variable
var timer = (dataObj.length * 15) + 1;
//Variable for the question count
var questionCount = 0;
//variable for interval
var interval = null;

//create a funtion for the timer
var timerFunc = function() {
    interval = setInterval(() => {
            timer -= 1;
            //add the timer to the text content
            timeCounter.textContent = timer;
    }, 1000);
};

//function to load the saved data
var loadScores = function() {
    //load the saved data
    var loadScoreData = localStorage.getItem("userObj");
    //return if these is no data
    if (!loadScoreData) {
        return false;
    }
    //parse the loaded data
    loadScoreData = JSON.parse(loadScoreData);
    
    //sort the array based on highscores
    loadScoreData.sort(function(a,b) {
        return b.score - a.score;
    })

    //set loaded data to userObj
    userObj = loadScoreData;
};

//Welcome Message 
var welcomeMsgFunc = function() {
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

    //add an event listen to startQuizButton
    startQuizButton.addEventListener("click", startQuizButtonButtonHandler);
};


//funtion for the start quiz button
var startQuizButtonButtonHandler = function () {
    quizContainer = document.querySelector(".quiz-container");
    //run the timer
    if (timer > 0) {
        timerFunc();
    } 

    quizContainer.remove();
    
    //generate the 1st quiz
    generateQuiz();
};

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

//funtion for the answer submit
var answerSubmit = function(event) {
    if (event.target.matches(".answer-list")) {
        var answerId = parseInt(event.target.getAttribute("answer-id"));

        //increase the question count by 1
        questionCount += 1;

        //remove the previous quiz
        var quizContainer = document.querySelector(".quiz-container");
        quizContainer.remove();

        //generate the new quiz
        generateQuiz();

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


//Function to generate the Quiz
var generateQuiz = function() {
     if (questionCount < dataObj.length) {

    //Generate Questions
    generateQuestion(questionCount);
    
    //generate Answerlist
    generateAnswerList();

    //add an event lister for the answer list
    var answersList = document.querySelector(".answer-container");
    setTimeout(() => {
        answersList.addEventListener("click", answerSubmit);
    }, 500); 

    
    } else {
        //display the updated timer 
        setTimeout(() => {
            clearInterval(interval);
        }, 500);
        //display the final result
        finalResultPage();
    }
};

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
    quizContainer.appendChild(finalMsg); 
    setTimeout(() => {
        finalMsg.textContent = "Your Final Score is: " + timer; 
    }, 500); 

    //display the updated timer
    setTimeout(() => {
        timeCounter.textContent = timer;
    }, 500);

    
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
    submitButton.className = "buttons-style";
    submitButton.textContent = "Submit";
    //add the link to go highscore page
    submitButton.setAttribute("onclick", "document.location='high-scores.html'");
    nameForm.appendChild(submitButton);

    nameForm.addEventListener("submit", nameSubmitFunc);

};


//name submit and save Function
var nameSubmitFunc = function(event) {
    event.preventDefault();

    //var nameForm = document.querySelector("#name-form-submit");
    var userName = document.querySelector(".name-input").value;

    //declare variable for stopped time
    stoppedTime = timer;

    //declare variable for new data
    var newUserData = {
        name: userName,
        score: stoppedTime,
    };

    //check to see if the user beat the highscore
    for (var i = 0; i < userObj.length; i++) {
        if (stoppedTime > userObj[i].score) {
            highScoreStatus = true;
        }  
    }

    if (userObj.length === 0 || highScoreStatus) {
        alert("Congratulations, you beat the highscore!")
        //add the new data to userObj
        userObj.push(newUserData);
        // save the data in local storage
        localStorage.setItem("userObj", JSON.stringify(userObj));
    } else {
        alert("You did not beat the highscore! Please try again!")
    }
};

//load highscores page
//diplay the final score
var displayHighScores = function() {
    var pageContentEl = document.querySelector(".main-container");
    var highScoreContainer = document.createElement("div");
    highScoreContainer.className = "quiz-container";
    pageContentEl.appendChild(highScoreContainer);

    //Title for highscore
    var title = document.createElement("h2");
    title.className = "highscore-title";
    title.textContent = "High Scores";
    highScoreContainer.appendChild(title);

    //if the highscores are cleared display a msg
    if (userObj.length === 0) {
        var clearMsg = document.createElement("p");
        clearMsg.textContent = "High Scores are cleared! Please Play Again!";
        highScoreContainer.appendChild(clearMsg);
        console.log(userObj);
    } 
    //If not display the highscores 
    else {
        //display Name and the score
        var highScore = document.createElement("ul");
        highScore.className = "highscore-list-container";
        highScoreContainer.appendChild(highScore);

        //Name and Score
        for (var i = 0; i < userObj.length; i++) {
            var highScoreList = document.createElement("li");
            highScoreList.className = "highscore-list";
            highScoreList.textContent = (i + 1) + ". " + userObj[i].name + " - " + userObj[i].score;
            highScore.appendChild(highScoreList);
        }
    }

    //buttons for the highscore page
    var buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";
    highScoreContainer.appendChild(buttonContainer);

    //go back button
    var goBackButton = document.createElement("button");
    goBackButton.className = "buttons-style";
    goBackButton.textContent = "Go Back";
    goBackButton.setAttribute("onclick", "document.location='index.html'");
    buttonContainer.appendChild(goBackButton);
    
    
    //funtion to clear the highscore
    var clearLocalStorage = function() {
        localStorage.clear();
    };

    //clear highscores button
    var clearHighScoreButton = document.createElement("button");
    clearHighScoreButton.className = "buttons-style";
    clearHighScoreButton.textContent = "Clear HighScores";
    buttonContainer.appendChild(clearHighScoreButton);
    clearHighScoreButton.setAttribute("onclick", "document.location='high-scores.html'")
    clearHighScoreButton.addEventListener("click", clearLocalStorage);

};

//load the highscores from local storage
loadScores();

// //display the local path 
// console.log(window.location.pathname);

// if the index.html is loaded display the welcome msg
if (window.location.pathname == '/index.html') {
    addEventListener("onload", welcomeMsgFunc());   
}
//if the highscore page is loaded display the highscore 
else if ((window.location.pathname == '/high-scores.html')) {
    addEventListener("onload", displayHighScores());
}

