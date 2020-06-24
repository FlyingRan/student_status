<template>
  <div class="containers">
    <div class="box">
      <div class="chart" ref="chart1"></div>
    </div>
    <div class="box">
      <div class="chart" ref="chart2"></div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            person:[],
            pulishmentperson:[]
        }
    },
  methods: {
    drawchart1() {
      var myChart = this.$echarts.init(this.$refs.chart1);
      //   console.log(this.searchdata);
      myChart.setOption({
        title: {
          text: "全校人数占比"
        },
        tooltip: {},
        xAxis: {
          data: ["计通", "机械", "电气", "外国语", "管理"]
        },
        yAxis: {},
        series: [
          {
            name: "人数",
            type: "bar",
            data: this.person
          }
        ]
      });
    },
    drawchart2() {
      var myChart = this.$echarts.init(this.$refs.chart2,'light');
      //   console.log(this.searchdata);
      myChart.setOption({
        title: {
          text: "处分人数占比"
        },
        tooltip: {},
        xAxis: {
          data: ["计通", "机械", "电气", "外国语", "管理"]
        },
        yAxis: {},
        series: [
          {
            name: "处分人数",
            type: "bar",
            data: this.pulishmentperson
          }
        ]
      });
    },
  },
  mounted(){
      let p1 = this.$store.state.realresults.filter( n => n.college == '计算机与通信学院').length;
      let p2 = this.$store.state.realresults.filter( n => n.college == '机械学院').length;
      let p3 = this.$store.state.realresults.filter( n => n.college == '电气学院').length;
      let p4 = this.$store.state.realresults.filter( n => n.college == '外国语学院').length;
      let p5 = this.$store.state.realresults.filter( n => n.college == '管理学院').length;
      let c1 = this.$store.state.realresults.filter( n => n.college == '计算机与通信学院' && n.pulishment !='0' && n.pulishment!='有过处分，已撤销').length;
      let c2 = this.$store.state.realresults.filter( n => n.college == '机械学院' && n.pulishment !='0' && n.pulishment!='有过处分，已撤销').length;
      let c3 = this.$store.state.realresults.filter( n => n.college == '电气学院' && n.pulishment !='0' && n.pulishment!='有过处分，已撤销').length;
      let c4 = this.$store.state.realresults.filter( n => n.college == '外国语学院' && n.pulishment !='0' && n.pulishment!='有过处分，已撤销').length;
      let c5 = this.$store.state.realresults.filter( n => n.college == '管理学院' && n.pulishment !='0' && n.pulishment!='有过处分，已撤销').length;
      

      console.log(c1,c2);
      this.person=[]
      this.pulishmentperson=[]
      console.log(this.$store.state.realresults);
      
      this.person.push(p1,p2,p3,p4,p5)
      this.pulishmentperson.push(c1,c2,c3,c4,c5)
      console.log(this.person,this.pulishmentperson);
      
      this.drawchart1();
      this.drawchart2();
  }
};
</script>

<style>
.containers {
  width: 1200px;
  border: 1px solid #eef;
  height: 600px;
  margin-left: 50px;
  font-size: 15px;
  font-weight: 100;
}
.box {
  border: 1px solid #eee;
  width: 450px;
  height: 550px;
  float: left;
  margin-left: 90px;
  margin-top: 50px;
}
.chart {
  width: 400px;
  height: 500px;
  margin-top: 30px;
  margin-left: 22px;
  border: 1px solid #eee;
}
</style>