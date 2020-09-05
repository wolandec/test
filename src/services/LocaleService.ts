import locale from "@/locales/intterra-ru-RU.json";

export default class LocaleService {
  /**
   * Имитирует получение текстовых констант для заданной локали
   * @returns {Promise<Object>}
   */
  getLocale(localeName: String = "ru-Ru"): Promise<Object> | undefined {
    if (localeName === "ru-Ru")
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(locale);
        }, 10);
      });
    else return undefined;
  }
}
