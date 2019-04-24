export default {
/*需求相关*/
	/*获取筛选配置*/
	sysconfig_material:{
		url:'/sysconfig/material',method:'get',
	},
	need_stat:{
		url:'/need/stat',method:'get',
	},
	/*获取列表*/
	need_list:{
		url:'/need/list',method:'get',
	},
	/*更新状态*/
	need_check:{
		url:'/need/check',method:'get',isType:{suktip:1,reload:1}
	},
	/*获取详情*/
	need_get:{
		url:'/need/get',method:'get',
	},
    /*获取展示图详情*/
    need_adtype:{
        url:'/need/adtype',method:'get',
    },
	/*添加*/
	need_create:{
		url:'/need/create_need',method:'post',isType:{suktip:1,reload:1}
	},
	/*更新*/
	need_update:{
		url:'/need/update_need',method:'post',isType:{suktip:1,reload:1}
	},
	/*获取列表*/
	need_list_check:{
		url:'/need/list_check',method:'get'
	},
    /*获取壁纸推送待处理*/
    put_lists:{
        url:'/handle/putlists',method:'get'
    },
    /*获取壁纸推送待处理*/
    get_processed:{
         url:'/handle/processed',method:'get'
    },
	/*获取列表*/
	material_lists:{
		url:'/material/lists',method:'get'
	},
	handle_lists:{
		url:'/handle/lists',method:'get',
	},
	handle_pass:{
		url:'/handle/pass',method:'post',isType:{suktip:1,reload:1}
	},
	handle_reject:{
		url:'/handle/reject',method:'post',isType:{suktip:1,reload:1}
	},	
	materialLib_lists:{
		url:'/material/lib/lists',method:'get'
	},	
	materialLib_materials:{
		url:'/material/lib/materials',method:'get'
	},	
	materialLib_detach:{
		url:'/material/lib/detach',method:'post',isType:{suktip:1,reload:1}
	},
	materialLib_materialList:{
		url:'/material/lib/attach-material-lists',method:'get'
	},
	materialLib_attach:{
		url:'/material/lib/attach',method:'post',isType:{suktip:1,reload:1}
	},
	//获取新增需求素材类型
    material_type:{
        url:'/need/add_material_type',method:'get'
	},
	material_stat:{
		url:'/material/stat',method:'get'
	},
	material_flows:{
		url:'/material/work-flows',method:'get'
	},
	material_wallpaper:{
		url:'/wallpaper/put/users',method:'get'
	},
	material_wallpaperPut:{
		url:'/wallpaper/put/put-wallpapers',method:'get'
	},
	material_wallpaperPutmat:{
		url:'/wallpaper/put/material-put',method:'get',isType:{suktip:1,reload:1}
	},
	get_roles:{
		url:'/get_roles',method:'get'
	},
	get_account_roles:{
		url:'/get_account_roles',method:'get'
	},
	add_role:{
		url:'/add_role',method:'post',isType:{suktip:1,reload:1}
	},
	delete_role:{
		url:'/delete_role',method:'post',isType:{suktip:1,reload:1}
	},
	edit_roles:{
		url:'/edit_role',method:'get',
	},
	edit_rolex:{
		url:'/edit_role',method:'post',isType:{suktip:1,reload:1}
	},
	/*改变角色状态*/
	change_role_status:{
		url:'/change_role_status',method:'post',isType:{suktip:1,reload:1}	
	},
	/*获取内部帐号*/
	get_accounts:{
		url:'/get_accounts',method:'get',
	},
	/*获取外部帐号*/
	get_external_accounts:{
		url:'/get_external_accounts',method:'get',
	},
	wallpaper_put:{
		url:'/wallpaper/put/wallpapers',method:'get',
	},
	add_external_account:{
		url:'/add_external_account',method:'post',isType:{suktip:1,reload:1}			
	},
	wallpaper_check:{
		url:'/wallpaper/put/check',method:'get',isType:{suktip:1,reload:1}	
	},
	/*获取账户信息*/
	get_account:{
		url:'/get_account',method:'get'
	},
	add_account:{
		url:'/add_account',method:'post',isType:{suktip:1,reload:1}
	},
	/*获取登录日志*/
	get_logs:{
		url:'/log/login/logs',method:'get'
	},
	/*记录路径*/
	create_menu:{
		url:'/log/menu/create',method:'post'
	},
	/*获取路径记录*/
	get_menulog:{
		url:'/log/menu/stat',method:'get'
	},
	/* 获取所有的权限*/
	get_permissions:{
		url:'/get_permissions',method:'get'
	},	
	/* 删除帐号*/
	delete_account:{
		url:'/delete_account',method:'post',isType:{suktip:1,reload:1}	
	},
	/* 修改帐号状态*/
	edit_account_status:{
		url:'/edit_account_status',method:'post',isType:{suktip:1,reload:1}	
	},
	/* 修改外帐号*/
	edit_external_account:{
		url:'/edit_external_account',method:'post',isType:{suktip:1,reload:1}	
	},
	/* 修改内帐号*/
	edit_account:{
		url:'/edit_account',method:'post',isType:{suktip:1,reload:1}	
	},
	/* 修改权限*/
	edit_role_permission:{
		url:'/edit_role_permission',method:'post',isType:{suktip:1,reload:1}
	},
	/* 修改权限*/
	handle_stat:{
		url:'/handle/stat',method:'get',
	},
	get_role_permission:{
		url:'/get_role_permission',method:'get',
	},
	/*修改密码*/
	edit_account_password:{
		url:'/edit_account_password',method:'post',isType:{suktip:1,reload:1}
	},
	need_export:{
		url:'/need/export',method:'get'
	},
	/*data*/
	/*广告图数据*/
	data_ad_material_picture:{
		url:'/data/ad/material/picture',method:'get'
	},
	/*广告图详细数据*/
	data_ad_material_picture_detail:{
		url:'/data/ad/material/picture/detail',method:'get'
	},
	/*广告模板数据*/
	data_ad_material_template:{
		url:'/data/ad/material/template',method:'get'
	},
	/*广告模板详细数据*/
	data_ad_material_template_detail:{
		url:'/data/ad/material/template/detail',method:'get'
	},
	/*获取锁屏壁纸数据*/
	data_ad_material_wallpaper:{
		url:'/data/ad/material/wallpaper',method:'get'
	},
	/*获取锁屏壁纸详细数据*/
	data_ad_material_wallpaper_detail:{
		url:'/data/ad/material/wallpaper/detail',method:'get'
	},
	/*获取广告数据*/
	data_ad:{
		url:'/data/ad',method:'get'
	},
	/*获取广告详细数据*/
	data_ad_detail:{
		url:'/data/ad/detail',method:'get'
	},
	/*获取广告位相关数据*/
	data_ad_ad_space:{
		url:'/data/ad/ad_space',method:'get'
	},
	/*获取广告主数据*/
	data_ad_master:{
		url:'/data/ad/ad_master',method:'get'
	},
	/*获取广告主详细数据*/
	data_ad_master_detail:{
		url:'/data/ad/ad_master/detail',method:'get'
	},
	/*获取壁纸渠道数据*/
	data_polling_product_channel:{
		url:'/data/polling/product/channel',method:'get'
	},
	/*获取壁纸使用时长数据*/
	data_gionee_lock_behavior_channel_time:{
		url:'/data/gionee_lock/behavior/channel/time',method:'get'
	},
	/*获取壁纸行为数据*/
	data_gionee_lock_behavior_wallpaper:{
		url:'/data/gionee_lock/behavior/wallpaper',method:'get'
	},	
	/*获取壁纸渠道详细数据*/	
	data_gionee_lock_behavior_wallpaper_channel:{
		url:'/data/gionee_lock/behavior/wallpaper/channel',method:'get'
	},
	/*壁纸广告分析数据*/
	data_gionee_lock_behavior_wallpaper_ad:{
		url:'/data/gionee_lock/behavior/wallpaper/ad',method:'get'
	},
	/*获取收益详表*/
	data_income_detail:{
		url:'/data/income/detail',method:'get'
	},	
	/*获取相关收益*/
	data_income_related:{
		url:'/data/income/related',method:'get'
	},
	/*获取渠道成本*/
	data_cost_channel:{
		url:'/data/cost/channel',method:'get'
	},	
	/*获取设计师成本*/
	data_cost_designer:{
		url:'/data/cost/designer',method:'get'
	},
	/*获取设计师成本详细数据*/
	data_cost_designer_detail:{
		url:'/data/cost/designer/detail',method:'get'
	},
	/*获取收益日周月*/
	data_income_report:{
		url:'/data/income/report',method:'get'
	},
	/*获取数据总览*/	
	data_income_overall:{
		url:'/data/income/overall',method:'get'
	},
	/*获取产品列表*/
	data_filter_product:{
		url:'/data/filter/product',method:'get'
	},
	/*获取广告主列表*/
	data_filter_ad_master:{
		url:'/data/filter/ad_master',method:'get'
	},
	/*获取广告位ID列表*/
	data_filter_ad_space_id:{
		url:'/data/filter/ad_space_id',method:'get'
	},
	/*获取广告位名称列表*/
	data_filter_ad_space_name:{
		url:'/data/filter/ad_space_name',method:'get'
	},
	/*获取广告位类型列表*/
	data_filter_ad_space_type:{
		url:'/data/filter/ad_space_type',method:'get'
	},
	/*获取渠道列表*/
	data_filter_channel:{
		url:'/data/filter/channel',method:'get'
	},
	//上传文件
    file_upload:{
		url:'/file/upload',method:'post'
	},
	//获取锁屏列表
    lockwallpaper_list:{
		url:'lockwallpaper/list',method:'get'
	},
	//新增锁屏壁纸
    lockwallpaper_add:{
		url:'/lockwallpaper/add',method:'get'
	},
	//删除锁屏壁纸
    lockwallpaper_del:{
		url:'/lockwallpaper/del',method:'get'
	},
}