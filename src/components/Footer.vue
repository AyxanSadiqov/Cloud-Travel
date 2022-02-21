<template>
    <div id="footer">
        <!-- BACK TO TOP BUTTON AND PAGINATION -->
        <div class="flex">
            <div class="left"></div>
            <div class="right">
                <div class="back-to-top" @click="backToTop">Back to top</div>
                <div><Pagination /></div>
            </div>
        </div>

        <!-- FOOTER -->
        <div class="top">
            <div>FAQ</div>
            <div>Terms of use</div>
            <div>Privacy policy</div>
            <div>Contact us</div>
        </div>
        <div class="bottom">
            Copyright CloudTravel 2021.
        </div>
    </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
    components : {
        Pagination
    },
    methods : {
        backToTop(){
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }
}
</script>

<style scoped>
    #footer{
        width: 100%;
        margin-top: 4%;
    }
    #footer .top{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 70px;
        background: #333;
    }
    #footer .top div{
        font-size: 14px;
        color: white;
        margin: 0 10px;
        cursor: pointer;
    }
    #footer .bottom{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        background: black;
        font-size: 12px;
        color: white;
    }
    .flex{
        display: flex;
        flex-wrap: wrap;
        padding: 0 45px 0 60px;
        margin-bottom: 40px;
    }
    .flex .left{
        flex: 1;
    }
    .flex .right{
        flex: 3;
        display: flex;
        justify-content: space-between;
    }
    .flex .right .back-to-top{
        font-size: 14px;
        color: #002D63;
        cursor: pointer;
    }
</style>