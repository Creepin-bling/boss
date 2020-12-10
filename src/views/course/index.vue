<template>
  <div class="course-list">
    <List />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import List from './components/CourseList.vue'

  export default Vue.extend({
    name: 'CourseIndex',
    components: {
      List
    }
  })
</script>

<style lang="scss" scoped>
</style>
