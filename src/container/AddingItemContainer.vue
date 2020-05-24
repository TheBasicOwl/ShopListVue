<template>
    <div class="Modal" v-bind:class="{open: IsOpen}">
        <div class="Header CursorPointer" @click="IsOpen = !IsOpen">
            <span class="center">+</span>
        </div>
        <div class="Content">
            <p>What to Buy</p>
            <input style="width: 100%" type="text" placeholder="What to buy" v-model="Input.name"/>
            <p>Price</p>
            <input style="width: 100%" type="text" placeholder="Price" v-model="Input.price"/>
            <p>Amout</p>
            <input style="width: 100%" type="number" placeholder="Amout" v-model="Input.amount"/>
            <button style="width: 100%; margin: 1em 0px 0px 0px;" v-on:click='Submit'>Add</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            IsOpen: false,
            Input: {
                name: 'Milk',
                price: '22 DKK',
                amount: 6,
            }
        }
    },
    methods: {
        ResetForum() {
            this.Input.name = 'Milk';
            this.Input.price = '22 DKK';
            this.Input.amount = 6;
        },
        Submit() {
            this.$emit('OnAdd', {
                name: this.Input.name,
                price: this.Input.price, 
                amount: this.Input.amount
            });

            this.ResetForum();

            this.IsOpen = false;
        }
    }
}
</script>

<style>

</style>