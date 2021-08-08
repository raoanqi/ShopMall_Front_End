<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mg-t-10">
      <v-chart class="chart" :option="option"></v-chart>
    </el-card>
  </div>
</template>

<script>
import {use} from 'echarts/core'
import {CanvasRenderer} from 'echarts/renderers'
import {LineChart} from 'echarts/charts'
import {TitleComponent, GridComponent, TooltipComponent, LegendComponent} from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent
])

export default {
  name: "Reports",
  components: {
    VChart
  },
  data() {
    return {
      option: {
        title: {
          text: '销售数据统计',
          left: 'left'
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {},
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {},
        series: []
      }
    }
  },
  methods: {
    async getReportData() {
      try {
        const {data: res} = await this.$http.get(`reports/type/1`)
        console.log(res)
        this.option.xAxis.data = res.data.xAxis[0].data
        this.option.yAxis = res.data.yAxis[0]
        this.option.legend = res.data.legend
        this.option.series = res.data.series
      } catch (error) {
        this.$catchHttpError(error)
      }
    }
  },
  created() {
    this.getReportData()
  }
}
</script>

<style lang="less" scoped>
.chart {
  width: 100%;
  height: 500px;
}
</style>