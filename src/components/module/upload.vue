<template lang="html">
    <div class="">
      <el-upload
        :action="upData.action"
        list-type="picture-card"
        name="files"
        :limit="upData.limit"
        :file-list="upData.imgArr"
        :on-change="uploadChange"
        :on-preview="handlePictureCardPreview"
        :on-success="uploadOK"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" append-to-body>
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
</template>

<script>
export default {
  props:{
    upData:{type:Object}
  },
  data(){
    return {
      dialogImageUrl: '',
      dialogVisible: false,
    }
  },
  methods:{
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.uploadParent(fileList)
    },
    handlePictureCardPreview(file){
      console.log(file)
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadChange(file, fileList){
      console.log(file, fileList);
      this.uploadParent(fileList)
    },
    uploadOK(response, file, fileList){
      console.log(response, file, fileList)
    },
    uploadParent(fileList){
      fileList.forEach(n =>{
        if(n.response){
          n.url = n.response;
        }
      })
      this.$emit('imgArr',fileList)
    }
  }
}
</script>

<style lang="css">
</style>
