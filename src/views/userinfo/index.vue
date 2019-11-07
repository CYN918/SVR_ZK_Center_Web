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
            if(JSON.parse(localStorage.getItem('letNav'))[i].title=='个人中心'){
                this.letNav = JSON.parse(localStorage.getItem('letNav'))[i];

            }

        }
	},	
}
</script>
<style>
</style>
