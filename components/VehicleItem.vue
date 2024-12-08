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
  import { ref, computed } from 'vue';
  import { useFavoritesStore } from '@/store/favorites';
  export default {
    props: {
      vehicle: Object
    },
    setup(props) {
      const favoritesStore = useFavoritesStore();
  
      const isFavorite = computed(() => favoritesStore.isFavorite(props.vehicle.id));
  
      const toggleFavorite = () => {
        favoritesStore.toggleFavorite(props.vehicle.id);
      };
  
      return {
        isFavorite,
        toggleFavorite
      };
    }
  }
  </script>
  
  <style scoped>
  .vehicle-item {
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
  }
  </style>  