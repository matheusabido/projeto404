import { createBrowserRouter } from "react-router-dom";

function lazy(path: string, name: string) {
  return { path, lazy: () => import(`./pages/${name}.tsx`).then(module => ({ Component: module.default })) };
}

const router = createBrowserRouter([
  lazy("/", "Home"),
]);

export default router;