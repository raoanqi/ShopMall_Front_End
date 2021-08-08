<template>
  <el-container class="home-container">
    <!--头部区域-->
    <el-header>
      <div>
        <img
            src="../assets/images/logo.png"
            style="width: 240px"
            alt="管理系统">
      </div>
      <el-button
          type="danger"
          @click="handleSignOut">
        退出登录
      </el-button>
    </el-header>
    <!--页面主体区域-->
    <el-container>
      <!--侧边栏-->
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="aside-collapse" @click="handleCollapse">
          <i :class="isCollapse?'el-icon-right':'el-icon-back'"></i>
        </div>
        <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409eff"
            :unique-opened="true"
            :collapse="isCollapse"
            :collapse-transition="false"
            :router="true"
            :default-active="activePath">
          <el-submenu
              v-for="item in menuList"
              :key="item.id"
              :index="item.id+''">
            <template v-slot:title>
              <i :class="iconObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                  v-for="subItem in item.children"
                  :key="subItem.id"
                  :index="'/'+subItem.path"
                  @click="saveMenuActive('/'+subItem.path)">
                <template v-slot:title>
                  <i class="el-icon-menu"></i>
                  <span>{{ subItem.authName }}</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--  右侧主体-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: "Home",
  data() {
    return {
      isCollapse: false,
      activePath: '',
      iconObj: {
        '125': 'el-icon-user',
        '103': 'el-icon-s-cooperation',
        '101': 'el-icon-s-shop',
        '102': 'el-icon-s-flag',
        '145': 'el-icon-s-comment'
      }
    }
  },
  computed: {
    ...mapState(['menuList'])
  },
  methods: {
    ...mapActions(['getMenuListAction']),
    handleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 退出登录：清空sessionstorage，并退出到登录页面
    handleSignOut() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 保存菜单的激活状态
    // 作用：刷新页面之后，依然能够维持之前展开的数据
    saveMenuActive(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  },
  created() {
    this.getMenuListAction()
    //  组件创建时，要拿到当前处于激活状态的menu
    this.activePath = window.sessionStorage.getItem('activePath')
  }
}
</script>

<style lang="less">
.home-container {
  height: 100%;

  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .el-aside {
    background-color: #333744;

    .aside-collapse {
      background-color: #eee;
      text-align: center;
      cursor: pointer;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-main {
    background-color: #eaedf1;
  }
}
</style>