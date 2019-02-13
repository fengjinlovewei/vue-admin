<template>
  <div class="page-info">
    <el-row>
      <el-col :span="24">
        <div class="page-title">
            <span>成员管理</span>
        </div>
      </el-col>
    </el-row>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="nickname" label="成员名称">
      </el-table-column>
      <el-table-column prop="username" label="手机号">
      </el-table-column>
      <el-table-column prop="daycount" label="身份状态" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
          size="mini"
          type="success">激活</el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import { supplierOrderAPI} from '../../api/api';
  export default {
    created(){
      this.dataLoad();
    },
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        page:{
          total:0,
          pageSizes:[10, 20, 30, 50,100],
          pageSize:10,
          currentPage: 1,
        }
      }
    },
    methods: {
      dataLoad(){
        supplierOrderAPI({pageSize:this.page.pageSize,pageIndex:this.page.currentPage}).then((res)=>{
          console.log(res)
          this.tableData = res.detail.lists;
          this.page.total = res.detail.totalCount;
          this.page.pageSize = res.detail.pageSize;
          this.page.currentPage = res.detail.currPage;
        });
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
       console.log(`每页 ${val} 条`);

       this.page.pageSize = val;
       this.dataLoad();
     },
      handleCurrentChange(val) {
       console.log(`当前页: ${val}`);
       this.page.currentPage = val;
       this.dataLoad(this.pageSize,this.currentPage)
     }
    }
  }
</script>
<style>

</style>
