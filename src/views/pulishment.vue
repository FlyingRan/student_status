<template>
  <div>
    <div v-if="isstudent">
      <power />
    </div>
    <div v-else class="container">
      <div class="box1">
        <p>处分添加</p>
        <div class="form">
          <span>学生学号</span>
          <el-input v-model="studentid1" placeholder="请输入内容" height="50px" @change="inputchange"></el-input>
        </div>
        <div class="form">
          <span>处分信息</span>
          <el-input v-model="pulishment1" type="textarea" :rows="5" placeholder="请输入内容"></el-input>
        </div>
        <div style="text-align:right">
          <el-button type="primary" round @click="addpulishment">添加</el-button>
        </div>
      </div>

      <div class="box1">
        <p>处分撤销</p>
        <div class="form">
          <span>学生学号</span>
          <el-input v-model="studentid2" placeholder="请输入内容" height="50px" @change="inputchange2"></el-input>
        </div>
        <div class="form">
          <span>处分信息：</span>
          <span>{{pulishment2}}</span>
        </div>
        <div style="text-align:right">
          <el-button type="primary" round @click="backout">撤销</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import power from "@views/powerpage"
export default {
  data() {
    return {
      studentid1: "",
      studentid2: "",
      pulishment1: "",
      pulishment2: "",
      isstudent: false
    };
  },
  components:{
    power
  },
  methods: {
    inputchange(value) {
      // console.log(value);
      this.$axios
        .get("/api/updateSearch", {
          params: {
            text: this.studentid1
          }
        })
        .then(res => {
          // console.log(res.data);
          this.pulishment1 = res.data.pulishment;
          // console.log(that.pulishemnt1);
        });
    },
    addpulishment() {
      // console.log(this.pulishment1);

      this.$axios
        .get("/api/addPunishment", {
          params: {
            punishment: this.pulishment1,
            sid: this.studentid1
          }
        })
        .then(res => {
          if (res.data == "success") {
            console.log(res.data);
            this.$message({
              type: "success",
              message: "处分成功"
            });
            this.$store.commit({
              type: "updatepulishment",
              sid: this.studentid1,
              pulishment: this.pulishment1
            });
            this.studentid1 = "";
            this.pulishment1 = "";
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    inputchange2(value) {
      this.$axios
        .get("/api/updateSearch", {
          params: {
            text: this.studentid2
          }
        })
        .then(res => {
          this.pulishment2 = res.data.pulishment;
        });
    },
    backout() {
      this.$axios
        .get("/api/addPunishment", {
          params: {
            sid: this.studentid2,
            punishment: "有过处分，已撤销"
          }
        })
        .then(res => {
          if (res.data == "success") {
            this.$message({
              type: "success",
              message: "撤销成功"
            });
            this.$store.commit({
              type: "updatepulishment",
              sid: this.studentid2,
              pulishment: "有过处分，已撤销"
            });
            this.studentid2 = "";
            this.pulishment2 = "";
          } else {
            this.$message({
              type: "error",
              message: "撤销失败，服务器异常"
            });
          }
        });
    }
  },
  created() {
    // console.log(this.$store.state.identity);
    
    if (this.$store.state.identity == "student") this.isstudent = true;
  }
};
</script>

<style>
.container {
  width: 1200px;
  border: 1px solid #eef;
  height: 700px;
  margin-left: 50px;
  font-size: 30px;
  font-weight: 100;
}
.box1 {
  border: 1px solid #eee;
  width: 450px;
  height: 550px;
  float: left;
  margin-left: 100px;
  margin-top: 50px;
}
.box2 {
  border: 1px solid blue;
  height: 550px;
  width: 600px;
  float: left;
}
p {
  text-align: center;
  font-weight: 400;
  font-size: 50px;
}
.form {
  margin-top: 25px;
}
</style>