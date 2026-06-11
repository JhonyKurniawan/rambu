<template>

<table class="table table-bordered">


<thead>

<tr>

<th>No</th>
<th>Nama</th>
<th>Lokasi</th>
<th>Jenis</th>
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

<td>{{r.jenis_rambu}}</td>


<td>


<button
class="btn btn-warning me-2"
@click="$emit('edit',r)"
>
Edit
</button>



<button
class="btn btn-danger"
@click="hapus(r.id)"
>
Hapus
</button>


</td>


</tr>


</tbody>


</table>

</template>



<script setup>

import {ref,onMounted} from "vue"
import axios from "axios"


const data=ref([])



async function load(){


let res=await axios.get(
"/api/rambu"
)


data.value=res.data


}



async function hapus(id){


await axios.delete(
"/api/rambu?id="+id
)


load()


}


onMounted(load)


</script>