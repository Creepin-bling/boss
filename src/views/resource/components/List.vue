<template>
  <div class="resource">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>资源管理</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>

      <el-form :inline="true" :model="form" ref='form' class="demo-form-inline">
        <el-form-item prop="name" label="资源名称">
          <el-input v-model="form.name" placeholder="资源名称"></el-input>
        </el-form-item>
        <el-form-item prop="url" label="资源路径">
          <el-input v-model="form.url" placeholder="资源路径"></el-input>
        </el-form-item>
        <el-form-item prop="categoryId" label="资源分类">
          <el-select v-model="form.categoryId" placeholder="请选择资源分类" clearable>
            <el-option v-for="item in CategoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="isLoading" @click="onReset">重置</el-button>
          <el-button :disabled="isLoading" type="primary" @click="onSubmit">查询搜索</el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="isLoading" :data="resourceData" style="width: 100%;margin-bottom: 40px;">
        <el-table-column type="index" label="编号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="资源名称" width="180">
        </el-table-column>
        <el-table-column prop="url" label="资源路径">
        </el-table-column>
        <el-table-column prop="description" label="描述">
        </el-table-column>
        <el-table-column prop="createdTime" label="添加时间">
        </el-table-column>
        <el-table-column label="操作">
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </el-table-column>
      </el-table>
      <el-pagination :disabled="isLoading" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="form.current" :page-sizes="[5,10,20]" :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  // import dayjs from 'dayjs'
  import { GetAllCategoryPages, GetAllCategory } from '@/services/resource'
  import { Form } from 'element-ui'
  export default Vue.extend({
    name: 'ResourceIndex',
    data() {
      return {
        form: {
          name: '',
          region: '',
          url: '',
          resource: '',
          desc: '',
          current: 1,
          size: 10,
          categoryId: null
        },
        isLoading: true,
        totalCount: 0,
        resourceData: [],
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        CategoryList: []
      }
    },
    created() {
      this.LoadResourceList()
      this.loadCategory()
    },
    methods: {
      async LoadResourceList() {
        this.isLoading = true
        const { data } = await GetAllCategoryPages({
          // 查询条件
          name: this.form.name,
          current: this.form.current,
          size: this.form.size,
          url: this.form.url,
          categoryId: this.form.categoryId
        })

        this.resourceData = data.data.records
        this.totalCount = data.data.total
        this.isLoading = false

        // console.log(data)
      },
      async loadCategory() {
        const { data } = await GetAllCategory()
        console.log(data)
        this.CategoryList = data.data
      },

      onSubmit() {
        // 查询
        this.LoadResourceList()
        this.form.current = 1
      },
      onReset() {
        (this.$refs.form as Form).resetFields()
        this.form.current = 1
        this.LoadResourceList()
      },
      handleSizeChange(val: any) {
        console.log(`每页 ${val} 条`)
        this.form.size = val
        this.form.current = 1
        this.LoadResourceList()
      },
      handleCurrentChange(val: any) {
        // console.log(`当前页: ${val}`)
        this.form.current = val
        this.LoadResourceList()
      }
    }
  })
</script>

<style lang="scss" scoped></style>
