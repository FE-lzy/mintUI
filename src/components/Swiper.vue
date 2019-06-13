<template>
    <div class="swiper">
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in swiper"><img :src="item.url" /></mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    name:'swiper',
    props:{
        swiper:Array
    }
}
</script>
