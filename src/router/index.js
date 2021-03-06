import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    name:'dashboard',
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页',url:'/dashboard' }
                },
                // 授权管理
                {
                    name:'channelItemManage',
                    path: '/channelItemManage',
                    component: resolve => require(['../components/page/Authorization/ChannelItemManage.vue'], resolve),
                    meta: { title: '渠道类目管理',url:'/channelItemManage' }
                },
                {
                    name:'secondChannel',
                    path: '/secondChannel',
                    component: resolve => require(['../components/page/Authorization/SecondChannel.vue'], resolve),
                    meta: { title: '二级渠道',url:'/admin/permitChannel/addPermitChannel_2' }
                },
                {
                    name:'certificateUse',
                    path: '/certificateUse',
                    component: resolve => require(['../components/page/Authorization/CertificateUse.vue'], resolve),
                    meta: { title: '授权证书模板',url:'/certificateUse' }
                },
                {
                    name:'contractReview',
                    path: '/contractReview',
                    component: resolve => require(['../components/page/Authorization/ContractReview.vue'], resolve),
                    meta: { title: '续约审核',url:'/contractReview' }
                },
                // 品牌产品管理
                {
                    name:'brandProductClassify',
                    path: '/brandProductClassify',
                    component: resolve => require(['../components/page/BrandProduct/BrandProductClassify.vue'], resolve),
                    meta: { title: '产品分类管理',url:'/admin/productCategory/queryProductCategoryPageList_1' }
                },
                {
                    name:'secondClassify',
                    path: '/secondClassify',
                    component: resolve => require(['../components/page/BrandProduct/SecondClassify.vue'], resolve),
                    meta: { title: '二级类目',url:'/admin/productCategory/queryProductCategoryPageList_2' }
                },
                {
                    name:'brandManage',
                    path: '/brandManage',
                    component: resolve => require(['../components/page/BrandProduct/BrandManage.vue'], resolve),
                    meta: { title: '品牌管理',url:'/admin/brand/queryBrandPageList' }
                },
                {
                    name:'addBrand',
                    path: '/addBrand',
                    component: resolve => require(['../components/page/BrandProduct/BrandManage/AddBrand.vue'], resolve),
                    meta: { title: '添加品牌',url:'/admin/brand/addBrand' }
                },
                {
                    name:'editBrand',
                    path: '/editBrand',
                    component: resolve => require(['../components/page/BrandProduct/BrandManage/EditBrand.vue'], resolve),
                    meta: { title: '编辑品牌',url:'/admin/brand/updateBrand' }
                },
                // 会员管理
                {
                    name:'levelManage',
                    path: '/levelManage',
                    component: resolve => require(['../components/page/MemberManage/LevelManage.vue'], resolve),
                    meta: { title: '经销商层级管理',url:'/admin/dealerLevel/getList' }
                },
                {
                    name:'joinManage',
                    path: '/joinManage',
                    component: resolve => require(['../components/page/MemberManage/JoinManage.vue'], resolve),
                    meta: { title: '经销商加盟管理',url:'/admin/invite/queryInvitePageList' }
                },
                {
                    name:'memberManage',
                    path: '/memberManage',
                    component: resolve => require(['../components/page/MemberManage/MemberManage.vue'], resolve),
                    meta: { title: '经销商会员管理',url:'/admin/dealer/queryDealerPageList' }
                },
                {
                    name:'lowerMemberManage',
                    path: '/lowerMemberManage',
                    component: resolve => require(['../components/page/MemberManage/MemberManage/LowerMemberManage.vue'], resolve),
                    meta: { title: '下级代理',url:'/admin/dealer/queryDealerPageList' }
                },
                {
                    name:'memberDetail',
                    path: '/memberDetail',
                    component: resolve => require(['../components/page/MemberManage/MemberManage/MemberDetail.vue'], resolve),
                    meta: { title: '会员详情',url:'/admin/dealer/findDealerById' }
                },
                {
                    name:'memberTree',
                    path: '/memberTree',
                    component: resolve => require(['../components/page/MemberManage/MemberManage/MemberTree.vue'], resolve),
                    meta: { title: '会员树状图',url:'/admin/dealer/findDealerTreeById' }
                },
                {
                    name:'sendInvite',
                    path: '/sendInvite',
                    component: resolve => require(['../components/page/MemberManage/JoinManage/SendInvite.vue'], resolve),
                    meta: { title: '邀请发起',url:'/admin/invite/addInvite' }
                },
                {
                    name:'inviteDetail',
                    path: '/inviteDetail',
                    component: resolve => require(['../components/page/MemberManage/JoinManage/InviteDetail.vue'], resolve),
                    meta: { title: '邀请详情',url:'/admin/invite/findInviteInfo' }
                },
                {
                    name:'inviteLink',
                    path: '/inviteLink',
                    component: resolve => require(['../components/page/MemberManage/JoinManage/InviteLink.vue'], resolve),
                    meta: { title: '邀请链接' }
                },
                //服务管理
                {
                    name:'noticeInformManage',
                    path: '/noticeInformManage',
                    component: resolve => require(['../components/page/ServiceManage/NoticeInformManage.vue'], resolve),
                    meta: { title: '公告通知管理',url:'/admin/notice/queryNoticeList' }
                },
                {
                    name:'addNoticeInform',
                    path: '/addNoticeInform',
                    component: resolve => require(['../components/page/ServiceManage/NoticeInformManage/AddNoticeInform.vue'], resolve),
                    meta: { title: '发布通知/公告',url:'/admin/notice/addNotice' }
                },
                {
                    name:'noticeInformDetail',
                    path: '/noticeInformDetail',
                    component: resolve => require(['../components/page/ServiceManage/NoticeInformManage/NoticeInformDetail.vue'], resolve),
                    meta: { title: '通知/公告详情',url:'/admin/notice/findNoticeDetailById' }
                },
                {
                    name:'feedBack',
                    path: '/feedBack',
                    component: resolve => require(['../components/page/ServiceManage/FeedBack.vue'], resolve),
                    meta: { title: '问题反馈',url:'/admin/feedback/queryFeedbackList' }
                },
                {
                    name:'feedDetail',
                    path: '/feedDetail',
                    component: resolve => require(['../components/page/ServiceManage/FeedBack/FeedbackDetail.vue'], resolve),
                    meta: { title: '问题详情',url:'/admin/feedback/findFeedbackByid' }
                },
                // 溯源管理
                {
                    name:'rootsCodeMange',
                    path: '/rootsCodeMange',
                    component: resolve => require(['../components/page/RootsMange/RootsCodeMange.vue'], resolve),
                    meta: { title: '溯源防伪码管理',url:'/securityCode/securityCodeRecord/getRecordPage' }
                },
                {
                    name:'rootsCodeQuery',
                    path: '/rootsCodeQuery',
                    component: resolve => require(['../components/page/RootsMange/RootsCodeQuery.vue'], resolve),
                    meta: { title: '防伪码查询' }
                },
                {
                    name:'rootsCodeTpl',
                    path: '/rootsCodeTpl',
                    component: resolve => require(['../components/page/RootsMange/RootsCodeTpl.vue'], resolve),
                    meta: { title: '防伪码模板',url:'/admin/securityCodeTemplate/getAll' }
                },
                {
                    name:'rootsCodeParams',
                    path: '/rootsCodeParams',
                    component: resolve => require(['../components/page/RootsMange/RootsCodeParams.vue'], resolve),
                    meta: { title: '防伪码参数设置',url:'/admin/categoryBrand/getAllCategoryBrand'}
                },
                // 权限管理
                {
                    name:'manageList',
                    path: '/manageList',
                    component: resolve => require(['../components/page/Permission/ManageList.vue'], resolve),
                    meta: { title: '账号管理',url:'/manageList' }
                },
                {
                    name:'addManger',
                    path: '/addManger',
                    component: resolve => require(['../components/page/Permission/AddManger.vue'], resolve),
                    meta: { title: '添加管理员',url:'/admin/adminUser/addAdminUser' }
                },
                {
                    name:'editManger',
                    path: '/editManger',
                    component: resolve => require(['../components/page/Permission/EditManger.vue'], resolve),
                    meta: { title: '编辑管理员',url:'/admin/adminUser/updateAdminUser' }
                },
                {
                    name:'showMangeLog',
                    path: '/showMangeLog',
                    component: resolve => require(['../components/page/Permission/ShowMangeLog.vue'], resolve),
                    meta: { title: '操作日志',url:'/admin/logAdminuser/getPage' }
                },
                {
                    name:'jobsPermissionMange',
                    path: '/jobsPermissionMange',
                    component: resolve => require(['../components/page/Permission/JobsPermissionMange.vue'], resolve),
                    meta: { title: '岗位权限管理',url:'/jobsPermissionMange' }
                },
                {
                    name:'addJobsPermission',
                    path: '/addJobsPermission',
                    component: resolve => require(['../components/page/Permission/AddJobsPermission.vue'], resolve),
                    meta: { title: '添加岗位权限',url:'/admin/role/addRole' }
                },
                {
                    name:'editJobsPermission',
                    path: '/editJobsPermission',
                    component: resolve => require(['../components/page/Permission/EditJobsPermission.vue'], resolve),
                    meta: { title: '编辑岗位权限',url:'/admin/role/updateRole' }
                },
                {
                    name:'setPermission',
                    path: '/setPermission',
                    component: resolve => require(['../components/page/Permission/SetPermission.vue'], resolve),
                    meta: { title: '权限设置',url:'/setPermission' }
                },
                {
                    name:'editMangerMsg',
                    path: '/editMangerMsg',
                    component: resolve => require(['../components/page/Permission/EditMangerMsg.vue'], resolve),
                    meta: { title: '管理员基础信息修改',url:'/editMangerMsg' }
                },
            ]
        },
        {
            name:'login',
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        },
        {
            name:'404',
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
    ]
})
