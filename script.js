var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement= document.getElementById('answer-buttons')

//Questions Info

var questions = [
    {
        question: 'Which of the below is NOT an HTML tag?',
        answers: [
            { text: "<h1>", correct: false},
            { text: "<ts5>", correct: true},
            { text: "<p>", correct: false},
            { text: "<div>", correct: false}
        ]
    },
    {
        question: 'What does JSON mean?',
        answers: [
            { text: "Java Screening Online Notation", correct: false},
            { text: "Javascript on Nodes", correct: false},
            { text: "Javascript Object Notation", correct: true},
            { text: "Java Science On Nodes", correct: false}
        ]
    },
    {
        question: 'What is [Apple, Pear, Orange, Kiwi] an example of?',
        answers: [
            { text: "Array", correct: true},
            { text: "Alert", correct: false},
            { text: "Boolean", correct: false},
            { text: "Divs", correct: false}
        ]
    },
    {
        question: 'What does HTML mean?',
        answers: [
            { text: "Hypertext Making Lessons", correct: false},
            { text: "Harry Thinks Monkeys Lie", correct: false},
            { text: "Hypertext Markup Language", correct: true},
            { text: "Hyperlink Time Making Language", correct: false}
        ]
    }
]
var totalAnswers = questions.length
let correctAnswer = 0

function selectAnswer (el) {
    var selectedButton = el.target
    var correct = selectedButton.dataset.correct
    if (correct) { 
        correctAnswer = correctAnswer + 100
        console.log(correctAnswer)
    }
    let finalScore = correctAnswer / totalAnswers
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove ('hide')
    } else {
        startButton.innerText = "Done!"
        startButton.classList.remove('hide')
    alert("You have scored " + finalScore + "%")
    }
}

let shuffledQuestions, curentQuestions

startButton.addEventListener('click', startGame) 
nextButton.addEventListener('click', () => {
    currentQuestionIndex ++
    setNextQuestion()
})

function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    shuffledQuestions=questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    questions[currentQuestionIndex].answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
            // correctAnswer ++;
            // console.log(correctAnswer)
        }
        button.addEventListener('click',selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}



//Display Result Cards
var nameInput = document.querySelector("#name");
var scoreInput = document.querySelector("#score");
var submitButton = document.querySelector("#submit");
var msgDiv = document.querySelector("#msg");
var userNameSpan = document.querySelector("#user-name");
var userScoreSpan = document.querySelector("#user-score");

renderLastRegistered();

function displayMessage(type, message) {
  msgDiv.textContent = message;
  msgDiv.setAttribute("class", type);
}

function renderLastRegistered() {
  var name = localStorage.getItem("name");
  var score = localStorage.getItem("score");

  if (!name || !score) {
    return;
  }

  userNameSpan.textContent = name;
  userScoreSpan.textContent = score;
}

submitButton.addEventListener("click", function(event) {
  event.preventDefault();

  var name = document.querySelector("#name").value;
  var score = document.querySelector("#score").value;

  if (name === "") {
    displayMessage("error", "Name cannot be blank");
  } else if (score === "") {
    displayMessage("success", "Sorry you did not score on this quiz!");
  } else {
    displayMessage("success", "Entered successfully");

    localStorage.setItem("name", name);
    localStorage.setItem("score", score);
    renderLastRegistered();
  }
});



//Timer
var count = 60;
var interval = setInterval(function(){
  document.getElementById('count').innerHTML=count;
  count--;
  if (count === 0){
    clearInterval(interval);
    document.getElementById('count').innerHTML='You are out of time!';
  }
}, 1000);





