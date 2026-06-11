<template>

<div>

<h3>Input Rambu</h3>


<input
class="form-control mb-2"
v-model="form.nama_rambu"
placeholder="Nama Rambu"
/>


<input
class="form-control mb-2"
v-model="form.lokasi_daerah"
placeholder="Lokasi Daerah"
/>


<input
class="form-control mb-2"
v-model="form.jenis_rambu"
placeholder="Jenis Rambu"
/>


<textarea
class="form-control mb-2"
v-model="form.keterangan"
placeholder="Keterangan"
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

import {ref,watch} from "vue"
import axios from "axios"


const props=defineProps({
dataEdit:Object
})


const form=ref({

nama_rambu:"",
lokasi_daerah:"",
jenis_rambu:"",
keterangan:""

})



watch(
()=>props.dataEdit,
(val)=>{

if(val)
form.value=val

}

)



async function simpan(){


if(props.dataEdit){


await axios.put(
"/api/rambu?id="+props.dataEdit.id,
form.value
)


}
else{


await axios.post(
"/api/rambu",
form.value
)

}


alert("Berhasil")


location.reload()


}


</script>