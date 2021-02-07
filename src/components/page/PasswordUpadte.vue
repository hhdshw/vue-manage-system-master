<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 个人信息管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>密码修改</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="旧密码">
                        <el-input v-model="form.oldPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input v-model="form.newPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="重复新密码">
                        <el-input v-model="form.newPasswordCheck"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'passwordUpadte',
    data() {
        return {
            form: {
                oldPassword: null,
                newPassword: null,
                newPasswordCheck: null,
            }
        };
    },
    methods: {
        onSubmit() {
            const _this = this
            if (_this.form.oldPassword == null || _this.form.oldPassword.length == ''
            || _this.form.newPassword == null || _this.form.newPassword == ''
            || _this.form.newPasswordCheck == null || _this.form.newPasswordCheck == ''){
                _this.$message.error('请完善数据!');
                return;
            }
            if (!_this.form.newPassword == _this.form.newPasswordCheck){
                _this.$message.error('两次输入新密码不一致！');
                return;
            }
            if(_this.form.oldPassword == _this.form.newPassword){
                _this.$message.error('新旧密码不可一致！');
                return;
            }
            axios.post('userInfo/updatePassword/'+localStorage.getItem('ms_username')+ '/' +_this.form.oldPassword+'/'+_this.form.newPassword)
                .then(function (res) {
                    if (res.data.code == 200){
                        _this.$message.success(res.data.msg);
                        //修改成功，退出
                        axios.post('login/userLoginout/'+localStorage.getItem('ms_username')).then(function (res) {
                            //不做什么
                        })
                        localStorage.removeItem('ms_username');
                        _this.$router.push('/login');
                    } else {
                        _this.$message.error(res.data.msg);
                    }
                })

        }
    }
};
</script>