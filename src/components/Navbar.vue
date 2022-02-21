<template>
    <div>
        <div id="navbar">
            <div class="first">
                <img src="@/assets/img/cloudtravel-logo.png" alt="">
            </div>
            <div class="second">
                <div>English <font-awesome-icon icon="caret-down" class="icon" /></div>
                <div>USD <font-awesome-icon icon="caret-down" class="icon" /></div>
                <div>My Account</div>
                <div>Log out</div>
            </div>
        </div>
        <SearchBar />
    </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'

export default {
    components : {
        SearchBar
    }
}
</script>

<style scoped>
    #navbar{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: white;
        height: 61px;
        padding: 0 90px 0 90px;
        font-size: 14px;
        font-weight: 400;
    }
    #navbar .second{
        display: flex;
    }
    #navbar .second div{
        margin-left: 20px;
        cursor: pointer;
    }
    #navbar .second div:hover{
        color: #a5a5a5;
    }
    .icon{
        font-size: 12px;
        margin-left: 3px;
    }
</style>