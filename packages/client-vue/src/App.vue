<template>
  <el-container style="">
    <el-main>
      <Login/>
    </el-main>
  </el-container>
</template>

<script>
import Login from "@/components/Login";

export default {
  name: 'App',
  components: {
    Login
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
