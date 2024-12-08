<template>
  <div class="vehicle-card">
    <div class="vehicle-row">
      <div v-for="vehicle in currentPageVehicles" :key="vehicle.id" class="vehicle-item">
        <img :src="vehicle.imageUrl" alt="Vehicle Image" class="vehicle-image" />
        <div class="vehicle-info">
          <h3 class="vehicle-title">
            {{ vehicle.year }} ({{ vehicle.registration }}) {{ vehicle.make }}
          </h3>
          <h4 class="vehicle-model">{{ vehicle.model }}</h4>
          <p class="vehicle-description">
            <span class="bold-price">£550.90</span>
            <span class="normal-price"> /mo (PCP)</span>
          </p>
          <p class="vehicle-finance">{{ vehicle.finance }}</p>
          <button @click="toggleFavorite(vehicle)" :class="{'favorite': vehicle.isFavorite}">
            {{ vehicle.isFavorite ? 'Unfavorite' : 'Favorite' }}
          </button>
        </div>
        <p v-if="vehicle.strikePrice" :class="{'strike-price': true, 'highlight-red': vehicle.year === 2019 && vehicle.make.includes('Renault Zoe')}">
          £{{ vehicle.strikePrice }}
        </p>
      </div>
    </div>
    <div class="pagination-controls">
      <button @click="changePage(-1)" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="changePage(1)" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script>
import { useVehicleStore } from '../store/vehicleStore';

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 3,
    };
  },
  computed: {
    vehicles() {
      const vehicleStore = useVehicleStore();
      return vehicleStore.vehicles;
    },
    totalPages() {
      return Math.ceil(this.vehicles.length / this.pageSize);
    },
    currentPageVehicles() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = this.currentPage * this.pageSize;
      return this.vehicles.slice(start, end);
    }
  },
  methods: {
    changePage(direction) {
      const newPage = this.currentPage + direction;
      if (newPage > 0 && newPage <= this.totalPages) {
        this.currentPage = newPage;
        this.fetchData();
      }
    },
    toggleFavorite(vehicle) {
      const vehicleStore = useVehicleStore();
      vehicleStore.toggleFavorite(vehicle.id);
      vehicle.isFavorite = !vehicle.isFavorite;
    },
    async fetchData() {
      const vehicleStore = useVehicleStore();
      await vehicleStore.fetchVehiclesData(this.currentPage);
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>