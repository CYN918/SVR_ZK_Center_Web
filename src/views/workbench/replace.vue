<template>
    <div>
        <div>
            <div class="top_name">
                <span class="top_txt">运营工具&nbsp;/&nbsp;资源待替换</span>
                <div class="title_left">
                    <span>资源待替换</span>
                </div>
            </div>
        </div>
        <div class="content_right">
            <div style="padding: 0 24px">
                <span style="font-size: 14px">数据源:</span>
                <select v-model="is_preview" style="margin-right: 10px;width: 150px">
                    <option value="0">图片逻辑</option>
                    <option value="1">落地页逻辑</option>
                </select>
                <select v-model="source" style="margin:0 20px 0 10px;width: 150px">
                    <option value="SDK-API">SDK-API</option>
                    <option value="own">OWN</option>
                </select>
                <span class="tit_text">SDK_ID:</span>
                <input type="text" placeholder="请输入sdkID查询" v-model="text"/>
                <span class="cx" @click="getList()">
                查询
            </span>
                <span class="reset" @click="resetRemove">重置</span>
                 <span class="educe" @click="downloadImg()">导出</span>
                <span class="batch_upload" @click="batchUpload()">批量上传</span>
                <div>
                    <div class="block" style="display: inline-block">
                    <el-date-picker
                            v-model="tdate"
                            type="date"
                            @change="getTimes()"
                            placeholder="选择日期"
                            format="yyyy年MM月dd日"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                    <span class="tit_text" >获取次数:</span>
                    <div class="select_check">
                        <template>
                            <el-select
                                    v-model="number"
                                    multiple
                                    filterable
                                    allow-create
                                    default-first-option
                                    placeholder="0点截止到最新时段">
                                <el-option
                                        v-for="item in options5"
                                        :key="item.hour"
                                        :label="item.desc"
                                        :value="item.hour">
                                </el-option>
                            </el-select>
                        </template>
                    </div>
                </div>
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
                                prop="sdk_id"
                                label="SDK_ID">
                        </el-table-column>
                        <el-table-column
                                prop="pv"
                                sortable
                                label="数据访问量">
                        </el-table-column>
                        <el-table-column
                                prop="ratio"
                                sortable
                                label="访问占比">
                        </el-table-column>
                        <el-table-column
                                label="访问量趋势">
                            <template slot-scope="scope">
                                <img src="../../../public/img/qs.png" style="max-height: 40px;max-width: 80px" @click="getTendency(tableData[scope.$index].sdk_id)">
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="created_at"
                                sortable
                                label="内容获取时间">
                        </el-table-column>
                        <el-table-column
                                prop="had_replace"
                                sortable
                                label="替换资源数量">
                        </el-table-column>
                        <el-table-column
                                prop="sucess_ratio"
                                sortable
                                label="替换占比">
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <el-button @click="getAdd(tableData[scope.$index].sdk_id)" type="text" size="small">查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
            <div class="blocks">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="p"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
            <div class="bg" v-if="upload">
                <div class="load">
                    <div class="load_tit">
                        <span>批量上传</span>
                    </div>
                    <div class="load_upload">
                        <el-upload
                                class="upload-demo"
                                action="aaaa"
                                multiple
                                :on-exceed="handleExceed"
                                :limit="100"
                                :on-error="error"
                                :http-request="beforupload"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                    <div class="table_load">
                        <template>
                            <el-table
                                    :data="tableDataList"
                                    style="width: 100%"
                                    :header-cell-style="getRowClass"
                                    :cell-style="cell"
                                    border>
                                <el-table-column
                                        prop="name"
                                        :show-overflow-tooltip="true"
                                        label="文件名">
                                </el-table-column>

                                <el-table-column
                                        prop="size"
                                        label="分辨率">
                                </el-table-column>
                                <el-table-column
                                        prop="status"
                                        label="状态">
                                    <template slot-scope="scope">
                                        <span v-if="tableDataList[scope.$index].status=='上传中'" class="win">上传中</span>
                                        <span v-if="tableDataList[scope.$index].status=='上传成功'" class="win">上传成功</span>
                                        <span v-if="tableDataList[scope.$index].status=='上传失败'" class="loss">上传失败</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="操作">
                                    <template slot-scope="scope">
                                        <el-button  type="text" size="small" @click="remove(scope.$index)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </div>

                    <div class="btns">
                        <span @click="heidTH()">取消</span>
                    </div>
                </div>
            </div>
            <div class="bg" v-if="tendency" @click="heidTendency">
                <div id="myChart" @click.stop ref="myChart"></div>
            </div>
        </div>
        <loading v-if='load'></loading>
    </div>

