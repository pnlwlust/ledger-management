
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
      <el-form-item label="Item Description" prop="itemDescription">
        <el-input type="text" v-model="newRecordForm.itemDescription" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Item Price Code" prop="priceCode">
        <el-input type="text" v-model="newRecordForm.priceCode" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Sell Price" prop="sellPrice">
        <el-input type="number" v-model="newRecordForm.sellPrice" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Category" prop="itemCategory">
        <el-select v-model="newRecordForm.category" placeholder="Select">
          <el-option
              v-for="item in newRecordForm.categories"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('newRecordForm')">Submit</el-button>
        <el-button @click="resetForm('newRecordForm')">Reset</el-button>
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
        itemDescription: '',
        priceCode: '',
        sellPrice: '',
        category:'',
        categories:[{value:'', label:''}]
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
