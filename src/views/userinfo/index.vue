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
		this.letNav = JSON.parse(localStorage.getItem('letNav'))[3];
	},	
}
</script>
<style>
</style>
