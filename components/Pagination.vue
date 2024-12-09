<template>
  <div class="pagination">
    <button @click="changePage(-1)" :disabled="currentPage <= 1">Prev</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="changePage(1)" :disabled="currentPage >= totalPages">Next</button>
  </div>
</template>

<script>
import { useVehicleStore } from '@/store/vehicleStore';

export default {
  computed: {
    currentPage() {
      return useVehicleStore().currentPage;
    },
    totalPages() {
      return useVehicleStore().totalPages;
    }
  },
  methods: {
  changePage(direction) {
    const newPage = this.currentPage + direction;
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.$emit('changePage', newPage);
    }
  }
}
};
</script>