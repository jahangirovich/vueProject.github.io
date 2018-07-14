<template>
  <div id="app">
    <div class="users">
      <ul>
        <li v-for="employee in employees" v-bind:key="employee.id" v-if="filter_user">
          <router-link v-bind:to="{name:'list', params:{name:employee.name}}">
          <div class="padding">
            <span class="profession">{{ employee.profession }}</span>
            <span>{{ employee.name }}</span>
          </div>
          </router-link>
        </li>
      </ul>
      <div class="preloader" v-show="loading">
        <div class="preload">
        </div>
      </div>
    </div>
    <div class="circle" @click="take = !take">
      <i class="fa fa-plus"></i>
    </div>
    <div class="show" v-if="has">
      <p>Sorry please add Employees</p>
    </div>
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
          <span class="cancel" @click="pushit()">cancel</span>
        </form>
        {{ current }}
      </div>
     </div>
    </div>
  </div>
</template>

<script>
  import db from './firebaseinit'
  import add from './add'
  import firebase from 'firebase'

  export default {
    components:{
      'add':add
    },
  name: 'HelloWorld',
  data () {
    return {
      employees:[],
      loading:true,
      name:null,
      position:null,
      profession:null,
      take:false,
      current:'',
      isLogged:false,
      filter_user:true,
      has:false
    }
  },
  created(){
    db.collection('workers').get().then(
      querySnapshot =>{
        querySnapshot.forEach(doc => {
          this.loading = false;
          const data = {
            'id':doc.id,
            'name':doc.data().name,
            'position':doc.data().position,
            'profession':doc.data().profession,
            'user':doc.data().user
          };
          if(data.user == this.current){
            this.employees.push(data);
            this.has = false
          }
          else{
            this.has = true
          }
        })
      }
    );

    this.current = firebase.auth().currentUser.email;
  },
  methods:{
      saveEmployee(){
          db.collection('workers').add({
            name:this.name,
            position:this.position,
            profession:this.profession,
            user:this.current
          })
            .then(docRef => this.$router.push('/'))
            .catch(error => console.log(err));
            this.take = false
        },
      pushit(){
        this.take = false
      },
  },
    filters:{

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app{
  box-sizing: border-box;
  padding: 20px;
}
  .circle{
    display: inline-block;
    padding: 15px;
    background-color: #31415b;
    color:white;
    border-radius: 50%;
    box-shadow: 0 10px 6px -6px #777;
    font-size: 18px;
    cursor: pointer;
    position: fixed;
    bottom: 50px;
    right: 50px;
  }
  .padding{
    padding: 10px;
  }
  .profession{
    padding: 5px;
    border-radius: 20px;
    color:gray;
    font-size: 13px;
    background-color:#efefef ;
  }
  .users{
    padding: 50px 20px;
    width: 50%;
    margin: 0 auto;
  }
  .users ul li{
    padding: 10px;
    list-style-type: none;

  }
  .users ul li .padding{
    list-style-type: none;
    font-family: 'Quicksand', sans-serif;
    box-shadow: 0 0 10px rgba(0,0,0,0.2 );
    cursor: pointer;
    transition: 0.3s all;
    z-index: 1;
    padding: 20px;
    position: relative;
  }
  .users ul li .padding:hover{
    background-color: #efefef;
  }
  .users ul{
    padding: 10px;

  }
  .prealoader{
    text-align: center;
  }
  .preload{
    margin:0 auto;
    width: 40px;
    border-radius: 50%;
    height: 40px;
    border:10px solid lightgray;
    border-top-color:#31415b;
    transform: translate(-50%,-50%);
    animation: 1s me infinite;
  }
  @keyframes me{
    from{
      transform: rotate(360deg);
    }
    to{
      transform: rotate(0deg);
    }
  }
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
    width: 20%;
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
    color:#31415b;
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
