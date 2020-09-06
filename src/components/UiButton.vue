<template>
  <button class="button _u-flex-separated-content">
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="8" fill="#66CC66" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9 4H7V7H4V9H7V12H9V9H12V7H9V4Z"
        fill="white"
      />
    </svg>
    <span>{{ msg }}</span>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class UiButton extends Vue {
  @Prop({ required: false, type: String, default: "UiButton" })
  private msg!: string;
  @Prop({ required: false, type: String, default: "Plus" })
  private type!: string;
}
</script>
