<template>
    <div>
        <div class="top">
            <div class="tit_top_url">
                <span class="log_url" @click="jump()">收款结算 &nbsp;/</span>
                <span class="log_url" @click="jumps()">&nbsp;收款结算方管理 &nbsp;/</span>
                <span class="new_url">&nbsp;添加结算方</span>
            </div>
            <div class="title_left">
                <span v-if="this.$route.query.name==undefined">添加结算方</span>
                <span v-if="this.$route.query.name!=undefined">编辑结算方</span>
            </div>
        </div>
        <div class="tableBox">
            <div>
                <span class="titName">结算方名称</span>
                <input type="text" class="input" v-model="name">
            </div>
            <div>
                <span  class="titName">生成对账时间</span>
                <span class="titText">每月</span>
                <select v-model="tdate">
                    <option v-for="item in num" :value="item">{{item}}</option>
                </select>
                <input type="checkbox" class="check" v-model="is_auto">
                <span class="titText">不自动生成</span>
            </div>
            <div>
                <span  class="titName">开户名</span>
                <input type="text" class="input" v-model="account_name">
            </div>
            <div>
                <span  class="titName">银行账号</span>
                <input type="text" class="input" v-model="bank_card_id">
            </div>
            <div>
                <span  class="titName">开户银行</span>
                <input type="text" class="input" v-model="bank_name">
            </div>
            <div>
                <span  class="titName">税号</span>
                <input type="text" class="input" v-model="tax_id">
            </div>
            <div>
                <span  class="titName">联系人</span>
                <input type="text" class="input" v-model="contact">
            </div>
            <div>
                <span  class="titName">联系电话</span>
                <input type="text" class="input" v-model="phone">
            </div>
            <div>
                <span  class="titName" style="vertical-align: top">备注</span>
                <textarea v-model="note"></textarea>
            </div>
            <div style="margin-bottom:20px">
                <span  class="titName" >相关合同</span>
                <span class="ADDs" @click="ADDht">添加合同</span>
                <div style="margin: 14px 0 14px 140px" v-for="item in contracts">
                    <div v-for="da in item">
                        <div v-for="das in da.contract_files">
                            <div style="display: inline-block;max-width: 200px;height: 20px;overflow:hidden;font-size:14px;font-family:PingFangSC-Regular,PingFangSC;font-weight:400;color:rgba(31,46,77,1);">{{da.contract_id}}</div>
                            <span class="content_ck">查看</span>
                            <a class="content_xz" :href="das.url">下载</a>
                        </div>

                    </div>

                </div>
            </div>
            <div style="margin-bottom:20px">
                <span  class="titName" >附件</span>
                <span class="ADDs" @click="ADDfj()">上传</span>
                <div style="margin: 14px 0 14px 140px" v-for="item in attachs">
                            <div style="display: inline-block;max-width: 200px;height: 20px;overflow:hidden;font-size:14px;font-family:PingFangSC-Regular,PingFangSC;font-weight:400;color:rgba(31,46,77,1);">{{item.name}}</div>
                            <span class="content_ck">查看</span>
                            <a class="content_xz" :href="item.url">下载</a>
                </div>
            </div>
            <div class="ADDbtn">
                <span class="tj" @click="ADDdata()">添加</span>
                <span @click="fh(-1)">取消</span>
            </div>
        </div>
        <div class="bg" v-if="ht">
            <div class="content">
                <div class="content_tit">
                    <span>添加合同</span>
                </div>
                <div>
                    <input type="text" class="content_input" v-model="contract_id"/>
                    <span class="content_seach" @click="getHT()">查询</span>
                </div>
                <div style="margin: 14px 20px" v-for="item in list">
                    <div v-for="da in item.contract_files">
                        <div style="display: inline-block;width: 200px;height: 20px;overflow:hidden">{{item.contract_id}}</div>
                        <span class="content_ck">查看</span>
                        <a class="content_xz" :href="da.url">下载</a>
                    </div>

                </div>
                <div class="content_btn">
                    <span class="btn_tj" @click="heidHT()">添加</span>
                    <span @click="heidHTs()">取消</span>
                </div>
            </div>
        </div>
        <div class="bg" v-if="fj">
            <div class="content">
                <div class="content_tit">
                    <span>添加附件</span>
                </div>
                <div class="uplaod">
                    <el-upload
                            class="upload-demo"
                            :limit="1"
                            :on-exceed="handleExceed"
                            :on-remove="handleRemove"
                            :http-request="uploadFile"
                            action="111">
                        <el-button size="small" type="primary">选择文件</el-button>
                    </el-upload>
                </div>
                <div class="content_btn">
                    <span class="btn_tj" @click="heidFj()">添加</span>
                    <span @click="heidFj()">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "a-d-d-settlement",
        data(){
            return{
                ht:false,
                fj:false,
                name:'',
                tdate:'',
                is_auto:"",
                account_name:"",
                bank_card_id:"",
                bank_name:"",
                tax_id:"",
                contact:"",
                phone:"",
                note:"",
                contracts:[],
                attachs:[],
                num:[""],
                contract_id:"",
                list:[],
                contract:[],
                auto:''
            }
        },
        mounted(){

            for(var i=0;i<31;i++){
                this.num.push(i+1);
            }
            if(this.$route.query.name!=undefined){
                this.getData()
            }
        },
        methods:{

            jump(){
                this.$router.push({
                    path:"./Administration"
                })
            },
            jumps(){
                this.$router.push({
                    path:"./ReceiverManagement"
                })
            },
            fh(num){
                this.$router.go(num)
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleRemove(file, fileList) {
                this.file = '';
                this.initiate2 = false
            },
            uploadFile(file){
                let formData = new FormData;
                formData.append('file',file.file);
                this.api.file_upload(formData).then((res)=>{
                    this.attachs.push(res);
                })
            },
            ADDht(){
                this.ht=true;
            },
            ADDfj(){
                this.fj=true;
            },
            heidFj(){
                this.fj=false
            },
            heidHT(){
                this.ht=false;
                this.contract.push(this.contract_id);
                this.contracts.push(this.list)
            },
            heidHTs(){
                this.ht=false;
                this.contract_id='';
            },
            getHT(){
                let params={contract_id:this.contract_id};
                this.api.common_contract({params}).then((res)=>{
                    this.list=res;
                })
            },
            ADDdata(){
                if(this.$route.query.name!=undefined){
                    this.setData();
                    return
                }
                if(this.is_auto==false){
                    this.auto=1;
                }
                if(this.is_auto==true){
                    this.auto=0;
                }
                if(!this.name){
                    this.$message.error('名称不能为空');
                    return
                }
                if(!this.tdate&&this.auto!=0){
                    this.$message.error('生成对账时间不能为空');
                    return
                }
                if(!this.account_name){
                    this.$message.error('开户名不能为空');
                    return
                }
                if(!this.bank_card_id){
                    this.$message.error('银行账号不能为空');
                    return
                }
                if(!this.bank_name){
                    this.$message.error('开户银行不能为空');
                    return
                }
                if(!this.tax_id){
                    this.$message.error('税号不能为空');
                    return
                }
                if(!this.contact){
                    this.$message.error('联系人不能为空');
                    return
                }
                if(!this.phone){
                    this.$message.error('联系电话不能为空');
                    return
                }
                if(this.contracts.length==0){
                    this.$message.error('合同不能为空');
                    return
                }
                if(this.attachs.length==0){
                    this.$message.error('附件不能为空');
                    return
                }

                let formData=new FormData;
                formData.append('name',this.name);
                formData.append('is_receiver',1);
                formData.append('tdate',this.tdate);
                formData.append('is_auto',this.auto);
                formData.append('account_name',this.account_name);
                formData.append('bank_card_id',this.bank_card_id);
                formData.append('bank_name',this.bank_name);
                formData.append('tax_id',this.tax_id);
                formData.append('contact',this.contact);
                formData.append('phone',this.phone);
                formData.append('note',this.note);
                formData.append('contracts',JSON.stringify(this.contract));
                formData.append('attachs',JSON.stringify(this.attachs));
                this.api.settle_settlement_add(formData).then((res)=>{
                    if(res!=false){
                        this.fh(-1)
                    }
                })
            },

            getData(){
                let params={name:this.$route.query.name,is_receiver:1};
                this.api.settle_settlement_detail({params}).then((res)=>{
                    this.name=res.name;
                    this.tdate=res.tdate;
                    if(res.is_auto==1){
                        this.is_auto=false;
                    }
                    if(this.is_auto==0){
                        this.is_auto=true;
                    }
                    this.account_name=res.account_name;
                    this.bank_card_id=res.bank_card_id;
                    this.bank_name=res.bank_name;
                    this.tax_id=res.tax_id;
                    this.contact=res.contact;
                    this.phone=res.phone;
                    this.note=res.note;
                    this.contracts=res.contracts;
                    this.attachs=res.attachs;
                })
            },
            setData(){
                var arr=[];
                for(var i=0;i<this.contracts.length;i++){
                    for(var j=0;j<this.contracts[i].length;j++){
                        arr.push((this.contracts[i][j]).contract_id);
                    }
                }
                this.contract=(this.contract).concat(arr);
                if(this.is_auto==false){
                    this.auto=1;
                }
                if(this.is_auto==true){
                    this.auto=0;
                }
                if(!this.name){
                    this.$message.error('名称不能为空');
                    return
                }
                if(!this.tdate&&this.auto!=0){
                    this.$message.error('生成对账时间不能为空');
                    return
                }
                if(!this.account_name){
                    this.$message.error('开户名不能为空');
                    return
                }
                if(!this.bank_card_id){
                    this.$message.error('银行账号不能为空');
                    return
                }
                if(!this.bank_name){
                    this.$message.error('开户银行不能为空');
                    return
                }
                if(!this.tax_id){
                    this.$message.error('税号不能为空');
                    return
                }
                if(!this.contact){
                    this.$message.error('联系人不能为空');
                    return
                }
                if(!this.phone){
                    this.$message.error('联系电话不能为空');
                    return
                }
                if(this.contract.length==0){
                    this.$message.error('合同不能为空');
                    return
                }
                if(this.attachs.length==0){
                    this.$message.error('附件不能为空');
                    return
                }
                let formData=new FormData;
                formData.append('name',this.name);
                formData.append('is_receiver',1);
                formData.append('tdate',this.tdate);
                formData.append('is_auto',this.auto);
                formData.append('account_name',this.account_name);
                formData.append('bank_card_id',this.bank_card_id);
                formData.append('bank_name',this.bank_name);
                formData.append('tax_id',this.tax_id);
                formData.append('contact',this.contact);
                formData.append('phone',this.phone);
                formData.append('note',this.note);
                formData.append('contracts',JSON.stringify(this.contract));
                formData.append('attachs',JSON.stringify(this.attachs));
                this.api.settle_settlement_edit(formData).then((res)=>{
                    if(res!=false){
                        this.fh(-1)
                    }
                })
            },
        }
    }
