import LocaleService from "./LocaleService";

describe("getLocale", () => {
  test(`Returns undefined if locale=undefined`, async () => {
    const localeService: LocaleService = new LocaleService();
    const locale: Object = await localeService.getLocale();
    const expectedLocale = {
      PLOWING: "Вспашка",
      BOWLING: "Боронование",
      FERTILIZATION: "Внесение удобрений",
      WATERING: "Полив",
      RIGGING: "Прикатывание",
      HARVESTING: "Сбор урожая",
      EXCELLENT: "Отлично",
      SATISFACTORILY: "Удовлетворительно",
      BADLY: "Плохо"
    };
    expect(locale).toEqual(expectedLocale);
  });
});
