<template>
  <div>
    <h1>新增设备阈值信息</h1>
    <el-card style="width:500px">
    <el-form @submit.native.prevent="save" label-width="120px">
      <el-form-item label="子站:" prop="station">
        <el-select v-model="model.station" placeholder="请选择">
          <el-option
            v-for="item in stations"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备名称">
        <el-input v-model="model.equipment"></el-input>
      </el-form-item>
      <el-form-item label="设备阈值上限">
        <el-input v-model="model.upper"></el-input>
      </el-form-item>
      <el-form-item label="设备阈值下限">
        <el-input v-model="model.lower"></el-input>
      </el-form-item>
      <el-form-item label="测量值单位">
        <el-input v-model="model.unit"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">添加设备阈值</el-button>
      </el-form-item>
    </el-form>
    </el-card>
    <h1>设备阈值信息</h1>
    <el-card style="width:1000px">
      <el-table :data="items">
        <el-table-column prop="station" label="站点" width="150"></el-table-column>
        <el-table-column prop="equipment" label="设备名" width="150"></el-table-column>
        <el-table-column prop="upper" label="设备阈值上限" width="150"></el-table-column>
        <el-table-column prop="lower" label="设备阈值下限" width="150"></el-table-column>
        <el-table-column prop="unit" label="测量值单位" width="150"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        station: "",
        equipment: "",
        upper: "",
        lower: "",
        unit: ""
      },
      stations: [],
      items: []
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
    async getThreshold() {
      const res = await this.$http.get("/rest/threshold");
      this.items = res.data;
    },
    async save() {
      await this.$http.post("/rest/threshold", this.model);
      this.$message({
        type: "success",

        message: "添加成功"
      });
      this.getThreshold();
    }
  },
  created() {
    this.getThreshold();
    this.getstation();
  }
};
</script>

<style>
</style>