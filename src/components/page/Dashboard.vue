<template>
<!-- 系统首页   -->
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        当前系统时间：
                        <span>{{nowDate}}</span>
                    </div>

                </el-card>
                <el-card shadow="hover" style="height:260px;">
                    <div slot="header" class="clearfix">
                        <span>资产详情</span>
                    </div>
                    社交账户登记{{propertyInfoDesc[1][0]}}个
                    <el-progress :percentage="propertyInfoDesc[1][1]" color="#42b983" style="width: 300px"></el-progress>
                    理财账户登记{{propertyInfoDesc[2][0]}}个
                    <el-progress :percentage="propertyInfoDesc[2][1]" style="width: 300px"></el-progress>
                    娱乐账户登记{{propertyInfoDesc[3][0]}}个
                    <el-progress :percentage="propertyInfoDesc[3][1]" color="#f56c6c" style="width: 300px"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16" style="margin-bottom: 10px">
                <el-card shadow="hover" style="height:300px;">
                    <div slot="header" class="clearfix">
                        <span>新闻通知</span>
<!--                        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>-->
                    </div>
                    <el-table :show-header="false" :data="newsInfoList" style="width:100%;">
                        <el-table-column>
                            <template slot-scope="scope" >
                                <label @click="goTo(scope.row.url)"
                                    class="todo-item" style="color: #1f2f3d"
                                >{{scope.row.title}}</label>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover" style="height:300px;">
                    <div slot="header" class="clearfix">
                        <span>法律法规</span>
                        <!--                        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>-->
                    </div>
                    <el-table :show-header="false" :data="ruleInfoList" style="width:100%;">
                        <el-table-column>
                            <template slot-scope="scope" >
                                <label @click="goTo(scope.row.url)"
                                       class="todo-item" style="color: #1f2f3d"
                                >{{scope.row.title}}</label>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover" style="height:300px;">
                    <div slot="header" class="clearfix">
                        <span>相关政策</span>
                        <!--                        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>-->
                    </div>
                    <el-table :show-header="false" :data="policyInfoList" style="width:100%;">
                        <el-table-column>
                            <template slot-scope="scope" >
                                <label @click="goTo(scope.row.url)"
                                       class="todo-item" style="color: #1f2f3d"
                                >{{scope.row.title}}</label>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
export default {
    name: 'dashboard',
    data() {
        return {
            name: localStorage.getItem('ms_username'),
            newsInfoList: [],
            policyInfoList: [],
            ruleInfoList: [],
            nowDate: '',
            ip: '',
            propertyInfoDesc: []
        };
    },
    components: {
        // Schart
    },
    computed: {
        role() {
            return '普通用户';
        }
    },
    created() {
        // this.handleListener();
        // this.changeDate();
        this.findNewsInfoList();//找新闻
        this.findPolicyInfoList();//找政策
        this.findRuleInfoList();//找法律
        this.findPropertyInfoDesc();//找图表数据
    },
    methods: {
        findPropertyInfoDesc(){
          const _this = this
          axios.get('propertyInfo/findPropertyInfoChat/'+localStorage.getItem('ms_username')).then(function (res) {
              console.log(res.data)
              _this.propertyInfoDesc = res.data
          })
        },
        currentTime() {
            setInterval(this.formatDate, 500);
        },
        formatDate() {
            let date = new Date();
            let year = date.getFullYear(); // 年
            let month = date.getMonth() + 1; // 月
            let day = date.getDate(); // 日
            let week = date.getDay(); // 星期
            let weekArr = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ];
            let hour = date.getHours(); // 时
            hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
            let minute = date.getMinutes(); // 分
            minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
            let second = date.getSeconds(); // 秒
            second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
            this.nowDate = `${year}/${month}/${day} ${hour}:${minute}:${second} ${weekArr[week]}`;
        },
        //跳转
        goTo(url){
            console.log(url);
            window.open(url,"_blank");
        },
        //新闻
        findNewsInfoList(){
            const _this = this
            axios.get('newsInfo/findFirstPage').then(function (res) {
                _this.newsInfoList = res.data.content;
            })
        },
        //政策
        findPolicyInfoList(){
            const _this = this
            axios.get('policyInfo/findFirstPage').then(function (res) {
                _this.policyInfoList = res.data.content;
            })
        },
        //法律
        findRuleInfoList(){
            const _this = this
            axios.get('ruleInfo/findFirstPage').then(function (res) {
                _this.ruleInfoList = res.data.content;
            })
        },
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        },

    },
    mounted() {
        const _this = this
        this.currentTime();
    },
    // 销毁定时器
    beforeDestroy() {
        if (this.formatDate) {
            clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
        }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
