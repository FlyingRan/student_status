<template>
  <span>
    <el-button type="success" @click="outer = true" round>添加学生学籍</el-button>
    <el-dialog title="学生学籍信息" :visible.sync="outer" center>
      <el-form :model="addmsg">
        <el-form-item label="学生学号" prop="id">
          <el-input v-model="addmsg.id" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" prop="name">
          <el-input v-model="addmsg.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="学生身份证号" prop="ecard">
          <el-input v-model="addmsg.ecard" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="所属学院" prop="college">
          <el-select v-model="addmsg.college" placeholder="请选择所属学院">
            <el-option label="计算机与通信学院" value="computer"></el-option>
            <el-option label="外国语学院" value="language"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业班级" prop="class">
          <el-input v-model="addmsg.class" placeholder="请输入专业班级（eg. 软件工程1802）"></el-input>
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
            <li>学生学号：{{addmsg.id}}</li>
            <li>学生姓名：{{addmsg.name}}</li>
            <li>学生身份证：{{addmsg.ecard}}</li>
            <li>学生学院：{{addmsg.college}}</li>
            <li>学生班级：{{addmsg.class}}</li>
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
        id: "",
        name: "",
        ecard: "",
        college: "",
        class: "",
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
      console.log(this.addmsg.id, this.addmsg.college);

      //通过axios发送添加请求

      //将数据情况，方便下次添加
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
li{
  font-size: 20px;
}
</style>