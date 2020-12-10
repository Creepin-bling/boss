<template>
  <div class="resource">
    <List />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import List from './components/UserList.vue'
  export default Vue.extend({
    // import dayjs from 'dayjs'
    name: 'UserIndex',
    data() {
      return {

      }
    },
    methods: {

    },
    components: {
      List
    }
  })
</script>

<style lang="scss" scoped></style>
