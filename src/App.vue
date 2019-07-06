<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
      data(){
          return{}
      },
      mounted(){
          // this.getLefNav()
      },
      methods:{
          // getLefNav(){
          //     this.api.perm_leftnav().then((res)=>{
          //         localStorage.setItem('letNav',JSON.stringify(res));
          //     })
          // }
      }
  }
</script>
<style lang="scss">
html,body,div,h1,ul,li,a,p,img{
	margin: 0;padding: 0;border: none;
}
html,body{
	width: 100%;
	min-height: 100%;
    background: rgba(239,244,248,1);
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
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background: #3377ff;
}
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
  margin-right: 10px;
}
/*.block .el-pagination .btn-next{*/
  /*margin-left: 10px;*/
/*}*/
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
  margin-right:10px;
}
.bg{z-index: 999!important;}
.block .el-pagination .el-pager .active{
  background:#3377ff!important;
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
.block .el-pagination__sizes{
  height: 36px;
  line-height: 36px;
}
.block .el-input--mini .el-input__inner{
  height: 36px;
  line-height: 36px;
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
  border:1px solid #3377ff;
}
.AddIMG_yl_upload .el-upload .el-button--small span {
  font-size: 16px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: #3377ff;
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
  border:1px solid #e6e9f0;
  border-radius:5px;
  padding-right: 14px;
  margin-bottom: 14px!important;
  margin-left: 14px;
}
.AddIMG_bq_box_top_bq .el-checkbox__label{
  font-size:12px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(143,155,179,1);
  padding: 5px 0px;
}

.AddIMG_bq_box_top_bq .is-checked{
 background:  rgba(51,119,255,1);
  border: 0px!important;
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
.block .el-pagination .el-pagination__jump .el-input__inner{
  width: 38px!important;
  height: 34px!important;
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
  height:63px;
  border-top:3px solid #ededed;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 6px 0px rgba(0, 0, 0, 0.04);
  position: fixed;
  left: 256px;
  top:63px;
  z-index: 99;
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
}
.Search>img{
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
  cursor: pointer;
}
.label{
  margin:18px 0 18px 24px;
}
.labelName{
  display: inline-block;
  height:28px;
  background:rgba(255,255,255,1);
  border-radius:5px;
  font-size:12px;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(31,46,77,1);
  margin-right: 24px;
  text-align: center;
  line-height: 28px;
  cursor: pointer;
  margin-top: 10px;
}
.label_txt{
  display: inline-block;
  vertical-align: top;
  font-size:14px;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(143,155,179,1);
  margin-right: 16px;
  margin-top: 10px;

}

.contentImg .label .active,.labelName:hover{
  display: inline-block;
  padding: 0 10px;
  background: #3377ff;
  border-radius: 4px;
  margin-right: 10px!important;
  color: #fff!important;
  font-size: 12px!important;
}
/*.active{*/
  /*background:rgba(255,255,255,1);*/
  /*border:1px solid rgba(19,159,248,1);*/
/*}*/
.box{
  margin-top: 24px;
}
.boxImg{
  display: inline-block;
  width:776px;
  height:327px;
  background:rgba(255,255,255,1);
  border-radius:4px;
  padding: 14px 0 14px 14px;
  box-shadow:0px 0px 10px 0px rgba(153,153,153,0.14);
  margin: 0px 23px 24px 0;
  position: relative;
}
.boxImg:nth-child(2n){
  margin-right: 0!important;
}
.boxImg_right_1 div{height: 36px}
.boxImg .img_box{
  display: inline-block;
  width:252px;
  height:326px;
  background:#e3e7eb;
  border-radius:4px;
  margin-right: 24px;
  text-align: center;
}
.boxImg img{
  width:218px;
  max-height:326px;
  position: relative;
  top:50%;
  transform: translateY(-50%);
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
  cursor: pointer;
}
.boxImg_right_1{
  max-width: 450px;
}
.boxImg_right_1,.boxImg_right_2{
  display: inline-block;
  vertical-align: top;
}
.boxImg_xz_yz{
  display: inline-block;
  max-width: 234px !important;
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
  width: 110px;
  margin-right: 11px;
  text-align: right;
}
.boxImg_right_2 .boxImg_text{
  width: 100px;
  margin-right: 12px;
}
.ck{
  color:#3377ff;
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
/*.box_box:nth-child(3){*/
  /*margin-right:0!important;*/
/*}*/
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
  border:1px solid #3377ff;
  font-size:12px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:#3377ff;
  text-decoration: none;
  text-align: center;
  line-height: 28px;
  margin-left: 20px;
}
.bjImg{
  width:252px;
  height:40px;
  background:rgba(134,134,134,0.503);
  border-radius:0px 0px 4px 4px;
  text-align: center;
  cursor: pointer;
  position: relative;
  bottom: 42px;
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
.cell .el-button--text{
  color: #3377ff;
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
 .block .el-pagination .btn-prev, .block .el-pagination .btn-next{
    width:40px;
    height:36px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(211,219,235,1);

  }
.block .el-pagination .el-pager .number{
  width:40px;
  height:36px;
  line-height: 36px;
  background:rgba(255,255,255,1);
  border-radius:4px;
  border:1px solid rgba(211,219,235,1);
}
.AddIMG_bq_box_top_bq .el-checkbox__input.is-checked+.el-checkbox__label{
  color:rgba(255,255,255,1)!important;
}
.content .el-table--border, .el-table--group{
  margin-bottom: 24px!important;
}
  .problem .el-table__expanded-cell{
    background:#F7F9Fa;
  }
.problem .el-table__expanded-cell:hover{
  background:#F7F9Fa!important;
}
  .tags_name .el-checkbox__input{
    display: none;
  }
select{
  color: #8b9bb3;
}
::-webkit-input-placeholder { /* WebKit, Blink, Edge */
  color:#8b9BB3;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color:#8b9BB3;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
  color:#8b9BB3;
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color:#8b9BB3;
}
  .times .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 512px;
  }
.time .el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 400px;
}
.tags{
  display: inline-block;
  max-width: 1090px;
  max-height: 50px;
  overflow: hidden;
  vertical-align: top;
}
.ALLtags{
  max-height: 100%!important;
}
.tagsAll{
  display: inline-block;
  color:rgba(51,119,255,1);
  cursor: pointer;
  vertical-align: top;
  font-size: 12px;
  line-height: 36px;
  margin-top: 10px;
}
  .table_material .el-checkbox__label{opacity: 0;position: absolute;}
.activeHeid{
  display: none!important;
}
.el-button{
  background: rgba(0,0,0,0)!important;
}
</style>
