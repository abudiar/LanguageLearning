$( document ).ready(function() {
  const dataLang = [
    'ar-AR_OmarVoice','de-DE_BirgitV3Voice','de-DE_DieterV3Voice','de-DE_ErikaV3Voice','en-GB_KateV3Voice','en-US_AllisonV3Voice','en-US_EmilyV3Voice','en-US_HenryV3Voice','en-US_KevinV3Voice','en-US_LisaV3Voice','en-US_MichaelV3Voice','en-US_OliviaV3Voice','es-ES_EnriqueV3Voice','es-ES_LauraV3Voice','es-LA_SofiaV3Voice','es-US_SofiaV3Voice','fr-FR_ReneeV3Voice','it-IT_FrancescaV3Voice','ja-JP_EmiV3Voice','nl-NL_EmmaVoice','nl-NL_LiamVoice','pt-BR_IsabelaV3Voice','zh-CN_LiNaVoice','zh-CN_WangWeiVoice','zh-CN_ZhangJingVoice'
  ]

  let dom;
  dataLang.forEach(el => {
    dom += `<option value="${el}">${el}</option><br>`;
  })

  $('#voice').append(`
    <select id="lang" name="lang">
      ${dom}
    </select>
  `)

  // voice
  $('#voice').submit(function(e) {
    e.preventDefault();
    voice();
  })

  // login
  $('#login').submit(function(e) {
    e.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();
    ajaxFunction('POST', 'user/login', {email, password})
    .done(user => {
      let {access_token} = user;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('name', user.name);
      voice(`Welcome, ${user.name}... Enjoy using our site`);
    })
  })

  // register
  $('#register').submit(function (e) {
    e.preventDefault()
    const full_name = $('#name').val();
    const email = $('#emailR').val();
    const password = $('#passwordR').val();
    ajaxFunction('POST', 'user/register', {email, password, full_name})
    .done(user => {
      let {access_token} = user
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('name', user.name);
      voice(`Welcome, ${user.name}... Enjoy using our site`);
    })
  })
})

function ajaxFunction(method, url, data) { 
  return $.ajax({
    url: 'http://localhost:3000/' + url,
    method: method,
    data
  })
}

function voice(message=null) { 
  const data = {
    text: $('#text').val(),
    voice: $('#lang').val()
  }
  if(message){
    data.text = message;
    data.voice = `en-GB_KateV3Voice`;
  }
    $.ajax({
      url: `http://localhost:3000/voices`,
      method: 'POST',
      data: data
    })
      .then(result => {
        play(result)
      })
      .fail(fail => {
      })

}

// player
function play(filePath) {
  var request2 = new XMLHttpRequest();
  request2.open("GET", 'http://localhost:3000/' + filePath, true);
  request2.responseType = "blob";
  request2.onload = function () {
    if (this.status == 200) {
      var audio = new Audio(URL.createObjectURL(this.response));
      audio.load();
      audio.play();
    }
  }
  request2.send();
}

// google
function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: 'http://localhost:3000/user/google-login',
    method: 'POST',
    data: {
      id_token
    }
  })
  .done(user => {
    localStorage.setItem('access_token', user.accessToken);
    // console.log(result, 'result nih')
    // token = localStorage.accessToken;
    localStorage.setItem('name', user.name);
    voice(`Welcome, ${user.name}... Enjoy using our site`);
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
  localStorage.removeItem('access_token');
  localStorage.removeItem('name');
}

