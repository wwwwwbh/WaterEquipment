<template>
  <div>
    <tag-top contentText="实时报警"></tag-top>
    <div align="left">
      起始时间:
      <el-date-picker v-model="model.value1" align="right" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
        placeholder="选择日期" :picker-options="pickerOptions">
      </el-date-picker>
      结束时间:
      <el-date-picker v-model="model.value2" align="right" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
        placeholder="选择日期" :picker-options="pickerOptions">
      </el-date-picker>
      <el-input v-model="model.info" placeholder="请输入故障详情" style="width: 15%"></el-input>
      <el-button @click="getinfobydate">查询</el-button>
    </div>
    <div>
      <el-table :data="items" style="width: 100%">
        <el-table-column prop="date" label="时间" width="250">
        </el-table-column>
        <el-table-column prop="station" label="站点" width="250">
        </el-table-column>
        <el-table-column prop="details" label="故障详情" width="450">
        </el-table-column>
        <el-table-column prop="status" label="状态">
        </el-table-column>
        <el-table-column prop="operator" label="操作员">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoryAlarm',
  data() {
    return {
      items: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      model: {
        value1: '',
        value2: '',
        info: ''
      }
    }
  },

  methods: {
    async fetch() {
      const res = await this.$http.get('/rest/historywarninginfos')
      this.items = res.data
    },
    async getinfobydate() {
      const res = await this.$http.post('/rest/historywarninginfos', this.model)
      //这句话的意思是跳转
      //this.$router.push('/rest/historywarninginfos/date')
      this.$message({
        type: 'success',
        message: '查询成功'
      })
      this.items = res.data
    }
  },
  created() {
    this.fetch()
  }
}

</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
