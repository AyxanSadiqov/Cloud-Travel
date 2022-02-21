<template>
    <div id="homefilter">
        <!-- MAP -->
        <div id="map" class="space noselect">
            <img src="@/assets/img/map.png" alt="">
            <button>Show on map</button>
        </div>

        <!-- PRICE -->
        <div id="price" class="space noselect">
            <header>
                <h6>Price per night</h6>
                <span @click="clearPricePerNight()">Clear</span>
            </header>
            <!-- {{minVal}} -- {{maxVal}} -->
            <div class="slider">
                <div class="progress" :style="{ left: minVal/10+'%', right:100-maxVal/10+'%' }"></div>
            </div>
            <div class="range-input">
                <input type="range" min="0" max="1000" v-model="minVal" step="10">
                <input type="range" min="0" max="1000" v-model="maxVal" step="10">
            </div>
            <div class="price-input">
                <div class="field">
                    <span>SGD</span>
                    <input type="number" class="input-min" v-model="minVal">
                </div>
                <div class="separator"><span>-</span><span>-</span><span>-</span><span>-</span></div>
                <div class="field">
                    <span>SGD</span>
                    <input type="number" class="input-max" v-model="maxVal">
                </div>
            </div>
        </div>

        <!-- REVIEWS -->
        <div id="reviews" class="space noselect">
            <div class="colon-title"><div>Reviews</div><div>Clear</div></div>
            <div class="colon" v-for="rev in reviews" :key="rev.id">
                <div>
                    <input type="checkbox" :checked="rev.isChecked" :id="rev.id" :name="rev.id" :value="rev.name">
                    <span class="mark"></span>
                    <label :for="rev.id">{{ rev.name }}</label>
                </div>
                <div>
                    {{ rev.count }}
                </div>
            </div>
        </div>

        <!-- STAR RATING -->
        <div id="reviews" class="space noselect">
            <div class="colon-title"><div>Star rating</div><div>Clear</div></div>
            <div class="colon" v-for="st in starRating" :key="st.id">
                <div>
                    <input type="checkbox" :checked="st.isChecked" :id="st.id" :name="st.id" :value="st.name">
                    <span class="mark"></span>
                    <label :for="st.id">
                        <img v-for="i in st.star" :key="i" src="@/assets/img/star.png" alt="">
                        <span>{{ st.name }}</span>
                    </label>
                </div>
                <div>
                    {{ st.count }}
                </div>
            </div>
        </div>

        <!-- HOTEL NAME -->
        <div id="hotelname" class="space noselect">
            <div class="colon-title"><div>Hotel name</div></div>
            <div class="input">
                <input type="text" placeholder="e.g. Hilton, Ibis ...">
                <font-awesome-icon icon="magnifying-glass" class="icon" />
            </div>
        </div>

        <!-- RESERVATION POLICY -->
        <div id="reviews" class="space noselect">
            <div class="colon-title"><div>Reservation policy</div></div>
            <div class="colon" v-for="rp in reservationPolicy" :key="rp.id">
                <div>
                    <input type="checkbox" :id="rp.id" :name="rp.id" :value="rp.name">
                    <span class="mark"></span>
                    <label :for="rp.id"> <span>{{ rp.name }}</span> </label>
                </div>
                <div>
                    {{ rp.count }}
                </div>
            </div>
        </div>

        <!-- MEAL PLAN -->
        <div id="reviews" class="space noselect">
            <div class="colon-title"><div>Meal plan</div></div>
            <div class="colon" v-for="mp in mealPlanController()" :key="mp.id">
                <div>
                    <input type="checkbox" :id="mp.id" :name="mp.id" :value="mp.name">
                    <span class="mark"></span>
                    <label :for="mp.id"> <span>{{ mp.name }}</span> </label>
                </div>
                <div>
                    {{ mp.count }}
                </div>
            </div>
            <button class="show-more-button" @click="showMealPlanMore = !showMealPlanMore">
                {{mealPlanCount}} 
                <font-awesome-icon :icon="showMealPlanMore ? 'caret-down' : 'caret-up'" class="icon" />
            </button>
        </div>

        <!-- PROPERTY TYPE -->
        <div id="reviews" class="space noselect">
            <div class="colon-title"><div>Property type</div></div>
            <div class="colon" v-for="pt in propertyTypeController()" :key="pt.id">
                <div>
                    <input type="checkbox" :id="pt.id" :name="pt.id" :value="pt.name">
                    <span class="mark"></span>
                    <label :for="pt.id"> <span>{{ pt.name }}</span> </label>
                </div>
                <div>
                    {{ pt.count }}
                </div>
            </div>
            <button class="show-more-button" @click="showPropertyTypeMore = !showPropertyTypeMore">
                {{propertyTypeCount}} 
                <font-awesome-icon :icon="showPropertyTypeMore ? 'caret-down' : 'caret-up'" class="icon" />
            </button>
        </div>

        <!-- FACILITIES -->
        <!-- (here show more button isn't working because no content specified) -->
        <div id="reviews" class="space noselect">
            <div class="colon-title"><div>Facilities</div></div>
            <div class="colon" v-for="fc in facilities" :key="fc.id">
                <div>
                    <input type="checkbox" :id="fc.id" :name="fc.id" :value="fc.name">
                    <span class="mark"></span>
                    <label :for="fc.id"> <span>{{ fc.name }}</span> </label>
                </div>
                <div>
                    {{ fc.count }}
                </div>
            </div>
            <button class="show-more-button">
                Show 26 more<font-awesome-icon icon="caret-down" class="icon" />
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            minVal : 0,
            maxVal : 400,
            showMealPlanMore : true,
            mealPlanCount : 0,
            showPropertyTypeMore : true,
            propertyTypeCount : 0,
            reviews : [
                { id : 1, name : "Excellent", isChecked : true, count : 999 },
                { id : 2, name : "Very Good", isChecked : false, count : 999 },
                { id : 3, name : "Good", isChecked : false, count : 999 },
                { id : 4, name : "Fair", isChecked : false, count : 999 },
                { id : 5, name : "Poor", isChecked : false, count : 999 },
                { id : 6, name : "No review", isChecked : false, count : 999 }
            ],
            starRating : [
                { id : 7, star : 5, isChecked : true, count : 999 },
                { id : 8, star : 4, isChecked : false, count : 999 },
                { id : 9, star : 3, isChecked : false, count : 999 },
                { id : 10, star : 2, isChecked : false, count : 999 },
                { id : 11, star : 1, isChecked : false, count : 999 },
                { id : 12, star : 0, isChecked : false, name : "No rating", count : 999 }
            ],
            reservationPolicy : [
                { id : 13, name : "Free cancellation", count : 999 },
                { id : 14, name : "Book now, pay later", count : 999 },
                { id : 15, name : "Pay at hotel", count : 999 }
            ],
            mealPlan : [
                { id : 16, name : "Room only", count : 999 },
                { id : 17, name : "Breakfast", count : 999 },
                { id : 18, name : "Lunch", count : 999 },
                { id : 19, name : "Dinner", count : 999 },
                { id : 20, name : "Half board", count : 999 },
                { id : 21, name : "Full board", count : 999 },
                { id : 22, name : "All inclusive", count : 999 },
            ],
            propertyType : [
                { id : 23, name : "Hotel", count : 999 },
                { id : 24, name : "Hostel/Backpacker accomodation", count : 999 },
                { id : 25, name : "Apartment", count : 999 },
                { id : 26, name : "Aparthotel", count : 999 },
                { id : 27, name : "Resort", count : 999 },
                { id : 28, name : "Inn", count : 999 },
                { id : 29, name : "Motel", count : 999 },
                { id : 30, name : "Bed & breakfast", count : 999 },
                { id : 31, name : "Guesthouse", count : 999 },
                { id : 32, name : "Condo", count : 999 },
                { id : 33, name : "All-inclusive property", count : 999 },
                { id : 34, name : "Hostal", count : 999 },
            ],
            facilities : [
                { id : 35, name : "Swimming pool", count : 999 },
                { id : 36, name : "Internet access", count : 999 },
                { id : 37, name : "Non-smoking floor", count : 999 },
            ]
        }
    },
    methods : {
        clearPricePerNight(){
            this.minVal = 0; this.maxVal = 400
        },
        // functions to decide to show more or less
        mealPlanController(){
            if(this.showMealPlanMore == true){
                let count = this.mealPlan.slice(0,2)
                this.mealPlanCount = "Show " + (this.mealPlan.length - count.length) + " more"
                return count
            }else{
                this.mealPlanCount = "Show less"
                return this.mealPlan
            }
        },
        propertyTypeController(){
            if(this.showPropertyTypeMore == true){
                let count = this.propertyType.slice(0,3)
                this.propertyTypeCount = "Show " + (this.propertyType.length - count.length) + " more"
                return count
            }else{
                this.propertyTypeCount = "Show less"
                return this.propertyType
            }
        },
    },
    // watch : {
    //     minVal(value) {
    //         if(value >= this.maxVal){
    //             console.log(value)
    //         }
    //     }
    // }
}
</script>

