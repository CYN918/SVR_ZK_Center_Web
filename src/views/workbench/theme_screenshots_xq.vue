<template>
    <div>
         <div>
            <div class="top_name">
                <span class="top_txt">官方物料投放库&nbsp;/&nbsp;截图物料审核</span>
                <span class="top_txt">截图物料审核&nbsp;/</span>
                <span class="top_txt">物料审核详情</span>
                <div class="title_left">
                    <span>物料审核详情</span>
                </div>
            </div>
        </div>
        <div class='content'>
                <div style="margin:0 24px">
                    <span class='titleName'>最终效果图</span>
                    <span class='addBtn'>提交物料</span>
                </div>
                <div class='border_box'>
                    <div>
                        <div class='boxs'>
                            <div>
                                <img src="" alt="">
                            </div>
                            <span style="display:block;margin-bottom:10px">大图</span>
                            <span>尺寸:</span>
                        </div>
                        <div class='boxs'>
                            <div>
                                <img src="" alt="">
                            </div>
                            <span style="display:block;margin-bottom:10px">小图</span>
                            <span>尺寸:</span>
                        </div>
                        <div class='boxs' :style="previewStyle2">
                            <div :style="previews.div" class="preview">
                                <img :src="previews.url" :style="previews.img" alt="">
                            </div>
                            <span style="display:block;margin-bottom:10px">组图1</span>
                            <span>尺寸:</span>
                        </div>
                        <div class='boxs'>
                            <div>
                                <img src="" alt="">
                            </div>
                            <span style="display:block;margin-bottom:10px">组图2</span>
                            <span>尺寸:</span>
                        </div>
                        <div class='boxs'>
                            <div>
                                <img src="" alt="">
                            </div>
                            <span style="display:block;margin-bottom:10px">组图3</span>
                            <span>尺寸:</span>
                        </div>
                        <div class='set'>
                            <span>小图：</span>
                            <select name="" id="">
                                <option value="">组图1</option>
                                <option value="">组图2</option>
                                <option value="">组图3</option>
                            </select>
                        </div>
                        <div class='int'>
                            <div >
                                <span class="names">标题：</span>
                                <span></span>
                                <input type="text" placeholder="最少6字最多24字" minlength="6" maxlength="24">
                            </div>
                            <div>
                                <span class="names">摘要(选填)：</span>
                                <span></span>
                                <input type="text" placeholder="最少6字最多24字" minlength="6" maxlength="24">
                            </div>
                        </div>
                    </div>
                </div>
                 <hr style="margin:0 24px;color:#ddd">
                <div style="margin:40px 0 0 24px">
                    <div class='titleName'>
                        <span>效果调整</span>
                    </div>
                    

                        <vueCropper style="height: 500px;width:360px;"
                        ref="cropper"
                        :img="option.img"     
                        :outputSize="option.size"    
                        :outputType="option.outputType"   
                        :info="true"	    
                        :canScale="true"    
                        :full="true"	
                        :canMove="false"	
                        :canMoveBox="true"   
                        :fixedBox="true"
                          :autoCropWidth="option.autoCropWidth"
                        :autoCropHeight="option.autoCropHeight"
                        :autoCrop="true"	
                        :original="false"
                        @realTime="realTime"	    
                        ></vueCropper>
                        
                        <button @click='qd()'>确定</button>
                </div>
        </div>
    </div>
</template>

<script>
export default {
            data(){
                return{
                    dialogVisible: false,
                    // 裁剪组件的基础配置option
                    option: {
                        img: 'https://oimagea4.ydstatic.com/image?product=adpublish&url=https%3A%2F%2Fimg1.360buyimg.com%2Fpop%2Fjfs%2Ft1%2F96011%2F18%2F15064%2F79434%2F5e6e5c96E63d3e1da%2F4c0c352bf22e5db6.jpg&sc=0&rm=0&w=640&h=960', 
                       size:0.5,
                       outputType:'jpeg',
                       autoCropWidth:360,
                       autoCropHeight:180,

                    },
                    picsList: [],  //页面显示的数组
                    // 防止重复提交
                    loading: false,
                    previewStyle2:{},
                    previews:{},
                }
            },
            methods:{
                realTime(data){
                   this.previews = data;				
                    this.previewStyle2 = {
                        width: this.previews.w + "px",
                        height: this.previews.h + "px",
                        overflow: "hidden",
                        margin: "0",
                        // zoom: 220 / this.previews.w
                        zoom: 100 / this.previews.h
                    };
                    console.log(this.previews);
                    console.log(this.previewStyle2);
                },
                 qd(){
                    this.$refs.cropper.getCropBlob((data) => {
                        console.log(data)
                        let files = new window.File([data], this.file.name, {type: data.type})
                        console.log(this.file)
                        Upload(files, this.file.name, (res) => {
                            let url = `http://pv4kob423.bkt.clouddn.com/${res.key}`
                            console.log(res)
                            that.update(url) // 拿到url后去修改用户头像
                        })
                    })
                 },
            },
}
</script>

<style scoped>
     .top_name{height: 112px}
      .top_txt,.title_left span{
        margin-left: 24px;
    }
     .content{
        margin-top: 200px;
        padding: 40px 0 ;
    }
    .titleName{
        display: inline-block;
        font-size: 16px;
        color:#000;
        font-weight: bold;
    }
    .addBtn{
        float: right;
         display: inline-block;
        text-align: center;
        cursor: pointer;
        width: 120px;
        height: 36px;
        line-height: 40px;
        border-radius: 3px;
        color: #fff;
        background: #3377ff;
        font-size: 14px;
        margin-right: 24px
    }
    .border_box{
        text-align: center;
        margin:30px 0 ;
    }
    .boxs{
        display: inline-block;
        margin:0 30px 30px 0 ;
    }
    .boxs>div{
        width: 155px;
        height: 220px;
        border:1px solid #ddd;
        margin-bottom: 10px;
        vertical-align: top;
        position: relative;
        overflow: "hidden",
    }
    .boxs>span{
        font-size: 14px;
    }
    /* .boxs>div>img{
        max-height:220px;
        max-width: 155px;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%) 
    } */
    .set,.int{
        text-align: left!important;
        margin-bottom:30px
    }
    .set>span{
        font-size: 14px;
        margin:0  15px 0 23%;
         display: inline-block;
        width:90px;
        text-align: right

    }
    .int>div{
        margin-bottom:15px 
    }
    .names{
        display: inline-block;
        width:90px;
        margin: 0 15px 15px 23%;
        font-size: 14px;
        color: #000;
        text-align: right
    }
    select{
        width: 200px;
        height: 36px;
    }
    input{
        min-width:500px;
        padding-left: 10px;
        height: 36px;
    }
    .pre-item {
	padding-right: 20px;
}
</style>