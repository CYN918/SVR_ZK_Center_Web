<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html,body,div,h1,ul,li,a,p,img{
	margin: 0;padding: 0;border: none;
}
html,body{
	width: 100%;
	min-height: 100%;
	background: #FAF7F6;
}
#app{
	width: 100%;
	min-height: 100%;
}
 .tableBuee{
    position: absolute;
    top:140px;
    right: 40px
}
.tableBuee button{
  width: 82px;
  height: 28px;
  padding: 0!important;
}
.noeflow{
  position: absolute;
  top:40px;
  right: 34px
}
.el-table_1_column_4:hover{color: red}
.pswp__caption__center{display: none}
#tab-3:hover{
  color: #453dff!important;
  border-bottom: 1px solid #453dff;
}
#tab-2:hover{
  color: #453dff!important;
  border-bottom: 1px solid #453dff;
}
#tab-1:hover{
  color: #453dff!important;
  border-bottom: 1px solid #453dff;
}
.el-textarea{
  display: inline-block;
  width: 87%;
}
.el-switch__core{
  margin-left: 28px;
}
.el-upload--picture-card{
  width: 230px;
  height: 205px;
}
.el-upload--picture-card i{
  margin-top: -50px;
  vertical-align: middle;
}
.el-upload-list--picture-card .el-upload-list__item{
  width: 104px;
  height: 104px;
}
.block .el-pagination{margin-top: 38px}

.block .el-pagination .btn-prev{
  margin-right: 28px;
}
.block .el-pagination .btn-next{
  margin-left: 8px;
}
.block .el-pagination .btn-prev,.block .el-pagination .btn-next{
  width: 40px;
  height:40px;
  border:1px solid rgba(153,153,153,1);
  border-radius:5px;
  padding: 0!important;
}
.block .el-pagination .el-pager .number{
  width:40px;
  height:40px;
  border:1px solid rgba(153,153,153,1);
  border-radius:5px;
  font-size:14px;
  font-family:PingFang-SC-Regular;
  font-weight:400;
  line-height: 40px;
  margin-right:20px;
}

.block .el-pagination .el-pager .active{
  background:rgba(19,159,248,1);
  color:rgba(255,255,255,1)!important;
}
.block .el-pagination  .el-pagination__total{
  font-size:14px;
  font-family:PingFang-SC-Regular;
  font-weight:400;
  margin-left: 20px;
  line-height: 44px;
}
.block .el-pagination  .el-pagination__jump{
  display: inline-block;
  line-height: 44px;
  margin-left: 0;

}
.block .el-pagination  .el-pagination__jump .el-input__inner{
  width:50px;
  height:40px;
  border:1px solid rgba(153,153,153,1);
  border-radius:5px;
  margin-left: 0px;
}
.AddIMG_switch .el-switch__core{
  margin-left: 0!important;
}
.AddIMG_input_box  .el-upload .el-button--small{
    width:106px!important;
    height:36px!important;
    background: transparent!important;
}
.AddIMG_input_box .el-button--primary{
    color:rgba(61,73,102,1)!important;
    border: 0!important;
}
.AddIMG_yl_upload .el-upload .el-button--small{
  width:110px;
  height:36px;
  background:rgba(242,246,252,1);
  border-radius:4px;
  border:1px solid rgba(51,119,255,1);
}
.AddIMG_yl_upload .el-upload .el-button--small span {
  font-size: 16px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(19, 159, 248, 1);
}
.AddIMG_bq_box_top_bq .el-checkbox__inner{
  opacity: 0;
}
.AddIMG_bq_box_top_bq .el-checkbox__label{
  padding-left: 0;
  font-size:12px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(143,155,179,1);
}
.AddIMG_bq_box_top_bq  .el-checkbox{
  background:rgba(255,255,255,1);
  border:1px solid rgba(153,153,153,1);
  border-radius:5px;
  padding-right: 14px;
  margin-bottom: 10px!important;
  margin-left: 20px;
}
.AddIMG_bq_box_top_bq .el-checkbox__label{
  font-size:12px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(143,155,179,1);
  padding: 5px 0px;
}

