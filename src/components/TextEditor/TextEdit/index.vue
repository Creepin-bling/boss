<template>
  <div ref="editor" class="text-edit"></div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import E from 'wangeditor'
  import { uploadCourseImage } from '@/services/course'

  export default Vue.extend({
    name: 'TextEdit',
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    mounted() {
      this.initEditor()
    },
    methods: {
      initEditor() {
        const editor = new E(this.$refs.editor as any)
        // 事件监听必须在create之前
        editor.config.onchange = (value: string) => {
          this.$emit('input', value)
        }
        editor.create()
        editor.txt.html(this.value)

        editor.config.customUploadImg = async function (resultFiles: any, insertImgFn: any) {
          const fd = new FormData()
          fd.append('file', resultFiles[0])
          const { data } = await uploadCourseImage(fd)
          // console.log(resultFiles, insertImgFn)
          console.log(data)
          insertImgFn(data.data.name)
        }
      }
    }
  })
</script>

<style lang="scss" scoped>
</style>
