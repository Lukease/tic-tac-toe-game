const app = document.querySelector('.app')

const createTicTacChoice = () => {
    const ticTacBox = document.createElement('div')

    ticTacBox.classList.add('app__box')
    app.appendChild(ticTacBox)

    const boxLeft = document.createElement('div')

    boxLeft.classList.add('app__box--choice')
    ticTacBox.appendChild(boxLeft)

    const firstCross = document.createElement('div')

    firstCross.classList.add('cross')
    boxLeft.appendChild(firstCross)

    const secondCross = document.createElement('div')

    secondCross.classList.add('cross')
    firstCross.appendChild(secondCross)

    const boxRight = document.createElement('div')

    boxRight.classList.add('app__box--choice')
    ticTacBox.appendChild(boxRight)

    const circle = document.createElement('div')

    circle.classList.add('circle')
    boxRight.appendChild(circle)

    return ticTacBox
}

const createTicTacArena = () => {
    const ticTacArena = document.createElement('div')

    ticTacArena.classList.add('app__arena')
    app.appendChild(ticTacArena)

    return ticTacArena
}

let whoWin = () =>{
    const win = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    const xWin = win.find(result => result.every(index => cubeArray[index] === 'X'))
    const oWin = win.find(result => result.every(index => cubeArray[index] === 'O'))

    if (xWin) {
        alert('X win the game')
        window.location.reload()
    }

    if (oWin) {
        alert('O win the game')
        window.location.reload()
    }
}

const ticTacBox = createTicTacChoice()
const arena = createTicTacArena()

let cubeArray = Array.from(new Array(9)).map(() => '')

cubeArray.forEach((object, index) => {
    const newCube = document.createElement('div')

    newCube.classList.add('cube')
    arena.appendChild(newCube)
    newCube.addEventListener('click', () => {
        const choice = document.querySelector('.app__box--choice.choice-green').firstChild.classList.value

        if(!newCube.hasChildNodes() && !newCube.classList.contains('cube')) {
            return
        }

        if (choice === 'circle') {
            const myChoice = document.createElement('div')

            myChoice.classList.add('circle')
            newCube.appendChild(myChoice)
            arena.style.pointerEvents = 'none'
            cubeArray[index] = 'O'

            whoWin()

            return
        }

        const firstCross = document.createElement('div')

        firstCross.classList.add('cross')
        newCube.appendChild(firstCross)

        const secondCross = document.createElement('div')

        secondCross.classList.add('cross')
        firstCross.appendChild(secondCross)
        arena.style.pointerEvents = 'none'
        cubeArray[index] = 'X'

        whoWin()
    })
})

const makeChoice = event => {
    const choice = document.querySelector('.app__box--choice.choice-green')

    if (choice) {
        choice.classList.remove('choice-green')
    }

    if (event.target.classList.contains('app__box--choice')) {
        event.target.classList.add('choice-green')
    }

    if (event.target.classList.contains('circle') || event.target.classList.contains('cross')) {
        event.target.parentNode.classList.add('choice-green')
    }
}

ticTacBox.addEventListener('click', makeChoice)

const allCube = document.querySelectorAll('.cube')
const play = () => {
    ticTacBox.removeEventListener('click', makeChoice)

    const choice = document.querySelector('.app__box--choice.choice-green').firstChild.classList.value
    const filtered = cubeArray
        .map((field, index) => field ? null : index)
        .filter(item => item !== null)
    const randomNumber = Math.floor(Math.random() * filtered.length)
    const randomNumberValue = filtered[randomNumber]

    if (randomNumberValue === undefined) {
        alert('Draw')
        window.location.reload()
    }

    if (allCube[randomNumberValue].classList.contains('cube') && !allCube[randomNumberValue].hasChildNodes() && choice === 'circle') {
        setTimeout(() => {
            const firstCross = document.createElement('div')

            firstCross.classList.add('cross')
            allCube[randomNumberValue].appendChild(firstCross)

            const secondCross = document.createElement('div')

            secondCross.classList.add('cross')
            firstCross.appendChild(secondCross)
            arena.style.pointerEvents = 'auto'
            cubeArray[randomNumberValue] = 'X'

            whoWin()
        }, 1000)
    }

    if (allCube[randomNumberValue].classList.contains('cube') && !allCube[randomNumberValue].hasChildNodes() && choice === 'cross') {
        setTimeout(() => {
            const myChoice = document.createElement('div')

            myChoice.classList.add('circle')
            allCube[randomNumberValue].appendChild(myChoice)
            arena.style.pointerEvents = 'auto'
            cubeArray[randomNumberValue] = 'O'

            whoWin()
        }, 1000)
    }
}

arena.addEventListener('click', play)


