<template>
    <div class="login-wrap">
        <div class="ms-title">CRM系统后台登录</div>
        <div class="ms-login">
            <el-tabs class="tab" v-model="loginType" type="card" @tab-click="tabClick">
                <el-tab-pane label="账号登录" name="first">
                    <el-form :model="form1" :rules="rules" ref="form1" label-width="0px">
                        <el-form-item prop="phone">
                            <el-input class="login-inp" size="large" placeholder="请输入登录手机号" v-model="form1.phone">
                                <icon slot="prefix" class="login-ico" ico="icon-zhucedengluyonghuming"></icon>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password" style="margin-top:-40px">
                            <el-input class="login-inp" type="password" size="large" placeholder="请输入登录密码" v-model="form1.password">
                                <icon slot="prefix" class="login-ico" ico="icon-3denglumima"></icon>
                            </el-input>
                        </el-form-item>
                        <div class="login-btn">
                            <el-button :loading="btnLoading" @click="submitForm('form1')">登录</el-button>
                        </div>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="手机验证登录" name="second">
                    <el-form :model="form2" :rules="rules" ref="form2" label-width="0px">
                        <el-form-item prop="phone">
                            <el-input class="login-inp" size="large" placeholder="请输入登录手机号" v-model="form2.phone">
                                <icon slot="prefix" class="login-ico" ico="icon-zhucedengluyonghuming"></icon>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="code" style="margin-top:-40px">
                            <el-input class="login-inp" size="large" placeholder="请输入验证码" v-model="form2.code">
                                <icon slot="prefix" class="login-ico" ico="icon-yanzhengma"></icon>
                            </el-input>
                            <el-button @click="getCode" class="code-btn" type="primary" v-if="code">获取验证码</el-button>
                            <el-button class="code-btn" type="primary" v-else>{{codeTime}}s</el-button>
                        </el-form-item>
                        <div class="login-btn">
                            <el-button :loading="btnLoading" @click="submitForm('form2')">登录</el-button>
                        </div>
                    </el-form>
                </el-tab-pane>
                <!-- <el-tab-pane label="扫码登录" name="third">
                    <div style="width:100%;text-align:center">扫码登录暂未开通，敬请期待！</div>
                </el-tab-pane> -->
            </el-tabs>
        </div>
    </div>
</template>

<script>
import * as api from "../../api/api.js";
import icon from "../common/ico";

export default {
  components: {
    icon
  },
  data() {
    return {
      loginType: "first",
      btnLoading: false,
      code: true,
      codeTime: 5,
      form1: {
        phone: "",
        password: ""
      },
      form2: {
        phone: "",
        code: ""
      },
      rules: {
        phone: [
          { required: true, message: "请输入登录手机号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
              console.log(valid)
        if (valid) {
          this.btnLoading = true;
          let data = this[formName];
          let url;
          if (formName == "form1") {

            url = api.loginByPwd;
          } else {
            url = api.loginByCode;
          }
          this.$axios
            .post(url, data)
            .then(res => {
              if (res.data.code == 200) {
                localStorage.setItem("ms_username", res.data.data.name);
                localStorage.setItem("ms_userID", res.data.data.id);
                localStorage.setItem("ms_userPhone", res.data.data.telephone);
                localStorage.setItem("ms_hadFirstLogin", res.data.data.hadFirstLogin);
                this.getUserPriList(res.data.data.id);
                this.btnLoading = false;
              } else {
                this.btnLoading = false;
                this.$message.warning(res.data.msg);
              }
            })
            .catch(err => {
              console.log(err);
              this.btnLoading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 获取验证码
    getCode() {
      let phoneNum = this.form2.phone;
      if (phoneNum == "") {
        this.$message.warning("请输入手机号!");
        return;
      }
      let that = this;
      this.code = false;
      this.codeTime = 60;
      let timer = setInterval(function() {
        that.codeTime--;
        if (that.codeTime <= 0) {
          that.code = true;
          clearInterval(timer);
        }
      }, 1000);
      let data = { phone: this.form2.phone };
      this.$axios
        .post(api.getCode, data)
        .then(res => {
          if (res.data.code == 200) {
            this.$message.success(res.data.data);
            alert(res.data.data);
          } else {
            this.$message.warning(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // tab切换
    tabClick(params) {

    },
    // 获取权限列表
    getUserPriList(id) {
      this.$axios
        .post(api.findAdminUserbyId, { id: id })
        .then(res => {
          if (res.data.code == 200) {
            let privilegeList = [];
            res.data.data.adminUserPrivilegeList.forEach((v, k) => {
              privilegeList.push(v.url);
            });
            localStorage.setItem('privilegeList',JSON.stringify(privilegeList));
            this.$message.success("登录成功！");
            this.$router.push("/dashboard");
          }else{
              this.$message.warning(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.btnLoading = false;
        });
    }
  }
};
</script>

<style lang='less'>
@import "../../assets/css/login/login.css";
</style>