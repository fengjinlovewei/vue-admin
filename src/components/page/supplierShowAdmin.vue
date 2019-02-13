<template>
  <div class="page-info">
    <el-row>
      <el-col :span="24">
        <div class="page-title">
            <span>供应商展示管理</span>
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
      <el-table-column prop="sname" label="供应商名称">
      </el-table-column>
      <el-table-column prop="sphone" label="手机号">
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
            @click="supplierRemove(scope.$index, scope.row)">删除</el-button>
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
    <el-dialog title="新增供应商" :visible.sync="dialogFormVisible" @close="submitFormClose">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <div class="layer-info">
          <el-row>
            <el-col :span="12">
              <el-form-item label="供应商名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="店铺照片" :label-width="formLabelWidth" >
            <v-upload :upData="uploadImg" v-on:imgArr="uploadImg.imgArr = $event"></v-upload>
          </el-form-item>
          <el-form-item label="店铺介绍" :label-width="formLabelWidth" prop="textarea">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="form.textarea">
            </el-input>
          </el-form-item>
          <el-form-item label="管理楼层" :label-width="formLabelWidth">
            <v-linkAge v-on:address="address = $event" :length="4"></v-linkAge>
          </el-form-item>
          <el-form-item label="详细地址" :label-width="formLabelWidth" prop="userAddress">
            <el-input v-model="form.userAddress"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label="坐标经度" :label-width="formLabelWidth" prop="lng">
                <el-input v-model="form.lng"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="坐标纬度" :label-width="formLabelWidth" prop="lat">
                <el-input v-model="form.lat"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="账号状态" :label-width="formLabelWidth">
            <div class="switch-box">
              <el-switch
                v-model="state"
                active-text="激活"
                inactive-text="未激活"
                active-color="#13ce66"
                inactive-color="#ccc"
                disabled>
              </el-switch>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="submitFormClose">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { supplierShowAPI ,supplierAddAPI ,supplierRemoveAPI ,supplierUploadImg} from '@/api/api';
  import linkAge from '@/components/module/linkAge';
  import upload from '@/components/module/upload';
  export default {
    components:{
      'v-linkAge':linkAge,
      'v-upload':upload,
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
          currentPage: 1
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
          userAddress:'',
          desc: '',
          lng:'',
          lat:''
        },
        rules: {
          name: [
            { required: true, message: '请输入供应商名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { pattern: /^1[34578]\d{9}$/, message: '请输入正确手机号',trigger: 'blur'}
          ],
          textarea: [
            { required: true, message: '请输入供应商描述', trigger: 'blur' }
          ],
          userAddress: [
            { required: true, message: '请输入详细地址', trigger: 'blur' }
          ],
          lng: [
            { required: true, message: '请输入坐标', trigger: 'blur' },
            { pattern: /^[0-9]+[.]{1}[0-9]+$/, message: '请输入正确坐标', trigger: 'blur' }
          ],
          lat: [
            { required: true, message: '请输入坐标', trigger: 'blur' },
            { pattern: /^[0-9]+[.]{1}[0-9]+$/, message: '请输入正确坐标', trigger: 'blur' }
          ]
        },
        state: false,
        formLabelWidth: '100px',
        uploadShow:true,
        uploadImg:{
          action:supplierUploadImg,
          limit:3,
          imgArr:[
            {url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
            {url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
          ],
        },
        address:[]
      }
    },
    methods: {
      dataLoad(){
        supplierShowAPI({pageSize:this.page.pageSize,pageIndex:this.page.currentPage}).then((res)=>{
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
      supplierRemove(index, row){
        console.log(index,row)
        this.$confirm('此操作将永久删除该供应商, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          supplierRemoveAPI({supplierId:row.id}).then((res)=>{
            console.log(res)
            if(res.code == 200){
              this.$message.success(res.detail);
              this.dataLoad();
            }else{
              this.$message.error(res.detail)
            }
          })
        });

      },
      submitForm(formName) {
        console.log(this.address)
        console.log(this.uploadImg.imgArr)
        if(this.address.length != 4){
          return this.$message.error('请补全管理楼层');
        }
        if(this.uploadImg.imgArr.length == 0){
          return this.$message.error('至少上传一张图片');
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addSupplier();
          } else {
            console.log('error submit!!');
            return this.$message.error('请更正错误的填写内容');
          }
        });
      },
      submitFormClose(){
        this.dialogFormVisible = false;
        this.resetForm();
      },
      addSupplier(){
        let o = this.form;
        supplierAddAPI({
           sname:o.name,
           sphone:o.phone,
           provinceid:this.address[0].provinceId,
           provincename:this.address[0].provinceName,
           cityid:this.address[1].cityId,
           cityname:this.address[1].cityName,
           countyid:this.address[2].countyId,
           countyname:this.address[2].countyName,
           streetid:this.address[3].streetId,
           streetname:this.address[3].streetName,
           saddress:o.userAddress,
           list:(()=>{
             let arr = [];
             this.uploadImg.imgArr.forEach((n)=>{
               arr.push(n.url)
             });
             return arr.toString();
           })(),
           status: +this.state,
           createaccount:1,
           lng:o.lng,
           lat:o.lat,
           supplierdesc:o.textarea
        }).then((res)=>{
          console.log(res)
          if(res.code == 200){
            this.$message.success(res.detail);
            this.dataLoad();
            this.dialogFormVisible = false;
            this.resetForm();

          }else{
            this.$message.error(res.detail);
          }
        })
      },
      resetForm() {
        this.$refs.ruleForm.resetFields();
        this.address = [];
        this.uploadImg.imgArr = [];
      }
    }
  }
</script>
<style>

</style>
