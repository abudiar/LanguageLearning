const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const fs = require('fs');
 
const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: '-kckrdl8T7TFiHDzcXxe7zx1J5iS31Z08cEPx_oKgaC5',
  }),
  url: 'https://api.eu-gb.text-to-speech.watson.cloud.ibm.com/instances/f8a5f28e-e529-41d9-bd32-7ff3509c5043',
});

class VoiceController {
  static getVoice(req, res, next) {
    const {voice, text} = req.body
    let hasil
    const synthesizeParams = {
      text,
      voice,
      accept: 'audio/wav',
    }

    textToSpeech.synthesize(synthesizeParams)
    .then(audio => {
        const audioFile = `${randomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')}.wav`;
        let tempFile = fs.createWriteStream(`./public/${audioFile}`);
        audio.result.pipe(tempFile);
        tempFile.on('finish', function (fd) {
            console.log(audioFile)
            res.status(200).send(audioFile);
        });
    })
    .catch(err => {
        console.log('error:', err);
        next(err);
    });

    function randomString(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
      return result;
    }
  }
}

module.exports = VoiceController