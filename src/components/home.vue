<template>
  <el-container style="height: 720px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="[ '高级','操作','主页']" @select="test">
        <el-submenu index="主页">
          <template slot="title">
            <i class="el-icon-message"></i>主页
          </template>
          <el-menu-item-group>
            <!-- <template slot="title">分组一</template> -->
            <el-menu-item index="控制台">控制台</el-menu-item>
            <!-- <el-menu-item index="1-2">选项2</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="操作">
          <template slot="title">
            <i class="el-icon-menu"></i>操作
          </template>
          <el-menu-item-group>
            <template slot="title">查询</template>
            <el-menu-item index="学籍信息查询">学籍信息查询</el-menu-item>
            <!-- <el-menu-item index="2-2">选项2</el-menu-item> -->
          </el-menu-item-group>
          <el-menu-item-group title="修改">
            <el-menu-item index="学籍信息修改">学籍信息修改</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="处分">
            <el-menu-item index="处分添加与撤销">处分添加与撤销</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="高级">
          <template slot="title">
            <i class="el-icon-setting"></i>高级
          </template>
          <el-menu-item-group>
            <template slot="title">学生高级查询</template>
            <el-menu-item index="男女比例">男女比例</el-menu-item>
            <el-menu-item index="人数比例">人数比例</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container direction="vertical">

      <div
        style="height:50px ;border:1px solid #eee;width:100%;position:relative;background-color:#b3c0d1"
      >
        <div style="width:200px;line-height:50px;margin-left:20px ;float:left">
          <span>{{tabArray[0]}}</span>
          <i class="el-icon-arrow-right"></i>
          <span>{{tabArray[1]}}</span>
        </div>
        <span style="line-height:50px; font-size:15px;margin-left:800px;">
          <el-dropdown @command="handleCommand">
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="mine">我的个人资料</el-dropdown-item>
              <el-dropdown-item command="password">修改密码</el-dropdown-item>
              <el-dropdown-item command="quit">退出</el-dropdown-item>
              
            </el-dropdown-menu>
          </el-dropdown>
          
          
          <span>{{$store.state.username}}.{{$store.state.realname}}</span>
          
        </span>
        <advice  :advicevisible="advicevisible" @confirmadvice="confirmadvice" @adviceclose="adviceclose"/>
        <changepass :passvisible="passvisible" @passvischange="passvischange"/>
          <mine :minevisible="minevisible" @changeminevis="changeminevis"/>
      </div>
      <el-main>
        <!-- <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140"></el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>-->
        <div>
          <update v-if="tab === '学籍信息修改'"></update>
          <search v-else-if="tab === '学籍信息查询'"></search>
          <sexchart v-else-if="tab === '男女比例'"></sexchart>
          <pulishmentchart v-else-if="tab === '人数比例'"></pulishmentchart>
          <pulishment v-else-if="tab === '处分添加与撤销'"></pulishment>
          <control v-else></control>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
// import loginVue from './login.vue';
import control from "@views/control";
import update from "@views/update";
import search from "@views/search";
import sexchart from "@views/sexchart";
import pulishmentchart from "@views/pulishmentchart";
import pulishment from "@views/pulishment";
import changepass from "@components/dialog/changepass";
import mine from '@components/dialog/mine';
import advice from "@components/dialog/advice";
export default {
  data() {
    return {
      tab: "",
      tabArray: ["主页", "控制台"],
      passvisible:false,
      minevisible:false,
      advicevisible:false
    };
  },
  methods: {
    test(index, indexPath) {
      // console.log(indexPath);
      this.tab = indexPath[1];
      this.tabArray[0] = indexPath[0];
      this.tabArray[1] = indexPath[1];
      // console.log(this.tab);
    },
    back() {
      // console.log(1);
      this.$confirm("你确认退出吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$router.push('/login')
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出！"
          });
        });
    },
    handleCommand(command) {
      // this.$message("click on item " + command);
      if(command == 'quit'){
        this.back();
      }else if (command == 'password'){
        // console.log('conmein')
        this.passvisible=true;
      }else if(command =='mine'){
        console.log(1);
        this.minevisible=true;
      }
    },
    passvischange(val){
      this.passvisible=val;
    },
    changeminevis(val){
      this.minevisible=val;
    },
    confirmadvice(val){
      this.advicevisible=val;
      // console.log('confirm');
      this.passvisible=true;
    },
    adviceclose(val){
      this.advicevisible=val;
      // console.log('cancel');
      
    }
  },
  components: {
    search,
    control,
    update,
    sexchart,
    pulishmentchart,
    pulishment,
    changepass,
    mine,
    advice
  },
  beforeCreate(){
    if(this.$store.state.identity==''){
      this.$router.push('/login');
      this.$message({
        type:'warning',
        message:'请先登录噢'
      })
    }
    // console.log(this.$store.state.state,this.$store.state.password);
    
    
  },
  created() {
    //判断是否为初始密码
    // if(this.$store.password="123456"){
    // }
    if(this.$store.state.state == '1' && this.$store.state.password == 'MTIzNDU2'){
      console.log('xx');
      this.advicevisible=true
    }
    this.$axios.get("/api/phpvue/allsearch.php").then(res => {
      // console.log(res.data.length);
      // console.log(res);
      // for (let x in res.data) {
      // this.realresults.push(res.data[x]);
      //  console.log(x);
      // }

      this.$store.commit({
        type: "commitresults",
        realresults: res.data
      });
    });
  }
};
</script>