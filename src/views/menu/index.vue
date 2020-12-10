<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({name:'menu-create'})">添加菜单</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        <el-card>
          <el-table :data="menuData" style="width: 100%">
            <el-table-column min-width="150" type="index" prop="index" label="编号" width="180">
            </el-table-column>
            <el-table-column min-width="150" prop="name" label="菜单名称" width="180">
            </el-table-column>
            <el-table-column min-width="150" prop="level" label="菜单级数">
            </el-table-column>
            <el-table-column min-width="150" prop="icon" label="前端图标">
            </el-table-column>
            <el-table-column min-width="150" prop="level" label="排序">
            </el-table-column>
            <el-table-column label="操作" min-width="150">
              <template slot-scope="scope">
                <el-button @click="handleEdit(scope.row)" size="small">编辑</el-button>
                <el-button @click="handleDel(scope.row)" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { getAllMenuInfo, DelMenuInfo } from '@/services/menu'

  export default Vue.extend({
    name: 'MenuIndex',
    data() {
      return {
        menuData: []
      }
    },
    created() {
      this.loadAllMenus()
    },
    methods: {
      async loadAllMenus() {
        const { data } = await getAllMenuInfo()
        // console.log(data)
        if (data.code === '000000') {
          this.menuData = data.data
        }
      },
      handleEdit(item: any) {
        this.$router.push({
          name: 'menu-edit',
          params: {
            id: item.id
          }
        })
      },
      handleDel(item: any) {
        // console.log(index, item)
        this.$confirm('确认删除吗？', '提示', {})
          .then(async () => {
            const { data } = await DelMenuInfo(item.id)
            if (data.code === '000000') {
              this.$message.info('删除成功')
              // 更新数据
              this.loadAllMenus()
            }
          })
          .catch(err => {
            console.log(err)
            this.$message.info('已取消删除')
          })
      }
    }
  })
</script>

<style lang="scss" scoped></style>
