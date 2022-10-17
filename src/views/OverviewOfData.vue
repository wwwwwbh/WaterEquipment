<template>
  <div>
    <tag-top contentText="数据概览"></tag-top>
    <el-row>
      <el-col :span="24">
        <tag-top :contentText="stations[0]"></tag-top>
        <el-row :gutter="12" v-if="allitems[0].items">
          <el-col :span="3" v-for="(item,key) in allitems[0].items" v-bind:key="key">
            <el-card :body-style="{ padding: '5px' }">
              <div style="padding: 14px;">
                {{ item.data }}
                <div>{{ item._id }}({{ item.unit }})</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <tag-top :contentText="stations[1]"></tag-top>
        <el-row :gutter="12" v-if="allitems[1].items">
          <el-col :span="3" v-for="(item,key) in allitems[1].items" v-bind:key="key">
            <el-card :body-style="{ padding: '5px' }">
              <div style="padding: 14px;">
                {{ item.data }}
                <div>{{ item._id }}({{ item.unit }})</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <tag-top :contentText="stations[2]"></tag-top>
        <el-row :gutter="12" v-if="allitems[2].items">
          <el-col :span="3" v-for="(item,key) in allitems[2].items" v-bind:key="key">
            <el-card :body-style="{ padding: '5px' }">
              <div style="padding: 14px;">
                {{ item.data }}
                <div>{{ item._id }}({{ item.unit }})</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "OverviewOfData",
  data() {
    return {
      timer: null,

      stations: ["杭州", "山东", "重庆"],

      allitems: [{ items: [] }, { items: [] }, { items: [] }]
    };
  },
  mounted() {
    // var that = this;
    // that.timer = setInterval(() => {
    //   that.getData();
    // }, 10000);
  },
  methods: {
    async getData() {
      const res = await this.$http.get("/rest/getData");
      const temp = res.data;
      for (var i = temp.length - 1; i >= 0; i--) {
        this.$set(this.allitems, i, temp[i]);
      }
      //this.allitems = res.data
    },

    async getStation() {
      const res = await this.$http.get("/rest/getstation");
      this.stations = res.data.stations;
    }
  },
  created() {
    this.getData();

    this.getStation();
  },
  beforeDestroy() {
    // clearInterval(this.timer);
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
</style>