.AddIMG_bq_box_top_bq .is-checked{
  border:1px solid rgba(19, 159, 248, 1);
}
.AddIMG_bq_box_top_bq .el-checkbox span{
  border: 0!important;
}
.box_select .el-radio{
  height: 237px;
  vertical-align: top;
}
.box_select .el-radio .el-radio__input{
  line-height: 237px;

}
.box_select .el-radio .el-radio__label,.boxCheck .el-radio__label{
  opacity: 0;
}
.box_select .el-radio .el-radio__input .el-radio__inner{
  border-radius:0px!important;
}
.box_select .el-radio .is-checked .el-radio__inner::after{
  border: 0px solid #fff;
  box-sizing: content-box;
  content: "";
  border-left: 0;
  border-top: 0;
  height: 0;
  left: 0px;
  position: absolute;
  top: 0px;
  width: 0px;
  transform: rotate(45deg) scaleY(1);
}
.top_name{
  width:100%;
  height:65px;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 6px 0px rgba(0, 0, 0, 0.04);
  position: fixed;
  left: 256px;
  top:65px;
}
.inner{
  margin-left: 18px;
  color:rgba(19,159,248,1);
  margin-right: 10px;
  border-radius:2px;
}
.top_name>span{
  display: inline-block;
  line-height: 50px;
}
.top_txt{
  font-size:14px;
  font-family:PingFang-SC-Regular;
  font-weight:400;
  color:rgba(153,153,153,1);
  line-height:36px;
}
.content{
  width: 100%;
  height: 100%;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 6px 0px rgba(0, 0, 0, 0.04);
  margin-top: 152px;
}
.Search{
  margin-left: 24px;
  margin-bottom: 34px;
}
.Search img{
  width: 28px;
  position: relative;
  left: -485px;
  top: 10px;
  cursor: pointer;
}
.Search input{
  width:404px;
  height:36px;
  padding-left: 40px;
  background:rgba(255,255,255,1);
  border-radius:4px;
  border:1px solid rgba(211,219,235,1);
  margin-left: 0;
  margin-right: 50px;
  margin-top: 24px;
}
.Search select{
  width:200px;
  height:36px;
  background:rgba(255,255,255,1);
  border-radius:4px;
  border:1px solid rgba(211,219,235,1);
}
.Search_tit{
  display: inline-block;
  width:144px;
  height:36px;
  line-height: 36px;
  background:rgba(242,246,252,1);
  border-radius:4px;
  border:1px solid rgba(211,219,235,1);
  font-size:14px;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(61,73,102,1);
  float: right;
  text-align: center;
  margin-top: 29px;
  margin-right: 40px;
}
.label{
  margin-bottom: 18px;
  margin-left: 24px;
}
.labelName{
  display: inline-block;
  height:30px;
  background:rgba(255,255,255,1);
  border-radius:5px;
  font-size:14px;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(31,46,77,1);
  margin-right: 24px;
  text-align: center;
  line-height: 38px;
  cursor: pointer;
}
.label_txt{
  font-size:14px;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(143,155,179,1);
  margin-right: 16px;
}

