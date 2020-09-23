import "../styles/_base.scss";
import "../styles/components.scss";
import Vuex from "vuex";
import Vue from "vue";
import store from "../store";
// @ts-ignore
import UiFieldOperationsTable from "../components/UiFieldOperationsTable";

import Operation, { Assessment, OperationType } from "../models/Operation";

Vue.use(Vuex);

export default {
  title: "Example/UiFieldOperationsTable",
  component: UiFieldOperationsTable,
  argTypes: {
    filter: {
      description: "Тип фильтрации данных в таблице",
      defaultValue: "none",
      control: {
        type: "select",
        options: ["none", "done", "plan"]
      }
    },
    sortField: {
      description: "Поле сортировки по которому будет происходить сортировка",
      defaultValue: "date",
      control: {
        type: "select",
        options: ["type", "date", "area", "comment", "assessment"]
      }
    },
    sortDirection: {
      description: "Направление сортировки",
      defaultValue: 1,
      control: {
        type: "select",
        options: [1, -1]
      }
    },
    locale: {
      description: "Локальные строковые значения",
      defaultValue: {
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
      }
    },
    onSortFieldChange: {
      action: "sortFieldChange"
    },
    operations: {
      description: "Операции которые отображаются в таблице",
      defaultValue: [
        new Operation({
          id: "f112-o0",
          type: OperationType.PLOWING,
          date: { year: 2018, month: 3, day: 12 },
          area: 48.2,
          comment: "Отлично вспахали",
          assessment: Assessment.EXCELLENT
        }),
        new Operation({
          id: "f112-o1",
          type: OperationType.FERTILIZATION,
          date: { year: 2018, month: 3, day: 14 },
          area: 47.8,
          comment: "Все прошло нормально",
          assessment: Assessment.SATISFACTORILY
        }),
        new Operation({
          id: "f112-o2",
          type: OperationType.RIGGING,
          date: { year: 2018, month: 3, day: 17 },
          area: 47.5,
          comment: null,
          assessment: Assessment.BADLY
        }),
        new Operation({
          id: "f112-o3",
          type: OperationType.BOWLING,
          date: { year: 2018, month: 3, day: 26 },
          area: 48.2,
          comment: null,
          assessment: null
        }),
        new Operation({
          id: "f112-o4",
          type: OperationType.WATERING,
          date: { year: 2018, month: 4, day: 2 },
          area: 48.1,
          comment: "Знатно полили",
          assessment: Assessment.EXCELLENT
        }),
        new Operation({
          id: "f112-o5",
          type: OperationType.HARVESTING,
          date: { year: 2018, month: 6, day: 20 },
          area: 48.0,
          comment: null,
          assessment: null
        })
      ]
    }
  }
};

// @ts-ignore
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { UiFieldOperationsTable: UiFieldOperationsTable },
  store,
  template:
    '<ui-field-operations-table @sortFieldChange="onSortFieldChange" v-bind="$props"/>'
});

export const MainUsage = Template.bind({});
// @ts-ignore
MainUsage.args = {};
