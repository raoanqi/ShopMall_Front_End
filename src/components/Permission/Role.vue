<template>
  <div>
    <!--  面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  card-->
    <el-card class="mg-t-10">
      <el-row type="flex" justify="space-between">
        <el-input
            v-model="searchID"
            class="search-input-style"
            clearable>
          <el-button
              @click="getRoleByID"
              slot="append"
              icon="el-icon-search">
          </el-button>
        </el-input>
        <el-button
            type="primary"
            @click="showAddDialog">
          添加角色
        </el-button>
      </el-row>
      <el-table
          :data="list"
          v-loading="loadingTable"
          class="mg-t-10 mg-b-10"
          stripe
          border>
        <el-table-column type="expand"></el-table-column>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="80px">
          <template v-slot="{row}">
            <el-dropdown @command="cmd=>cmd()">
              <el-button
                  type="icon"
                  icon="el-icon-more"
                  size="small">
              </el-button>
              <el-dropdown-menu>
                <el-dropdown-item :command="()=>showEditDialog(row)">编辑</el-dropdown-item>
                <el-dropdown-item :command="()=>handleDeleteRole(row)">删除</el-dropdown-item>
                <el-dropdown-item :command="()=>showAllocatePermissionDialog(row)">分配权限</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
        :title="mode==='add'?'添加角色':'编辑角色'"
        :visible.sync="isShowAddEditDialog"
        width="500px"
        @close="handleAddEditDialogClose">
      <el-form
          ref="addEditForm"
          :model="addEditForm"
          :rules="addEditFormRules"
          label-width="80px">
        <el-form-item
            label="角色名称"
            prop="roleName">
          <el-input v-model="addEditForm.roleName"></el-input>
        </el-form-item>
        <el-form-item
            label="角色描述"
            prop="roleDesc">
          <el-input v-model="addEditForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowAddEditDialog=false">取消</el-button>
        <el-button type="primary" @click="handleAddEditConfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Role",
  data() {
    return {
      loadingTable: false,
      searchID: null,
      list: [],
      mode: 'add',
      isShowAddEditDialog: false,
      addEditForm: {
        roleName: null,
        roleDesc: null
      },
      addEditFormRules: {
        roleName: [{required: true, message: '请输入用户名'}]
      }
    }
  },
  methods: {
    //  获取角色列表
    async getRoleList() {
      try {
        this.loadingTable = true
        const {data: res} = await this.$http.get(`roles`)
        this.list = res.data
      } catch (error) {
        this.$catchHttpError(error)
      } finally {
        this.loadingTable = false
      }
    },
    async getRoleByID() {
      try {
        this.loadingTable = true
        const {data: res} = await this.$http.get(`roles/${this.searchID}`)
        this.list = [res.data]
      } catch (error) {
        this.$catchHttpError(error)
      } finally {
        this.loadingTable = false
      }
    },
    showAddDialog() {
      this.isShowAddEditDialog = true
    },
    showEditDialog(row) {
      this.mode = 'edit'
      this.addEditForm = Object.assign({}, row)
      this.isShowAddEditDialog = true
    },
    //  删除角色
    async handleDeleteRole(row) {
      try {
        await this.$confirm(`确定删除角色：${row.roleName}吗?`, '删除角色', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
      } catch (e) {
        return
      }
      try {
        await this.$http.delete(`roles/${row.id}`)
        this.$message.success('删除成功')
        await this.getRoleList()
      } catch (error) {
        this.$catchHttpError(error)
      }
    },
    showAllocatePermissionDialog() {

    },
    //  分配权限
    handleAllocatePermission() {

    },
    async handleAddEditConfirm() {
      try {
        const params = {
          roleName: this.addEditForm.roleName,
          roleDesc: this.addEditForm.roleDesc
        }
        if (this.mode === 'add') {
          await this.$http.post(`roles`, params)
          this.$message.success('添加成功')
        } else {
          await this.$http.put(`roles/${this.addEditForm.id}`, params)
          this.$message.success('编辑成功')
        }
        await this.getRoleList()
      } catch (error) {
        this.$catchHttpError(error)
      } finally {
        this.isShowAddEditDialog = false
      }
    },
    handleAddEditDialogClose() {
      this.addEditForm = {}
    }
  },
  created() {
    this.getRoleList()
  }
}
</script>

<style lang="less">

</style>