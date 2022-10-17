<template>
  <div>
    <el-row>
      <tag-top contentText="历史数据"></tag-top>
      <!-- <el-col :span="24"><div class="grid-content bg-purple-dark" align="left">历史数据</div></el-col> -->
      <el-col :span="24">
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" align="left">
          <el-form-item align="left" label="子站名:" prop="station">
            <el-select v-model="ruleForm.station" placeholder="请选择">
              <el-option v-for="item in stations" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item align="left" label="测量数据类型:" prop="datatype">
            <el-select v-model="ruleForm.datatype" placeholder="请选择">
              <el-option v-for="item in itemdatatype" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item align="left" label="时间范围:" prop="timescope">
            <el-radio-group v-model="ruleForm.timescope" size="small" @change="getDataByScope">
              <el-radio-button label="1">前1个月</el-radio-button>
              <el-radio-button label="2">前2个月</el-radio-button>
              <el-radio-button label="3">前3个月</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <div>
            <el-form-item align="left" label="起始时间:" prop="value1">
              <el-date-picker v-model="ruleForm.value1" type="datetime" format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择初始日期时间" align="right" :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <el-form-item align="left" label="结束时间:" prop="value1">
              <el-date-picker v-model="ruleForm.value2" type="datetime" format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束日期时间" align="right" :picker-options="pickerOptions">
              </el-date-picker>
              <el-button @click="gethistorydata('ruleForm')">查询</el-button>
              <el-button type="success" @click="exportToExcel">导出excel</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-col>
    </el-row>
    <div id="myChart" :style="{width: '1500px', height: '500px'}"></div>
  </div>
</template>

<script>
import TagTop from "../components/TagTop.vue";

export default {
  name: "HistoryData",
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: "今天",
          onClick(picker) {
            picker.$emit("pick", new Date());
          }
        }, {
          text: "昨天",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit("pick", date);
          }
        }, {
          text: "一周前",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", date);
          }
        }]
      },
      ruleForm: {
        station: "",
        datatype: "",
        timescope: "",
        value1: "",
        value2: ""
      },
      //rules校验的是el-form-item标签中的prop属性
      rules: {
        station: [
          { required: true, message: "请选择一个子站", trigger: "change" }
        ],
        datatype: [
          { required: true, message: "请选择一种数据类型", trigger: "change" }
        ],
        timescope: [
          { required: false }
        ],
        value1: [
          { required: false }
        ],
        value2: [
          { required: false }
        ]
      },
      items: {},
      griddata: {},
      stations: [],
      itemdatatype: [{
        value: "1#流量",
        label: "1#流量"
      }, {
        value: "1#累计流量",
        label: "1#流量计累计流量",
      }, {
        value: "2#流量",
        label: "2#流量",
      }, {
        value: "CPT",
        label: "CPT压力",
      }, {
        value: "DPT1",
        label: "DPT1压力",
      }, {
        value: "ETLT",
        label: "ELTL无线液位",
      }, {
        value: "P1T1",
        label: "P1T1温度",
      }, {
        value: "SPT1",
        label: "SPT1压力",
      }, {
        value: "STLT",
        label: "STLT液位",
      }],
    };
  },
  methods: {
    async getstation() {
      const res = await this.$http.get("/rest/getstation");
      const temp = res.data.stations;
      for (let i = 0; i < temp.length; i++) {
        this.stations.push({
          label: temp[i],
          value: temp[i]
        });
      }
    },
    gethistorydata() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const res = await this.$http.post("/rest/historydata", this.ruleForm);
          this.$message({
            type: "success",
            message: "查询成功"
          });
          this.ruleForm.timescope = "";
          this.items = res.data.items;
          this.griddata = res.data.griddata;
          this.drawLine();
        }
        else {
          console.log("请填写完整信息!");
          return false;
        }
      });
    },
    getDataByScope() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let id = this.ruleForm.timescope;
          const res = await this.$http.post(`/rest/historydata/${id}`, this.ruleForm);
          this.$message({
            type: "success",
            message: "查询成功"
          });
          this.ruleForm.value1 = "";
          this.ruleForm.value2 = "";
          this.items = res.data.items;
          this.griddata = res.data.griddata;
          this.drawLine();
        }
        else {
          console.log("请填写完整信息!");
          return false;
        }
      });
    },
    drawLine() {
      let _that = this;
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let option = {
        title: {
          show: true,
          text: _that.griddata.station,
          subtext: _that.griddata.measurement,
          left: "center",
          top: 0,
          textStyle: {
            color: "#333",
            fontStyle: "normal",
            fontSize: 18
          }
        },
        legend: {
          type: "scroll",
          scrollDataIndex: 0
        },
        tooltip: {
          //返回数据点信息
        },
        dataZoom: [{
          type: "slider",
          show: true,
          xAxisIndex: [0],
          start: 0,
          end: 100
        }, {
          type: "inside",
          filterMode: "filter",
          orient: "horizontal",
          show: true,
          start: 0,
          end: 100 //结束值为100%
        }],
        xAxis: {
          type: "category",
          name: "时间",
          nameLocation: "end",
          boundaryGap: false,
          data: _that.griddata.Xdate
        },
        yAxis: {
          name: _that.griddata.unit,
          nameLocation: "end",
        },
        series: {
          type: "line",
          data: _that.griddata.Ydata
        },
        grid: {
          show: true,
          top: 100 /*,
                    height: 'auto',
                    width:'auto'*/
          /*right: '10%'
          bottom = '10%'*/
        },
        toolbox: {
          showTitle: true,
          feature: {
            saveAsImage: {},
            magicType: { type: ["line", "bar"] },
            restore: {},
          }
        }
      };
      myChart.setOption(option, true);
      window.addEventListener("resize", function () { myChart.resize(); });
    },
    exportToExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../util/Export2Excel");
        const tHeader = [
          "站点",
          "测量数据类型",
          "时间",
          "数据",
          "单位"
        ];
        const filterVal = [
          "station",
          "measurement",
          "date",
          "data",
          "unit"
        ];
        const list = this.items;
        const data = this.formatJson(filterVal, list);
        console.log(data);
        export_json_to_excel(tHeader, data, "子站" + this.items[0].station + ":" + this.items[0].measurement + "数据结果");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  },
  created() {
    this.getstation();
  },
  components: { TagTop }
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
