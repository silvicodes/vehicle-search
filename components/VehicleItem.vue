<template>
  <div class="vehicle-item">
    <h3>{{ vehicle.make }} {{ vehicle.model }}</h3>
    <p>{{ vehicle.year }}</p>
    <button @click="toggleFavorite">
      {{ isFavorite ? 'Unfavorite' : 'Favorite' }}
    </button>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useVehicleStore } from '@/store/vehicleStore';

export default {
  props: {
    vehicle: Object,
  },
  setup(props) {
    const vehicleStore = useVehicleStore();

    const isFavorite = computed(() => {
      return vehicleStore.favorites.some(fav => fav.id === props.vehicle.id);
    });

    const toggleFavorite = () => {
      vehicleStore.toggleFavorite(props.vehicle.id);
    };

    return {
      isFavorite,
      toggleFavorite,
    };
  },
};
</script>

<style scoped>
.vehicle-item {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
}
</style>