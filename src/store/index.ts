import Vue from "vue";
import Vuex from "vuex";
import LocaleService from "@/services/LocaleService";
import FieldService from "@/services/FieldService";
import Operation from "@/models/Operation";

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
    async setOperations(state) {
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
      return (field: keyof typeof Operation): Array<Operation> => {
        return state.operations?.sort(
          (operation: Operation, operation2: Operation) => {
            function createDateObject(operationDate: Operation["date"]) {
              const returnDate: Date = new Date();
              returnDate.setFullYear(
                operationDate.year,
                operationDate.month,
                operationDate.day
              );
              return returnDate;
            }

            // @ts-ignore
            if (field === "date") {
              const operationDate = createDateObject(operation.date);
              const operation2Date = createDateObject(operation2.date);
              return operation2Date > operationDate
                ? 1
                : operation2Date < operationDate
                ? -1
                : 0;
            }
            // @ts-ignore
            return operation2[field] - operation[field];
          }
        );
      };
    }
  },
  modules: {}
});
