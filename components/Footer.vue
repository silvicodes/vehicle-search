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

<style scoped>
.footer {
  background-color: #fff;
  width: 1029px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.footer-left a {
  text-decoration: underline;
  color: #55595D;
  font-weight: 400;
  cursor: pointer;
}

.footer-center {
  display: flex;
  gap: 10px;
  align-items: center;
}

.pagination-buttons button {
  padding: 6px 12px;
  font-size: 14px;
  background-color: #fff;
  border: 1px solid #D1D6E0;
  border-radius: 5px;
  cursor: pointer;
}

.pagination-buttons button:hover {
  background-color: #D1D6E0;
  color: white;
}

.arrow-buttons button {
  padding: 6px 12px;
  background-color: #fff;
  border: 1px solid #D1D6E0;
  border-radius: 5px;
  cursor: pointer;
}

.arrow-buttons button:hover {
  background-color: #D1D6E0;
  color: white;
}

.footer-right {
  display: flex;
  justify-content: flex-end;
}

.filter-button {
  padding: 6px 12px;
  font-size: 14px;
  background-color: #F6F7FB;
  border-radius: 5px;
  cursor: pointer;
}

.filter-button:hover {
  background-color: #55595D;
  color: white;
}

.arrow-button img {
  width: 16px;
  height: 16px;
}
</style>
