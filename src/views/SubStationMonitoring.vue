<template>
  <div>
    <tag-top contentText="子站表"></tag-top>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(item,i) in stations" v-bind:key="i" :label="item" :name="item">
        <el-row v-if="online[i]" style="position: relative">
          <el-tag class=" tag2">{{item}}子站示意图</el-tag>
          <div style="position:relative">
            <div class="bgImg1" v-if="item === '杭州'"></div>
            <div class="bgImg2" v-if="item === '重庆'"></div>
            <div class="bgImg3" v-if="item === '山东'"></div>
            <div style="position: absolute;left: 17px; top: 552px">Suction Tank</div>
            <svg-icon icon-class="tank2" width="126.2px" height="149.9px"
              style="position: absolute;left: 0px; top: 400px;cursor: pointer"
              @click.native="showDialog('吸入罐SuctionTank',null,null,null)"></svg-icon>
            <div style="position: absolute;left: 90px; top: 377px">STLT</div>
            <svg-icon icon-class="TLT" width="39.6px" height="159px"
              style="position: absolute;left: 44px; top: 377px;cursor: pointer"
              @click.native="showDialog('吸入罐液位计STLT',threshold[pos].STLT.upper,threshold[pos].STLT.lower,threshold[pos].STLT.unit)">
            </svg-icon>
            <div style="position: absolute;left: 229px; top: 450px">SGOV1</div>
            <svg-icon icon-class="SGOV" width="50px" height="50px"
              style="position: absolute;left: 230px; top: 396px;cursor: pointer"
              @click.native="showDialog('吸入管路压力调节阀SGOV1',null,null,null)"></svg-icon>
            <div style="position: absolute;left: 229px; top: 338px">SGOV2</div>
            <svg-icon icon-class="SGOV" width="50px" height="50px"
              style="position: absolute;left: 230px; top: 285px;cursor: pointer"
              @click.native="showDialog('吸入管路压力调节阀SGOV2',null,null,null)"></svg-icon>
            <div v-if="item !== '山东'" style="position: absolute;left: 229px; top: 221px">SGOV3</div>
            <svg-icon v-if="item !== '山东'" icon-class="SGOV" width="50px" height="50px"
              style="position: absolute;left: 230px; top: 173px;cursor: pointer"
              @click.native="showDialog('吸入管路压力调节阀SGOV3',null,null,null)"></svg-icon>
            <div v-if="item === '重庆'" style="position: absolute;left: 229px; top: 115px">SGOV4</div>
            <svg-icon v-if="item === '重庆'" icon-class="SGOV" width="50Px" height="50px"
              style="position: absolute;left: 230px; top: 62px;cursor: pointer"
              @click.native="showDialog('吸入管路压力调节阀SGOV4',null,null,null)"></svg-icon>
            <div style="position: absolute;left: 349px; top: 400px">SPT1</div>
            <svg-icon icon-class="PT" width="43.3px" height="50px"
              style="position: absolute;left: 310px; top: 390px;cursor: pointer"
              @click.native="showDialog('吸入管路压力传感器SPT1',threshold[pos].SPT.upper,threshold[pos].SPT.lower,threshold[pos].SPT.unit)">
            </svg-icon>
            <div style="position: absolute;left: 349px; top: 288px">SPT2</div>
            <svg-icon icon-class="PT" width="43.3px" height="50px"
              style="position: absolute;left: 310px; top: 279px;cursor: pointer"
              @click.native="showDialog('吸入管路压力传感器SPT2',threshold[pos].SPT.upper,threshold[pos].SPT.lower,threshold[pos].SPT.unit)">
            </svg-icon>
            <div v-if="item !== '山东'" style="position: absolute;left: 349px; top: 177px">SPT3</div>
            <svg-icon v-if="item !== '山东'" icon-class="PT" width="43.3px" height="50px"
              style="position: absolute;left: 310px; top: 167px;cursor: pointer"
              @click.native="showDialog('吸入管路压力传感器SPT3',threshold[pos].SPT.upper,threshold[pos].SPT.lower,threshold[pos].SPT.unit)">
            </svg-icon>
            <div v-if="item === '重庆'" style="position: absolute;left: 349px; top: 66px">SPT4</div>
            <svg-icon v-if="item === '重庆'" icon-class="PT" width="43.3px" height="50px"
              style="position: absolute;left: 310px; top: 57px;cursor: pointer"
              @click.native="showDialog('吸入管路压力传感器SPT4',threshold[pos].SPT.upper,threshold[pos].SPT.lower,threshold[pos].SPT.unit)">
            </svg-icon>
            <div style="position: absolute;left: 400px; top: 440px">PUMP1</div>
            <svg-icon icon-class="h_pump" width="50px" height="36.4px"
              style="position: absolute;left: 400px; top: 403px;cursor: pointer"
              @click.native="showDialog('水泵Pump1',null,null,null)"></svg-icon>
            <div style="position: absolute;left: 400px; top: 333px">PUMP2</div>
            <svg-icon icon-class="h_pump" width="50px" height="36.4px"
              style="position: absolute;left: 400px; top: 293px;cursor: pointer"
              @click.native="showDialog('水泵Pump2',null,null,null)"></svg-icon>
            <div v-if="item !== '山东'" style="position: absolute;left: 400px; top: 216px">PUMP3</div>
            <svg-icon v-if="item !== '山东'" icon-class="h_pump" width="50px" height="36.4px"
              style="position: absolute;left: 400px; top: 181px;cursor: pointer"
              @click.native="showDialog('水泵Pump3',null,null,null)"></svg-icon>
            <div v-if="item === '重庆'" style="position: absolute;left: 400px; top: 105px">PUMP4</div>
            <svg-icon v-if="item === '重庆'" icon-class="h_pump" width="50px" height="36.4px"
              style="position: absolute;left: 400px; top: 70px;cursor: pointer"
              @click.native="showDialog('水泵Pump4',null,null,null)"></svg-icon>
            <div style="position: absolute;left: 562px; top: 400px">DPT1</div>
            <svg-icon icon-class="PT" width="43.3px" height="50px"
              style="position: absolute;left: 525px; top: 390px;cursor: pointer"
              @click.native="showDialog('压差传感器DPT1',threshold[pos].DPT.upper,threshold[pos].DPT.lower,threshold[pos].DPT.unit)">
            </svg-icon>
            <div style="position: absolute;left: 562px; top: 288px">DPT2</div>
            <svg-icon icon-class="PT" width="43.3px" height="50px"
              style="position: absolute;left: 525px; top: 279px;cursor: pointer"
              @click.native="showDialog('压差传感器DPT2',threshold[pos].DPT.upper,threshold[pos].DPT.lower,threshold[pos].DPT.unit)">
            </svg-icon>
            <div v-if="item !== '山东'" style="position: absolute;left: 562px; top: 177px">DPT3</div>
            <svg-icon v-if="item !== '山东'" icon-class="PT" width="43.3px" height="50px"
              style="position: absolute;left: 525px; top: 167px;cursor: pointer"
              @click.native="showDialog('压差传感器DPT3',threshold[pos].DPT.upper,threshold[pos].DPT.lower,threshold[pos].DPT.unit)">
            </svg-icon>
            <div v-if="item === '重庆'" style="position: absolute;left: 562px; top: 66px">DPT4</div>
            <svg-icon v-if="item === '重庆'" icon-class="PT" width="43.3px" height="50px"
              style="position: absolute;left: 525px; top: 57px;cursor: pointer"
              @click.native="showDialog('压差传感器DPT4',threshold[pos].DPT.upper,threshold[pos].DPT.lower,threshold[pos].DPT.unit)">
            </svg-icon>
            <div style="position: absolute;left: 595px; top: 441px">DMOV1</div>
            <svg-icon icon-class="DMOV" width="34.1px" height="50px"
              style="position: absolute;left: 600px; top: 386px;cursor: pointer"
              @click.native="showDialog('电动阀门DMOV1',null,null,null)"></svg-icon>
            <div style="position: absolute;left: 595px; top: 338px">DMOV2</div>
            <svg-icon icon-class="DMOV" width="34.1px" height="50px"
              style="position: absolute;left: 600px; top: 276px;cursor: pointer"
              @click.native="showDialog('电动阀门DMOV2',null,null,null)"></svg-icon>
            <div v-if="item !== '山东'" style="position: absolute;left: 595px; top: 221px">DMOV3</div>
            <svg-icon v-if="item !== '山东'" icon-class="DMOV" width="34.1px" height="50px"
              style="position: absolute;left: 600px; top: 165px;cursor: pointer"
              @click.native="showDialog('电动阀门DMOV3',null,null,null)"></svg-icon>
            <div v-if="item === '重庆'" style="position: absolute;left: 595px; top: 115px">DMOV4</div>
            <svg-icon v-if="item === '重庆'" icon-class="DMOV" width="34.1px" height="50px"
              style="position: absolute;left: 600px; top: 56px;cursor: pointer"
              @click.native="showDialog('电动阀门DMOV4',null,null,null)"></svg-icon>
            <div style="position: absolute;left: 676px; top: 441px">CV1</div>
            <svg-icon icon-class="CV" width="50px" height="50px"
              style="position: absolute;left: 665px; top: 392px;cursor: pointer"
              @click.native="showDialog('压力调节阀CV1',null,null,null)"></svg-icon>
            <div style="position: absolute;left: 676px; top: 338px">CV2</div>
            <svg-icon icon-class="CV" width="50px" height="50px"
              style="position: absolute;left: 665px; top: 282px;cursor: pointer"
              @click.native="showDialog('压力调节阀CV2',null,null,null)"></svg-icon>
            <div v-if="item !== '山东'" style="position: absolute;left: 676px; top: 221px">CV3</div>
            <svg-icon v-if="item !== '山东'" icon-class="CV" width="50px" height="50px"
              style="position: absolute;left: 665px; top: 169px;cursor: pointer"
              @click.native="showDialog('压力调节阀CV3',null,null,null)"></svg-icon>
            <div v-if="item === '重庆'" style="position: absolute;left: 676px; top: 115px">CV4</div>
            <svg-icon v-if="item === '重庆'" icon-class="CV" width="50px" height="50px"
              style="position: absolute;left: 665px; top: 59px;cursor: pointer"
              @click.native="showDialog('压力调节阀CV4',null,null,null)"></svg-icon>
            <div style="position: absolute;left: 346px; top: 551px">Surge Anticipation Valve</div>
            <svg-icon icon-class="valve" width="50px" height="50px"
              style="position: absolute;left: 406px; top: 498px;cursor: pointer"
              @click.native="showDialog('喘振预测阀',null,null,null)"></svg-icon>
            <svg-icon icon-class="v_pump" width="31.1px" height="50px"
              style="position: absolute;left: 736px; top: 461px;cursor: pointer"
              @click.native="showDialog('垂直水泵',null,null,null)"></svg-icon>
            <div style="position: absolute;left: 824px; top: 501px">CPT</div>
            <svg-icon icon-class="PT" width="43.3px" height="50px"
              style="position: absolute;left: 785px; top: 493px;cursor: pointer"
              @click.native="showDialog('压差传感器CPT',threshold[pos].CPT.upper,threshold[pos].CPT.lower,threshold[pos].CPT.unit)">
            </svg-icon>
            <div style="position: absolute;left: 942px; top: 311px">Elvated Tank</div>
            <svg-icon icon-class="tank2" width="168.2px" height="199.8px"
              style="position: absolute;left: 900px; top: 113px;cursor: pointer"
              @click.native="showDialog('压力罐Elvated Tank',null,null,null)"></svg-icon>
            <div style="position: absolute;left: 1008px; top: 92px">ETLT</div>
            <svg-icon icon-class="TLT" width="52.8px" height="212px"
              style="position: absolute;left: 959PX; top: 83px;cursor: pointer"
              @click.native="showDialog('压力罐液位计ETLT',threshold[pos].ETLT.upper,threshold[pos].ETLT.lower,threshold[pos].ETLT.unit)">
            </svg-icon>
            <svg-icon icon-class="meter" width="34.3px" height="50px"
              style="position: absolute;left: 842px; top: 351px;transform: rotate(270deg);cursor: pointer"
              @click.native="showDialog('1#流量计',threshold[pos].FM1.upper,threshold[pos].FM1.lower,threshold[pos].FM1.unit)">
            </svg-icon>
            <svg-icon icon-class="meter" width="34.3px" height="50px"
              style="position: absolute;left: 1167px; top: 495px;cursor: pointer"
              @click.native="showDialog('2#流量计',threshold[pos].FM2.upper,threshold[pos].FM2.lower,threshold[pos].FM2.unit)">
            </svg-icon>
            <div style="position: absolute;left: 315px; top: 369px">{{realdata[pos].SPT[0].data |
            numFilter}}{{realdata[pos].SPT[0].unit}}</div>
            <div style="position: absolute;left: 315px; top: 257px">{{realdata[pos].SPT[1].data |
            numFilter}}{{realdata[pos].SPT[1].unit}}</div>
            <div v-if="item !== '山东'" style="position: absolute;left: 315px; top: 146px">{{realdata[pos].SPT[2].data |
            numFilter}}{{realdata[pos].SPT[2].unit}}</div>
            <div v-if="item === '重庆'" style="position: absolute;left: 315px; top: 37px">{{realdata[pos].SPT[3].data |
            numFilter}}{{realdata[pos].SPT[3].unit}}</div>
            <div style="position: absolute;left: 521px; top: 369px">{{realdata[pos].DPT[0].data |
            numFilter}}{{realdata[pos].DPT[0].unit}}</div>
            <div style="position: absolute;left: 521px; top: 257px">{{realdata[pos].DPT[1].data |
            numFilter}}{{realdata[pos].DPT[1].unit}}</div>
            <div v-if="item !== '山东'" style="position: absolute;left: 521px; top: 146px">{{realdata[pos].DPT[2].data |
            numFilter}}{{realdata[pos].DPT[2].unit}}</div>
            <div v-if="item === '重庆'" style="position: absolute;left: 521px; top: 37px">{{realdata[pos].DPT[3].data |
            numFilter}}{{realdata[pos].DPT[3].unit}}</div>
            <div style="position: absolute;left: 41px; top: 355px">{{realdata[pos].ETLT.data |
            numFilter}}{{realdata[pos].ETLT.unit}}</div>
            <div style="position: absolute;left: 793px; top: 474px">{{realdata[pos].CPT.data |
            numFilter}}{{realdata[pos].CPT.unit}}</div>
            <div style="position: absolute;left: 789px; top: 340px">{{realdata[pos].FM1.data |
            numFilter}}{{realdata[pos].FM1.unit}}</div>
            <div style="position: absolute;left: 1154px; top: 470px">{{realdata[pos].FM2.data |
            numFilter}}{{realdata[pos].FM2.unit}}</div>
            <div style="position: absolute;left: 961px; top: 62px">{{realdata[pos].STLT.data |
            numFilter}}{{realdata[pos].STLT.unit}}</div>
            <div style="position: absolute;left: 15px; top: 583px">STFM Total {{realdata[pos].STFM.data |
            numFilter}}{{realdata[pos].STFM.unit}}</div>
            <div style="position: absolute;left: 1141px; top: 583px">FMFM Total {{realdata[pos].FMFM.data |
            numFilter}}{{realdata[pos].FMFM.unit}}</div>
          </div>
        </el-row>
        <el-row v-if="!online[i]">
          <h1>子站建设中</h1>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="组态管理" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="设备名称" label-width="120px">{{ form.station }} {{ form.name }}</el-form-item>
        <el-form-item label="阈值上限" label-width="120px">{{ thresholdform.upper }} {{ thresholdform.unit }}</el-form-item>
        <el-form-item label="阈值下限" label-width="120px">{{ thresholdform.lower }} {{ thresholdform.unit }}</el-form-item>
        <el-form-item label="设备详情" label-width="120px" v-if="userinfo.type !== 2">
          <el-input v-model="form.details" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="danger" @click="alarm" v-if="userinfo.type !== 2">报警</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "SubStationMonitoring",
  data() {
    return {
      userinfo: {
        username: "",
        type: ""
      },
      dialogFormVisible: false,
      equipment: "",
      form: {
        station: "",
        name: "",
        details: ""
      },
      thresholdform: {
        upper: null,
        lower: null,
        unit: null
      },
      //该属性决定页面刷时展示的位置
      activeName: "重庆",
      pos: 1,
      stations: ["杭州", "重庆", "山东"],
      online: [1, 1, 1],
      realdata: [
        {
          SPT: [
            {
              data: null,
              unit: ""
            },
            {
              data: null,
              unit: ""
            },
            {
              data: null,
              unit: ""
            }
          ],
          DPT: [
            {
              data: null,
              unit: ""
            },
            {
              data: null,
              unit: ""
            },
            {
              data: null,
              unit: ""
            }
          ],
          STFM: {
            data: 1.0,
            unit: ""
          },
          FMFM: {
            data: 0.0,
            unit: ""
          },
          CPT: {
            data: 0.0,
            unit: ""
          },
          FM1: {
            data: 0.94,
            unit: ""
          },
          /* 1#流量 */
          FM2: {
            data: -2.01,
            unit: ""
          },
          /* 2#流量 */
          STLT: {
            data: 1.76,
            unit: ""
          },
          /* 吸入罐 */
          ETLT: {
            data: 1.46,
            unit: ""
          } /* 压力罐 */
        },
        {
          SPT: [
            {
              data: null,
              unit: ""
            },
            {
              data: null,
              unit: ""
            },
            {
              data: null,
              unit: ""
            },
            {
              data: null,
              unit: ""
            }
          ],
          DPT: [
            {
              data: null,
              unit: ""
            },
            {
              data: null,
              unit: ""
            },
            {
              data: null,
              unit: ""
            },
            {
              data: null,
              unit: ""
            }
          ],
          STFM: {
            data: 1.0,
            unit: ""
          },
          FMFM: {
            data: 0.0,
            unit: ""
          },
          CPT: {
            data: 0.0,
            unit: ""
          },
          FM1: {
            data: 0.94,
            unit: ""
          },
          /* 1#流量 */
          FM2: {
            data: -2.01,
            unit: ""
          },
          /* 2#流量 */
          STLT: {
            data: 1.76,
            unit: ""
          },
          /* 吸入罐 */
          ETLT: {
            data: 1.46,
            unit: ""
          } /* 压力罐 */
        },
        {
          SPT: [
            {
              data: null,
              unit: ""
            },
            {
              data: null,
              unit: ""
            }
          ],
          DPT: [
            {
              data: null,
              unit: ""
            },
            {
              data: null,
              unit: ""
            }
          ],
          STFM: {
            data: 1.0,
            unit: ""
          },
          FMFM: {
            data: 0.0,
            unit: ""
          },
          CPT: {
            data: 0.0,
            unit: ""
          },
          FM1: {
            data: 0.94,
            unit: ""
          },
          /* 1#流量 */
          FM2: {
            data: -2.01,
            unit: ""
          },
          /* 2#流量 */
          STLT: {
            data: 1.76,
            unit: ""
          },
          /* 吸入罐 */
          ETLT: {
            data: 1.46,
            unit: ""
          } /* 压力罐 */
        }
      ],
      threshold: [
        {
          STLT: {
            upper: null,
            lower: null,
            unit: "m"
          },
          ETLT: {
            upper: null,
            lower: null,
            unit: "m"
          },
          SPT: {
            upper: null,
            lower: null,
            unit: "bar"
          },
          DPT: {
            upper: null,
            lower: null,
            unit: "bar"
          },
          CPT: {
            upper: null,
            lower: null,
            unit: "bar"
          },
          FM1: {
            upper: 100,
            lower: null,
            unit: "m³/h"
          },
          FM2: {
            upper: 100,
            lower: null,
            unit: "m³/h"
          }
        },
        {
          STLT: {
            upper: null,
            lower: null,
            unit: "m"
          },
          ETLT: {
            upper: null,
            lower: null,
            unit: "m"
          },
          SPT: {
            upper: null,
            lower: null,
            unit: "bar"
          },
          DPT: {
            upper: null,
            lower: null,
            unit: "bar"
          },
          CPT: {
            upper: null,
            lower: null,
            unit: "bar"
          },
          FM1: {
            upper: 100,
            lower: null,
            unit: "m³/h"
          },
          FM2: {
            upper: 100,
            lower: null,
            unit: "m³/h"
          }
        },
        {
          STLT: {
            upper: null,
            lower: null,
            unit: "m"
          },
          ETLT: {
            upper: null,
            lower: null,
            unit: "m"
          },
          SPT: {
            upper: null,
            lower: null,
            unit: "bar"
          },
          DPT: {
            upper: null,
            lower: null,
            unit: "bar"
          },
          CPT: {
            upper: null,
            lower: null,
            unit: "bar"
          },
          FM1: {
            upper: 100,
            lower: 0,
            unit: "m³/h"
          },
          FM2: {
            upper: 100,
            lower: 0,
            unit: "m³/h"
          }
        }
      ]
    };
  },
  mounted() {
    // var that = this;
    // that.timer = setInterval(() => {
    //   that.getRealData();
    // }, 10000);
  },
  methods: {
    async getinfo() {
      const res = await this.$http.get("/rest/getuserinfo");
      this.userinfo = res.data;
    },
    handleClick(tab, event) {
      this.activeName = event.target
        .getAttribute("id")
        .split("-")
        .pop();

      if (this.activeName == "杭州") {
        this.pos = 0;
      } else if (this.activeName == "重庆") {
        this.pos = 1;
      } else if (this.activeName == "山东") {
        this.pos = 2;
      }
      console.log(this.pos);
    },
    getParams() {
      if (this.$route.params.data) this.activeName = this.$route.params.data;
    },
    async getRealData() {
      const res = await this.$http.get("/rest/getData2");
      this.realdata = res.data;
    },
    async getStation() {
      const res = await this.$http.get("/rest/getstation");
      this.stations = res.data.stations;
      this.online = res.data.online;
    },
    async getThreshold() {
      const res = await this.$http.get("/rest/getThresholdforAlarm");
      this.threshold = res.data;
    },
    showDialog(name, upper, lower, unit) {
      (this.dialogFormVisible = true), (this.form.station = this.activeName);
      this.form.name = name;
      this.thresholdform.upper = upper;
      this.thresholdform.lower = lower;
      this.thresholdform.unit = unit;
    },
    async thresholdalarm(tempstation, tempname, tempdetails, tempmessage) {
      this.form.station = tempstation;
      this.form.name = tempname;
      this.form.details = tempdetails;
      await this.$http.post("/rest/alarminfo", this.form);
      this.$message({
        type: "error",

        message: tempmessage
      });
    },
    async alarm() {
      await this.$http.post("/rest/alarminfo", this.form);
      this.$message({
        type: "success",

        message: "报警成功"
      });
      this.dialogFormVisible = false;
    }
  },
  watch: {},
  created() {
    // this.getinfo();

    // this.getRealData();

    // this.getStation();

    // this.getParams();

    // this.getThreshold();

    // this.$watch("realdata", function() {
    //   for (let i = 0; i < this.realdata[this.pos].SPT.length; i++) {
    //     if (
    //       this.realdata[this.pos].SPT[i].data >
    //       this.threshold[this.pos].SPT.upper
    //     ) {
    //       this.thresholdalarm(
    //         this.activeName,
    //         "SPT" + (i + 1),
    //         "气压" +
    //           this.realdata[this.pos].SPT[i].data +
    //           this.realdata[this.pos].SPT[i].unit +
    //           "过高",
    //         "SPT" + (i + 1) + "异常"
    //       );
    //     } else if (
    //       this.realdata[this.pos].SPT[i].data <
    //       this.threshold[this.pos].SPT.lower
    //     ) {
    //       this.thresholdalarm(
    //         this.activeName,
    //         "SPT" + (i + 1),
    //         "气压" +
    //           this.realdata[this.pos].SPT[i].data +
    //           this.realdata[this.pos].SPT[i].unit +
    //           "过低",
    //         "SPT" + (i + 1) + "异常"
    //       );
    //     }
    //   }
    //   for (let i = 0; i < this.realdata[this.pos].DPT.length; i++) {
    //     if (
    //       this.realdata[this.pos].DPT[i].data >
    //       this.threshold[this.pos].DPT.upper
    //     ) {
    //       this.thresholdalarm(
    //         this.activeName,
    //         "DPT" + (i + 1),
    //         "气压" +
    //           this.realdata[this.pos].DPT[i].data +
    //           this.realdata[this.pos].DPT[i].unit +
    //           "过高",
    //         "DPT" + (i + 1) + "异常"
    //       );
    //     } else if (
    //       this.realdata[this.pos].DPT[i].data <
    //       this.threshold[this.pos].DPT.lower
    //     ) {
    //       this.thresholdalarm(
    //         this.activeName,
    //         "DPT" + (i + 1),
    //         "气压" +
    //           this.realdata[this.pos].DPT[i].data +
    //           this.realdata[this.pos].DPT[i].unit +
    //           "过低",
    //         "DPT" + (i + 1) + "异常"
    //       );
    //     }
    //   }
    //   if (
    //     this.realdata[this.pos].CPT.data > this.threshold[this.pos].CPT.upper
    //   ) {
    //     this.thresholdalarm(
    //       this.activeName,
    //       "CPT",
    //       "气压" +
    //         this.realdata[this.pos].CPT.data +
    //         this.realdata[this.pos].CPT.unit +
    //         "过高",
    //       "CPT异常"
    //     );
    //   } else if (
    //     this.realdata[this.pos].CPT.data < this.threshold[this.pos].CPT.lower
    //   ) {
    //     this.thresholdalarm(
    //       this.activeName,
    //       "CPT",
    //       "气压" +
    //         this.realdata[this.pos].CPT.data +
    //         this.realdata[this.pos].CPT.unit +
    //         "过低",
    //       "CPT异常"
    //     );
    //   }
    //   if (
    //     this.realdata[this.pos].ETLT.data > this.threshold[this.pos].ETLT.upper
    //   ) {
    //     this.thresholdalarm(
    //       this.activeName,
    //       "ETLT",
    //       "吸入罐液位" +
    //         this.realdata[this.pos].ETLT.data +
    //         this.realdata[this.pos].ETLT.unit +
    //         "过高",
    //       "吸入罐异常"
    //     );
    //   } else if (
    //     this.realdata[this.pos].ETLT.data < this.threshold[this.pos].ETLT.lower
    //   ) {
    //     this.thresholdalarm(
    //       this.activeName,
    //       "ETLT",
    //       "吸入罐液位" +
    //         this.realdata[this.pos].ETLT.data +
    //         this.realdata[this.pos].ETLT.unit +
    //         "过低",
    //       "吸入罐异常"
    //     );
    //   }
    //   if (
    //     this.realdata[this.pos].STLT.data > this.threshold[this.pos].STLT.upper
    //   ) {
    //     this.thresholdalarm(
    //       this.activeName,
    //       "STLT",
    //       "压力罐液位" +
    //         this.realdata[this.pos].STLT.data +
    //         this.realdata[this.pos].STLT.unit +
    //         "过高",
    //       "压力罐异常"
    //     );
    //   } else if (
    //     this.realdata[this.pos].STLT.data < this.threshold[this.pos].STLT.lower
    //   ) {
    //     this.thresholdalarm(
    //       this.activeName,
    //       "STLT",
    //       "压力罐液位" +
    //         this.realdata[this.pos].STLT.data +
    //         this.realdata[this.pos].STLT.unit +
    //         "过低",
    //       "压力罐异常"
    //     );
    //   }
    //   if (
    //     this.realdata[this.pos].FM1.data > this.threshold[this.pos].FM1.upper
    //   ) {
    //     this.thresholdalarm(
    //       this.activeName,
    //       "1#流量计",
    //       "流速" +
    //         this.realdata[this.pos].FM1.data +
    //         this.realdata[this.pos].FM1.unit +
    //         "过快",
    //       "1#流量计异常"
    //     );
    //   }
    //   if (
    //     this.realdata[this.pos].FM2.data > this.threshold[this.pos].FM2.upper
    //   ) {
    //     this.thresholdalarm(
    //       this.activeName,
    //       "2#流量计",
    //       "流速" +
    //         this.realdata[this.pos].FM2.data +
    //         this.realdata[this.pos].FM2.unit +
    //         "过快",
    //       "2#流量计异常"
    //     );
    //   }
    // });
  },
  beforeDestroy() {
    // clearInterval(this.timer);
  },
  filters: {
    numFilter(num) {
      if (isNaN(num) || (!num && num !== 0)) {
        return "--";
      }
      // 默认为保留的小数点后两位
      let dec = 2;
      let tempNum = Number(num);
      let pointIndex = String(tempNum).indexOf(".") + 1; // 获取小数点的位置 + 1
      let pointCount = pointIndex ? String(tempNum).length - pointIndex : 0; // 获取小数点后的个数(需要保证有小数位)
      // 源数据为整数或者小数点后面小于decimals位的作补零处理
      if (pointIndex === 0 || pointCount <= dec) {
        let tempNumA = tempNum;
        if (pointIndex === 0) {
          tempNumA = `${tempNumA}.`;
          for (let index = 0; index < dec - pointCount; index++) {
            tempNumA = `${tempNumA}0`;
          }
        } else {
          for (let index = 0; index < dec - pointCount; index++) {
            tempNumA = `${tempNumA}0`;
          }
        }
        return tempNumA;
      }
      let realVal = "";
      // 截取当前数据到小数点后decimals位
      realVal = `${String(tempNum).split(".")[0]}.${String(tempNum)
        .split(".")[1]
        .substring(0, dec)}`;
      // 判断截取之后数据的数值是否为0
      if (realVal == 0) {
        realVal = 0;
      }
      return realVal;
    }
  }
};
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

.bgImg1 {
  width: 1200px;
  height: 700px;
  background-image: url("../assets/Cocoa\ Valley.png");
}

.bgImg2 {
  width: 1200px;
  height: 700px;
  background-image: url("../assets/Pulai\ Mutiara.png");
}

.bgImg3 {
  width: 1200px;
  height: 700px;
  background-image: url("../assets/KECK\ SENG.png");
}



.tag2 {
  /* box-sizing: border-box; */
  height: 2rem;
  width: 100%;
  font-size: 14px;
}
</style>
