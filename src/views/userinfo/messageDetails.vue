<template>
    <div class="box">
        <div class="top_name">
            <span class="top_txt">个人中心/消息通知</span>
            <div class="title_left">
                <span>查看消息通知详情</span>
            </div>
        </div>
        <div class="centNavBox">
            <div class="titl_right">
                <div class="message">
                    <span class="message_name">通知标题:</span>
                    <span class="message_box">{{messageData.name}}</span>
                </div>
                <div class="message" v-if="messageData.type == '1'">
                    <span class="message_name">消息类型:</span>
                    <span class="message_box">新用户申请</span>
                </div>
                <div class="message" v-if="messageData.type == '2'">
                    <span class="message_name">消息类型:</span>
                    <span class="message_box">入口提示</span>
                </div>
                <div class="message">
                    <span class="message_name">通知时间:</span>
                    <span class="message_box">{{created_at}}</span>
                </div>
                <div class="message">
                    <span class="message_name">内容详情:</span>
                    <span class="message_box">{{messageData.email}}</span>
                </div>
            </div>
            <div class="btn_bottom">
                <span @click="dialogVisible = true" v-if="messageData.type == '1'">通过申请</span>
                <span @click="centerDialogVisible = true" v-if="messageData.type == '1'">拒绝</span>
                <span @click="back">返回</span>
            </div>
            <el-dialog
                title="拒绝"
                :visible.sync="centerDialogVisible"
                width="30%"
                left>
            <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="textarea"
                maxlength="50"
                show-word-limit
                >
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="refused">确 定</el-button>
            </span>
            </el-dialog>
            <el-dialog
                title="通过申请"
                :visible.sync="dialogVisible"
                width="30%"
                left>
                <div class="detail_1_1_3">
                    <span class="txt txt_right">角色范围</span>
                    <select v-model="roles_scope">
                        <option value="0">内部角色</option>
                        <option value="1">外部角色</option>
                    </select> 
                </div>
                <div class="detail_1_1_3" style="margin-top:20px;">
                    <span class="txt txt_right">所属角色</span>
                    <select v-model="roles">
                        <option :value="item.role_id" v-for="item in selectData">{{item.role_name}}</option>
                    </select> 
                </div>
                <div class="detail_1_1_3" style="margin-top:20px;">
                    <span class="txt txt_right">用户名</span>
                    <input type="text" v-model="userName"/>
                </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="apply">确 定</el-button>
            </span>
            </el-dialog>
            
        </div>
    </div>

</template>

<script>
    import axios from 'axios'
    export default {
        name: "messageDetails",
        data(){
            return {
                messageData:{},
                created_at:'',
                centerDialogVisible: false,
                dialogVisible: false,
                textarea:'',
                selectData:[],
                roles:'',
                roles_scope:'',
                userName:'',
            }
        },
        mounted(){
            this.getMessage();
            this.getuserDATA();
        },
        methods:{
            getuserDATA(){
                this.api.role_child_roles().then((res)=>{
                    console.log(res);
                    this.selectData = res;
                    console.log(this.selectData)
                })
            },
            apply(){
                var params = {
                    id:this.$route.query.id,
                    type:1,
                    result:true,
                    role_type:this.roles_scope,
                    role_id:this.roles,
                    name:this.userName}
                this.api.pushlib_message_handled({params}).then((res)=>{
                    this.dialogVisible = false;
                })

            },
            refused(){
                var params = {
                    id:this.$route.query.id,
                    type:1,
                    result:false,
                    refuse_reason:this.textarea}
                this.api.pushlib_message_handled({params}).then((res)=>{
                    this.centerDialogVisible = false;
                })
            },
            getMessage(){
                let basrurl = 'http://ts-i.idatachain.cn/api/';
                if(window.location.host=='c.zookingsoft.com'){
                    basrurl = 'http://c.zookingsoft.com/api/';
                }
                if(window.location.host=='c2.zookingsoft.com'){
                    basrurl = 'http://c2.zookingsoft.com/api/';
                }
                axios.get(basrurl + 'news/' + this.$route.query.id + '/detail').then((res)=>{
                    this.messageData=res.data.data;
                    this.created_at = res.data.data.newsContent.created_at;
                    console.log(this.messageData);
                })
            },
            back(){
                this.$router.push({
                    path:'/userinfo/message'
                })
            },
        }
    }
</script>

<style scoped>
    .top_name{
        height: 109px;
        z-index: 999999;
    }
    .top_txt{
        display: inline-block;
        margin-left: 24px;
    }
    .title_left>span{
        display: inline-block;
        margin-left: 24px;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(50,50,50,1);
    }
    .centNavBox{
        width: 100%;
        padding: 24px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #FFF;
        margin-top:194px;
    }
.title_name>span{
    font-size:20px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(54,54,54,1);
    display: block;
}

.message{
    margin-bottom: 46px;
}
.message_name{
    display: inline-block;
    width: 70px;
    text-align: right;
    margin-right: 24px;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(31,46,77,1);
}
.message_top{
    vertical-align: top;
}
.issue{
    display: inline-block;
    width:1020px;
    height:170px;
    border:1px solid #f7f9fc;
    border-radius:5px;
    word-wrap :break-word;
    padding: 10px;
    color:#8F9BB3;
}
.ps{
    display: inline-block;
    width:160px;
    height:153px;
    border: 1px solid #ddd;
    margin-right: 20px;
}
.ps>img{
    width:160px;
    height:153px;
}
.ps:last-child{
    margin-right: 0;
}
.btn_bottom{
    text-align: center;
    margin-top: 100px;
}
.btn_bottom>span:nth-child(1){
    background: #0052ff;
    color: #ffffff;
}
.btn_bottom>span{
    display: inline-block;
    width:68px;
    height:36px;
    text-align: center;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    cursor: pointer;
   line-height: 36px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(61,73,102,1);
    margin-right: 10px;
}
.message_box{
    display: inline-block;
    width: 500px;
    font-size:16px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:#8F9BB3;
    text-align: left!important;
}
.box >>> .el-button--primary{
  background: #0052ff !important;
}
.detail_1_1_3,.detail_1_1_4,.detail_1_1_5,.detail_1_1_6,.detail_1_1_7,.detail_1_1_8{
    text-align: left;
}
.txt{
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(31,46,77,1);
    display: inline-block;
    width: 90px;
    text-align: right;
    margin-left: 10px;
}
.detail_1_1_3 select,.detail_1_1_3 input{
    width:200px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    margin-right: 24px;
    margin-left:24px;
}
</style>