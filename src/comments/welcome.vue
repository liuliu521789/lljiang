<template>
    <div class="bac">
        <div class="cover"></div>
        <div class="font">Hey,bro. Welcome!</div>
    </div>
</template>
<script></script>
export default {
    
}
</script>
<style lang="less" scoped>
.bac{
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    background: url(../assets/timg.png);
    background-size: 100% 100%; 
   
    .cover{
        position: absolute;
        top:0;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.5;
    }
    .font{
         position: absolute;
        top:0;
        width: 100%;
        height: 100%;
         font-size: 100px;
    color: #fff;
    text-align: center;
    line-height: 700px;
        opacity: 0.7;

    }
}
</style>