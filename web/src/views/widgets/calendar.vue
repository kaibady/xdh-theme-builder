<template>
  <div>
    <preview title="基础用法">
      <xdh-calendar v-model="date1">
        <template slot="day-content" slot-scope="scope">
          <div v-if="scope.day === 1">特别的日子：<p>{{parseDate(scope.date)}}</p></div>
        </template>
        <template slot="month-content" slot-scope="scope">
          <div v-if="scope.month%2===0">
            特别的月份
          </div>
        </template>
      </xdh-calendar>
    </preview>
  </div>
</template>

<script>
  import XdhCalendar from '@/widgets/xdh-calendar'
  import date from '@/utils/date'

  export default {
    components: {
      XdhCalendar
    },
    data() {
      return {
        date1: new Date()
      }
    },
    methods: {
      parseDate(dateStr) {
        return date(dateStr, 'yyyy/MM/dd')
      }
    }
  }
</script>

<style scoped>

</style>
