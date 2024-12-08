<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-left">
        <a href="#" class="back-to-top" @click.prevent="scrollToTop">Back to top</a>
      </div>
      
      <div class="footer-center">
        <button class="arrow-button" @click="changePage(-1)">
          <img :src="arrowBack" alt="Arrow Left" />
        </button>
        
        <div class="pagination-buttons">
          <button class="page-button" @click="goToPage(1)">1</button>
          <button class="page-button" @click="goToPage(2)">2</button>
          <button class="page-button" @click="goToPage(3)">3</button>
        </div>

        <button class="arrow-button" @click="changePage(1)">
          <img :src="arrowNext" alt="Arrow Right" />
        </button>
      </div>

      <div class="footer-right">
        <button class="filter-button">Lower Price</button>
      </div>
    </div>
  </footer>
</template>

<script>
import arrowBack from '~/public/assets/icons/arrow-back.svg';
import arrowNext from '~/public/assets/icons/arrow-next.svg';

export default {
  name: "Footer",
  data() {
    return {
      arrowBack,
      arrowNext,
    };
  },
  methods: {
    // change the page at the specified direction
    changePage(direction) {
      this.$emit('changePage', direction);
    },

    // Go to an specific page
    goToPage(pageNumber) {
      this.$emit('goToPage', pageNumber);
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';
@import '@/assets/scss/components';
</style>