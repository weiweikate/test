<template>
    <div class="edit-author-mask">
        <div class="box">
            <div class="mask-title">授权信息编辑</div>
            <div class="mask-content">
                <el-form>
                    <el-form-item label="授权码:" class="special">
                        {{permit.code}}
                    </el-form-item>
                    <el-form-item label="授权层级" class="special">
                        <el-select v-model="permit.level" placeholder="全部层级">
                            <el-option label="全部层级" value=""></el-option>
                            <el-option :label="item.name" :value="item.id" v-for="(item,index) in levelList"
                                       :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="经销商类型" class="special">
                        <el-select v-model="permit.d_type">
                            <el-option label="网信经销商" value="1"></el-option>
                            <el-option label="供货经销商" value="2"></el-option>
                            <el-option label="网红经销商" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上级代理:" class="special">
                        <el-input v-model="permit.up_dealerid" @blur="sureUpdate" size="medium"></el-input>
                        <span class="tip">请输入上级代理</span>
                    </el-form-item>

                </el-form>
            </div>
            <div class="submit-btn">
                <div style="margin-left: -73px;width: 100%">
                    <el-button type="primary" @click="submitForm('form')">确认修改</el-button>
                    <el-button @click="closeToask">取消</el-button>
                </div>
            </div>
        </div>
        <div class="sure-mask" v-if="isUpdateUperMask">
            <div class="smallbox">
                <div class="mask-title">
                    <icon class="ico" ico='icon-jinggao'/>
                    温馨提示
                </div>
                <div class="mask-content">
                    <span class="del-tip">是否确认修改TA的上级代理</span>
                    <div class="del-btn-group">
                        <el-button @click="closeUpdateUperMask(true)" class="del-btn" type="danger">确认修改</el-button>
                        <el-button @click="closeUpdateUperMask(false)">取消</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import icon from "../../../common/ico";
    import * as api from '../../../../api/api'
    import * as pApi from '../../../../privilegeList/index.js';
    export default {
        components: {
            icon
        },
        props: {
            id: {
                require: true
            },
            permit: {
                require: true
            },
        },
        data() {
            return {
                isUpdateUperMask: false,
                levelList: [],//用户层级列表
                num: '',
                oldId: ''
            };
        },
        created() {
            this.getLevelList();
            this.permit.level = this.permit.level_id;
            this.oldId = this.permit.id;
            this.permit.d_type = this.permit.d_type.toString()
        },
        methods: {
            //获取用户层级列表
            getLevelList() {
                let that = this;
                let data = {};
                that.$axios
                    .post(api.getDealerLevelList, data)
                    .then(res => {
                        if (res.data.code == 200) {
                            that.levelList = res.data.data;
                            for (let i in res.data.data) {
                                if (that.permit.level_id == res.data.data[i].id) {
                                    that.num = i;
                                }
                            }
                        } else {
                            that.$message.warning(res.data.msg);
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            //  取消弹窗
            closeToask() {
                this.$emit("msg", false);
            },
            // 提交表单
            submitForm() {
                let that = this;
                that.closeToask();
                let data = {};
                data.id = that.id;
                data.dType = that.permit.d_type;
                data.levelId = that.permit.level;
                data.url=pApi.updateDealerPermitById;
                if (that.oldId != that.permit.up_dealerid) {
                    data.upDealerid = that.permit.up_dealerid;
                }
                that.$axios
                    .post(api.updateDealerPermitById, data)
                    .then(res => {
                        that.btnLoading = false;
                        if (res.data.code == 200) {
                            that.$message.success('修改成功');
                            that.$emit("msg", false);
                        } else {
                            that.$message.warning(res.data.msg);
                            that.$emit("msg", false);
                        }
                    })
                    .catch(err => {
                        that.tableLoading = false;
                        that.$emit("msg", false);
                    });
            },
            sureUpdate() {
                if (this.oldId != this.permit.id) {
                    this.isUpdateUperMask = true
                }
            },
            closeUpdateUperMask(status) {
                this.isUpdateUperMask = false;
                if (!status) {
                    this.permit.id = this.oldId;
                }
            }
        }
    };
</script>
<style lang="less">
    .sure-mask {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
        .smallbox {
            position: relative;
            width: 530px;
            height: 305px;
            background-color: #fff;
            border-radius: 10px;
            overflow: hidden;
            .mask-title {
                width: 100%;
                height: 56px;
                border-bottom: 1px solid #ccc;
                padding-left: 45px;
                box-sizing: border-box;
                text-align: center;
                line-height: 56px;
                color: #ff6868;
                font-weight: 700;
                .ico {
                    position: absolute;
                    top: 16px;
                    left: 228px;
                    color: red;
                    font-size: 20px;
                }
            }
            .mask-content {
                position: relative;
                width: 100%;
                height: 248px;
                overflow: hidden;
                padding: 30px 45px 0 45px;
                box-sizing: border-box;
                .del-tip {
                    position: absolute;
                    top: 30%;
                    left: 49%;
                    transform: translateX(-49%);
                    font-size: 22px;
                }
                .del-btn-group {
                    width: 180px;
                    display: flex;
                    justify-content: space-between;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    bottom: 15%;
                    .del-btn {
                        background-color: #ff6868;
                    }
                }
            }
        }
    }

    .edit-author-mask {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
        .box {
            width: 857px;
            background-color: #fff;
            border-radius: 10px;
            overflow: hidden;
            .mask-title {
                width: 100%;
                height: 56px;
                border-bottom: 1px solid #ccc;
                padding-left: 45px;
                box-sizing: border-box;
                line-height: 56px;
                color: #ff6868;
                font-weight: 700;
            }
            .mask-content {
                position: relative;
                width: 100%;
                overflow-x: hidden;
                overflow-y: auto;
                padding: 10px 45px 0 45px;
                box-sizing: border-box;
                .submit-btn {
                    margin-top: 30px;
                    padding-left: 225px;
                    box-sizing: border-box;
                }
            }
        }
        .el-form-item__label {
            float: none;
            text-align: left
        }
        .special .el-form-item__label {
            float: left;
            width: 100px
        }
        .el-input {
            width: 200px
        }
        .el-input__inner {
            width: 200px
        }
        .tip {
            color: #ff1e30
        }
        .submit-btn {
            width: 100%;
            height: 70px;
            line-height: 70px;
            margin-right: 50px;
            text-align: right;
            border-top: 1px solid #dfdfdf;
        }
        .opr-area {
            float: left;
            width: 150px;
            text-align: center;
            margin-left: -10px;
        }
        .opr-area .el-button {
            margin-top: 30px
        }
        .opr-area .el-button:nth-child(2) {
            margin-left: 0
        }
        .check-area {
            float: left;
            width: 191px;
            font-size: 12px;
            color: #999;
            border: 1px solid #dfdfdf;
            margin-right: 10px;
            border-radius: 5px;
        }
        .clearfix {
            clear: both;
            content: ''
        }
        .title {
            background: #eee;
            height: 28px;
            line-height: 28px;
            text-align: center;
            border-bottom: 1px solid #dfdfdf;
        }
        ul {
            line-height: 25px;
            height: 120px;
            overflow-y: auto;
            overflow-x: hidden
        }
        ul li {
            list-style: none;
            padding-left: 10px;
            cursor: pointer
        }
        ul li.selected {
            background: #409EFF;
            color: #fff
        }
        .time-area {
            float: left;
            width: 30%
        }
        .time-area span {
            color: #999;
            margin: 0 10px 0 -20px;
        }
        .select-area {
            width: 500px;
            max-height: 150px;
            overflow-x: hidden;
            overflow-y: auto;
            border: 1px solid #eee;
            border-radius: 10px;
        }
        .select-area .el-checkbox {
            margin: 0 10px 0
        }
        .select-area .el-checkbox-group {
            font-size: 12px;
            line-height: 10px
        }
        .el-tabs__content {
            display: none
        }
    }
</style>


