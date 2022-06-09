import { useEffect } from 'react';
import useLayoutEffect from '@react-hook/passive-layout-effect';
import useResizeObserver from '@react-hook/resize-observer';
import { useThrottle } from '@react-hook/throttle';
import useLatest from '@react-hook/latest';

import { useAnimationTargets } from './';


function useAxisDimensions(
  sliderRef: React.MutableRefObject<HTMLDivElement | null>,
  animationTargets: ReturnType<typeof useAnimationTargets>,
  itemsPerPageProp: string | number
): [number, number, React.Dispatch<React.SetStateAction<number>>] {
  const [ sliderDim, setSliderDim ] = useThrottle(0, 15, true);
  const [ itemDim, setItemDim ] = useThrottle(0, 15, true);

  const sizeIt = useLatest(() => {
    if (!sliderRef.current) {
      return;
    }

    setSliderDim(sliderRef.current.getBoundingClientRect().width);

    if (
      itemsPerPageProp === 'auto' &&
      animationTargets.current.length > 0 &&
      animationTargets.current[0]
    ) {
      setItemDim(animationTargets.current[0].getBoundingClientRect().width);
    }
  });

  const deps = [ sizeIt ];

  useLayoutEffect(sizeIt.current, deps);
  useResizeObserver(sliderRef, sizeIt.current);
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    function callback() {
      sizeIt.current();
    }

    window.addEventListener('resize', callback);
    window.addEventListener('orientationchange', callback);

    return () => {
      window.removeEventListener('resize', callback);
      window.removeEventListener('orientationchange', callback);
    };
  }, deps);

  return [ sliderDim, itemDim, setItemDim ];
}

export default useAxisDimensions;