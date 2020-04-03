const { Class, User } = require('../models')

class ClassController {
  static getAll(req, res, next) {
    console.log('masuk todos ga sih')
    const UserId = req.user.id;
    Class.findAll({ where: { UserId } })
      .then((lang) => {
        res.status(200).json(lang)
      })
      .catch((err) => {
        console.log(err)
        next(err);
      });
  }

  static create(req, res, next) {
    const { idLang } = req.body;
    const UserId = req.user.id;
    User.findOne({ where: { id: UserId } })
      .then(user => {
        if (!user) {
          throw new Error('User not found, please relogin')
        }
        return Class.create({
          idLang,
          isRegistered: true,
          UserId
        })
      })
      .then(lang => {
        res.status(201).json(lang);
      })
      .catch(err => {
        console.log(err)
        next(err);
      });
  }

  static getOne(req, res, next) {
    const UserId = req.user.id;
    Class.findOne({ where: { id: req.params.id, UserId } })
      .then((lang) => {
        if (lang) {
          res.status(200).json(todo);
        } else {
          throw new Error('Class not found');
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteClass(req, res, next) {
    let deletedClass;
    const UserId = req.user.id;
    Todo.findOne({ where: { id: req.params.id, UserId } })
      .then(lang => {
        if (lang) {
          deletedClass = lang;
          return Class.destroy({ where: { id: req.params.id }, returning: true });
        } else {
          throw new Error('Todo not found');
        }
      })
      .then(lang => {
        res.status(200).json(deletedClass);
      })
      .catch(err => {
        console.log(err)
        next(err);
      });
  }
}

module.exports = ClassController

// const langNames = {
//   ar: "Arabic",
//   de: "German",
//   en: "English",
//   es: "Spanish",
//   fr: "French",
//   it: "Italian",
//   ja: "Japanese",
//   nl: "Dutch",
//   pt: "Portuguese",
//   zh: "Chinese"
// };

// const langCodes = {
//   ar: "Arabic",
//   "zh-CN": "Chinese (Simplified)",
//   "zh-TW": "Chinese (Traditional)",
//   nl: "Dutch",
//   en: "English",
//   fr: "French",
//   de: "German",
//   hu: "Hungarian",
//   id: "Indonesian",
//   it: "Italian",
//   ja: "Japanese",
//   ko: "Korean",
//   "pt-BR": "Portuguese (Brazil)",
//   "pt-PT": "Portuguese (Portugal)",
//   ru: "Russian",
//   es: "Spanish",
// };

// const langSpeakers = {
//   ar: { "ar-AR_OmarVoice": "AR - Omar" },
//   de: {
//       "de-DE_BirgitV3Voice": "DE - BirgitV3",
//       "de-DE_DieterV3Voice": "DE - DieterV3",
//       "de-DE_ErikaV3Voice": "DE - ErikaV3"
//   },
//   en: {
//       "en-GB_KateV3Voice": "GB - KateV3",
//       "en-US_AllisonV3Voice": "US - AllisonV3",
//       "en-US_EmilyV3Voice": "US - EmilyV3",
//       "en-US_HenryV3Voice": "US - HenryV3",
//       "en-US_KevinV3Voice": "US - KevinV3",
//       "en-US_LisaV3Voice": "US - LisaV3",
//       "en-US_MichaelV3Voice": "US - MichaelV3",
//       "en-US_OliviaV3Voice": "US - OliviaV3"
//   },
//   es: {
//       "es-ES_EnriqueV3Voice": "ES - EnriqueV3",
//       "es-ES_LauraV3Voice": "ES - LauraV3",
//       "es-LA_SofiaV3Voice": "LA - SofiaV3",
//       "es-US_SofiaV3Voice": "US - SofiaV3"
//   },
//   fr: { "fr-FR_ReneeV3Voice": "FR - ReneeV3" },
//   it: { "it-IT_FrancescaV3Voice": "IT - FrancescaV3" },
//   ja: { "ja-JP_EmiV3Voice": "JP - EmiV3" },
//   nl: {
//       "nl-NL_EmmaVoice": "NL - Emma",
//       "nl-NL_LiamVoice": "NL - Liam"
//   },
//   pt: { "pt-BR_IsabelaV3Voice": "BR - IsabelaV3" },
//   zh: {
//       "zh-CN_LiNaVoice": "CN - LiNa",
//       "zh-CN_WangWeiVoice": "CN - WangWei",
//       "zh-CN_ZhangJingVoice": "CN - ZhangJing"
//   }
// };