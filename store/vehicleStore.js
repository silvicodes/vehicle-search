import { defineStore } from 'pinia';
import { fetchVehicles } from '../utils/apiService';

export const useVehicleStore = defineStore('vehicle', {
  state: () => ({
    vehicles: [],
    currentPage: 1,
    totalPages: 0,
    loading: false,
    favorites: [],
  }),
  actions: {
    async fetchVehiclesData(page = 1) {
      this.loading = true;
      try {
        const data = await fetchVehicles(page);
        this.vehicles = data.data;
        this.totalPages = Math.ceil(data.meta.total / data.meta.per_page);
        this.currentPage = page;
        this.syncFavorites();
      } catch (error) {
        console.error("Error fetching vehicles data:", error);
      } finally {
        this.loading = false;
      }
    },
    toggleFavorite(vehicleId) {
      const vehicle = this.vehicles.find(v => v.id === vehicleId);
      if (vehicle) {
        if (vehicle.isFavorite) {
          this.removeFromFavorites(vehicleId);
        } else {
          this.addToFavorites(vehicle);
        }
      }
    },
    addToFavorites(vehicle) {
      if (!this.favorites.some(v => v.id === vehicle.id)) {
        vehicle.isFavorite = true;
        this.favorites.push(vehicle);
      }
    },
    removeFromFavorites(vehicleId) {
      const index = this.favorites.findIndex(v => v.id === vehicleId);
      if (index !== -1) {
        const vehicle = this.favorites[index];
        vehicle.isFavorite = false;
        this.favorites.splice(index, 1);
      }
    },
    syncFavorites() {
      this.vehicles.forEach(vehicle => {
        const isFavorite = this.favorites.some(fav => fav.id === vehicle.id);
        vehicle.isFavorite = isFavorite;
      });
    },
  },
});
