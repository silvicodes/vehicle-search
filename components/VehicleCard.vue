<template>
  <div class="vehicle-card">
    <div class="vehicle-row" v-for="(chunk, index) in currentPageChunks" :key="index">
      <div v-for="(vehicle, idx) in chunk" :key="vehicle.id" class="vehicle-item">
        <div class="vehicle-image-container">
          <img :src="vehicle.imageUrl" alt="Vehicle Image" class="vehicle-image" />
          <div v-if="vehicleBadge(vehicle)" :class="vehicleBadge(vehicle) === 'Used' ? 'used-badge' : 'new-badge'">
            {{ vehicleBadge(vehicle) }}
          </div>
        </div>
        <div class="vehicle-info">
          <h3 class="vehicle-title">
            {{ vehicle.year }} ({{ vehicle.registration }}) {{ vehicle.make }}
          </h3>
          <button @click="toggleFavorite(vehicle)" :class="{ 'favorite': vehicle.isFavorite }">
            <img :src="vehicle.isFavorite ? '/assets/icons/star-filled.svg' : '/assets/icons/star.svg'" alt="Favorite" />
          </button>
          <h4 class="vehicle-model">{{ vehicle.model }}</h4>
          <p class="vehicle-description">
            <span class="bold-price">£550.90</span>
            <span class="normal-price"> /mo (PCP)</span>
          </p>
          
          <p v-if="vehicle.strikePrice" :class="{
              'strike-price': true,
              'highlight-red': vehicle.year === 2019 && vehicle.make.includes('Renault Zoe')
            }">
            £{{ vehicle.strikePrice }} 
            <span class="vehicle-finance"> {{ vehicle.finance }}</span>
          </p>
        </div>
      </div>
    </div>
    <div v-if="index === 1 && idx === 1" class="value-your-car-container"></div>
    <div class="value-your-car-container">
      <div class="value-your-car">
        <h4>Value Your Car</h4>
        <label for="car-value">Find out the value of your car in just a few minutes.</label>
        <input id="car-value" type="text" placeholder="Enter VRM" />
        <input id="car-value" type="text" placeholder="Enter mileage" />
        <button>Value my car</button>
      </div>
    </div>
    <Footer @goToPage="goToPage" @changePage="changePage" />
  </div>
</template>

<script>
import { useVehicleStore } from '../store/vehicleStore';
import MercedesBenzImage from '~/public/assets/images/Mercedes-Benz.png';
import Peugeot208Image from '~/public/assets/images/Peugeot-208.png';
import RenaultZoeImage from '~/public/assets/images/Renault-Zoe.png';
import Footer from './Footer.vue';

export default {
  components: {
    Footer
  },
  data() {
    return {
      vehicles: [
        { id: 1, year: 2014, registration: '64', make: 'Mercedes-Benz', model: 'CLA 250e Coupe Shooting Brake', description: '£550.90 /mo (PCP)', strikePrice: 23300, finance: 'Calculate', imageUrl: MercedesBenzImage, isFavorite: false },
        { id: 2, year: 2020, registration: '20', make: 'Peugeot 208', model: '1.2 PureTech 100 GT-Line', description: '£550.90 /mo (PCP)', finance: 'Calculate finance', strikePrice: 23300, imageUrl: Peugeot208Image, isFavorite: false },
        { id: 3, year: 2019, registration: '19', make: 'Renault Zoe', model: 'i R135 Rapid Charge ZE50', description: '£550.90 /mo (PCP)', finance: 'Calculate finance', strikePrice: 23300, imageUrl: RenaultZoeImage, isFavorite: false },
        { id: 4, year: 2020, registration: '20', make: 'Peugeot 208', model: '1.2 PureTech 100 GT-Line', description: '£550.90 /mo (PCP)', finance: 'Calculate finance', strikePrice: 23300, imageUrl: Peugeot208Image, isFavorite: false },
        { id: 5, year: 2014, registration: '64', make: 'Mercedes-Benz', model: 'CLA 250e Coupe Shooting Brake', description: '£550.90 /mo (PCP)', strikePrice: 23300, finance: 'Calculate', imageUrl: MercedesBenzImage, isFavorite: false },
        { id: 6, year: 2019, registration: '19', make: 'Renault Zoe', model: 'i R135 Rapid Charge ZE50', description: '£550.90 /mo (PCP)', finance: 'Calculate finance', strikePrice: 23300, imageUrl: RenaultZoeImage, isFavorite: false },
        { id: 7, year: 2014, registration: '64', make: 'Mercedes-Benz', model: 'CLA 250e Coupe Shooting Brake', description: '£550.90 /mo (PCP)', strikePrice: 23300, finance: 'Calculate', imageUrl: MercedesBenzImage, isFavorite: false },
        { id: 8, year: 2020, registration: '20', make: 'Peugeot 208', model: '1.2 PureTech 100 GT-Line', description: '£550.90 /mo (PCP)', finance: 'Calculate finance', strikePrice: 23300, imageUrl: Peugeot208Image, isFavorite: false },
        { id: 9, year: 2014, registration: '64', make: 'Mercedes-Benz', model: 'CLA 250e Coupe Shooting Brake', description: '£550.90 /mo (PCP)', strikePrice: 23300, finance: 'Calculate', imageUrl: MercedesBenzImage, isFavorite: false },
        { id: 10, year: 2020, registration: '20', make: 'Peugeot 208', model: '1.2 PureTech 100 GT-Line', description: '£550.90 /mo (PCP)', finance: 'Calculate finance', strikePrice: 23300, imageUrl: Peugeot208Image, isFavorite: false },
        { id: 11, year: 2019, registration: '19', make: 'Renault Zoe', model: 'i R135 Rapid Charge ZE50', description: '£550.90 /mo (PCP)', finance: 'Calculate finance', strikePrice: 23300, imageUrl: RenaultZoeImage, isFavorite: false },
        ],
      currentPage: 1,
      pageSize: 3,
    };
  },
  computed: {
    vehicles() {
    const vehicleStore = useVehicleStore();
    return vehicleStore.vehicles;
  },
    chunkedVehicles() {
      const chunkSize = this.pageSize;
      return this.vehicles.reduce((result, item, index) => {
        const chunkIndex = Math.floor(index / chunkSize);
        if (!result[chunkIndex]) result[chunkIndex] = [];
        result[chunkIndex].push(item);
        return result;
      }, []);
    },
    totalPages() {
      return Math.ceil(this.vehicles.length / this.pageSize);
    },
    currentPageChunks() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = this.currentPage * this.pageSize;
      return this.chunkedVehicles.slice(startIndex, endIndex);
    }
  },
  methods: {
    vehicleBadge(vehicle) {
      if (vehicle.make.includes('Renault Zoe') || vehicle.make.includes('Mercedes-Benz')) {
        return 'Used';
      } else if (vehicle.make.includes('Peugeot')) {
        return 'New';
      }
      return '';
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
      this.fetchData();
    },
    changePage(direction) {
      this.currentPage += direction;
      if (this.currentPage < 1) this.currentPage = 1;
      if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
      this.fetchData();
    },
    async fetchData() {
      const vehicleStore = useVehicleStore();
      await vehicleStore.fetchVehiclesData(this.currentPage);
    },
    toggleFavorite(vehicle) {
    const vehicleStore = useVehicleStore();
    vehicleStore.toggleFavorite(vehicle.id);
    vehicle.isFavorite = !vehicle.isFavorite;
  },
  },
  async mounted() {
    await this.fetchData();
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_base';
</style>