import { useEffect } from "react";

export function useAsync<T>(
  load: () => Promise<T>,
  onResult: (data: T) => void,
  dependencies: unknown[]
) {
  useEffect(() => {
    let isCanceled = false;
    load().then((result) => {
      if (!isCanceled) {
        onResult(result);
      }
    });

    return () => {
      isCanceled = true;
    };
  }, [...dependencies]); 
}
