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
        <ui-button msg="Добавить операцию"></ui-button>
      </div>
    </div>
    <div class="field-operations__table">
      <ui-field-operations-table
        @sortField="handleSortFieldChange"
        :propSortField="sortField"
        :propFilter="filter"
      >
      </ui-field-operations-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import UiButton from "@/components/UiButton.vue";
import UiFieldOperationsTable from "@/components/UiFieldOperationsTable.vue";
import Operation from "@/models/Operation";

@Component({ components: { UiButton, UiFieldOperationsTable } })
export default class FieldOperations extends Vue {
  private sortField: string = "";

  private filter: string = "none";

  @Watch("$route")
  routeHandler() {
    this.sortField = this.$route.params.sortField;
    this.filter = this.$route.params.filter;
  }

  getLocale(): void {
    this.$store.dispatch("setLocale", "ru-Ru");
  }
  created() {
    this.getLocale();
    this.sortField = this.$route.params.sortField;
    this.filter = this.$route.params.filter;
  }

  handleSortFieldChange(sortField: keyof Operation) {
    this.sortField = sortField;
    this.pushRoute();
  }

  handleFilter(filter: string) {
    this.filter = filter;
    this.pushRoute();
  }

  pushRoute(): void {
    this.$router.push({
      name: "QueryFieldOperations",
      params: { sortField: this.sortField, filter: this.filter }
    });
  }

  filterClass(filter: string) {
    if (filter === this.filter) return { "_u-text-color-fourthy": true };
    return {};
  }
}
</script>
