$( document ).ready(function() {
  const dataLang = [
    'ar-AR_OmarVoice','de-DE_BirgitVoice','de-DE_BirgitV3Voice','de-DE_DieterVoice','de-DE_DieterV3Voice','de-DE_ErikaV3Voice','en-GB_KateVoice','en-GB_KateV3Voice','en-US_AllisonVoice','en-US_AllisonV3Voice','en-US_EmilyV3Voice','en-US_HenryV3Voice','en-US_KevinV3Voice','en-US_LisaVoice','en-US_LisaV3Voice','en-US_MichaelVoice','en-US_MichaelV3Voice','en-US_OliviaV3Voice','es-ES_EnriqueVoice','es-ES_EnriqueV3Voice','es-ES_LauraVoice','es-ES_LauraV3Voice','es-LA_SofiaVoice','es-LA_SofiaV3Voice','es-US_SofiaVoice','es-US_SofiaV3Voice','fr-FR_ReneeVoice','fr-FR_ReneeV3Voice','it-IT_FrancescaVoice','it-IT_FrancescaV3Voice','ja-JP_EmiVoice','ja-JP_EmiV3Voice','nl-NL_EmmaVoice','nl-NL_LiamVoice','pt-BR_IsabelaVoice','pt-BR_IsabelaV3Voice','zh-CN_LiNaVoice','zh-CN_WangWeiVoice','zh-CN_ZhangJingVoice'
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
  
    console.log(data)
  
    $.ajax({
      url: `http://localhost:3000/voices?voice=${data.voice}&text=${data.text}`,
      method: 'POST',
      data: data
    })
    .then(result => {
      console.log(result);
      console.log('masuk ga sih');
      $('#audio').html(`<source src="nama3.wav" type="audio/wav">`);
    })
    .fail(fail => {
      console.log(fail);
    })
  })
})