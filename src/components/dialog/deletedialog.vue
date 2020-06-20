<template>
  <el-dialog title="提示" :visible.sync="deletevisible" width="30%">
    <span>你确定要删除吗？</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="confirmdelete">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ["deletevisible", "deletedata"],
  methods: {
    close() {
      this.$emit("deleteclose", !this.deletevisible);
    },
    confirmdelete() {
      this.$emit("deleteclose", !this.deletevisible);

      this.$axios.get('/api/phpvue/deletestudent.php',{
          params:{
              sid:this.deletedata.sid
          }
      }).then( res => {
          // console.log(res);
          if(res.data=='success'){
              this.$store.commit({
                  type:'deletestudent',
                  student:this.deletedata
              })
          }
      })
      this.$store.commit({
        type: "deletestudent",
        student: this.deletedata
      });

      this.$message({
        type: "success",
        message: "删除成功！"
      });
    }
  }
};
</script>

<style>
</style>