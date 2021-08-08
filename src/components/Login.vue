<template>
  <div class="login-container">
    <div class="login-box">
      <!--头像区域-->
      <div class="avatar-box">
        <img src="../assets/images/avator.jpg" alt="头像">
      </div>
      <!--登陆表单-->
      <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginFormRules"
          class="login-form">
        <el-form-item prop="username">
          <el-input
              v-model="loginForm.username"
              prefix-icon="el-icon-user"
              placeholder="用户名">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              type="password"
              v-model="loginForm.password"
              placeholder="密码"
              prefix-icon="el-icon-lock">
          </el-input>
        </el-form-item>
        <el-form-item class="login-form-btns">
          <el-button
              type="primary"
              @click="login">
            登录
          </el-button>
          <el-button
              type="info"
              @click="reset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [{required: true, message: '请输入用户名'}],
        password: [{required: true, message: '请输入密码'}]
      }
    }
  },
  methods: {
    //  登录
    async login() {
      try {
        await this.$refs.loginForm.validate()
      } catch (e) {
        return
      }
      try {
        const {data: res} = await this.$http.post(`login`, this.loginForm)
        if (res.meta.status !== 200) {
          this.$message.error('登录失败')
        } else {
          this.$message.success('登陆成功')
          //  登陆成功之后，要拿到token并记录下来
          window.sessionStorage.setItem('token', res.data.token)
          this.$router.push('/home')
        }
      } catch (error) {
        this.$catchHttpError(error)
      }
    },
    //  重置
    reset() {
      this.$refs.loginForm.resetFields()
    }
  },
  created(){
    console.log('基于Element-UI+Vue.js+Axios的商城管理系统--By 饶安琪')
  }
}
</script>

<style lang="less">
.login-container {
  background-color: #2b4b6b;
  height: 100%;

  .login-box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar-box {
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      position: absolute;
      padding: 10px;
      box-shadow: 0 0 10px;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;

      img {
        width: 130px;
        height: 130px;
        border-radius: 50%;
        background-color: #eee;
      }
    }

    .login-form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 40px;
      box-sizing: border-box;

      .login-form-btns {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>