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
        </el-submenu>
        <el-submenu index="高级">
          <template slot="title">
            <i class="el-icon-setting"></i>高级
          </template>
          <el-menu-item-group>
            <template slot="title">学生高级查询</template>
            <el-menu-item index="男女比例">男女比例</el-menu-item>
            <el-menu-item index="年龄">年龄</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container direction="vertical">
      <!-- <el-header style=" font-size: 12px;border: 1px solid red">
         <span>{{tabArray[0]}}</span>
        <i class="el-icon-arrow-right"></i>
        <span>{{tabArray[1]}}</span>
        <div style="width:100px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>许七安</span>
        </div>
      </el-header>-->
      <!-- <div style="height:27px;background-color: #b3c0d1">
      </div>-->

      <div
        style="height:50px ;border:1px solid #eee;width:100%;position:relative;background-color:#b3c0d1"
      >
        <div style="width:200px;line-height:50px;margin-left:20px ;float:left">
          <span>{{tabArray[0]}}</span>
          <i class="el-icon-arrow-right"></i>
          <span>{{tabArray[1]}}</span>
        </div>
        <span style="line-height:50px; font-size:15px;margin-left:1000px;">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的个人资料</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{$store.state.username}}.{{$store.state.realname}}</span>
        </span>
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

export default {
  data() {
    const item = {
      date: "2020-6-1",
      name: "许七安",
      address: "地球"
    };
    return {
      tableData: Array(20).fill(item),
      tab: "",
      tabArray: ["主页", "控制台"]
    };
  },
  methods: {
    test(index, indexPath) {
      // console.log(indexPath);

      this.tab = indexPath[1];
      this.tabArray[0] = indexPath[0];
      this.tabArray[1] = indexPath[1];
      // console.log(this.tab);
    }
  },
  components: {
    search,
    control,
    update
  },
  created(){
    //判断是否为初始密码
    // if(this.$store.password="123456"){
      
    // }

  }
};
</script>