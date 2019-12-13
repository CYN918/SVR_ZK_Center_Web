<template>
<div class='bg'>
    <div class='content'>
        <div class="titName">
                <span>预计结算数据详情</span>
                <img src="../../../public/img/gb.png" @click="heidMassage()">
        </div>
        <div class='switcher'>
            <span :class="{pitch:this.num==0}" style="margin-right:82px" @click='listData("0")'>结算数据</span>
            <span :class="{pitch:this.num==1}" @click='listData("1")'>数据凭证</span>
        </div>
        <div class='table' v-if='this.num==0'>
                <template>
                    <el-table
                            :data="list"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            >
                        <el-table-column
                                prop="id"
                                label="日期"
                                style="text-align:left"
                                >
                            <template slot-scope="scope" style="text-align:left">
                                <span>{{list[scope.$index].tdate}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="remit.receive_amount"
                                label="预期结算金额">
                            <template slot-scope="scope" style="text-align:right">
                                <span>￥{{parseFloat(list[scope.$index].income / 100).toFixed(2)}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
        </div>
        <div style='height:41px'  v-if='this.num==0'>
            <span style="display:inline-block;width:46%;text-align:left;font-size:12px;font-family:Roboto-Regular,Roboto;font-weight:400;color:rgba(23,43,77,1);margin-left:20px;line-height:41px">合计</span>
            <span style="display:inline-block;width:47%;text-align:right;font-size:12px;font-family:Roboto-Regular,Roboto;font-weight:400;color:rgba(23,43,77,1);margin-right:20px;line-height:41px">￥{{price}}</span>
        </div>
        <div class='CKmassage'  v-if='this.num==0'>
            <span @click="getMsg()">查看详细信息</span>
        </div>
       <div class="block"  v-if='this.num==0'>
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
</div>
</template>
<script>
export default {
props:['name','tstart','tend','is_receiver','a'],
components: {},
data() {
    return {
            list:[],
            p:50,
            page:1,
            total:0,
            num:0,
            price:'',
    };
},
    mounted(){
        this.getData();
    },
    methods: {
        heidMassage(){
                    this.$parent.heidDetail()
        },
        listData(num){
            this.num=num;
            this.getData();
        },
         handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.getData()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.getData()
            },
            getMsg(){
                if(this.a!=undefined){
                    this.$router.push({
                    path:"../income/Advertising",
                    query:{
                        tstart:this.tstart,
                        tend:this.tend,
                        is_receiver:this.is_receiver,
                        name:this.name,
                        }
                    })
                }else{
                     this.$router.push({
                    path:"../Advertising",
                    query:{
                        tstart:this.tstart,
                        tend:this.tend,
                        is_receiver:this.is_receiver,
                        name:this.name,
                    }
                })
                }
               
            },
        getData(){
            let params={name:this.name,tstart:this.tstart,tend:this.tend,is_receiver:this.is_receiver,p:this.p,page:this.page}
            this.api.settle_data_estimate_list({params}).then((res)=>{
                this.list=res.data;
                this.total=res.total;

                this.price = 0;
                for(var i=0;i<res.data.length;i++){

                //     unit+=parseFloat(res.data[i].income);
                // console.log(parseFloat(res.data[i].income))
                // }
                // console.log(unit)
                // this.price=unit;

                    this.price += parseFloat(res.data[i].income);
                }


                this.price = parseFloat(this.price / 100).toFixed(2);
            })
        },
        getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:rgba(247,249,252,1);color:rgba(31,46,77,1);text-align:center;font-size:14px;font-weight:500;font-family:PingFang-SC-Medium;height:56px'
                } else {
                    return ''
                }
            },
        cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;color:rgba(61,73,102,1);font-size:14px;font-weight:400;font-family:PingFangSC-Regula;'
        },    

    },
}
</script>
<style scoped>
.bg{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    position: fixed;
    z-index: 9;
    bottom: 0;
    right: 0;
}
    .content{
        position: absolute;
        left: 50%;
        top:30%;
        transform: translate(-50%,-50%);
        width:800px;
        height:546px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 6px 0px rgba(0,0,0,0.06);
        border-radius:4px;
        
        
    }
    .titName{
        height:44px;
        background:rgba(244,245,247,1);
        border-radius:4px 4px 0px 0px;
    }
    .titName span{
        display: inline-block;
        margin: 8px 0 4px 28px;
        font-size:16px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(23,43,77,1);
    }
    .titName img{
        width:16px;
        height:16px;
        float: right;
        margin: 14px 28px 0 0 ;
        cursor: pointer;
    }
    .switcher{
        height:48px;
        background:rgba(255,255,255,1);
        text-align: center;
    }
    .switcher span{
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(107,119,140,1);
        line-height: 48px;
        cursor: pointer;
        display: inline-block;
    }
    .pitch{
        color: #0052CC!important;
        border-bottom: 1px solid #0052CC
    }
    .table{
        height: 280px;
        margin-top: 1px;
        overflow-y:auto ;
    }
    .CKmassage{
        height: 30px;
        text-align: right;
    }
    .CKmassage span{
        display: inline-block;
        color: #0052CC;
        cursor: pointer;
        line-height: 30px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        margin-right: 20px;
    }
</style>