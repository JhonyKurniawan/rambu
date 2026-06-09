<template>

<div class="card p-4 shadow">

<h3>Input Data Rambu</h3>

<input
class="form-control mb-2"
v-model="nama_rambu"
placeholder="Nama Rambu"
/>

<input
class="form-control mb-2"
v-model="lokasi_daerah"
placeholder="Lokasi Daerah"
/>

<input
class="form-control mb-2"
v-model="latitude"
placeholder="Latitude"
/>

<input
class="form-control mb-2"
v-model="longitude"
placeholder="Longitude"
/>

<input
type="file"
class="form-control mb-2"
@change="pilihFoto"
/>

<button
class="btn btn-primary"
@click="simpan"
>
Simpan
</button>

</div>

</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { watch } from 'vue'

const nama_rambu = ref('')
const lokasi_daerah = ref('')
const latitude = ref('')
const longitude = ref('')
const foto = ref(null)
const props = defineProps({
    dataEdit:Object
})
const id = ref('')
watch(
    () => props.dataEdit,
    (data) => {

        if(data){

            id.value = data.id
            nama_rambu.value = data.nama_rambu
            lokasi_daerah.value = data.lokasi_daerah
            latitude.value = data.latitude
            longitude.value = data.longitude

        }

    }
)

function pilihFoto(e){
    foto.value = e.target.files[0]
}

async function simpan(){

    let form = new FormData()

    form.append("id", id.value)

    form.append(
        "nama_rambu",
        nama_rambu.value
    )

    form.append(
        "lokasi_daerah",
        lokasi_daerah.value
    )

    form.append(
        "latitude",
        latitude.value
    )

    form.append(
        "longitude",
        longitude.value
    )

    if(id.value){

        await axios.post(
            "http://localhost/rambu-app/backend-rambu/edit.php",
            form
        )

        alert("Data berhasil diupdate")

    }else{

        form.append(
            "foto",
            foto.value
        )

        await axios.post(
            "http://localhost/rambu-app/backend-rambu/tambah.php",
            form
        )

        alert("Data berhasil disimpan")

    }

}
</script>