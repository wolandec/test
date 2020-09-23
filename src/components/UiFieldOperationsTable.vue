<template>
  <table class="field-operations-table">
    <tr class="field-operations-table__header">
      <th @click="sortFieldHandler('date')">
        <div class="_u-flex-separated-content">
          <span>Дата</span>
          <svg
            width="10"
            height="5"
            viewBox="0 0 10 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            :transform="`rotate(${sortDirection === 1 ? 0 : 180})`"
            :class="sortedBySvgFillClass('date')"
          >
            <path
              v-if="sortField === 'date'"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10 0L5 5L0 0H10Z"
            />
          </svg>
        </div>
      </th>
      <th @click="sortFieldHandler('type')">
        <div class="_u-flex-separated-content">
          <span>Операция</span>
          <svg
            width="10"
            height="5"
            viewBox="0 0 10 5"
            fill="none"
            :transform="`rotate(${sortDirection === 1 ? 0 : 180})`"
            :class="sortedBySvgFillClass('type')"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              v-if="sortField === 'type'"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10 0L5 5L0 0H10Z"
            />
          </svg>
        </div>
      </th>
      <th @click="sortFieldHandler('area')">
        <div class="_u-flex-separated-content">
          <span>Площадь</span>
          <svg
            width="10"
            height="5"
            viewBox="0 0 10 5"
            fill="none"
            :transform="`rotate(${sortDirection === 1 ? 0 : 180})`"
            :class="sortedBySvgFillClass('area')"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              v-if="sortField === 'area'"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10 0L5 5L0 0H10Z"
            />
          </svg>
        </div>
      </th>
      <th @click="sortFieldHandler('assessment')">
        <div class="_u-flex-separated-content">
          <span>Качество</span>
          <svg
            width="10"
            height="5"
            viewBox="0 0 10 5"
            fill="none"
            :transform="`rotate(${sortDirection === 1 ? 0 : 180})`"
            :class="sortedBySvgFillClass('assessment')"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              v-if="sortField === 'assessment'"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10 0L5 5L0 0H10Z"
            />
          </svg>
        </div>
      </th>
    </tr>
    <tr
      v-for="operation in preparedForViewOperations"
      :key="operation.id"
      class="field-operations-table__row"
    >
      <td class="_u-uppercase">{{ operation.date }}</td>
      <td>{{ locale[operation.operation] }}</td>
      <td>{{ operation.area }}</td>
      <td :title="operation.comment" class="_u-flex-separated-content">
        <svg
          width="20"
          height="11"
          viewBox="0 0 20 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="0.880005"
            width="20"
            height="10"
            rx="5"
            :class="operationAssessmentClass(operation.assessment)"
          />
        </svg>
        <span :class="operationAssessmentClass(operation.assessment)">{{
          locale[operation.assessment] !== undefined
            ? locale[operation.assessment]
            : "Нет оценки"
        }}</span>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Operation, {
  Assessment,
  OperationFilter,
  OperationType,
  SortDirection
} from "../models/Operation";

@Component
export default class UiFieldOperationsTable extends Vue {
  @Prop({ type: String, default: "date" })
  readonly sortField!: keyof Operation;

  @Prop({ type: Number, default: 1 })
  readonly sortDirection!: SortDirection;

  @Prop({ type: String, default: "none" })
  readonly filter!: keyof OperationFilter | "none";

  @Prop({ type: Array, default: [] })
  public operations!: Array<Operation>;

  @Prop({ type: Object, default: {} })
  public locale!: any;

  get preparedForViewOperations() {
    if (!this.operations) return [];
    let operations;
    if (this.filter !== "none") {
      operations = this.$store.getters.getFilteredOperations(
        this.operations,
        this.filter
      );
    }
    const sortedOperations = this.$store.getters.getSortedOperations(
      operations ? operations : this.operations,
      this.sortField,
      this.sortDirection
    );
    return sortedOperations.map((operation: Operation) => {
      return {
        date: `${operation.date.day} ${
          this.locale["MONTHS"][operation.date.month]
        } ${operation.date.year}`,
        operation: OperationType[operation.type],
        area: operation.area,
        assessment: operation.assessment
          ? Assessment[operation.assessment]
          : "",
        comment: operation.comment
      };
    });
  }

  sortedBySvgFillClass(field: keyof Operation) {
    if (field === this.sortField) return { "_u-fill-color-fourthly": true };
    return { "_u-fill-color-inactive": true };
  }

  operationAssessmentClass(assessment: String) {
    switch (assessment) {
      case Assessment[Assessment.BADLY]:
        return { "_u-fill-color-fault": true };
      case Assessment[Assessment.SATISFACTORILY]:
        return { "_u-fill-color-normal": true };
      case Assessment[Assessment.EXCELLENT]:
        return { "_u-fill-color-success": true };
      default:
        return {
          "_u-fill-color-disabled": true,
          "_u-text-disabled": true
        };
    }
  }

  sortFieldHandler(field: keyof Operation) {
    let newSortDirection: SortDirection;
    let newSortField: keyof Operation = this.sortField;
    if (this.sortField === field) {
      newSortDirection = this.sortDirection === 1 ? -1 : 1;
    } else {
      newSortField = field;
      newSortDirection = 1;
    }
    this.$emit("sortFieldChange", {
      sortField: newSortField,
      sortDirection: newSortDirection
    });
  }
}
</script>
