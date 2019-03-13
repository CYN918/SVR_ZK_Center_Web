<template>
	<div @click="loginout">退出</div>
</template>

<script>
export default {	
	methods:{
		loginout(){	
			let urld = 'http://ts-i.idatachain.cn';
			if(window.location.host=='c.zookingsoft.com'){
				urld = 'http://c.zookingsoft.com';
			}						
			this.$ajax({
				method: 'get',
				timeout: 10000,
				url: urld+'/api/logout',			     
			}).then((msg)=>{	
					if(msg.data.code==0){
						localStorage.setItem('token','');
						let cent = 'center';
						if(window.location.host=='ts-centerweb.idatachain.cn'){
							cent = 'center_dev';
						}else
						if(window.location.host=='localhost:8080'){
							cent = 'center_local';
						}
						window.location.href="http://account.zookingsoft.com/auth/logout?from="+cent;
					}						
			}).catch(()=>{
			
			})			
	}}
}
</script>

<style>
</style>
