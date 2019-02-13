<template lang="html">
  <div class="limiter">
      <div class="container-login100">
          <div class="wrap-login100">
              <div class="login100-form-title" id="bg-img">
                  <span class="login100-form-title-1">买手工具后台管理系统</span>
              </div>

              <form class="login100-form validate-form">
                  <div class="wrap-input100 validate-input m-b-26" data-validate="用户名不能为空">
                      <span class="label-input100">用户名</span>
                      <input class="input100" v-model="username" type="text" name="username" placeholder="请输入用户名">
                      <span class="focus-input100"></span>
                  </div>

                  <div class="wrap-input100 validate-input m-b-18" data-validate="密码不能为空">
                      <span class="label-input100">密码</span>
                      <input class="input100" v-model="password" type="password" name="pass" placeholder="请输入密码" >
                      <span class="focus-input100"></span>
                  </div>

                  <!-- <div class="flex-sb-m w-full p-b-30">
                      <div class="contact100-form-checkbox">
                          <input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me">
                          <label class="label-checkbox100" for="ckb1">记住我</label>
                      </div>

                      <div>
                          <a href="javascript:" class="txt1">忘记密码？</a>
                      </div>
                  </div> -->

                  <div class="container-login100-form-btn">
                      <button class="login100-form-btn" @click="login" type="button">登 录</button>
                  </div>
              </form>
          </div>
      </div>
  </div>
</template>

<script>
import { login} from '../api/api';
export default {
  data(){
    return {
      username:'',
      password:''
    }
  },
  mounted(){

  },
  methods:{
    login(){
        sessionStorage.setItem('token','asasdasd');
        this.$message({
            message: '登陆成功',
            type: 'success'
        });
        setTimeout(()=>{
            this.$router.push({ path: '/home',name:'home', params: {}})
        },2000);
        return 
        login({username:this.username,password:this.password}).then((res)=>{
            console.log(res)
            if(res.code == 200){
                sessionStorage.setItem('token',res.detail.token);
                    this.$message({
                    message: '登陆成功',
                    type: 'success'
                });
                setTimeout(()=>{
                    this.$router.push({ path: '/home',name:'home', params: {}})
                },2000)
            }else{
                this.$message.error(res.detail);
                this.password = '';
            }
        });
    }
  }
}
</script>

<style lang="css" scoped>
  @import '../assets/css/login/main.css';
  @import '../assets/css/login/util.css';
  #bg-img{
    background-image: url(../assets/images/bg-01.jpg)
  }
</style>
