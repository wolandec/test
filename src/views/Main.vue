<template>
  <div class="home-layout">
    <div class="home-layout__header"></div>
    <main class="home-layout__content-container">
      <div class="home-layout__content">
        <FieldOperations />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FieldOperations from "@/components/FieldOperations.vue"; // @ is an alias to /src

@Component({
  components: {
    FieldOperations
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss">
@import "src/styles/base";

.home-layout {
  display: grid;
  grid-template-rows: 8rem 1fr;
  width: 100vw;
  height: 100vh;
  &__header {
    background-color: $color-primary;
  }

  &__content-container {
    background-color: $color-secondary-2;
  }

  &__content {
    width: 84%;
    height: 100%;
    margin: auto;
    padding: 2.6rem;
    background-color: $color-ternary;
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.2);
  }
}
</style>
