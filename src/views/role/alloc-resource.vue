<template>
  <div class="user">
    <span>分配资源</span>
    <el-card>
      <el-tree ref="sourceTree" :data="resourceList" node-key="id" default-expand-all show-checkbox
        :props="defaultProps" :default-checked-keys="resourceIdList">
      </el-tree>
    </el-card>

    <div style="text-align: center;">
      <el-button @click="resetChecked">清空</el-button>
      <el-button type="primary">保存</el-button>
    </div>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { allocateRoleResources, GetAllCategory, resourceAll, getRoleResources } from '@/services/resource'
  export default Vue.extend({
    name: 'allocResource',
    data() {
      return {
        resourceList: [],
        resourceIdList: [],
        userHave: [],
        defaultProps: {
          children: '',
          label: 'name'
        }
      }
    },
    props: {
      roleId: {
        type: [String, Number],
        required: true
      }
    },
    created() {
      this.loadGetResource()
      this.loadGetUserHave()
    },
    methods: {
      async loadGetResource() {
        const { data } = await resourceAll()
        this.resourceList = data.data
        console.log(data.data)
      },

      async loadGetUserHave() {
        const { data } = await getRoleResources(this.roleId)
        // console.log(data.data)
        this.userHave = data.data
        console.log(data.data)
        // console.log(this.userHave.id)
        this.getCheckedLists(data.data)
      },
      getCheckedLists(Lists) {
        Lists.forEach((List: any) => {
          List.resourceList.forEach((item) => {
            this.resourceIdList.push(item.id)
          })
        })
        console.log(this.resourceIdList)
      },
      resetChecked() {
        (this.$refs.sourceTree as Tree).setCheckedKeys([])
      }
    }
  })
</script>

<style lang="scss" scoped></style>
