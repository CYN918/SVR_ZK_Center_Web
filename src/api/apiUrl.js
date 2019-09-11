export default {
/*需求相关*/
	/*获取筛选配置*/
	sysconfig_material:{
		url:'/sysconfig/material',method:'get',
	},
	need_stat:{
		url:'/need/stat',method:'get',
	},
	//获取动态菜单
	perm_leftnav:{
		url:'/perm/leftnav',method:'get'
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
		url:'/material/lib/materials_resource',method:'get'
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
	//获取所有角色
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
		url:'/change_role_status',method:'post',
	},
	/*获取内部帐号*/
    account_all:{
		url:'/account/all',method:'get',
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
	//获取所有角色
	role_roles:{
		url:'/role/roles',method:'get'
	},
	//获取流程处理人列表
    process_list:{
		url:'/process/list',method:'get'
	},
	//添加流程处理人
    process_add_auditor:{
		url:'/process/add/auditor',method:'post',isType:{suktip:1}
	},
	//删除处理人
	process_del_auditor:{
		url:'/process/del/auditor',method:'post',isType:{suktip:1}
	},
	/*获取账户信息*/
	get_account:{
		url:'/get_account',method:'get'
	},
	//获取所有内部用户
	get_accounts:{
		url:"/get_accounts",method:'get'
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
		url:'/log/menu/create',method:'post',
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
		url:'/edit_account_status',method:'post',isType:{suktip:1}
	},
	/* 修改外帐号*/
	edit_external_account:{
		url:'/edit_external_account',method:'post',isType:{suktip:1,reload:1}	
	},
	//编辑用户信息
    account_edit:{
		url:"/account/edit",method:'post',isType:{suktip:1,reload:1}
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

	// 获取管理角色及角色列表
    role_user:{
		url:'/role/user',method:'get'
   },
   // 获取角色权限列表
    perm_userperm:{
		url:'perm/userperm',method:'get'
	},
	//获取全部权限组
	perm_group:{
		url:'/perm/group',method:'get'
	},
	//编辑角色权限
    perm_role_edit:{
		url:'perm/role/edit',method:'post',isType:{suktip:1}
	},
	//添加角色
	perm_role_add:{
		url:'perm/role/add',method:'post',isType:{suktip:1}
	},
	//获取可作为上级的角色
    role_leader:{
		url:'role/leader',method:'get'
	},
	//获取用户反馈列表
    feedback_list:{
		url:'feedback/list',method:'get'
	},
	//获取用户反馈详情
    feedback_detail:{
		url:'feedback/detail',method:'get'
	},
	//获取角色下的用户列表
    role_user_list:{
		url:'role/user/list',method:'get'
	},
	//获取角色权限组
    perm_role_group:{
		url:'perm/role/group',method:'get'
	},
	//获取所有角色
    api_get_roles:{
		url:'get_roles',method:'get'
	},
	//获取当前角色的子角色
	role_child_roles:{
		url:'role/child/roles',method:'get'
	},
    //获取反馈类型
    feedback_type:{
		url:'feedback/type',method:'get'
	},
	//提交反馈
    feedback_add: {
        url: 'feedback/add', method: 'post',isType:{suktip:1,reload:1}
    },
	//上传文件
    file_upload:{
		url:'/file/upload',method:'post',isType:{suktip:1}
	},
	//获取锁屏列表
    lockwallpaper_list:{
		url:'lockwallpaper/list',method:'get'
	},
	//新增锁屏壁纸
    lockwallpaper_add:{
		url:'/lockwallpaper/add',method:'get',isType:{suktip:1,reload:1}
	},
	//删除锁屏壁纸
    lockwallpaper_del:{
		url:'/lockwallpaper/del',method:'get'
	},
	//zip文件上传
    file_zip_upload:{
		url:'/file/zip/upload',method:'post',isType:{suktip:1}
	},
	//增加外部账户
    account_external_add:{
		url:'/account/external/add',method:'post',isType:{suktip:1}
	},
	//获取标签列表
    tags_search:{
		url:'/tags/search',method:'get'
	},
	//获取投放库列表
	putlib_search:{
		url:"/putlib/search",method:'get'
	},
	//獲取投放庫詳情
	putlib_binds:{
		url:'/putlib/binds',method:'get'
	},
	//获取标签数量统计
    tags_count:{
		url:'tags/count',method:'get'
	},
	//获取素材库列表
     material_search:{
		url:'/material/search',method:'get'
	 },
	//添加投放物料
	putlib_add_mfinal:{
		url:'/putlib/add/mfinal',method:'post',isType:{suktip:1}
	},
	//删除投放物料
	putlib_del_mfinal:{
		url:'/putlib/del/mfinal',method:'post',isType:{suktip:1}
	},
	//添加素材
	 material_add:{
		url:'/material/add',method:'post',isType:{suktip:1}
	 },
	//编辑素材
    material_edit:{
		url:'/material/edit',method:'post',isType:{suktip:1}
	},
	//删除标签
	tags_del:{
		url:'/tags/del',method:'post',isType:{suktip:1}
	},
	//获取相绑定素材
	material_bind_get:{
		url:'/material/bind/get',method:'get',
	},
	//获取物料绑定素材
    mfinal_bind_get:{
		url:'/mfinal/bind/get',method:'get'
	},
	 //获取素材详细内容
    material_detail:{
		url:'/material/detail',method:'get'
	},
	//获取类型
    config_material_type:{
		url:'/config/material/type',method:'get'
	},
	//添加标签
    tags_add:{
		url:'/tags/add',method:'post',isType:{suktip:1}
	},
	//获取物料库列表
    mfinal_search:{
		url:'/mfinal/search',method:'get'
	},
	//添加物料
    mfinal_add:{
		url:'/mfinal/add',method:'post',isType:{suktip:1,reload:1}
	},
	//编辑物料
    mfinal_edit:{
		url:'/mfinal/edit',method:'post',isType:{suktip:1,reload:1}
	},
	//开启/禁用素材
    material_status_change:{
		url:'material/status/change',method:'post',isType:{suktip:1}
	},
	//开启/禁用素材
    mfinal_status_change:{
		url:'mfinal/status/change',method:'post',isType:{suktip:1}
	},
    //获取物料详细内容
    mfinal_detail:{
        url:'/mfinal/detail',method:'get'
    },
	// //获取业务相关素材
	// demand_business_mbind:{
	// 	url:'/demand/business/mbind',method:'get'
	// },
	//编辑素材标签
    material_edit_tags:{
		url:'/material/edit/tags',method:'post',isType:{suktip:1,reload:1}
	},
	//编辑物料标签
    mfinal_edit_tags:{
		url:'/mfinal/edit/tags',method:'post',isType:{suktip:1,reload:1}
	},
	//修改设计规范
	config_standard_edit:{
		url:'/config/standard/edit',method:'post',isType:{suktip:1,reload:1}
	},
	//新增设计规范
	standard_add:{
		url:'/standard/add',method:'post',isType:{suktip:1}
	},
	//修改设计规范
    standar_edit:{
		url:'/standard/edit',method:'post',isType:{suktip:1,reload:1}
	},
	//删除设计规范
	standard_del:{
		url:'/standard/del',method:'post',isType:{suktip:1,reload:1}
	},



	//工作台
	//新增素材需求
    demand_material_add:{
		url:'/demand/material/add',method:'post',isType:{suktip:1,reload:1}
	},
	//获取设计规范列表
    standard_standards:{
		url:'/standard/search',method:'get'
	},
	//获取尺寸列表
    config_size:{
		url:'/config/size',method:'get'
	},
	//获取广告位类型列表
	config_position_type:{
		url:'/config/position/type',method:'get'
	},
	//新增投放库
	putlib_add:{
		url:'/putlib/add',method:'post',isType:{suktip:1}
	},
	//删除投放库
	putlib_del:{
		url:'/putlib/del',method:'post',isType:{suktip:1}
	},
	//获取需求详细信息
    demand_detail:{
		url:'/demand/detail',method:'get'
	},
	demand_business_add:{
		url:"/demand/business/add",method:'post',isType:{suktip:1,reload:1}
	},
	//获取待处理列表
	demand_await:{
		url:'/demand/await',method:'get'
	},
	//获取全部需求列表
	demand_search:{
		url:'/demand/search',method:'get'
	},
	//获取我的已处理需求列表
    demand_audited:{
		url:"demand/audited",method:'get'
	},
	//审核通过
    demand_audit:{
		url:"/demand/audit",method:'post',isType:{suktip:1,reload:1}
	},
	//驳回
    demand_reject:{
		url:"/demand/reject",method:'post',isType:{suktip:1,reload:1}
	},
	//提现驳回
	demand_apply_reject:{
		url:'/demand/apply/reject',method:'post',isType:{suktip:1,reload:1}
	},
	//提现通过
	demand_apply_audit:{
		url:"/demand/apply/audit",method:'post',isType:{suktip:1,reload:1}
	},
	//获取提现详情
	demand_apply_detail:{
		url:'/demand/apply/detail',method:'get'
	},
	//编辑业务需求
	demand_business_edit:{
		url:'/demand/business/edit',method:'post',isType:{suktip:1}
	},
	//编辑素材需求
	demand_material_edit:{
		url:'/demand/material/edit',method:'post',isType:{suktip:1}
	},
	//查看驳回详情
    demand_reject_logs:{
		url:'demand/reject/logs',method:'get'
	},
	// //获取业务相关素材
	// demand_business_mbind:{
	// 	url:'/demand/business/mbind',method:'get'
	// },
	//获取业务相关物料
	demand_business_mfbind:{
		url:'/demand/business/mfbind',method:'get'
	},

	//获取业务需求相关素材/物料
    demand_business_bind_list:{
		url:'demand/business/bind/list',method:'get'
	},

    //根据需求类型获取流程节点
	process_status:{
		url:'/process/status',method:'get'
	},
	//获取投放库类型
	config_putlib_type:{
		url:'/config/putlib/type',method:'get'
	},
    //获取壁纸标签
	lockwallpaper_tags_list:{
		url:'/lockwallpaper/tags/list',method:'get'
	},
	//MD5添加标签
	lockwallpaper_tags_add:{
		url:'/lockwallpaper/tags/add',method:'post',isType:{suktip:1}
	},
	//获取单个壁纸标签
	lockwallpaper_lwp_tags:{
		url:'/lockwallpaper/lwp/tags',method:'get'
	},

	//获取提现详细清单
    demand_apply_list:{
		url:'demand/apply/list',method:'get'
	},
	//导出提现详情
    demand_apply_export:{
		url:'demand/apply/export',method:'get'
	},
	//业务需求绑定素材/物料
    demand_business_bind:{
		url:'demand/business/bind',method:'post',isType:{suktip:1}
	},
    //删除业务需求绑定的物料/素材
	demand_business_bind_del:{
		url:'demand/business/bind/del',method:'post',isType:{suktip:1}
	},
	//业务需求绑定说明
    demand_business_bind_note: {
        url: 'demand/business/bind/note', method: 'post', isType: {suktip: 1}
    },
	//新增聚合页内容
	aggregation_add:{
		url:'/aggregation/add',method:'post',isType:{suktip:1,reload:1}
	},
	//获取聚合页内容
	aggregation_search:{
		url:'/aggregation/search',method:'get'
	},
	//编辑聚合页内容
	aggregation_edit:{
		url:'/aggregation/edit',method:'post',isType:{suktip:1,reload:1}
	},
	//删除聚合页内容
	aggregation_del:{
		url:'/aggregation/del',method:'post',isType:{suktip:1,reload:1}
	},
	//获取待替换资源
	replace_pending_list:{
		url:'/replace/pending/list',method:'get'
	},
	//获取已替换资源
	replace_had_list:{
		url:'/replace/had/list',method:'get'
	},
	//替换资源
	replace_add:{
		url:'/replace/add',method:'post',isType:{suktip:1}
	},
	//删除资源
	replace_del:{
		url:'/replace/del',method:'post',isType:{suktip:1}

	},
	//权限按钮
	perm_role_uri:{
		url:'/perm/role/uri',method:"get"
	},
	//获取需求发布下业务/素材类型
    config_demands_type:{
		url:'config/demands/type',method:'get'
	},
	//根据业务流程获取业务需求相关物料
    demand_business_status_mfbind:{
		url:'demand/business/status/mfbind/',method:'get'
	},
	//根据需求添加并绑定素材
    demand_add_material:{
		url:'demand/add/material',method:'post',isType:{suktip:1}
	},
	//获取素材需求相关素材
    demand_material_bind_list:{
		url:'demand/material/bind/list',method:'get'
	},
	//
    demand_material_bind_del:{
		url:'demand/material/bind/del',method:'post',isType:{suktip:1}
	},
	//根据需求添加并绑定物料
	demand_add_mfinal:{
		url:'demand/add/mfinal',method:'post',isType:{suktip:1}
	},
	//推送库列表详情
    pushlib_binds:{
		url:'pushlib/binds',method:'get'
	},
	//添加推送物料
    pushlib_add_mfinal:{
		url:'pushlib/add/mfinal',method:'post',isType:{suktip:1}
	},
	//外部账户推送物料列表
    pushlib_external_mfinal:{
		url:"pushlib/external/mfinal",method:'get'
	},
	//删除推送物料
    pushlib_del_mfinal:{
		url:'pushlib/del/mfinal',method:'post',isType:{suktip:1}
	},
	//获取所有的外部角色列表
    role_external_roles:{
		url:"role/external/roles",method:"get"
	},

	//获取资源替换数据
	replace_sdk_overview:{
		url:'replace/sdk/overview',method:'get'
	},
	//根据落地页MD5获取详情
    replace_res_detail:{
		url:"replace/res/detail",method:'get'
	},
	//获取当天的处理批次
    replace_times:{
		url:"replace/times",method:"get"
	},
	//根据日期获取PV的趋势数据
    replace_sdk_graph:{
		url:"replace/sdk/graph",method:'get'
	},
	//根据日期/次数导出统计概况
    replace_sdk_overview_export:{
		url:'replace/sdk/overview/export',method:'get'
	},
    //根据日期导出待替换的资源
    replace_pending_export:{
        url:'replace/pending/export',method:'get'
    },
	//编辑流程为会签/或签
    process_edit_audittype:{
		url:"process/edit/audittype",method:'post',isType:{suktip:1}
	},
	//物料数据报表
    report_mfinal:{
		url:'report/mfinal',method:'get'
	},
	//物料相关的素材
    report_mfinal_material:{
		url:'report/mfinal/material',method:'get'
	},
	//广告主收益报表
    report_income_admaster:{
		url:'report/income/admaster',method:'get'
	},
	// 渠道收益报表
    report_income_channel:{
		url:'report/income/channel',method:'get'
	},
	//收益总览
    report_income_summary:{
		url:'report/income/summary',method:'get'
	},
	//设计师成本管理报表
    report_cost_total:{
		url:'report/cost/total',method:'get'
	},
	//柱状图数据（已出流水、预估流税、已出成本、设计师成本）
    report_income_rank:{
		url:'report/income/rank',method:'get'
	},
	//top数据图表
    report_income_top:{
		url:'report/income/top',method:"get"
	},
	//批量上传图片API
    replace_bat:{
		url:"replace/bat",method:"post",isType:{suktip:1},
	},
	//上传主题文件
    themes_upload:{
		url:"themes/upload",method:'post',isType:{suktip:1}
	},
	//新增主题
    themes_add:{
		url:'themes/add',method:'post',isType:{suktip:1}
	},
	//主题列表
    themes_list:{
		url:'themes/list',method:'get'
	},
	//删除主题
    themes_del:{
		url:'themes/del',method:'post',isType:{suktip:1}
	},
	//编辑标签
    themes_tags:{
		url:"themes/tags",method:'post',isType:{suktip:1}
	},
	//新增应用推广图上传
    appad_add:{
		url:"appad/add",method:'post',isType:{suktip:1}
	},
	//获取包名列表
    appad_pkglist:{
		url:'appad/pkglist',method:'get'
	},
	//新建应用推广图及上传
    appad_new:{
		url:'appad/new',method:'post',isType:{suktip:1}
	},
	//据包名获取资源数据
    appad_pkg:{
		url:"appad/pkg",method:'get'
	},
	//设置对应的包上线下线
    appad_online:{
		url:"appad/online",method:"post",isType:{suktip:1}
	},
	//删除包对应的单个图片资源
    appad_del:{
		url:'appad/del',method:"post",isType:{suktip:1}
	},
	//业务需求绑定中间件
    demand_business_bind_middleware:{
		url:'demand/business/bind/middleware',method:"post",isType:{suktip:1}
	},
	//删除业务需求绑定中间件
    demand_business_middleware_del:{
		url:"demand/business/middleware/del",method:"post",isType:{suktip:1}
	},
	//根据条件获取包名列表
    appad_pkg_search:{
		url:'appad/pkg/search',method:'get'
	},
	// 获取分成管理配置
    analysis_config_sharing:{
		url:'analysis/config/sharing',method:'get'
	},
	//更新分成管理配置
    analysis_config_sharing_update:{
		url:"analysis/config/sharing/update",method:'post',isType:{suktip:1}
	},
	//设计师成本管理趋势图
    report_cost_chart:{
		url:'report/cost/chart',method:'get'
	},
	//分成成本详情-详细数据报表
    report_cost_sharing:{
		url:"report/cost/sharing",method:'get'
	},
	//分成成本详情趋势图
    report_cost_sharing_chart:{
		url:'report/cost/sharing/chart',method:'get'
	},
	//分成成本详情-详细数据报表
    report_sharing_material:{
		url:'report/sharing/material',method:'get'
	},
	//业务场景
    report_config_scene:{
		url:"report/config/scene",method:'get'
	},
	//广告位类型
    report_config_adspace_type:{
		url:"report/config/adspace/type",method:'get'
	},
	//获取广告主汇总信息
    adreview_adsdk_search:{
		url:'adreview/adsdk/search',method:'get'
	},
	//获取sdkid列表
    adreview_config_sdkid:{
		url:'adreview/config/sdkid',method:'get'
	},
	//广告物料审核
    adreview_adver_audit:{
		url:'adreview/adver/audit',method:'post',isType:{suktip:1},
	},
	//获取广告主列表
    adreview_config_admaster:{
		url:'adreview/config/admaster',method:'get'
	},
	//获取广告类型列表
    adreview_config_type:{
		url:'adreview/config/type',method:'get'
	},
	//获取广告详情
    adreview_adver_detail:{
		url:'adreview/adver/detail',method:"get"
	},
	//获取待审核广告信息
    adreview_adver_search:{
		url:'adreview/adver/search',method:'get'
	},
	//用户渠道信息列表
    adreview_user_channel_list:{
		url:"adreview/user/channel/list",method:'get'
	},
	//配置用户渠道信息
    adreview_user_channel_add:{
		url:'adreview/user/channel/add',method:'post',isType:{suktip:1}
	},
}