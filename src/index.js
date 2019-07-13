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
        this.state = {
            "squares": Array(9).fill(null),
            "currentPlayer": this.players.one,
            "isWinnerDecided": false,
            "winner": null,
            "isGameEnded": false
        }
    }

    squareClick(box_index) {
        const squares = this.state.squares
        let winner = null
        if (!this.state.isWinnerDecided) {
            if (squares[box_index] === null) {
                squares[box_index] = this.state.currentPlayer.value
                this.setState({ squares: squares })
                this.switchPlayer()
            } else {
                console.log("square already filled for index:" + box_index)
            }
            if (this.isAllSquaresFilled()) {
                this.setState({ "isGameEnded": true })
            }
            if (this.isWinnerDecided()) {
                winner = this.getWinner(this.state.squares)
                this.setState({ "isWinnerDecided": true, "winner": winner.name })
            }
        }
    }

    switchPlayer() {
        let currentPlayer = this.state.currentPlayer
        if (currentPlayer.value === "X") {
            currentPlayer = this.players.two
        } else {
            currentPlayer = this.players.one
        }
        this.setState({ currentPlayer: currentPlayer })
    }

    isAllSquaresFilled() {
        let allSquaresFilled = false
        if (!this.state.squares.includes(null)) {
            allSquaresFilled = true
        }
        return allSquaresFilled
    }

    isWinnerDecided() {
        let winnerPlayer = this.getWinner(this.state.squares)
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

    resetGame() {
        this.setState({
            squares: Array(9).fill(null),
            currentPlayer: this.players.one,
            isWinnerDecided: false,
            winner: null,
            isGameEnded: false
        })
    }

    renderSquare(i) {
        return (
            <Square
                box_value={this.state.squares[i]}
                squareClick={() => this.squareClick(i)} />
        )
    }

    render() {
        let status = "Current player: " + this.state.currentPlayer.name;
        let gameResult = "";

        if (this.state.isGameEnded || this.state.isWinnerDecided) {
            if (this.state.isGameEnded) {
                gameResult = "Match ends in draw.";
            }
            if (this.state.isWinnerDecided && this.state.winner) {
                gameResult = "Winner: " + this.state.winner;
            }
            status = ""
        }


        return (
            <div>
                <div className="status">{status}</div>
                <div className="">{gameResult}</div>
                <button onClick={() => this.resetGame()}>Reset Game</button>
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
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
                <div className="author-info">
                    <Author />
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
