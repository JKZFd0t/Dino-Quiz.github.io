//Initialize data storage (list) here
//a list that hold mutiple dictionaries keyvaluepair
const database = [
    {
        question:"Which is a hybrid?",
        options : ["GALLIMUS", "SINOCERATOPS", "INDOMINUS REX", "BECKLESPINAX"],
        answer  : "INDOMINUS REX"           
    },

    {
        question:"Which is a THERAPOD?",
        options : ["GALLIMUS", "STEGOSAURUS", "ALLOSAURUS" , "ANTARCOPELTA"],
        answer  : "ALLOSAURUS"           
    },

    {
        question:"Which Dinosaur Lives in herds?",
        options : ["THERIZINOSAURUS" , "SINOCERATOPS" , "INDOMINUS REX" , "CERATOSAURUS"],
        answer  : "SINOCERATOPS"           
    },

    {
        question:"Which Dinosaur eats Fish?",
        options : ["SUCHOMINUS", "SINOCERATOPS", "IGUANODON", "MAJUNGASAURUS"],
        answer  : "SUCHOMINUS"           
    },

    {
        question: "Which Dinosaur  is a type of Fish?",
        options : ["SUCHOMINUS", "XIPHACTINUS", "ALBERTOSAURUS", "MAJUNGASAURUS"],
        answer  : "XIPHACTINUS"           
    },
];



//Identity all HTML components that we want to control
const questionElement = document.getElementById('question');
const startButton = document.getElementById('start-btn');
const timerText = document. getElementById('countdownText');
const progressBarFill = document.getElementById('progress-bar-fill');
const optionContainer =document.getElementById('option-container');
const resultLabel=document.getElementById('result');
const feedbackLabel = document.getElementById('feedback');
const progressBarContainer = document.getElementById('progress-bar-container')
const timerElement = document.getElementById('timer');
let currentQuestionNo = 0; 
let timer = 0;  
let score  = 0;
progressBarFill.style.width = '0%';
feedbackLabel.textContent="";
startButton.addEventListener('click', startQuiz)   


function startQuiz()
{
   startButton.style.display='none';//to hide the start button
   loadNextQuestion();
}

function loadNextQuestion()
{
    if(currentQuestionNo < database.length)
    {
        //Reset Timer
        clearInterval(timer);

        //Udate progress bar
        progressBarFill.style.width = `${((currentQuestionNo + 1) / database.length) * 100}%`;
    
        //Set initial countdown value
        timerText.textContent = 15;
        
        const currentQuestionSet = database[currentQuestionNo];
        questionElement.textContent = currentQuestionSet.question;
        // Remove all previous button clones
        optionContainer.innerHTML = '';
        //clone 4 option buttons for a question
        currentQuestionSet.options.forEach((option) => {
            const button = document.createElement('button');
            button.classList.add('option-btn');
            button.textContent = option;
            optionContainer.appendChild(button);
            button.addEventListener('click', () => {
            disableOptionButtons();
                checkAnswer(option);
            });
    
        });

        enableOptionButtons();


        //Start the countdown timer  
        //Define in{} what to do when timer fires
        timer = setInterval(()=>{
            timerText.textContent = parseInt(timerText.textContent) - 1;
            if(parseInt(timerText.textContent) === 0)
            {
                //reset timer
                clearInterval(timer);

                currentQuestionNo = currentQuestionNo + 1;

                loadNextQuestion();
            }
        
        }, 1000);
    } else 
    {
        EndQuiz();
    }
}



function checkAnswer(option)
{
    //Retrieve answer key of a question set
    const answer = database[currentQuestionNo].answer;
    if(option  === answer)
    {
        score = score + 1;
    }

    resultLabel.textContent = `You scored ${score} point(s)`;
    showFeedback(option);  
}
  

function showFeedback(option)
{
    const answer = database[currentQuestionNo].answer;
    let feedbackText = ""
    if( option === answer)
    {
        feedbackText = "that correct!";
    }else if(option === null)
    {
        feedbackText = "time up next question!";
    }else
    {
      feedbackText = "WRONG ANS BAD LUCK NEXT TIME ";
    }
    feedbackLabel.textContent = feedbackText;

    // hold for three sec 
    setTimeout(() =>{
        currentQuestionNo = currentQuestionNo + 1;
        loadNextQuestion();
        feedbackLabel.textContent= "";
    },3000)
}

function disableOptionButtons()
{
const allOptionButtons = document.querySelectorAll('.option-btn');
allOptionButtons.forEach(button => {
    button.disabled = true;
});


}

function enableOptionButtons()
{
    const allOptionButtons = document.querySelectorAll('.option-btn');
    allOptionButtons.forEach(button => {
        button.disabled = false;
    });
}


function EndQuiz()
{
    clearInterval(timer)
    progressBarContainer.style.display = 'none';
    optionContainer.style.display = 'none';
    timerElement.style.display = 'none';
    feedbackLabel.textContent = "";
    questionElement.textContent = "Quiz had ended!!!! HOORAY!!! LET'S DO ROBLOX!";
}


























































