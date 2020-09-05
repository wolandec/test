import Vue from "vue";
import Vuex from "vuex";
import LocaleService from "@/services/LocaleService";

const localeService: LocaleService = new LocaleService();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locale: null
  },
  mutations: {
    changeLocale(state, locale) {
      state.locale = locale;
    }
  },
  actions: {
    // getOperations(state) {
    //
    // },
    async setLocale(state, localeName) {
      const locale = await localeService.getLocale(localeName);
      if (locale) state.commit("changeLocale", locale);
    }
  },
  modules: {}
});
