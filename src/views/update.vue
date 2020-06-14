<template>
  <div>
    <div v-if="isstudent">对不起，你的身份是学生，没有权限修改他人的学籍噢</div>
    <div v-else>
    <div style="margin-top: 15px; width:500px">
      <el-input placeholder="请输入查询信息" v-model="search" class="input-with-select" size="medium">
        <el-select v-model="select" slot="prepend" placeholder="请选择查询方式">
          <el-option label="学生学号" value="id"></el-option>
          <el-option label="身份证号" value="ecard"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="start"></el-button>
      </el-input>
    </div>
    <div class="buttons">
      <el-button type="primary" round>显示全部内容</el-button>
      <dialogs />
    </div>

    <div style="margin-top:50px">
      <el-table :data="results" style="width: 100%">
        <!-- <el-table :data="results" stripe style="width: 100%"> -->
        <el-table-column prop="id" label="学号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="ecard" label="身份证号"></el-table-column>
        <el-table-column prop="college" label="学院"></el-table-column>
        <el-table-column prop="class" label="班级"></el-table-column>
        <el-table-column prop="inyear" label="入学年份"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    </div>
  </div>
</template>

<script>
  import dialogs from "@components/dialog/dialog";

export default {
  data() {
    return {
      isstudent:false,
      search: "",

      select: "",
      results: [],
      
    };
  },
  methods: {
    start() {
      // console.log(this.search);
      // console.log(this.select);
    }
  },
  components:{
    dialogs
  },
  created(){
    if(this.$store.state.identity=='student')
      this.isstudent=true
  }
};
</script>

<style>
.el-select .el-input {
  width: 200px;
}

.buttons {
  margin-top: 50px;
}
</style>