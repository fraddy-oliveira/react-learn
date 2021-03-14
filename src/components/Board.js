import React from 'react';

import Square from './Square.js';
import {range} from '../lib/utilities.js';

class Board extends React.Component {
  /**
   * Render square
   * @param {number} boxIndex Index of Box.
   */
  renderSquare(boxIndex) {
    return (
      <Square
        key={boxIndex}
        box_value={this.props.squares[boxIndex]}
        squareClick={() => this.props.onSquareClick(boxIndex)}
      />
    );
  }

  renderBoard(rows = 3, cols = 3) {
    let rowsArray = range(1, rows, 1);
    let colsArray = range(1, cols, 1);

    return (
      <div>
        {rowsArray.map((row) => {
          return (
            <div className="board-row" key={row}>
              {colsArray.map((col) => {
                return this.renderSquare(col - 1 + (row - 1) * 3);
              })}
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
