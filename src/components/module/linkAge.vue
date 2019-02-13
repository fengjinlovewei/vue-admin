<template lang="html">
    <div class="">
      <el-row>
        <el-col :span="8" v-if="1 <= length">
          <el-select v-model="province.value" placeholder="请选择省" @change="cityGET">
            <el-option
              v-for="item in province.options"
              :key="item.provinceId"
              :label="item.provinceName"
              :value="item.provinceId">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8" v-if="2 <= length">
          <el-select v-model="city.value" placeholder="请选择市" @change="countyGET">
            <el-option
              v-for="item in city.options"
              :key="item.cityId"
              :label="item.cityName"
              :value="item.cityId">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8" v-if="3 <= length">
          <el-select v-model="county.value" placeholder="请选择区" @change="streetGET">
            <el-option
              v-for="item in county.options"
              :key="item.countyId"
              :label="item.countyName"
              :value="item.countyId">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="height:20px;"></el-row>
      <el-row>
        <el-col :span="8" v-if="4 <= length">
          <el-select v-model="street.value" placeholder="请选择" @change="villageGET">
            <el-option
              v-for="item in street.options"
              :key="item.streetId"
              :label="item.streetName"
              :value="item.streetId">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8" v-if="5 <= length">
          <el-select v-model="village.value" placeholder="请选择" @change="buildingGET">
            <el-option
              v-for="item in village.options"
              :key="item.villageId"
              :label="item.villageName"
              :value="item.villageId">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8" v-if="6 <= length">
          <el-select v-model="building.value" placeholder="请选择" @change="lastNext">
            <el-option
              v-for="item in building.options"
              :key="item.buildingId"
              :label="item.buildingName"
              :value="item.buildingId">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import { provinceAPI ,cityAPI ,countyAPI ,streetAPI ,villageAPI ,buildingAPI} from '@/api/api';
export default {
  props:{
    length:{type:Number}
  },
  created(){
    this.provinceGET();
  },
  data(){
    return {
      province:{
        options:[],
        value:''
      },
      city:{
        options:[],
        value:''
      },
      county:{
        options:[],
        value:''
      },
      street:{
        options:[],
        value:''
      },
      village:{
        options:[],
        value:''
      },
      building:{
        options:[],
        value:''
      }
    }
  },
  methods:{
    emptyAddress(index){
      let arr = ['city','county','street','village','building'];
      arr.forEach((n,i)=>{
        if(i >= index){
          this[n].options = [];
          this[n].value = '';
        }
      })
    },
    provinceGET(){
      provinceAPI().then(res=>{
        this.province.options = res.detail;
      });
      this.lastNext();
    },
    cityGET(id){
      this.emptyAddress(0);
      cityAPI({provinceid:id}).then(res=>{
        this.city.options = res.detail;
      });
      this.lastNext();
    },
    countyGET(id){
      this.emptyAddress(1);
      countyAPI({cityid:id}).then(res=>{
        this.county.options = res.detail;
      });
      this.lastNext();
    },
    streetGET(id){
      this.emptyAddress(2);
      streetAPI({countyid:id}).then(res=>{
        this.street.options = res.detail;
      });
      this.lastNext();
    },
    villageGET(id){
      this.emptyAddress(3);
      villageAPI({streetid:id}).then(res=>{
        this.village.options = res.detail;
      });
      this.lastNext();
    },
    buildingGET(id){
      this.emptyAddress(4);
      buildingAPI({villageid:id}).then(res=>{
        this.building.options = res.detail;
      });
      this.lastNext();
    },
    lastNext(){
      let arr = ['province','city','county','street','village','building'];
      let data =[];
      arr.forEach((n)=>{
        console.log(this[n].value)
        let val = this[n].value;
        if(val !== ''){
           let obj = this[n].options.find((item)=>{//这里的userList就是上面遍历的数据源
               return item[n+'Id'] === val;//筛选出匹配数据
           });
          data.push(obj)
        }
      });

      this.$emit('address',data)
    }
  }
}
</script>

<style lang="css">
</style>
