<template>
    <div>
        <div id="homeTitles">
            <div class="title">Singapore: 9999 properties found</div>
            <div class="filters">
                <div v-for="filter in filters" :key="filter.id" @click="chooseFilter(filter)" :class="{active:filter.id == current}">
                    {{ filter.name }} <font-awesome-icon v-if="filter.isDropdown" icon="caret-down" class="icon" />
                    <ul v-if="filter.isDropdown">
                        <li>Price (highest first)</li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-if="showNormal==1">
            <div v-if="showLoading">
                <div id="homeShares" class="skeleton-main" v-for="i in 12" :key="i">
                    <div class="left skeleton-left"></div>
                    <div class="middle"><div class="skeleton-middle"></div><div class="skeleton-middle"></div><div class="skeleton-middle"></div><br><div class="skeleton-middle4"></div></div>
                    <div class="right"><div class="skeleton-right"></div><div class="bottom"><div class="skeleton-right2"></div></div></div>
                </div>
            </div>
            <div id="homeShares" v-for="hotel in hotels[0]" :key="hotel.id">
                <!-- LEFT -->
                <div class="left">
                    <img :src="hotel.property.heroImage.url" alt="">
                    <span v-for="gallery in hotel.property.gallery" :key="gallery.id">
                        <img v-if="gallery.xs" :src="gallery.xs.url" alt="">
                        <img v-else-if="gallery.s" :src="gallery.s.url" alt="">
                        <img v-else-if="gallery.m" :src="gallery.m.url" alt="">
                        <img v-else-if="gallery.l" :src="gallery.l.url" alt="">
                    </span>
                </div>

                <!-- MIDDLE -->
                <div class="middle">
                    <div class="title">
                        {{ hotel.property.name }} <span v-for="i in parseInt(hotel.property.starRating)" :key="i" class="stars"><img src="@/assets/img/star.png" alt=""></span>
                    </div>
                    <div class="subtitle">
                        {{ hotel.property.location.address }}, {{ hotel.property.location.city }}, {{ hotel.property.location.country }}
                    </div>
                    <div class="comment">
                        <span v-for="review in hotel.property.reviews" :key="review.id">"{{ review.text }}"</span>
                    </div>
                    <div class="labels">
                        <div class="each-label" v-for="lbl in labelActions(hotel.packages[0])" :key="lbl.id">
                            {{ lbl }}
                            <div class="popup" v-if="lbl.includes('+')">
                                <div v-for="all_lbl in allLabels(hotel.packages[0])" :key="all_lbl.id">
                                    <font-awesome-icon icon="check" class="icon" />{{ all_lbl }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer" v-if="hotel.property.covidSafety">
                        <img src="@/assets/img/Vector.png" alt=""> {{ hotel.property.covidSafety }}
                    </div>
                </div>

                <!-- RIGHT -->
                <div class="right">
                    <div class="top">
                        <img src="@/assets/img/score-widget.png" alt="">
                    </div>
                    <div class="bottom">
                        <div class="one">
                            {{ calculateSave(hotel.packages[0]).rate }}
                        </div>
                        <div class="two">
                            Nightly avg.
                        </div>
                        <div class="three">
                            <span class="little" v-if="calculateSave(hotel.packages[0]).showOldPrice">{{ hotel.packages[0].displayRate.value }}</span>
                            <span class="big">{{ hotel.packages[0].adjustedDisplayRate.value }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="showNormal==2" class="no-result">
            <div><font-awesome-icon icon="magnifying-glass" class="icon" /></div>
            <div>Sorry! We couldn't find any properties for your search.</div>
        </div>
        <div v-else-if="showNormal==3" class="bad-params">
            <div><font-awesome-icon icon="circle-exclamation" class="icon" /></div>
            <div>Opps, something went wrong.</div>
            <div>error message here</div>
        </div>
        <div v-else class="before-request">
            <div>Choose a city</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    data(){
        return{
            filters : [
                { id : 1, name : "Popularity" },
                { id : 2, name : "Price (lowest first)", isDropdown : true },
                { id : 3, name : "Reviews" },
                { id : 4, name : "Discount" },
            ],
            current : 1, // to activate the 'first' item of the menu
            hotels : [],
            showLoading : true,
            showNormal : 0, // 1-normal page, 2-no result, 3-bad params
        }
    },
    computed : {
        ...mapGetters(["cityCode"]),
    },
    methods : {
        chooseFilter(filter){
            this.current = filter.id
        },
        controlCityCodes(){
            // "klmy" does not return empty object. "sgsg" and "klmy" both objects length are 2. So i can't do anything to check "empty" object
            // cause of that, controls were done by city codes
            if(this.cityCode === "sgsg"){ // normal page
                this.fetchHotels()
            }else if(this.cityCode === "klmy"){ // no results
                this.showNormal = 2
            }else if(this.cityCode === "mlph"){ // 400 bad params
                this.fetchHotels()
            }
        },
        fetchHotels(){
            this.showNormal = 1
            var all = []; var outlets = []; var availability = [];
            let url = "https://hiring.zumata.xyz/job01/search/" + this.cityCode
            axios.get(url).then(response => {
                // console.log(Object.keys(response.data).length)
                this.showLoading = false
                all.push(response.data)
                all.map((item) => {
                    outlets.push(item.outlets)
                })
                outlets.map((item) => {
                    availability.push(item.availability)
                })
                availability.map((item) => {
                    this.hotels.push(item.results)
                })
                // console.log(this.hotels)
            }).catch(() => {
                this.showNormal = 3
            })
        },
        // check if there is a discount and calculate interest rate
        calculateSave(packages){
            const oldPrice = packages.displayRate.value
            const newPrice = packages.adjustedDisplayRate.value
            let interestRate
            let showOldPrice
            if(oldPrice > newPrice){
                showOldPrice = true
                interestRate = "SAVE " + parseInt((oldPrice - newPrice)/oldPrice*100) + " TODAY!"
            }else{
                showOldPrice = false
                interestRate = ""
            }
            return {
                rate : interestRate,
                showOldPrice : showOldPrice
            }
        },
        // for labels control
        labelActions(payment){
            let foodCode
            payment.foodCode == 1 ? foodCode="Room Only"
            : payment.foodCode == 2 ? foodCode="Breakfast"
            : payment.foodCode == 3 ? foodCode="Lunch"
            : payment.foodCode == 4 ? foodCode="Dinner"
            : payment.foodCode == 5 ? foodCode="Half board"
            : payment.foodCode == 6 ? foodCode="Full board"
            : payment.foodCode == 7 ? foodCode="All inclusive"
            : ""
            let arr = [] // we'll add reservation policy names by their boolean values
            arr.push(foodCode)
            payment.nonRefundable !=undefined || payment.nonRefundable ==true ? arr.push("Free cancellation") : ""
            payment.payLater !=undefined || payment.payLater ==true ? arr.push("Pay later") : ""
            payment.payAtHotel !=undefined || payment.payAtHotel ==true ? arr.push("Pay at hotel") : ""
            // for +1 label. If the length of the array is more than 3, the value for how long is also assigned to the array
            let count = arr.slice(3).length
            if(count >= 1){
                for(let i = 0; i < count; i++){
                    arr.pop() // Subtract elements from the array as many as the count
                }
                arr.push("+"+count) // and the "count" of how many should be displayed is added to the end of the array
            }
            return arr
        },
        // Since all 'labels' will appear when +1 is pressed, we keep all 'labels' in a separate place before performing operations on the array
        allLabels(payment){
            let foodCode
            payment.foodCode == 1 ? foodCode="Room Only"
            : payment.foodCode == 2 ? foodCode="Breakfast"
            : payment.foodCode == 3 ? foodCode="Lunch"
            : payment.foodCode == 4 ? foodCode="Dinner"
            : payment.foodCode == 5 ? foodCode="Half board"
            : payment.foodCode == 6 ? foodCode="Full board"
            : payment.foodCode == 7 ? foodCode="All inclusive"
            : ""
            let arr = [] // we'll add reservation policy names by their boolean values
            arr.push(foodCode)
            payment.nonRefundable !=undefined || payment.nonRefundable ==true ? arr.push("Free cancellation") : ""
            payment.payLater !=undefined || payment.payLater ==true ? arr.push("Pay later") : ""
            payment.payAtHotel !=undefined || payment.payAtHotel ==true ? arr.push("Pay at hotel") : ""
            return arr
        }
    },
    watch : {
        // when city code change
        cityCode() {
            this.controlCityCodes()
        }
    }
}
</script>

<style scoped>
    #homeTitles .title{
        font-size: 16px;
        font-weight: 700;
        margin-top: 5px;
    }
    #homeTitles .filters{
        display: flex;
        width: 100%;
        margin-top: 10px;
    }
    #homeTitles .filters div{
        position: relative;
        background: white;
        color: #002D63;
        width: 25%;
        margin: 0.06em;
        padding: 10px;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        cursor: pointer;
    }
    #homeTitles .filters div:first-child{
        border-radius: 5px 0px 0px 5px;
    }
    #homeTitles .filters div:last-child{
        border-radius: 0px 5px 5px 0px;
    }
    #homeTitles .filters .active,
    #homeTitles .filters div:hover{
        background: #002D63;
        color: white;
    }
    #homeTitles .filters div .icon{
        font-size: 12px;
    }
    #homeTitles .filters div ul{
        position: absolute;
        top: 44px;
        left: 0;
        width: 100%;
        list-style-type: none;
        margin: 0;
        padding: 5px;
        background: white;
        border-radius: 5px;
        color: #002D63;
        box-shadow: 1px 1px 10px rgb(175, 175, 175, 0.5);
        transform: scale(0);
        transition: all .15s ease-in-out;
        z-index: 1;
    }
    #homeTitles .filters div:hover ul{
        transform: scale(1);
    }
    #homeTitles .filters div ul li{
        padding: 7px 10px;
        margin: 2px;
        border-radius: 5px;
    }
    #homeTitles .filters div ul li:hover{
        background: rgb(243, 243, 243);
    }



    #homeShares{
        display: flex;
        width: 100%;
        border-radius: 5px;
        margin-top: 10px;
        padding: 10px;
        background: white;
    }
    #homeShares:hover{
        box-shadow: 1px 1px 10px rgb(160, 160, 160);
    }
    #homeShares div{
        margin: 0.06em;
    }
    /* display grid START */
    #homeShares .left{
        width: 23%;
        display: grid;
        grid-template-columns: auto auto auto auto;
        grid-gap: 2px;
    }
    #homeShares .middle{
        width: 57%;
        color: #333;
        padding: 10px;
    }
    #homeShares .right{
        width: 20%;
        position: relative;
    }
    /* display grid END */
    #homeShares .left img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    #homeShares .left img:first-child{
        grid-column: 1 / span 4;
    }
    #homeShares .left span img{
        width: 48px;
        max-height: 48px;
        object-fit: cover;
    }
    #homeShares .middle div{
        margin-bottom: 7px;
    }
    #homeShares .middle .title{
        font-size: 16px;
        font-weight: 700;
    }
    #homeShares .middle .stars{
        position: relative;
        top: -2px;
        left: 2px;
    }
    #homeShares .middle .stars img{
        width: 13px;
    }
    #homeShares .middle .subtitle{
        font-size: 12px;
    }
    #homeShares .middle .comment{
        font-size: 12px;
        color: #757575;
        overflow: hidden;
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
    #homeShares .middle .labels{
        display: flex;
        width: 100%;
    }
    #homeShares .middle .labels .each-label{
        position: relative;
        border: 1px solid #00A1E6;
        color: #00A1E6;
        font-size: 12px;
        padding: 0 3px;
        margin-right: 2px;
        cursor: default;
    }
    #homeShares .middle .labels .each-label:hover .popup{
        visibility: visible;
        opacity: 1;
    }
    #homeShares .middle .labels .each-label .popup{
        position: absolute;
        left: 50%;
        transform: translate(-50%,15%);
        display: grid;
        grid-template-columns: auto auto;
        text-align: left;
        width: 246px;
        height: 64.5px;
        background: #333;
        font-size: 12px;
        color: white;
        border-radius: 5px;
        padding: 10px 15px;
        visibility: hidden;
        opacity: 0;
        transition: all .15s ease-in-out;
        z-index: 100;
    }
    #homeShares .middle .labels .each-label .popup::before{
        content: "";
        position: absolute;
        left: 50%;
        transform: translate(-50%,-80%);
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 8px solid #333;
    }
    #homeShares .middle .labels .each-label .popup div .icon{
        color: #019501;
        margin-right: 5px;
    }
    #homeShares .middle .footer{
        font-size: 12px;
    }
    #homeShares .middle .footer img{
        width: 16px;
        margin-right: 5px;
    }
    #homeShares .right .top{
        position: absolute;
        top: 0;
        right: 0;
    }
    #homeShares .right .bottom{
        position: absolute;
        bottom: 0;
        text-align: end;
        width: 100%;
        margin-bottom: -5px;
    }
    #homeShares .right .bottom .one{
        display: inline-block;
        background: #00A1E6;
        color: white;
        font-size: 12px;
        padding: 0 3px;
    }
    #homeShares .right .bottom .two{
        font-size: 12px;
        color: #757575;
        position: relative;
        top: 5px;
    }
    #homeShares .right .bottom .three .little{
        text-decoration-line: line-through;
        font-size: 12px;
        color: #757575;
        margin-right: 3px;
    }
    #homeShares .right .bottom .three .big{
        font-size: 24px;
        font-weight: bold;
        color: black;
    }
    .no-result{
        text-align: center;
        color: #757575;
        margin-top: 80px;
        font-size: 16px;
        font-weight: 700;
    }
    .bad-params{
        text-align: center;
        color: #757575;
        margin-top: 80px;
        font-size: 16px;
        font-weight: 700;
    }
    .bad-params div:last-child{
        font-size: 12px;
        font-weight: 400;
    }
    .before-request{
        text-align: center;
        color: #757575;
        margin-top: 80px;
        font-size: 16px;
        font-weight: 700;
    }


    /* skeleton loader START */
    .skeleton-main{
        background: white;
        width: 100%;
        height: 225px;
    }
    .skeleton-left{
        width: 100%;
        height: 200px;
        animation: load 1s linear infinite alternate;
    }
    .skeleton-middle{
        width: 100%;
        height: 20px;
        animation: load 1s linear infinite alternate;
    }
    .skeleton-middle4{
        width: 60%;
        height: 20px;
        animation: load 1s linear infinite alternate;
    }
    .skeleton-right{
        width: 100%;
        height: 40px;
        animation: load 1s linear infinite alternate;
    }
    .skeleton-right2{
        width: 100%;
        height: 20px;
        animation: load 1s linear infinite alternate;
    }
    @keyframes load {
        0% {
            background: hsl(200, 20%, 70%);
        }
        100%   {
            background: hsl(200, 20%, 95%);
        }
    }
    /* skeleton loader END */
</style>