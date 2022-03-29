const timeLeftDisplay = document.querySelector('#time-left');
const resultDisplay = document.querySelector('#result');
const startPauseButton = document.querySelector('#start-pause-button');
const squares = document.querySelectorAll('.grid div');
const logsleft = document.querySelectorAll('.log-left');
const logsright = document.querySelectorAll('.log-right');
const carsleft = document.querySelectorAll('.car-left');
const carsright = document.querySelectorAll('.car-right');

let currentIdx = 76
const width = 9;
let timerId;
let outcomeTimerId;
let currentTime = 20

function moveFrog(e){
    squares[currentIdx].classList.remove('frog');


    switch(e.key){
        case 'ArrowLeft' :
            
            if(currentIdx % width !== 0)currentIdx -= 1
            console.log(currentIdx)
            break

        case 'ArrowRight' :
            
            if(currentIdx % width < width - 1) currentIdx += 1
            console.log(currentIdx)
            break;

        case 'ArrowUp':
            
            if(currentIdx - width >= 0) currentIdx -= width
            console.log(currentIdx)
            break;

        case 'ArrowDown':
            
            if( currentIdx + width < width * width) currentIdx += width
            console.log(currentIdx)
            break;
    }

    squares[currentIdx].classList.add('frog');
}

// The auto move logs function grabs each div with class "logsLeft" and puts it into the moveLogLeft function. This is similar to looping through an array or table of a database
function autoMoveElements(){
    startPauseButton.textContent = "Start / Pause"
    currentTime -= 1;
    timeLeftDisplay.textContent = currentTime;
    logsleft.forEach(logLeft => moveLogLeft(logLeft));
    logsright.forEach(logRight => moveLogRight(logRight));
    carsleft.forEach(carLeft => moveCarLeft(carLeft));
    carsright.forEach(carRight => moveCarRight(carRight));
}

function checkOutcomes(){
    lose();
    win();
}

// the moveLogLeft function then takes the input from the autoMoveLogs function and runs it through the swith statements.
function moveLogLeft(logLeft) {
    switch(true) {
        case logLeft.classList.contains('l1') :
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
            break
        case logLeft.classList.contains('l2') :
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
            break
        case logLeft.classList.contains('l3') :
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4')
            break
        case logLeft.classList.contains('l4') :
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
            break
        case logLeft.classList.contains('l5') :
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
            break
    }
}

function moveLogRight(logRight){
    switch(true){
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1')
            logRight.classList.add('l5')
            break
        
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5')
            logRight.classList.add('l4')
            break

        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4')
            logRight.classList.add('l3')
            break

        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3')
            logRight.classList.add('l2')
            break

        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2')
            logRight.classList.add('l1')
            break
    }
}

function moveCarLeft(carLeft) {
    switch(true) {
        case carLeft.classList.contains('c1') :
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
            break
        case carLeft.classList.contains('c2') :
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break
        case carLeft.classList.contains('c3') :
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1')
            break
    }
}

function moveCarRight(carRight) {
    switch(true) {
        case carRight.classList.contains('c1') :
            carRight.classList.remove('c1')
            carRight.classList.add('c3')
            break
        case carRight.classList.contains('c2') :
            carRight.classList.remove('c2')
            carRight.classList.add('c1')
            break
        case carRight.classList.contains('c3') :
            carRight.classList.remove('c3')
            carRight.classList.add('c2')
            break
    }
}

function lose() {
    if(
        squares[currentIdx].classList.contains('c1') ||
        squares[currentIdx].classList.contains('l4') ||
        squares[currentIdx].classList.contains('l5') ||
        currentTime <= 0
    ){
        resultDisplay.textContent = 'You Lose!'
        clearInterval(timerId)
        squares[currentIdx].classList.remove('frog')
        document.removeEventListener('keyup', moveFrog);
        clearInterval(outcomeTimerId);
        startPauseButton.textContent = "Play Again?";
        startPauseButton.addEventListener('click', () => {
            window.location.reload();
        })
    }
}

function win(){
    if(squares[currentIdx].classList.contains('ending-block')){
        resultDisplay.textContent = 'You Win!'
        clearInterval(timerId)
        document.removeEventListener('keyup', moveFrog);
        clearInterval(outcomeTimerId);
        startPauseButton.textContent = "Play Again?"
        startPauseButton.addEventListener('click', () => {
            window.location.reload();
        })
    }
}
 //you can write functions within the parameters of an event listener. in this case I'm adding both the click event listener, AND the function it will run when it is clicked
startPauseButton.addEventListener('click', () => {
    if(timerId){
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        outcomeTimerId = null;
        timerId = null;
        document.removeEventListener('keyup', moveFrog);
    } else {
        startPauseButton.textContent = "Start / Pause"
        // this will call the autoMoveLogs function every second which in tern calls the moveLogsLeft function
        timerId = setInterval(autoMoveElements, 1000)
        outcomeTimerId = setInterval(checkOutcomes, 50)
        document.addEventListener('keyup', moveFrog)
    }
})