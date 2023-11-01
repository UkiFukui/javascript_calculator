const displayZone = document.getElementById('result-display');
let operator = "";
let temporary = "";
let temporaryNumber = 0;
let result = 0;
let equalOn = false;  //"="の入力状態を管理
let pointed = false;  //"."の入力状態を管理


//数字を表示・計算する関数
function calculate(num) {
  let inputNum = document.getElementById(num).value;

  function displayNumber() {
    displayZone.textContent += inputNum;
    temporary += inputNum;
    temporaryNumber = Number(temporary);
  }

    //数字を入力する直前に＝を押していた場合、ACを押した時と同様の処理を行う
    if (equalOn) {
      allClear()
    }
  
  if ((inputNum == 0) && (temporary == "")) {
    ; //0,00のみで表示されないように制御

  } else if (inputNum == ".") { //"."に対する入力制御
    if (temporary == "") {
      displayZone.textContent += "0.";  //他の数字が入力される前に"."→0.に変換して表示
      temporary += "0.";
      pointed = true;
    } else if(temporary != "") {  //既に"."が入力されている場合は重ねて入力されないようにする
      if (!pointed) {
        displayZone.textContent += ".";
        temporary += ".";
        pointed = true; //"."が一時保管されている数値の中に含まれている事を示すフラグ
      }
    }

  } else if (operator == "") {  // 演算子が入力されていない状態
    displayZone.textContent += inputNum;
    temporary = displayZone.textContent;
    temporaryNumber = Number(temporary);
    result = temporaryNumber;

  } else if (operator != "") {  // 演算子が入力されている状態

    if (operator == "+") {
      result = BigNumber(result).minus(BigNumber(temporaryNumber)); //続けて数字が入力された場合、前の処理を取り消し
      displayNumber();
      result = BigNumber(result).plus(BigNumber(temporaryNumber));

    } else if (operator == "-") {
      result = BigNumber(result).plus(BigNumber(temporaryNumber));
      displayNumber();
      result = BigNumber(result).minus(BigNumber(temporaryNumber));

    } else if (operator == "*") {
      if (temporaryNumber != 0) { //0では割らないようにする
        result = BigNumber(result).div(BigNumber(temporaryNumber));
      }
      displayNumber();
      result = BigNumber(result).times(BigNumber(temporaryNumber));

    } else if (operator == "/") {
      if (temporaryNumber != 0) { //0は掛けないようにする
        result = BigNumber(result).times(BigNumber(temporaryNumber));
      }
      displayNumber();
      result = BigNumber(result).div(BigNumber(temporaryNumber));
    } 
  }
}

//演算子を表示する関数
function displayOperator(mark) {
  let inputOperator = document.getElementById(mark).value;

  if (displayZone.textContent == "") { //演算子が連続で入力されないための制御
    if (inputOperator == "-") { //"-"の場合のみ負の符号として表示させる
      displayZone.textContent += inputOperator;
    }
  } else if(temporaryNumber != 0) {  //数字が保管されている状態＝直前の入力が演算子でない場合
    displayZone.textContent += inputOperator;
    operator = inputOperator;
    temporary = "";
    temporaryNumber = 0;
    equalOn = false;
    pointed = false;
  }
}

//結果をクリアする関数
function allClear() {
  displayZone.textContent = "";
  operator = "";
  temporary = "";
  temporaryNumber = 0;
  result = 0;
  equalOn = false;
  pointed = false;
}

//計算結果を表示する関数
function equal() {
  if (temporaryNumber != 0) {
    displayZone.textContent = BigNumber(result);
    operator = "";
    temporary = "";
    equalOn = true; //直後に数字が押された場合にACするためのフラグ
  }
}