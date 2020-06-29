<template>
  <div>
    
    <transition>
               
       

    <div class="login" v-show="isNum">
    <p>学生学籍管理系统</p>
    
    <div class="imgs">
     
      <img src="../assets/img/school.png" alt="图片加载失败" width="100%" height="100%"/>
 

    </div>
    <div class="forms">
      <el-form
        :model="logindata"
        status-icon
        :rules="rules2"
        ref="logindata"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="登陆身份">
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
          <el-button type="primary" @click="submitForm('logindata')">登录</el-button>
          <el-button @click="resetForm('logindata')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    </div>
     </transition>
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
      isNum: false,
      logindata: {
        username: "",
        password: "",
        identity: "",
        autologin: false
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
          // console.log("success");

          this.$axios
            .post(
              "/api/phpvue/login.php",
              this.$qs.stringify({
                username: this.logindata.username,
                password: this.logindata.password,
                identity: this.logindata.identity
              })
            )
            .then(res => {
              if (res.status == 200) {
                if (res.data == 0) {
                  this.$message.error("用户名或者密码错误，再想想吧！");
                } else {
                  console.log(res.data);
                  this.$store.commit({
                    type: "changeuser",
                    data: res.data,
                    identity: this.logindata.identity
                  });
                  this.$router.push("/home").catch(err => {
                    err;
                  });
                }
              } else {
                this.$message.error("服务器异常，请稍后再试");
              }
              // console.log(res.data);
            })
            .catch(err => {
              console.log("出错");
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    setTimeout(() => {
      this.isNum = true;
    }, 500
    );
    
  }
};
</script>

<style>
.login {
  width: 1705px;
  height: 800px;
  border: 1px solid grey;
  background-color: darkgray;
}
.forms {
  position: fixed;
  left: 880px;
  top: 250px;
  width: 500px;
  height: 400px;
  /* border: 1px solid red; */
}
.imgs {
  position: fixed;
  left: 380px;
  top: 220px;
  width: 350px;
  height: 350px;
  /* border: 1px solid blue; */
  /* float: left; */
}
.v-enter,.v-leave-to{
        opacity: 0;
        transform: translateX(80px);
    }
    .v-enter-active,.v-leave-active{
        
        transition: all 0.5S ease
    }

</style>