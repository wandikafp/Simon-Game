var simon = {
  start: false,
  sequence: [],
  clicked: [],
  step: 0,
  index: 0,
  lock: false,
  strict: false,
  init: function(){
    simon.sequence = [];
    simon.clicked= [];
    simon.step= 0;
    simon.lock= false;
    simon.index=0;
  },
  gameStart: function(){
    console.log("mulai");
    $('.count').text(simon.step);
    simon.init();
    simon.addSequence();
  },
  addSequence: function(){
    var num = Math.floor(Math.random()*4);
    simon.lock = true;
    simon.step++;
    simon.sequence.push(num);
    console.log(simon.sequence);
    simon.playSqc();
  },
  playSqc: function(){
    var i=0;
    var interval;
    if(simon.sequence.length < 4){
      interval = 1250;
    }else if(simon.sequence.length < 8){
      interval = 1000;
    }else if(simon.sequence.length < 12){
      interval = 750;
    }else{
      interval = 500;
    }
    $('.count').text(simon.step);
    var x = setInterval(function(){
      if(simon.sequence[i]== 0){
        $('#0').addClass('white');
        $('#audio0')[0].play();
          setTimeout(function () {

            $('#0').removeClass('white');

          }, interval/2);
      }else if(simon.sequence[i]== 1){
        $('#1').addClass('white');
        $('#audio1')[0].play();
          setTimeout(function () {

            $('#1').removeClass('white');

      }, interval/2);
      }else if(simon.sequence[i]== 2){
        $('#2').addClass('white');
        $('#audio2')[0].play();
          setTimeout(function () {

            $('#2').removeClass('white');

          }, interval/2);
      }else if(simon.sequence[i]== 3){
        $('#3').addClass('white');
        $('#audio3')[0].play();
          setTimeout(function () {

            $('#3').removeClass('white');

          }, interval/2);
      }
      i++;
      if(i>= simon.sequence.length){
        clearInterval(x);
        simon.lock = false;
      } 
    }, interval);
  },
  check: function(input){
    console.log(input);
    console.log(simon.index);
    if(input == simon.sequence[simon.index] && simon.index < simon.sequence.length){
      simon.index++;
      console.log(simon.index);
      if(simon.index==20){
        alert("You Win");
        simon.gameStart();
      }else if(simon.index==simon.sequence.length){
        simon.index = 0;
        simon.addSequence();
      }
    }else{
      if(simon.strict){
        simon.gameStart();
      }else{
        simon.flash('!!', 2);
        simon.index = 0;
        simon.playSqc();
      }      
    }
  },
  flash: function(msg,times){
    $('.count').text(msg);
    var lf = function(){
      $('.count').css('background-color','red');
      var a = setTimeout(function(){
        $('.count').css('background-color','white');
      },250);
    };
    var cnt = 0;
    lf();
    var b = setInterval(function(){
      lf();
      cnt++;
      if(cnt === times)
        clearInterval(b);
    },500)
  },
  reset: function(){
    simon.init();
    simon.start = false;
    $('.count').text('--');
  },
};
$(document).ready(function(){
  $(".slot").click(function(){
    simon.start = simon.start === true ? false : true;
    if(simon.start) {
      $('#pwr').addClass('on');
      $('#pwr').removeClass('off');
      $('.count').text('!!');
    }else{
      $('#pwr').removeClass('on');
      $('#pwr').addClass('off');
      simon.reset();
    } 
  });
  $('#strict').click(function(){
    if(simon.start){
      simon.strict= simon.strict=== false ? true : false;
      if(simon.strict){
        $('#strict').removeClass('yellow')
      }else{
        $('#strict').addClass('yellow');
      }
      console.log(simon.strict);
    }
  });
  $('#start').click(function(){
    if(simon.start) simon.gameStart();
  });
  $('#0').click(function(){
    if(simon.start && !simon.lock){
      $('#0').addClass('white');
      $('#audio0')[0].play();
      setTimeout(function () {
        $('#0').removeClass('white');
      }, 250);
      simon.check(0);
    }
  });
  $('#1').click(function(){
    if(simon.start && !simon.lock){
      $('#1').addClass('white');
      $('#audio1')[0].play();
      setTimeout(function () {
        $('#1').removeClass('white');
      }, 250);
      simon.check(1);
    }
  });
  $('#2').click(function(){
    if(simon.start && !simon.lock){
      $('#2').addClass('white');
      $('#audio2')[0].play();
      setTimeout(function () {
        $('#2').removeClass('white');
      }, 250);
      simon.check(2);
    }
  });
  $('#3').click(function(){
    if(simon.start && !simon.lock){
      $('#3').addClass('white');
      $('#audio3')[0].play();
      setTimeout(function () {
        $('#3').removeClass('white');
      }, 250);
      simon.check(3);
    }
  });
});