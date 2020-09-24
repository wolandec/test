<template>
  <div class="field-operations">
    <h1 class="header-1">Операции на поле 112</h1>
    <div class="field-operations-header">
      <div class="field-operations-header__actions _u-uppercase">
        <h2
          @click="handleFilter('plan')"
          :class="filterClass('plan')"
          class="header-2 _u-cursor-pointer"
        >
          Запланированные операции
        </h2>
        <h2
          @click="handleFilter('done')"
          :class="filterClass('done')"
          class="header-2 _u-cursor-pointer"
        >
          Выполненные операции
        </h2>
      </div>
      <div class="field-operations-header__buttons">
        <ui-button text="Добавить операцию"></ui-button>
      </div>
    </div>
    <div class="field-operations__table">
      <ui-field-operations-table
        @sortFieldChange="handleSortFieldChange"
        :sortField="data.sortField"
        :sortDirection="data.sortDirection"
        :filter="data.filter"
        :operations="operations"
        :locale="locale"
      >
      </ui-field-operations-table>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  watch,
  computed
} from "@vue/composition-api";

import UiButton from "@/components/UiButton.vue";
import UiFieldOperationsTable from "@/components/UiFieldOperationsTable.vue";
import Operation, { OperationFilter } from "@/models/Operation";

const DEFAULT_FILTER = "none";
const DEFAULT_SORT_FIELD = "date";
const DEFAULT_SORT_DIRECTION = 1;

export default defineComponent({
  name: "FieldOperation",
  components: { UiButton, UiFieldOperationsTable },
  setup(_, context) {
    const data = reactive({
      sortField: DEFAULT_SORT_FIELD,
      sortDirection: DEFAULT_SORT_DIRECTION,
      filter: DEFAULT_FILTER
    });

    const operations: Array<Operation> = computed(
      () => context.root.$store.state.operations
    );
    const locale: any = computed(() => context.root.$store.state.locale);

    watch(
      () => context.root.$route,
      function() {
        syncPropsAndRoute();
      }
    );

    function setLocale(): void {
      context.root.$store.dispatch("setLocale", "ru-Ru");
    }

    function syncPropsAndRoute() {
      //@ts-ignore
      console.log(context);
      data.sortField =
        context.root.$route.params.sortField || DEFAULT_SORT_FIELD;
      //@ts-ignore
      data.sortDirection =
        +context.root.$route.params.sortDirection || DEFAULT_SORT_DIRECTION;
      //@ts-ignore
      data.filter = context.root.$route.params.filter || DEFAULT_FILTER;
    }

    function loadOperations(): void {
      context.root.$store.dispatch("loadOperations");
    }

    //@ts-ignore
    function handleSortFieldChange({ sortField, sortDirection }) {
      data.sortField = sortField;
      data.sortDirection = sortDirection;
      pushRoute();
    }

    function handleFilter(filter: OperationFilter) {
      data.filter = filter;
      pushRoute();
    }

    function pushRoute(): void {
      context.root.$router.push({
        name: "QueryFieldOperations",
        params: {
          sortField: data.sortField,
          filter: data.filter,
          sortDirection: String(data.sortDirection)
        }
      });
    }

    function filterClass(filter: OperationFilter) {
      if (filter === data.filter) return { "_u-text-color-fourthly": true };
      return {};
    }

    setLocale();
    loadOperations();
    syncPropsAndRoute();

    return {
      filterClass,
      handleFilter,
      handleSortFieldChange,
      operations,
      locale,
      data
    };
  }
});
</script>
