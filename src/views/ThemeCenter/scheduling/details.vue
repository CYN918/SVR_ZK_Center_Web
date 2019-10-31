<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="fh()">排期管理&nbsp;/&nbsp;</span>
                <span class="new_url">排期详情</span>
            </div>
            <div>
                <span class="topName">{{this.$route.query.name}}</span>
                <span class="num">(1/2)</span>
                <div style="display: inline-block;float: right;margin-right: 15%;">
                    <span class="jl">查看更新记录</span>
                    <span class="zq" @click="Adds">管理周期</span>
                    <span class="dc">导出</span>
                </div>
            </div>
            <div>
                <span class="timeZQ">{{this.$route.query.cycle}}</span>
            </div>
        </div>

        <div class="seach">
            <div v-for="(item,index) in list" style="display: inline-block;vertical-align: top" >
                <div class="ADDtimes">
                    <div>
                        <span>{{'周期'+(index+1)}}</span>
                        <span class="num">(1/2)</span>
                        <img src="../../../../public/img/ups.png" v-if="index" @click="btn()">
                        <img src="../../../../public/img/btn.png">
                    </div>
                    <span>{{item.tstart+'至'+item.tend}}</span>
                </div>
                <div class="pd" v-for="da in listData[index]">
                   <div>
                       <span class="qdNmae">名称</span>
                       <span class="qdxq">{{da.name}}</span>
                   </div>
                    <div>
                        <span class="qdNmae">渠道</span>
                        <span  class="qdxq">{{da.channel_name==''?'本地':da.channel_name}}</span>
                    </div>
                    <div>
                        <span class="qdNmae">状态</span>
                        <span  class="qdxq">{{da.status==0?'待打包':'已上架'}}</span>
                    </div>
                    <div>
                        <span class="qdNmae">处理人</span>
                        <span  class="qdxq">{{da.creator}}</span>
                    </div>
                    <div>
                        <span class="xq" @click="CkDetails(da)">查看详情</span>
                    </div>
                </div>
                <div>
                    <div class="ADDtime" @click="AddXQ(item.cycle_id)">
                        <img src="../../../../public/img/add_msg.png">
                        <span  class="qdxq">添加需求</span>
                    </div>
                </div>

            </div>

            <div class="ADDtime" @click="Adds">
                <img src="../../../../public/img/add_msg.png">
                <span>添加周期</span>
            </div>
        </div>
        <div class="bg" v-if="add">
            <div class="newData">
                <div>
                    <span class="tit_top">管理周期</span>
                </div>
                <div >
                    <div v-for="(item,index) in list">
                        <span class="tit_name1">{{'周期'+(index+1)}}</span>
                        <div class="date">
                            <el-date-picker
                                    class="date1"
                                    @change="setTimes(index,item.cycle_id)"
                                    v-model="time[index]"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                            >
                            </el-date-picker>
                        </div>
                        <span style="width: 16px;height: 16px;color: #D3DBEB;display: inline-block;margin-left: 14px;line-height: 36px;cursor: pointer" @click="del(item.cycle_id)">x</span>
                    </div>

                    <div class="addData" @click="addTime()">
                        <img src="../../../../public/img/add_msg.png">
                        <span>添加周期</span>
                    </div>
                    <div class="ADDbtn">
                        <span class="tj" @click="addTime()">添加</span>
                        <span @click="heidADD()">取消</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "details",
        data(){
            return{
                list:[],
                add:false,
                time:[],
                up:1,
                listData:[],
            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            fh(){
                this.$router.go(-1)
            },
            addTime(){
                let formData =new FormData;
                formData.append('schedule_id',this.$route.query.schedule_id);
                formData.append('name',this.$route.query.name);
                formData.append('tstart',this.$route.query.tstart);
                formData.append('tend',this.$route.query.tend);
                this.api.themes_schedule_cycle_add(formData).then((res)=>{
                    this.getData()
                })
            },
            getData(){
                let params={schedule_id:this.$route.query.schedule_id};
                this.api.themes_schedule_cycles({params}).then((res)=>{
                    this.list=res;
                    var arr=[];
                    for(var i=0 ;i<res.length;i++){
                        arr[i]=[res[i].tstart,res[i].tend];
                    }
                    for(var i=0;i<this.list.length;i++){
                        this.demandList(this.list[i].cycle_id,i)
                    }
                    this.time=arr;

                })
            },
            demandList(id,index){
                let params={schedule_id:this.$route.query.schedule_id,cycle_id:id};
                this.api.themes_schedule_demands({params}).then((res)=>{
                    this.listData.push(res);
                    for(var i=0;i<this.listData.length;i++){
                        if(this.listData[i]==res&&i!=index){
                            if(this.listData[index]==undefined){
                                this.listData[index]='';
                            }
                            var arr=this.listData[index];
                            this.listData[index]=this.listData[i];
                            this.listData[i]=arr;
                        }
                    }
                })
            },
            setTimes(index,id){
                let formData=new FormData;
                formData.append('cycle_id',id);
                formData.append('schedule_id',this.$route.query.schedule_id);
                formData.append('name','周期'+(index+1));
                formData.append('tstart',this.time[index][0]);
                formData.append('tend',this.time[index][1]);
                this.api.themes_schedule_cycle_edit(formData).then((res)=>{
                    this.getData();
                })
            },
            del(id){
                let formData=new FormData;
                formData.append('cycle_id',id);
                this.api.themes_schedule_cycle_del(formData).then((res)=>{
                    this.getData();
                })
            },
            heidADD(){
                this.add=false
            },
            Adds(){
                this.add=true;
            },
            AddXQ(id){
              this.$router.push({
                  path:"./select_theme",
                  query:{
                      schedule_id:this.$route.query.schedule_id,
                      cycle_id:id,
                      tstart:this.$route.query.tstart,
                      tend:this.$route.query.tend,
                  },
              })
            },

            CkDetails(data){
                this.$router.push({
                    path:"./xqDetails",
                    query:{
                        data:data,
                        schedule_id:this.$route.query.schedule_id,
                    }
                })
            },
        },

    }
