<template>
    <div>
        <v-breadcrumb :nav="['会员管理','经销商会员管理','会员详情']"></v-breadcrumb>
        <div class="container">
            <div class="basic-inf-area line">
                <div class="left">
                    <div class="title">
                        <h3>基础信息</h3>
                    </div>
                    <div class="item-row">
                        <div class="item">用户ID：{{dealer.id}}({{dealer.code}})</div>
                        <div class="item">微信openid：{{dealer.openid}}</div>
                    </div>
                    <div class="item-row">
                        <div class="item">昵称：{{dealer.nickname}}</div>
                        <div class="item">身份证号：{{dealer.idcard}}</div>
                    </div>
                    <div class="item-row">
                        <div class="item">手机号：{{dealer.phone}}</div>
                        <div class="item">系统版本：{{dealer.system_version}}</div>
                    </div>
                    <div class="item-row">
                        <div class="item">姓名：{{dealer.realname}}</div>
                        <div class="item">微信版权获取区域：{{dealer.wechat_area}}</div>
                    </div>
                    <div class="item-row">
                        <div class="item">微信号：{{dealer.wecaht_id}}</div>
                        <div class="item">最近登录时间：{{dealer.last_login_time|formatDate}}</div>
                    </div>
                    <div class="item-row">
                        <div class="item">注册时间：{{dealer.reg_time|formatDate}}</div>
                        <div class="item">本日登录：{{dealer.day_count}}</div>
                    </div>
                    <div class="item-row">
                        <div class="item">手机型号：{{dealer.device}}</div>
                        <div class="item">本月登录：{{dealer.month_count}}</div>
                    </div>
                    <div class="item-row">
                        <div class="item">微信版本：{{dealer.wecaht_version}}</div>
                        <div class="item">共登录次数：{{dealer.all_count}}</div>
                    </div>
                    <div class="item-row">
                        <div class="item">地址信息 ：{{dealer.addrPreFix}}{{dealer.address}}</div>
                    </div>
                </div>
                <div class="center">
                    <el-button v-if="p.updateDealerById" @click="updateBasicInf">修改</el-button>
                </div>
                <div class="right">
                    <div>
                        <img class="img" v-if="dealer.head_img" :src="dealer.head_img" alt="">
                        <img class="img" v-else src="../../../../assets/images/logo.png" alt="">
                    </div>
                    <div>
                        <el-button type="primary" @click="toLowerAgent">下级代理({{dealer.sub_level_num}})</el-button>
                    </div>
                    <div>
                        <el-button type="primary" @click="toMemberTree" style="margin-left: 0">查看会员树状图</el-button>
                    </div>
                    <!--<el-button type="primary" style="margin-left: 0">用户操作日志</el-button>-->
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="author-inf-area">
                <div class="left">
                    <div class="title">
                        <h3>授权信息</h3>
                    </div>
                    <div class="item-row">
                        <div class="item">上级代理：{{permit.realname}}({{permit.code}})</div>
                        <div class="item">经销商类型：
                            <span v-if="permit.d_type==1">网信经销商</span>
                            <span v-if="permit.d_type==2">供货经销商</span>
                            <span v-if="permit.d_type==3">网红经销商</span>
                        </div>
                        <div class="item-row">
                            <div class="item">授权码：{{permit.code}}</div>
                            <div class="item">授权层级：{{permit.levelName}}级</div>
                        </div>
                    </div>
                </div>
                <div class="center">
                    <el-button v-if="p.updateDealerPermitById" @click="updateAuthorInf">修改</el-button>
                </div>
                <div class="clearfix"></div>
            </div>
            <!--<div class="promote-inf-area line">
                <div class="left">
                    <div class="title">
                        <h3>晋升记录</h3>
                    </div>
                    <div class="item-row">
                        <div class="item">
                            <span>实习省代&#45;&#45;省级代理</span>
                            <span style="margin-left: 20px">2018-05-12 12:32:31</span>
                        </div>
                    </div>
                    <div class="item-row">
                        <div class="item">
                            <span>实习省代&#45;&#45;省级代理</span>
                            <span style="margin-left: 20px">2018-05-12 12:32:31</span>
                        </div>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>-->
            <!--<div class="others-inf-area line">
                <div class="left">
                    <div class="title">
                        <h3>其他信息</h3>
                    </div>
                    <div class="item-row">
                        <div class="item-row">
                            <div class="item">获得荣誉：<span class="color-blue">{{detail.ID}}</span></div>
                        </div>
                        <div class="item-row">
                            <div class="item">消费金额：<span class="color-red">{{detail.ID}}</span>/元</div>
                            <div class="item">经验值积分：{{detail.ID}}</div>
                        </div>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>-->
            <!--<div class="user-tag-area">-->
                <!--<div class="title">-->
                    <!--<h3>用户标签</h3>-->
                <!--</div>-->
                <!--<div class="tags-area">-->
                    <!--<el-tag-->
                            <!--:key="tag"-->
                            <!--v-for="tag in dynamicTags"-->
                            <!--closable-->
                            <!--color="#fff"-->
                            <!--:disable-transitions="false"-->
                            <!--@close="handleClose(tag)">-->
                        <!--{{tag}}-->
                    <!--</el-tag>-->
                    <!--<div style="margin-top: 20px">-->
                        <!--<el-input-->
                                <!--class="input-new-tag"-->
                                <!--v-if="inputVisible"-->
                                <!--v-model="inputValue"-->
                                <!--ref="saveTagInput"-->
                                <!--@keyup.enter.native="handleInputConfirm"-->
                                <!--@blur="handleInputConfirm"-->
                                <!--placeholder="请输入标签文字"-->
                        <!--</el-input>-->
                        <!--<el-button type="primary" class="button-new-tag" @click="showInput">添加标签</el-button>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <div style="margin:50px">
                <el-button type="primary" @click="backToList">返回列表</el-button>
            </div>
        </div>

        <!--基础信息修改弹窗-->
        <edit-basic  @msg='basicToast' :dealer='dealer' :id="id" v-if="isShowEditBasic"></edit-basic>
        <!--授权信息修改弹窗-->
        <edit-author @msg='authorToast' :permit='permit' :id="id" v-if="isShowEditAuthor"></edit-author>
    </div>
