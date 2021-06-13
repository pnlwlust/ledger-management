
<template>
  <el-card class="box-card new-record-card">
    <el-form :model="newRecordForm" status-icon :rules="rules" ref="newRecordForm" label-width="120px" >
      <el-form-item label="Date" prop="date">
        <el-input type="date" v-model="newRecordForm.date" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Item Code" prop="itemCode">
        <el-input type="input" v-model="newRecordForm.itemCode" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Item Name" prop="itemName">
        <el-input type="text" v-model="newRecordForm.itemName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Item Price Code" prop="priceCode">
        <el-input type="password" v-model="newRecordForm.priceCode" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Sell Price" prop="sellPrice">
        <el-input type="password" v-model="newRecordForm.sellPrice" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">Submit</el-button>
        <el-button @click="resetForm('loginForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'NewRecord',
  data() {
    return {
      newRecordForm: {
        date: '',
        itemCode: '',
        itemName: '',
        priceCode: '',
        sellPrice: '',
      },
      rules: {
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style>

.login-card{
  width: 500px;
  margin: 0 auto;
}
</style>