<style scoped>
    #homefilter .space{
        margin-bottom: 10px;
    }
    #price,
    #reviews,
    #hotelname{
        background: white;
        padding: 15px 20px 10px;
        border-radius: 5px;
        /* box-shadow: 1px 2px 5px rgb(216, 216, 216, 1) */
    }
    .show-more-button{
        background: none!important;
        border: none;
        padding: 0!important;
        outline: none;
        color: #002D63;
        font-size: 12px;
    }
    .show-more-button .icon{
        position: relative;
        top: 1px;
        font-size: 10px;
        padding-left: 2px;
    }
    /* Map section START */
    #map{
        width: 100%;
        height: 100px;
        background: white;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
    }
    #map img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    #map button{
        width: 80%;
        background: #002D63;
        color: white;
        height: 40px;
        border: 1px solid transparent;
        border-radius: 5px;
        outline: none;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    #map button:hover{
        background: #0048a0;
    }
    /* Price section START */
    header{
        position: relative;
    }
    header h6{
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 25px;
    }
    header span{
        position: absolute;
        top: 0px;
        right: 0;
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        color: #002D63;
        cursor: pointer;
    }
    .price-input{
        width: 100%;
        display: flex;
        margin: 20px 0 10px;
    }
    .price-input .field{
        display: flex;
        width: 100%;
        height: 30px;
        align-items: center;
    }
    .field input{
        width: 100%;
        height: 100%;
        outline: none;
        font-size: 12px;
        border-radius: 3px;
        text-align: center;
        border: 1px solid #DDDDDD;
        -moz-appearance: textfield;
    }
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    .field{
        position: relative;
    }
    .field span{
        position: absolute;
        left: 10px;
        font-size: 12px;
    }
    .price-input .separator{
        width: 110px;
        display: flex;
        font-size: 19px;
        color: #757575;
        align-items: center;
        justify-content: center;
    }
    .separator span{
        margin: -1px;
    }
    .slider{
        height: 5px;
        position: relative;
        background: #ddd;
        border-radius: 5px;
    }
    .slider .progress{
        height: 100%;
        left: 0%;
        right: 60%;
        position: absolute;
        border-radius: 5px;
        background: #00A1E5;
    }
    .range-input{
        position: relative;
    }
    .range-input input{
        position: absolute;
        width: 100%;
        height: 5px;
        top: -5px;
        background: none;
        pointer-events: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        cursor: pointer;
    }
    input[type="range"]::-webkit-slider-thumb{
        height: 14px;
        width: 14px;
        border: 2px solid #00A1E5;
        border-radius: 50%;
        background: white;
        pointer-events: auto;
        -webkit-appearance: none;
        box-shadow: 0 0 6px rgba(0,0,0,0.05);
    }
    input[type="range"]::-moz-range-thumb{
        height: 14px;
        width: 14px;
        border: 2px solid #00A1E5;
        border-radius: 50%;
        background: white;
        pointer-events: auto;
        -webkit-appearance: none;
        box-shadow: 0 0 6px rgba(0,0,0,0.05);
    }
    /* Reviews section START */
    #reviews{
        background: white;
        padding: 15px 20px 10px;
        border-radius: 5px;
    }
    #reviews .colon-title{
        margin-bottom: 10px;
    }
    #reviews .colon-title div:first-child{
        font-size: 14px;
        font-weight: 600;
        color: black;
    }
    #reviews .colon-title div:nth-child(2){
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        color: #002D63;
        cursor: pointer;
    }
    #reviews .colon-title,
    #reviews .colon{
        display: flex;
        justify-content: space-between;
        position: relative;
        font-size: 12px;
    }
    #reviews .colon{
        margin-bottom: -5px;
    }
    #reviews .colon label{
        cursor: pointer;
    }
    #reviews .colon input[type=checkbox]{
        visibility: hidden; /* Hide the default checkbox */
    }
    #reviews .colon input[type=checkbox]:checked ~ .mark{
        background-color: #002D63;
    }
    #reviews .colon .mark{
        position: absolute;
        top: 2px;
        left: 0px;
        height: 12px;
        width: 12px;
        border: 1px solid #757575;
    }
    #reviews .colon .mark::after{
        content: "";
        position: absolute;
        left: 3px;
        bottom: 2px;
        width: 4px;
        height: 8px;
        border: solid white;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
    #reviews .colon label{
        padding-left: 5px;
    }
    #reviews .colon label img{
        width: 15px;
        position: relative;
        top: -2px;
    }
    /* Hotel Name section START */
    #hotelname .colon-title{
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 10px;
    }
    #hotelname .input{
        position: relative;
    }
    #hotelname .input .icon{
        position: absolute;
        top: 7px;
        right: 10px;
        color: #757575;
        font-size: 13px;
    }
    #hotelname input{
        width: 100%;
        border: 1px solid #DDDDDD;
        border-radius: 3px;
        outline: none;
        padding-left: 10px;
    }
    #hotelname ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        font-size: 14px;
    }
    #hotelname ::-moz-placeholder { /* Firefox 19+ */
        font-size: 14px;
    }
    #hotelname :-ms-input-placeholder { /* IE 10+ */
        font-size: 14px;
    }
    #hotelname :-moz-placeholder { /* Firefox 18- */
        font-size: 14px;
    }



    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
           -khtml-user-select: none; /* Konqueror HTML */
             -moz-user-select: none; /* Old versions of Firefox */
              -ms-user-select: none; /* Internet Explorer/Edge */
                  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    }
</style>