
<template>
<div class="loading"></div>
</template>

<script>
export default {
  name: 'Loading' // 定义的组件名称 使用时写法：loading
 
}
</script>

<style scoped>
.loading {
  position: absolute;
  left: 0;
  top: 0;
  background: url('../../public/img/loading.gif') center center no-repeat rgba(255,255,255,0.5);
  width: 100%;
  height: 100%;
  z-index: 100;
}
</style>

