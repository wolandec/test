<template>
  <div>{{ locale }}</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Operation from "@/models/Operation";
import { State } from "vuex-class/lib";

@Component
export default class FieldOperations extends Vue {
  // @Prop() private msg!: string;
  operations: Array<Operation> = [];

  @State
  public locale!: Object;

  async getLocale(): Promise<Object> {
    return await this.$store.dispatch("setLocale", "ru-Ru");
  }
  created() {
    console.log(this.getLocale());
  }
}
</script>
