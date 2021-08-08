<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mg-t-10">
      <el-row type="flex" justify="space-between">
        <el-input
            v-model="query"
            class="search-input-style"
            clearable>
          <el-button
              @click="handleGetList"
              slot="append"
              icon="el-icon-search">
          </el-button>
        </el-input>
        <el-button
            type="primary"
            @click="showAddDialog">
          添加商品
        </el-button>
      </el-row>
      <el-table
          v-loading="loadingTable"
          :data="list"
          class="mg-t-10 mg-b-10"
          border
          stripe>
        <el-table-column
            label="#"
            type="index"
            width="50px"
            fixed="left">
        </el-table-column>
        <el-table-column
            label="商品名称"
            prop="goods_name"
            min-width="200px">
        </el-table-column>
        <el-table-column
            label="商品价格（元）"
            prop="goods_price"
            width="140px">
        </el-table-column>
        <el-table-column
            label="商品重量"
            prop="goods_weight"
            width="140px">
        </el-table-column>
        <el-table-column
            label="创建时间"
            prop="add_time"
            width="200px">
        </el-table-column>
        <el-table-column
            label="更新时间"
            prop="upd_time"
            width="200px">
        </el-table-column>
        <el-table-column
            label="操作"
            width="70px">
          <template v-slot="{row}">
            <el-dropdown @command="cmd=>cmd()">
              <el-button
                  type="icon"
                  icon="el-icon-more"
                  size="small">
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="()=>showEditDialog(row)">编辑</el-dropdown-item>
                <el-dropdown-item :command="()=>handleDeleteItem(row)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
          :current-page="paginationData.pagenum"
          :page-size="paginationData.pagesize"
          :page-sizes="[10,20,30,40]"
          layout="total,sizes,prev,pager,next,jumper"
          :total="totalRecords">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import UtilsSet from "@/utils"

export default {
  name: "Goods",
  data() {
    return {
      query: null,
      paginationData: {
        pagenum: 1,
        pagesize: 10
      },
      totalRecords: 0,
      loadingTable: false,
      list: [],
      isShowAddDialog: false
    }
  },
  methods: {
    //  获取列表数据
    async handleGetList() {
      try {
        this.loadingTable = true
        const params = {query: this.query, ...this.paginationData}
        const {data: res} = await this.$http.get(`goods`, {
          params: params
        })
        res.data.goods.forEach(item=>{
          item.add_time=UtilsSet.timestamp2Date(item.add_time*1000)
          item.upd_time=UtilsSet.timestamp2Date(item.upd_time*1000)
        })
        this.list = res.data.goods
        this.totalRecords = res.data.total
      } catch (error) {
        this.$catchHttpError(error)
      } finally {
        this.loadingTable = false
      }
    },
    // 显示添加对话框
    showAddDialog() {

    },
    handlePageChange(val) {
      this.paginationData.pagenum = val
      this.handleGetList()
    },
    handleSizeChange(val) {
      this.paginationData.pagesize = val
      this.paginationData.pagenum = 1
      this.handleGetList()
    },
    showEditDialog(row) {
      console.log(row)
    },
    async handleDeleteItem(row) {
      try {
        await this.$confirm(`确定删除${row.goods_name}吗？`, '删除商品', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
      } catch (e) {
        return
      }
      try {
        await this.$http.delete(`goods/${row.goods_id}`)
        this.$message.success('删除商品成功')
        await this.handleGetList()
      } catch (error) {
        this.$catchHttpError(error)
      }
    }
  },
  created() {
    this.handleGetList()
  }
}
</script>

<style lang="less">

</style>