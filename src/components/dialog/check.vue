<template>
  <el-dialog title="查看详情页" :visible.sync="visible" center>
    <div style="font-size:25px;">
      <ul>
        <li>学生学号：{{detaildata.sid}}</li>
        <li>学生学号：{{detaildata.name}}</li>
        <li>学生性别：{{detaildata.sex}}</li>
        <li>学院：{{detaildata.college}}</li>
        <li>专业班级：{{detaildata.major_class}}</li>
        <li>身份证：{{detaildata.ecard}}</li>
        <li>入学年份：{{detaildata.inyear}}</li>
        <li>处分情况：{{detaildata.pulishment}}</li>
      </ul>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="close">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {

  props: ['visible','detaildata'],
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
      this.$emit('changevis',this.visible)
    }
  }

};
</script>

<style>
</style>