import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/passwordUpadte',
                    component: () => import('../components/page/PasswordUpadte.vue'),
                    meta: {title: '密码修改'}
                },
                {
                    path: '/moneyPassword',
                    component: () => import('../components/page/MoneyPassword.vue')
                },
                {
                    path: '/shejiao',
                    component: () => import('../components/page/shejiao.vue')
                },
                {
                    path: '/licai',
                    component: () => import('../components/page/licai.vue')
                },
                {
                    path: '/yule',
                    component: () => import('../components/page/yule.vue')
                },
                {
                    path: '/infoUpdate',
                    component: () => import('../components/page/InfoUpdate.vue'),
                    meta: {title: '个人信息修改'}
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '联系我们' }
                },
                {
                    path: '/assetManagentMsg',
                    component: () => import('../components/page/assetManagentMsg'),
                    meta: {title: '资产登记记录管理'}
                }
            ]
        },

        {
            path: '*',
            redirect: '/404'
        }
    ]
});
