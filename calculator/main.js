const displayZone = document.getElementById('result-display');
let operator = "";
let temporary = "";
let temporaryNumber = 0;
let result = 0;
let reset = false;


//数字を表示・計算する関数
function calculate(num) {

  //数字を入力する直前に＝を押していた場合、ACを押した時と同様の処理を行う
  if (reset) {
    allClear()
  }

  function displayNumber() {
    displayZone.textContent += inputNum;
    temporary += inputNum;
    temporaryNumber = Number(temporary);
  }

  let inputNum = document.getElementById(num).value;
  
  if ((inputNum == 0 || inputNum == ".") && (displayZone.textContent == "")) {
    ; //0や.のみで表示されないように制御
  
  } else if (operator == "") {  // 演算子が入力されていない状態
    displayZone.textContent += inputNum;
    temporary = displayZone.textContent;
    temporaryNumber = Number(temporary);
    result = temporaryNumber;
    debug();

  } else if (operator != "") {  // 演算子が入力されている状態

    if (operator == "+") {
      result -= temporaryNumber; //続けて数字が入力された場合、前の処理を取り消し
      displayNumber();
      result += temporaryNumber;
      debug();

    } else if (operator == "-") {
      result += temporaryNumber;
      displayNumber();
      result -= temporaryNumber;
      debug();

    } else if (operator == "*") {
      if (temporaryNumber != 0) { //0では割らないようにする
        result /= temporaryNumber;
      }
      displayNumber();
      result *= temporaryNumber;

    } else if (operator == "/") {
      if (temporaryNumber != 0) { //0は掛けないようにする
        result *= temporaryNumber;
      }
      displayNumber();
      result /= temporaryNumber;
    } 
  }
}

//演算子を表示する関数
function displayOperator(mark) {
  let inputOperator = document.getElementById(mark).value;

  if (temporaryNumber == 0) { //演算子が連続で入力されないための制御
    if (inputOperator == "-") { //"-"の場合のみ負の符号として表示させる
      displayZone.textContent += inputOperator;
    }
  } else {
    displayZone.textContent += inputOperator;
    operator = inputOperator;
    temporary = "";
    temporaryNumber = 0;
    reset = false;
  }
  debug();
}

//結果をクリアする関数
function allClear() {
  displayZone.textContent = "";
  operator = "";
  temporary = "";
  temporaryNumber = 0;
  result = 0;
  reset = false;
  debug();
}

//計算結果を表示する関数
function equal() {
  if (temporaryNumber != 0) {
    displayZone.textContent = result;
    operator = "";
    temporary = "";
    reset = true; //直後に数字が押された場合にACするためのフラグ
  }
  debug();
}

//デバッグ用
function debug() {
  console.log("operator" + operator);
  console.log("temporary" + temporary);
  console.log("temporaryNumber" + temporaryNumber);
  console.log("result" + result);
}
