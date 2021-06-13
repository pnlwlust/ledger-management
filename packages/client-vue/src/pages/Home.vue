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
  name: 'Home',
  components: {
    Login
  }
}
</script>