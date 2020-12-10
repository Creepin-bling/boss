<template>
  <div>
    <el-card>
      <div slot="header">
        <span>课程</span>
      </div>
      <el-form>
        <el-form-item label="视频上传">
          <input ref="video-file" type="file" name="" id="">
        </el-form-item>
        <el-form-item label="封面上传">
          <input ref="image-file" type="file" name="" id="">
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUpload">开始上传</el-button>
          <el-button click="$router.back()">返回</el-button>
        </el-form-item>
        <el-form-item>
          <p>视频上传中：{{upLoadPercent}}%</p>
          <p v-if="isUploadSuccess">视频转码中：{{isTransCodeSuccess?'完成' : '请稍后'}}</p>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { aliyunImagUploadAddressAdnAuth, aliyunVideoUploadAddressAdnAuth, aliyunTransCode, aliyunTransCodePercent } from '@/services/aliyun-upload'
  export default Vue.extend({
    name: 'courseVideo',
    data() {
      return {
        uploader: null,
        imageUrl: '',
        videoId: null,
        fileName: '',
        upLoadPercent: 0,
        isUploadSuccess: false,
        isTransCodeSuccess: false
      }
    },
    computed: {
      video() {
        return this.$refs['video-file']
      },
      image() {
        return this.$refs['image-file']
      }
    },
    created() {
      this.initUploader()
    },
    methods: {
      initUploader() {
        this.uploader = new window.AliyunUpload.Vod({
          // 阿里账号ID，必须有值 ，值的来源https://help.aliyun.com/knowledge_detail/37196.html
          userId: 1618139964448548,
          // 上传到点播的地域， 默认值为'cn-shanghai',//eu-central-1,ap-southeast-1
          region: '',
          // 分片大小默认1M，不能小于100K
          partSize: '',
          // 并行上传分片个数，默认5
          parallel: 5,
          // 网络原因失败时，重新上传次数，默认为3
          retryCount: 3,
          // 网络原因失败时，重新上传间隔时间，默认为2秒
          retryDuration: 2,
          // 开始上传
          onUploadstarted: async (uploadInfo: any) => {
            console.log(uploadInfo, 'onUploadstarted')
            // 1.通过我们的后端获取上传文件的凭证

            let uploadAddressAndAuth
            if (uploadInfo.isImage) {
              // 获取图片上传凭证
              const { data } = await aliyunImagUploadAddressAdnAuth()
              console.log(data)
              uploadAddressAndAuth = data.data
              this.imageUrl = data.data.imageUrl
            } else {
              // 获取视频
              const { data } = await aliyunVideoUploadAddressAdnAuth({
                fileName: uploadInfo.file.name,
                imageUrl: this.imageUrl
              })
              uploadAddressAndAuth = data.data
              this.videoId = uploadAddressAndAuth.videoId
              // console.log(data)
            }
            // 2.调用uploader.setUploadAuthAndAddress设置上传凭证
            ; (this.uploader as any).setUploadAuthAndAddress(uploadInfo, uploadAddressAndAuth.uploadAuth,
              uploadAddressAndAuth.uploadAddress,
              uploadAddressAndAuth.imageId || uploadAddressAndAuth.videoId
            )
            // 3.设置好上传凭证后，上传进度开始
          },
          // 文件上传成功
          onUploadSucceed: function (uploadInfo: any) {
            console.log('onUploadSucceed', uploadInfo)
          },
          // 文件上传失败
          onUploadFailed: function (uploadInfo: any, code: any, message: any) {
            console.log('onUploadFailed')
          },
          // 文件上传进度，单位：字节
          onUploadProgress: (uploadInfo: any, totalSize: any, loadedPercent: any) => {
            // console.log(loadedPercent)
            if (!uploadInfo.isImage) {
              this.upLoadPercent = Math.floor(loadedPercent * 100)
            }
          },
          // 上传凭证超时
          onUploadTokenExpired: function (uploadInfo: any) {
            console.log('onUploadTokenExpired')
          },
          // 全部文件上传结束
          onUploadEnd: async (uploadInfo: any) => {
            // console.log('onUploadTokenExpired')
            this.isUploadSuccess = true
            const { data } = await aliyunTransCode({
              lessonId: this.$route.query.lessonId,
              coverImageUrl: this.imageUrl,
              fileName: ((this.image as any).files[0]).name,
              fileId: this.videoId
            })

            console.log('上传结束')
            // console.log(data)

            setInterval(async () => {
              const { data } = await
                aliyunTransCodePercent(this.$route.query.lessonId)
              console.log(data.data, '转码进度')
              if (data.data === 100) {
                this.isTransCodeSuccess = true
              }
            }, 3000)
          }
        })
      },
      handleUpload() {
        // 获取文件

        const imageFile = (this.image as any).files[0]
        const videoFile = (this.video as any).files[0]
        const uploader = this.uploader

          // console.log(videoFile)
          // console.log(imageFile, 111)

          ; (uploader as any).addFile(imageFile, null, null, null, '{"Vod":{}}')
          ; (uploader as any).addFile(videoFile, null, null, null, '{"Vod":{}}')

          // 开始上传
          ; (uploader as any).startUpload()
      }
    }
  })

</script>

<style lang="scss" scoped>
</style>
