import Vue from "vue";
import Vuex from "vuex";
import LocaleService from "@/services/LocaleService";
import FieldService from "@/services/FieldService";
import Operation, {OperationFilter} from "@/models/Operation";

const fieldService = new FieldService();
const localeService: LocaleService = new LocaleService();

Vue.use(Vuex);

interface RootState {
  locale: any | null;
  operations: Array<Operation>;
}

const state: RootState = {
  locale: null,
  operations: []
};

export default new Vuex.Store({
  state,
  mutations: {
    changeLocale(state, locale) {
      state.locale = locale;
    },
    changeOperations(state, operations) {
      state.operations = operations;
    }
  },
  actions: {
    async loadOperations(state) {
      const operations = await fieldService.getOperations();
      if (operations) state.commit("changeOperations", operations);
    },
    async setLocale(state, localeName) {
      const locale = await localeService.getLocale(localeName);
      if (locale) state.commit("changeLocale", locale);
    }
  },
  getters: {
    getSortedOperations: (state): Function => {
      return (
        operations: Array<Operation>,
        sortField: keyof Operation,
        sortDirection: 1 | -1 = 1
      ): Array<Operation> => {
        return fieldService.getSortedOperations(operations, sortField, sortDirection, state.locale);
      };
    },
    getFilteredOperations: (): Function => {
      return (
        operations: Array<Operation>,
        filter: OperationFilter
      ): Array<Operation> => {
        return fieldService.getFilteredOperations(operations, filter);
      };
    }
  },
  modules: {}
});
