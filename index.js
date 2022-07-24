// PLAYER OBJECT FACTORY FUNCTION
const Player = (sign) => {
    const getSign = () => {
        return sign;
    }
    return { getSign };
}
// GAMEBOARD MODULE
const gameBoard = (() => {
    const fieldArr = ['', '', '', '', '', '', '', '', ''];
    const getFieldArr = () => {
        return fieldArr;
    }
    const render = () => {
        for (let i = 0; i <= 8; i++) {
            document.querySelector(`#field${i}`).textContent = fieldArr[i];
        }
    }
    const resetGameBoard = () => {
        for (let i = 0; i <= 8; i++) {
            fieldArr[i] = '';
        }
        render();
    }
    return { getFieldArr, render, resetGameBoard };
})();
// GAMEFLOW MODULE
const gameFlow = (() => {
    const playerX = Player('X');
    const playerO = Player('O');
    let turnCounter = 1;
    const announcer = document.querySelector('#announcer');
    const resetGameFlow = () => {
        turnCounter = 1;
        announcer.textContent = 'Player X\'s turn!'
    }
    const field = document.querySelectorAll('.field');
    // ADDING SIGNS TO THE BOARD
    const addSign = (e) => {
        if (e.target.textContent) {
            return;
        }
        if (turnCounter % 2 === 0) {
            gameBoard.getFieldArr()[e.target.dataset.field] = playerO.getSign();
            turnCounter++;
            announcer.textContent = 'Player X\'s turn!'
        } else {
            gameBoard.getFieldArr()[e.target.dataset.field] = playerX.getSign();
            turnCounter++;
            announcer.textContent = 'Player O\'s turn!'
        }
        gameBoard.render();
        checkWinner();
    };
    field.forEach(square => {
        square.addEventListener('click', addSign);
    });
    // GAME OVER CONDITIONS
    const checkWinner = () => {
        if ((gameBoard.getFieldArr()[0] === playerX.getSign()
            && gameBoard.getFieldArr()[1] === playerX.getSign()
            && gameBoard.getFieldArr()[2] === playerX.getSign())
            || (gameBoard.getFieldArr()[3] === playerX.getSign()
                && gameBoard.getFieldArr()[4] === playerX.getSign()
                && gameBoard.getFieldArr()[5] === playerX.getSign())
            || (gameBoard.getFieldArr()[6] === playerX.getSign()
                && gameBoard.getFieldArr()[7] === playerX.getSign()
                && gameBoard.getFieldArr()[8] === playerX.getSign())
            || (gameBoard.getFieldArr()[0] === playerX.getSign()
                && gameBoard.getFieldArr()[3] === playerX.getSign()
                && gameBoard.getFieldArr()[6] === playerX.getSign())
            || (gameBoard.getFieldArr()[1] === playerX.getSign()
                && gameBoard.getFieldArr()[4] === playerX.getSign()
                && gameBoard.getFieldArr()[7] === playerX.getSign())
            || (gameBoard.getFieldArr()[2] === playerX.getSign()
                && gameBoard.getFieldArr()[5] === playerX.getSign()
                && gameBoard.getFieldArr()[8] === playerX.getSign())
            || (gameBoard.getFieldArr()[0] === playerX.getSign()
                && gameBoard.getFieldArr()[4] === playerX.getSign()
                && gameBoard.getFieldArr()[8] === playerX.getSign())
            || (gameBoard.getFieldArr()[2] === playerX.getSign()
                && gameBoard.getFieldArr()[4] === playerX.getSign()
                && gameBoard.getFieldArr()[6] === playerX.getSign())) {
            announcer.textContent = `Player ${playerX.getSign()} wins!`;
            field.forEach(square => {
                square.removeEventListener('click', addSign);
            });
        } else if ((gameBoard.getFieldArr()[0] === playerO.getSign()
            && gameBoard.getFieldArr()[1] === playerO.getSign()
            && gameBoard.getFieldArr()[2] === playerO.getSign())
            || (gameBoard.getFieldArr()[3] === playerO.getSign()
                && gameBoard.getFieldArr()[4] === playerO.getSign()
                && gameBoard.getFieldArr()[5] === playerO.getSign())
            || (gameBoard.getFieldArr()[6] === playerO.getSign()
                && gameBoard.getFieldArr()[7] === playerO.getSign()
                && gameBoard.getFieldArr()[8] === playerO.getSign())
            || (gameBoard.getFieldArr()[0] === playerO.getSign()
                && gameBoard.getFieldArr()[3] === playerO.getSign()
                && gameBoard.getFieldArr()[6] === playerO.getSign())
            || (gameBoard.getFieldArr()[1] === playerO.getSign()
                && gameBoard.getFieldArr()[4] === playerO.getSign()
                && gameBoard.getFieldArr()[7] === playerO.getSign())
            || (gameBoard.getFieldArr()[2] === playerO.getSign()
                && gameBoard.getFieldArr()[5] === playerO.getSign()
                && gameBoard.getFieldArr()[8] === playerO.getSign())
            || (gameBoard.getFieldArr()[0] === playerO.getSign()
                && gameBoard.getFieldArr()[4] === playerO.getSign()
                && gameBoard.getFieldArr()[8] === playerO.getSign())
            || (gameBoard.getFieldArr()[2] === playerO.getSign()
                && gameBoard.getFieldArr()[4] === playerO.getSign()
                && gameBoard.getFieldArr()[6] === playerO.getSign())) {
            announcer.textContent = `Player ${playerO.getSign()} wins!`;
            field.forEach(square => {
                square.removeEventListener('click', addSign);
            });
        } else if (turnCounter === 10) {
            announcer.textContent = 'Draw!';
        }
    }
    // RESTART BUTTON
    const restartButton = document.querySelector('#restart');
    restartButton.addEventListener('click', () => {
        gameBoard.resetGameBoard();
        gameFlow.resetGameFlow();
        field.forEach(square => {
            square.addEventListener('click', addSign);
        });
    });
    return { resetGameFlow };
})();