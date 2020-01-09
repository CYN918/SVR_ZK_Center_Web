
<template>
<div >
       <div class="top_name">
                <span class="top_txt">杂志锁屏物料预审</span>
                <span class='qdName'>渠道</span>
                <select v-model="channel">
                        <option :value="item.channel" v-for="item in qdLists">{{item.channel}}</option>
                </select>
                <span class='userGl' @click="jump()">账号管理</span>
        </div>
        <div class='screening'>
                 <div class="date">
                    <el-date-picker
                            v-model="date"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <span class='qdName'>状态</span>
                <select v-model="status">
                    <option value="0">待审核</option>
                    <option value="1">审核通过</option>
                    <option value="-1">审核未通过</option>
                </select>
                <div class='btn_sx'>
                    <span class='cx' >查询</span>
                    <span class='cz' >批量操作</span>
                    <span class='dc'>导出</span>
                </div>
               
        </div>
        <div style="margin-top:230px;background:#fff" class='rePadding'>
             <template>
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            @selection-change="handleSelectionChange"
                            >
                          <el-table-column
                            type="selection"
                            width="50" style="padding:0 auto!important">
                        </el-table-column>    
                        <el-table-column
                                prop="num"
                                label="序号">
                            <template slot-scope="scope">
                                <span>{{scope.$index+1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="sdkid"
                                label="广告图">
                        </el-table-column>
                        <el-table-column
                                prop="count"
                                label="落地页">
                        </el-table-column>
                         <el-table-column
                                prop="count"
                                label="杂志锁屏">
                        </el-table-column>
                         <el-table-column
                                prop="status"
                                label="状态">
                        </el-table-column>
                         <el-table-column
                                prop="count"
                                label="更新时间">
                        </el-table-column>
                         <el-table-column
                                prop="count"
                                label="操作人员">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="150"
                        >
                            <template slot-scope="scope">
                                 <el-button  type="text" size="small" v-if='tableData[scope.$index].status=="1"' @click='updateStatus()'>审核</el-button>
                                 <el-button v-if='tableData[scope.$index].status=="-1"' type="text" size="small">修改结果</el-button>
                                <el-button  type="text" size="small" @click="details(scope.$index)">查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                 <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="page"
                            :page-size="p"
                            layout="prev, pager, next,total, jumper"
                            :total="total">
                    </el-pagination>
                 </div>
        </div>
        <div class="bg" v-if="tc">
            <div class='content'>
                <div class='con_tit'>
                    <span>更新状态</span>
                </div>
                <div class='sel'>
                    <select v-model="status2">
                        <option value="已上线">已上线</option>
                        <option value="拒绝上线">拒绝上线</option>
                    </select>
                    <div class='sel_1' v-if="status2=='拒绝上线'">
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox label="测试不通过" class='aaa'></el-checkbox>
                            <el-checkbox label="内容差"  class='aaa'></el-checkbox>
                            <el-checkbox label="屏蔽竞品"  class='aaa'></el-checkbox>
                            <el-checkbox label="其他"  class='aaa bb'>
                                <template>
                                    <span style="margin-right:10px">其他</span>
                                    <textarea placeholder="最多20字" maxlength="20"></textarea>
                                </template>
                            </el-checkbox>
                        </el-checkbox-group>
                        
                    </div>
                </div>
                <div class='sel_btn'>
                    <span class="sel_btn_qd">确定</span>
                    <span @click='qx()'>取消</span>
                </div>
            </div>
        </div>
</div>
</template>

<script>


export default {

components: {},
data() {

return {
       qdLists:[], 
       channel:"",
       date:'',
       status:'',
       tableData:[{sdkid:"1",status:'1'}],
        page:1,
        p:10,
        total:0,
        tc:false,
        status2:"",
        checkList:[],
};
},




methods: {
    getChannel(){
                    this.api.pushlib_configs_channel().then((res)=>{
                        this.qdLists=res;
                    })
                },
     getRowClass({row, column, rowIndex}) {
                if (rowIndex === 0) {
                    return 'background:#f7f9fc;color:#1F2E4D;font-size:14px;font-weight:bold;height:48px;font-family:PingFang-SC-Regular;padding:20px 0px 20px 14px'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'padding:15px 14px;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                
            },  
             handleSelectionChange(val) {
                this.multipleSelection = val;
             },  
             jump(){
                 this.$router.push({
                     path:"./Journal_user"
                 })
             },
              updateStatus(){
               this.tc=true;
           }, 
            qx(){
               this.tc=false;
               this.status='';
               this.checkList=[];
           }, 
           details(index){
                this.$router.push({
                    path:"./Journal_details"
                })
           }     
},

created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
     this.getChannel();
},

}
</script>
<style  scoped>
  .top_name{
        height: 62px;
        border: 0;
    }
.top_txt{
    margin-left: 24px;
    font-size: 18px;
    font-family: PingFang-SC;
    font-weight: 500;
    line-height: 62px;
    color: rgba(31,46,77,1);
}
.qdName{
    display: inline-block;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(50,50,50,1);
    margin-left: 40px
}
 select{
    margin-left: 20px;
    width: 200px;
    height: 36px;
    border-radius: 5px;
}
.userGl{
    float: right;
    display: inline-block;
    height: 36px;
    text-align: center;
    line-height: 36px;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid rgba(211,219,235,1);
    width: 144px;
    background: rgba(242,246,252,1);
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(61,73,102,1);
    margin: 10px 20% 0 0 
}
.screening{
    position: fixed;
    width: 100%;
    height: 60px;
   left: 256px;
   top:145px;
    background: #fff
}
.date{
        margin:10px 12px 0 24px;
        display: inline-block;
    }
    .btn_sx{
        display: inline-block;
        float:right;
        margin: 10px 20% 0 0 
    }
    .cx{
        display: inline-block;
        height: 36px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
        width: 68px;
        background: rgba(51,119,255,1);
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255,255,255,1);
        margin-right: 20px;
    }
    .cz,.dc{
            display: inline-block;
        height: 36px;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid rgba(211,219,235,1);
            width: 144px;
        background: rgba(242,246,252,1);
        border: 1px solid rgba(211,219,235,1);
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(61,73,102,1);
    }
    .dc{
        width: 68px!important;
        margin-left: 20px
    }
     .bg{
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
    }
    .content{
        width: 400px;
        max-height:400px;
        position: absolute;
        top:30%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 10px;
    }
    .con_tit{
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #ddd;
    }
    .con_tit span{
        display: inline;
        margin-left: 24px;
        display: inline-block;
        line-height: 40px;
        font-size: 18px;
        font-weight: 500;
    }
    .sel{
        margin: 20px 0;
    }
    .sel select{
        width: 200px;
        height: 36px;
        margin-left: 24px;
        border-radius: 5px;
    }
    .sel_1{
        margin: 30px 0 0px 24px;
    }
    .aaa{
          display: block!important;
      margin: 0 0 15px 0 !important
    }
     .bb span{
        vertical-align: top;
    }
   .bb textarea{
       padding: 5px
   }
   .sel_btn{
       width: 100%;
       height: 50px;
       text-align: right;
   }
   .sel_btn span{
    margin-right: 24px;
    display: inline-block;
    width: 68px;
    height: 36px;
    background: rgba(255,255,255,1);
    border-radius: 4px;
    border: 1px solid rgba(211,219,235,1);
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(61,73,102,1);
    line-height: 36px;
    cursor: pointer;
    text-align: center;
    margin-top: 7px
   }
   .sel_btn_qd{
       border: 0!important;
    background: rgba(51,119,255,1)!important;
    color: rgba(255,255,255,1)!important;
   }
</style>