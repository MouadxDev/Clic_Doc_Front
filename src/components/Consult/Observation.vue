<script setup lang="ts">

    import { Ref,ref,onBeforeMount } from 'vue';
    import { Observation } from '../../../core/Clients/Observation';
    import {useConsultStore} from "../../../core/Data/stores/consultation"


    const observation : Ref<any> = ref({})
    const consult =  useConsultStore();
    const observationClient = new Observation()

    async function setObservation(){
        await observationClient.update(observation.value)
        observation.value = await getObservation()
    }

    async function getObservation(){
        return  await observationClient.getByID(consult.observation_id)
    }

    onBeforeMount(async ()=>{
        observation.value = await getObservation()
    })
</script>
<template>
    <el-form label-position="top">
        <el-form-item label="Diagnostic">
            <el-input type="textarea" :disabled="!consult.edit" v-model="observation.observation" @change="async ()=>{await setObservation()}" :autosize="{ minRows: 10, maxRows: 20 }" />
        </el-form-item>
    </el-form>
</template>