// // const pcm = require('pcm');
$( document ).ready(function() {
  $.ajax({
    url: "http://localhost:3000/voices",
    method: "post",
  })
  .then((result) => {
    console.log(result)
    // var blob = new Blob(decodedData, {type: "correct-mimetype/here"});
    // var url = URL.createObjectURL(blob);
    // // audio.src = url
    console.log('masuk ga sih')
    // var sine = [result.data];
    // for (var i=0; i<10000; i++) {
    //   sine[i] = 128+Math.round(127*Math.sin(i/5));
    // }
            // audio.pause();
        // audio.src = URL.createObjectURL(response.data);
        // audio.play();

    
    // new pcm({channels: 1, rate: 8000, depth: 8}).toWav(sine).play();
    // var dataURI = new pcm({channels: 1, rate: 8000, depth: 8}).toWav(sine).encode();
    $('#audio').append(`<source src="${URL.createObjectURL(result)}" type="audio/wav">`)
  })
  .fail(fail => {
    console.log(fail)
  })
})

// var audio;
// fetch('http://localhost:3000/voices')
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(token) {
//     audio = WatsonSpeech.TextToSpeech.synthesize(Object.assign(token, {
//       text: 'Hello from IBM Watson',
//       autoPlay: false,
//       accept: 'audio/wav'
//     }));

//     audio.onerror = function(err) {
//       console.log('audio error: ', err);
//     };
//   });

// document.querySelector('#button').onclick = function() {
//   audio.play();
// };