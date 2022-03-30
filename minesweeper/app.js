document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let width = 10;
    let bombAmount = 20;
    let squares = [];

    //create board
    function createBoard() {

        //get shuffled game array with random bombs
        const bombsArray = Array(bombAmount).fill('bomb');
        const emptyArray = Array(width*width - bombAmount).fill('valid');
        //now we need to mix them up to have our board using concat
        const gameArray = emptyArray.concat(bombsArray);
        const shuffledArray = gameArray.sort(() => Math.random() -0.5);

        for(let i = 0; i < width*width; i++){
            const square = document.createElement('div')
            square.setAttribute('id', i)
            square.classList.add(shuffledArray[i])
            grid.appendChild(square)
            squares.push(square)

            //normal click
            square.addEventListener('click', function(e) {
                click(square)
            })
        }

        //add numbers
        for (let i = 0; i < squares.length; i++){
            let total = 0;
            const isLeftEdge = (i % width === 0);
            const isRightEdge = (i === width - 1);

            if (squares[i].classList.contains('valid')){
                if (i > 0 && !isLeftEdge && squares[i -1].classList.contains('bomb')) total++; //checks if a bomb is to the west of the clicked square
                if (i > 9 && !isRightEdge && squares[i +1 - width].classList.contains('bomb')) total++ //checks if a bomb is to the north east of the clicked square
                if (i > 10 && squares[i - width].classList.contains('bomb')) total++//checks if a bomb is to the north of the clicked square
                if (i > 11 && !isLeftEdge && squares[i - width - 1].classList.contains('bomb')) total++//checks if a bomb is to the north west of the clicked square
                if (i < 98 && !isRightEdge && squares[i + 1].classList.contains('bomb')) total++ //checks if a bomb is to the east of the clicked square
                if (i < 90 && !isLeftEdge && squares[i + width -1].classList.contains('bomb')) total++ //checks if a bomb is to the south west of the clicked square
                if (i < 88 && !isRightEdge && squares[i + width + 1].classList.contains('bomb')) total++ //checks if a bomb is to the south east
                if (i < 89 && squares[i + width].classList.contains('bomb')) total++ //checks if a bomb is south of the clicked square

            }
        }
    }
    createBoard();

    //click on square actions
    function click(square) {
        if (square.classList.contains('bomb')) {
            alert('Game Over')
        }
    }

    
























})