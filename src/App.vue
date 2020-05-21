<template>
  <div>
    <Menu :shops="shops" @addList="AddList" />
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from "./components/menu.vue";

export default {
  name: "App",
  data() {
    return {
      shops: []
    };
  },
  methods: {
    updateLinks() {
      this.shops = [];
      for (var i = 0, len = localStorage.length; i < len; ++i) {
        if (localStorage.key(i).endsWith("-list")) {
          var key = localStorage.key(i);
          var name = key.substring(0, key.lastIndexOf("-"));
          this.shops.push(name);
        }
      }
    },
    AddList() {
      var name = prompt("Please enter your list name");
      if (name != null) {
        this.$router.push(`/list/${name}`);
      }
    }
  },
  components: {
    Menu
  },
  mounted() {
    this.updateLinks();
  }
};
</script>
