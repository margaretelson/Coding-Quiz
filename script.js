var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement= document.getElementById('answer-buttons')
var resultsContainer = document.getElementById('results')

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
    event.stopPropagation();
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
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

function selectAnswer (el) {
    var selectedButton = el.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove ('hide')
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove('hide')
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
    }
]

resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;