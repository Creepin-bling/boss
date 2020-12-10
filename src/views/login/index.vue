<template>
  <div class="login">
    <h1 class="title">欢迎登录</h1>
    <!--
       :model="ruleForm"
      :rules="rules"
      ref="ruleForm"  -->
    <el-form :rules="rules" class="login-form" label-position="top" ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="isLoginLoading" class="login-btn" type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Form } from 'element-ui'
  import { login } from '@/services/user'
  export default Vue.extend({
    name: 'LoginIndex',
    data() {
      return {
        form: {
          phone: '',
          password: ''
        },
        rules: {
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { pattern: /^1\d{10}$/, message: '手机号格式错误', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在6~16个字符之间,包含字母和数字', trigger: 'blur' }
          ]
        },
        isLoginLoading: false

      }
    },
    methods: {
      async onSubmit() {
        try {
          (this.$refs.form as Form).validate()
          // 验证通过

          this.isLoginLoading = true
          const { data } = await login(this.form)

          if (data.state !== 1) {
            this.$message.error(data.message)
          } else {
            // 记录登录状态，这个状态需要全局获取访问（放到vuex容器中）
            this.$store.commit('setUser', data.content)
            // 在首页判断有没有登录。如果没有，则跳转到首页
            // 成功 跳转到首页
            this.$router.push(this.$route.query.redirect as string || '/')
            /* this.$router.push({
              name: 'home'
            }) */
            this.$message.success('登陆成功')
          }
          // console.log('submit!')
        } catch (err) {
          console.log('登录失败', err)
        }
        this.isLoginLoading = false
      }
    }
  })
</script>

<style lang="scss" scoped>
  .login {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .login-form {
    background: #fff;
    padding: 40px;
    width: 300px;
  }

  .login-btn {
    width: 100%;
  }

  .title {
    text-shadow: 1px 1px 1px #000;
    color: rgb(133, 134, 127);
  }
</style>
