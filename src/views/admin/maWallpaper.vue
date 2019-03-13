<template>
	<div class="centNavBox">
		<tables 
		:tableConfig="tableConfig" 
		:tableDatas="tableData"
		@screenFn="getData"
		ref="Tabledd"
		></tables>
		<addWall ref="AddZ"></addWall>
	</div>	
</template>
<script>
import tables from '../common/tables';
import addWall from '../common/addWall';
export default {
	components:{tables,addWall},
    data() {
		return {
			tableData:[],	
			tableConfig:{
				total:-1,
				'show-summary':true,
				ischeck:false,
				list:[
					{prop:'user',lable:'外部账号名称'},
					{prop:'reviewing',lable:'外部待审核'},
					{prop:'review_success',lable:'外部审核通过'},
					{prop:'review_fail',lable:'外部审核不通过'},
					{prop:'origin',lable:'内部待推送'},					
					{prop:'attachment.url',lable:'操作',
						temps:[{type:'primary',size:'mini',value:'推送',fnName:'showAddZ',round:'round'},]							
					},
				],
			},		  

		}
    },
	mounted: function () {	
		this.getData();
	}, 
	methods: {
		enloding(){
			this.$refs.Tabledd.lodingfalse();		
		},
		showAddZ(on){
			this.$refs.AddZ.showAdd(this.tableData[on].user);	
		},
		getData(){
			this.api.material_wallpaper().then((data)=>{	
				this.tableData = this.clData(data);				
				this.enloding();
			})
		},
		clData(data){
			let arr  = [];
			this.tableConfig.total=-1;
			let da = data;
			for(let i=0,n=da.length;i<n;i++){
				arr.push(
					{
						user:da[i].user,					
						reviewing:da[i].reviewing,
						review_success:da[i].review_success,
						review_fail:da[i].review_fail,						
						origin:da[i].origin,
					},	
				);
			}
			return arr;

		},
	},
	watch: {   
		$route: {
			handler: function () {
				this.getData();
			},
			deep: true
		}
	},
}	
	
</script>

<style>

</style>