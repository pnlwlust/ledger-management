
<template>
  <el-card class="box-card login-card">
  <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="120px" >
    <el-form-item label="Username" prop="username">
      <el-input type="username" v-model="loginForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="pass">
      <el-input type="password" v-model="loginForm.pass" autocomplete="off"></el-input>
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
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else {
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the username again'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: '',
        pass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ]
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
