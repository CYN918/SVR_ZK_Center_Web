<template>
    <div>
        <div class='screening'>
            <div class="date">
                <el-date-picker
                    v-model="date"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    @change="changeDate">
                </el-date-picker>
            </div>
            <span class='qdName'>数量:</span>
            <span>{{this.total}}</span>
            <span class="dated" v-if="new Date(this.date)<=new Date(new Date().getTime() - 24*60*60*1000)">(已过期)</span>    
            <span class='userGl' v-if="new Date(this.date)>=new Date(new Date().getTime() - 24*60*60*1000)" @click='addWl()' style="margin: 0px 1% 0 0;">添加物料</span> 
        </div>
        <div style="margin-top:85px;background:#fff;padding-bottom:30px" class='rePadding'>
            <template>
                <el-table
                        ref="tab"
                        :data="tableData"
                        style="width: 100%"
                        :header-cell-style="getRowClass"
                        :cell-style="cell"
                        @selection-change="handleSelectionChange"
                        >
                    
                    <el-table-column
                            prop="count"
                            label="杂志锁屏"
                            >
                            <template slot-scope="scope">
                            <img :src='tableData[scope.$index].mfinal.prev_uri' style="max-width:80px;max-height: 80px;cursor: pointer"  preview="1" />
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="mfid"
                            label="物料ID">
                            
                    </el-table-column>
                    <el-table-column
                            
                            label="壁纸ID">
                            <template slot-scope="scope">
                                <el-tooltip placement="top" class="tit_txt_2 logs tit_txts">
                                    <div slot="content">
                                        <div>{{tableData[scope.$index].mfinal.wpid}}</div>

                                    </div>
                                    <div>{{tableData[scope.$index].mfinal.wpid}}</div>                         
                                </el-tooltip>
                            
                        </template>
                            
                    </el-table-column>
                    <el-table-column
                            label="文字链标题"
                            :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <span v-if="tableData[scope.$index].title!=''">{{tableData[scope.$index].title}}</span>
                                <span v-if="tableData[scope.$index].title==''">--</span>
                            </template>
                    </el-table-column>  
                    <el-table-column
                            label="文字链内容"
                            :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <span v-if="tableData[scope.$index].content!=''">{{tableData[scope.$index].content}}</span>
                                <span v-if="tableData[scope.$index].content==''">--</span>
                            </template>
                    </el-table-column>
                    <el-table-column
                            label="文字链标识"
                            :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <span v-if="tableData[scope.$index].click_action!=''">{{tableData[scope.$index].click_action}}</span>
                                <span v-if="tableData[scope.$index].click_action==''">--</span>
                            </template>
                    </el-table-column>
                    <el-table-column
                            label="落地页">
                                <template slot-scope="scope">
                                <a :href="tableData[scope.$index].url" target="_blank" style="text-decoration: none;color: #66b1ff" v-if="tableData[scope.$index].url!=''">点击查看</a>
                                <a  v-if="tableData[scope.$index].url==''">-</a>
                            </template>
                    </el-table-column>
                    <el-table-column
                            label="状态">
                                <template slot-scope="scope">
                                    <span v-if="tableData[scope.$index].status_name == '信息缺失'" style="color:red;">{{tableData[scope.$index].status_name}}</span>
                                    <span v-else>{{tableData[scope.$index].status_name}}</span>
                            </template>
                    </el-table-column>
                    <el-table-column
                            prop="is_copyright"
                            
                            label="版权来源">
                            <template slot-scope="scope">
                                <el-switch
                                    v-if="scope.row.mfinal.type == 'f_sls_picture'"
                                    class="tablescope"
                                    :active-value="1"
                                    :inactive-value="0"
                                    active-color="#3377ff"
                                    inactive-color="#e6e9f0"
                                    v-model="scope.row.is_copyright"
                                    inactive-text="隐藏"
                                    active-text="显示"
                                    @change='changeStatus(scope.$index,scope.row.is_copyright)'>
                                </el-switch>
                                <span v-if="scope.row.mfinal.type != 'f_sls_picture'">--</span>
                            </template>
                    </el-table-column>
                    <el-table-column
                            label="操作" 
                            v-if="new Date(this.date)>=new Date(new Date().getTime() - 24*60*60*1000)">
                        <template slot-scope="scope">
                                <!-- <el-button  type="text" size="small" v-if='tableData[scope.$index].status=="0"' @click='updateStatus(index)'>审核</el-button> -->
                                <!-- <el-button v-if='tableData[scope.$index].status!="0"' type="text" size="small">修改结果</el-button> -->
                            <el-button  type="text" size="small" @click="details(scope.row)">管理文字链</el-button>
                            <el-button  type="text" size="small" @click="deleteRow(scope.$index, scope.row)">移除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="page"
                    :page-sizes="[10, 50, 100, 200]"
                    :page-size="p"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog
            title="管理文字链"
            :visible.sync="textVisible"
            width="40%"
            :showClose="showClo"
            :close-on-click-modal='false'
            :before-close="handleClose">
            <el-form label-width="120px">
                <el-form-item label="标识:">
                    <select v-model="click_action">
                        <option value="-1">请选择</option>
                        <option value="3">无</option>
                        <option value="0">点击查看</option>
                        <option value="1">打开应用</option>
                        <option value="2">下载应用</option>
                    </select>
                </el-form-item>
                <el-form-item label="标题:" v-if="click_action != '-1'&&click_action != '3'">
                    <el-input type="text" maxlength="13"  placeholder="最多13字" show-word-limit v-model="title"></el-input>
                </el-form-item>
                <el-form-item label="内容描述:" v-if="click_action != '-1'&&click_action != '3'">
                    <el-input type="textarea" maxlength="44"  placeholder="最多44字" show-word-limit  v-model="content"></el-input>
                </el-form-item>
                 <el-form-item label="标题(选填):" v-if="click_action == '3'">
                    <el-input type="text" maxlength="13"  placeholder="最多13字" show-word-limit v-model="title"></el-input>
                </el-form-item>
                <el-form-item label="内容描述(选填):" v-if="click_action == '3'">
                    <el-input type="textarea" maxlength="44"  placeholder="最多44字" show-word-limit  v-model="content"></el-input>
                </el-form-item>
                <el-form-item label="跳转链接:" v-if="click_action == '0'">
                    <el-input v-model="url"></el-input>
                </el-form-item>
                <el-form-item label="包名(选填):" v-if="click_action == '1'">
                    <el-input v-model="pkgname"></el-input>
                </el-form-item>
                <el-form-item label="拉活链接:" v-if="click_action == '1'">
                    <el-input v-model="deeplink"></el-input>
                </el-form-item>
                <el-form-item label="下载链接:" v-if="click_action == '1'">
                    <el-input v-model="download_url"></el-input>
                </el-form-item>
                <el-form-item label="包名:" v-if="click_action == '2'">
                    <el-input v-model="pkgname"></el-input>
                </el-form-item>
                <el-form-item label="下载链接:" v-if="click_action == '2'">
                    <el-input v-model="download_url"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="savePage">保存</el-button>
                <el-button @click="cancelTx">取消</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            :showClose="showClo"
            :before-close="handleClose"
            width="30%">
            <span>确认将该物料从该投放库移除吗?</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="surRemove">确 认</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <ADDWL v-if="ADDwl" @listenToChildEvent="listenToChildEvent" :date="date" :channel='channel' :material="material" :ids='idse' :gdsrc="gdsrc"></ADDWL>
       
    </div>

