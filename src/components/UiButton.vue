<template>
  <button @click="$emit('clicked')" class="button _u-flex-separated-content">
    <svg
      v-if="type !== 'NoIcon'"
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
    <span>{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    text: { required: false, type: String, default: "UiButton" },
    type: { required: false, type: String, default: "Plus" }
  },
  setup(props) {
    return {
      props
    };
  }
});
</script>
