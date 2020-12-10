<template>
  <div class="list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>角色管理</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>

      <el-form :inline="true" :model="form" ref='form' class="demo-form-inline">
        <el-form-item prop="name" label="手机号">
          <el-input v-model="form.number" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item>
          <el-date-picker v-model="form.startDate" type="daterange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>

        </el-form-item>
        <el-form-item>

          <el-button>查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="UserPageList" style="width: 100%;margin-bottom: 40px;">
        <el-table-column prop="id" label="用户id" width="180">
        </el-table-column>
        <el-table-column prop="name" label="头像" width="80">
          <template slot-scope="scope">
            <img width="30px"
              :src="scope.row.portrait || 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'">
          </template>
        </el-table-column>

        <el-table-column prop="phone" label="手机号">
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间">
        </el-table-column>
        <el-table-column prop="status" label="状态">
        </el-table-column>
        <el-table-column label="操作">

          <template slot-scope="scope">
            <el-button type="text">禁用</el-button>
            <el-button @click="loadGetAllRoles(scope.row)" type="text">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="分配角色" :visible.sync="dialogVisible" width="50%">
        <el-select v-model="roleIdList" multiple placeholder="请选择">
          <el-option v-for="item in allRoles" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="form.current" :page-sizes="[5, 10, 20]" :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import createOrEdit from './components/CreateOrEditRoles.vue'
  import { getRolePages, DelRolesInfo, getAllRoles, getUserRole, allocateUserRoles } from '@/services/roles'
  import { getUserPages } from '@/services/user'

  export default Vue.extend({
    name: 'UserList',
    data() {
      return {
        dialogVisible: false,
        form: {
          name: '',
          number: '',
          current: 1,
          size: 5,
          startDate: '',
          endDate: ''
        },
        userId: 0,
        roleIdList: [],
        total: null,
        UserPageList: [],
        currentPage4: 4,
        allRoles: [],
        currentUser: null
      }
    },
    created() {
      this.loadGetUserInfo()
    },
    methods: {
      async loadGetUserInfo() {
        const { data } = await getUserPages(this.form)
        console.log(data)
        this.UserPageList = data.data.records
        this.total = data.data.total
      },
      handleSizeChange(val) {
        this.form.size = val
        this.form.current = 1
        this.loadGetUserInfo()
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.form.current = val
        this.loadGetUserInfo()
      },

      async loadGetAllRoles(role: any) {
        this.currentUser = role
        // 加载角色列表
        const { data } = await getAllRoles()
        this.allRoles = data.data
        // console.log(data)

        const { data: { data: userRoles } } = await getUserRole((this.currentUser as any).id)
        this.roleIdList = userRoles.map((item: any) => item.id)
        console.log(this.roleIdList)
        // 展示对话框
        this.dialogVisible = true
      },
      async handleAllocRole() {
        await allocateUserRoles({
          userId: (this.currentUser as any).id,
          roleIdList: this.roleIdList
        })
        this.$message.success('操作成功')
        this.dialogVisible = false
      }
    }
  })
</script>

<style lang="scss" scoped>

</style>
