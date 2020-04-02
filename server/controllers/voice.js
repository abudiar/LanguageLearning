const axios = require('axios');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const fs = require('fs');

const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
        apikey: '-kckrdl8T7TFiHDzcXxe7zx1J5iS31Z08cEPx_oKgaC5',
    }),
    url: 'https://api.eu-gb.text-to-speech.watson.cloud.ibm.com/instances/f8a5f28e-e529-41d9-bd32-7ff3509c5043',
});

const getVoiceParams = {
    voice: 'en-US_AllisonVoice',
};


// textToSpeech.getVoice(getVoiceParams)
//   .then(voice => {
//     console.log(JSON.stringify(voice, null, 2));
//   })
//   .catch(err => {
//     console.log('error:', err);
//   });

class VoiceController {
    static getVoice(req, res, next) {
        console.log(req.query, 'dari client')
        console.log(req.data, 'dari client')
        console.log(req.body, 'dari client')
        const { voice, text } = req.query
        // axios({
        //   method: 'post',
        //   url: 'https://api.eu-gb.text-to-speech.watson.cloud.ibm.com/instances/f8a5f28e-e529-41d9-bd32-7ff3509c5043/v1/synthesize?voice=' + lang,
        //   headers: {
        //     accept: 'audio/wav',
        //     'content-type': 'application/json',
        //     authorization: 'Basic YXBpa2V5Oi1rY2tyZGw4VDdURmlIRHpjWHhlN3p4MUo1aVMzMVowOGNFUHhfb0tnYUM1'
        //   },
        //   data: {
        //     text
        //   }
        //   // responseType: 'blob'
        // })
        //   .then(audio => {
        //     // console.log(typeof audio.data)
        //     // res.status(200).json({data: audio.data})
        //     // audio.pause();
        //     // audio.src = URL.createObjectURL(response.data);
        //     // audio.play();
        //     res.send(audio.data)
        //     // res.send(`<audio controls>
        //     //   <source src="${audio.data}" type="audio/wav"></audio>
        //     // `)
        //   })
        //   .catch(err => {
        //     res.status(500).send(err.message)
        //     // console.log(err, 'error')
        //   })

        // const synthesizeParams = { text: 'This is test from server yo', accept: 'audio/wav', voice: 'en-US_AllisonVoice', };

        // textToSpeech.synthesize(synthesizeParams)
        //     .then(audio => {
        //         console.log("Audio Received : ");
        //         var blob=new Blob(audio, {type : 'audio/wav'});
        //         res.send(blob);
        // })

        // const synthesizeParams = {
        //     text: 'Hello world',
        //     accept: 'audio/wav',
        //     voice: 'en-US_AllisonVoice',
        //   }

        //   textToSpeech.synthesize(synthesizeParams)
        //     .then(audio => {
        //       audio.result.pipe(fs.createWriteStream('../client/kobeda.wav'));
        //       res.status(200).send('kobeda')
        //     })
        //     .catch(err => {
        //       console.log('error:', err);
        //     });

        const synthesizeParams = {
            text,
            voice,
            accept: 'audio/wav',
        }

        textToSpeech.synthesize(synthesizeParams)
            .then(audio => {
                audio.result.pipe(fs.createWriteStream('../client/nama3.wav'));
                res.status(200).send('nama')
            })
            .catch(err => {
                console.log('error:', err);
            });

    }
}

module.exports = VoiceController
