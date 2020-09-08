<template>
  <div class="field-operations">
    <h1 class="header-1">Операции на поле 112</h1>
    <div class="field-operations-header">
      <div class="field-operations-header__actions _u-uppercase">
        <h2 class="header-2 header-2--active">Запланированные операции</h2>
        <h2 class="header-2">Выполненные операции</h2>
      </div>
      <div class="field-operations-header__buttons">
        <ui-button msg="Добавить операцию"></ui-button>
      </div>
    </div>
    <div class="field-operations__table">
      <ui-field-operations-table
        @sortField="handleSortFieldChange"
        :propSortField="sortField"
      >
      </ui-field-operations-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import UiButton from "@/components/UiButton.vue";
import UiFieldOperationsTable from "@/components/UiFieldOperationsTable.vue";

@Component({ components: { UiButton, UiFieldOperationsTable } })
export default class FieldOperations extends Vue {
  private sortField: any = null;

  @Watch('$route')
  routeHandler() {
    this.sortField = this.$route.params.sortField;
  }

  getLocale(): void {
    this.$store.dispatch("setLocale", "ru-Ru");
  }
  created() {
    this.getLocale();
    this.sortField = this.$route.params.sortField;
  }

  handleSortFieldChange(sortField) {
    this.$router.push({ name: "SortedFieldOperations", params: { sortField } });
  }
}
</script>
