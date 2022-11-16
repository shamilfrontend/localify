<template>
  <div class="project-statistics">
    <el-card class="project-statistics__card">
      <div slot="header">
        <span>По участникам</span>
      </div>

      <client-only>
        <bar-chart
          :chart-data="barChartData"
          :options="barChartOptions"
          :height="200"
        />
      </client-only>
    </el-card>
  </div>
</template>

<script>
import BarChart from '@/components/BarChart'

const labels = [
  'Shamil Alisultanov',
  'Anvar Abduragimov',
  'Akhmed M',
  'Rahman',
  'Mahmudov97',
  'Ramazanov91',
  'Rustam'
]

const chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
}

export default {
  name: 'ProjectStatistics',

  components: {
    BarChart
  },

  data() {
    return {
      barChartData: {
        labels,
        datasets: [
          {
            label: 'Переведено ключей',
            backgroundColor: [
              chartColors.red,
              chartColors.orange,
              chartColors.yellow,
              chartColors.green,
              chartColors.blue,
              chartColors.purple,
              chartColors.grey
            ],
            data: [100, 15, 67, 81, 18, 96, 90]
          }
        ]
      },

      barChartOptions: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.project-statistics {
  //
}
</style>
