'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     nameClass: DataTypes.STRING,
     idLang: DataTypes.STRING,
     isRegistered: DataTypes.BOOLEAN,
     UserId: DataTypes.INTEGER
     const langCodes = {
      ar: "Arabic",
      "zh-CN": "Chinese (Simplified)",
      "zh-TW": "Chinese (Traditional)",
      nl: "Dutch",
      en: "English",
      fr: "French",
      de: "German",
      hu: "Hungarian",
      id: "Indonesian",
      it: "Italian",
      ja: "Japanese",
      ko: "Korean",
      "pt-BR": "Portuguese (Brazil)",
      "pt-PT": "Portuguese (Portugal)",
      ru: "Russian",
      es: "Spanish",
    };
      return queryInterface.bulkInsert('Class', [{
        nameClass: 'Arabic',
        isRegistered: false,

      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
