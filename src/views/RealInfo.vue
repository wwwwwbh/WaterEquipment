<template>
  <div>
    <tag-top contentText="实时报警"></tag-top>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-table :data="items">
            <el-table-column prop="date" label="时间" width="300"></el-table-column>
            <el-table-column prop="station" label="站点" width="300"></el-table-column>
            <el-table-column prop="details" label="故障详情" width="600"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100" v-if="userinfo.type !== 2">
              <template slot-scope="scope">
                <el-button @click="deal(scope.row)" type="primary" size="small">处理完成</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userinfo: {
        username: "",
        type: ""
      },
      items: []
    };
  },
  mounted() {
    var that = this;
    that.timer = setInterval(() => {
      that.fetch();
    }, 30000);
  },
  methods: {
    async getinfo() {
      const res = await this.$http.get("/rest/getuserinfo");
      this.userinfo = res.data;
    },
    async fetch() {
      const res = await this.$http.get("/rest/realwarninginfos");
      this.items = res.data;
    },
    deal(row) {
      let info = {
        date: row.date,
        username: this.userinfo.username
      };
      this.updateAlarminfo(info);
    },
    async updateAlarminfo(info) {
      await this.$http.post("/rest/updateAlarminfo", info);
      this.$message({
        type: "success",

        message: "处理成功"
      });
      this.fetch()
    }
  },
  created() {
    this.fetch();
    this.getinfo();
  },
  beforeDestroy() {
    clearInterval(this.timer);
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
