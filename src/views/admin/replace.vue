<template>
    <div class="content_right">
        <div class="titel_table">
            <span class="circle"></span>
            <span>共</span>
            <span class="all">{{this.tableData.length}}</span>
            <span>项&nbsp&nbsp</span>
            <span>已处理</span>
            <span >{{cl.length}}</span>
            <span>项&nbsp&nbsp</span>
            <span>剩余</span>
            <span class="red">{{dcl.length}}</span>
            <span>项&nbsp&nbsp</span>
        </div>
        <div>
            <div class="block" style="display: inline-block">
                <el-date-picker
                        v-model="times"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd ">
                </el-date-picker>
            </div>
            <span class="cx" @click="getList()">
                查询
            </span>
        </div>
        <div>
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        :header-cell-style="getRowClass"
                        :cell-style="cell"
                        border>
                    <el-table-column
                            prop="adid"
                            label="广告ID">
                    </el-table-column>
                    <el-table-column
                            prop="original_res.length"
                            label="原始图数量">
                    </el-table-column>
                    <el-table-column
                            prop="tdate"
                            sortable
                            label="内容获取时间">
                    </el-table-column>
                    <el-table-column
                            prop="model"
                            sortable
                            label="替换资源数量">
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            sortable
                            label="状态">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button @click="getAdd(tableData[scope.$index].adid)" type="text" size="small">查看详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>

    </div>
</template>

<script>
    export default {
        name: "replace",
        data(){
            return{
                tableData:[],
                times:[],
                cl:[],
                dcl:[]
            }
        },
        mounted(){
            this.getList();
        },
        methods:{
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgb(246, 245, 245,1);color:rgba(30,30,30,1);text-align:center;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:#000;font-size:16px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件`);
            },

            getList(){
                let params ={start_date:this.times[0],end_date:this.times[1]}
                this.api.replace_pending_list({params}).then((res)=>{
                    this.tableData = res;
                    for(var i =0;i<this.tableData.length;i++){
                        if(this.tableData[i].status==1){
                            this.tableData[i].status='已处理'
                            this.cl.push(this.tableData[i]);
                        }else{
                            this.tableData[i].status='待处理'
                            this.dcl.push(this.tableData[i]);
                        }
                    }
                })
            },
            getAdd(data){
                this.$router.push({
                    query:{id:data},
                    path:'./Has_replaced'
                })
            },

        },
    }
</script>

<style scoped>
.content_right{
    width: 100%;
    padding: 24px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #fff;
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
.bg{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.2);
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
}
.content{
    background: #fff;
    width: 890px;
    height: 500px;
    padding: 24px;
    border-radius: 10px;
    margin-top: 30%;
    margin-left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
}
.del{
    background: #fff;
    width: 400px;
    height: 150px;
    padding: 24px;
    border-radius: 10px;
    margin-top: 20%;
    margin-left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
}
.tit{
    border-bottom: 1px solid #ddd;
}
.tit span{
    display:inline-block;
    height: 36px;
    line-height: 36px;
    font-size: 18px;
    font-weight: bold;
}
.move{
    width: 100%;
    margin-top: 20px;
}
.move span{
    display: inline-block;
    height: 36px;
    line-height: 36px;
    font-size: 16px;
    font-weight: bold;
}
.btn{
    margin-top: 20px;
    text-align: center;
}
.btn span{
    display: inline-block;
    height: 36px;
    line-height: 36px;
    width: 80px;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid #dfdfdf;
    text-align: center!important;
}
.th{
    color: #f5f6fa!important;
    background: #4f4cf1!important;
    border: 0!important;
    margin-right: 40px!important;
}
.box_content div{
    margin-top: 20px;
}
.box_content span{
    display: inline-block;
    width: 150px;
    text-align: right;
    font-size: 16px;
    margin-right: 15px;
    line-height: 36px;
}
.box_content input{
    width: 200px;
    height: 36px;
    padding-left: 10px;
}
.upload-demo{
    display: inline-block;
    margin-top: 20px;
    width: 150px;
    margin-left: 165px;
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
.cx{
    display: inline-block;
    height: 36px;
    line-height: 36px;
    width: 80px;
    cursor: pointer;
    border-radius: 5px;
    color: #f5f6fa;
    background: #4f4cf1 ;
    border: 0;
    text-align: center;
    margin:20px 0 20px 24px ;
}
</style>