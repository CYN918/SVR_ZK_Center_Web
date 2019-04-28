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
</style>
