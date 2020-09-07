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
            :class="sortedBySvgFillClass('date')"
          >
            <path
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
            :class="sortedBySvgFillClass('type')"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
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
            :class="sortedBySvgFillClass('area')"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
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
            :class="sortedBySvgFillClass('assessment')"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
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
import Operation, { OperationType, Assessment } from "@/models/Operation";
import { State } from "vuex-class/lib";

@Component
export default class UiFieldOperationsTable extends Vue {
  @Prop({ type: String, default: "date" })
  readonly propSortField!: keyof Operation;

  @State
  public operations!: Array<Operation>;

  @State
  public locale!: any;

  private sortField: keyof Operation | null = null;

  get preparedForViewOperations() {
    if (!this.operations) return [];
    const sortedOperations = this.$store.getters.getSortedOperations(
      this.sortField
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

  created() {
    this.setOperations();
    this.sortField = this.propSortField;
  }

  sortedBySvgFillClass(field: keyof Operation) {
    if (field === this.sortField) return { "_u-fill-color-fourthy": true };
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
          "_u-text-color-disabled": true
        };
    }
  }

  setOperations(): void {
    this.$store.dispatch("setOperations");
  }

  sortFieldHandler(field: keyof Operation) {
    this.sortField = field;
    this.$emit("sortField", this.sortField);
  }
}
</script>
