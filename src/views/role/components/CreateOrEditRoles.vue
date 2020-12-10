<template>
  <div class="editOrCreat">
    <el-form :model="roles">
      <el-form-item label="角色名称">
        <el-input required='true' v-model="roles.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色编码">
        <el-input v-model="roles.code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="roles.description" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('cancel')">取 消</el-button>
      <el-button @click="onSubmit" type="primary">确 定</el-button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { saveOrUpdate, getRoleById } from '@/services/roles'
  export default Vue.extend({
    name: 'CreateOrEDR',
    data() {
      return {
        roles: {
          name: '',
          code: '',
          description: ''
        }
      }
    },
    props: {
      roleId: {
        type: [String, Number] // Vue中props的类型校验
      },
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    created() {
      // 如果是编辑操作，则根据角色id加载展示角色信息
      if (this.isEdit) {
        console.log('编辑操作')
        this.loadRole()
      }
    },
    methods: {
      async onSubmit() {
        const { data } = await saveOrUpdate(this.roles)
        this.$message.success('添加成功')
        this.$emit('success')
      },
      async loadRole() {
        const { data } = await getRoleById(this.roleId)
        this.roles = data.data
      }
    }
  })
</script>

<style lang="scss" scoped></style>
