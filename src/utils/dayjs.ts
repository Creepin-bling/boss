
import dayjs from 'dayjs'
import Vue from 'vue/types/umd'
Vue.filter('date', (value: any) => {
  return dayjs(value).format('YYYY-MM-DD')
})
