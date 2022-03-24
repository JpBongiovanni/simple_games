document.addEventListener('DOMContentLoaded', () => {

    //card options
    const cardArray = [

        {
            name: 'cutlery',
            img: 'images/cutlery.png'
        },
        {
            name: 'cutlery',
            img: 'images/cutlery.png'
        },
        {
            name: 'dish',
            img: 'images/dish.png'
        },
        {
            name: 'dish',
            img: 'images/dish.png'
        },
        {
            name: 'fast-food',
            img: 'images/fast-food.png'
        },
        {
            name: 'fast-food',
            img: 'images/fast-food.png'
        },
        {
            name: 'fork',
            img: 'images/fork.png'
        },
        {
            name: 'fork',
            img: 'images/fork.png'
        },
        {
            name: 'hamburger',
            img: 'images/hamburger.png'
        },
        {
            name: 'hamburger',
            img: 'images/hamburger.png'
        },
        {
            name: 'hot-pot',
            img: 'images/hot-pot.png'
        },
        {
            name: 'hot-pot',
            img: 'images/hot-pot.png'
        },
        {
            name: 'res-cutlery',
            img: 'images/res-cutlery.png'
        },
        {
            name: 'res-cutlery',
            img: 'images/res-cutlery.png'
        },
        {
            name: 'salad',
            img: 'images/salad.png'
        },
        {
            name: 'salad',
            img: 'images/salad.png'
        },
    ]

cardArray.sort(() => 0.5 - Math.random())

const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('#result')
let cardsChosen = []
let cardsChosenId = []
let cardsWon = []

//create your board
function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement('img')
    card.setAttribute('src', 'images/black.png')
    card.setAttribute('data-id', i)
    card.addEventListener('click', flipCard)
    grid.appendChild(card)
    }
}

//check for matches
function checkForMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    
    if(optionOneId == optionTwoId) {
    cards[optionOneId].setAttribute('src', 'images/black.png')
    cards[optionTwoId].setAttribute('src', 'images/black.png')
    alert('You have clicked the same image!')
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
    alert('You found a match')
    cards[optionOneId].setAttribute('src', 'images/empty-space.png')
    cards[optionTwoId].setAttribute('src', 'images/empty-space.png')
    cards[optionOneId].removeEventListener('click', flipCard)
    cards[optionTwoId].removeEventListener('click', flipCard)
    cardsWon.push(cardsChosen)
    } else {
    cards[optionOneId].setAttribute('src', 'images/black.png')
    cards[optionTwoId].setAttribute('src', 'images/black.png')
    alert('Sorry, try again')
    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    if  (cardsWon.length === cardArray.length/2) {
    resultDisplay.textContent = 'Congratulations! You found them all!'
    }
}

//flip your card
function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length ===2) {
    setTimeout(checkForMatch, 500)
    }
}

createBoard()
})