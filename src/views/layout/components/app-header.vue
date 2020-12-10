<template>
  <div class="header">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar shape="square" :size="30"
          :src="userInfo.portrait||'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'">
        </el-avatar><i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{userInfo.userName}}</el-dropdown-item>
        <el-dropdown-item divided @click.native="handleLogout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>

</template>

<script lang="ts">
  import Vue from 'vue'
  // import store from '@/store'
  import { getUserInfo } from '@/services/user'
  export default Vue.extend({
    name: 'Appheader',
    data() {
      return {
        userInfo: {} // 当前用户登录信息
      }
    },
    created() {
      this.LoadUserInfo()
    },
    methods: {
      async LoadUserInfo() {
        const { data } = await getUserInfo()
        // console.log(data)
        this.userInfo = data.content
      },
      handleLogout() {
        this.$confirm('确认退出吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 清除登录状态
          this.$store.commit('setUser', null)
          // 跳转到登录
          this.$router.push({
            name: 'login'
          })
          this.$message({
            type: 'success',
            message: '退出成功!请登录'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
      }
    }

  })
</script>
<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: space-between;
  }

  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
</style>
