<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 资产分类管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    社交账户管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
<!--                <el-button-->
<!--                    type="primary"-->
<!--                    icon="el-icon-delete"-->
<!--                    class="handle-del mr10"-->
<!--                    @click="delAllSelection"-->
<!--                >批量删除</el-button>-->
                <el-select v-model="propertyInfo.propertytypeId" placeholder="分类" class="handle-select mr10">
                    <el-option key="0" label="请选择" value=""></el-option>
                    <el-option key="1" label="社交账户" value="1"></el-option>
                    <el-option key="2" label="理财账户" value="2"></el-option>
                    <el-option key="3" label="娱乐账户" value="3"></el-option>
                </el-select>
                <el-select v-model="propertyInfo.typeDescId" placeholder="分类" class="handle-select mr10">
                    <el-option key="0" label="请选择" value=""></el-option>
                    <el-option v-for="(item, i) in typeDesc" :label="item.propertyTypename"
                    :value="item.id"></el-option>
                </el-select>
                <el-input v-model="propertyInfo.propertyId" placeholder="资产账号" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="" icon="el-icon-search" @click="handleEdit({})" style="float: right">添加</el-button>
            </div>

            <el-table
                :data="propertyInfoList"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
<!--                <el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
<!--                <el-table-column prop="name" label="用户名"></el-table-column>-->
                <el-table-column label="资产账号" width="120">
                    <template slot-scope="scope">{{scope.row.propertyId}}</template>
                </el-table-column>
                <el-table-column label="资产类别编号">
                    <template slot-scope="scope">
                        {{scope.row.propertytypeId == '1'?'社交账户':''}}
                        {{scope.row.propertytypeId == '2'?'理财账户':''}}
                        {{scope.row.propertytypeId == '3'?'娱乐账户':''}}
                    </template>
                </el-table-column>
                <el-table-column label="平台">

                    <template slot-scope="scope">
                        {{scope.row.desc}}
                    </template>
                </el-table-column>
                <el-select v-model="propertyInfo.propertytypeId" placeholder="分类" class="handle-select mr10">
                    <el-option key="0" label="请选择" value=""></el-option>
                    <el-option key="1" label="社交账户" value="1"></el-option>
                    <el-option key="2" label="理财账户" value="2"></el-option>
                    <el-option key="3" label="娱乐账户" value="3"></el-option>
                </el-select>
                <el-select v-model="propertyInfo.typeDescId" placeholder="分类" class="handle-select mr10">
                    <el-option key="0" label="请选择" value=""></el-option>
                    <el-option v-for="(item, i) in typeDesc" :label="item.propertyTypename"
                               :value="item.id"></el-option>
                </el-select>
                <el-table-column label="昵称" width="100">
                    <template slot-scope="scope">{{scope.row.softPetname}}</template>
                </el-table-column>
                <el-table-column label="创建时间">
                    <template slot-scope="scope">{{scope.row.createTime.substring(0,10)}}</template>
                </el-table-column>
                <el-table-column label="托管人邮箱" width="200px">
                    <template slot-scope="scope" >{{scope.row.haeresEmail}}</template>
                </el-table-column>
                <el-table-column label="托管人手机号">
                    <template slot-scope="scope">{{scope.row.haeresPhone}}</template>
                </el-table-column>
                <el-table-column label="托管人姓名">
                    <template slot-scope="scope">{{scope.row.haeresName}}</template>
                </el-table-column>
                <el-table-column label="托管人身份证号" width="200">
                    <template slot-scope="scope">{{scope.row.haeresId}}</template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit( scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.page +1 "
                    :page-size="query.size"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="60%">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="资产账号">
                    <el-input v-model="form.propertyId"></el-input>
                </el-form-item>
                <el-form-item label="资产密码">
                    <el-input v-model="form.propertyPassword"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="form.softPetname"></el-input>
                </el-form-item>
                <el-form-item label="资产类别编号">
                    <el-select v-model="form.propertytypeId" placeholder="分类">
                        <el-option key="0" label="请选择" value=""></el-option>
                        <el-option key="1" label="社交账户" value="1"></el-option>
                        <el-option key="2" label="理财账户" value="2"></el-option>
                        <el-option key="3" label="娱乐账户" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="平台">
                    <el-select v-model="form.typeDescId" placeholder="分类">
                        <el-option key="0" label="请选择" value=""></el-option>
                        <el-option v-for="(item, i) in typeDesc2" :label="item.propertyTypename"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="托管人邮箱">
                    <el-input v-model="form.haeresEmail"></el-input>
                </el-form-item>
                <el-form-item label="托管人手机号">
                    <el-input v-model="form.haeresPhone"></el-input>
                </el-form-item>
                <el-form-item label="托管人姓名">
                    <el-input v-model="form.haeresName"></el-input>
                </el-form-item>
                <el-form-item label="托管人身份证号">
                    <el-input v-model="form.haeresId"></el-input>
                </el-form-item>

                <el-form-item label="资产附件" style="width: 800px">
                    <quill-editor ref="myTextEditor2" v-model="form.accessory"
                    ></quill-editor>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css'
import {quillEditor} from "vue-quill-editor";
export default {
    name: 'shejiao',
    components: {
        quillEditor
    },
    data() {
        return {
            editorOption: {
                placeholder: 'Hello World'
            },
            propertyInfo: {
                propertyId: '',
                propertytypeId: '',
                typeDescId: '',
            },
            propertyInfoList: [],
            query: {
                page: 0,
                size: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,//总数量
            form: {},
            idx: -1,
            id: -1,
            typeDesc:[],
            typeDesc2:[],
            typeList:[],
            typeAllList:[],
        };
    },
    created() {
        this.findAllSelect();
        this.findPage(0,10)
        //添加分类的map
        this.findSelect();
    },
    computed:{
      returnPropertytypeId(){
          return this.propertyInfo.propertytypeId;
      },
      returnFormPropertytypeId(){
          return this.form.propertytypeId;
      }
    },
    watch:{
        returnFormPropertytypeId(newValue, oldValue){
          const _this = this
          _this.form.typeDescId = ''
        if(newValue != oldValue && newValue != null){
            // for (var i = 0; i < )
            if (newValue == '' || newValue == ""){
                _this.typeDesc2 = [];
            } else {
                _this.typeDesc2 = _this.typeList[newValue];
            }
            // console.log(_this.typeDesc);
        }
        },
        returnPropertytypeId(newValue,oldValue){
            const _this = this
            _this.propertyInfo.typeDescId = ''
            if(newValue != oldValue && newValue != null){
                // for (var i = 0; i < )
                if (newValue == '' || newValue == ""){
                    _this.typeDesc = [];
                } else {
                    _this.typeDesc = _this.typeList[newValue];
                }
                // console.log(_this.typeDesc);
            }
        }
    },
    methods: {
        findAllSelect(){
            const _this = this
            axios.get('propertyType/findAll').then(function (res) {
                var list = res.data;
                for (var i = 0; i < list.length; i++){
                    _this.typeAllList[list[i].id] = list[i].propertyTypename
                }
            })
        },
        findSelect(){
          const _this = this
          axios.get('propertyType/findSelect').then(function (res) {
            _this.typeList = res.data;
          });

        },
        //查找
        findPage(page, size){
            const _this = this
            axios.post('propertyInfo/findOnesPage/'+localStorage.getItem('ms_username')
                +'/'+page+'/'+size, _this.propertyInfo).then(function (res) {
                    // console.log(res.data)
                _this.propertyInfoList = res.data.content
                _this.query.size = res.data.size//每页多少个
                _this.pageTotal = res.data.totalElements//总数
                _this.query.page = res.data.number//当前页数

                for (var i = 0; i < _this.propertyInfoList.length; i++){
                    // console.log(_this.typeAllList[_this.propertyInfoList[i].typeDescId]);
                    _this.propertyInfoList[i].desc = _this.typeAllList[_this.propertyInfoList[i].typeDescId];
                }
                console.log(_this.propertyInfoList);
            })
        },
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'page', 0);//改变页码
            this.findPage(this.query.page, this.query.size);
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            const _this = this
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    //删除操作
                    axios.post('propertyInfo/deleteById/'+row.id).then(function (res) {
                        if (res.data.code == 200){
                            _this.$message.success(res.data.msg);
                            _this.findPage(_this.query.page, _this.query.size);
                        } else {
                            _this.$message.error(res.data.msg);
                        }
                    })

                    // this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(row) {
            // this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            const _this = this
            //手机号
            var x = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!x.test(_this.form.haeresPhone)){
                _this.$message.error("手机号格式错误");
                return;
            }
            //邮箱
            var z = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            if(!z.test(_this.form.haeresEmail)){
                _this.$message.error("邮箱格式错误！");
                return;
            }
            //身份证
            var y = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (!y.test(_this.form.haeresId)){
                _this.$message.error("身份证格式错误！");
                return;
            }
            _this.form.userId = localStorage.getItem('ms_username')
            if (_this.form.propertytypeId == null){
                _this.form.propertytypeId = '1'
            }
            axios.post('propertyInfo/typeUpdateOrAdd', _this.form).then(function (res) {
                if (res.data.code == 200){
                    _this.$message.success(res.data.msg);
                    _this.form = {}
                    _this.editVisible = false;
                    _this.findPage(_this.query.page, _this.query.size);
                } else {
                    _this.$message.error(res.data.msg);
                }
            })
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'page', val-1);//改变页码
            this.findPage(this.query.page, this.query.size);
        }
    },
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
