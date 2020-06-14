<template>
  <el-container style="height: 720px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="[ 'super','action','zhuye']" @open="change" @select="test">
        <el-submenu index="zhuye">
          <template slot="title">
            <i class="el-icon-message"></i>主页
          </template>
          <el-menu-item-group>
            <!-- <template slot="title">分组一</template> -->
            <el-menu-item index="control">控制台</el-menu-item>
            <!-- <el-menu-item index="1-2">选项2</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="action">
          <template slot="title">
            <i class="el-icon-menu"></i>操作
          </template>
          <el-menu-item-group>
            <template slot="title">查询</template>
            <el-menu-item index="search">学籍信息查询</el-menu-item>
            <!-- <el-menu-item index="2-2">选项2</el-menu-item> -->
          </el-menu-item-group>
          <el-menu-item-group title="修改">
            <el-menu-item index="update">学籍信息修改</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="super">
          <template slot="title">
            <i class="el-icon-setting"></i>高级
          </template>
          <el-menu-item-group>
            <template slot="title">学生高级查询</template>
            <el-menu-item index="sex">男女比例</el-menu-item>
            <el-menu-item index="age">年龄</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>许七安</span>
      </el-header>

      <el-main>
        <!-- <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140"></el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>-->
        <div>
          <update v-if="tab === 'update'"></update>
          <search v-else-if="tab === 'search'"></search>
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
      tab: ""
    };
  },
  methods: {
    beforeCreate: function() {
      console.log("创建前========");
      console.log(this.data);
      console.log(this.$el);
    },
    created: function() {
      console.log("已创建========");
      console.log(this.info);
      console.log(this.$el);
    },
    beforeMount: function() {
      console.log("mount之前========");
      console.log(this.info);
      console.log(this.$el);
    },
    mounted: function() {
      console.log("mounted========");
      console.log(this.info);
      console.log(this.$el);
    },
    beforeUpdate: function() {
      console.log("更新前========");
    },
    updated: function() {
      console.log("更新完成========");
    },
    beforeDestroy: function() {
      console.log("销毁前========");
      console.log(this.info);
      console.log(this.$el);
    },
    destroyed: function() {
      console.log("已销毁========");
      console.log(this.info);
      console.log(this.$el);
    },
    change(index, indexPath) {
      //   console.log(1);
      //   console.log(index+indexPath);
    },
    test(index, indexPath) {
      // console.log(indexPath);

      this.tab = indexPath[1];
      // console.log(this.tab);
    }
  },
  components: {
    search,
    control,
    update
  }
};
</script>