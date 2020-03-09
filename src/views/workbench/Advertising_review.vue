<template>
        <div>
            <div>
                <div class="top_name">
                    <div class="title_left">
                        <span>广告内容审核</span>
                        <span class='sh' @click='jump()'>图片审核</span>
                    </div>
                   
                    <div style="margin:24px 0">
                         <div class="date">
                            <el-date-picker
                                v-model="date"
                                type="date"
                                format="yyyy 年 MM 月 dd 日"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </div>
                        <span class='tits'>三方广告源ID：</span>
                        <select v-model="sdk_id" @change="ganged()">
                            <option value="">全部</option>
                            <option :value="item.sdk_id" v-for='(item,index) in adAPI'>{{item.sdk_id}}</option>
                        </select>
                        <span class='tits'>三方广告位ID：</span>
                        <select v-model="id_adsrc">
                            <option value="">全部</option>
                            <option :value="item" v-if='sdk_id!=""' v-for='item in adAPI[index].id_adsrc'>{{item}}</option>
                        </select>
                        <span class='tits'>状态</span>
                        <select v-model="status">
                            <option value="-1">全部</option>
                            <option value="0">待处理</option>
                            <option value="1">已处理</option>
                        </select>
                        <div class='sel'>
                            <span @click='getData()'>查询</span>
                            <span class='yjqr' @click='reset()' >重置</span>
                            <span class='yjqr' @click='tc()'>一键确认</span>
                        </div>
                    </div>
                    <div>
                        <span class='tits'>分类</span>
                        
                            <span class="labelName" @click="setTags()" :class="{active:ListTags.length==0}">全部</span>
                            <div class="tags" :class="{ALLtags:this.class==true}">
                                <span v-for="(item,index) in tagsList" class="labelName" @click="setTags(item.tags_name,index)" :class="{active:ListTags.indexOf(item.tags_name)!=-1}">{{item.tags_name}}</span>
                            </div>
                            <span class="tagsAll" v-if="this.class==false" @click="getTag">查看更多</span>
                            <span class="tagsAll" v-if="this.class==true" @click="heidTag">收起</span>   
                        </div>
                    
                </div>
            </div>
            <div  class="content_right">
                 <div class="titel_table">
                    <span class="circle"></span>
                    <span>共</span>
                    <span class="all">{{all}}</span>
                    <span>项&nbsp&nbsp</span>
                    <span>已处理</span>
                    <span >{{audited}}</span>
                    <span>项&nbsp&nbsp</span>
                    <span>剩余</span>
                    <span class="red">{{pending}}</span>
                    <span>项&nbsp&nbsp</span>
                </div>
            
                <div class='tableBox'>
                    <template>
                        <el-table
                                :data="tableData"
                                style="width: 100%;"
                                :header-cell-style="getRowClass"
                                :cell-style="cell"
                                >
                        
                            <el-table-column
                                    label="图片"
                                    width="150">
                                    <template slot-scope="scope">
                                        <img :src='tableData[scope.$index].image_url' style="max-width:80px;max-height: 80px;cursor: pointer"  preview="0" />
                                    </template>
                            </el-table-column>
                        
                            <el-table-column
                                    prop="a"
                                    width='90'
                                    label="落地页">
                                    <template slot-scope="scope">
                                        <a :href='tableData[scope.$index].preview_url' target="_blank" style="color:#3377ff;cursor: pointer">点击查看</a>
                                    </template>
                            </el-table-column>
                            <el-table-column
                                    prop=""
                                    label="AI标签">
                                    <template slot-scope="scope">
                                    <span v-for='val in tableData[scope.$index].ai_tags'>{{val.tags_name+"("+val.confidence+"%)"}},</span>
                                    </template>
                            </el-table-column>
                            <el-table-column
                                    prop=""
                                    label="分类">
                                    <template slot-scope="scope">

                                        <span class='tagsName'  
                                        v-for='(da,num) in tableData[scope.$index].tags' 
                                        :class="{'act': da.isShow}"  
                                        style="margin-right:15px" 
                                        @click='sgtData(da,tableData[scope.$index].mid,num,scope.$index)'
                                        >{{da.tags_name}}</span>

                                    </template>
                            </el-table-column>
                            <el-table-column
                                    prop=""
                                    width='90'
                                    label="确认状态">
                                    <template slot-scope="scope">
                                        <span>{{tableData[scope.$index].status_name}}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column
                            :show-overflow-tooltip="true"
                            width="90"
                                    prop="updated_at"
                                    label="更新时间">
                                    
                            </el-table-column>
                            <el-table-column 
                            width="90"
                            :show-overflow-tooltip="true"
                                    prop="updator"
                                    label="操作人员">
                                    
                            </el-table-column>
                        </el-table>
                    </template>
                </div>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            :current-page.sync="page"
                            :page-size="p"
                            layout="prev, pager, next,total, jumper"
                            :total="total">
                    </el-pagination>
		        </div>
            </div>    
            <div class='tcvBox' v-if='this.show'>
                <div class='box'>
                    <div class='box_tit'>
                        <span>
                            一键确认
                        </span>
                    </div>
                    <div class='box_con'>
                        <span>确认更新当前分类数据？</span>
                    </div>
                    <div class='btn'>
                    
                        <span class='qx' @click='heid()'>取消</span>
                        <span class='yes' @click='add()'>确认</span>
                    </div>
                    
                </div>
            </div>

        </div>
