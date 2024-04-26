import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Navigation from './components/Navigation';
import Authors from './views/Authors';
import Home from './views/Home';
import Books from './views/Books';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Navigation />}>
      <Route index element={<Home />} />
      <Route path='/authors' element={<Authors />} />
      <Route path='/books' element={<Books />} />
    </Route>
  )
);

export default function App() {
  return (
      <FluentProvider theme={webLightTheme}>
        <RouterProvider router={router} />
      </FluentProvider>
  );
}