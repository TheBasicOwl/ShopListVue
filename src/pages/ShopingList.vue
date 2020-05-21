<template>
  <div id="app">
    <div id="Input">
      <p>What to Buy</p>
      <input style="width: 100%" type="text" placeholder="What to buy" v-model="Input.name" />
      <p>Price</p>
      <input style="width: 100%" type="text" placeholder="Price" v-model="Input.price" />
      <p>Amout</p>
      <input style="width: 100%" type="number" placeholder="Amout" v-model="Input.amout" />
      <button style="width: 100%; margin: 1em 0px 0px 0px;" v-on:click="AddShopList">Add</button>
    </div>
    <div id="Items">
      <h3>Shop Items</h3>
      <ShopItem
        v-for="item in shoplists"
        v-bind:shopitem="item"
        v-bind:key="item.id"
        v-on:EditShopItem="SaveShopList"
        v-on:deleteshop="DeleteShopList"
      />
    </div>
  </div>
</template>

<script>
import ShopItem from "../components/shopitem.vue";

export default {
  name: "App",
  data() {
    return {
      name: "",
      nextnum: 0,
      Input: {
        name: "",
        amout: 0,
        price: 0
      },
      shoplists: []
    };
  },
  mounted() {
    this.updateList();
  },
  methods: {
    updateList() {
      this.name = this.$route.params.listname;
      this.shoplists = [];
      if (localStorage.getItem(`${this.name}-list`)) {
        try {
          this.shoplists = JSON.parse(
            localStorage.getItem(`${this.name}-list`)
          );
          this.nextnum = this.shoplists[this.shoplists.length - 1].id;
        } catch (e) {
          localStorage.removeItem(`${this.name}-list`);
        }
      }
    },
    AddShopList() {
      this.nextnum += 1;
      const shop = {
        name: this.Input.name,
        amout: this.Input.amout,
        price: this.Input.price,
        done: false
      };
      shop.id = this.nextnum;
      this.shoplists.push(shop);

      // Reset Input values
      this.Input.name = "";
      this.Input.amout = 0;
      this.Input.price = 0;

      this.SaveShopList();
    },
    DeleteShopList(shopitem) {
      this.shoplists.splice(this.shoplists.indexOf(shopitem), 1);
      this.nextnum = this.shoplists[this.shoplists.length - 1].id;
      this.SaveShopList();
    },
    SaveShopList() {
      const parsed = JSON.stringify(this.shoplists);
      localStorage.setItem(`${this.name}-list`, parsed);
      this.$root.$children[0].updateLinks();
    }
  },
  watch: {
    $route(to, from) {
      this.updateList();
    }
  },
  components: {
    ShopItem
  }
};
</script>

<style>
</style>
