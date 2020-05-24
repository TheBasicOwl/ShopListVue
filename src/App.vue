<template>
  <div> 
    <router-link 
    v-for="shop in shops"
    v-bind:key="shop"
    :to="'/list/' + shop"
    >{{shop}}</router-link>
    <a href="javascript:void(0)" @click="AddList">[+]</a>
    <router-link to="/about">About</router-link>
    <router-view></router-view> 
  </div>
</template>

<script>
import './app.css'

export default {
  name: 'App',
  data() {
    return {
      shops: [],
    }
  },
  methods: {
    updateLinks() {
      this.shops = [];
      for ( var i = 0, len = localStorage.length; i < len; ++i ) {
        if(localStorage.key(i).endsWith('-list'))
        {
          var key = localStorage.key(i);
          var name = key.substring(0, key.lastIndexOf('-'));
          this.shops.push(name);
        }
      }
    },
    AddList() {
        var name = prompt("Please enter your list name");
        if(name != null)
        {
          this.$router.push(`/list/${name}`);
        }
    }
  },
  mounted() {
    this.updateLinks();
  },
};
</script>
