const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const fs = require('fs');
 
const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: 'niZkDwVw7e28vh1BuVsfIr3HkPiUiD55y0QJKHSlzJ4p',
  }),
  url: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/56b47c47-6c67-4126-b966-768cc58104ee',
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