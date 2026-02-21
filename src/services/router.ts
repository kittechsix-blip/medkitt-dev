// MedKitt — Hash-Based SPA Router
// Matches URL patterns and calls registered handlers on navigation.

/** Parsed route parameters extracted from the URL pattern */
export interface RouteParams {
  [key: string]: string;
}

/** A route handler receives the matched params and renders into the app */
type RouteHandler = (params: RouteParams) => void;

interface Route {
  /** Pattern like '/category/:id' — segments starting with : are params */
  pattern: string;
  /** Segments of the pattern split by '/' */
  segments: string[];
  handler: RouteHandler;
}

class Router {
  private routes: Route[] = [];
  private notFoundHandler: RouteHandler | null = null;

  /** Register a route pattern with a handler.
   *  Pattern examples: '/', '/category/:id', '/tree/:id/node/:nodeId' */
  on(pattern: string, handler: RouteHandler): void {
    const segments = pattern.split('/').filter(Boolean);
    this.routes.push({ pattern, segments, handler });
  }

  /** Handler called when no route matches the current hash */
  onNotFound(handler: RouteHandler): void {
    this.notFoundHandler = handler;
  }

  /** Start listening for hash changes and handle the current hash */
  start(): void {
    window.addEventListener('hashchange', () => this.resolve());
    this.resolve();
  }

  /** Programmatic navigation — sets the hash which triggers hashchange */
  navigate(path: string): void {
    window.location.hash = '#' + path;
  }

  /** Get the current path (everything after #) */
  currentPath(): string {
    const hash = window.location.hash.slice(1); // remove '#'
    return hash || '/';
  }

  /** Match the current hash against registered routes and call the handler */
  private resolve(): void {
    const path = this.currentPath();
    const pathSegments = path.split('/').filter(Boolean);

    for (const route of this.routes) {
      const params = this.match(route.segments, pathSegments);
      if (params !== null) {
        route.handler(params);
        return;
      }
    }

    // No route matched
    if (this.notFoundHandler) {
      this.notFoundHandler({});
    }
  }

  /** Try to match path segments against a route pattern.
   *  Returns params if matched, null if no match. */
  private match(
    routeSegments: string[],
    pathSegments: string[]
  ): RouteParams | null {
    // Root route: both should be empty
    if (routeSegments.length === 0 && pathSegments.length === 0) {
      return {};
    }

    if (routeSegments.length !== pathSegments.length) {
      return null;
    }

    const params: RouteParams = {};

    for (let i = 0; i < routeSegments.length; i++) {
      const routeSeg = routeSegments[i];
      const pathSeg = pathSegments[i];

      if (routeSeg.startsWith(':')) {
        // Dynamic param — capture it
        const paramName = routeSeg.slice(1);
        params[paramName] = decodeURIComponent(pathSeg);
      } else if (routeSeg !== pathSeg) {
        // Static segment doesn't match
        return null;
      }
    }

    return params;
  }
}

/** Singleton router instance for the app */
export const router = new Router();
