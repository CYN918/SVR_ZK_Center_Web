<template>
        <div>
            <div class="poster">
                <div class="top">
                    <span @click="ADDad">添加</span>
                </div>
                <div class="centNavBox">
                    <template>
                        <el-table
                                :data="tableData"
                                header-align="center"
                                :header-cell-style="getRowClass"
                                :cell-style="cell"
                                stripe
                                style="width: 100%">
                            <el-table-column
                                    prop="fid"
                                    label="序号"
                                   >
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="图片"

                                    type="img">
                            </el-table-column>
                            <el-table-column
                                    prop=""
                                    label="链接"
                                   >
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" >编辑</el-button>
                                    <el-button type="text" size="small"  @click="getDel()">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </div>
            </div>
            <div>
                <div>
                    <div class="top">
                        <span @click=" ADDmore()">更多</span>
                        <span @click="ADDnews()">添加</span>
                    </div>
                    <div class="centNavBox">
                        <template>
                            <el-table
                                    :data="tableData2"
                                    header-align="center"
                                    :header-cell-style="getRowClass"
                                    :cell-style="cell"
                                    stripe
                                    style="width: 100%">
                                <el-table-column
                                        prop="fid"
                                        label="序号"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="图片"
                                        type="img">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="图片名称"
                                        type="img">
                                </el-table-column>
                                <el-table-column
                                        prop=""
                                        label="链接"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="address"
                                        label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" >编辑</el-button>
                                        <el-button type="text" size="small" @click="getDel()">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </div>
                </div>
            </div>
            <div class="bg" v-if="AD">
                <div class="content">
                    <div class="bg_tit">
                        <span>
                            添加广告位配置
                        </span>
                    </div>
                    <div class="text">
                        <span>
                            广告图片链接
                        </span>
                        <input type="text" placeholder="请输入广告图片链接"/>
                    </div>
                    <div class="text">
                         <span>
                            链接
                        </span>
                        <input type="text" placeholder="请输入链接"/>
                    </div>
                    <div class="btn">
                        <span class="bc">保存</span>
                        <span @click="heidAD">取消</span>
                    </div>
                </div>
            </div>
            <div class="bg" v-if="news">
                <div class="content">
                    <div class="bg_tit">
                        <span>
                            添加新闻热点
                        </span>
                    </div>
                    <div class="text">
                        <span>
                            添加
                        </span>
                        <input type="text" />
                    </div>
                    <div class="text">
                        <span>
                            名称
                        </span>
                        <input type="text" />
                    </div>
                    <div class="text">
                         <span>
                            链接
                        </span>
                        <input type="text" placeholder="请输入链接"/>
                    </div>
                    <div class="btn">
                        <span class="bc">添加</span>
                        <span @click="heidNews">取消</span>
                    </div>
                </div>
            </div>
            <div class="bg" v-if="more">
                <div class="content">
                    <div class="bg_tit">
                        <span>
                           更多新闻热点
                        </span>
                    </div>
                    <div class="text">
                         <span>
                            更多热点链接
                        </span>
                        <input type="text" placeholder="请输入链接"/>
                    </div>
                    <div class="btn">
                        <span class="bc">添加</span>
                        <span @click="heidMore">取消</span>
                    </div>
                </div>
            </div>
            <div class="bg" v-if="del">
                <div class="content">
                   <div class="comment">
                       <span>是否确定删除该条记录？</span>
                   </div>
                    <div class="btn">
                        <span class="bc">删除</span>
                        <span @click="heidDel">取消</span>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        name: "allocation",
        data(){
            return{
                tableData:[{fid:1},{fid:2},{fid:3}],
                tableData2:[{fid:1},{fid:2},{fid:3}],
                AD:false,
                news:false,
                more:false,
                del:false,
            }
        },
        methods:{
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background:#ddd;color:#000;text-align:center;font-size:9px;font-weight:500;'
                } else {
                    return ''
                }
            },
            cell({row, column, rowIndex, columnIndex}){
                return 'text-align:center;'
            },
            ADDad(){
                this.AD = true
            },
            heidAD(){
                this.AD = false
            },
            ADDnews(){
                this.news = true;
            },
            heidNews(){
                this.news = false;
            },
            ADDmore(){
                this.more=true;
            },
            heidMore(){
                this.more=false
            },
            getDel(){
                this.del = true;
            },
            heidDel(){
                this.del = false;
            }
        }
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
    .content{
        background: #fff;
        width: 600px;
        height: 300px;
        padding: 24px;
        border-radius: 10px;
        margin-top: 20%;
        margin-left: 50%;
        transform: translate(-50%,-50%);
    }
    .poster{
        margin-bottom: 120px;
        min-height: 300px;
    }
    .top{
        text-align: right;
        margin-bottom: 20px;
    }
    .top>span{
        display: inline-block;
        width: 120px;
        height: 40px;
        line-height: 40px;
        background: #525cff;
        border-radius: 30px;
        text-align: center;
        color: #fff;
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;
    }
    .centNavBox{
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 3px 0px rgba(0, 0, 0, 0.06);
        height: 60px;
        font-size:14px;
        line-height:60px ;
        color:rgba(0,0,0,1) !important;
    }
    .bg_tit{
        text-align: center;
        margin: 0 24px;
    }
    .bg_tit span{
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
        display: inline-block;
        line-height: 36px;
    }
    .text{
        margin: 0 24px 30px 24px;
    }
    .text span{
        display: inline-block;
        width: 100px;
        text-align: right;
        margin-right: 40px;
        font-size: 14px;
    }
    .text input{
        width: 300px;
        height: 36px;
        padding-left: 10px;
    }
    .btn{
        width: 100%;
        text-align: center;
        position: fixed;
        bottom: 20px;
    }
    .btn span{
        display: inline-block;
        margin-right: 40px;
        height: 36px;
        line-height: 36px;
        width: 80px;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid #dfdfdf;
        text-align: center;
    }
    .bc{
        color: #f5f6fa!important;
        background: #4f4cf1 !important;
        border: 0!important;
    }
    .comment{
        margin-top: 20%;
        margin-left: 55%;
        transform: translate(-50%,-50%);
    }
    .comment span{
        display: inline-block;
        font-size: 20px;
        font-weight: bold;
    }
</style>