<template>
    <div class="centNavBox">
        <div class="center">
            <div class="message">
                <span>初始密码</span>
                <input type="password" v-if="show_1"/> <input type="text" v-if="show"/>
                <i @click="heid">hs</i>
            </div>
            <div class="message">
                <span>新密码</span>
                <input type="password" v-if="show_1"/><input type="text" v-if="show"/>
            </div>
            <div class="message">
                <span>确认信密码</span>
                <input type="password" v-if="show_1"/><input type="text" v-if="show"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "password",
        data(){
            return{
                show:false,
                show_1:true,
            }
        },
        methods:{
            heid(){
                this.show = !(this.show);
                this.show_1 = !(this.show_1)
            }
        }
    }
</script>

<style scoped>

</style>