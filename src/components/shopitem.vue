<template>
    <div class="shopitem">
      <div v-if="!isEditing" style="display: flex; margin: 0.1em">
        <input type="checkbox" @change="updatecheck"  v-model="shopitem.done">
        <p :class="{linethrough: shopitem.done}" style="margin: 0 0.3em 0 0">
          {{shopitem.amout}}x {{shopitem.name}}, {{shopitem.price}}
        </p>
        <a href="javascipt:void();" v-on:click="isEditing = true">(Edit)</a>
        <a href="javascipt:void()" v-on:click="$emit('deleteshop', shopitem)">(Delete)</a>
      </div>
      <div v-if="isEditing" style="display: flex; margin: 0.1em">
        <input v-model="shopitem.name" type="text"/>
        <input v-model="shopitem.price" type="text"/>
        <input v-model="shopitem.amout" type="number"/>
        <a href="javascipt:void()" v-on:click="isEditing = false; $emit('EditShopItem')">
          (Confirm)
        </a>
      </div>
    </div>
</template>

<script>
export default {
  props: ['shopitem'],
  data() {
    return {
      isEditing: false,
    };
  },
  methods: {
    updatecheck() {
      this.$emit('EditShopItem');
    }
  },
};
</script>

<style>
  a, p {
    margin: 0 0.2em;
  }
  .linethrough { text-decoration: line-through; }
</style>
