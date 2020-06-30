<template>
  <div>
    <div v-if="isstudent">
      <power />
    </div>
    <div v-else>
      <div style="margin-top: 15px; width:500px">
        <el-input placeholder="请输入查询信息" v-model="search" class="input-with-select" size="medium">
          <el-select v-model="select" slot="prepend" placeholder="请选择查询方式">
            <el-option label="学生学号" value="id"></el-option>
            <el-option label="身份证号" value="ecard"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="updatesearch">搜索</el-button>
        </el-input>
      </div>
      <div class="buttons">
        <el-button type="primary" round @click="showall">显示全部内容</el-button>
        <dialogs />
      </div>

      <div style="margin-top:50px">
        <el-table :data="results" style="width: 100%">
          <!-- <el-table :data="results" stripe style="width: 100%"> -->
          <el-table-column prop="sid" label="学号"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>

          <el-table-column prop="ecard" label="身份证号"></el-table-column>
          <el-table-column prop="college" label="学院"></el-table-column>
          <el-table-column prop="major_class" label="班级"></el-table-column>
          <el-table-column prop="inyear" label="入学年份"></el-table-column>
          <el-table-column prop="pulishment" label="处分情况"></el-table-column>
          <el-table-column prop="education" label="学历"></el-table-column>

          <el-table-column label="操作" width="300px">
            <template slot-scope="scope">
              <el-button size="mini" @click="handlecheck(scope.$index, scope.row)">查看详情</el-button>
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <check :visible="checkvisible" :detaildata="detaildata" @changevis="changevis" />
        <update
          :index="index"
          :updatevisible="updatevisible"
          :msg="updatedata"
          @changeupdate="changeupdate"
        />
        <deletes
          :deletevisible="deletevisible"
          :deletedata="deletedata"
          @deleteclose="deleteclose"
        />
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentpage"
            :page-sizes="[6, 8, 10, 12]"
            :page-size="currentpagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.realresults.length"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dialogs from "@components/dialog/dialog";
import check from "@components/dialog/check";
import update from "@components/dialog/updatedialog";
import deletes from "@components/dialog/deletedialog";
import power from "@views/powerpage";
export default {
  data() {
    return {
      currentpage: 1,
      currentpagesize: 8,
      isstudent: false,
      search: "",
      select: "",
      results: [],
      realresults: this.$store.state.realresults,
      checkvisible: false,
      updatevisible: false,
      deletevisible: false,
      detaildata: {},
      updatedata: {},
      deletedata: {},
      index: 0
    };
  },
  methods: {
    updatesearch() {
      this.$axios
        .get("/api/phpvue/updatesearch.php", {
          params: {
            text: this.search
          }
        })
        .then(res => {
          if (res.data != 0) {
            this.results = [];
            this.results.push(res.data);
          } else {
            this.$message.error("查无此人，请重新输入信息");
          }
        });
    },
    handleCurrentChange(page) {
      console.log(page);

      this.results = [];
      this.currentpage = page;
      // console.log(this.currentpage);

      for (
        let i = (page - 1) * this.currentpagesize;
        i < this.realresults.length &&
        i < this.currentpagesize + (page - 1) * this.currentpagesize;
        i++
      ) {
        this.results.push(this.realresults[i]);
        // console.log(this.realresults[i]);
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
    showall() {
      this.results = [];
      for (let i = 0; i < this.realresults.length; i++) {
        this.results.push(this.realresults[i]);
      }
      this.handleCurrentChange(1);
    },
    //处理编辑按钮
    handlecheck(index, row) {
      this.checkvisible = true;
      console.log(this.checkvisible);

      // console.log(this.realresults[2]);
      this.detaildata = row;
    },
    handleEdit(index, row) {
      // console.log(row);
      // console.log(this.$store.state.identity);
      
      if (row.college != this.$store.state.college && this.$store.state.identity!='admin') {
        this.$message({
          type: "warning",
          message: "对不起，你没有权限修改其他学院的学生信息"
        });
      } else {
        this.updatevisible = true;
        this.updatedata = row;
        this.index = index;
      }
    },
    handleDelete(index, row) {
      (this.deletevisible = true), (this.deletedata = row);
    },
    changevis(val) {
      this.checkvisible = !val;
      // console.log(this.checkvisible);
    },
    changeupdate(val) {
      this.updatevisible = val;
    },
    deleteclose(val) {
      this.deletevisible = val;
    }
  },
  components: {
    dialogs,
    check,
    update,
    deletes,
    power
  },
  created() {
    if (this.$store.state.identity == "student") this.isstudent = true;

    for (
      let i = (this.currentpage - 1) * this.currentpagesize;
      i < this.realresults.length && i < this.currentpagesize;
      i++
    ) {
      this.results.push(this.realresults[i]);
      // console.log(i);
      // console.log(this.realresults.length;);
    }

    // this.results=[];
  },
  watch: {
    realresults: {
      //深度监听，可监听到对象、数组的变化
      handler(newV, oldV) {
        // do something, 可使用this
        // this.realresults=newV
        // console.log(oldV);
        this.handleCurrentChange(this.currentpage);
        // console.log(newV);
      },
      deep: true
    }
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
.block {
  text-align: center;
}
</style>