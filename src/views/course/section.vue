<template>
  <div class="course-section">
    <template>
      <span>返回</span>
    </template>
    <el-card>
      <div slot="header">课程名称</div>
      <el-tree draggable :data="lessonList" :props="defaultProps" @node-drop="handleSort" :allow-drop="handleAllowDrop"
        @node-click="handleNodeClick">
        <div class="inner" slot-scope="{node,data}">
          <span>{{node.label}}</span>
          <span v-if="data.sectionName" class="action">
            <el-button>编辑</el-button>
            <el-button>添加课时</el-button>
            <el-button>状态</el-button>
          </span>

          <span v-else class="action">
            <el-button>编辑</el-button>
            <el-button @click="$router.push({
              name:'course-video',
              params:{
                courseId:courseId
              },
              query:{
                sectionId:node.parent.id,
                lessonId:data.id
              }
            })">上传视频</el-button>
            <el-button>状态</el-button>
          </span>
        </div>
      </el-tree>
    </el-card>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { getSectionAndLesson, saveOrUpdateSection } from '@/services/course-section'

  export default Vue.extend({
    name: 'CourseSection',
    props: {
      courseId: {
        type: [String, Number],
        required: true
      }
    },
    data() {
      return {
        defaultProps: {
          children: 'lessonDTOS',
          label(data: any) {
            return data.sectionName || data.theme
          }
        },
        lessonList: []
      }
    },
    created() {
      this.loadGetLesson()
    },
    methods: {
      handleNodeClick(data: any) {
        console.log(data)
      },
      async loadGetLesson() {
        const { data } = await getSectionAndLesson(this.courseId)
        console.log(data)
        this.lessonList = data.data
      },
      handleAllowDrop(draggingNode: any, dropNode: any, type: any) {
        // draggingNode 拖动的节点
        // dropNode 放置的目标节点
        // type:放置位置
        // console.log(draggingNode, dropNode, type)
        return draggingNode.data.sectionId === dropNode.data.sectionId && type !== 'inner'
      },
      async handleSort(draggingNode: any, dropNode: any, type: any, event: any) {
        try {
          await Promise.all(dropNode.parent.childNodes.map((item: any, index: number) => {
            if (dropNode.data.lessonDTOS) {
              return saveOrUpdateSection({
                id: item.data.id,
                orderNum: index
              })
            } else {
              return saveOrUpdateSection({
                id: item.data.id,
                orderNum: index
              })
            }
          }))
          this.$message.success('排序成功')
        } catch (error) {
          console.log(error)
          this.$message.error('排序失败')
        }
      }
    }
  })
</script>

<style lang="scss" scoped>
  .inner {
    flex: 1;
    display: flex;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #fff;
  }

  ::v-deep .el-tree-node__content {
    height: auto;
  }
</style>
