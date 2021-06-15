<template>
<el-container>
<el-aside width="400px"><Calender/></el-aside>
<el-container>
  <el-header>Header</el-header>
  <el-main>Main</el-main>
  <el-footer>Footer</el-footer>
</el-container>
</el-container>
</template>

<script>
import Calender from "@/components/Calender";
export default {
  components: {Calender}
}
</script>