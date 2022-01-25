import React from 'react';
import { 
    HomeScreen, 
    MateriScreen, 
    MateriUploadScreen, 
    NewsUpdateScreen, 
    SettingScreen
} from '../screens';


//
export const routesApp = [
    {
        id: 0,
        name: "Home",
        title: "Home",
        icon: "home",
        component: HomeScreen
    },
    {
        id: 1,
        name: "NewsUpdate",
        title: "News Update",
        icon: "paper-plane",
        component: NewsUpdateScreen
    },
    {
        id: 2,
        name: "Materi",
        title: "Materi",
        icon: "file",
        component: MateriScreen
    },
    {
        id: 3,
        name: "MateriUpload",
        title: "Materi Upload",
        icon: "plus",
        component: MateriUploadScreen
    },
    {
        id: 4,
        name: "Setting",
        title: "Setting",
        icon: "cog",
        component: SettingScreen
    }
]