</script>
<style scoped>
.top{
    width: 100%;
    height:98px;
    border-top: 1px solid #ededed;
    background: white;
    -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.04);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.04);
    position: fixed;
    left: 256px;
    top: 63px;
    z-index: 99;
}
.new_url{color: rgba(61,73,102,1)!important;}

.title_left span{
    display: inline-block;
    font-size:14px;
    font-family:PingFang-SC-Medium,PingFang-SC;
    font-weight:500;
    color:rgba(31,46,77,1);
    margin-left: 24px;
    margin-top: 15px;
    cursor: pointer;
}
.tableBox{
    margin-top: 182px;
    background: #fff;
    padding-top:24px ;
}
    .titName{
        display: inline-block;
        width:116px;
        height:20px;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(31,46,77,1);
        text-align: right;
        margin-right: 24px;
    }
    .input{
        width:457px;
        height:36px;
        padding-left: 10px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin-bottom: 20px;
    }
    .titText{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(109,119,139,1);
        margin-right: 13px;
    }
    select{
        width:118px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
        margin:0 20px 20px 0;

    }
    .check{
        width:16px;
        height:16px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        margin:0 6px 0 0!important;
    }
   textarea{
       width:452px;
       height:72px;
       padding: 8px;
       background:rgba(255,255,255,1);
       border-radius:4px;
       border:1px solid rgba(211,219,235,1);
       margin-bottom: 20px;
   }
    .ADDbtn span{
        display: inline-block;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        width:68px;
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
        color: #fff!important;
        background: #3377ff!important;
        border: none!important;
        margin: 0 20px 50px 140px;
    }
    .ADDs{
        display: inline-block;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        width:96px;
        height:36px;
        background:rgba(242,246,252,1);
        border-radius:4px;
        border:1px solid rgba(51,119,255,1);
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(51,119,255,1);
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
    .uplaod{
        margin-left: 20px;
        width: 200px;
    }
</style>