.active{
  background:rgba(255,255,255,1);
  border:1px solid rgba(19,159,248,1);
}
.box{
  margin-top: 24px;
}
.boxImg{
  display: inline-block;
  width:779px;
  height:328px;
  background:rgba(255,255,255,1);
  border-radius:4px;
  padding: 13px 0 14px 14px;
  box-shadow:0px 0px 10px 0px rgba(153,153,153,0.14);
  margin: 0px 16px 24px 0!important;
}
.boxImg:nth-child(2n){
  margin-right: 0!important;
}
.boxImg img{
  width:310px;
  height:328px;
  background:rgba(216,216,216,1);
  border-radius:4px;
  margin-right: 24px;
}
.boxImg_right{
  display: inline-block;
  vertical-align: top;
}
.boxImg_right_1 .img{
  vertical-align: top;
  display: inline-block;
  width:58px;
  height:28px;
  background:rgba(255,255,255,1);
  border-radius:4px;
  border:1px solid rgba(211,219,235,1);
  font-size:12px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(143,155,179,1);
  text-align: center;
  line-height: 28px;
}
.boxImg_right_1,.boxImg_right_2{
  display: inline-block;
  vertical-align: top;
}
.boxImg_xz_yz{
  display: inline-block;
  max-width: 180px !important;
  height:35px;
  overflow: hidden;
}
.boxImg_text{
  display: inline-block;
  font-size:14px;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(143,155,179,1);
  margin-bottom: 15px;
}
.boxImg_content{
  font-size:14px;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(31,46,77,1);
}
.boxImg_right_1 .boxImg_text{
  width: 90px;
  margin-right: 11px;
  text-align: right;
}
.boxImg_right_2 .boxImg_text{
  width: 100px;
  margin-right: 12px;
}
.ck{
  color:rgba(19,159,248,1);
  cursor: pointer;
}
.box_box{
  display:inline-block;
  background:rgba(247,249,252,1);
  border-radius:4px;
  border:1px solid rgba(211,219,235,1);
  font-size:12px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(143,155,179,1);
  padding: 5px 10px;
  margin-right: 12px;
  margin-bottom: 8px;
}
.boxImg_xz{
  display: inline-block;
  width: 300px;
  max-height: 35px;
  overflow: hidden;
}
.boxImg_bq{
  vertical-align: top;
}
.dowload{
  display: inline-block;
  width:44px;
  height:28px;
  background:rgba(247,249,252,1);
  border-radius:4px;
  border:1px solid rgba(211,219,235,1);
  font-size:12px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(143,155,179,1);
  text-align: center;
  line-height: 28px;
  margin-left: 20px;
}
.bjImg{
  width:310px;
  height:38px;
  background:rgba(134,134,134,0.503);
  border-radius:0px 0px 4px 4px;
  position: relative;
  top:-43px;
  text-align: center;
}
.bjImg{
  font-size:12px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height: 38px;
}
.block{
  text-align: right;
  margin-bottom: 60px;
}
.zt,.cc,.xgsc,.dx{
    display: inline-block;
}
.zt>.boxImg_content,.xgsc>.ck{
    display: inline-block;
    width: 100px;
}
.boxCheck .el-checkbox__label{
    display: none;
}
.work_tab .el-table th{
  height: 40px!important;
}
  .time .el-input__inner{
    width:400px!important;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
  }
  .times .el-input__inner{
    width:514px!important;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
  }
.input_type .el-textarea{
  width: 60%;
}
.input_type .el-textarea__inner{
  display: inline-block!important;
  width:400px!important;
  height:92px!important;
  background:rgba(255,255,255,1);
  border-radius:4px;
  border:1px solid rgba(211,219,235,1);
}
.box_uploading .el-upload--picture-card{
  width:104px;
  height:104px;
  background:rgba(247,249,252,1);
  border-radius:4px;
  border:1px solid rgba(211,219,235,1);
}
.table_material .el-button--text{
  height:36px;
  background:rgba(51,119,255,1);
  border-radius:4px;
  padding: 10px;
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(255,255,255,1);
}
  .problem .el-button{
    display: inline-block;
    padding: 0!important;
    border: 0!important;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(48,144,240,1)
  }
  .block .el-range-editor.el-input__inner{
    width:318px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
  }
  .up .el-button--primary{
    width:106px;
    height:36px;
    background:rgba(255,255,255,1)!important;
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(61,73,102,1)!important;
  }
  .timesDate .times .el-input__inner{
    width:318px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);
  }
.timesDate  .el-date-editor .el-range-input{
  vertical-align: top;
}
</style>
