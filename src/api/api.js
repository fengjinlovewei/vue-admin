import axios from 'axios';
//axios.defaults.baseURL = '/api'
let base = '';
//export const orderAPI = params => { return axios.post(`${base}/order/order`, params).then(res => res.data); };

function filterData(data){
  if(data.code== 304){
    sessionStorage.removeItem('token');
    setTimeout(()=>{
      window.location.href='/#/login';
    })
  }else{
    return data;
  }
}
function getToken(){
  return sessionStorage.getItem('token');
}
//登录
export const login = params => { return axios.post(`${base}/login/index`, params).then(res => res.data); };
//小B展示管理
export const xiaoBshowAPI = params => { return axios.get(`${base}/member/list`,{ params: {...params,token:getToken()} }).then(res => filterData(res.data)); };
//供应商展示管理
export const supplierShowAPI = params => { return axios.get(`${base}/supplier/list`,{ params: {...params,token:getToken()} }).then(res => filterData(res.data)); };
//小B订单管理
export const xiaoBorderAPI = params => { return axios.get(`${base}/orderMember/list`,{ params: {...params,token:getToken()} }).then(res => filterData(res.data)); };
//供应商订单管理
export const supplierOrderAPI = params => { return axios.get(`${base}/supplierOrder/list`,{ params: {...params,token:getToken()} }).then(res => filterData(res.data)); };
//新增供应商接口
export const supplierAddAPI = params => { return axios.post(`${base}/supplier/save`,{ ...params,token:getToken() }).then(res => filterData(res.data)); };
//删除供应商接口
export const supplierRemoveAPI = params => { return axios.get(`${base}/supplier/delete`,{ params: {...params,token:getToken()}}).then(res => filterData(res.data)); };

//6级联动地址
export const provinceAPI = params => { return axios.get(`${base}/six/lecels/province`,{ params: params }).then(res => res.data); };
export const cityAPI = params => { return axios.get(`${base}/six/lecels/city`,{ params: params }).then(res => res.data); };
export const countyAPI = params => { return axios.get(`${base}/six/lecels/county`,{ params: params }).then(res => res.data); };
export const streetAPI = params => { return axios.get(`${base}/six/lecels/street`,{ params: params }).then(res => res.data); };
export const villageAPI = params => { return axios.get(`${base}/six/lecels/village`,{ params: params }).then(res => res.data); };
export const buildingAPI = params => { return axios.get(`${base}/six/lecels/building`,{ params: params }).then(res => res.data); };



//新增供应商上传图片接口
export const supplierUploadImg = `${base}/imgUpload/uploadSupplierPhoto`;
