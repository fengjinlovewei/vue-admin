<template>
  <div class="page-info">
    <el-row>
      <el-col :span="24">
        <div class="page-title">
            <span>小B展示管理</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="page-btn">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="dialogFormVisible = true">添加</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="nickname" label="小B名称">
      </el-table-column>
      <el-table-column prop="username" label="手机号">
      </el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="longitude" label="坐标" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
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
    <!-- 这是弹出层区 -->
    <el-dialog title="新增小B" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <div class="layer-info">
          <el-row>
            <el-col :span="12">
              <el-form-item label="小B名称" :label-width="formLabelWidth">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号" :label-width="formLabelWidth">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="店铺照片" :label-width="formLabelWidth">
            <el-upload
              action="http://192.168.2.61:9111/imgUpload/uploadSupplierPhoto"
              list-type="picture-card"
              name="files"
              :limit="3"
              :on-change="uploadChange"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body>
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="店铺介绍" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="form.textarea">
            </el-input>
          </el-form-item>
          <el-form-item label="管理楼层" :label-width="formLabelWidth">
            <v-linkAge></v-linkAge>
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label="坐标经度" :label-width="formLabelWidth">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="坐标纬度" :label-width="formLabelWidth">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="账号状态" :label-width="formLabelWidth">
            <div class="switch-box">
              <el-switch
                v-model="value5"
                active-text="激活"
                inactive-text="未激活"
                active-color="#13ce66"
                inactive-color="#ccc">
              </el-switch>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { xiaoBshowAPI} from '@/api/api';
  import linkAge from '@/components/module/linkAge';
  export default {
    components:{
      'v-linkAge':linkAge
    },
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
        },
        dialogFormVisible: false,
        form: {
          name: '',
          phone: '',
          textarea: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        value5: false,
        formLabelWidth: '100px',
        dialogImageUrl: '',
        dialogVisible: false,
        uploadShow:true
      }
    },
    methods: {
      dataLoad(){
        xiaoBshowAPI({pageSize:this.page.pageSize,pageIndex:this.page.currentPage}).then((res)=>{
          console.log(res)
          this.tableData = res.detail.list;
          this.page.total = res.detail.total;
          this.page.pageSize = res.detail.pageSize;
          this.page.currentPage = res.detail.pageNum;
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
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        console.log(file)
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadChange(file, fileList){
        console.log(file, fileList);
        if(fileList.length >=3){
          this.uploadShow = false;
        }
      }
    }
  }
</script>
<style>

</style>
