<template>
  <div class="user">
    <el-card>
      <el-form :label-position="labelPosition" label-width="800px" :model="formLabelAlign">
        <el-form-item label="手机号">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>

      </el-form>
      <div>
        <el-date-picker style="margin-right: 40px;" v-model="value1" type="daterange" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary">重置</el-button>
        <el-button>查询</el-button>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { getUserPages } from '@/services/user'
  export default Vue.extend({
    // import dayjs from 'dayjs'
    name: 'useralloc',
    props: {
      userId: {
        type: [String, Number],
        required: true
      }
    },
    data() {
      return {
        labelPosition: 'top',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    created() {
      this.loadGetUser()
    },
    methods: {
      async loadGetUser() {
        const { data } = await getUserPages({})
        console.log('1111', data)
      }
    }
  })
</script>

<style lang="scss" scoped></style>
