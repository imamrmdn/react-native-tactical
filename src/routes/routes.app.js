import { Root } from "./routes.root";
import { MateriDetailScreen, VideoMateriScreen } from "../screens";

//
export const routesApp = [
    {
        id: 0,
        name: "Root",
        title: "Root",
        component: Root
    },
    {
        id: 1,
        name: "Materi Detail",
        title: "Materi Detail",
        component: MateriDetailScreen
    },
    {
        id: 2,
        name: "Video Detail",
        title: "Video Detail",
        component: VideoMateriScreen
    }
]