<template>
  <div class="resource">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>角色管理</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>

      <el-form :inline="true" :model="form" ref='form' class="demo-form-inline">
        <el-form-item prop="name" label="资源名称">
          <el-input v-model="form.name" placeholder="资源名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="onReset">重置</el-button>
          <el-button type="primary" @click="onSubmit">查询搜索</el-button>
        </el-form-item>
      </el-form>

      <el-button @click="handleAdd">添加角色</el-button>

      <el-dialog title="添加角色" :visible.sync="dialogVisible" width="30%">
        <createOrEdit v-if="dialogVisible" @success="onSuccess" @cancel="Cancel" :role-id="rolesId" :is-edit="isEdit" />
      </el-dialog>
      <el-table :data="RolePagesList" style="width: 100%;margin-bottom: 40px">
        <el-table-column type="index" label="编号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="角色名称" width="180">
        </el-table-column>

        <el-table-column prop="description" label="描述">
        </el-table-column>
        <el-table-column prop="createdTime" label="添加时间">
        </el-table-column>
        <el-table-column label="操作">

          <div slot-scope="scope">
            <el-button type="text" @click="$router.push({name:'alloc-menu',
          params:{
            roleId:scope.row.id
          }})">分配菜单</el-button>
            <el-button type="text" @click="$router.push({name:'alloc-resource',
          params:{
            roleId:scope.row.id
          }})">分配资源</el-button>
            <el-button type="text" @click="handleEdit(scope.row)" size="mini">编辑</el-button>
            <el-button @click="handleDel(scope.row)" type="text" size="mini">删除</el-button>
          </div>

        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  // import dayjs from 'dayjs'
  import createOrEdit from './components/CreateOrEditRoles.vue'
  import { getRolePages, DelRolesInfo } from '@/services/roles'

  export default Vue.extend({
    name: 'roleIndex',
    data() {
      return {
        form: {
          name: ''
        },
        RolePagesList: [],
        dialogVisible: false,
        rolesId: null,
        isEdit: false
      }
    },
    components: {
      createOrEdit
    },
    created() {
      this.LoadGetRole()
    },
    methods: {
      async LoadGetRole() {
        const { data } = await getRolePages({

        })
        console.log(111, data)
        this.RolePagesList = data.data.records
      },
      onSubmit() {
        // 查询
        this.LoadGetRole()
      },
      onReset() {
        (this.$refs.form as Form).resetFields()

        this.LoadGetRole()
      },
      onSuccess() {
        this.dialogVisible = false
        this.LoadGetRole()
      },
      Cancel() {
        this.dialogVisible = false
      },

      handleEdit(role: any) {
        console.log(role)
        this.dialogVisible = true
        this.rolesId = role.id
        this.isEdit = true
      },
      handleAdd() {
        this.isEdit = false
        this.dialogVisible = true
      },
      handleDel(role: any) {
        // console.log(index, item)
        this.$confirm('确认删除吗？', '提示', {})
          .then(async () => {
            const { data } = await DelRolesInfo(role.id)
            if (data.code === '000000') {
              this.$message.info('删除成功')
              // 更新数据
              this.LoadGetRole()
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
