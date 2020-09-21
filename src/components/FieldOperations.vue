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
        @sortField="handleSortFieldChange"
        :sortField="sortField"
        :sortDirection="sortDirection"
        :filter="filter"
      >
      </ui-field-operations-table>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import UiButton from "@/components/UiButton.vue";
import UiFieldOperationsTable from "@/components/UiFieldOperationsTable.vue";
import Operation, {OperationFilter, SortDirection} from "@/models/Operation";

const DEFAULT_FILTER = "none";
const DEFAULT_SORT_FIELD = "date";
const DEFAULT_SORT_DIRECTION = 1;

@Component({ components: { UiButton, UiFieldOperationsTable } })
export default class FieldOperations extends Vue {
  private sortField: keyof Operation = DEFAULT_SORT_FIELD;
  private sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  private filter: OperationFilter = DEFAULT_FILTER;

  @Watch("$route")
  routeHandler() {
    this.syncPropsAndRoute();
  }

  setLocale(): void {
    this.$store.dispatch("setLocale", "ru-Ru");
  }

  created() {
    this.setLocale();
    this.loadOperations();
    this.syncPropsAndRoute();
  }
  syncPropsAndRoute() {
    //@ts-ignore
    this.sortField = this.$route.params.sortField || DEFAULT_SORT_FIELD;
    //@ts-ignore
    this.sortDirection =
      +this.$route.params.sortDirection || DEFAULT_SORT_DIRECTION;
    //@ts-ignore
    this.filter = this.$route.params.filter || DEFAULT_FILTER;
  }

  loadOperations(): void {
    this.$store.dispatch("loadOperations");
  }

  //@ts-ignore
  handleSortFieldChange({ sortField, sortDirection }) {
    this.sortField = sortField;
    this.sortDirection = sortDirection;
    this.pushRoute();
  }

  handleFilter(filter: OperationFilter) {
    this.filter = filter;
    this.pushRoute();
  }

  pushRoute(): void {
    this.$router.push({
      name: "QueryFieldOperations",
      params: {
        sortField: this.sortField,
        filter: this.filter,
        sortDirection: String(this.sortDirection)
      }
    });
  }

  filterClass(filter: OperationFilter) {
    if (filter === this.filter) return { "_u-text-color-fourthly": true };
    return {};
  }
}
</script>
