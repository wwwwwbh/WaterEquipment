<template>
  <div id="home">
    <el-container style="height: 100vh;">
      <el-header>
        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple" align="left">
            <img src="../assets/logo.png" width="20px" height="20px">
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light" align="right">
            <el-button type="text" v-if="userinfo.username">您好,{{ userinfo.username }}</el-button>
            <el-button v-if="userinfo.username === ''" @click="login">登录</el-button>
            <el-button v-if="userinfo.username === ''" @click="logon">注册</el-button>
            <el-button type="danger" v-if="userinfo.username" @click="logout">注销</el-button>
          </div></el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238,241,246)">
          <el-menu router :default-openeds="['1','2','3']" :default-active="$route.path">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>导航</template>
              <el-menu-item-group>
                <el-menu-item index="/overview/Equipment">设备概览</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group >
                <el-menu-item index="/overview/Data">数据概览</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group >
                <el-menu-item index="/subStationMonitoring">子站监控</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group >
                <el-menu-item index="/historyData">历史数据</el-menu-item>
              </el-menu-item-group>
              <el-submenu index='2' >
                <template slot="title">报警信息</template>
                <el-menu-item index="/realInfo">实时报警</el-menu-item>
                <el-menu-item index="/historyAlarm">报警历史</el-menu-item>
              </el-submenu>
              <el-submenu index='3' v-if="userinfo.type === 1">
                <template slot="title">信息管理</template>
                <el-menu-item index="/user/list">账号管理</el-menu-item>
                <el-menu-item index="/repair/create">设备报修</el-menu-item>
                <el-menu-item index="/equipment/edit">子站设备管理</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data(){
    return{
      userinfo:{
        username:'',
        type:2
      }
    }
  },
  methods:{
    login(){
      this.$router.push('/login')
    },
    logon(){
      this.$router.push('/logon')
    },
    async getinfo(){
      const res = await this.$http.get('/rest/getuserinfo')
      this.userinfo = res.data
    },
    logout(){
      sessionStorage.clear()
      this.setinfo()
      this.$router.push('/')
      this.$message({
        type: 'success',
        message: '注销成功'
      })
    },
    setinfo(){
      this.userinfo = {
        username:'',
        type:2
      }
    }
  },
  created(){
    if(sessionStorage.token){
      this.getinfo()
    }
  }
}
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }


</style>
