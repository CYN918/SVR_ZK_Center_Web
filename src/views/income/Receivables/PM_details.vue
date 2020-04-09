<template>
  <div>
       <div class="top_name">
            <span class="top_txt">广告收款结算 /</span>
            <span class="top_txt">项目管理/</span>
            <span class="top_txt">项目详情</span>
            <div class="title_left">
                <span>项目详情</span>
                <span class='bj'>编辑</span>
            </div>
        </div>
        <div class='select_box'>
            <div class='select_tit'>
                <span>必要信息</span>
            </div>
            <div class='select_bh'>
                <span>企业微信审批编号:</span>
                <span></span>
            </div>
            <div class='select_box_1'>
                <span class='select_left'>项目名称：<span class="err">(存在项目重名，数据无效)</span></span>
                 <input type="text" class='input_left'>
                <span class='select_left'>合作公司：<span class="err">(合作公司不存在，数据无效)</span></span>
                <input type="text" class='input_left'>
                <span class='select_left' style="width:100%">广告类型：一级分类 <span class="err">(数据异常，数据无效)</span></span>
                <select name="" id="" class='input_left'>
                    <option value=""></option>
                </select>   

            </div>
            <div class='select_box_2'>
                <span class='select_left'>结算主体：<span class="err">(结算主体不存在，数据无效)</span></span>
                <input type="text">
                 <span class='select_left'>上线时间：</span>
                  <el-date-picker
                    v-model="value1"
                    class='datetime'
                    type="datetime"
                    placeholder="选择日期时间">
                </el-date-picker>
                <span class='select_left'>二级分类</span>
                 <select name="" id="" class='input_left'>
                    <option value=""></option>
                </select>
            </div>
            <div class='select_box_3'>
                <span class='select_left'>三级分类</span>
                 <select name="" id="" class='input_left'>
                    <option value=""></option>
                </select>
            </div>
           <div>
               <span class='sw'>商务模式</span>
               <span class="err">(数据异常，数据无效)</span>
           </div>
           <div>
               <template>
                    <el-table
                            :data="tableData"
                            header-align="center"
                            :header-cell-style="getRowClass"
                            :cell-style="cell"
                            style="width: 100%;color:#000">
                        <el-table-column
                                label="生效时间" prop="open_id"
                               >
                        </el-table-column>
                        <el-table-column
                                label="失效时间" prop="account_name"
                                >
                        </el-table-column>
                        <el-table-column
                                label="计费方式" prop="contributor_type"
                                >
                            <template slot-scope="scope">
                                <span>{{tableData[scope.$index].contributor_type==1?'个人':'公司'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="分成模式(ZK)" prop="cash_money"
                                >
                        </el-table-column>
                        <el-table-column
                                label="结算模式" prop="toax_mney"
                                >
                        </el-table-column>
                         <el-table-column
                                label="固价价格" prop="toax_mney"
                                >
                        </el-table-column>
                         <el-table-column
                                label="修改时间" prop="toax_mney"
                                >
                        </el-table-column>
                        <el-table-column label="操作人员" prop="toax_mney">
                            
                        </el-table-column>
                    </el-table>
                </template>
           </div>

        </div>
        <div class='ht'>
            <div  class='select_tit'>
                <span style="margin-left:24px">相关合同 <span class="err">(待补充)</span></span>
            </div>
            <div></div>
        </div>
        <div class='fj'>
            <div   class='select_tit'>
                <span>附加信息</span>
            </div>
             <div class='select_bh'>
                <span>报备信息</span>
            </div>
            <div class='select_box_1'>
                <span class='select_left'>报备媒体：</span>
                 <input type="text" class='input_left'>
                <span class='select_left'>广告主id：</span>
                <input type="text" class='input_left'>
                <span class='select_left' style="width:100%">直客链接是否自动更新版本：</span>
                <select name="" id="" class='input_left'>
                    <option value=""></option>
                </select>   

            </div>
             <div class='select_box_2'>
                <span class='select_left'>报备广告位：</span>
                 <input type="text" class='input_left'>
                <span class='select_left'>直客链接：</span>
                <input type="text" class='input_left'>
            </div>
             <div class='select_bh'>
                <span>广告类型</span>
            </div>
            <div class='select_box_1'>
                <span class='select_left'>请求量：</span>
                 <input type="text" class='input_left'>
                <span class='select_left'>点击量：</span>
                <input type="text" class='input_left'>
            </div>
             <div class='select_box_2'>
                <span class='select_left'>点击量：</span>
                 <input type="text" class='input_left'>
                <span class='select_left'>下载量：</span>
                <input type="text" class='input_left'>
            </div>
             <div class='select_bh'>
                <span>备注</span>
            </div>
            <div>
                <textarea></textarea>
            </div>
             <div class='select_bh'>
                <span>附件：</span>
            </div>
            <div>
                <el-upload
                    class="upload-demo"
                    action="1"
                    multiple
                    >
                    <el-button size="small" type="primary">上传</el-button>
                </el-upload>
                <span></span>
                <span class='color'>查看</span>
                <span class='color'>下载</span>
            </div>
        </div>
        <div class='btns'>
                <span class='bc'>保存</span>
                <span>返回</span>
        </div>
  </div>
</template>

<script>
export default {
            data(){
                return{

                }
            },
            methods:{
                getRowClass({row, column, rowIndex, columnIndex}) {
                    if (rowIndex === 0) {
                        return 'background:rgba(247,249,252,1);color:rgba(31,46,77,1);text-align:center;font-size:14px;font-weight:blod;font-family:PingFang-SC-Medium;height:56px'
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
     .top_name{
        height:112px!important;
        background:rgba(255,255,255,1);
    }
    .title_left span{
        display: inline-block;
        font-size:20px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(50,50,50,1);
        margin-left: 24px;
        text-align: right;
    }
    .top_txt{
        display: inline-block;
        margin-left: 24px;
    }
    .bj{
        display: inline-block;
        width: 90px;
        height: 36px;
        text-align: center!important;
        line-height: 36px!important;
        background: #3377ff;
        color: #fff!important;
        border-radius: 3px;
        float: right;
        font-size: 14px!important;
        font-weight: 400!important;
        margin: 0px 20% 0 0!important;
        cursor: pointer;
    }
    .select_box{
        width: 100%;
        background: #fff;
        min-height: 671px;
        margin-top:195px ;
    }
    .select_tit{
        width: 100%;
        height: 48px;
        border-bottom: 1px solid #ddd;
    }
    .select_tit span{
        display: inline-block;
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:22px;
        color:rgba(50,50,51,1);
        line-height: 48px;
    }
    .select_bh{
        margin-top: 24px;

    }
    .select_bh span{
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:22px;
        color:rgba(50,50,51,1);
    }
    .select_box_1,.select_box_2,.select_box_3{
        display: inline-block;
        margin-right: 183px;
    }
    .select_box_2{
        vertical-align: top;
    }
    .select_tit_name{

        margin: 24px 0 8px 24px;
    }
    .select_left{
        display: block;
        width:100%;
        height:20px;
        font-size:14px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:20px;
        color:rgba(50,50,51,1);
        margin: 24px 0 8px 0;
    }
   
    .select_box>div,.fj>div{
        margin-left: 24px;
    }
    .select_box>div input,.fj>div input{
        width:263px;
        height:32px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(220,222,224,1);
        opacity:1;
        border-radius:2px;
        padding-left:5px ;
    }
     .select_box>div select,.datetime ,.fj>div select{
         width:268px;
        height:32px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(220,222,224,1);
        opacity:1;
        border-radius:2px;
     }
     .input_left{
         
         display: block;
     }
     .sw{
         display: inline-block;
         font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:22px;
        color:rgba(50,50,51,1);
        margin: 24px 10px 16px 0;
     }
     .err{
        font-size:12px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:17px;
        color:rgba(212,0,0,1); 
     }
     .ht{
         width: 100%;
         min-height: 104px;
         margin-top: 24px;
         background: #fff;
     }
     .fj{
         width: 100%;
         margin-top: 24px;
         background: #fff;

     }
     textarea{
         width:719px;
        height:117px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(220,222,224,1);
        margin: 8px 0 24px 0;
     }
     .upload-demo{
         margin:8px 0 0 0 ;
     }
     .color{
         display: inline-block;
         font-size:14px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:20px;
        color:rgba(21,91,212,1);
        cursor: pointer;
        margin:16px 0 24px 8px;
     }
     .btns{
         margin-top: 24px;
         height:56px;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 4px rgba(200,201,204,0.5);
        line-height: 56px;
     }
     .btns span{
         display: inline-block;
         cursor: pointer;
         text-align: center;
         width:74px;
        height:32px;
        border:1px solid rgba(220,222,224,1);
        opacity:1;
        line-height: 32px;
        border-radius:4px;
        font-size:14px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(50,50,51,1);   
     }
     .bc{
         background: #3377ff!important;
         border:0!important;
         color: #fff!important;
         margin: -10px 16px 0 24px;
     }
</style>