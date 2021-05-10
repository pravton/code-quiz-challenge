//create objects for questions


//Select and declare the DOM elements
var pageContentEl = document.querySelector(".main-container");
var timeCounter = document.querySelector(".time-counter span");

//Declare Timer Variable
var timer = 76;


//Welcome Message 
//div for the welcome msg
var welcomeMsg = document.createElement("div");
welcomeMsg.className = "welcome-msg"
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
var welcomeMsgButton = document.createElement("button");
welcomeMsgButton.textContent = "Start Quiz";
welcomeMsgButton.className = "welcome-msg-button"
welcomeMsg.appendChild(welcomeMsgButton);

var welcomeMsgButtonHandler = function () {
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

welcomeMsgButton.addEventListener("click", welcomeMsgButtonHandler);