</template>

<script>
export default {
            data(){
                return{
                        adAPI:[],
                        sdk_id:'',
                        id_adsrc:"",
                        page:1,
                        date:'',
                        total:0,
                        tableData:[],
                        tagsList:[],
                        ListTags:[],
                        status:-1,
                        p:10,
                        index:0,
                        show:false,
                        advers:[],
                        class:false,
                        pending:"",
                        audited:"",
                        all:""
                }
            },
            methods:{
                reset(){
                    this.date='';
                    this.sdk_id='';
                    this.id_adsrc='';
                    this.tags_name=[];
                    this.status=-1;
                    this.page=1;
                },
                getRowClass({row, column, rowIndex, columnIndex}) {
                    if (rowIndex === 0) {
                        return 'background:rgb(246, 245, 245,1);color:rgba(30,30,30,1);text-align:center;font-size:16px;font-weight:blod;font-family:PingFang-SC-Regular;'
                    } else {
                        return ''
                    }
                },
                cell({row, column, rowIndex, columnIndex}){
                        return 'text-align:center;color:#000;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
                },
                getAPI(){
                        this.api.adver_tags_config_sdkid().then((res=>{
                            this.adAPI=res
                        }))
                },
                jump(){
                     this.$router.push({
                        path:"./Advertising_content_review"
                    })
                },
                 getTag(){
                     this.class=true;
                 },
                heidTag(){
                    this.class=false;
                },
                getTags(data){
                    let dataList=data;
                    this.advers=[];
                    this.api.adver_tags_config_opstags().then((res)=>{
                        res.forEach(item => {
                            item.isShow = false
                        })
                        this.tagsList = res
                        data.forEach((item, index) =>{
                            item.tags = JSON.parse(JSON.stringify(res))
                        })
                        this.tableData =data

                        for(var i=0;i<dataList.length;i++){
                            if(dataList[i].ops_tags.length!=0){
                                 var obj={
                                mid:'',
                                tags:[]
                            };
                                obj.mid=dataList[i].mid;
                                obj.tags=dataList[i].ops_tags;
                                this.advers.push(obj);
                                console.log(this.advers)
                                for(var s=0;s<dataList[i].ops_tags.length;s++){
                                    for(var j=0;j< this.tableData.length;j++){
                                        if(this.tableData[j].mid==dataList[i].mid){
                                            for(var k=0;k<this.tableData[j].tags.length;k++){
                                                if(this.tableData[j].tags[k].tags_name==dataList[i].ops_tags[s].tags_name){
                                                    this.tableData[j].tags[k].isShow=true;
                                                }
                                            }
                                        }
                                    } 
                                }
                             
                            }
                        }
                        this.updata();
                    })
                 },
                  handleSizeChange1(p) { // 每页条数切换
                    this.p = p;
                   
                    this.getData()
                },
                handleCurrentChange1(Page) {//页码切换
                    console.log(Page);
                    this.page = Page;
                    this.getData()
                },
                 getData(){
                     let params={status:this.status,sdk_id:this.sdk_id,tdate:this.date,id_adsrc:this.id_adsrc,tags_name:this.ListTags.join(','),p:this.p,page:this.page}
                     this.api.adver_tags_search({params}).then((res)=>{
                         this.total=res.total
                        this.getAPI() ;
                        this.updata();
                        this. getMessage();
                        this.getTags(res.data)
                     })
                 },
                ganged(){
                    if(this.sdk_id!=''){
                        for(var i=0;i<this.adAPI.length;i++){
                            if(this.sdk_id==this.adAPI[i].sdk_id){
                                this.index=i
                            }
                        }
                    }
                },
                updata(){this.$previewRefresh()},
                    tc(){
                    if(this.advers.length==0){
                        this.$message.error('请最少配置一个分类');
                        return
                        
                    }
                    this.show=true;
                },
                heid(){
                    this.show=false;
                },
                getMessage(){
                     let params={status:this.status,sdk_id:this.sdk_id,tdate:this.date,id_adsrc:this.id_adsrc,tags_name:this.ListTags.join(',')}
                    this.api.adver_tags_count({params}).then((res)=>{
                        this.pending=res.pending;
                        this.audited=res.audited;
                        this.all=res.total;
                    })
                },
                setTags(name){
                    if(!name){
                        this.ListTags=[];
                    }else{
                        if(this.ListTags.indexOf(name)==-1){
                            this.ListTags.push(name);

                        }else{
                            for(var i=0;i<this.ListTags.length;i++ ){
                                if(this.ListTags[i]==name){
                                    this.ListTags.splice(i,1);

                                }
                            }
                        }
                    }
                },
                sgtData(name,id,indexs, idxs){
                    this.tableData[idxs].tags[indexs].isShow = !this.tableData[idxs].tags[indexs].isShow
                    if(this.advers.length==0){
                            var obj={
                                mid:'',
                                tags:[]
                            };
                            obj.mid=id;
                            (obj.tags).push(name);
                            this.advers.push(obj); 
                            console.log(this.advers)                   
                            return
                    }
                    if(this.advers.length>0){
						var bFind = false;
                        for(var i=0;i<this.advers.length;i++){
                            if(this.advers[i].mid!=id){             
                                continue;
                            }
                            if(this.advers[i].mid==id&&(this.advers[i].tags).indexOf(name)==-1){
                                (this.advers[i].tags).push(name);
                                console.log(this.advers) 
                                return
                            }
                            if(this.advers[i].mid==id&&this.advers[i].tags.length>1){
                                for(var k=0;k<this.advers[i].tags.length;k++){
                                    if(this.advers[i].tags[k].tags_id==name.tags_id){
                                        (this.advers[i].tags).splice(k,1);
                                        console.log(this.advers) 
                                        return
                                    }
                                
                                }
                            }
                            if(this.advers[i].mid==id&&(this.advers[i].tags).indexOf(name)!=-1&&this.advers[i].tags.length<2){
                                this.advers.splice(i,1); 
                                console.log(this.advers)                           

                            }
                        }
						if(!bFind)
						{
							var obj = {
							    mid:'',
							    tags:[]
							};
							
							obj.mid=id;
							(obj.tags).push(name);
							this.advers.push(obj); 
							console.log(this.advers) 
							return
						}
                    }
                
                },
                add(){
                    let formData = new FormData;
                    formData.append('advers',JSON.stringify(this.advers));
                    this.api.adver_tags_audit(formData).then((res)=>{
                        if(res!=false){
                            this.advers=[];
                            this.getData();
                            this.heid();
                        }
                    })
                },
            },
            mounted(){
               
                  this.getData()
            }
}
</script>

