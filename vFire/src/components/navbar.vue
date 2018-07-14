<template>
    <div class="nav">
      <h2>GoodHardPlayHard</h2>
      <a v-if="isLogged"><router-link to="/">Home</router-link></a>
      <a class="log"  v-if="!isLogged"><router-link to="/login">Login</router-link></a>
      <a class="log" v-if="!isLogged"><router-link to="/register">Register</router-link></a>
      <a v-if="isLogged" style="background: none;float: right"><button v-on:click="logout"><i class="material-icons">input</i></button></a>
    </div>
</template>

<script>
    import firebase from 'firebase'
    export default {
        name: "navbar",
        data(){
          return{
            isLogged:false,
            current:false
          }
        },
      methods:{
          logout:function () {
            firebase.auth().signOut().then(()=>{
              this.$router.go({ path:this.$router.push('/login') })
            });
          }
      },
      created(){
          if(firebase.auth().currentUser){
            this.isLogged = true;
            this.current = firebase.auth().currentUser.email
          }
      }
    }
</script>

<style scoped>
  .nav{
    width: 100%;
    background-color:#31415b;
    color:white;
    box-sizing:border-box;
    padding:5px;
    font-family: 'Quicksand', sans-serif;
    text-align:center;
  }
  a{
    font-family: 'Quicksand', sans-serif;
    font-size: 16px;
    color:#31415b;
    text-decoration: none;
    padding: 5px 20px;
    background-color: white;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    font-weight: bold;
  }
  button{
    border:none;
    background-color: transparent;
    outline: none;
    color:#31415b;
     font-family: 'Quicksand', sans-serif;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
  i{
    position: relative;
    top:-10px;
    color:white
  }
</style>
