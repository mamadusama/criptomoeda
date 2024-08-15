import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { Detail } from "./pages/details";
import { NotFound } from "./pages/notfound";
import { Layout } from "./components/layout";


const routers = createBrowserRouter([
    {
        element: <Layout /> ,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/detail/:cripto",
                element: <Detail />,
            },
            {
                path: "*",
                element: <NotFound />,
            }
        ]

    }
])

export { routers };