<style scoped>
    .top_name{height: 230px}
    .top_txt,.title_left span{
        margin-left: 24px;
    }
    .title_left{
        padding-top: 24px;
         padding-bottom: 24px;
         border-bottom: 1px solid #ddd;
    }
    .tit_name,.tits{
        display: inline-block;
        font-size: 14px;
        font-family: PingFang-SC;
        font-weight: 500;
        color: rgba(31,46,77,1);
        margin:0 10px 0 24px;
    }
    select{
        width: 140px;
        height: 36px;
        background: rgba(255,255,255,1);
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
    }
    input{
        width: 80px;
        height: 30px!important;
        padding-left: 3px!important;
        border: 1px solid rgba(211,219,235,1)!important;
    }
    .date{
        display: inline-block;
        margin-left: 24px
    }
    .sel,.sh{
        display: inline-block;
        float: right;
        margin-right: 20%;
    }
    .sel span,.sh{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        border-radius: 5px;
        color: #f5f6fa;
        background: #3377ff;
        border: 0;
        text-align: center;
        margin-left: 15px;
        width:90px ;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
    }
   .yjqr,.sh{
       color: #3d3d3d!important;
        border: 1px solid #ddd!important;
        background: transparent!important;
   }
    .circle{
        display: inline-block;
        width: 16px;
        height: 16px;
        background: #98d6f1;
        border-radius: 50%;
        line-height: 36px;
        margin:9px 15px 0 15px;
    }
    .all{
        color:#4f4cf1
    }
    .red{
        color:red
    }
    .content_right{
        width: 100%;
        padding: 24px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #fff;
        margin-top: 316px
    }
     .titel_table{
        width: 100%;
        height: 36px;
        border: 1px solid #98d6f1;
        border-radius: 5px;
        margin: 15px 0;
        background: rgba(230, 247, 255, 1)
    }
    .titel_table>span{
        display: inline-block;
        line-height: 36px;
        font-size: 14px;
    }
    .title_top{
        margin-top: 60px;
    }
     .tcvBox{
    position: fixed;
    top: 65px;
    bottom: 0;
    right: 0;
    z-index: 999;
    background: rgba(0,0,0,.3);
    width: 100%;
    height: 100%;
}
.box{
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    background: rgba(255,255,255,1);
    -webkit-box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
    width:500px;
    height: 260px;
    border-radius: 8px;
}
.box_tit{
    width: 100%;
    height:40px;
    border-bottom: 1px solid #000;
    line-height: 40px;
}
.box_tit span{
    display: inline-block;
    margin-left: 24px;
    font-size: 16px;
    font-weight: bold;
    color:#000;
}
.box_con{
     width: 100%;
    height:90px;
    line-height: 90px
}
.box_con span{
    display: inline-block;
     margin-left: 24px;
    font-size: 14px;
    font-weight:400;
    color:#000;
}
.btn{
   width:100%;
   height: 90px;
   line-height: 90px 
}
.yes,.qx{
    display: inline-block;
    width: 90px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 3px;
    margin-right: 50px;
    float: right;
}
.yes{
    border: 0!important;
    background: #3377ff;
    color: #fff!important;
    margin-right: 24px!important;
    cursor: pointer;
}
.active{
    color: #fff!important;
    background: #3377ff!important;
    padding:0 3px;
}
.labelName:hover{
    margin-right: 24px!important
}
.ALLtags{
    height: 100%!important;
}
.tagsName{
        padding:0 5px;
        border:1px solid #000;
        border-radius: 3px;
        cursor: pointer;
        display: inline-block;
        height: 30px;
        line-height: 30px
    }
    .tagsName:hover{
        border: 0!important;
        background: #3377ff;
        color: #fff!important
    }
    .act{
         border: 0!important;
        background: #3377ff;
        color: #fff!important
    }
</style>