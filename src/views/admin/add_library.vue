<template>
    <div>
        <div class="top_name">
            <span class="inner">|</span>
            <span class="top_txt">投放库/面包屑</span>
            <div class="fh">
                <img src="../../../public/img/fh.png" @click="fh"/>
                <span @click="fh">掌酷zookingSoft公司</span>
            </div>
        </div>
        <div class="content">
            <div class="con_left">
                <div>
                    <span>投放库名称</span>
                    <input type="text" placeholder="请输入投放库名称" v-model="name"/>
                </div>
               <div>
                   <span>广告位类型</span>
                   <select v-model="pos_type">
                       <option v-for="item in oddList" :value="item.pos_type">{{item.pos_type}}</option>
                   </select>
               </div>
                <div>
                    <span>素材尺寸</span>
                    <select v-model="size">
                        <option v-for="da in sizeList" :value="da.size">{{da.size}}</option>
                    </select>
                </div>
                <div>
                    <span>广告类型</span>
                    <select v-model="ad_type">
                        <option value="API">API</option>
                        <option value="DSP">DSP</option>
                        <option value="直客">直客</option>
                    </select>
                </div>
                <div>
                    <span>渠道类型</span>
                    <select v-model="channel_type">
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </div>
                <div>
                    <span>投放库类型</span>
                    <select v-model="put_type">
                        <option>sss</option>
                    </select>
                </div>
                <span class="xj" @click="AddLibrary">新建</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "add_library",
        data(){
            return{
                oddList:[],
                sizeList:[],
                channel_type:'',
                name:'',
                put_type:'',
                pos_type:'',
                size:'',
                ad_type:'',


            }
        },
        mounted(){
            this.getOddList()
        },
        methods:{
            fh(){
                this.$router.go(-1)
            },
            getOddList(){
                this.api.config_position_type({}).then((res)=>{
                    this.oddList=res;
                    console.log(this.oddList)
                    this.getSize();
                    this.getTypeList()
                })
            },
            getSize(){
                this.api.config_size().then((res)=>{
                   this.sizeList= res
                })
            },

            AddLibrary(){
                let formData = new FormData;
                formData.append('name',this.name);
                formData.append('put_type',this.put_type);
                formData.append('pos_type',this.pos_type);
                formData.append('size',this.size);
                formData.append('ad_type',this.ad_type);
                formData.append('channel_type',this.channel_type);
                this.api.putlib_add(formData).then((res)=>{
                    this.fh();
                })
    },
        },
    }
</script>

<style scoped>
    .content{
        margin-top: 185px!important;
    }
.top_name{
    height: 100px!important;
}
    .top_name img{
        display: inline-block;
        width:12px;
        margin-right: 10px;
        margin-left: 24px;
    }

    .fh span{
        display: inline-block;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,119,255,1);
        cursor: pointer;
        line-height: 36px;
    }
    .con_left{margin-left: 24px}
    .con_left div{
        margin-bottom: 32px;
    }
    .con_left span{
        display: inline-block;
        text-align: right;
        width: 100px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(31,46,77,1);
        margin-right: 24px;
    }
    .con_left select{
        width:404px;
        height:36px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    input{
        width:399px;
        height:36px;
        margin-top: 24px;
        padding-left: 5px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(211,219,235,1);
    }
    .xj{
        width:68px!important;
        height:36px;
        text-align: center!important;
        line-height: 36px;
        background:rgba(51,119,255,1);
        border-radius:4px;
        cursor: pointer;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1)!important;
        margin-left: 124px;
    }
</style>