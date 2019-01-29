//JSON style data
var allQuestions = [
    { 
        question: "Why is Prime Minister of the United Kingdom?", 
        choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"], 
        correctAnswer: 0 
    },
    {
        question: "Where is your favourite colour?",
        choices: ["Green", "Brown", "Blue", "Red"],
        correctAnswer: 0
    },
    {
        question: "Who is your name?",
        choices: ["Bob", "Paul", "Andrey", "Alex"],
        correctAnswer: 0
    },
];


//VARIABLES
var question = document.querySelector('.questionX');
var questionNumber = 0;
var answer = document.querySelector('.userAnswer');
var score = 0;


//FUNCTION EXPRESSION TO UPDATE THE DOM WITH TEXT
let updateText = function(){

    // check the question is defined & exists
    if (allQuestions[questionNumber]) {
        //change the question innerHTML
        question.innerHTML = allQuestions[questionNumber].question

        //loop to add all the possible answers as option DOM elements
        for (i = 0; i < allQuestions[questionNumber].choices.length; i++) {

            //ADD AN OPTION ELEMENT WITH innerHTML of allQuestions[questionNumber].choices[i] and a value equal to the count of the loop.
            var newOption = document.createElement("option")

            newOption.appendChild(document.createTextNode(allQuestions[questionNumber].choices[i]))

            answer.appendChild(newOption)

            //set the value of each option element to the iteration count of the loop.
            newOption.value = i
        }
    } else return
}

//load first question on window load
window.onload = updateText();



//CLEAR THE QUESTIONS OPTIONS
let clearOptions = function (){
    while (answer.children[1]) {
        answer.removeChild(answer.children[1]);
    }
}




//onClick function for next qestion button
function nextQuestion(){
    
    //if questionNumber > allQuestions.length alert you scored score out of allQuestions.length and set score to 0 and question to 0 and remove & rerender possible answers.
    if (questionNumber >= allQuestions.length-1) {

        if (document.querySelector('.userAnswer').value == allQuestions[questionNumber].correctAnswer){

        score += 1;
        Swal.fire({ title:`End of quiz! <br /> You scored ${score} out of ${allQuestions.length}`,
                    animation: false,
                    customClass: 'animated zoomInDown'
                });
        score -= score;
        questionNumber -= allQuestions.length - 1
        clearOptions();
        updateText();    

        } else{

            alert(`end of quiz, you scored ${score} out of ${allQuestions.length}`);
            score -= score;
            questionNumber -= allQuestions.length - 1;
            clearOptions();
            updateText();
        }  
    }
    
    //else if value of answer = value of correct answer add 1 to score and add 1 to question number & remove old options & update the dropdown with new options. 
    else if (document.querySelector('.userAnswer').value == allQuestions[questionNumber].correctAnswer) {
 
        questionNumber += 1;
        clearOptions();
        score += 1;
        updateText();

    } 
    //else alert ("ney") and stay on same question
    else{
        questionNumber += 1;
        clearOptions();
        score += 0;
        updateText();
    }

    
   
}

//click event handler for "next" button
document.querySelector("#nextQuestion").addEventListener('click', function (){
    nextQuestion();
})