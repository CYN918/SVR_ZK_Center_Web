String.prototype.gblen = function() {    
    var len = 0;    
    for (var i=0; i<this.length; i++) {    
        if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) {    
             len += 2;    
         } else {    
             len ++;    
         }    
     }    
    return len;    
}    
export default {
	phone_encryption:function(val){
		if(!val){return}
		return val.substring(0, 3) + '****' + val.substring(7, 11);
	},
	email_encryption:function(val){
		if(!val){return}
		let str = val.split('@');
		if(str.length == 1) {
			return str[0];
		}
		return str[0].substring(0, 1) + '****' + str[0].substr(-1, 1) + '@' + str[1];
	},		
	money_deiv:function(val){
		let str = ''+val;
		return  str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	},
	checkWz:function(da){
		if(!da && da!=0){
			return true;
		}
		if(da.trim().length==0){
			return true;
		}
		return false;
	},
	dataURLtoFile:function(val,type) {
		let arr = val.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length, 
		u8arr = new Uint8Array(n);
		while(n--){
			u8arr[n] = bstr.charCodeAt(n);
		}
		if(type=='blob'){
			return new Blob([u8arr],{type:mime});
		}
		return new File([u8arr], 'xxxxxxxxxf.png', {type:mime});
	},
	scTop:function(on){
		document.documentElement.scrollTop =on;
		document.body.scrollTop =on;
	},
	getTop:function(){
		return document.documentElement.scrollTop||document.body.scrollTop;
	},
	Jl_fn:function(fn){
		return {
			adfn:'',
			throttle:function(func, delay){
				var timer = null;
				var startTime = Date.now();     
				return function() {             
				    var curTime = Date.now();             
				    var remaining = delay - (curTime - startTime);             
				    var context = this;             
				    var args = arguments;             
				    clearTimeout(timer);              
				    if (remaining <= 0) {                    
				        func.apply(context, args);                    
				        startTime = Date.now();              
				    } else {                    
				        timer = setTimeout(func, remaining);              
				    }      
				}
			},
			add:function(){	
				this.adfn = this.throttle(fn, 50);
				window.addEventListener('scroll', this.adfn);
			},
			remove:function(){
				window.removeEventListener('scroll',this.adfn);
			},
			
		}
		
	},
	nt:function(n){
		return n>9?n:'0'+n;
	},
	backTime:function(ont,fg) {
		let t = new Date(ont);
		let Y=t.getFullYear(),
		M=t.getMonth()+1,
		D=t.getDate(),
		h=t.getHours(), 
		m=t.getMinutes(), 
		s=t.getSeconds(),
		f = '-';
		if(fg){
			f=fg;
		}
		
		return Y+f+this.nt(M)+f+this.nt(D)+' '+h+':'+m+':'+s; 
	},
	getTimes:function(ont) {
		let times = (new Date(ont)).getTime(),
		nowt = new Date().getTime(),
		pt = nowt-times,
		s = 1000,
		m = s*60,
		h = m*60,
		d = h*24,
		ms = 30*d;
			if(pt<=0){
				return '刚刚';
			}
			if(pt>ms*12){
				 return formatDate(new Date(times));		
			}
			if(pt>ms){
				return parseInt(pt/ms) + "个月前";
			}
			if(pt>d){
				return parseInt(pt/d) + "天前";
			}
			if(pt>h){
				return parseInt(pt/h) + "小时前";
			}
			if(pt>m){
				return parseInt(pt/m) + "分钟前";
			}
			return '刚刚';				
	},
	Cavars:function(a){
		if(!a){return}
		let arr = a.split('.');
		if(arr[arr.length-1]=='svg'){
			return a;
		}
		return a;
	},

	
}



