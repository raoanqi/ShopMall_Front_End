<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mg-t-10">
      <el-table
          :data="list"
          v-loading="loadingTable"
          class="mg-b-10"
          stripe
          border>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级">
          <template v-slot="{row}">
            <el-tag size="small" type="success" v-if="row.level==='0'">一级权限</el-tag>
            <el-tag size="small" type="primary" v-if="row.level==='1'">二级权限</el-tag>
            <el-tag size="small" type="warning" v-if="row.level==='2'">三级权限</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Rights",
  data() {
    return {
      loadingTable: false,
      list: []
    }
  },
  methods: {
    async getRightsList() {
      try {
        this.loadingTable = true
        const {data: res} = await this.$http.get(`rights/list`)
        this.list = res.data
      } catch (error) {
        this.$catchHttpError(error)
      } finally {
        this.loadingTable = false
      }
    }
  },
  created() {
    this.getRightsList()
  }
}
</script>

<style lang="less">

</style>