<template>
    <div>
      <navbar></navbar>
      <hello></hello>
       <div v-if="take">
      <div class="cover">
      <div class="authentication">
        <form action="" @submit.prevent="saveEmployee">
          <div class="covering">
            <input type="text" v-model="name" required id="name">
            <label for="name">Name</label>
          </div>
          <div class="covering">
            <input type="text" v-model="position" required id="position">
            <label for="position">Position(director)</label>
          </div>
          <div class="covering">
            <input type="text" v-model="profession" required id="profession">
            <label for="profession">Profession</label>
          </div>
          <button type="submit">Create</button>
          <span class="cancel"><router-link to="/">cancel</router-link></span>
        </form>
        {{ current }}
      </div>
     </div>
    </div>

    </div>
</template>

<script>
  import db from './firebaseinit'
  import navbar from './navbar'
  import hello from './HelloWorld'
    export default {
      props:['take'],
      data(){
          return{
            name:null,
            position:null,
            profession:null
          }
      },
       methods:{
        saveEmployee(){
          db.collection('workers').add({
            name:this.name,
            position:this.position,
            profession:this.profession
          })
            .then(docRef => this.$router.push('/users'))
            .catch(error => console.log(err))
        },
      },
    }
</script>

<style scoped>
  .cover{
    position: fixed;
    text-align: center;
    background-color: rgba(0,0,0,0.6);
    width: 100%;
    height: 100%;
    left:0px;
    top:0px;
    bottom:0px;
    right: 0px;
    z-index: 1001;
  }
  .authentication{
    width: 30%;
    height: 100%;
    background-color: white;
    padding: 20px;
    animation: moi 0.6s ;
    position: absolute;
    left:0px;
  }
  .covering{
    padding: 10px;
    position: relative;
    font-family: 'Quicksand', sans-serif;
  }
  input[type=text]{
    width: 70%;
    padding: 10px;
    border:none;
    border-bottom: 1px solid gray;
    outline:none;
    transition: 0.3s all;
  }
  label{
    position: absolute;
    left:50px;
    top:15px;
    padding: 5px;
    transition: 0.3s all;
  }
  input[type=text]:focus+label{
    font-size: 12px;
    top:-5px;
    color:#2f85bf
  }
  input[type=text]:valid+label{
    font-size: 12px;
    top:-5px;
  }
  input[type=text]:focus{
    border-bottom: 1px solid #2f85bf;
  }
  button[type=submit]{
    padding: 7px 13px;
    background-color: #2f85bf;
    color:white;
    border:none;
    cursor: pointer;
    font-family: 'Quicksand',sans-serif;
  }
  .cancel{
    padding: 6px 13px;
    position: relative;
    top:1px;
    background-color: #bf2f57;
    color:white;
    border:none;
    cursor: pointer;
    font-family: 'Quicksand',sans-serif;
    text-decoration: none;
  }
  a{
    text-decoration: none;
    color:white
  }
  @keyframes moi {
    from{
      left:-200px;
    }
    to{
      left: 0px;
    }
  }
</style>
