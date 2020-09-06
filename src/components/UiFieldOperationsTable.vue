<template>
  <table class="field-operations-table">
    <tr class="field-operations-table__header">
      <th>
        <div class="_u-flex-separated-content">
          <span>Дата</span>
          <svg
            width="10"
            height="5"
            viewBox="0 0 10 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10 0L5 5L0 0H10Z"
              fill="#A7A9AC"
            />
          </svg>
        </div>
      </th>
      <th>
        <div class="_u-flex-separated-content">
          <span>Операция</span>
          <svg
            width="10"
            height="5"
            viewBox="0 0 10 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10 0L5 5L0 0H10Z"
              fill="#A7A9AC"
            />
          </svg>
        </div>
      </th>
      <th>
        <div class="_u-flex-separated-content">
          <span>Культура</span>
          <svg
            width="10"
            height="5"
            viewBox="0 0 10 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10 0L5 5L0 0H10Z"
              fill="#A7A9AC"
            />
          </svg>
        </div>
      </th>
      <th>
        <div class="_u-flex-separated-content">
          <span>Качество</span>
          <svg
            width="10"
            height="5"
            viewBox="0 0 10 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10 0L5 5L0 0H10Z"
              fill="#A7A9AC"
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
      <td>{{ operation.culture }}</td>
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
import { Component, Vue } from "vue-property-decorator";
import Operation, { OperationType, Assessment } from "@/models/Operation";
import { State } from "vuex-class/lib";

@Component
export default class UiFieldOperationsTable extends Vue {
  @State
  public operations!: Array<Operation>;

  @State
  public locale!: any;

  get preparedForViewOperations() {
    if (!this.operations) return [];
    return this.operations.map(operation => {
      return {
        date: `${operation.date.day} ${
          this.locale["MONTHS"][operation.date.month]
        } ${operation.date.year}`,
        operation: OperationType[operation.type],
        culture: "",
        assessment: operation.assessment
          ? Assessment[operation.assessment]
          : "",
        comment: operation.comment
      };
    });
  }

  operationAssessmentClass(assessment: String) {
    switch (assessment) {
      case "BADLY":
        return { "_u-fill-color-fault": true };
      case "SATISFACTORILY":
        return { "_u-fill-color-normal": true };
      case "EXCELLENT":
        return { "_u-fill-color-success": true };
      default:
        return {
          "_u-fill-color-disabled": true,
          "_u-text-color-disabled": true
        };
    }
  }

  getOperations(): void {
    this.$store.dispatch("setOperations");
  }

  created() {
    this.getOperations();
  }
}
</script>
