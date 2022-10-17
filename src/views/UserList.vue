
<template>
  <div>
    <h1>账号信息展示</h1>
    <el-card class="list-card">
      <el-table :data="items" style="width: 100%">
        <el-table-column prop="username" label="用户名" width="200"></el-table-column>
        <el-table-column prop="phone" label="联系方式" width="150"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope" v-if="scope.row.type === 2">
            <el-button @click="deal(scope.row)" type="primary" size="small">设为操作员</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/rest/users");
      this.items = res.data;
    },
    deal(row){
      this.setAsOperator(row.username)
    },
    async setAsOperator(info) {
      await this.$http.post("/rest/setAsOperator", {username:info});
      this.$message({
        type: "success",

        message: "设置成功"
      });
      this.fetch()
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style>
.list-card {
  width: 650px;
}
</style>