<template>
  <div>
    <h1>新增设备报修信息</h1>
    <el-form @submit.native.prevent="save" label-width="120px">
      <el-form-item label="设备名称">
        <el-input v-model="model.equipment"></el-input>
      </el-form-item>
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
      <el-form-item label="设备状态">
        <el-input v-model="model.status"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        station: "",
        equipment: "",
        status: "正常运行"
      },
      stations: []
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
    async save() {
      await this.$http.post("/rest/eqiupments", this.model);
      this.$message({
        type: "success",

        message: "添加成功"
      });
    }
  },
  created() {
    this.getstation();
  }
};
</script>

<style>
</style>