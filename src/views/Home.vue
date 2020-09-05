<template>
  <div class="home">
    <FieldOperations/>
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
