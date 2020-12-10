<template>
  <div class="menu-create">
    <el-card class="box-card">
      <div class="clearfix" slot="header">
        <span>{{isEdit?'编辑菜单':'添加菜单'}}</span>
      </div>
      <el-form :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.parentId" placeholder="请选择上级菜单区域">
            <el-option :value="-1" label="无上级菜单"></el-option>
            <el-option :label="item.name" v-for="item in parentMenuList" :key="item.id" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label=" 描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>

        <el-form-item label="是否显示">
          <el-radio-group v-model="form.shown">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input type="textarea" v-model="form.orderNum"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button v-if="!isEdit">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>

</template>

<script lang="ts">
  import Vue from 'vue'
  import { createMenu, getEditMenuInfo } from '@/services/menu'
  import { Form } from 'element-ui'
  export default Vue.extend({
    name: 'menuCreate',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        form: {
          parentId: -1,
          name: '',
          href: '',
          icon: '',
          orderNum: 0,
          description: '',
          shown: false
        },
        parentMenuList: [],
        rules: {
          parentId: [
            { required: false, message: '请输入手机号', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          href: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          icon: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          orderNum: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { pattern: /^1\d{10}$/, message: '手机号格式错误', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ],
          shown: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ]
        }
      }
    },
    created() {
      this.loadMenuInfo()
    },
    methods: {
      async loadMenuInfo() {
        // route相当于当前正在跳转的路由对象
        const { data } = await getEditMenuInfo(this.$route.params.id || -1)
        if (data.data.menuInfo) {
          this.form = data.data.menuInfo
        }

        if (data.code === '000000') {
          this.parentMenuList = data.data.parentMenuList
        }
        console.log(data)
      },
      async onSubmit() {
        try {
          (this.$refs.form as Form).validate()
          // 验证通过，提交表单
          console.log('submit!')
          const { data } = await createMenu(this.form)
          console.log(data)
          this.$router.back()
        } catch (error) {
          console.log('登录失败', error)
        }
        // 表单验证
      }

    }
  })
</script>

<style lang="scss" scoped></style>
