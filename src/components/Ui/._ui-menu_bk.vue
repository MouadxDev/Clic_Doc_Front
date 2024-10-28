<script setup lang="ts">
    import {Menu} from "../../../core/Types/Components/Menu"
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '../../../core/Data/stores/auth';

    const props = defineProps<Menu>()
    const router = useRouter()
    const store = useAuthStore()

    
</script>
<template>
    <div class="rounded-r-2xl p-4 pt-6 bg-white  overflow-y-auto">
        <div class="text-center rounded-2xl mb-3 " v-if="props.hasLogo==true">
            <img :src="props.logo" class="mx-auto h-20" >
            <img src="/click-doc-text.png" class="mx-auto" >
        </div>
        <div class="">
            <ul class="menu menu-sm rounded-box">
                <li  @click="router.push('/')">
                    <a>
                        <el-icon  > <img src="https://test.clickdoc.ma/tableau-de-bord.png" > </el-icon> Tableau de bord
                    </a>
                </li>
                <li  @click="router.push('/agenda')">
                    <a>
                        <el-icon  > <img src="https://test.clickdoc.ma/agenda.png" > </el-icon> Agenda
                    </a>
                </li>
            </ul>
            <ul class="menu menu-sm rounded-box" >
                <span  v-if="store.user.role=='superAdmin'">
                    <li class="menu-title text-uppercase"> Click Admin </li>
                    <li @click="router.push('/licences')">
                        <a>
                            <el-icon> <img src="https://test.clickdoc.ma/business-people.png" ></el-icon> Licences
                        </a>
                    </li>
                    <li @click="router.push('/laboratoires-medicament')">
                        <a>
                            <el-icon> <img src="https://test.clickdoc.ma/medicaments.png" ></el-icon> Meds Labo
                        </a>
                    </li>
                </span>
                <span  v-else>
                    <li class="menu-title text-uppercase"> Click Cabinet </li>
                    <li  @click="router.push('/salle-attente')" v-if="store.user.role != 'assistant' || store.privileges[0].enable==1">
                        <a>
                            <el-icon  > <img src="https://test.clickdoc.ma/salle-dattente.png" > </el-icon> Salle d'attente
                        </a>
                    </li>
                    <li @click="router.push('/dossiers')" v-if="store.user.role != 'assistant' || (store.privileges[1].enable==1 && store.privileges[1].view==1)" >
                        <a>
                            <el-icon> <img src="https://test.clickdoc.ma/dossiers.png" ></el-icon> Dossiers
                        </a>
                    </li>
                    <li @click="router.push('/consultations')" v-if="store.user.role != 'assistant' || store.privileges[2].enable==1">
                        <a>
                            <el-icon> <img src="https://test.clickdoc.ma/consultant.png" ></el-icon> Consultations
                        </a>
                    </li>
                    <li @click="router.push('/ordonnances')" v-if="store.user.role != 'assistant' || store.privileges[3].enable==1 " >
                        <a>
                            <el-icon> <img src="https://test.clickdoc.ma/ordonnance.png" ></el-icon> Ordonnances
                        </a>
                    </li>
                    <li @click="router.push('/analyses')" v-if="store.user.role != 'assistant' || store.privileges[4].enable==1" >
                        <a>
                            <el-icon> <img src="https://test.clickdoc.ma/analyse-de-sang.png" ></el-icon> Analyses
                        </a>
                    </li>
                    <li class="menu-title text-uppercase "> Click Gestion </li>
                    <li  @click="router.push('/actes-medicaux')">
                        <a>
                            <el-icon  > <img src="https://test.clickdoc.ma/soins-medicaux.png" > </el-icon> Actes médicaux
                        </a>
                    </li>
                    <li @click="router.push('/personnel')" v-if="store.user.role != 'assistant' || store.privileges[5].enable==1">
                        <a>
                            <el-icon> <img src="https://test.clickdoc.ma/business-people.png"  ></el-icon> Personnel
                        </a>
                    </li>
                    <li @click="router.push('/medicaments')">
                        <a>
                            <el-icon> <img src="https://test.clickdoc.ma/medicaments.png" ></el-icon> Médicaments
                        </a>
                    </li>
                    <li @click="router.push('/analyses')">
                        <a>
                            <el-icon> <img src="https://test.clickdoc.ma/analyses.png" ></el-icon> Liste Analyses
                        </a>
                    </li>
                    <li class="menu-title text-uppercase "> Click COMPTA </li>
                    <li  @click="router.push('/caisse')">
                        <a>
                            <el-icon  > <img src="https://test.clickdoc.ma/caisse-enregistreuse.png" > </el-icon> Caisse
                        </a>
                    </li>
                </span>
            </ul>
        </div>
    </div>
</template>



<script setup lang="ts">
import { Menu } from "../../../core/Types/Components/Menu";
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../../core/Data/stores/auth';
import menuItems from '../../assets/Static/menuItems.json'; // Adjust the path as needed

const props = defineProps<Menu>();
const router = useRouter();
const store = useAuthStore();
</script>

<template>
    <div class="rounded-r-2xl p-4 pt-6 bg-white overflow-y-auto">
        <div class="text-center rounded-2xl mb-3" v-if="props.hasLogo">
            <img :src="props.logo" class="mx-auto h-20" />
            <img src="/click-doc-text.png" class="mx-auto" />
        </div>
        <div>
            <ul class="menu menu-sm rounded-box">
                <!-- Main Menu -->
                <li v-for="item in menuItems.mainMenu" :key="item.text" @click="router.push(item.route)">
                    <a>
                        <el-icon><img :src="item.icon" /></el-icon> {{ item.text }}
                    </a>
                </li>
            </ul>
            <ul class="menu menu-sm rounded-box">
                <!-- Admin Menu -->
                <span v-if="store.user.role === 'superAdmin'">
                    <li class="menu-title text-uppercase">Click Admin</li>
                    <li v-for="item in menuItems.adminMenu" :key="item.text" @click="router.push(item.route)">
                        <a>
                            <el-icon><img :src="item.icon" /></el-icon> {{ item.text }}
                        </a>
                    </li>
                </span>
                <!-- Default Menu -->
                <span v-else>
                    <li class="menu-title text-uppercase">Click Cabinet</li>
                    <li v-for="item in menuItems.defaultMenu" 
                        :key="item.text" 
                        @click="router.push(item.route)" 
                        v-if="(store.user.role !== 'assistant' || item.enable)"
                    >
                        <a>
                            <el-icon><img :src="item.icon" /></el-icon> {{ item.text }}
                        </a>
                    </li>
                </span>
            </ul>
        </div>
    </div>
</template>
