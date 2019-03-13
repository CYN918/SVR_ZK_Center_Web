<template>
	<div>
		<topNav :config="topConfig"></topNav>
		<leftNav :navData="letNav"></leftNav>
		<div class="xqList">
			<div class="xqListbox">
				<router-view/>
			</div>
		</div>
	</div>
</template>

<script>
	import topNav from '../../components/topNav';
	import leftNav from '../../components/leftNav';
	import userMessage from './userMessage';
	export default {
		components:{topNav,leftNav,userMessage},
		data() {
			
			return {
				topConfig:{showL:-1},
				letNav:{title:'锁屏壁纸平台',
					list:[
						{title:'公司信息',url:'/indexs/message'},
						{title:'锁屏壁纸列表',url:'/indexs/list'},
					],
				}
				
			};
		},

	}
</script>

<style>

</style>
