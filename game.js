const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoretext = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');



let currentQuestion ={};
let acceptingAnswer = true;
let score =0;
let questionCounter =0;
let availableQuestions = [];

let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript??",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",

        answer: 1
    },
    
    {
        question: "Inside which HTML element do we put the JavaScript??",
        choice1: "<script>",
        choice2: "<java>",
        choice3: "<js>",
        choice4: "<scripting>",

        answer: 2
    },

    {
        question: "Inside which HTML element do we put the JavaScript??",
        choice1: "<python>",
        choice2: "<javascript>",
        choice3: "<css>",
        choice4: "<html>",

        answer:3
    },

    {
        question: "Inside which HTML element do we put the JavaScript??",
        choice1: "<os>",
        choice2: "<driver>",
        choice3: "<kernel>",
        choice4: "<linux>",

        answer: 4
    }

   
];


const CORRECT_BONUS = 10;
const MAX_QUESTIONS =3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS){
        // go to the end page
        return window.location.assign("/end.html");
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    // update the progress bar
    
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswer = true;
};

choices.forEach( choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswer) return;

        acceptingAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

    

        const classToAplly = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        console.log(classToAplly);
        if (classToAplly=='correct'){
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToAplly);

        
        setTimeout( () =>{
            selectedChoice.parentElement.classList.remove(classToAplly);
            getNewQuestion();
        },1000);


    });
});

incrementScore =num => {
    score+=num;
    scoretext.innerText =score;

};

startGame();