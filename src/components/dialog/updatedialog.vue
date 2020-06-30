<template>
  <el-dialog title="学生学籍信息" :visible.sync="updatevisible" center :close-on-press-escape=false :show-close=false>
    <el-form :model="msg">
      <el-form-item label="学生学号" prop="sid">
        <el-input v-model="msg.sid" placeholder="请输入学号" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="学生姓名" prop="name">
        <el-input v-model="msg.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="学生性别" prop="sex">
        <el-input v-model="msg.sex" placeholder="请输入性别"></el-input>
      </el-form-item>
      <el-form-item label="学生身份证号" prop="ecard">
        <el-input v-model="msg.ecard" placeholder="请输入身份证号" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="所属学院" prop="college">
        <el-select v-model="msg.college" placeholder="请选择所属学院">
          <el-option label="计算机与通信学院" value="计算机与通信学院"></el-option>
          <el-option label="外国语学院" value="外国语学院"></el-option>
          <el-option label="管理学院" value="管理学院"></el-option>
          <el-option label="机械学院" value="机械学院"></el-option>
          <el-option label="电气学院" value="电气学院"></el-option> 
        </el-select>
      </el-form-item>
      <el-form-item label="专业班级" prop="major_class">
        <el-input v-model="msg.major_class" placeholder="请输入专业班级（eg. 软件工程1802）"></el-input>
      </el-form-item>
      <el-form-item label="入学年份" prop="inyear">
        <el-select v-model="msg.inyear" placeholder="请选择入学年份" disabled>
          <el-option label="2020" value="2020"></el-option>
          <el-option label="2019" value="2019"></el-option>
          <el-option label="2018" value="2018"></el-option>
          <el-option label="2017" value="2017"></el-option>
          <el-option label="2016" value="2016"></el-option>
          <el-option label="2015" value="2015"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学历" prop="education">
          <el-select v-model="msg.education" placeholder="请选择学历" disabled>
            <el-option label="本科" value="本科"></el-option>
            <el-option label="硕士" value="硕士"></el-option>
          </el-select>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="confirmcancel">取 消</el-button>
      <el-button type="primary" @click="confirmaupdate">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    updatevisible: {
      type: Boolean,
      default: false
    },
    msg: {
      type: Object,
      default() {
        return {};
      }
    },
    index: {
      type: Number
    }
  },
  methods: {
    confirmcancel() {
      this.$emit("changeupdate", !this.updatevisible);
      this.$message({
        type: "info",
        message: "已取消修改"
      });
    },
    confirmaupdate() {
      this.$emit("changeupdate", !this.updatevisible);
      //发起修改请求
      this.$axios
        .get("/api/phpvue/updatedata.php", {
          params: {
            sid: this.msg.sid,
            name: this.msg.name,
            sex: this.msg.sex,
            college: this.msg.college,
            major_class: this.msg.major_class,
            inyear: this.msg.inyear,
            ecard: this.msg.ecard
          }
        })
        .then(res => {
          if (res.data == "success") {
            //提示修改成功
            this.$message({
              type: "success",
              message: "修改成功！"
            });
            // this.$store.commit({
            //   type:'updatestudent',
            //   msg:this.msg,
            //   index:this.index
            // })
          } else {
            //提示修改失败
            console.log(res);

            this.$message({
              type: "error",
              message: "修改失败，服务器异常！"
            });
          }
        });
    }
  }
};
</script>

<style>
</style>