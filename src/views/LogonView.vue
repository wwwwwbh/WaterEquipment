<template>
  <div class="logon-container">
    <el-card header="请输入相关信息" class="logon-card">
      <el-form
        :model="model"
        :rules="rules"
        ref="model"
        @submit.native.prevent="logon"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="model.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">注册</el-button>
          <el-button type="text" align="right" @click="back"
            >不想注册了,返回登陆页</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "LogonView",
  data() {
    return {
      model: {
        username: "",
        passsword: "",
        type: 2, //表示仅供浏览数据
        phone: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, message: "用户名至少4位", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, message: "密码至少8位", trigger: "blur" },
        ],
        phone: [{ required: true, message: "请输入联系方式", trigger: "blur" }],
      },
    };
  },
  methods: {
    logon() {
      this.$refs.model.validate(async (valid) => {
        if (valid) {
          await this.$http.post("/rest/logon", this.model);

          this.$router.push("/login");

          this.$message({
            type: "success",

            message: "注册成功",
          });
        } else {
          console.log("error submit!!");

          return false;
        }
      });
    },
    back() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.logon-card {
  width: 25rem;
  margin: 10rem auto;
}
</style>
