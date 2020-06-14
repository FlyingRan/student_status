<template>
  <div class="login">
    <el-form
      :model="logindata"
      status-icon
      :rules="rules2"
      ref="logindata"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item>
        <el-select placeholder="请选择登录身份" v-model="logindata.identity">
          <el-option label="管理员" value="admin"></el-option>
          <el-option label="学生" value="student"></el-option>
          <el-option label="学院负责人" value="college"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="logindata.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="logindata.password" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('logindata')">提交</el-button>
        <el-button @click="resetForm('logindata')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    return {
      logindata: {
        username: "",
        password: "",
        identity: ""
      },
      rules2: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    
    submitForm(formName) {
      // const self = this;
      // console.log(username)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.commit({
            type: "changeiden",
            identity: this.logindata.identity
          });
          console.log("success");
          // console.log(this.logindata.identity);

          // console.log(self.logindata.username);

          this.$router.push("/home").catch(err => {
            err;
          });
          // that.$axios
          //   .get("/api/phpvue/test.php")
          //   .then(res => {
          //     console.log(res);
          //   })
          //   .catch(err => {
          //     console.log("出错");
          //     console.log(err);
          //   });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    
  }
};
</script>

<style>
.login {
  width: 500px;
  text-align: center;
  height: 500px;
  margin-top: 250px;
  margin-left: 500px;
  /* border: 1px solid red; */
}
</style>