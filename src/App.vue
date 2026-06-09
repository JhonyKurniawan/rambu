<template>
  <div class="app-wrapper">

    <!-- NAVBAR -->
    <nav class="navbar-modern">
      <div class="nav-left">
        <div class="logo-box">R</div>
        <span class="brand">Deperjaro</span>
      </div>
    </nav>

    <!-- HEADER -->
    <header class="app-header animate-header">
      <h1>Pendataan Rambu Lalu Lintas</h1>
      <p>Sistem Informasi Dishub - Deperjaro</p>
    </header>

    <!-- CONTENT -->
    <div class="container content-box">

      <div class="form-card">
        <FormRambu :dataEdit="dataEdit" />
      </div>

      <div class="table-card">
        <TabelRambu @edit="terimaEdit" />
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

import FormRambu from './components/FormRambu.vue'
import TabelRambu from './components/TabelRambu.vue'

const dataEdit = ref(null)

function terimaEdit(data) {
  dataEdit.value = data
}
</script>

<style scoped>

/* =======================
   BACKGROUND DISHUB
======================= */
.app-wrapper {
  min-height: 100vh;
  background: url('@/assets/dishub.png') no-repeat center center;
  background-size: cover;
  position: relative;
}

/* overlay gelap */
.app-wrapper::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.65);
}

/* semua konten di atas overlay */
.navbar-modern,
.app-header,
.content-box {
  position: relative;
  z-index: 2;
}

/* =======================
   NAVBAR
======================= */
.navbar-modern {
  display: flex;
  align-items: center;

  padding: 12px 25px;
  background: rgba(11, 61, 145, 0.9);
  backdrop-filter: blur(10px);

  color: white;
  position: sticky;
  top: 0;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* LOGO R */
.logo-box {
  width: 38px;
  height: 38px;
  background: white;
  color: #0B3D91;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 18px;
}

.brand {
  font-weight: bold;
  font-size: 18px;
}

/* =======================
   HEADER
======================= */
.app-header {
  text-align: center;
  color: white;
  margin-top: 20px;
}

.animate-header {
  animation: slideFade 1s ease-in-out;
}

@keyframes slideFade {
  from {
    opacity: 0;
    transform: translateY(-25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* =======================
   CARD CONTENT
======================= */
.content-box {
  margin-top: 20px;
}

.form-card,
.table-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.15);
}

/* =======================
   RESPONSIVE
======================= */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
}
</style>