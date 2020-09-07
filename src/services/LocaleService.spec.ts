import LocaleService from "./LocaleService";

describe("getLocale", () => {
  test(`Returns ru-Ru if locale=undefined`, async () => {
    const localeService: LocaleService = new LocaleService();
    const locale: Object | undefined = await localeService.getLocale();
    const expectedLocale = {
      PLOWING: "Вспашка",
      BOWLING: "Боронование",
      FERTILIZATION: "Внесение удобрений",
      WATERING: "Полив",
      RIGGING: "Прикатывание",
      HARVESTING: "Сбор урожая",
      EXCELLENT: "Отлично",
      SATISFACTORILY: "Удовлетворительно",
      BADLY: "Плохо",
      MONTHS: [
        "Янв",
        "Фев",
        "Мар",
        "Апр",
        "Май",
        "Июнь",
        "Июль",
        "Авг",
        "Сент",
        "Окт",
        "Нояб",
        "Дек"
      ]
    };
    expect(locale).toEqual(expectedLocale);
  });
});
