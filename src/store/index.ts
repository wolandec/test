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
    getSortedOperations: (): Function => {
      return (
        operations: Array<Operation>,
        sortField: keyof Operation
      ): Array<Operation> => {
        return operations?.sort(
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

            if (sortField === "date") {
              const operationDate = createDateObject(operation.date);
              const operation2Date = createDateObject(operation2.date);
              return operation2Date > operationDate
                ? 1
                : operation2Date < operationDate
                ? -1
                : 0;
            }
            // @ts-ignore
            return operation2[sortField] - operation[sortField];
          }
        );
      };
    },
    getFilteredOperations: (): Function => {
      return (
        operations: Array<Operation>,
        filter: string
      ): Array<Operation> => {
        if (filter === "none") return operations;
        return operations?.filter((operation: Operation) => {
          if (filter === "done") return operation.assessment;
          if (filter === "plan") return !operation.assessment;
        });
      };
    }
  },
  modules: {}
});
