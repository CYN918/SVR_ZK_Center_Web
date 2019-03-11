import axios from 'axios'
import {Message} from 'element-ui'
const generateApiMap = (map) => {
	let facade = {}
	for(let el in map){
		facade[el] = toMethod(map[el]);
	}
	return facade
};
const toMethod = (options) => {
	options.method = options.method || 'post'
	return (params = {}, attachedParams, config = {},isType={}) => {
	
		return sendApiInstance(options.method, options.url, params, config,options.isType)
	}
}
// 创建axios实例
const createApiInstance = (config = {}) => {
	let basrurl = 'http://ts-i.idatachain.cn/api/';
	
	if(window.location.host=='c.zookingsoft.com'){
		basrurl = 'http://c.zookingsoft.com/api';
	}
	const _config = {
		withCredentials: true, // 跨域
		baseURL: basrurl,		
		headers:{'Authorization':'Bearer '+localStorage.getItem('token')},
	}
	
	config = Object.assign(_config, config);
	return axios.create(config)
}
const sendApiInstance = (method, url, params, config = {},isType={}) => {
	if(!url){
		return
	}		
	let instance = createApiInstance(config)
	
	instance.interceptors.response.use(response => {
		let {status, message, data} = response.data;
		if(status==true){
			if(isType.suktip){
				Message({message: '操作成功',type: 'success'});
			}
			if(isType.reload){
		
				location.reload();	
			}
			return data
		}else{

			Message({dangerouslyUseHTMLString:true,message: message});
		}
  },
  error => {	  
		Message({message: '服务器故障',type: 'warning'});
		return Promise.reject(error).catch(res => {
    })
  }
  )
  if (method === 'get') {
//     params = {
//       params: params
//     }
  }

  return instance[method](url, params, config)
}

export default {
  generateApiMap
}
