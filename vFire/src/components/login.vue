<template>
  <div id="me">
    <div class="login">
      <p class="top">Login Form</p>
      <form action="">
        <p>
          <input type="text" id="text" required v-model="email">
          <label for="text">Email</label>
        </p>
        <p>
          <input type="password" id="password" required v-model="password">
          <label for="password">Password</label>
        </p>
        <button type="submit" @click="login">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
    export default {
        name: "login",
        data:function(){
          return{
            email:'',
            password:''
          }
        },
        methods:{
          login:function(e) {
            firebase.auth().signInWithEmailAndPassword(this.email,this.password)
              .then(
                user => {
                  alert('Succesfully Login');
                  this.$router.go({ path:this.$router.push('/') })
                },
                err => {
                  alert(err.message)
                },
              )
            e.preventDefault()
          }
        }

    }
</script>

<style scoped>
  #me{
    text-align: center;
    box-sizing: border-box;
    padding: 50px 0px;
  }
  .top{
    font-family: 'Quicksand',sans-serif;
    font-size: 20px;
    font-weight: bold;
    color:#31415b
  }
  .login{
    width: 30%;
    margin: 0 auto;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    padding: 20px;
  }
  p{
    position: relative;
  }
  input{
    width: 100%;
    padding: 10px;
    outline:none;
    box-sizing: border-box;
    border:none;
    border-bottom: 1px solid black;
    transition: 0.5s all;
    z-index: 1001;
  }
  input:focus{
    border-bottom:1px solid #00aced;
  }
  input:focus + label{
    left:0px;
    top:-8px;
    font-size: 10px;
    color:#00aced;
    z-index: 0;
  }
  input:valid + label{
    left:0px;
    top:-8px;
    font-size: 10px;
    color:#00aced;
    z-index: 0;
  }
  label{
    position: absolute;
    left:10px;
    top:10px;
    z-index: 2;
    font-family: 'Quicksand',sans-serif;
    transition: 0.2s all;
  }
  button{
    padding: 11px 20px;
    border:none;
    background-color: #31415b;
    color:white;
    font-family: 'Quicksand',sans-serif;
    cursor: pointer;
    font-size: 15px;
    transition: 0.5s all;
    border:1px solid #31415b;
  }
  button:hover{
    background-color: white;
    color:#31415b;
    border:1px solid #31415b;
  }
</style>