</script>

<style scoped>
    .top{
        width: 100%;
        height:126px;
        background: rgba(255,255,255,1);
        position: fixed;
        left: 256px;
        top: 64px;
        z-index: 99;
    }
    .topName{
        display: inline-block;
        font-size:18px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-left: 24px;
        margin-right: 10px;
        line-height: 45px;
    }
    .new_url{
        color: rgba(61,73,102,1)!important;
    }
    .jl,.zq,.dc{
        display: inline-block;
        cursor: pointer;
        text-align: center;
        line-height: 36px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
    }
    .jl{
        width:124px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        color:rgba(31,46,77,1);
        margin-right: 20px;
    }
    .zq{
        width:96px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        color:rgba(31,46,77,1);
        margin-right: 20px;
    }
    .dc{
        width:68px;
        height:36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        color:rgba(255,255,255,1);
    }
    .num{
        font-size:12px!important;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,0.45)!important;
    }
    .timeZQ{
        display: inline-block;
        margin-left: 24px;
        font-size:12px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    .seach{
        border-radius:4px;
        margin-top: 210px;
        margin-bottom: 24px;
        overflow-x: auto;
    }
    .ADDtime,.ADDtimes{
        display: inline-block;
        width:315px;
        height:72px;
        background:rgba(255,255,255,1);
        text-align: center;
        cursor: pointer;
        margin: 0 0 10px 0;
        vertical-align: top;
    }
    .ADDtimes{
        text-align: left!important;
        margin:0  10px 10px 0!important;
    }
    .ADDtimes>div>span{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 13px 0px 8px 20px;
    }
    .ADDtime img,.ADDtime span,.addData img,.addData span{
        position: relative;
        top:50%;
        transform: translateY(-50%);
    }
    .ADDtime img,.addData img{
        width: 12px;
        height: 12px;
        margin-right: 5px;
    }
    .ADDtime span,.addData span,.ADDtimes>span{
        display: inline-block;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.45);
    }
    .ADDtimes>span{
        margin-left: 20px;
    }
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        position: fixed;
        z-index: 9;
        bottom: 0;
        right: 0;
    }
    .newData{
        width:460px;
        min-height:255px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius:4px;
        position: relative;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    .tit_top{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin: 21px 0 24px 20px;
    }
    .tit_name{
        width: 104px;
        text-align: right;
        margin: 0 12px 0px 0px;
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
    }
    input{
        width:262px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-bottom: 20px;
    }
    .tit_name1{
        width: 104px;
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        text-align: right;
        margin: 0 12px 0px 0px;
    }
    .date{
        display: inline-block;
        width:272px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        margin-bottom: 20px
    }
    .date1{width: 100%}
    .date1 .el-input__inner{
        border: none;
    }
    .ADDbtn{
        text-align: center;
    }
    .ADDbtn span{
        display: inline-block;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        width:80px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
    .tj{
        background:rgba(51,119,255,1)!important;
        color: #fff!important;
        border: none!important;
        margin-right: 20px;
        margin-bottom: 20px;
    }
    .addData{
        display: inline-block;
        width:272px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        cursor: pointer;
        text-align: center;
        margin-left: 117px;
        margin-bottom: 20px;
    }
.ADDtimes>div>img{
    width:11px;
    height:6px;
    float: right;
    margin-right: 14px;
    margin-top: 15px;
}
    .pd{
        width:315px;
        height:130px;
        background:rgba(255,255,255,1);
        padding:14px 0px;
        margin-bottom: 10px;
    }
    .qdNmae{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,0.65);
        margin: 0 8px 8px 16px;
    }
    .xq{
        display: inline-block;
        margin-left: 16px;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
        cursor: pointer;
    }
    .qdxq{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(31,46,77,1);
    }
</style>