<template>
    <div class="edit-basic-mask">
        <div class="box">
            <div class="mask-title">基础信息编辑</div>
            <div class="mask-content">
                <el-form>
                    <div class="left">
                        <div class="form-item">
                            <el-form-item label="用户ID">
                                {{dealer.id}}
                            </el-form-item>
                            <el-form-item label="微信openid" class="special">
                                {{dealer.openid}}
                            </el-form-item>
                        </div>
                        <div class="form-item">
                            <el-form-item label="昵称">
                                <el-input v-model="dealer.nickname" placeholder="请输入昵称" size="medium"></el-input>
                            </el-form-item>
                            <el-form-item label="微信号">
                                <el-input v-model="dealer.wecaht_id" placeholder="请输入微信号" size="medium"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-item">
                            <el-form-item label="姓名">
                                <el-input v-model="dealer.realname" placeholder="请输入用户姓名" size="medium"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号">
                                <el-input v-model="dealer.phone" @blur="textPhone" placeholder="请输入手机号" size="medium"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-item">
                            <el-form-item label="身份证号">
                                <el-input v-model="dealer.idcard" @blur="testIdCard" placeholder="请输入身份证号码" size="medium"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-item address-area">
                            <el-form-item label="地址信息">
                                <region @regionMsg='getRegion' :regionMsg='address'></region>
                                <el-input class="lar-inp" v-model="dealer.address" placeholder="详细地址..." size="medium"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="right">
                        <img v-if="img" :src="img" alt="">
                        <img v-else src="../../../../assets/images/logo.png" alt="">
                        <el-upload
                                action="/commonAPI/ossClient/aliyunOSSUploadImage"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <el-button type="primary">编辑头像</el-button>
                        </el-upload>
                        <div class="tip">请上传jpg，png格式</div>
                    </div>
                    <div class="clearfix"></div>
                    <el-form-item class="submit-btn">
                        <el-button type="primary" @click="submitForm('form')">确认修改</el-button>
                        <el-button @click="closeToask">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    import icon from "../../../common/ico";
    import region from '../../../common/Region';
    import * as api from '../../../../api/api'
    import * as pApi from '../../../../privilegeList/index.js';
    export default {
        components: {
            icon,region
        },
        props:{
            id: {
                require: true
            },
            dealer: {
                require: true
            },
        },
        data() {
            return {
                address: '',
                form:{},
                phone:true,
                idCard:true,
                img:''
            };
        },
        created(){
            let reginArr=[];
            reginArr.push(this.dealer.province_id,this.dealer.city_id,this.dealer.area_id);
            this.address=reginArr;
            this.img=this.dealer.head_img;
        },
        methods: {
            // 获取省市区
            getRegion(msg) {
                this.address = msg;
            },
            //  取消弹窗
            closeToask() {
                this.$emit("msg", false);
            },
            //上传图片
            handleAvatarSuccess(res, file) {
                this.img = res.data.imageUrl;
                this.dealer.head_img = res.data.imageUrl;
            },
            beforeAvatarUpload(file) {
                const isJPG = (file.type === 'image/jpeg'||file.type === 'image/png');
                if (!isJPG) {
                    this.$message.error('请上传jpg，png格式!');
                }
                return isJPG ;
            },
            textPhone(){
                let that=this;
                let reg=/^1[3-8]\d{9}$/;
                if (!reg.test(that.dealer.phone)) {
                    that.$message.warning('请输入正确的手机号格式!');
                    that.phone=false;
                    return false;
                }else{
                    that.phone=true;
                }
            },
            testIdCard(){
                let that=this;
                let reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
                if(!reg.test(that.dealer.idcard)) {
                    that.$message.warning('请输入正确的身份证号!');
                    that.idCard=false;
                    return false;
                }else{
                    that.idCard=true;
                }
            },
            // 提交表单
            submitForm(form) {
                let that=this;
                let data={};
                data.id=that.id;
                data.address=that.dealer.address;
                data.address=that.dealer.address;
                data.headImg=that.img;
                data.idcard=that.dealer.idcard;
                data.nickname=that.dealer.nickname;
                data.phone=that.dealer.phone;
                data.wecahtId=that.dealer.wecaht_id;
                data.realname=that.dealer.realname;
                data.url=pApi.updateDealerById;
                if(that.address){
                    data.provinceId=that.address[0];
                    if(that.address[1]){
                        data.cityId=that.address[1];
                    }else{
                        data.cityId=''
                    }
                    if(that.address[2]){
                        data.areaId=that.address[2];
                    }else{
                        data.areaId=''
                    }
                }
                if(that.phone==false||that.idCard==false){
                    return false
                }
                that.addrPreFix=that.address;
                that.$axios
                    .post(api.updateDealerById, data)
                    .then(res => {
                        that.btnLoading = false;
                        if(res.data.code == 200){
                            that.$message.success('修改成功');
                            this.$emit("msg", false);
                        }else{
                            that.$message.warning(res.data.msg);
                            this.$emit("msg", false);
                        }
                    })
                    .catch(err => {
                        that.tableLoading = false;
                        that.$emit("msg", false);
                    });
                that.closeToask();
            }
        }
    };
</script>
<style lang="less">
    .edit-basic-mask {
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
            width: 840px;
            height: 482px;
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
                overflow: hidden;
                padding: 10px 45px 0 45px;
                box-sizing: border-box;
                .submit-btn {
                    margin-top: 30px;
                    padding-left: 225px;
                    box-sizing: border-box;
                }
            }
        }
        .left {
            float: left;
            width: 80%
        }
        .right {
            float: left;
            width: 20%;
            text-align: center;
            padding: 20px 0 0;
            img{
                width: 100px;
                height: 100px;
                border-radius: 10px;
                border:2px solid  #dfdfdf;
                margin-bottom: 10px;
            }
        }
        .clearfix {
            clear: both
        }
        .form-item {
            width: 100%;
            display: inline-block
        }
        .el-form-item {
            width: 48%;
            float: left;
            margin-right: 2%
        }
        .el-form-item__label {
            width: 70px;
            text-align: left
        }
        .special .el-form-item__label {
            width: 100px;
            text-align: left
        }
        .el-form-item__content {
            margin-left: 70px;
        }
        .el-input__inner {
            width: 200px
        }
        .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .el-upload:hover {
            border-color: #409EFF;
        }
        .el-upload--text {
            width: 80px;
            height: 32px;
            border: none;
        }
        .tip{font-size: 12px;color: #999}
        .submit-btn{width: 100%;text-align: right}
        .address-area{
            width: 100%;
            .el-input__inner {
                width: 150px
            }
            .lar-inp{
                margin-top: 20px;
                .el-input__inner {
                    width: 460px
                }
            }
            .el-form-item__content{
                width: 500px;
            }
        }
    }
</style>


