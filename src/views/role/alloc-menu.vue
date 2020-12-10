<template>
  <div class="user">
    <span>分配菜单</span>
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
  import { getMenuNodeList, getRoleMenus } from '@/services/menu'
  import { setAllocateRole } from '@/services/roles'
  export default Vue.extend({
    name: 'allocMenu',
    props: {
      roleId: {
        type: [String, Number],
        required: true
      }
    },

    data() {
      return {
        menu: [],
        menus: [],
        checkedKeys: [],
        defaultProps: {
          children: 'subMenuList',
          label: 'name'
        }
      }
    },
    created() {
      this.loadGetNodeList()
      this.loadRoleMenuList()
    },
    methods: {
      async loadGetNodeList() {
        const { data } = await getMenuNodeList({})
        console.log(data)
        this.menus = data.data
        // this.getCheckedKeys(data.data)
      },

      /*   getCheckedKeys(menus: any) {
          menus.forEach((menu: any) => {
            if (menus.selected) {
              this.checkedKeys.push(menu.id as never)
              this.checkedKeys = [...this.checkedKeys, menu.id] as any
            }
            if (menu.subMenuList) {
              this.getCheckedKeys(menu.subMenuList)
            }
          })
        }, */

      async loadRoleMenuList() {
        const { data } = await getRoleMenus(this.roleId)
        console.log('data', data)
        this.menu = data.data
        // 传参
        this.getCheckedKeys(data.data)
      },

      getCheckedKeys(menus: any) {
        menus.forEach((menu: any) => {
          this.checkedKeys.push(menu.id as any)
          // this.checkedKeys = [...this.checkedKeys, menus.id] as any
          if (menu.subMenuList) {
            this.getCheckedKeys(menu.subMenuList)
          }
        })
      },
      async onSave() {
        // console.log('save')
        const menuList = (this.$refs.menuTree as Tree).getCheckedKeys()
        console.log(menuList)
        await setAllocateRole({
          roleId: this.roleId,
          menuList
        })
        this.$message.success('提交成功')
        this.$router.back()
      },
      resetChecked() {
        (this.$refs.menuTree as Tree).setCheckedKeys([])
      }
    }
  })
</script>

<style lang="scss" scoped></style>
