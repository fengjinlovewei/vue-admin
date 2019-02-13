<template>
<div class="my-warp">
  <el-container style="height: 100%;">
    <div class="menu-left-box l-bg">
      <div class="logo-box" mid>
        <img src="../assets/logo.png" alt="">
      </div>
      <el-menu class="el-menu-vertical-demo l-bg" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <el-menu-item index="1" @click="goPage('logo')">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">展示管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" @click="goPage('xiaoBshowAdmin')">小B展示管理</el-menu-item>
            <el-menu-item index="2-2" @click="goPage('supplierShowAdmin')">供应商展示管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">订单管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1" @click="goPage('xiaoBorderAdmin')">小B订单管理</el-menu-item>
            <el-menu-item index="3-2" @click="goPage('supplierOrderAdmin')">供应商订单管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span slot="title">成员管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1" @click="goPage('memberAdmin')">成员管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <el-container>
      <el-header class="header-tit">
        <el-button circle icon="el-icon-back" class="fl shrink"
        v-model="isCollapse"
        @click="isCollapse = !isCollapse" :class="[isCollapse?'rotate1':'rotate2']"></el-button>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>admin</span>
      </el-header>
      <router-view/>
    </el-container>
  </el-container>
</div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goPage(path){
      this.$router.push({ path: '/home/'+path,name:path, params: {}})
    }
  },

};
</script>
<style media="screen">
html,
body,
#app,
.my-warp {
  height: 100%;
}
.menu-left-box{

}
.l-bg{
  background-color: #e6e6e6;
}
.logo-box {
  width: 100%;
  height: 60px;
  background-color: #8B681E;
  text-align: center;
}
.rotate1{
  transform: rotate(180deg);
}
.rotate2{
  transform: rotate(0deg);
}
.logo-box img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
.header-tit{
  text-align: right;
  font-size: 12px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-header {
  background-color: #BE8B08;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.shrink {
  margin-top: 10px;
  transition-duration:0.5s;
}
</style>
