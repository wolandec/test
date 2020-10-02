"use strict";
exports.__esModule = true;
var locale = require("../../locales/intterra-ru-RU.json");
var LocaleService = /** @class */ (function () {
    function LocaleService() {
    }
    /**
     * Имитирует получение текстовых констант для заданной локали
     * @returns {Promise<Object>}
     */
    LocaleService.prototype.getLocale = function (localeName) {
        if (localeName === void 0) { localeName = "ru-Ru"; }
        if (localeName === "ru-Ru")
            return new Promise(function (resolve) {
                setTimeout(function () {
                    resolve(locale);
                }, 10);
            });
        else
            return undefined;
    };
    return LocaleService;
}());
exports["default"] = LocaleService;
;
