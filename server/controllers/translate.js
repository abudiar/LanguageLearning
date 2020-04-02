const queryString = require('query-string'),
    axios = require('axios');

class Translate {
    static translate(req, res, next) {
        // console.log(req.body, req.params, req.query);


        const {
            query: { translateFrom = 'id', translateTo = 'ja', text }
        } = req;
        const original = {},
            translated = {},
            matches = {};
        let todoData;

        original['text'] = text;
        const translateParams = {
            q: text,
            langpair: `${translateFrom}|${translateTo}`,
        }
        const stringified = queryString.stringify(translateParams);

        // console.log(stringified);
        axios({
            method: 'get',
            url: 'https://api.mymemory.translated.net/get?' + stringified,
        })
            .then(function (response) {
                // console.log(response)
                translated['text'] = response.data.responseData.translatedText;
                matches['text'] = response.data.responseData.matches;
                const result = {
                    parameters: {
                        translateFrom: translateFrom,
                        translateTo: translateTo,
                    },
                    original,
                    translated,
                    matches
                }
                // console.log(original,
                //     translated,
                //     matches)
                res.status(200).json(result);
            })
            .catch(next)
    }
}

module.exports = Translate;