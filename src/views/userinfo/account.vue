<template>

    <div class="centNavBox">
            <div class="title">
                <span>可管理账号</span>
            </div>
            <div class="box_input">
                <div class="box" v-for="item in list">
                    <div class="box_1">
                        <img src="../../../public/img/user.jpg"/>
                    </div>
                    <div class="box_2">
                        <p class="box_txt">{{item.role_name}}</p>
                        <p>{{time}}创建</p>
                    </div>
                    <div class="box_3">
                        <p class="box_txt">{{item.users.length}}</p>
                        <p>已绑定账号数</p>
                    </div>
                    <div class="box_4" @click="details">
                        <img src="../../../public/img/timg.jpg">
                    </div>
                </div>
            </div>
            <div class="box_input_2">
                <input type="text" placeholder="输入用户名或邮箱快速查询"/>
                <span class="btn">查询</span>
                <span class="btn_2" @click="add">添加账号</span>
            </div>
            <div class="box_input_3" v-for="item in list">
                <div class="name">{{item.role_name}}</div>
            </div>
            <tab :tableData2="tableData2"></tab>
            <div class="detail" v-if="show">
                <div class="detail_1">
                    <div class="detail_1_1">
                        <span>{{name}}权限详情</span>
                    </div>
                    <el-table
                            :header-cell-style="getRowClass"
                            :data="tableData2"
                            border
                            style="width: 75%;color: black;margin: 20px 0 0 200px">
                        <el-table-column
                                prop="date"
                                label="日期"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="姓名">
                        </el-table-column>
                    </el-table>
                    <div class="detail_1_2" @click="shut">
                        <img src="../../../public/img/X.jpg"/>
                    </div>
                </div>
            </div>
            <div class="detail" v-if="management">
            <div class="detail_1">
                <div class="detail_1_1">
                    <span>添加账号</span>
                </div>

            </div>
        </div>
        </div>
</template>

<script>
    import tab from './table';
    export default {
        components:{tab},
        name: "account",
        data(){
            return{
                list:[],
                management:false,
                show:false,
                name:'运营',
                time:'2019/4/17',
                num:'23',
                tableData2:[
                    {
                        date:966/444/44,
                        address:'电视剧阿达集散地'
                    },
                    {
                        date:16156,
                        address:'大萨达撒多撒多撒'
                    }
                ]
            }
        },
        mounted(){
            this.getList();
        },
        methods:{
            details(){
                this.show=true
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:#afa;color:#000;text-align:center;font-size:9px;font-weight:500;'
                } else {
                    return ''
                }
            },
            shut(){
                this.show=false
            },
            add(){
                this.management=true;
            },
            getList(){
                this.api.perm_manage_role().then((res)=>{
                    this.list = res;
                    console.log(res)
                })
            }
        }
    }
</script>

<style scoped>
.title{
    text-align: center;
    font-size: 18px;
    margin-bottom: 50px;
}
.box_input{

}
.box{
    display: inline-block;
    width: 350px;
    height: 100px;
    border:1px solid #ddd;
    border-radius: 15px;
    box-shadow:0 0 3px 3px #eeeeee;
    margin:0 30px 80px 0;
}
.box_1{
    width:50px ;
    display: inline-block;
    position: relative;
    top:50%;
    transform: translateY(-50%);
    margin: 0 20px;
}
img{
    width: 50px;
}
.box_2{
    display: inline-block;
    margin-right: 30px;
    text-align: center;
    position: relative;
    top:50%;
    transform: translateY(-50%);
}
.box_3{
    display: inline-block;
    text-align: center;
    position: relative;
    top:50%;
    transform: translateY(-50%);
}
p{
    font-size: 12px;
}
.box_txt{
    margin-bottom: 15px;
    font-size: 16px;
}
input{
    margin-right: 30px;
}
.btn,.btn_2{
    display: inline-block;
    width: 120px;
    height: 35px;
    border-radius: 8px;
    border: 1px solid #000;
    background: #ddd;
    text-align: center;
    line-height: 35px;
    cursor: pointer;
}
.btn_2{
    float: right;
    margin-right: 100px;
}
.box_input_2{
    margin-bottom: 100px;
}
.name{
    width: 100px;
    height: 50px;
    background: #75ba42;
    text-align: center;
    border-radius: 15px 15px 0 0 ;
}
.box_4{
    display: inline-block;
    width:20px;
    position: relative;
    right: -20px;
    top:-20px;
    cursor: pointer;
}
.box_4>img{
    width:20px
}
.detail{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
    background: rgba(0,0,0,0.3);
}
.detail_1{
    width: 95%;
    height: 90%;
    background: #fff;
    margin: 20px;
    border-radius: 20px;
}
.detail_1_1{
    text-align: center;
    padding: 40px 0;
}
.detail_1_2{
    width: 30px;
    position: absolute;
    right: 80px;
    top:40px;
    cursor: pointer;
}
.detail_1_2>img{
    width: 30px;
}

</style>