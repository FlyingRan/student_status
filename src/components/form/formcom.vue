<template>
  <el-form :model="data" class="demo-form-inline" ref="data">
    <el-form-item label="学生学号" prop="id">
      <el-input v-model="data.id" placeholder="请输入学号"></el-input>
    </el-form-item>
    <el-form-item label="学生姓名" prop="name">
      <el-input v-model="data.name" placeholder="请输入姓名"></el-input>
    </el-form-item>
    <el-form-item label="学生身份证号" prop="ecard">
      <el-input v-model="data.ecard" placeholder="请输入身份证号"></el-input>
    </el-form-item>
    <el-form-item label="所属学院" prop="college">
      <el-select v-model="data.college" placeholder="请选择所属学院">
        <el-option label="计算机与通信学院" value="computer"></el-option>
        <el-option label="外国语学院" value="language"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="专业班级" prop="class">
      <el-input v-model="data.class" placeholder="请输入专业班级（eg. 软件工程1802）"></el-input>
    </el-form-item>
    <el-form-item label="入学年份" prop="inyear">
      <el-select v-model="data.inyear" placeholder="请选择入学年份">
        <el-option label="2020" value="2020"></el-option>
        <el-option label="2019" value="2019"></el-option>
        <el-option label="2018" value="2018"></el-option>
        <el-option label="2017" value="2017"></el-option>
        <el-option label="2016" value="2016"></el-option>
        <el-option label="2015" value="2015"></el-option>
      </el-select>
    </el-form-item>
    <slot></slot>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      data: {
        id: "",
        name: "",
        ecard: "",
        college: "",
        class: "",
        inyear: ""
      }
    };
  }
};
</script>

<style>
</style>