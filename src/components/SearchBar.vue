<template>
    <div id="searchbar" ref="search_bar" :class="stickyClass">
        <div>
            <input @click="search()" v-model="selectedCityName" type="text" id="" name="" placeholder="Singapore, Singapore" autocomplete="off"><font-awesome-icon icon="magnifying-glass" class="icon" />
            <div class="search-results">
                <div v-for="result in searchingResults" :key="result.id">
                    <span @mousedown="chooseCity(result)"><font-awesome-icon icon="location-dot" class="icon" /> {{ result.label }}</span>
                </div>
            </div>
        </div>
        <div><input type="text" id="" name="" placeholder="Jul 19 – Jul 20" autocomplete="off"><font-awesome-icon icon="calendar" class="icon" /></div>
        <div><input type="text" id="without-icon" name="" placeholder="2 adults, 0 children, 1 room" autocomplete="off"></div>
        <div><button>search</button></div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            stickyClass : "",
            searchingResults : [],
            selectedCityName : ""
        }
    },
    created() {
        window.addEventListener('scroll', this.controlScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.controlScroll);
    },
    methods: {
        controlScroll() {
            if(window.top.scrollY >= 60){
                this.stickyClass = "sticky"
                this.$store.commit('addMarginTop',"margin-top:70px;")
            }else{
                this.stickyClass = ""
                this.$store.commit('addMarginTop',"")
            }
        },
        search(){
            axios.get("https://hiring.zumata.xyz/job01/autosuggest").then(response => {
                this.searchingResults = response.data
            })
        },
        chooseCity(result){
            this.selectedCityName = result.label
            this.$store.commit('addCityCode', result.cityCode)
        }
    }
}
</script>

<style scoped>
    #searchbar{
        height: 70px;
        background: #002D63;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 90px 0 90px;
        transition: .5s;
    }
    .sticky{
        z-index: 1000;
        position: fixed;
        top: 0px;
        width: 100%;
    }
    #searchbar div{
        /* background: red; */
        width: 24%;
        position: relative;
    }
    #searchbar div:first-child{
        width: 40%;
        position: relative;
    }
    #searchbar div:last-child{
        width: 10%;
    }
    #searchbar div:first-child .search-results{
        visibility: hidden;
        opacity: 0;
        transition: all .15s ease-in-out;
        position: absolute;
        top: 48px;
        background: white;
        width: 100%;
        border-radius: 3px;
        box-shadow: 1px 1px 10px rgb(175, 175, 175, 0.5);
        overflow: hidden;
        z-index: 1000;
    }
    #searchbar div:first-child .search-results div{
        width: 100%;
        padding: 10px 10px 10px 30px;
        color: #333;
        font-size: 14px;
        cursor: pointer;
    }
    #searchbar div:first-child .search-results div .icon{
        position: absolute;
        top: 13px;
        font-size: 14px;
        color: #757575;
    }
    #searchbar div:first-child .search-results div:hover{
        background: rgb(243, 243, 243);
    }
    #searchbar div:first-child input:focus ~ .search-results{
        visibility: visible;
        opacity: 1;
    }
    #searchbar div:first-child input:focus::placeholder{
        color: transparent;
    }
    #searchbar div input{
        width: 100%;
        height: 45px;
        border: 1px solid transparent;
        border-radius: 5px;
        padding-left: 28px;
        font-size: 15px;
    }
    #searchbar div #without-icon{
        padding-left: 10px;
    }
    #searchbar div .icon{
        position: absolute;
        left: 10px;
        top: 16px;
        color: #757575;
        font-size: 13px;
    }
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #333333;
        opacity: 1; /* Firefox */
    }
    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #333333;
    }
    ::-ms-input-placeholder { /* Microsoft Edge */
        color: #333333;
    }
    input:focus{
        outline: none;
    }
    button{
        width: 100%;
        background: #00A1E5;
        color: white;
        height: 45px;
        border: 1px solid transparent;
        border-radius: 5px;
        outline: none;
        text-transform: capitalize;
    }
    button:hover{
        background: #0fb7ff;
    }
</style>