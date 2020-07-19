<template>
  <div>
      <el-dialog
        title="提示"
        :visible.sync="advicevisible"
        center
        :close-on-press-escape="false"
        :show-close="false"
        :close-on-click-modal=false
      >
        <h3>检测到你的密码为初始密码，是否前往修改密码，以保证账号的安全?</h3>
        <div slot="footer" class="dialog-footer">
            <el-checkbox v-model="checked">下次不再提醒</el-checkbox>
          <el-button @click="cancel">取 消</el-button>
          <el-button @click="confirm">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
export default {
    data(){
        return{
        checked:false
        }
    },
    props:['advicevisible'],
    methods:{
        cancel(){
            this.$emit('adviceclose',!this.advicevisible)
            if(this.checked){
                this.changestate();
            }
        },
        confirm(){
            this.$emit('confirmadvice',!this.advicevisible)
            if(this.checked){
                this.changestate();
            }
        },
        changestate(){
            this.$axios.get('/api/changeState',{
                params:{
                    sid:this.$store.state.username,
                }
            }).then( res => {
                console.log(res.data);
            }).catch( err => {
                console.log(err);
            })
        }
    }
}
</script>

<style>

</style>