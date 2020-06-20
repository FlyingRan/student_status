import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    identity:'',
    username:'',
    password:'',
    realname:'',
    sex:'',
    college:'',
    major_class:'',
    ecard:'',
    inyear:'',
    state:'',
    pulishment:'',
    realresults:[]
  },
  mutations: {
    changeuser(state,payload){
      // console.log(payload.identity);
      state.identity=payload.identity;
      state.username=payload.data.sid;
      state.password=payload.data.password;
      state.realname=payload.data.name;
      state.sex=payload.data.sex;
      state.college=payload.data.college;
      state.major_class=payload.data.major_class;
      state.ecard=payload.data.ecard;
      state.inyear=payload.data.inyear;
      state.state=payload.data.state;
      state.pulishment=payload.data.pulishment;
      // console.log(state.identity);
      // console.log(state.username);
    },
    commitresults(state,payload){
      for(let i=0;i<payload.realresults.length;i++){
        state.realresults.push(payload.realresults[i]);
      }
    },
    addstudent(state,payload){
      state.realresults.push(payload.student);
    },
    deletestudent(state,payload){
      for(let i=0;i<state.realresults.length;i++){
        if(state.realresults[i].sid == payload.student.sid){
          // console.log(payload.student.sid);
          // console.log(payload.student.name)
          console.log(state.realresults);
          
          Vue.delete(state.realresults,i)

          console.log(state.realresults);
          
          // state.realresults.splice(i,1);
          // console.log(state.realresults[i-1]);
          break;
        }
      }
    },
    updatastudent(state,payload){
      state.realresults[payload.index]=payload.msg;
    }
  },
  actions: {
  },
  modules: {
  }

})
