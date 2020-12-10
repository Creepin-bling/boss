<template>

  <createOrEdit :isEdit="true"></createOrEdit>
</template>

<script lang="ts">
  import Vue from 'vue'
  import createOrEdit from './components/CreateOrEdit.vue'

  export default Vue.extend({
    name: 'menuEdit',
    components: {
      createOrEdit
    }
  })
</script>

<style lang="scss" scoped></style>
