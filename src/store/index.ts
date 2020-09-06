import Vue from "vue";
import Vuex from "vuex";
import LocaleService from "@/services/LocaleService";
import FieldService from "@/services/FieldService";

const fieldService = new FieldService();
const localeService: LocaleService = new LocaleService();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locale: null,
    operations: null
  },
  mutations: {
    changeLocale(state, locale) {
      state.locale = locale;
    },
    changeOperations(state, operations) {
      state.operations = operations;
    }
  },
  actions: {
    async setOperations(state) {
      const operations = await fieldService.getOperations();
      if (operations) state.commit("changeOperations", operations);
    },
    async setLocale(state, localeName) {
      const locale = await localeService.getLocale(localeName);
      if (locale) state.commit("changeLocale", locale);
    }
  },
  modules: {}
});
