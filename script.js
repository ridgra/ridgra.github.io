//DFS algorithm
function checkRet(arr, x, y, target) {
  // return x >= 1 && x < arr.length && y >= 1 && y < col && arr[x][y] == target;
  return (
    x >= 0 &&
    x < arr.length &&
    y >= 0 &&
    y < arr[0].length &&
    arr[x][y] == target
  );
}

function dfs(arr, x, y, newChar) {
  let r = [-1, -1, -1, 0, 0, 1, 1, 1];
  let c = [-1, 0, 1, -1, 1, -1, 0, 1];
  let target = arr[x][y];
  arr[x][y] = newChar;

  for (let i = 0; i < r.length; i++) {
    if (checkRet(arr, x + r[i], y + c[i], target))
      dfs(arr, x + r[i], y + c[i], newChar);
  }

  return arr;
}
// -------

function setBombs(row, col, bomb) {
  let bombsSet = [];
  let count = 0;

  let bombRange = [];
  while (bombRange.length < bomb) {
    var rand = Math.floor(Math.random() * (row * col));
    if (bombRange.indexOf(rand) == -1) bombRange.push(rand);
  }

  for (let i = 0; i < row; i++) {
    let bombsRow = [];
    for (let j = 0; j < col; j++) {
      bombsRow.push(' ');
      for (let k = 0; k < bombRange.length; k++) {
        if (count == bombRange[k]) {
          bombsRow[j] = 'o';
        }
      }
      count++;
    }
    bombsSet.push(bombsRow);
  }

  return bombsSet;
}

function setNumbers(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] == 'o') {
        bombsPos.push([i, j]);
      }

      let count = 0;
      //top row
      if (arr[i][j] != 'o' && i == 0) {
        for (let k = -1; k < 2; k++) {
          //mid
          if (arr[i][j - k] == 'o' && k !== 0) {
            count++;
          }
          //bot
          if (arr[i + 1][j - k] == 'o') {
            count++;
          }
        }

        if (count > 0) {
          // arr[i][j] = count.toString();
          arr[i][j] = count;
        } else {
          arr[i][j] = ' ';
        }
      }

      //second and last second row
      if (arr[i][j] != 'o' && i != 0 && i != arr.length - 1) {
        for (let k = -1; k < 2; k++) {
          //top
          if (arr[i - 1][j - k] == 'o') {
            count++;
          }
          //mid
          if (arr[i][j - k] == 'o' && k !== 0) {
            count++;
          }
          //bot
          if (arr[i + 1][j - k] == 'o') {
            count++;
          }
        }
        if (count > 0) {
          // arr[i][j] = count.toString();
          arr[i][j] = count;
        } else {
          arr[i][j] = ' ';
        }
      }

      //bot row
      if (arr[i][j] != 'o' && i == arr.length - 1) {
        for (let k = -1; k < 2; k++) {
          //top
          if (arr[i - 1][j - k] == 'o') {
            count++;
          }
          //mid
          if (arr[i][j - k] == 'o' && k !== 0) {
            count++;
          }
        }
        if (count > 0) {
          // arr[i][j] = count.toString();
          arr[i][j] = count;
        } else {
          arr[i][j] = ' ';
        }
      }
    }
  }

  return arr;
}
function setReveal(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] == 'x') {
        res.push([i, j]);
      }
      //top row
      if (arr[i][j] != 'x' && i == 0) {
        for (let k = -1; k < 2; k++) {
          //mid
          if (arr[i][j - k] == 'x' && k !== 0) {
            res.push([i, j]);
          }
          //bot
          if (arr[i + 1][j - k] == 'x') {
            res.push([i, j]);
          }
        }
      }

      //second and last second row
      if (arr[i][j] != 'x' && i != 0 && i != arr.length - 1) {
        for (let k = -1; k < 2; k++) {
          //top
          if (arr[i - 1][j - k] == 'x') {
            res.push([i, j]);
          }
          //mid
          if (arr[i][j - k] == 'x' && k !== 0) {
            res.push([i, j]);
          }
          //bot
          if (arr[i + 1][j - k] == 'x') {
            res.push([i, j]);
          }
        }
      }

      //bot row
      if (arr[i][j] != 'x' && i == arr.length - 1) {
        for (let k = -1; k < 2; k++) {
          //top
          if (arr[i - 1][j - k] == 'x') {
            res.push([i, j]);
          }
          //mid
          if (arr[i][j - k] == 'x' && k !== 0) {
            res.push([i, j]);
          }
        }
      }
    }
  }

  return res;
}

function findEmptySquare(arr, i, j) {
  return dfs(arr, i, j, 'x');
}

//-------
// DOM

function initGame(row, col, bomb) {
  let grid = document.getElementById('grid');
  let cell;
  let res = setNumbers(setBombs(row, col, bomb));

  // let vScore = document.getElementById('score');
  // vScore.innerHTML = bomb;

  for (let i = 0; i < row; i++) {
    let vRow = document.createElement('div');
    vRow.setAttribute('class', 'box row');
    grid.appendChild(vRow);
    for (let j = 0; j < col; j++) {
      cell = document.createElement('div');
      cell.setAttribute('id', `r${i}c${j}`);
      cell.setAttribute('class', `box row col`);
      vRow.appendChild(cell);
    }
  }
  return res;
}

function revealEmpty(i, j, arr) {
  let cell = document.getElementById(`r${i}c${j}`);
  cell.style.backgroundColor = 'steelblue';
  if (arr[i][j] == 'x') {
    arr[i][j] = '';
  }
  cell.innerHTML = arr[i][j];
}

function revealNumbers(i, j, arr) {
  let cell = document.getElementById(`r${i}c${j}`);
  cell.style.backgroundColor = 'steelblue';
  cell.innerHTML = arr[i][j];
}

function endGame(arr) {
  for (let i = 0; i < bombsPos.length; i++) {
    let cell = document.getElementById(`r${bombsPos[i][0]}c${bombsPos[i][1]}`);
    cell.style.backgroundColor = 'palegoldenrod';
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      let cell = document.getElementById(`r${i}c${j}`);
      if (arr[i][j] == 'o') {
        // cell.innerHTML = arr[i][j];
        cell.innerHTML = '💔';
      }
    }
  }
}

function dialog() {
  alert('Game over');
}

function main() {
  let row = 9;
  let col = 9;
  let bomb = 10;
  let board = initGame(row, col, bomb);

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      document.getElementById(`r${i}c${j}`).addEventListener('click', () => {
        if (board[i][j] == ' ') {
          let sr = setReveal(findEmptySquare(board, i, j));
          for (let k = 0; k < sr.length; k++) {
            revealEmpty(sr[k][0], sr[k][1], board);
          }
        }
        if (typeof board[i][j] === 'number') {
          revealNumbers(i, j, board);
        }
        if (board[i][j] == 'o') {
          endGame(board);
          dialog();
          return;
        }
      });
      document
        .getElementById(`r${i}c${j}`)
        .addEventListener('contextmenu', () => {
          if (document.getElementById(`r${i}c${j}`).innerHTML == '🏳') {
            document.getElementById(`r${i}c${j}`).innerHTML = '';
          } else document.getElementById(`r${i}c${j}`).innerHTML = '🏳';
        });
    }
  }
}
let bombsPos = [];
main();
