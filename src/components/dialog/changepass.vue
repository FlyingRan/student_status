<template>
  <el-dialog title="修改密码" :visible.sync="passvisible"  center  :close-on-press-escape=false :show-close=false>
    <el-form :model="password" :rules="rule"  class="demo-ruleForm"  ref="password" status-icon>
      <el-form-item label="原密码" prop="sid">
        <el-input type="password" v-model="password.oldpass" placeholder="请输入原来的密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpass">
        <el-input type="password" v-model="password.newpass" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="newpass2">
        <el-input type="password" v-model="password.newpass2" placeholder="请输入新密码"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="confirmcancel">取 消</el-button>
      <el-button type="primary" @click="confirmchange">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["passvisible"],
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入密码"));
      } else if (value != this.password.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      password: {
        oldpass: "",
        newpass: "",
        newpass2: ""
      },
      rule: {
        newpass2: [{ validator: validatePass1, trigger: "blur" }]
      }
    };
  },
  methods: {
    confirmcancel() {
    //   this.password.oldpass = " ";
    //   this.password.newpass = " ";  
      this.$emit("passvischange", !this.passvisible);
      console.log(1);
      this.$message({
        type: "info",
        message: "已取消修改"
      });
    },
    confirmchange() {
      this.$axios
        .post(
          "/api/phpvue/changepass.php",
          this.$qs.stringify({
            oldpass: this.password.oldpass,
            newpass: this.password.newpass,
            sid: this.$store.state.username,
            identity: this.$store.state.identity
          })
        )
        .then(res => {
        // //   console.log(res.data);
        //   this.passowrd.oldpass = " ";
        //   this.password.newpass = " ";
          if (res.data == "success") {
            this.$message({
              type: "success",
              message: "修改成功"
            });
            this.$emit("passvischange", !this.passvisible);
          } else if (res.data == "password error") {
            this.$message({
              type: "error",
              message: "原密码填写错误,请重新书写"
            });
          } else {
            this.$message({
              type: "error",
              message: "服务器异常,请稍后再试。"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>