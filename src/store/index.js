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
    pulishment:''
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
    changeusername(state,payload){
      state.username=payload.username;
    },
    changepassword(state,payload){
      state.password=payload.password;
    }
  },
  actions: {
  },
  modules: {
  }
})
