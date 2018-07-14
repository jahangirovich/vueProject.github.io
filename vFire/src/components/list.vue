<template>
    <div id="app">
        <div class="into">
          <p>
            <span class="state">Name:</span>
            <span class="unique">{{ name }}</span>
          </p>
          <p>
            <span class="state">Position:</span>
            <span class="unique">{{ position }}</span>
          </p>
          <p>
            <span class="state">Profession:</span>
            <span class="unique">{{ profession }}</span>
          </p>
          <button class="cancel"><router-link to="/">Cancel</router-link></button>
          <button class="delete" @click="removeIt()">Delete</button>
        </div>
        <div class="preloader" v-show="loading">
          <div class="preload">
          </div>
        </div>
    </div>
</template>

<script>
    import db from './firebaseinit'
    export default {
        name: "list",
        data(){
          return{
            name:null,
            position:null,
            profession:null,
            loading:false,
          }
        },
        beforeRouteEnter(to,from,next){
          db.collection('workers').where('name','==',to.params.name).get()
            .then(querySnapshot=>{
              querySnapshot.forEach(doc => {
                next(vm => {
                  vm.name = doc.data().name
                  vm.position = doc.data().position
                  vm.profession = doc.data().profession
                })
              })
            })
        },
        watch:{
          '$route':'$fetchData'
        },
        created:{
          fetchData () {
            db.collection('workers').where('name','==',this.$route.params.name).get()
              .then(querySnapshot=>{
                querySnapshot.forEach(
                  doc=>{
                    this.name = doc.data().name
                    this.position = doc.data().position
                    this.profession = doc.data().profession
                  }
                )
              })
          }
        },
        methods:{
          removeIt(){
            db.collection('workers').where('name','==',this.$route.params.name).get()
              .then(querySnapshot => {
                querySnapshot.forEach(
                  doc =>{
                    doc.ref.delete();
                    this.$router.push('/')
                  }
                )
              })
          }
        }
    }
</script>

<style scoped>
  #app{
    width: 50%;
    margin: 0 auto;
    padding:20px;
    font-family: 'Quicksand',sans-serif;
  }
  a{
    text-decoration: none;
    color:black;
  }
  .state{
    border-radius: 10px;
    background-color: #efefef;
    color:gray;
    padding: 5px;
    font-size:14px;
  }
  .unique{
    padding: 0px 10px;
  }
  .cancel{
    padding: 10px 15px;
    border-radius: 3px;
    background-color: #efefef;
    color:gray;
    border:none;
    cursor: pointer;
    font-family: 'Quicksand',sans-serif;
  }
  .delete{
    padding: 10px 15px;
    border-radius: 3px;
    background-color: #cc2446;
    color:white;
    border:none;
    font-family: 'Quicksand',sans-serif;
    cursor: pointer;
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
</style>
