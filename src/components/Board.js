import React from 'react';

import Square from './Square.js';

const range = (start, stop, step) =>
  Array.from({length: (stop - start) / step + 1}, (_, i) => start + i * step);

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        box_value={this.props.squares[i]}
        squareClick={() => this.props.onSquareClick(i)}
      />
    );
  }

  renderBoard(rows = 3, cols = 3) {
    let rowsArray = range(1, rows, 1);
    let colsArray = range(1, cols, 1);

    return (
      <div>
        {colsArray.map((col) => {
          return (
            <div className="board-row" key={col}>
              {rowsArray.map((row) => this.renderSquare(row - 1))}
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return this.renderBoard(3, 3);
  }
}

export default Board;
