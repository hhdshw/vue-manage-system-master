<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title" style="color: #1f2f3d">数字资产管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="userId">
                    <el-input v-model="param.userId" placeholder="userId">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <div class="login-btn">
                    <el-button  @click="openRegister()">注册</el-button>
                </div>
<!--                <p class="login-tips">Tips : 用户名和密码随便填。</p>-->
            </el-form>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="账号注册" :visible.sync="editVisible" width="40%">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="身份证号">
                    <el-input v-model="form.userId"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="checkPassword"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="register">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            checkPassword: '',
            editVisible: false,
            form: {},
            param: {
                // username: 'admin',
                // password: '123123',
                userId: null,
                password: null,
            },
            rules: {
                userId: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        openRegister(){
            this.editVisible = true;
        },
        register(){
          const _this = this
            //身份证
            var y = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (!y.test(_this.form.userId)){
                _this.$message.error("身份证格式错误！");
                return;
            }
            if(_this.form.password != _this.checkPassword){
                _this.$message.error("两次输入密码不一致！");
                return;
            }
            axios.post('userInfo/register',_this.form).then(function (res) {
                if (res.data.code == 200){
                    _this.$message.success(res.data.msg);
                    _this.form = {}
                    _this.editVisible = false;
                } else {
                    _this.$message.error(res.data.msg);
                }
            })
        },
        submitForm() {
            const _this = this
            this.$refs.login.validate(valid => {
                if (valid) {
                    axios.post('login/userLogin', _this.param).then(function (res) {
                        if (res.data.code == 200){
                            _this.$message.success(res.data.msg);
                            localStorage.setItem('ms_username', _this.param.userId);
                            _this.$router.push('/dashboard');
                        } else {
                            _this.$message.error(res.data.msg);
                        }
                        // console.log(res.data.content[0].url);
                        // _this.$message.success(res.data.content[0].url);
                    });
                    // this.$message.success('登录成功');


                } else {
                    this.$message.error('请输入账号和密码');
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>