<template>
    <div id="pagination">
        <div>Showing Results 1 – 20 of 9999</div>
        <div>
            <span><font-awesome-icon icon="caret-left" class="icon" /></span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>...</span>
            <span>13</span>
            <span><font-awesome-icon icon="caret-right" class="icon" /></span>
        </div>
    </div>
</template>

<style scoped>
    #pagination{
        display: flex;
        font-size: 14px;
    }
    .icon{
        color: #002D63;
    }
    #pagination div span{
        margin: 0 13px;
    }
    #pagination div:last-child span:nth-child(2){
        background: #002D63;
        color: white;
        border-radius: 5px;
        padding: 1px 5px;
    }
</style>