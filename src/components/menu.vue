<template>
  <div id="menu">
    <p class="navIcon" @click="open = true">☰</p>
    <h2>{{$route.params.listname}}</h2>
    <nav :class="{open: open}">
      <router-link v-for="shop in shops" v-bind:key="shop" :to="'/list/' + shop">
        <p @click="open = false">{{shop}}</p>
      </router-link>
      <router-link to="/about">
        <p @click="open = false">About</p>
      </router-link>
      <a href="javascript:void(0);" @click="$emit('addList')">[+]</a>
      <a href="javascript:void(0);" @click="open = false">Close</a>
    </nav>
  </div>
</template>

<script>
export default {
  name: "menu",
  props: ["shops"],
  data() {
    return {
      open: false
    };
  }
};
</script>

<style>
</style>