//https://raw.githubusercontent.com/AGrush/jsquizapp/master/questions.json



function foo() {
    // RETURN the promise
    return fetch("https://raw.githubusercontent.com/AGrush/jsquizapp/master/questions.json").then(function (response) {
        return response.json(); // process it inside the `then`
    });
}


foo().then(function (response) {
    // access the value inside the `then`
    //console.log(response.allQuestions);



    // JSON style data
    // var allQuestions = [
    //     { 
    //         question: "Who is Prime Minister of the United Kingdom?", 
    //         choices: ["David Blane", "Gordon Bennet", "Winston Churchill", "Fat Tony"], 
    //         correctAnswer: 0 
    //     },
    //     {
    //         question: "Where is your favourite colour?",
    //         choices: ["Green", "Triangle", "Helicopter", "Monday"],
    //         correctAnswer: 0
    //     },
    //     {
    //         question: "Who is your name?",
    //         choices: ["Bob", "Jabba", "Andrey", "Alex"],
    //         correctAnswer: 0
    //     }
    // ];



    //VARIABLES
    var question = document.querySelector('.questionX');
    var questionNumber = 0;
    var answer = document.querySelector('.userAnswer');
    var score = 0;


    //FUNCTION EXPRESSION TO UPDATE THE DOM WITH TEXT
    let updateText = function(){
        
        // check the question is defined & exists
        if (response.allQuestions[questionNumber]) {
            //change the question innerHTML
            question.innerHTML = response.allQuestions[questionNumber].question

            //loop to add all the possible answers as option DOM elements
            for (i = 0; i < response.allQuestions[questionNumber].choices.length; i++) {

                //ADD AN OPTION ELEMENT WITH innerHTML of allQuestions[questionNumber].choices[i] and a value equal to the count of the loop.
                var newOption = document.createElement("option")

                newOption.appendChild(document.createTextNode(response.allQuestions[questionNumber].choices[i]))

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
        if (questionNumber >= response.allQuestions.length-1) {

            if (document.querySelector('.userAnswer').value == response.allQuestions[questionNumber].correctAnswer){

            score += 1;
                Swal.fire({
                    title:`End of quiz! <br /> ${currentUser} <br /> You scored ${score} out of ${response.allQuestions.length}`,
                        animation: false,
                        customClass: 'animated zoomInDown'
                    });
            score -= score;
            questionNumber -= response.allQuestions.length - 1
            clearOptions();
            updateText();    

            } else{

                Swal.fire({
                    title: `Lol ${currentUser}, <br /> You scored ${score} out of ${response.allQuestions.length}, try again.`,
                    animation: false,
                    customClass: 'animated lightSpeedIn'
                });
                score -= score;
                questionNumber -= response.allQuestions.length - 1;
                clearOptions();
                updateText();
            }  
        }
        
        //else if value of answer = value of correct answer add 1 to score and add 1 to question number & remove old options & update the dropdown with new options. 
        else if (document.querySelector('.userAnswer').value == response.allQuestions[questionNumber].correctAnswer) {
    
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
    }, { passive: true })

})



//COOKIE STUFF//

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}


window.addEventListener("load", function () {
    document.getElementById("myForm").addEventListener("submit", function (e) {
        //e.preventDefault(); // stop submission, remove this if you add an action to the form
        createCookie('first_cookie', this.textField.value, 7)
    });

});


var currentUser = readCookie('first_cookie');



// window.addEventListener("load", function () {
//     var helloWelcome = document.getElementById("hiThere")
//     //appendChild only appends Nodes. So you need to create a text node out of the variable.
//     var t = document.createTextNode(`again ${currentUser}.`); 

//     if(currentUser){

//         //window.location.href = "./quiz.html";
//         helloWelcome.appendChild(t)
//     }


    
// });





//EMPTY INPUT NAME ERROR CODE//
function empty() {
    var x;
    x = document.getElementById("name-input").value;
    if (x == "") {
        Swal.fire({
            title: `Enter your name please`,
            animation: false,
            customClass: 'animated wobble'
        });
        return false;
    };
}