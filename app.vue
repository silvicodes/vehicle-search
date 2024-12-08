<template>
  <div id="app">
    <Header />
    <VehicleCard />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import VehicleCard from "@/components/VehicleCard.vue";

export default {
  components: {
    Header,
    VehicleCard,
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  color: #333;
}
</style>
