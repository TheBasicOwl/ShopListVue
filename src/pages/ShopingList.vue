<template>
  <div id="app">
    <h2>{{$route.params.listname}}</h2>
    <h3>Shop Items</h3>
    <div id="ShopList">
      <ShopItem
        v-for="item in shoplists" 
        v-bind:shopitem="item"
        v-bind:key="item.id"
        v-on:EditShopItem="SaveShopList"
        v-on:deleteshop="DeleteShopList"
      />
    </div>
    <adding-item-container @OnAdd="AddShopList"/>
  </div>
</template>

<script>
import ShopItem from '../components/shopitem.vue';
import AddingItemContainer from '../container/AddingItemContainer.vue'

export default {
  name: 'App',
  data() {
    return {
      name: '',
      nextnum: 0,
      Input: {
        name: '',
        amout: 0,
        price: 0,
      },
      shoplists: [],
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
          this.shoplists = JSON.parse(localStorage.getItem(`${this.name}-list`));
          this.nextnum = this.shoplists[this.shoplists.length - 1].id;
        } catch (e) {
          localStorage.removeItem(`${this.name}-list`);
        }
      }
    },
    AddShopList(e) {
      console.log(e);
      this.nextnum += 1;
      const shop = {
        name: e.name,
        amout: e.amount,
        price: e.price,
        done: false,
      };
      shop.id = this.nextnum;
      this.shoplists.push(shop);

      // Reset Input values
      this.Input.name = '';
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
    },
  },
  watch: {
    $route (to, from){
      this.updateList();
    }
  },
  components: {
    ShopItem,
    AddingItemContainer,
  },
};
</script>

<style>
</style>
