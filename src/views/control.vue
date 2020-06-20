<template>
  <div>
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item>
        <img src="@assets/img/school3.png" width="100%" height="100%" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="@assets/img/school4.png" width="100%" height="100%" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="@assets/img/school1.jpg" width="100%" height="100%" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="@assets/img/school2.jpg" width="100%" height="100%" />
      </el-carousel-item>
    </el-carousel>
    <p align="center" style="font-size:70px;color:#eeb">学生学籍管理系统</p>
  </div>
</template>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>