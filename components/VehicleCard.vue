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

<style scoped>
.vehicle-card {
  display: flex;
  flex-direction: column;
  gap: 40px;
  background: #fff;
}

.vehicle-row {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.vehicle-item {
  width: 300px;
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  padding: 16px;
  transition: all 0.3s ease-in-out;
}

.vehicle-image-container {
  position: relative;
}

.vehicle-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
}

.used-badge, .new-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 14px;
  color: #FFF;
  background-color: #3F3A50;
}

.new-badge {
  background-color: #3F3A50;
}

.vehicle-info {
  margin-top: 16px;
}

.vehicle-title {
  font-size: 18px;
  font-weight: 600;
  color: #212121;
  margin-bottom: 8px;
}

.vehicle-model {
  font-size: 16px;
  font-weight: 500;
  color: #55595D;
  margin-bottom: 12px;
}

.vehicle-description {
  font-size: 14px;
  color: #757575;
}

.bold-price {
  font-weight: bold;
  color: #212121;
}

.normal-price {
  font-weight: normal;
  color: #757575;
}

.vehicle-finance {
  font-size: 14px;
  font-weight: normal;
  color: #7572FF;
}

.strike-price {
  font-size: 16px;
  color: #000000;
  text-decoration: none;
  margin-top: 8px;
  display: inline-block;
}

.highlight-red {
  color: red !important;
  text-decoration: line-through !important;
}

.value-your-car-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
}

.value-your-car {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 273px;
  padding: 30px;
  border-radius: 16px;
  border: 1px solid var(--Framework-Borders, #D1D6E0);
  background: var(--Framework-Light, #F6F7FB);
}

.value-your-car label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
}

.value-your-car input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.value-your-car button {
  padding: 10px 20px;
  background-color: #7572FF;
  color: white;
  border: none;
  border-radius: 16px;
  cursor: pointer;
}

.value-your-car button:hover {
  background-color: #5752D6;
}

/* Media Query for mobile devices */
@media (max-width: 768px) {
  .vehicle-row {
    gap: 10px;
  }

  .vehicle-item {
    width: 45%;
    padding: 12px;
  }

  .vehicle-title {
    font-size: 16px;
  }

  .vehicle-model {
    font-size: 14px;
  }

  .vehicle-description {
    font-size: 12px;
  }

  .value-your-car-container {
    margin-top: 10px;
  }

  .value-your-car {
    padding: 10px;
  }

  .value-your-car button {
    padding: 8px 16px;
  }
}

/* Media Query for very small devices (compact phones) */
@media (max-width: 480px) {
  .vehicle-item {
    width: 100%;
    padding: 8px;
  }

  .vehicle-row {
    flex-direction: column;
  }

  .vehicle-title {
    font-size: 14px;
  }

  .vehicle-description {
    font-size: 12px;
  }
}
</style>