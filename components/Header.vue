<template>
  <header class="header">
    <div class="header-container">
      <div class="header-left">
        <span class="car-count">Showing 24 of 339 cars</span>
        <div class="filters">
          <button
            v-for="filter in filters"
            :key="filter.value"
            :class="[
              'filter-button',
              { active: filter.value === activeFilter },
              { 'new-filter-active': filter.value === 'new' }
            ]"
            @click="setActiveFilter(filter.value)"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>
      <div class="header-right">
        <button class="sort-button" @click="toggleSort">
          <span>{{ selectedSortLabel }}</span>
          <i class="arrow-icon">&#8595;</i>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      filters: [
        { label: "All", value: "all" },
        { label: "Used", value: "used" },
        { label: "New", value: "new" },
        { label: "Offers", value: "offers" },
      ],
      activeFilter: "all",
      selectedSort: "lowest-price",
    };
  },
  computed: {
    selectedSortLabel() {
      const sortLabels = {
        "lowest-price": "Lowest price",
        "highest-price": "Highest price",
        newest: "Newest",
      };
      return sortLabels[this.selectedSort] || "Sort";
    },
  },
  methods: {
    setActiveFilter(filter) {
      this.activeFilter = filter;
      this.$emit("update-filter", filter);
    },
    toggleSort() {
      this.selectedSort = this.selectedSort === "lowest-price" ? "highest-price" : "lowest-price";
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';
@import '@/assets/scss/components';
</style>