</template>

<script>
    import echarts from 'echarts'
    import download from '../../api/commonality'
    import loading from '../../components/loading';
    export default {
        components: {
            loading
        },
        name: "replace",
        data(){
            return{
                tableData:[],
                tdate:(new Date()).toLocaleDateString().split('/').join('-'),
                total:0,
                search:'',
                page:1,
                p:10,
                text:'',
                number:[],
                options5:[],
                tendency:false,
                upload:false,
                width:"",
                height:'',
                tableDataList:[],
                source:'SDK-API',
                is_preview:'0',
                load:true,
            }
        },
        mounted(){
            this.getTimes();
        },

        methods:{
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this. getList()
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this. getList()
            },
            resetRemove(){
                this.times='';
                this.number=[];
                this.text='';
            },
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
                this.$message.warning(`当前限制选择100 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },

            getList(){
                if(!this.text){
                    this.search=''
                }else{
                    var s = '{"'+'sdk_id' + '":"'+this.text + '"}';
                    this.search=s;
                }
                if(!this.is_preview){
                    this.$message.error('数据源不能为空');
                }
                if(!this.source){
                    this.$message.error('数据源不能为空');
                }
                this.load = true;
                let params ={tdate:this.tdate,times:JSON.stringify(this.number),p:this.p,page:this.page,search:this.search,source:this.source,is_preview:this.is_preview};
                this.api.replace_sdk_overview({params}).then((res)=>{
                    this.load = false;
                    this.tableData = res.data;
                    this.total=res.total;

                })
            },
            remove(index){
                this.tableDataList.splice(index,1);
            },
            before(file,obj){
                obj.status='上传中';
                this.tableDataList.push(obj);
                let formData = new FormData;
                formData.append('file',file.file);
                formData.append('width',this.width);
                formData.append('height',this.height);
                this.api.replace_bat(formData).then((res)=>{
                    if(res==false){
                        obj.status='上传失败';
                        console.log(obj)
                    }else {
                        obj.status='上传成功'
                        console.log(obj)
                    }
                })
            },
            beforupload(file){
                var reader = new FileReader();
                var _this=this;
                var obj={};
                reader.readAsDataURL(file.file);
                reader.onload=function(theFile){
                    var image=new Image();
                    image.src=theFile.target.result;
                    image.onload = function() {
                        _this.width = image.width;
                        _this.height = image.height;
                        _this.before(file,obj);
                        obj.size = image.width+'*'+image.height;
                    };
                };
                obj.name = file.file.name;
            },
            error(err, file, fileList){
                alert(err)
            },
            downloadImg(){
                if(!this.text){
                    this.search=''
                }else{
                    var s = '{"'+'sdk_id' + '":"'+this.text + '"}';
                    this.search=s;
                }
                var url = '/replace/sdk/overview/export'+'?tdate='+this.tdate+'&times='+JSON.stringify(this.number)+'&search='+this.search+'&source='+this.source+'&is_preview='+this.is_preview;
                download.downloadImg(url);
            },
            getTimes(){
                this.number=[];
                let params = {tdate:this.tdate};
                this.api.replace_times({params}).then((res)=>{
                    this.options5=res;
                    // this.number.push(this.options5[this.options5.length-1].hour);
                    var arr=[];
                    for(var i=0;i<this.options5.length;i++){
                        arr.push(this.options5[i].hour);
                    }
                    this.number=arr;
                    this.getList();
                })
            },
            getAdd(data){
                this.$router.push({
                    query:{
                        sdkid:data,
                        time:this.tdate,
                        num:JSON.stringify(this.number),
                        is_preview:this.is_preview,
                        source:this.source,
                    },
                    path:'./resource'
                })

            },
            getPv(sdk_id){
                var s = '{"'+'sdk_id' + '":"'+sdk_id + '"}';
                this.search=s;
                let params = {tdate:this.tdate,search:this.search,source:this.source};
                this.api.replace_sdk_graph({params}).then((res)=>{
                    let dataList = res;
                    let pv =[];
                    let hour =[];
                    for(var i=0;i<dataList.length;i++){
                        pv.push(dataList[i].pv);
                        hour.push(dataList[i].hour);
                    }
                    this.drawLine(pv,hour);
                })
            },
            getTendency(sdk_id){
                this.tendency=true;
                this.getPv(sdk_id);
            },
            heidTendency(){
                this.tendency=false;
            },
            batchUpload(){
                this.upload=true;
            },
            heidTH(){
                this.upload =false;
                this.fileList=[];
                this.tableDataList=[];
            },
            drawLine(pv,hour){
                let myChart = echarts.init(document.getElementById('myChart'));
                var option = {
                    title: {
                        text: '访问数量/时间'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },

                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: hour
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data:pv,
                            type: 'line',
                        }

                    ]
                };
                myChart.setOption(option);
            }
        },
    }
</script>

<style scoped>
    .bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.2);
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 999;
    }
    #myChart{
        border-radius: 5px;
        color:transparent;
        width:800px ;
        height:400px ;
        position: relative;
        left: 50%;
        top:50%;transform: translate(-50%,-50%);
        background: #fff;
    }
    input,select{
        margin-left: 20px;
        width: 200px;
        height: 36px;
        padding-left: 10px;
    }
    input{
        height: 30px!important;
        font-size: 10px;
    }
    .content_right{
        width: 100%;
        padding: 24px 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #fff;
        margin-top: 200px;
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
    .cx,.educe,.reset{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        width: 90px;
        cursor: pointer;
        border-radius: 5px;
        color: #f5f6fa;
        background: #3377ff;
        border: 0;
        text-align: center;
        margin:20px 0 20px 24px ;
    }
    .batch_upload{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        width: 90px;
        cursor: pointer;
        border-radius: 5px;
        color: #f5f6fa;
        background: #3377ff ;
        border: 0;
        text-align: center;
        margin:20px 0 20px 24px ;
    }
    .blocks{
        margin-top: 30px;
        float: right;
    }
    .tit_text{
        display: inline-block;
        font-size: 14px;
        font-weight: 400;
        font-family: "Microsoft YaHei";
        margin-left: 20px;
    }
    .select_check{
        display: inline-block;
        margin-left: 20px;
        margin-bottom: 20px;
    }
    .educe,.reset{
        color: #3d3d3d!important;
        border: 1px solid #ddd!important;
        background: transparent!important;
    }
    .load{
        border-radius: 10px;
        width: 800px;
        min-height: 270px;
        max-height: 500px;
        position: relative;
        background: #fff;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        overflow-y: auto;
    }
    .load_tit{border-bottom: 1px solid #ddd}
    .load_tit span{
        display: inline-block;
        height: 36px;
        line-height: 36px;
        margin:10px 0 10px 0;
        font-size: 18px;
        font-weight: bold;
    }
    .load_upload ,.load_tit{
        margin:15px 24px 0 24px
    }
    .btns{
        margin-top: 30px;
    }
    .btns span{
        display: inline-block;
        border-radius: 8px;
        width: 80px!important;
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        border: 1px solid #c3c3c3;
        color: #9c9c9c;
        margin-right: 30px;
        margin-left: 24px;
        text-align: center;
        margin-bottom: 24px;
    }
    .table_load{
        padding: 24px;
    }
    .win{
        color: #55a532;
    }
    .loss{
        color: red;
    }
    .content_right .block{
        margin-bottom: 0!important;
    }
    .top_name{height: 112px}
    .top_txt,.title_left span{
        margin-left: 24px;
    }
</style>