/**
 * Kunji (कुंजी) — Hand-Rolled Client-Side Hash Router
 * Supports parameterized routes (#/entry/:id, #/add/:category), route listeners,
 * scroll restoration, and seamless view mounting.
 */

const KunjiRouter = (() => {
  const routes = {};
  let currentRoute = { path: '', params: {}, query: {} };
  let routeChangeListeners = [];

  function parseHash(hash) {
    // Remove leading # and whitespace
    let cleanHash = hash.replace(/^#\/?/, '').trim();
    if (!cleanHash) {
      cleanHash = '';
    }

    // Split query string if present
    const [pathPart, queryPart] = cleanHash.split('?');
    const segments = pathPart ? pathPart.split('/').filter(Boolean) : [];
    
    const query = {};
    if (queryPart) {
      const searchParams = new URLSearchParams(queryPart);
      for (const [key, value] of searchParams.entries()) {
        query[key] = value;
      }
    }

    return { segments, rawPath: pathPart || '', query };
  }

  function register(pattern, handler) {
    const patternSegments = pattern.replace(/^#\/?/, '').split('/').filter(Boolean);
    routes[pattern] = {
      pattern,
      segments: patternSegments,
      handler
    };
  }

  function matchRoute(hash) {
    const { segments, rawPath, query } = parseHash(hash);

    // Exact root match
    if (segments.length === 0) {
      return {
        handler: routes['']?.handler || routes['/']?.handler,
        params: {},
        query,
        path: '/'
      };
    }

    // Try finding matching route pattern
    for (const key in routes) {
      const route = routes[key];
      if (route.segments.length !== segments.length) continue;

      let matched = true;
      const params = {};

      for (let i = 0; i < route.segments.length; i++) {
        const patternSeg = route.segments[i];
        const actualSeg = segments[i];

        if (patternSeg.startsWith(':')) {
          const paramName = patternSeg.slice(1);
          params[paramName] = decodeURIComponent(actualSeg);
        } else if (patternSeg.toLowerCase() !== actualSeg.toLowerCase()) {
          matched = false;
          break;
        }
      }

      if (matched) {
        return {
          handler: route.handler,
          params,
          query,
          path: rawPath
        };
      }
    }

    // Fallback to home or landing
    return {
      handler: routes['home']?.handler || routes['']?.handler,
      params: {},
      query,
      path: rawPath
    };
  }

  function handleRouting() {
    const hash = window.location.hash || '#/';
    const match = matchRoute(hash);

    currentRoute = {
      path: match.path,
      params: match.params,
      query: match.query
    };

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Execute route handler
    if (typeof match.handler === 'function') {
      match.handler(match.params, match.query);
    }

    // Notify listeners
    routeChangeListeners.forEach(listener => {
      try {
        listener(currentRoute);
      } catch (err) {
        console.error('Error in route change listener:', err);
      }
    });
  }

  function navigate(path) {
    const targetHash = path.startsWith('#') ? path : '#' + (path.startsWith('/') ? path : '/' + path);
    if (window.location.hash === targetHash) {
      handleRouting();
    } else {
      window.location.hash = targetHash;
    }
  }

  function on(event, callback) {
    if (event === 'change') {
      routeChangeListeners.push(callback);
    }
  }

  function getCurrentRoute() {
    return currentRoute;
  }

  function init() {
    window.addEventListener('hashchange', handleRouting);
    window.addEventListener('load', handleRouting);
  }

  return {
    init,
    register,
    navigate,
    on,
    getCurrentRoute,
    handleRouting
  };
})();
