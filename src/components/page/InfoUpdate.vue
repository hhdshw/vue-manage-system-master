<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 个人信息管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>个人信息修改</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="userInfo" label-width="120px">
                    <el-form-item label="身份证号">
                        <el-input v-model="userInfo.userId" v-bind:disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="userInfo.userName" v-bind:disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input v-model="userInfo.userAge" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="userInfo.userSex" placeholder="请选择">
                            <el-option key="bbk" label="男" value="0"></el-option>
                            <el-option key="xtc" label="女" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="出生日期">
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="userInfo.userBirthday"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="userInfo.userPhone" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="籍贯">
                        <el-input v-model="userInfo.userNatpl"></el-input>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="userInfo.userAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="userInfo.userEmail" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="紧急联系人">
                        <el-input v-model="userInfo.emgContact" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人邮箱">
                        <el-input v-model="userInfo.emgCtemail" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="个人附件" style="width: 1000px">
                        <quill-editor ref="myTextEditor" v-model="userInfo.accessory" ></quill-editor>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">修改</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
export default {
    name: 'infoUpdate',
    components: {
        quillEditor
    },
    data() {
        return {
            userInfo: {
                userId: '',
                userName: '',
                userAge: 0,
                userBirthday: '',
                userSex: '',
                userPhone: '',
                userNatpl: '',
                userAddress: '',
                userEmail: '',
                emgContact: '',
                emgCtemail: '',
                accessory: ''
            }
        };
    },
    methods: {
        onSubmit() {
            const _this = this
            //年龄
            var r = /^\+?[1-9][0-9]*$/;　　//正整数
            if (!r.test(_this.userInfo.userAge)){
                _this.$message.error("年龄格式错误!");
                return;
            }
            //电话
            var x = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!x.test(_this.userInfo.userPhone)){
                _this.$message.error("电话格式错误");
                return;
            }
            //邮箱
            var z = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            //联系人邮箱
            if(!z.test(_this.userInfo.userEmail) || !z.test(_this.userInfo.emgCtemail)){
                _this.$message.error("邮箱格式错误！");
                return;
            }
            axios.post('userInfo/updateOne', _this.userInfo).then(function (res) {
                if(res.data.code == 200){
                    _this.$message.success(res.data.msg);
                } else {
                    _this.$message.error(res.data.msg);
                }
            })
        }
    },
    created(){
        const _this = this
        axios.get('userInfo/findOne/'+localStorage.getItem('ms_username')).then(function (res) {
            console.log(res.data);
            _this.userInfo = res.data;
        })
    }
};
</script>