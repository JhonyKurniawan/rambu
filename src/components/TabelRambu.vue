<template>

<table class="table table-bordered">


<thead>

<tr>

<th>Nama</th>
<th>Lokasi</th>
<th>Latitude</th>
<th>Longitude</th>
<th>Foto</th>
<th>Aksi</th>

</tr>

</thead>


<tbody>


<tr
v-for="(r,i) in data"
:key="r.id"
>


<td>{{i+1}}</td>

<td>{{r.nama_rambu}}</td>

<td>{{r.lokasi_daerah}}</td>

<td>{{r.latitude}}</td>

<td>{{r.longitude}}</td>

<td>

<img 
:src="r.foto"
width="80"
/>

</td>


</tr>


<tr v-if="data.length===0">

<td colspan="5" class="text-center">

Data belum ada

</td>

</tr>


</tbody>


</table>

</template>



<script setup>

import {ref,onMounted} from "vue"
import axios from "axios"


const data=ref([])


const API = import.meta.env.VITE_API_URL



async function load(){

try{


let res = await axios.get(
API + "/rambu"
)


data.value = res.data


console.log(res.data)


}catch(error){

console.log(
"API ERROR",
error
)

}


}



async function hapus(id){


try{


await axios.delete(
API+"/rambu?id="+id
)


load()


}catch(error){

console.log(error)

}


}



onMounted(()=>{

load()

})


</script>