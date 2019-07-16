<template>
    <div>
        <topNav :config="topConfig"></topNav>
        <leftNav :navData="letNav"></leftNav>
        <div class="xqList">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import topNav from '../../components/topNav';
    import leftNav from '../../components/leftNav';
    export default {
        data() {
            return{
                topConfig:{showL:1},
                letNav:'',
            }
        },
        components: {
            topNav,
            leftNav
        },
        mounted: function () {

            if(JSON.parse(localStorage.getItem('letNav'))[1].children.length<=0){
                this.$message({
                    type: 'error',
                    message: `您沒有该权限`
                });
            }else{
                this.letNav = JSON.parse(localStorage.getItem('letNav'))[1];
            }
            // let Nav = JSON.parse(localStorage.getItem('leftNav'));
            // for(let i = 0;i<Nav.length;i++){
            //  if(Nav[i].title=='管理'){
            //      this.letNav = Nav[i];
            //      console.log(i)
            //   }
            // }
        },

    }
</script>
<style scoped>
</style>