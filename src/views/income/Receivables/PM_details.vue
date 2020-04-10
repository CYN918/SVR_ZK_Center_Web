<template>
  <div>
       <div class="top_name">
            <span class="top_txt">广告收款结算 /</span>
            <span class="top_txt">项目管理/</span>
            <span class="top_txt">项目详情</span>
            <div class="title_left">
                <span>项目详情</span>
                <span class='bj'>编辑</span>
            </div>
        </div>
        <div class='select_box'>
            <div class='select_tit'>
                <span>必要信息</span>
            </div>
            <div class='select_bh'>
                <span>企业微信审批编号:</span>
                <span></span>
            </div>
            <div class='select_box_1'>
                <span class='select_left'>项目名称：<span class="err">(存在项目重名，数据无效)</span></span>
                 <input type="text" class='input_left' v-model='project_name'>
                <span class='select_left'>合作公司：<span class="err">(合作公司不存在，数据无效)</span></span>
                <input type="text" class='input_left' @focus='focuson()' @blur="blur()" v-model='company_name' @input='focuson()'>
                <ul v-if='old'>
                    <li style="background:red" @click='oldADD(company_name)' v-if="company_name">新增"{{company_name}}"为合作公司</li>
                    <li v-for='(item,index) in company' @click='select_check(index)'>{{item.name}}</li>
                 </ul>
                <span class='select_left' style="width:100%">广告类型：一级分类 <span class="err">(数据异常，数据无效)</span></span>
                <select v-model='one' class='input_left' @change='getType()'>
                    <option :value="item" v-for="item in list">{{item}}</option>
                </select>   

            </div>
            <div class='select_box_2'>
                <span class='select_left'>结算主体：<span class="err">(结算主体不存在，数据无效)</span></span>
                 <el-autocomplete
                        class="inline-input"
                        v-model="state1"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        @select="handleSelect"
                        >
                    </el-autocomplete>
                 <span class='select_left'>上线时间：</span>
                  <el-date-picker
                    v-model="online_time"
                    class='datetime'
                    type="datetime"
                    placeholder="选择日期时间">
                </el-date-picker>
                <span class='select_left' v-if='one'>二级分类</span>
                 <select name="" id="" class='input_left' v-model='two'  v-if='one' @change='getType()'>
                    <option :value="item" v-for="item in list2">{{item}}</option>
                </select>
            </div>
            <div class='select_box_3'>
                <span class='select_left'  v-if='two'>三级分类</span>
                 <select name="" id="" class='input_left' v-model="three"  v-if='two'>
                     <option :value="item" v-for="item in list3">{{item}}</option>
                </select>
            </div>
           <div>
               <span class='sw'>商务模式</span>
               <span class="err">(数据异常，数据无效)</span>
           </div>
           <div>
               <template>
                    <el-table
                            :data="bussiness_types"
                            header-align="center"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            style="width: 100%;color:#000">
                        <el-table-column
                                label="生效时间" prop="open_id"
                               >
                        </el-table-column>
                        <el-table-column
                                label="失效时间" prop="account_name"
                                >
                        </el-table-column>
                        <el-table-column
                                label="计费方式" prop="contributor_type"
                                >
                            <template slot-scope="scope">
                                <span>{{tableData[scope.$index].contributor_type==1?'个人':'公司'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="分成模式(ZK)" prop="cash_money"
                                >
                        </el-table-column>
                        <el-table-column
                                label="结算模式" prop="toax_mney"
                                >
                        </el-table-column>
                         <el-table-column
                                label="固价价格" prop="toax_mney"
                                >
                        </el-table-column>
                         <el-table-column
                                label="修改时间" prop="toax_mney"
                                >
                        </el-table-column>
                        <el-table-column label="操作人员" prop="toax_mney">
                            
                        </el-table-column>
                    </el-table>
                </template>
           </div>

        </div>
        <div class='ht'>
            <div  class='select_tit'>
                <span style="margin-left:24px">相关合同 <span class="err">(待补充)</span></span>
            </div>
            <div><span class="ADDs" @click="ADDht()">添加合同</span></div>
             <div  class="contract">
                    <template>
                        <el-table
                                :data="contracts"
                                style="width: 100%"
                                :header-cell-style="getRowClass"
                                :cell-style="cell"
                        >
                            <el-table-column
                                    prop="date"
                                    show-overflow-tooltip
                            >
                                <template slot-scope="scope">
                                    <div v-for="(item,key) in (contracts[scope.$index])">
                                        <span class="titTableName">文件归档号:</span>
                                        <span class="titTableCon">{{item.archive_id}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    show-overflow-tooltip
                            >
                                <template slot-scope="scope">
                                    <div v-for="(item,key) in (contracts[scope.$index])">
                                        <span class="titTableName">合同编号:</span>
                                        <span class="titTableCon">{{item.contract_id}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    width="100"
                            >
                                <template slot-scope="scope">
                                    <div v-for="(item,key) in (contracts[scope.$index])">
                                        <span v-if="item.status=='1'" style="color:#39BD65">{{item.status_text}}</span>
                                        <span v-if="item.status=='0'" style="color:#FFA033">{{item.status_text}}</span>
                                        <span v-if="item.status=='2'" style="color:#F05656">{{item.status_text}}</span>
                                        <span v-if="item.status=='3'" style="color:#1F2E4D">{{item.status_text}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    width="50"
                            >
                                <template slot-scope="scope" >
                                    <img src="../../../../public/img/dels.png" style="cursor: pointer" @click="del(scope.$index)"/>
                                </template>
                            </el-table-column>
                            <el-table-column type="expand">
                                <template slot-scope="scope">
                                    <div v-for="(data,key) in (contracts[scope.$index])">
                                        <div v-for="da in data.contract_files">
                                            <span style="display: inline-block;width: 50%">{{da.name}}</span>
                                            <a :href="da.url" target="_blank" style="display: inline-block;width: 50%;text-align: right">下载</a>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
            </div>
        </div>
        <div class='fj'>
            <div   class='select_tit'>
                <span>附加信息</span>
            </div>
             <div class='select_bh'>
                <span>报备信息</span>
            </div>
            <div class='select_box_1'>
                <span class='select_left'>报备媒体：</span>
                 <input type="text" class='input_left' v-model="report_media">
                <span class='select_left'>广告主id：</span>
                <input type="text" class='input_left' v-model="report_ad_id">
                <span class='select_left' style="width:100%">直客链接是否自动更新版本：</span>
                <select name="" id="" class='input_left' v-model="report_link_auto_update">
                    <option value="0">否</option>
                    <option value="1">是</option>
                </select>   

            </div>
             <div class='select_box_2'>
                <span class='select_left'>报备广告位：</span>
                 <input type="text" class='input_left' v-model="report_space_id">
                <span class='select_left'>直客链接：</span>
                <input type="text" class='input_left' v-model="report_link">
            </div>
             <div class='select_bh'>
                <span>需求量级</span>
            </div>
            <div class='select_box_1'>
                <span class='select_left'>请求量：</span>
                 <input type="text" class='input_left' v-model="ad_req_pv">
                <span class='select_left'>点击量：</span>
                <input type="text" class='input_left' v-model="ad_click_pv">
            </div>
             <div class='select_box_2'>
                <span class='select_left'>展示量：</span>
                 <input type="text" class='input_left' v-model="ad_show_pv">
                <span class='select_left'>下载量：</span>
                <input type="text" class='input_left' v-model="ad_download_pv">
            </div>
             <div class='select_bh'>
                <span>备注</span>
            </div>
            <div>
                <textarea v-model="note"></textarea>
            </div>
             <div class='select_bh'>
                <span>附件：</span>
            </div>
            <div>
                <el-upload
                    class="upload-demo"
                    action="1"
                    multiple
                    >
                    <el-button size="small" type="primary">上传</el-button>
                </el-upload>
                <span></span>
                <span class='color'>查看</span>
                <span class='color'>下载</span>
            </div>
        </div>
        <div class='btns'>
                <span class='bc'>保存</span>
                <span>返回</span>
        </div>
         <div class="bg" v-if="ht">
            <div class="content">
                <div class="content_tit">
                    <span>添加合同</span>
                </div>
                <div>
                    <input type="text" class="content_input" placeholder="搜索文件归档号" v-model="contract_id"/>
                    <span class="content_seach" @click="getHT()">查询</span>
                </div>
                <div style="margin: 14px 20px" v-for="item in listS">
                    <div>
                        <span class="ContractID">合同编号：</span>
                        <span style="display: inline-block;width: 200px;height: 20px" class="ContractID">{{item.contract_id}}</span>
                        <span v-if="item.status=='1'" class="statusColor" style="color:#39BD65;float: right">{{item.status_text}}</span>
                        <span v-if="item.status=='0'" class="statusColor" style="color:#FFA033;float: right">{{item.status_text}}</span>
                        <span v-if="item.status=='2'" class="statusColor" style="color:#F05656;float: right">{{item.status_text}}</span>
                        <span v-if="item.status=='3'" class="statusColor" style="color:#1F2E4D;float: right">{{item.status_text}}</span>
                        <div>
                            <span  class="ContractID">归档文件：</span>
                            <div v-for="da in item.contract_files" style="display: inline-block">
                                <div>
                                    <span class="imgName">{{da.name}}</span>
                                    <a class="content_xz" target="_blank" :href="da.url" >下载</a>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
                <div class="content_btn">
                    <span class="btn_tj" @click="heidHT()">添加</span>
                    <span @click="heidHTs()">取消</span>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
            data(){
                return{
                    ht:false,
                       level:"",
                       list:[],
                       list2:[],
                       list3:[],
                       one:"",
                       two:"",
                       three:"",
                       tableData:[],
                       online_time:"",
                       old:false,
                       company:[],
                       company_name:"",
                       listData:{},
                       project_name:"",
                       company_id:"",
                       ad_type:"",
                       bussiness_types:[],
                       attachements:[],
                       contracts:[],
                       contract:[],
                       report_media:"",
                       report_ad_id:"",
                       report_space_id:'', 
                       report_link:"",
                       ad_req_pv:"",
                       ad_click_pv:"",
                       ad_show_pv:"",
                       ad_download_pv:"",
                       note:"",
                       report_link_auto_update:'',
                       contract_id:'',
                       listS:[],
                       state1:"",

                }
            },
            mounted(){
                this.getDataList()
            },
            methods:{
                getRowClass({row, column, rowIndex, columnIndex}) {
                    if (rowIndex === 0) {
                        return 'background:rgba(247,249,252,1);color:rgba(31,46,77,1);text-align:center;font-size:14px;font-weight:blod;font-family:PingFang-SC-Medium;height:56px'
                    } else {
                        return ''
                    }
                },
                cell({row, column, rowIndex, columnIndex}){
                    return 'text-align:center;color:rgba(61,73,102,1);font-size:14px;font-weight:400;font-family:PingFangSC-Regula;'
                },
                getDataList(){
                    let params={project_id:this.$route.query.project_id}
                    this.api.adproject_detail({params}).then((res)=>{
                        this.listData=res
                        this.getType();
                        this.getJS()
                    })
                },
                getType(){
                    if(this.one!=''&&this.three==''){
                        this.level=2
                        let params={level:this.level,levelname:this.one}
                        this.api.adproject_adtype({params}).then((res)=>{
                            this.list2=res
                        })
                    }
                    if(this.one!=''&&this.two!=''){
                        this.level=3
                        let params={level:this.level,levelname:this.one,level2name:this.two}
                        this.api.adproject_adtype({params}).then((res)=>{
                            this.list3=res
                        })
                    }
                    if(this.one==''){
                         this.api.adproject_adtype().then((res)=>{
                            this.list=res
                        })
                    }
                   
                },
                ADDht(){
                     this.ht=true;
                     console.log(this.ht)
                },
                focuson(){
                    let params={search:this.company_name}
                    this.api.adproject_adcompany_list({params}).then((res)=>{
                        this.company=res
                    })
                   this.old=true;
                   
                },

                select_check(index){
                    this.company_name=this.company[index].name;
                    this.company_id=this.company[index].company_id
                    this.old=false
                },
                oldADD(company_name){
                    let formData=new FormData;
                    formData.append('company_name',company_name)
                    this.api.adproject_adcompany_add(formData).then((res)=>{
                        if(res!=false){
                            this.old=false
                            this.company_id=this.company[0].company_id
                        }
                    })  
                },
                 heidHTs(){
                    this.ht=false;
                    this.contract_id='';
                    this.listS=[];
                },
                 heidHT(){
                   
                        this.ht=false;
                        this.contract.push((this.listS[0]).archive_id);
                        this.contracts.push(this.listS);
                        this.contract_id='';
                        this.listS=[];
                    
                },
                getHT(){
                    let params={contract_id:this.contract_id};
                    this.api.common_contract({params}).then((res)=>{
                        this.listS=res;
                    })
                },
                 del(index){
                    this.contracts.splice(index,1);
                },
                getJS(){
                    console.log('aaa')
                    this.JSlist=[];
                    let params={search:this.state1}
                    this.api.settle_settlement_searchall({params}).then((res)=>{
                        this.JSlist=res
                    })
                },
                 handleSelect(item) {
                    console.log(item);
                },
                querySearch(queryString, cb) {
                    var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                    // 调用 callback 返回建议列表的数据
                    cb(results);
                },
                createFilter(queryString) {
                    return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                    };
                },
            },
}
</script>

<style scoped>
     .top_name{
        height:112px!important;
        background:rgba(255,255,255,1);
    }
    .title_left span{
        display: inline-block;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(50,50,50,1);
        margin-left: 24px;
        text-align: right;
    }
    .top_txt{
        display: inline-block;
        margin-left: 24px;
    }
    .bj{
        display: inline-block;
        width: 90px;
        height: 36px;
        text-align: center!important;
        line-height: 36px!important;
        background: #3377ff;
        color: #fff!important;
        border-radius: 3px;
        float: right;
        font-size: 14px!important;
        font-weight: 400!important;
        margin: 0px 20% 0 0!important;
        cursor: pointer;
    }
    .select_box{
        width: 100%;
        background: #fff;
        min-height: 671px;
        margin-top:195px ;
    }
    .select_tit{
        width: 100%;
        height: 48px;
        border-bottom: 1px solid #ddd;
    }
    .select_tit span{
        display: inline-block;
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:22px;
        color:rgba(50,50,51,1);
        line-height: 48px;
    }
    .select_bh{
        margin-top: 24px;

    }
    .select_bh span{
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:22px;
        color:rgba(50,50,51,1);
    }
    .select_box_1,.select_box_2,.select_box_3{
        display: inline-block;
        margin-right: 183px;
    }
    .select_box_1{
        position: relative;
    }
    ul{
        width: 268px;
        max-height: 400px;
        overflow-y:auto ;
        position: absolute;
        top:176px;
        background: #fff;
        box-shadow: 3px 5px 3px 3px #ddd;
        z-index: 6;
    }
    li{
        width: 100%;
        height: 36px;
        font-size: 14px;
        text-align: center;
        background: #ddd;
        border-bottom: 1px solid #fff;
        line-height: 36px;
        cursor: pointer;
    }
    li:hover{
        background: #3377ff;
        color:#fff
    }
    .select_box_2{
        vertical-align: top;
    }
    .select_tit_name{

        margin: 24px 0 8px 24px;
    }
    .select_left{
        display: block;
        width:100%;
        height:20px;
        font-size:14px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:20px;
        color:rgba(50,50,51,1);
        margin: 24px 0 8px 0;
    }
   
    .select_box>div,.fj>div{
        margin-left: 24px;
    }
    .select_box>div input,.fj>div input{
        width:263px;
        height:32px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(220,222,224,1);
        opacity:1;
        border-radius:2px;
        padding-left:5px ;
    }
     .select_box>div select,.datetime ,.fj>div select{
         width:268px;
        height:32px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(220,222,224,1);
        opacity:1;
        border-radius:2px;
     }
     .input_left{
         
         display: block;
     }
     .sw{
         display: inline-block;
         font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:22px;
        color:rgba(50,50,51,1);
        margin: 24px 10px 16px 0;
     }
     .err{
        font-size:12px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:17px;
        color:rgba(212,0,0,1); 
     }
     .ht{
         width: 100%;
         min-height: 104px;
         margin-top: 24px;
         background: #fff;
     }
     .fj{
         width: 100%;
         margin-top: 24px;
         background: #fff;

     }
     textarea{
         width:719px;
        height:117px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(220,222,224,1);
        margin: 8px 0 24px 0;
     }
     .upload-demo{
         margin:8px 0 0 0 ;
     }
     .color{
         display: inline-block;
         font-size:14px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:20px;
        color:rgba(21,91,212,1);
        cursor: pointer;
        margin:16px 0 24px 8px;
     }
     .btns{
         margin-top: 24px;
         height:56px;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 4px rgba(200,201,204,0.5);
        line-height: 56px;
     }
     .btns span{
         display: inline-block;
         cursor: pointer;
         text-align: center;
         width:74px;
        height:32px;
        border:1px solid rgba(220,222,224,1);
        opacity:1;
        line-height: 32px;
        border-radius:4px;
        font-size:14px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(50,50,51,1);   
     }
     .bc{
         background: #3377ff!important;
         border:0!important;
         color: #fff!important;
         margin: -10px 16px 0 24px;
     }
      .ADDs{
        margin:16px 24px ;
        display: inline-block;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        width:96px;
        height:36px;
        background:#3377ff;
        border-radius:4px;

        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:#fff;
    }
     .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0
    }
    .content{
        position: relative;
        left: 50%;
        top: 30%;
        transform: translate(-50%,-50%);
        width:460px;
        height:312px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius:4px;
    }
    .content_tit span{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 21px 0 24px 20px;
    }
    .content_btn{
        position: absolute;
        width: 100%;
        bottom: 0;
        margin-bottom: 24px;
        text-align: right;
    }
.content_btn span{
    display: inline-block;
    text-align: center;
    line-height: 36px;
    cursor: pointer;
    width:80px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    margin-right: 20px;
}
 .btn_tj{
        color: #fff!important;
        background: #3377ff!important;
        border: none!important;
    }
     .content_input{
        width:190px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        padding-left: 10px;
        margin:0  24px 0 20px;
    }
    .content_seach{
        display: inline-block;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
    }
    .content_ck, .content_xz{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
        margin-left: 10px;
        cursor: pointer;
    }
</style>