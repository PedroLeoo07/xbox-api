/**
 * Utilitários de performance
 */

/**
 * Lazy loader para componentes pesados
 */
export const lazyLoadComponent = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  delay: number = 0,
) => {
  return new Promise<{ default: T }>((resolve) => {
    setTimeout(() => {
      importFunc().then(resolve);
    }, delay);
  });
};

/**
 * Throttle function - limita a frequência de execução
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  let previous = 0;

  return function executedFunction(...args: Parameters<T>) {
    const now = Date.now();

    if (!previous) {
      previous = now;
    }

    const remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func(...args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func(...args);
      }, remaining);
    }
  };
}

/**
 * Memoização simples de funções
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Batch de promises para evitar sobrecarga
 */
export async function batchPromises<T>(
  promises: Promise<T>[],
  batchSize: number = 5,
): Promise<T[]> {
  const results: T[] = [];

  for (let i = 0; i < promises.length; i += batchSize) {
    const batch = promises.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch);
    results.push(...batchResults);
  }

  return results;
}

/**
 * IntersectionObserver helper para lazy loading de imagens/componentes
 */
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }

  return new IntersectionObserver(callback, {
    rootMargin: "50px",
    threshold: 0.01,
    ...options,
  });
}

/**
 * Preload de recursos críticos
 */
export function preloadResource(href: string, as: string) {
  if (typeof window === "undefined") return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = as;
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Web Worker helper para processamento pesado
 */
export function createWebWorker(workerFunction: Function): Worker | null {
  if (typeof window === "undefined" || !window.Worker) {
    return null;
  }

  const code = workerFunction.toString();
  const blob = new Blob([`(${code})()`], { type: "application/javascript" });
  const workerUrl = URL.createObjectURL(blob);

  return new Worker(workerUrl);
}
