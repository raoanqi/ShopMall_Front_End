<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mg-t-10">
      <el-input
          v-model="searchForm.query"
          class="search-input-style"
          clearable>
        <el-button
            slot="append"
            @click="handleSearch"
            icon="el-icon-search">
        </el-button>
      </el-input>
      <el-table
          v-loading="loadingTable"
          :data="list"
          class="mg-t-10 mg-b-10"
          border
          stripe>
        <el-table-column
            label="#"
            type="index">
        </el-table-column>
        <el-table-column
            label="订单编号"
            min-width="150px"
            prop="order_number">
        </el-table-column>
        <el-table-column
            label="订单价格"
            min-width="120px"
            prop="order_price">
        </el-table-column>
        <el-table-column
            label="是否付款"
            min-width="120px">
          <template v-slot="{row}">
            <el-tag size="small" type="success" v-if="row.order_pay===0">已付款</el-tag>
            <el-tag size="small" type="warning" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            label="是否发货"
            min-width="120px">
          <template v-slot="{row}">
            <el-tag size="small" type="success" v-if="row.is_send==='是'">已发货</el-tag>
            <el-tag size="small" type="warning" v-else>未发货</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            label="下单时间"
            min-width="150px"
            prop="create_time">
        </el-table-column>
        <el-table-column
            label="操作"
            width="100px"
            fixed="right">
          <template v-slot="{row}">
            <el-dropdown @command="cmd=>cmd()">
              <el-button size="small" type="icon" icon="el-icon-more"></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="()=>showEditDialog(row)">修改地址</el-dropdown-item>
                <el-dropdown-item :command="()=>showTrafficDialog(row)">查看物流</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          :current-page="paginationData.pagenum"
          :page-size="paginationData.pagesize"
          :page-sizes="[10,20,30,40]"
          layout="total,sizes,prev,pager,next,jumper"
          :total="recordsTotal"
          @current-change="handlePageChange"
          @size-change="handleSizeChange">
      </el-pagination>
    </el-card>
    <el-dialog
        title="编辑地址"
        :visible.sync="isShowEditDialog"
        @close="handleCloseEditDialog"
        width="600px">
      <el-form
          ref="editForm"
          :model="editForm"
          label-width="100px">
        <el-form-item label="省市信息">
          <el-cascader
              v-model="editForm.city"
              :options="city"
              :props="{expandTrigger:'hover'}"
              class="full-width">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="editForm.detailAddress"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowEditDialog=false">取消</el-button>
        <el-button type="primary" @click="handleConfirmAddress">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import UtilsSet from "@/utils"
import city from "@/assets/data/city"

export default {
  name: "Order",
  data() {
    return {
      loadingTable: false,
      searchForm: {
        query: null,
        user_id: null,
        pay_status: null,
        is_send: null,
        order_fapiao_title: null,
        order_fapiao_company: null,
        prder_fapiao_content: null,
        consignee_addr: null
      },
      paginationData: {
        pagenum: 1,
        pagesize: 10
      },
      recordsTotal: 0,
      list: [],
      isShowEditDialog: false,
      city,
      editForm:{
        city: null,
        detailAddress: null
      }
    }
  },
  methods: {
    async handleSearch() {
      try {
        this.loadingTable = true
        const {data: res} = await this.$http.get(`orders`, {
          params: {...this.searchForm, ...this.paginationData}
        })
        res.data.goods.forEach(item=>item.create_time=UtilsSet.timestamp2Date(item.create_time*1000))
        this.list = res.data.goods
        this.recordsTotal = res.data.total
      } catch (error) {
        this.$catchHttpError(error)
      } finally {
        this.loadingTable = false
      }
    },
    showEditDialog(item) {
      console.log(item)
      this.isShowEditDialog=true
    },
    showTrafficDialog(item) {
      console.log(item)
    },
    handlePageChange(val) {
      this.paginationData.pagenum = val
      this.handleSearch()
    },
    handleSizeChange(val) {
      this.paginationData.pagenum = 1
      this.paginationData.pagesize = val
      this.handleSearch()
    },
    handleCloseEditDialog(){

    },
    handleConfirmAddress(){
      
    }
  },
  created() {
    this.handleSearch()
  }
}
</script>

<style lang="less">

</style>