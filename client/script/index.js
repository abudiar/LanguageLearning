let lastType = performance.now();
let lastVal = '';
let curVal = '';
const loadingUpdates = [0, 0];
let audio;

$(document).ready(function () {
  setInterval(updateTranslation, 500)

  if (localStorage.getItem('language'))
    $('#languageName').html(localStorage.getItem('language'));

  $('#translateText').on('input', function () {
    updateTranslation()
    lastType = performance.now();
    auto_grow($(this))
  })

  $(window).click(function () {
    $('#pageSettings').css('cursor', 'pointer');
    $('#pageSettings').addClass('close');
  });

  $('#pageSettings').click(function (e) {
    e.stopPropagation();
    $('#pageSettings').css('cursor', 'default');
    $('#pageSettings').removeClass('close');
  })

  $('#pageSettings').click(function (e) {
    e.stopPropagation();
  })

  // $('#voice').submit(function (e) {
  //   e.preventDefault();
  //   const data = {
  //     text: $('#text').val(),
  //     voice: $('#lang').val()
  //   }
  //   let request = new XMLHttpRequest();
  //   request.open("GET", "http://localhost:3000/voices?voice=ja-JP_EmiV3Voice&text=" + $('#translatedText').html(), true);
  //   request.onload = function () {
  //     if (this.status == 200) {
  //       play(this.response)
  //     }
  //   }
  //   request.send();
  // })
  attachPlay()

  $('.form-login').submit(function (e) {
    e.preventDefault();
    e.stopPropagation();
    const data = {
      email: $('#loginEmail').val(),
      password: $('#loginPassword').val()
    }
    // User.login(data);
    login(data);
  })

  /*Dropdown Menu*/
  $('.dropdown').click(function (e) {
    $(this).attr('tabindex', 1).focus();
    $(this).toggleClass('active');
    $(this).find('.dropdown-menu').slideToggle(300);
  });
  $('.dropdown').focusout(function (e) {
    $(this).removeClass('active');
    $(this).find('.dropdown-menu').slideUp(300);
  });
  insertData($('#langIdMenu'), langSpeakers, langNames, 'langId');
  insertData($('#originLangMenu'), langCodes, langCodes, 'originLang');
  /*End Dropdown Menu*/

})

function auto_grow(el) {
  console.log(el.prop('scrollHeight'))
  el.css('height', '5px');
  el.css('height', (el.prop('scrollHeight')) + "px");
}

function insertData(el, arrayId, arrayName = {}, localStorageItem) {
  el.parents('.dropdown').find('span').text(localStorage.getItem(localStorageItem));

  el.html('');

  for (let key in arrayId)
    el.append(`<li id="${key}">${arrayName[key] ? arrayName[key] : key}</li>`);


  el.find('li').click(function (e) {
    $(this).parents('.dropdown').find('span').text($(this).text());
    $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
    if (el.attr('id') == 'langIdMenu') {
      $('#speakerMenu').parents('.dropdown').find('span').text('Select Speaker');
      $('#speakerMenu').parents('.dropdown').find('input').attr('value', '');
      const arrayId = langSpeakers[$(this).attr('id')];
      insertData($('#speakerMenu'), arrayId, arrayId, 'speaker');
    }
  });
}

function attachPlay() {
  if ($('#play').length) {
    $('#play').click(function (e) {
      e.preventDefault();
      loadingAudio();
      const data = {
        text: $('#text').val(),
        voice: $('#lang').val()
      }
      let request = new XMLHttpRequest();
      request.open("GET", "http://localhost:3000/voices?voice=ja-JP_EmiV3Voice&text=" + $('#translatedText').html(), true);
      request.onload = function () {
        if (this.status == 200) {
          play(this.response)
        }
      }
      request.send();
      // playAudio();
    });
  }
}

function loadingAudio() {
  if ($('#play').length) {
    $('#play').replaceWith(`
    <button id="loading" class="simple-button btn btn-lg text-uppercase full btn-icon  p-3 inner-shadow">
        Pause
    </button>`);
    $('#loading').html('Loading...');
    $('#loading').attr("disabled", true);
    $('#loading').css("cursor", "default");
  }
}

function playAudio() {
  if ($('#loading').length) {
    audio.play();
    $('#loading').replaceWith(`
    <button id="pause" class="simple-button btn btn-lg text-uppercase full btn-icon  p-3 inner-shadow">
        Pause
    </button>`);
    attachPause();
  }
}

function attachPause() {
  if ($('#pause').length) {
    $('#pause').click(function (e) {
      e.preventDefault();
      pauseAudio();
    });
  }
}
function pauseAudio() {
  if ($('#pause').length) {
    audio.pause();
    $('#pause').replaceWith(`
    <button id="play" class="simple-button btn btn-lg text-uppercase full btn-icon  p-3 inner-shadow">
        Play
    </button>`);
    attachPlay();
  }
}

function unloadAudio() {
  if ($('#loading').length) {
    $('#loading').replaceWith(`
    <button id="play" class="simple-button btn btn-lg text-uppercase full btn-icon  p-3 inner-shadow">
        Play
    </button>`);
    attachPlay();
  }
}

function updateTranslation() {
  curVal = $('#translateText').val();
  const curValArr = curVal.split(' ');
  if ((lastType + 500 < performance.now() ||
    curValArr[curValArr.length - 1] == '') && lastVal != curVal) {
    translate({ text: curVal }, (resp) => {
      if (resp.translated.text.includes('NO QUERY SPECIFIED.'))
        $('#translatedText').html('Start typing to learn');
      else if (resp.translated.text.includes('QUERY LIMIT EXCEEDED.'))
        $('#translatedText').html('Maximum of 500 chars!');
      else
        $('#translatedText').html(resp.translated.text);
    })
    lastVal = curVal;
  }
  if (curVal != lastVal) {
    loadingUpdates[0]++;
    loadingAudio();
  }
  else if (loadingUpdates[0] > 0) {
    loadingUpdates[0] = 0;
    unloadAudio();
  }
}

function translate(data, cb) {
  console.log(data)
  $.ajax({
    method: 'GET',
    url: `http://localhost:3000/translate`,
    // headers: {
    //     accessToken: localStorage.getItem('accessToken')
    // },
    data
  })
    .done(function (response) {
      cb(response);
    })
    .fail(function (response) {
      console.log(response);
    })
}

function play(filePath) {
  var request2 = new XMLHttpRequest();
  request2.open("GET", 'http://localhost:3000/audio/' + filePath, true);
  request2.responseType = "blob";
  request2.onload = function () {
    if (this.status == 200) {
      audio = new Audio(URL.createObjectURL(this.response));
      audio.onended = pauseAudio;
      audio.load();
      playAudio();
    }
  }
  request2.send();
}