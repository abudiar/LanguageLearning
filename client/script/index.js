let lastType = performance.now();
let lastVal = '';
let curVal = '';
const loadingUpdates = [0, 0];
let audio;
let id_token;
let isSignedIn = false;
$(document).ready(function () {
  setInterval(updateTranslation, 500);
  // localStorage.setItem('targetLang', 'ja');

  if (!localStorage.getItem('accessToken'))
    $('#UserPage').show();
  else {
    showListPage();

  }

  if (localStorage.getItem('targetLang'))
    $('#languageName').html(langCodes[localStorage.getItem('targetLang')]);

  if (localStorage.getItem('language'))
    $('#languageName').html(localStorage.getItem('language'));

  $('#translateText').on('input', function () {
    updateTranslation()
    lastType = performance.now();
    auto_grow($(this))
  })

  $('.switch-button-case.left').click(function () {
    switchLeft();
  })

  $('.switch-button-case.right').click(function () {
    switchRight();
  })

  $(window).click(function () {
    $('#pageSettings').addClass('close');
  });

  $('#pageSettings').click(function (e) {
    e.stopPropagation();
    // $('#pageSettings').css('cursor', 'default');
    $('#pageSettings').removeClass('close');
  })

  $('#pageSettingsBtn').click(function (e) {
    e.stopPropagation();
    // $('#pageSettings').css('cursor', 'default');
    $('#pageSettings').removeClass('close');
  })

  $('#pageSettings').click(function (e) {
    e.stopPropagation();
  })

  $('.logout').click(function () {
    logout();
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

  $('#LearningSForm').submit(function (e) {
    e.preventDefault();
    localStorage.setItem('speaker', $('input[name="speaker"]').val())
    localStorage.setItem('langId', $('input[name="langId"]').val())
    localStorage.setItem('originLang', $('input[name="originLang"]').val())
    localStorage.setItem('speakerName', $('input[name="speaker"]').parents('.dropdown').find('span').html())
    localStorage.setItem('langIdName', $('input[name="langId"]').parents('.dropdown').find('span').html())
    localStorage.setItem('originLangName', $('input[name="originLang"]').parents('.dropdown').find('span').html())
    $('#pageSettings').addClass('close');
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
  insertData($('#langIdMenu'), langSpeakers, langNames, 'langId', 'langIdName');
  insertData($('#originLangMenu'), langCodes, langCodes, 'originLang', 'originLangName');
  setNameId($('#speakerMenu'), 'speaker', 'speakerName')
  /*End Dropdown Menu*/

  // login
  $('#login').submit(function (e) {
    e.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();
    ajaxFunction('POST', 'user/login', { email, password })
      .done(user => {
        let { accessToken } = user;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('name', user.name);
        $('#loginBtn').html('Loading...');
        voice(`Welcome, ${user.name}... Enjoy using our site`);
      })
  })

  // register
  $('#register').submit(function (e) {
    e.preventDefault()
    const full_name = $('#name').val();
    const email = $('#emailR').val();
    const password = $('#passwordR').val();
    ajaxFunction('POST', 'user/register', { email, password, full_name })
      .done(user => {
        let { accessToken } = user
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('name', user.name);
        $('#registerBtn').html('Loading...');
        voice(`Welcome, ${user.name}... Enjoy using our site`);
      })
  })
})

function switchLeft() {
  $('.switch-button-case.left').addClass("active-case");
  $('.switch-button-case.right').removeClass("active-case");
  $('.switch-button-case.right').addClass("not-active");
  $('.switch-button-case.left').removeClass("not-active");
  $('.switch-button .active').css("left", "0%");
  $('.switch-button .active').css("backgroundPosition", "0%");
  $('.login').removeClass("hidden");
  $('.login').addClass("visible");
  $('.register').removeClass("visible");
  $('.register').addClass("hidden");
}

function switchRight() {
  $('.switch-button-case.right').addClass("active-case");
  $('.switch-button-case.left').removeClass("active-case");
  $('.switch-button-case.left').addClass("not-active");
  $('.switch-button-case.right').removeClass("not-active");
  $('.switch-button .active').css("left", "50%");
  $('.switch-button .active').css("backgroundPosition", "100%");
  $('.login').removeClass("visible");
  $('.login').addClass("hidden");
  $('.register').removeClass("hidden");
  $('.register').addClass("visible");
}

function logout() {
  // localStorage.removeItem('accessToken');
  // var auth2 = gapi.auth2.getAuthInstance();
  // auth2.signOut().then(function () {
  //   console.log('User signed out.');
  // });
  // showUserPage();
  localStorage.removeItem('accessToken');
  if (id_token)
    logoutGoogle(id_token);
  showUserPage();
}

function logoutGoogle(id_token) {
  let revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' +
    id_token;

  // Perform an asynchronous GET request.
  $.ajax({
    type: 'GET',
    url: revokeUrl,
    async: false,
    contentType: "application/json",
    dataType: 'jsonp',
    success: function (nullResponse) {
      // toastr.success('Successfully signed out of Google');
      // Do something now that user is disconnected
      // The response is always undefined.
    },
    error: function (e) {
      // Handle the error
      // console.log(e);
      // You could point users to manually disconnect if unsuccessful
      // https://plus.google.com/apps
    }
  });
}

function auto_grow(el) {
  console.log(el.prop('scrollHeight'))
  el.css('height', '5px');
  el.css('height', (el.prop('scrollHeight')) + "px");
}

function insertData(el, arrayId, arrayName = {}, localStorageId, localStorageName) {
  // console.log(localStorageId, localStorageName);
  setNameId(el, localStorageId, localStorageName);

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
      insertData($('#speakerMenu'), arrayId, arrayId);
    }
  });
}

function setNameId(el, localStorageId, localStorageName) {
  if (localStorage.getItem(localStorageId))
    el.parents('.dropdown').find('input').attr('value', localStorage.getItem(localStorageId));
  if (localStorage.getItem(localStorageName))
    el.parents('.dropdown').find('span').html(localStorage.getItem(localStorageName));
}

function attachPlay() {
  if ($('#play').length) {
    $('#play').click(function (e) {
      e.preventDefault();
      loadingAudio();
      // const data = {
      //   text: $('#text').val(),
      //   voice: $('#lang').val()
      // }
      // let request = new XMLHttpRequest();
      // request.open("GET", `http://localhost:3000/voices?voice=${localStorage.getItem('speaker')}&text=${$('#translatedText').html()}`, true);
      // request.onload = function () {
      //   if (this.status == 200) {
      //     play(this.response)
      //   }
      // }
      // request.send();
      // playAudio();
      voice();
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
  audio.play();
  if ($('#loading').length) {
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
  audio.pause();
  if ($('#pause').length) {
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
    translate({
      translateFrom: localStorage.getItem('originLang'),
      translateTo: localStorage.getItem('targetLang'),
      text: curVal
    }, (resp) => {
      console.log(resp.translated.text)
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




function showListPage() {
  showUserPage(); // Make sure to clear user page
  $('#TitleUser').html(`Hey ${localStorage.getItem('name')}, `);
  getClasses((data) => {
    $('#SubUser').text(`You've started learning ${data.length} languages!`);
    $('.list-group.subscribed-list').html('');
    $('.list-group.class-list').html('');
    const subscribedList = {
      itemIds: [],
      langIds: []
    };
    console.log(data)
    for (let i in data) {
      console.log(data[i])
      const newItem = `<li class="list-group-item">
                <table class=" trash transition" style="color: white;position:relative; z-index:5;">
                    <tr>
                        <th class="button check idSPLIT${data[i]['id']}SPLIT btn-icon" style="padding:20px 25px;width:100%;text-align:center; z-index:5;">
                            <h5 class="class-title checked"style="margin:0;">${langCodes[data[i]['idLang']]}</h5>
                            <p class="description transition checked" >You've spent ${Math.floor(Math.random() * 100)} minutes today! Good Job!</p>
                        </th>
                    </tr>
                </table>
                <nav class="navbar" style="position:absolute; z-index:0; right:0; height:100%; top:0%; width:130px; background:rgba(0,0,0, 0.1);">
                    <h5 style="margin:0;" class="fa fa-trash button transition btn-icon idSPLIT${data[i]['id']}SPLIT" aria-hidden="true"></h5>
                </nav>
            </li>`
      subscribedList['langIds'].push(data[i]['idLang']);
      subscribedList['itemIds'].push(data[i]['id']);
      $('.list-group.subscribed-list').append(newItem);
    }
    for (let key in langCodes) {
      if (!subscribedList['langIds'].includes(key)) {
        const newItem = `<li class="list-group-item">
                <table class=" trash transition" style="color: white;position:relative; z-index:5;">
                    <tr>
                        <th class="button check btn-icon" style="padding:20px 25px;width:100%;text-align:center; z-index:5;">
                            <h5 class="class-title checked"style="margin:0;">${langCodes[key]}</h5>
                            <p class="description transition checked" ></p>
                        </th>
                    </tr>
                </table>
                <nav class="navbar" style="position:absolute; z-index:0; right:0; height:100%; top:0%; width:130px; background:rgba(0,0,0, 0.1);">
                    <h5 style="margin:0;" class="fa fa-check button transition btn-icon langIdSPLIT${key}">SPLIT" aria-hidden="true"></h5>
                </nav>
            </li>`
        $('.list-group.class-list').append(newItem);
      }
    }
    $('.list-group-item').hover(function (e) {
      $('.trash').removeClass("selected");
      $('.description').removeClass("selected");
      $(this).find('.trash').addClass("selected");
      if ($(this).find('.description').text().length > 0) {
        $(this).find('.description').addClass("selected");
      }
    });
    $('.list-group-item').mouseleave(function (e) {
      $('.trash').removeClass("selected");
      $('.description').removeClass("selected");
    });
    $('.button').click(function (e) {
      e.stopPropagation();
      const id = $(this).attr('class').split('SPLIT')[1];
      if ($(this).attr('class').includes('fa-trash')) {
        deleteClass(id, () => {
          showListPage();
        });
      }
      else if ($(this).attr('class').includes('check')) {
        if (!subscribedList['itemIds'].includes(id)) {
          addClass(id, function (e) {
            showListPage();
          })
        }
      }
    });
  })
  hideAll();
  $('#ListPage').show();
}


function showUserPage() {
  $('#name').val(null);
  $('#emailR').val(null);
  $('#passwordR').val(null);
  $('#password').val(null);
  $('#email').val(null);
  hideAll();
  $('#UserPage').show();
}

function hideAll() {
  $('#ListPage').hide();
  $('#LanguangePage').hide();
  $('#UserPage').hide();
  $('#AlreadySocialsPage').hide();
}

function getClasses(cb) {
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/classes',
    headers: {
      accessToken: localStorage.getItem('accessToken'),
      name: localStorage.getItem('name')
    }
  })
    .done(function (response) {
      cb(response);
    })
    .fail(function (response) {
      alert(response);
    })
}

function addClass(data, cb) {
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/classes',
    headers: {
      accessToken: localStorage.getItem('accessToken'),
      name: localStorage.getItem('name')
    },
    data
  })
    .done(function (response) {
      cb(response);
    })
    .fail(function (response) {

      alert(response);
    })
}

function deleteClass(id, cb) {
  $.ajax({
    method: 'DELETE',
    url: `http://localhost:3000/classes/${id}`,
    headers: {
      accessToken: localStorage.getItem('accessToken'),
      name: localStorage.getItem('name')
    }
  })
    .done(function (response) {
      cb(response);
    })
    .fail(function (response) {
      alert(response);
    })
}



function ajaxFunction(method, url, data) {
  return $.ajax({
    url: 'http://localhost:3000/' + url,
    method: method,
    data
  })
}

function voice(message = null) {
  const data = {
    text: $('#translatedText').html(),
    voice: localStorage.getItem('speaker')
  }
  if (message) {
    data.text = message;
    data.voice = `en-GB_KateV3Voice`;
  }
  $.ajax({
    url: `http://localhost:3000/voices`,
    method: 'POST',
    data: data
  })
    .then(result => {
      if (('#UserPage:visible').length > 0 && !isSignedIn) {
        $('#loginBtn').html('Login');
        showListPage();
        $('#registerBtn').html('Register');
        showListPage();
      }
      play(result)
    })
    .fail(fail => {
    })
}

// google
function onSignIn(googleUser) {
  id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: 'http://localhost:3000/user/google-login',
    method: 'POST',
    data: {
      id_token
    }
  })
    .done(user => {
      localStorage.setItem('accessToken', user.accessToken);
      // console.log(result, 'result nih')
      // token = localStorage.accessToken;
      localStorage.setItem('name', user.name);
      if (!isSignedIn) {
        isSignedIn = true;
        voice(`Welcome, ${user.name}... Enjoy using our site`);
      }
    })
    .fail(err => {
      let errors = ['Email has registered']
      errors.forEach(el => {
        $('body').append(`<p>${err.message}</p>`);
      })
      signOut();
    })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  const name = localStorage.getItem('name');
  voice(`Goodbye ${name}, thanks for using our site!`);
  localStorage.removeItem('accessToken');
  localStorage.removeItem('name');
  isSignedIn = false;
}

