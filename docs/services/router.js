// EM Decision Trees — Hash-Based SPA Router
// Matches URL patterns and calls registered handlers on navigation.
class Router {
    constructor() {
        this.routes = [];
        this.notFoundHandler = null;
    }
    /** Register a route pattern with a handler.
     *  Pattern examples: '/', '/category/:id', '/tree/:id/node/:nodeId' */
    on(pattern, handler) {
        const segments = pattern.split('/').filter(Boolean);
        this.routes.push({ pattern, segments, handler });
    }
    /** Handler called when no route matches the current hash */
    onNotFound(handler) {
        this.notFoundHandler = handler;
    }
    /** Start listening for hash changes and handle the current hash */
    start() {
        window.addEventListener('hashchange', () => this.resolve());
        this.resolve();
    }
    /** Programmatic navigation — sets the hash which triggers hashchange */
    navigate(path) {
        window.location.hash = '#' + path;
    }
    /** Get the current path (everything after #) */
    currentPath() {
        const hash = window.location.hash.slice(1); // remove '#'
        return hash || '/';
    }
    /** Match the current hash against registered routes and call the handler */
    resolve() {
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
    match(routeSegments, pathSegments) {
        // Root route: both should be empty
        if (routeSegments.length === 0 && pathSegments.length === 0) {
            return {};
        }
        if (routeSegments.length !== pathSegments.length) {
            return null;
        }
        const params = {};
        for (let i = 0; i < routeSegments.length; i++) {
            const routeSeg = routeSegments[i];
            const pathSeg = pathSegments[i];
            if (routeSeg.startsWith(':')) {
                // Dynamic param — capture it
                const paramName = routeSeg.slice(1);
                params[paramName] = decodeURIComponent(pathSeg);
            }
            else if (routeSeg !== pathSeg) {
                // Static segment doesn't match
                return null;
            }
        }
        return params;
    }
}
/** Singleton router instance for the app */
export const router = new Router();
