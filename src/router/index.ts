import {
  createRouter,
  createWebHistory,
} from 'vue-router';

const routes = [
  {
    path: '/initiate',
    name: 'Initiation',
    component: () => import('../pages/Initiate.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/medicaments',
    name: 'Medicaments',
    component: () => import('../pages/Medicaments.vue')
  },
  {
    path: '/analyses',
    name: 'Analyses',
    component: () => import('../pages/Analyses.vue')
  },
  {
    path: '/agenda',
    name: 'Agenda',
    component: () => import('../pages/Agenda.vue')
  },
  {
    path: '/dossiers',
    name: 'Folders',
    component: () => import('../pages/Dossiers/Index.vue')
  },
  {
    path: '/dossiers/nouveau',
    name: 'NewFolder',
    component: () => import('../pages/Dossiers/New.vue')
  },
  {
    path: '/dossiers/:id',
    name: 'ShowFolder',
    component: () => import('../pages/Dossiers/NewShow.vue')
  },
  {
    path: '/salle-attente',
    name: 'WaitingList',
    component: () => import('../pages/SalleAttente/Index.vue')
  },
  {
    path: '/consultations',
    name: 'ShowConsult',
    component: () => import('../pages/Consultations/Index.vue')
  },
  {
    path: '/consultation',
    name: 'AddConsult',
    component: () => import('../pages/Consultations/NewNew.vue')
  },
  {
    path: '/laboratoires-medicament',
    name: 'MedicLab',
    component: () => import('../pages/Admin/Labomed.vue')
  },
  {
    path: '/actes-medicaux',
    name: 'ActeMedical',
    component: () => import('../pages/ActeMedical.vue')
  },
  {
    path: '/ordonnances',
    name: 'Ordonnances',
    component: () => import('../pages/Ordonnance.vue')
  },
  {
    path: '/licences',
    name: 'Licence',
    component: () => import('../pages/Admin/Licence.vue')
  },
  {
    path: '/caisse',
    name: 'Caisse',
    component: () => import('../pages/Caisse.vue')
  },
  {
    path: '/personnel',
    name: 'Personnel',
    component: () => import('../pages/Personnel.vue')
  }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router