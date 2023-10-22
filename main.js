/*global $*/

$(document).ready(function(){

  let decisec = 0;
  let sec = 0;
  let min = 0;
  
  function countDecisec() {
    
    if (decisec < 9) {
      decisec ++;
      $('#decisecond').text(decisec);
    } else if(decisec == 9) {
      decisec = 0;
      $('#decisecond').text(decisec);
      
      if (sec < 59) {
        sec ++;
        $('#second').text(sec);
      } else if(sec == 59) {
        sec = 0;
        $('#second').text(sec);
        
        if (min < 59) {
          min ++;
          $('#minute').text(min);
        } else if(min == 59) {
          min = 0;
          $('#minute').text(min);
        }
      }
    }
  }

// スタートボタンを押した時→カウントスタート
  $('#start').click(function() {
    
    let startDecisec = setInterval(countDecisec,100);
    // let startSec = setInterval(countSec,1000);
    
  // ボタンの活性状態の切り替え  
    if(document.getElementById('stop').disabled === true) {
      document.getElementById('stop').disabled = false;
    }
    
    if(document.getElementById('reset').disabled === true) {
      document.getElementById('reset').disabled = false;
    }
    
    $('#start').prop('disabled', true);
    
  // ストップボタンが押された時→カウントストップ
    $('#stop').click(function() {
      
      clearInterval(startDecisec);
    
    // 再度、ボタンの活性状態の切り替え  
      if(document.getElementById('start').disabled === true) {
        document.getElementById('start').disabled = false;
    }

      $('#stop').prop('disabled', true);

    });
    
  // リセットボタンが押された時→カウントストップ＆全ての数値を0に
    $('#reset').click(function() {
      
      clearInterval(startDecisec);
      
      if(document.getElementById('start').disabled === true) {
        document.getElementById('start').disabled = false;
    }

      $('#stop').prop('disabled', true);
      $('#reset').prop('disabled', true);

      decisec = 0;
      sec = 0;
      min = 0;
      $('#decisecond').text(decisec);
      $('#second').text(sec);
      $('#minute').text(min);
    });
  });
  
  
});