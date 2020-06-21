<template>
  <div class="container">
    <div class="header">
      <el-form status-icon label-width="200px" class="demo-ruleForm">
        <el-form-item>
          <el-select placeholder="请选择计算的范围" v-model="searchdata" clearable>
            <el-option label="全校" value="全校"></el-option>
            <el-option label="计算机与通信学院" value="计算机与通信学院"></el-option>
            <el-option label="外国语学院" value="外国语学院"></el-option>
            <el-option label="机械学院" value="机械学院"></el-option>
            <el-option label="电气学院" value="电气学院"></el-option>
            <el-option label="管理学院" value="管理学院"></el-option>
          </el-select>
          <el-button type="primary" @click="startdraw">计算</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="charts" id="chart" ref="chart"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchdata: "全校",
      sexarr: []
    };
  },
  methods: {
    drawchart() {
      var myChart = this.$echarts.init(this.$refs.chart);
      //   console.log(this.searchdata);
      // 绘制图表
      myChart.setOption({
        title: {
          text: "男女比例",
          left:'center'
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
        // orient: 'vertical',
        // top: 'middle',
        bottom: 10,
        left: 'center',
        data: ['男', '女']
    },
        center: ["50%", "50%"],
        radius: 35,
        series: [
          {
            name: "性别",
            type: "pie",
            data: [
              { name: "male", value: this.sexarr[0] },
              { name: "female", value: this.sexarr[1] }
            ]
          }
        ]
      });
    },
    startdraw() {
      // console.log(this.searchdata);
      var male = [],
        female = [];
      if (this.searchdata != "全校") {
        male = this.$store.state.realresults.filter(
          n => n.sex == "男" && n.college == this.searchdata
        );
        female = this.$store.state.realresults.filter(
          n => n.sex == "女" && n.college == this.searchdata
        );
      } else {
        male = this.$store.state.realresults.filter(n => n.sex == "男");
        female = this.$store.state.realresults.filter(n => n.sex == "女");
      }
      // console.log(male.length);
      this.sexarr = [];
      this.sexarr.push(male.length);
      this.sexarr.push(female.length);
      console.log(this.sexarr);

      this.drawchart();
    }
  },
  mounted() {
    this.startdraw();
  }
};
</script>

<style>
.charts {
  width: 700px;
  height: 500px;
  border: 1px solid #eee;
  margin-left: 300px;
  margin-top: 70px;
}

.header {
  margin-left: 300px;
}
</style>