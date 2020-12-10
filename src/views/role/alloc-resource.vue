<template>
  <div class="user">
    <span>分配资源</span>
    <el-card>
      <el-tree node-key="id" ref="menuTree" default-expand-all :data="menus" :default-checked-keys="checkedKeys"
        show-checkbox :props="defaultProps">
      </el-tree>
    </el-card>

    <div style="text-align: center;">
      <el-button @click="resetChecked">清空</el-button>
      <el-button type="primary" @click="onSave">保存</el-button>
    </div>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'allocResource'
  })
</script>

<style lang="scss" scoped></style>
