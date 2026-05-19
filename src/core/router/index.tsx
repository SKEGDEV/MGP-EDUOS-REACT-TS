import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import App from '../../App';
import { Desktop, Login } from '@features';

const rootRoute = createRootRoute({
  component: App,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Login,
});

const desktopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/desktop',
  component: Desktop,
});

const routeTree = rootRoute.addChildren([indexRoute, desktopRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
