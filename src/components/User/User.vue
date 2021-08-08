<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path: '/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片-->
    <el-card class="mg-t-10">
      <!--添加角色-->
      <el-row type="flex" justify="space-between">
        <el-input
            v-model="searchForm.query"
            class="search-input-style"
            clearable>
          <el-button
              @click="getUserList"
              slot="append"
              icon="el-icon-search">
          </el-button>
        </el-input>
        <el-button type="primary" @click="showAddDialog">添加用户</el-button>
      </el-row>
      <!--table-->
      <el-table
          :data="tableList"
          v-loading="loadingTable"
          class="mg-t-10 mg-b-10"
          stripe
          border>
        <el-table-column label="序号" width="50px" type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template v-slot="{row}">
            <el-switch
                v-model="row.mg_state"
                @change="handleStatusChange(row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80px">
          <template v-slot="{row}">
            <el-dropdown @command="cmd=>cmd()">
              <el-button
                  type="icon"
                  icon="el-icon-more"
                  size="small">
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="()=>showEditDialog(row)">编辑</el-dropdown-item>
                <el-dropdown-item :command="()=>handleDeleteUser(row)">删除</el-dropdown-item>
                <el-dropdown-item>分配权限</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="searchForm.pageNumber"
          :page-size="searchForm.pageSize"
          :page-sizes="[10,20,30,40]"
          :total="totalRecords"
          layout="total,sizes,prev,pager,next"
          background>
      </el-pagination>
    </el-card>
    <el-dialog
        title="添加用户"
        :visible.sync="isShowAddDialog"
        width="500px"
        @close="handleCloseAddDialog">
      <el-form
          ref="addForm"
          :rules="addFormRules"
          :model="addForm"
          label-width="70px">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowAddDialog=false">取 消</el-button>
        <el-button type="primary" @click="handleAddUser">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="编辑用户"
        :visible.sync="isShowEditDialog"
        width="500px"
        @close="handleCloseEditDialog">
      <el-form
          ref="editForm"
          :rules="editFormRules"
          :model="editForm"
          label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowEditDialog=false">取消</el-button>
        <el-button type="primary" @click="handlerEditUser">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      loadingTable: false,
      searchForm: {
        query: null,
        pageNumber: 1,
        pageSize: 10
      },
      totalRecords: 0,
      tableList: [],
      isShowAddDialog: false,
      isShowEditDialog: false,
      addFormRules: {
        username: [{required: true, message: '请输入用户名'}],
        password: [{required: true, message: '请输入密码'}]
      },
      addForm: {
        username: null,
        password: null,
        email: null,
        mobile: null
      },
      editFormRules: {},
      editForm: {
        username: null,
        email: null,
        mobile: null
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.searchForm.pageNumber = val
      this.getUserList()
    },
    handleSizeChange(val) {
      this.searchForm.pageSize = val
      this.searchForm.pageNumber = 1
      this.getUserList()
    },
    async getUserList() {
      try {
        this.loadingTable = true
        const params = {
          query: this.searchForm.query,
          pagenum: this.searchForm.pageNumber,
          pagesize: this.searchForm.pageSize
        }
        const {data: res} = await this.$http.get(`users`, {
          params: params
        })
        console.log(res)
        this.tableList = res.data.users
        this.totalRecords = res.data.total
      } catch (error) {
        this.$catchHttpError(error)
      } finally {
        this.loadingTable = false
      }
    },
    showAddDialog() {
      this.isShowAddDialog = true
    },
    showEditDialog(row) {
      this.editForm = Object.assign({}, row)
      this.isShowEditDialog = true
    },
    async handleAddUser() {
      try {
        await this.$refs.addForm.validate()
      } catch (e) {
        return
      }
      try {
        await this.$http.post(`users`, this.addForm)
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        await this.getUserList()
      } catch (error) {
        this.$catchHttpError(error)
      } finally {
        this.isShowAddDialog = false
      }
    },
    async handlerEditUser() {
      try {
        const params = {
          id: this.editForm.id,
          email: this.editForm.email,
          mobile: this.editForm.mobile
        }
        await this.$http.put(`users/${params.id}`, params)
        this.$message.success('编辑成功')
        await this.getUserList()
      } catch (error) {
        this.$catchHttpError(error)
      } finally {
        this.isShowEditDialog = false
      }
    },
    handleCloseAddDialog() {
      this.$refs.addForm.resetFields()
    },
    handleCloseEditDialog() {
      this.editForm = {}
    },
    async handleDeleteUser(row) {
      try {
        await this.$confirm(`确定删除用户： ${row.username}吗？`, '删除用户', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
      } catch (e) {
        return
      }

      try {
        await this.$http.delete(`users/${row.id}`)
        this.$message.success('删除成功')
        await this.getUserList()
      } catch (error) {
        this.$catchHttpError(error)
      }
    },
    async handleStatusChange(row) {
      try {
        await this.$http.put(`users/${row.id}/state/${row.mg_state}`)
        this.$message.success('修改状态成功')
        await this.getUserList()
      } catch (error) {
        this.$catchHttpError(error)
      }
    }
  },
  created() {
    this.getUserList()
  }
}
</script>

<style lang="less">

</style>