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
  margin-top: 50px;
  vertical-align: middle;
}
.el-upload-list--picture-card .el-upload-list__item{
  width: 230px;
  height: 205px;
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
  color:rgba(255,255,255,1);
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
  width: 140px!important;
  height: 50px!important;
  border: 0!important;
}
.AddIMG_yl_upload .el-upload .el-button--small{
  width: 140px!important;
  height: 50px!important;
  background:rgba(19,159,248,.1);
  border: 0!important;
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
  font-size:16px;
  font-family:PingFang-SC-Regular;
  font-weight:400;
  color:rgba(54,54,54,1);
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
.box_select .el-radio .el-radio__label{
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
</style>
