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
            for(var i=0;i<(JSON.parse(localStorage.getItem('letNav')).length);i++){
                if(JSON.parse(localStorage.getItem('letNav'))[i].title=='工作台'){
                    if(JSON.parse(localStorage.getItem('letNav'))[i].children.length<=0&&(JSON.parse(localStorage.getItem('letNav'))[i].list!=undefined&&JSON.parse(localStorage.getItem('letNav'))[i].list.length<=0)){
                        this.$message({
                            type: 'error',
                            message: ` 无权访问，请联系管理员`
                        });
                    }else{
                        this.letNav = JSON.parse(localStorage.getItem('letNav'))[i];
                    }

                }

            }
            
        },

    }
</script>
<style scoped>
</style>