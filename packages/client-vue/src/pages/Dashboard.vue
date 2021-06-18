<template>
<el-container>
<el-aside width="400px"><Calender/></el-aside>
<el-container>
  <el-header>Header</el-header>
  <el-main><Ledger /></el-main>
  <el-footer>Footer</el-footer>
</el-container>
</el-container>
</template>

<script>
import Calender from "@/components/Calender";
import Ledger from "@/components/Ledger";
export default {
  components: {Calender, Ledger}
}
</script>