const main = document.querySelector("#main");

const grille = [
  [3, 2, 0, 1, 7, 0, 6, 5, 4],
  [6, 1, 5, 2, 9, 4, 7, 0, 0],
  [0, 7, 8, 3, 0, 6, 2, 9, 1],
  [0, 5, 7, 4, 0, 2, 8, 1, 6],
  [1, 8, 0, 7, 6, 5, 9, 0, 2],
  [2, 3, 6, 0, 1, 0, 5, 4, 0],
  [7, 4, 2, 0, 8, 1, 3, 0, 9],
  [8, 0, 3, 6, 0, 7, 1, 2, 5],
  [5, 6, 0, 9, 2, 3, 4, 0, 8],
];

function createGrid() {
  grille.forEach((row, i) => {
    row.forEach((cell, j) => {
      let cellInput = initialiseCell(i, j, cell);
      main.appendChild(cellInput);
    });
    main.appendChild(document.createElement("br"));
  });
}

function initialiseCell(i, j, cell) {
  let cellInput = document.createElement("input");
  cellInput.type = "number";
  cellInput.id = `c${i}/${j}`;
  cellInput.min = 1;
  cellInput.max = 9;
  cellInput.onchange = function () {
    if (this.value < 1 || this.value > 9) this.value = "";
    onChangeCell(this);
  };
  if (cell != 0) {
    cellInput.value = cell;
    cellInput.disabled = true;
  }
  return cellInput;
}

function onChangeCell(e) {
  if (e.value == 0) e.value = "";
  checkCell(e.id[1], e.id[3], e.value)
    ? (e.style.color = "green")
    : (e.style.color = "red");
  setCellValue(e.id[1], e.id[3], e.value);
}

function checkCell(row, column, value) {
  let error = true;
  !checkColumn(column, value, grille) ||
  !checkRow(row, value, grille) ||
  !checkSquare(row, column, value)
    ? (error = false)
    : (error = true);
  return error;
}

function checkColumn(column, value, grid) {
  let columnResult = true;
  grid.forEach((row) => {
    if (row[column] == value) {
      columnResult = false;
    }
  });
  return columnResult;
}

function checkRow(row, value, grid) {
  let rowResult = true;
  grid[row].forEach((cell) => {
    if (value == cell) {
      rowResult = false;
    }
  });
  return rowResult;
}

function checkSquare(row, column, value) {
  let squareResult = true;
  let square = getSquares(row, column);
  square.forEach((cell) => {
    if (value == cell) {
      squareResult = false;
    }
  });
  return squareResult;
}

function getSquares(row, column) {
  const square = [];
  const rowSquare = Math.floor(row / 3) * 3;
  const columnSquare = Math.floor(column / 3) * 3;
  for (let i = rowSquare; i < rowSquare + 3; i++) {
    for (let j = columnSquare; j < columnSquare + 3; j++)
      square.push(grille[i][j]);
  }
  return square;
}

function setCellValue(x, y, value) {
  grille[x][y] = parseInt(value);
}

createGrid();
