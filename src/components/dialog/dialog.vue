<template>
  <span>
    <el-button type="success" @click="outer = true" round>添加学生学籍</el-button>
    <el-dialog title="学生学籍信息" :visible.sync="outer" center>
      <el-form :model="addmsg">
        <el-form-item label="学生学号" prop="sid">
          <el-input v-model="addmsg.sid" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" prop="name">
          <el-input v-model="addmsg.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="学生性别" prop="sex">
          <el-input v-model="addmsg.sex" placeholder="请输入性别"></el-input>
        </el-form-item>
        <el-form-item label="学生身份证号" prop="ecard">
          <el-input v-model="addmsg.ecard" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="所属学院" prop="college">
          <el-select v-model="addmsg.college" placeholder="请选择所属学院">
            <el-option label="计算机与通信学院" value="计算机与通信学院"></el-option>
            <el-option label="外国语学院" value="外国语学院"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业班级" prop="major_class">
          <el-input v-model="addmsg.major_class" placeholder="请输入专业班级（eg. 软件工程1802）"></el-input>
        </el-form-item>
        <el-form-item label="入学年份" prop="inyear">
          <el-select v-model="addmsg.inyear" placeholder="请选择入学年份">
            <el-option label="2020" value="2020"></el-option>
            <el-option label="2019" value="2019"></el-option>
            <el-option label="2018" value="2018"></el-option>
            <el-option label="2017" value="2017"></el-option>
            <el-option label="2016" value="2016"></el-option>
            <el-option label="2015" value="2015"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-dialog
          width="40%"
          title="添加学生学籍信息确认"
          :visible.sync="confirminner"
          append-to-body
          center
        >
          <ul>
            <li>学生学号：{{addmsg.sid}}</li>
            <li>学生姓名：{{addmsg.name}}</li>
            <li>学生性别：{{addmsg.sex}}</li>
            <li>学生身份证：{{addmsg.ecard}}</li>
            <li>学生学院：{{addmsg.college}}</li>
            <li>学生班级：{{addmsg.major_class}}</li>
            <li>学生入学年份：{{addmsg.inyear}}</li>
          </ul>
          <div slot="footer" class="dialog-footer">
            <el-button @click="confirmcancel">取 消</el-button>
            <el-button type="primary" @click="confirmadd">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog width="40%" title="您确定取消吗？" :visible.sync="cancelinner" append-to-body center>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelcancel">取 消</el-button>
            <el-button type="primary" @click="cancelconfirm">确 定</el-button>
          </div>
        </el-dialog>
        <el-button @click="cancelinner=true">取 消</el-button>
        <el-button type="primary" @click="confirminner=true" v-popover:popovers>确 定</el-button>
      </div>
    </el-dialog>
  </span>
</template>

<script>
export default {
  data() {
    return {
      outer: false,
      confirminner: false,
      cancelinner: false,
      addmsg: {
        sid: "",
        name: "",
        sex: "",
        ecard: "",
        college: "",
        major_class: "",
        inyear: ""
      }
    };
  },
  methods: {
    confirmcancel() {
      console.log(this.confirminner);

      this.confirminner = false;
      this.outer = true;
    },
    confirmadd() {
      this.confirminner = false;
      this.outer = false;
      var that =this;
      // console.log(this.addmsg.sid,this.addmsg.name,this.addmsg.college,this.addmsg.inyear);//正常输出
      // console.log(this.addmsg);//部分输出为空
      var astudent={};
      astudent.sid=this.addmsg.sid;
      astudent.name=this.addmsg.name;
      astudent.college=this.addmsg.college;
      astudent.inyear=this.addmsg.inyear;
      astudent.major_class=this.addmsg.major_class;
      astudent.sex=this.addmsg.sex;
      astudent.ecard=this.addmsg.ecard;

      // console.log(student);
      
      //通过axios发送添加请求
      this.$axios
        .get("/api/phpvue/addstudent.php", {
          params: {
            sid: this.addmsg.sid,
            name: this.addmsg.name,
            sex: this.addmsg.sex,
            ecard: this.addmsg.ecard,
            college: this.addmsg.college,
            major_class: this.addmsg.major_class,
            inyear: this.addmsg.inyear
          }
        })
        .then(res => {
          // console.log(this.addmsg);
          if (res.data == "success") {
            this.$message({
              type: "success",
              message: "添加成功！"
            });       
            // console.log(this.addmsg.inyear); //部分输出为空    
            this.$store.commit({
              type: "addstudent",
              student: {
                sid: astudent.sid,
                name: astudent.name,
                sex: astudent.sex,
                ecard: astudent.ecard,
                college: astudent.college,
                major_class: astudent.major_class,
                inyear: astudent.inyear
              }
            });
          } else {
            this.$message({
              type: "info",
              message: 'error'
            });
          }
        });
      //将数据清空，方便下次添加
      this.clearmsg();
    },
    cancelcancel() {
      this.outer = true;
      this.cancelinner = false;
    },
    cancelconfirm() {
      this.outer = false;
      this.cancelinner = false;
      this.clearmsg();
    },
    clearmsg() {
      this.addmsg.id = "";
      this.addmsg.name = "";
      this.addmsg.ecard = "";
      this.addmsg.college = "";
      this.addmsg.class = "";
      this.addmsg.inyear = "";
    }
  }
};
</script>

<style>
li {
  font-size: 20px;
}
</style>