<template>

<div class="mt-4">

<h3>Data Rambu</h3>

<div class="mb-3">

<button
class="btn btn-success"
@click="exportExcel"
>
Export Excel
</button>

</div>

<table class="table table-bordered">

<thead>

<tr>
    <th>No</th>
    <th>Foto</th>
    <th>Nama Rambu</th>
    <th>Lokasi Daerah</th>
    <th>Latitude</th>
    <th>Longitude</th>
    <th>Aksi</th>
</tr>

</thead>

<tbody>

<tr
v-for="(item,index) in data"
:key="item.id"
>

<td>
  {{ index + 1 }}
</td>

<td>
  <img
    v-if="item.foto"
    :src="item.foto.startsWith('http') ? item.foto : `http://localhost/rambu-app/backend-rambu/uploads/${item.foto}`"
    style="
      width:80px;
      height:80px;
      object-fit:cover;
      border-radius:8px;
    "
  />
  <span v-else class="text-muted">Tidak ada foto</span>
</td>

<td>
  {{ item.nama_rambu }}
</td>

<td>
  {{ item.lokasi_daerah }}
</td>

<td>
  {{ item.latitude }}
</td>

<td>
  {{ item.longitude }}
</td>

<td>

<button
class="btn btn-warning btn-sm me-2"
@click="editData(item)"
>
Edit
</button>

<button
class="btn btn-danger btn-sm"
@click="hapus(item.id)"
>
Hapus
</button>

</td>

</tr>

</tbody>

</table>

</div>

</template>

<script setup>

import axios from 'axios'
import { ref,onMounted } from 'vue'
import * as XLSX from 'xlsx'

const data = ref([])
const API = import.meta.env.VITE_API_URL

async function loadData(){
  const res = await axios.get(API + '/rambu')
  data.value = res.data
}

onMounted(() => {
  loadData()
})

function exportExcel(){
    const exportData = data.value.map(item => ({
        "Nama Rambu": item.nama_rambu,
        "Lokasi Daerah": item.lokasi_daerah,
        "Latitude": item.latitude,
        "Longitude": item.longitude,
        "Foto": item.foto
    }))
    const worksheet =
        XLSX.utils.json_to_sheet(exportData)

    const workbook =
        XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Data Rambu"
    )

    XLSX.writeFile(
        workbook,
        "Data_Rambu.xlsx"
    )
}

async function hapus(id){
    if(!confirm("Yakin ingin menghapus data?")){
        return
    }

    await axios.delete(`${API}/rambu?id=${id}`)
    loadData()
}

const emit = defineEmits([
    'edit'
])

function editData(item){
    emit('edit', item)
}

</script>