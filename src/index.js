import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Square extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <button className="square" onClick={this.props.squareClick}>
                {this.props.box_value}
            </button>
        );
    }
}

class Board extends React.Component {

    constructor(props) {
        super(props)
    }

    renderSquare(i) {
        return (
            <Square
                box_value={this.props.squares[i]}
                squareClick={() => this.props.onSquareClick(i)} />
        )
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Author extends React.Component {
    constructor(props) {
        super(props)
        this.name = "Fraddy"
    }
    render() {
        this.name = "Fraddy Oliveira"
        return (
            <div>
                Name:{this.name}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.players = { "one": { "name": "Player X", "value": "X" }, "two": { "name": "Player O", "value": "O" } }
        this.winnerCoordinates = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        this.app_initial_state = {
            "history": [{ squares: Array(9).fill(null) }],
            "currentPlayer": this.players.one,
            "stepPointer": 0
        }

        this.state = this.app_initial_state
    }

    resetGame() {
        this.setState(this.app_initial_state)
    }

    squareClick(box_index) {
        let history = this.state.history.slice(0, this.state.stepPointer + 1)

        let current_step = history[history.length - 1]

        const squares = current_step.squares.slice()

        if (Array.isArray(squares) && (this.isWinnerDecided(squares) || squares[box_index])) {
            return;
        }
        if (squares[box_index] === null) {
            squares[box_index] = this.state.currentPlayer.value
            this.setState({ history: history.concat([{ squares: squares }]), stepPointer: history.length })
            this.switchPlayer()
        } else {
            console.log("square already filled for index:" + box_index)
        }
    }

    switchPlayer() {
        let currentPlayer = Object.assign({}, this.state.currentPlayer)
        if (currentPlayer.value === "X") {
            currentPlayer = this.players.two
        } else {
            currentPlayer = this.players.one
        }
        this.setState({ currentPlayer: currentPlayer })
    }

    isAllSquaresFilled(square) {
        let allSquaresFilled = false
        if (Array.isArray(square) && !square.includes(null)) {
            allSquaresFilled = true
        }
        return allSquaresFilled
    }

    isWinnerDecided(square) {
        let winnerPlayer = null
        winnerPlayer = Array.isArray(square) ? this.getWinner(square) : null
        return winnerPlayer != null ? true : false
    }

    getWinner(squares) {
        let winnerPlayer = null
        const coordinates = this.winnerCoordinates
        for (let i in coordinates) {
            const [a, b, c] = coordinates[i]
            if (squares && Array.isArray(squares) && squares[a] && squares[a] != null && squares[a] === squares[b] && squares[a] === squares[c]) {
                if (this.players.one.value === squares[a]) {
                    winnerPlayer = this.players.one
                } else if (this.players.two.value === squares[a]) {
                    winnerPlayer = this.players.two
                }
            }
        }
        return winnerPlayer
    }

    jumpTo(index) {
        let jumpGamePlayerValue = 'O'

        if (index % 2 === 0) {
            jumpGamePlayerValue = 'X'
        }
        if (this.state.currentPlayer.value != jumpGamePlayerValue) {
            this.switchPlayer()
        }
        this.setState({ stepPointer: index })
    }

    render() {
        let moves_html = ""
        let winner = {}

        let status = "Next player: " + this.state.currentPlayer.name;


        let history = this.state.history[this.state.stepPointer]
        let square = history.squares.slice()

        if (this.isAllSquaresFilled(square)) {
            status = "Match ends in draw.";
        }

        if (this.isWinnerDecided(square)) {
            winner = this.getWinner(square)
            status = "Winner: " + winner.name;
        }

        moves_html = this.state.history.map((square, index) => {
            let desc = (index ? "Go to step " + (index) : "Go to start");
            return (
                <li key={index}>
                    <button onClick={() => this.jumpTo(index)} >{desc}</button>
                </li>
            );
        })

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={square} onSquareClick={(i) => this.squareClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button onClick={() => this.resetGame()} className="hide">Reset Game</button>
                    <div className="time-travel">
                        <ol>{moves_html}</ol>
                    </div>
                </div>
                <div className="author-info">

                </div>

            </div>
        );
    }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