</template>

<script>
    import vBreadcrumb from '../../../common/Breadcrumb.vue';
    import editBasic from './editBasicInf'
    import editAuthor from './editAuthorInf'
    import icon from '../../../common/ico.vue';
    import * as api from '../../../../api/api';
    import utils from '../../../../utils/index.js'
    import * as pApi from '../../../../privilegeList/index.js';

    export default {
        components: {
            icon, vBreadcrumb, editBasic, editAuthor
        },
        data: function () {
            return {
                // 权限控制
                p:{
                    updateDealerById:false,
                    updateDealerPermitById:false,
                },

                dealer: {},
                permit: {},
                dynamicTags: ['标签一', '标签二', '标签三'],
                inputVisible: false,
                inputValue: '',
                isShowEditBasic: false,
                isShowEditAuthor: false,
                formLabelWidth: '100px',
                id:'',
                loading:false
            }
        },
        activated() {
            this.id =
                this.$route.query.id ||
                JSON.parse(sessionStorage.getItem("memberDetail").id);
            this.getDetail();
            this.pControl();
        },
        methods: {
            // 权限控制
            pControl() {
                for (const k in this.p) {
                    this.p[k] = utils.pc(pApi[k]);
                }
            },
            basicToast(msg) {
                let that=this;
                that.isShowEditBasic = msg;
                setTimeout(function () {
                    that.getDetail()
                },1000)
            },
            authorToast(msg) {
                let that=this;
                that.isShowEditAuthor = msg;
                setTimeout(function () {
                    that.getDetail()
                },1000)
            },
            //获取详情
            getDetail() {
                let that = this;
                let data = {
                    id: that.id,
                    url:pApi.findDealerById
                };
                that.loading=true;
                that.$axios
                    .post(api.findDealerById, data)
                    .then(res => {
                        if (res.data.code == 200) {
                            that.loading = false;
                            that.dealer = res.data.data.dealer;
                            that.permit = res.data.data.permit;
                        } else {
                            that.$message.warning(res.data.msg);
                            that.loading = false;
                        }
                    })
                    .catch(err => {
                        that.loading = false;
                        console.log(err)
                    })
            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            //返回列表
            backToList() {
                this.$router.push('/memberManage')
            },
            //跳到下级代理页面
            toLowerAgent() {
                let that=this;
                sessionStorage.setItem('memberId',that.id);
                that.$router.push({path: '/lowerMemberManage'})
            },
            //跳到会员树状图页面
            toMemberTree() {
                let that=this;
                sessionStorage.setItem('memberId',that.id);
                this.$router.push({path: '/memberTree', query: {'memberId':that.id}})
            },
            //修改基础信息
            updateBasicInf() {
                this.isShowEditBasic = true;
            },
            //修改授权信息
            updateAuthorInf() {
                this.isShowEditAuthor = true;
            },

        }
    }
</script>
<style scoped>
    .container {
        font-size: 14px;
        color: #606266;
        height: auto;
        margin-bottom: 20px;
        padding: 30px 0 30px 80px;
    }

    .left {
        float: left;
        width: 70%;
        height: auto
    }

    .center {
        float: left;
        width: 10%;
        height: auto
    }

    .right {
        float: right;
        width: 20%;
        height: auto;
        text-align: center;
    }

    .title {
        margin-bottom: 10px
    }

    .tags-area {
        margin-top: 10px
    }

    .line {
        border-bottom: 1px solid #e2e2e2;
        margin-bottom: 20px;
    }

    .clearfix {
        clear: both
    }

    .item-row {
        height: 40px;
        line-height: 40px;
    }

    .item {
        width: 50%;
        float: left
    }

    .color-blue {
        color: #20a0ff
    }

    .color-red {
        color: #ff1e30;
        font-size: 20px
    }

    .img {
        width: 100px;
        height: 100px;
        border-radius: 10px;
        border: 2px solid #dfdfdf;
    }

    .right .el-button {
        width: 160px;
        height: 40px;
        margin-top: 10px
    }

    .el-tag {
        height: 32px;
        line-height: 32px;
        margin-right: 10px
    }

    .input-new-tag {
        width: 200px
    }

</style>