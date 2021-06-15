<template>
  <el-container style="">
      <Login @loggedIn="isLoggedIn" v-if="!loggedIn"/>
      <Dashboard v-else/>
  </el-container>
</template>
<script>

import Login from "@/components/Login";
import Dashboard from "@/pages/Dashboard";

export default {
  name: 'Home',
  data() {
    return {
      loggedIn: false
      }
  },
  components: {
    Dashboard,
    Login
  },
  methods:{
    isLoggedIn(value){
     this.loggedIn = value;
    }
  }
}
</script>