</template>

<script>
    import ADDWL from '../Jounrnal_select'
    export default {
        components: {ADDWL},
        props:['tableData','total','idse'],
        data() {
            return {
                date:(new Date()).toLocaleDateString().split('/').join('-'),
               
                page:1,
                p:10,
               
                plid:this.$route.query.plid,
                channel:this.$route.query.channel,
                type:this.$route.query.type,
                sub_plid:this.$route.query.sub_plid,
                value:[],
                ADDwl:false,
                textVisible:false,
                dialogVisible: false,
                
                rows:{},
                showClo:false,
                title:'',
                material:3,
                gdsrc:'',
                textlink:[],
                click_action:-1,
                url: '',
                theWeight:'',
                rouelForm:{},
                textlink:[],
                rows:{},
                rowData:{},
                pkgname:'',
                deeplink:'',
                download_url:'',
                content:'',
            };
        },

        methods: {
            deleteRow(index, rows) {
                this.dialogVisible = true;
                this.rows = rows;       
            },
            savePage(){
            //    var reg = /(http|https):\/\/([\w.]+\/?)\S*/;
                if(this.click_action==-1){
                    this.$message.warning('标识不能为空');
                    return
                }
               if(!this.title&&this.content!=''&&this.click_action == '3'){
                   this.$message.warning('标题和内容描述必须同时填或都不填')
                   return false
               }
               if(!this.content&&this.title!=''&&this.click_action == '3'){
                   this.$message.warning('标题和内容描述必须同时填或都不填')
                   return false
               }
           
               if(this.click_action == 0){
                   var click_action_title = '点击查看'
                   if(!this.url){
                       this.$message.warning('跳转链接不能为空!')
                       return false
                   }

               }else if(this.click_action == 1){
                   var click_action_title = '打开应用'
                   if(!this.deeplink){
                       this.$message.warning('拉活链接不能为空!')
                       return false
                   }
                   if(!this.download_url){
                       this.$message.warning('下载链接不能为空!')
                       return false
                   }

               }else if(this.click_action == 2){
                   var click_action_title = '下载应用'
                   if(!this.pkgname){
                       this.$message.warning('包名不能为空!')
                       return false
                   }
                   if(!this.download_url){
                       this.$message.warning('下载链接不能为空!')
                       return false
                   }

               }else if(this.click_action == -1){
                   var click_action_title = ''
               }else if(this.click_action == 3){
                   var click_action_title ='无'
               }
                let formData =new FormData;
                formData.append('plid',this.plid);
                formData.append('mfid',this.rowData.mfid);
                formData.append('tdate',this.date);
                formData.append('title',this.title);
                formData.append('content',this.content);
                formData.append('click_action',click_action_title);
                formData.append('pkgname',this.pkgname);
                formData.append('download_url',this.download_url);
                formData.append('deeplink',this.deeplink);
                formData.append('click_action_type',this.click_action);
                if(this.$route.query.sub_plid != undefined){
                    formData.append('sub_plid',this.$route.query.sub_plid);
                }
                formData.append('url',this.url);
               this.api.pushlib_textlink_edit(formData).then((res)=>{  
                    this.textVisible = false;
                    this.$parent.getData2();
                    this.title = '';
                    this.content = '';
                    this.click_action = '';
                    this.url = '';        
               })
            },
            remove(){
                this.dialogVisible = true;
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            surRemove(){
                //  console.log(this.rows)
                let formData =new FormData;
                 
                let array={plid:"",mfid:"",tdate:""}
                     array.plid=this.rows.plid;
                     array.mfid=this.rows.mfid;
                     array.tdate=this.date;
                   this.textlink.push(array); 
                   formData.append('textlink',JSON.stringify(this.textlink))
                   formData.append('plid',this.plid)
                   if(this.$route.query.sub_plid != undefined){
                        formData.append('sub_plid',this.$route.query.sub_plid);
                    }
                    this.api.pushlib_textlink_del(formData).then((res)=>{
                        this.dialogVisible = false;
                        this.textlink = [];
                        this.$parent.getData2();
                    })

            },
            changeDate(){
                this.$parent.getData2();
            },
            changeStatus(a,b){
                this.api.pushlib_textlink_iscopyright_edit({tdate:this.tableData[a].tdate,is_copyright:b,sub_plid:this.sub_plid,plid:this.plid,mfid:this.tableData[a].mfinal.mfid}).then((res)=>{
                    if(res != false){
                        this.$parent.getData2();
                    }
                })
            },
            addWl(){
                this.ADDwl = true;
            },
            heidWL(){
                this.ADDwl = false;
            },
            array_diff(a, b) {
                for (var i = 0; i < b.length; i++) {
                    for (var j = 0; j < a.length; j++) {
                        if (a[j] == b[i]) {
                            a.splice(j, 1);
                            j = j - 1;
                        }
                    }
                }
                return a;
            },
            listenToChildEvent(id,date,ids){
                console.log(this.array_diff(id, ids.split(';')))
                let arr = this.array_diff(id, ids.split(';'));
                let formData =new FormData;
                formData.append('plid',this.$route.query.plid);
                formData.append('tdate',date);
                formData.append('bind_mfid',JSON.stringify(id));
                formData.append('ad_type','2');
                if(this.$route.query.sub_plid != undefined){
                    formData.append('sub_plid',this.$route.query.sub_plid);
                }
                this.api.pushlib_textlink_add(formData).then((res)=>{
                    this.heidWL();
                    this.$parent.getData2();
                })
            },
            cancelTx(){
               this.textVisible = false;
               this.form = {};
            },
            details(row){
                this.textVisible = true;
                this.rowData = row;
                this.title = row.title;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                this.content = row.content;
                this.click_action = row.click_action_type;
                this.url = row.url;
                this.deeplink = row.deeplink;
                this.pkgname = row.pkgname;
                this.download_url = row.download_url;
            },
            
            getRowClass({row, column, rowIndex}) {
                if (rowIndex === 0) {
                    return 'background:#f7f9fc;color:#1F2E4D;font-size:14px;font-weight:bold;height:48px;font-family:PingFang-SC-Regular;padding:20px 0px 20px 14px'
                } 
                else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'padding:15px 14px;color:#3d4966;font-size:14px;font-weight:400;font-family:PingFang-SC-Regular;'
            },
            handleSizeChange(p) { // 每页条数切换
                this.p = p;
                this.page = 1;
                this.$parent.getData2(this.p,this.page);
                
                
            },
            handleCurrentChange(page) {//页码切换
                this.page = page;
                this.$parent.getData2(this.p,this.page);
            },  
            handleSelectionChange(val) {
                this.value= val;
            },  
    
        },

        created() {
        

        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            // this.getData();
            
        },

    }
</script>
<style  scoped>
    .screening{
        position: relative;
        width: 100%;
        height: 60px;
        top:75px;
        background: #fff
    }
    .qdName{
        display: inline-block;
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(50,50,50,1);
        margin-left: 40px
    }
    .date{
        margin:10px 12px 0 24px;
        display: inline-block;
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
        margin-top: 10px!important
    }
    .tablescope >>> .el-switch__label--left {
        position: relative;
        left: 33px;
        color: #fff;
        z-index: -1111;
      }
      .tablescope >>> .el-switch__label--left span{
          width: 50px;
      }
      .tablescope >>> .el-switch__core{
        width: 70px !important;
      }
      .tablescope >>> .el-switch__label--left{
          margin-right: -25px;
      }
      .tablescope >>> .el-switch__label--right {
        position: relative;
        right: 62px;
        color: #fff;
        z-index: -1111;
      }
      .tablescope >>> .el-switch__label--right span{
          width: 50px;
      }
      .tablescope >>> .el-switch__label--right.is-active {
        z-index: 1111;
        color: #fff !important;
      }
      .tablescope >>> .el-switch__label--left.is-active {
        z-index: 1;
        color: #9c9c9c !important;
      }
      .tablescope >>> .el-switch__core{
          margin-left: -25px;

      }

</style>