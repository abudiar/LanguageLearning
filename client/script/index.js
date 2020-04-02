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

  $('#voice').submit(function(e) {
    e.preventDefault();
    const data = {
      text: $('#text').val(),
      voice: $('#lang').val()
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
  })

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
})