<template>
  <div class="home">
    <Navbar />
    <!-- to maintain the balance when 'search bar' is fixed (marginTop) -->
    <section class="flex" :style="marginTop">
      <div class="flex-child left">
        <HomeFilter />
      </div>
      <div class="flex-child right">
        <HomeShares />
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import HomeFilter from '@/components/HomeFilter.vue'
import HomeShares from '@/components/HomeShares.vue'
import Footer from '@/components/Footer.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components : {
    Navbar,
    HomeFilter,
    HomeShares,
    Footer
  },
  computed : {
    ...mapGetters(["marginTop"])
  }
}
</script>

<style scoped>
  .flex{
    display: flex;
    flex-wrap: wrap;
    padding: 0 45px 0 60px;
  }
  .flex .flex-child{
    margin: 15px 15px 0 0;
    background: transparent;
  }
  .flex .left{
    flex: 1;
  }
  .flex .right{
    flex: 3;
  }
</style>