<template>
  <div>
    <div v-if="$store.state.identity=='student'">
      <el-dialog
        title="个人资料"
        :visible.sync="minevisible"
        center
        :close-on-press-escape="false"
        :show-close="false"
        :close-on-click-modal=false
      >
        <div style="font-size:25px;">
          <ul>
            <li>学号：{{$store.state.username}}</li>
            <li>姓名：{{$store.state.realname}}</li>
            <li>性别：{{$store.state.sex}}</li>
            <li>学院：{{$store.state.college}}</li>
            <li>专业班级：{{$store.state.major_class}}</li>
            <li>身份证：{{$store.state.ecard}}</li>
            <li>入学年份：{{$store.state.inyear}}</li>
            <li>处分情况：{{$store.state.pulishment}}</li>
          </ul>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="close">关 闭</el-button>
        </div>
      </el-dialog>
    </div>
    <div v-if="$store.state.identity=='college'">
      <el-dialog
        title="学院资料"
        :visible.sync="minevisible"
        center
        :close-on-press-escape="false"
        :show-close="false"
      >
        <div style="font-size:25px;">
          <ul>
            <li>学院编号:{{$store.state.username}}</li>
            <li>学院名称:{{$store.state.college}}</li>
          </ul>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="close">关 闭</el-button>
        </div>
      </el-dialog>
    </div>
    <div v-if="$store.state.identity == 'admin'">
      <el-dialog
        :visible.sync="minevisible"
        center
        :close-on-press-escape="false"
        :show-close="false"
      >
        <div style="font-size:25px;">
          <p>您是管理员!</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="close">关 闭</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  props: ["minevisible"],
  //   {
  //     visible: {
  //       type: Boolean,
  //       default: false
  //     },
  //     detaildata: {
  //       type: Object,
  //       default() {
  //         return {};
  //       }
  //     }
  //   },

  methods: {
    close() {
      this.$emit("changeminevis", !this.minevisible);
    }
  }
};
</script>

<style>
</style>