let timer;
const progressBar = document.querySelector('.progress');
const timerValue = document.getElementById('timerValue');

resetTimer();
timer = setInterval(updateProgress, 1000); // Update every second


function updateProgress() {
    const currentValue = progressBar.value;
    const maxValue = parseInt(progressBar.getAttribute('max'));

    if (currentValue < maxValue) {
        progressBar.value = currentValue + 1;
        updateTimerDisplay(maxValue - currentValue);
    } else {
        clearInterval(timer);
    }
}
function updateTimerDisplay(secondsRemaining) {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    timerValue.textContent = formattedTime;
    if (formattedTime == "00:01") {
        location.replace("timeout.html");
    }
}

function resetTimer() {
    clearInterval(timer);
    progressBar.value = 0;
    updateTimerDisplay(parseInt(progressBar.getAttribute('max')));
}


class Question {
    constructor(question, answers, rightAnswer) {
        this.question = question;
        this.answers = answers;
        this.rightAnswer = rightAnswer;
    }
}


$.get("questions.json", function (data) {
    var head = document.getElementsByClassName("qu-heading")[0];
    var labels = document.getElementsByClassName("lab");
    var next = document.getElementsByClassName("nxt")[0];
    var pre = document.getElementsByClassName("pre")[0];
    var flag = document.getElementsByClassName("mrk")[0];
    var radio = document.getElementsByTagName("input");
    var div_side = document.getElementById("side");
    var submit = document.getElementById("submit");
    var count =document.getElementsByClassName("count")[0];

    function shuffleArray(array) {
        for (let i = 10; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    // Shuffle the questions array
    shuffleArray(data);


    // Create an array of Question objects
    var questionsArray = data.slice(0, 10).map(item =>
        new Question(item.question, [item.A, item.B, item.C, item.D], item.answer)
    );

    var index = 0;
    var counter = 0;
    var chooseAns = [];
    var currentQuestion = questionsArray[index];

    function displayQuestion() {
        head.innerHTML = currentQuestion.question;
        for (var j = 0; j < labels.length; j++) {
            labels[j].textContent = currentQuestion.answers[j];
        }
    }

    // Display the first question
    displayQuestion();

    next.addEventListener("click", function () {
        index++;
        count.textContent=`${index+1}/10`;
        // console.log(index);
        console.log(count);
        currentQuestion = questionsArray[index];
        displayQuestion();

        pre.style.display = "inline";
        if (index === questionsArray.length - 1) {
            next.style.display = "none";
        }

        for (var i = 0; i < 4; i++) {
            radio[i].checked = false;
        };
        if (chooseAns[index]) {
            document.getElementsByClassName(chooseAns[index])[0].checked = true;
        }
    });

    pre.addEventListener("click", function () {
        index--;
        // count=index+1;
        count.textContent=`${index+1}/10`;
        
        currentQuestion = questionsArray[index];
        displayQuestion();

        next.style.display = "inline";
        if (index === 0) {
            pre.style.display = "none";
        }


        for (var i = 0; i < 4; i++) {
            radio[i].checked = false;
        };
        if (chooseAns[index]) {
            document.getElementsByClassName(chooseAns[index])[0].checked = true;
        }
    });
    for (var i = 0; i < 4; i++) {
        radio[i].addEventListener("change", function saveAns() {
            chooseAns[index] = this.value;
            console.log(chooseAns);
        });
    }

    var marked = [];


    flag.addEventListener("click", function () {

        if (!marked.includes(currentQuestion.question)) {
            var div = document.createElement("div");
            div.style.backgroundColor = "darkgray";
            div.style.marginBottom = "10px";

            var link = document.createElement("a");
            link.classList.add("a");
            link.style.display = "inline-block";
            link.style.color = "whitesmoke";
            link.style.fontWeight = "bold";
            link.style.fontSize = "18px";
            link.textContent = `Question ${parseInt(index + 1)}`;
           
            // console.log(currentQuestion.question);
            marked[index] = currentQuestion.question;

            var delet = document.createElement("span");
            delet.style.display = "inline";
            delet.style.color = "whitesmoke";
            delet.style.marginLeft = "55%";
            delet.innerHTML = `<i class="fa-solid fa-trash"></i>`;

            delet.addEventListener("click", function () {
                div.remove();
            })

            div.appendChild(link);
            div.appendChild(delet);
            div_side.appendChild(div);

            link.setAttribute("id", index);

            link.addEventListener("click", function () {
                var id = this.id;

                index = id;
                count.innerHTML=`${parseInt(id)+1}/10`;
                currentQuestion = questionsArray[id];
                if (index == 0) {
                    pre.style.display = "none";
                    next.style.display="inline"
                } else if (index == questionsArray.length - 1) {
                    next.style.display = "none";
                    pre.style.display = "inline";
                }
                displayQuestion();
            });


        }
    });

    submit.addEventListener("click", function () {
        // console.log(questionsArray);

        for (var i = 0; i < chooseAns.length; i++) {

            if (chooseAns[i] == questionsArray[i].rightAnswer) {
                counter += 10;
            }
            else { console.log("hi"); }
        }
        // console.log("your score is " + counter);
        localStorage.setItem("counter", counter);
        location.replace("score.html");
    })
    ////////////////////////////////////////////



});
