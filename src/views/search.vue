<template>
  <div class="container">
    <el-card class="searchform">
      <el-form :model="data" class="demo-form-inline" ref="data">
        <el-form-item label="学生学号" prop="id">
          <el-input v-model="data.id" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" prop="name">
          <el-input v-model="data.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="data.sex" placeholder="请输入性别"></el-input>
        </el-form-item>
        <el-form-item label="学生身份证号" prop="ecard">
          <el-input v-model="data.ecard" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="所属学院" prop="college">
          <el-select v-model="data.college" placeholder="请选择所属学院">
            <el-option label="计算机与通信学院" value="计算机与通信学院"></el-option>
            <el-option label="外国语学院" value="外国语学院"></el-option>
            <el-option label="机械学院" value="机械学院"></el-option>
            <el-option label="电气学院" value="电气学院"></el-option>
            <el-option label="管理学院" value="管理学院"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业班级" prop="class">
          <el-input v-model="data.class" placeholder="请输入专业班级（eg. 软件工程1802）"></el-input>
        </el-form-item>
        <el-form-item label="入学年份" prop="inyear">
          <el-select v-model="data.inyear" placeholder="请选择入学年份">
            <el-option label="2020" value="2020"></el-option>
            <el-option label="2019" value="2019"></el-option>
            <el-option label="2018" value="2018"></el-option>
            <el-option label="2017" value="2017"></el-option>
            <el-option label="2016" value="2016"></el-option>
            <el-option label="2015" value="2015"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="startsearch">搜索</el-button>
          <el-button @click="resetForm('data')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="searchresults">
      <el-table :data="results" stripe style="width: 100%">
        <el-table-column prop="sid" label="学号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="ecard" label="身份证号"></el-table-column>
        <el-table-column prop="college" label="学院"></el-table-column>
        <el-table-column prop="major_class" label="班级"></el-table-column>
        <el-table-column prop="inyear" label="入学年份"></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentpage"
          :page-sizes="[6, 8, 10, 12]"
          :page-size="currentpagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="realresults.length"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        id: "",
        name: "",
        sex: "",
        ecard: "",
        college: "",
        class: "",
        inyear: ""
      },
      realresults: this.$store.state.realresults,
      results: [],
      currentpage: 1,
      currentpagesize: 8
    };
  },
  methods: {
    resetForm(formName) {
      // console.log(1);
      console.log(this.data.id);
      this.$refs[formName].resetFields();
    },
    //当前页面发生切换
    handleCurrentChange(page) {
      console.log(page);

      this.results = [];
      this.currentpage = page;
      console.log(this.currentpage);

      for (
        let i = (page - 1) * this.currentpagesize;
        i < this.realresults.length &&
        i < this.currentpagesize + (page - 1) * this.currentpagesize;
        i++
      ) {
        this.results.push(this.realresults[i]);
        // console.log(i);
      }
    },
    //表格显示数量发送切换
    handleSizeChange(pagesize) {
      // console.log(pagesize);

      this.currentpagesize = pagesize;
      console.log(this.currentpagesize);
      this.results = [];
      for (
        let i = (this.currentpage - 1) * this.currentpagesize;
        i < this.realresults.length &&
        i <
          this.currentpagesize + (this.currentpage - 1) * this.currentpagesize;
        i++
      ) {
        this.results.push(this.realresults[i]);
        // console.log(i);
      }
    },
    startsearch() {
      this.$axios
        .get("/api/phpvue/singlesearch.php", {
          params: {
            id: this.data.id,
            name: this.data.name,
            sex: this.data.sex,
            ecard: this.data.ecard,
            college: this.data.college,
            class: this.data.class,
            inyear: this.data.inyear
          }
        })
        .then(res => {
          this.realresults=[];
          for(let i=0 ; i<res.data.length;i++){
            // this.results.push(res[i]);
            this.realresults.push(res.data[i]);
            // console.log(res[i]);
          }
          this.handleCurrentChange(1);
          // console.log(res);
          
        });
    }
  },
  created() {
    // this.$axios.get("/api/phpvue/allsearch.php").then(res => {
    //   console.log(res.data.length);
    //   console.log(res);
    //   for (let x in res.data) {
    //     this.realresults.push(res.data[x]);
    //     //  console.log(x);
    //   }
      for (
        let i = (this.currentpage - 1) * this.currentpagesize - 1;
        i < this.realresults.length && i < this.currentpagesize;
        i++
      ) {
        this.results.push(this.realresults[i]);
      }
      // this.results=[];
    // });
  }
};
</script>

<style>
.container{
  width: 1300px;
  /* border:1px solid red; */
}
.searchform {
  width: 30%;
  /* border:1px solid red; */
  float: left;
  font-size: 20px;
  height: 700px;
}
.searchresults {
  margin-left: 450px;
  width: 65%;
  /* border:1px solid green; */
  height: 700px;
}
</style>