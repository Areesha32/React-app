import React, { Component } from "react";
import Square from "./square";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      boolean: Array(9).fill(true)
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    const boolean = this.state.boolean.slice();

    if (this.calculateWinner(squares)) {
      return;
    }

    if (this.state.boolean[i]) {
      squares[i] = this.state.xIsNext ? "X" : "O";
      boolean[i] = false;

      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
        boolean: boolean
      });
    }
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  createRow(j) {
    let row = [];
    for (let i = 0; i < 3; i++) {
      row.push(this.renderSquare(j));
      j++;
    }
    return row;
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  render() {
    const winner = this.calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">{this.createRow(0)}</div>
        <div className="board-row">{this.createRow(3)}</div>
        <div className="board-row">{this.createRow(6)}</div>
      </div>
    );
  }
}

export default Board;
