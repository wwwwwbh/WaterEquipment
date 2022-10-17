<template>
  <div class="cards">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>子站数量</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="toSubsites">查看详情页</el-button>
      </div>
      <div>所有子站数量&nbsp;<span style="color:red" class="subnum">3</span></div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>设备数量</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="toEquipment">查看详情页</el-button>
      </div>
      <div>所有子站的设备数量&nbsp;<span style="color:red" class="equipmentnum">120</span></div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>在线数量</span>
        <el-button style="float: right; padding: 3px 0" type="text">查看详情页</el-button>
      </div>
      <div>当前在线的子站数量&nbsp;<span style="color:red">3</span></div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>报警提示</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="toAlarminfo">查看详情页</el-button>
      </div>
      <div>当前待处理的报警数量&nbsp;<span style="color:red" class="equipmentnum">0</span></div>
    </el-card>


    <div class="grid-content" id="container">
      <div class="tipInfo">
        <span>设备概览</span>
      </div>
      <baidu-map :style="{width:map.width, height:map.height}" class="map" ak='hydssxShGwneWvLDMM5nW7nWQqcXaSEn'
        :zoom="map.zoom" :center="{lng: map.center.lng, lat: map.center.lat}" :scroll-wheel-zoom="true">
        <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
        <bm-navigation anchor="BMAP_A NCHOR_BOTTOM_RIGHT"></bm-navigation>

        <bm-marker :position="{lng: 120, lat: 30}" :title=this.stations[0]>
          <bm-label :content=this.stations[0] :labelStyle="{color: 'red', fontSize : '12px'}"
            :offset="{width: -6, height: 30}" />
        </bm-marker>
        <bm-marker :position="{lng: 115, lat: 28}" :title=this.stations[1]>
          <bm-label :content=this.stations[1] :labelStyle="{color: 'red', fontSize : '12px'}"
            :offset="{width: -6, height: 30}" />
        </bm-marker>
        <bm-marker :position="{lng: 110, lat: 32}" :title=this.stations[2]>
          <bm-label :content=this.stations[2] :labelStyle="{color: 'red', fontSize : '12px'}"
            :offset="{width: -6, height: 30}" />
        </bm-marker>
      </baidu-map>
    </div>
  </div>
</template>

<script>


export default {
  name: 'OverviewOfEquipment',
  data() {
    return {
      model: {
        subnum: 0,
        equipmentnum: 0,
        onlinenum: 0,
        alarmnum: 0,
      },
      accesskey: '',
      map: {
        center: { lng: 120.15, lat: 30.28 },//'杭州市',
        zoom: 5,
        width: '100%',
        height: '500px'
      },
      markers: [],
      stations: [
        "KECK",
        "Cocoa",
        "Pulai"
      ],
      src: "../assets/logo.png"
    }
  },
  mounted() {
    this.leftHeight = document.body.clientHeight + 'px';
    this.containerHeight = document.body.clientHeight + 'px';
  },
  methods: {
    async getsubinfo() {
      const res = await this.$http.get('/rest/getsubinfo')
      if (res.data)
        this.model = res.data
    },
    toSubsites() {
      this.$router.push('/overview/Data')
    },
    toEquipment() {
      this.$router.push('/subStationMonitoring')
    },
    toAlarminfo() {
      this.$router.push('/realInfo')
    },
    async getMarker() {
      const res = await this.$http.get('/rest/getposition')
      if (res.data)
        this.markers = res.data
    },
    toStation(station) {
      this.$router.push({ name: 'SubStationMonitoring', params: { data: station } })
    },
    init() {
      if (this.model.subnum) document.querySelector(".subnum").innerHTML = this.model.subnum
      if (this.model.equipmentnum) document.querySelector(".subnum").innerHTML = this.model.equipmentnum
      if (this.model.onlinenum) document.querySelector(".subnum").innerHTML = this.model.onlinenum
      if (this.model.alarmnum) document.querySelector(".subnum").innerHTML = this.model.alarmnum
    }
  },
  created() {
    // this.getsubinfo()
    // this.getMarker()
    // this.init()
  }

}
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

#container {
  width: 85%;
  margin-top: 50px;
  margin-left: 1rem;
}

.box-card {
  width: 240px;
  display: inline-block;
  margin-left: 10px;
}

.tipInfo {
  padding: 10px;
  text-align: center;
  background-color: lightblue;
}

.tipInfo span {
  height: 20px;
  font-size: 26px;
}
</style>
