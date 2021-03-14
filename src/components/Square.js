import React, {Component} from 'react';

class Square extends Component {
  render() {
    return (
      <button className="square" onClick={this.props.squareClick}>
        {this.props.box_value}
      </button>
    );
  }
}

export default Square;
