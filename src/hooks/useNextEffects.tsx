import { useEffect, useRef } from 'react';

const useNextEffects = (
  effect: React.EffectCallback,
  deps?: React.DependencyList | undefined
): void => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) effect();
    else didMount.current = true;
  }, deps);
};

export default useNextEffects;
