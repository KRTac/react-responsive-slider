import React, { useCallback } from 'react';
import ReactModal, { setAppElement } from 'react-modal';

import {
  default as SliderComponent,
  SliderComponentClassNames, SharedProps
} from './SliderComponent';
import { useFilteredChildren, useIndex } from '../hooks';


export function setModalAppElement(appEl: string | HTMLElement) {
  setAppElement(appEl);
}

export interface SliderClassNames {
  /**
   * Class attached to the modal element in fullscreen mode. If set, it will
   * override the default element styes applied by `react-modal`.
   * 
   * It can also be an object with `base`, `afterOpen` and `beforeClose` keys.
   * See [`react-modal`'s docs][1] for details.
   * 
   * [1]: https://reactcommunity.org/react-modal/styles/classes/
   */
  modalClassName?: string | ReactModal.Classes;

  /**
   * Class attached to the overlay element in fullscreen mode. If set, it will
   * override the default element styes applied by `react-modal`.
   * 
   * It can also be an object with `base`, `afterOpen` and `beforeClose` keys.
   * See [`react-modal`'s docs][1] for details.
   * 
   * [1]: https://reactcommunity.org/react-modal/styles/classes/
   */
  modalOverlayClassName?: string | ReactModal.Classes;

  /**
   * Class attached to the modal portal in fullscreen mode. Defaults to the
   * value set by `react-modal`.
   */
  modalPortalClassName?: string;

  /**
   * Class attached to the `body` element in fullscreen mode. Defaults to the
   * value set by `react-modal`.
   * 
   * **Note:** Due to the implementation of this prop in `react-modal`, it can
   * only be a single class name.
   */
  modalBodyOpenClassName?: string;

  /**
   * Class attached to the `html` element in fullscreen mode.
   * 
   * **Note:** Due to the implementation of this prop in `react-modal`, it can
   * only be a single class name.
   */
  modalHtmlOpenClassName?: string;
}
export interface SliderClassNames extends SliderComponentClassNames {}

export interface SliderProps {
  /**
   * A text describing the content of the lightbox modal. It gets passed to
   * [`react-modal`'s contentLabel][1]. This is important for
   * [screen reader accessibility][2].
   * 
   * [1]: http://reactcommunity.org/react-modal/accessibility/#aria
   * [2]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   */
  modalLabel?: string;

  /**
   * Enables the lightbox functionality.
   */
  withLightbox?: boolean;

  /**
   * Standard react children prop.
   */
  children?: React.ReactNode;

  /**
   * Determines the item displayed in the lightbox if `withLightbox` is set.
   * Internally the actual state could change by user interaction (sliding or
   * using the lightbox navigation), unless you set the `onLightboxIndexChange`
   * callback.
   */
  lightboxIndex?: number;

  /**
   * Optional callback run on lightbox index change (lightbox navigation or
   * swiping). If the user closes the lightbox, the index will be undefined. Use
   * it with the `lightboxIndex` prop to control a component's lightbox with
   * external state.
   * 
   * ```
   * function CustomSlider(props)
   *   const [
   *     activeSlide,
   *     setActiveSlide
   *   ] = useState(undefined);
   * 
   *   return (
   *     <Slider
   *       lightboxIndex={activeSlide}
   *       onLightboxIndexChange={setActiveSlide}
   *       {...props}
   *     />
   *   );
   * }
   * ```
   */
  onLightboxIndexChange?: (index?: number) => any;

  /**
   * Enable pinch zoom inside the lightbox
   */
  withLightboxScaling?: boolean;
}
export interface SliderProps extends SharedProps {}
export interface SliderProps extends SliderClassNames {}


function Slider({
  children: childrenProp,
  modalLabel,
  itemsPerPage,
  withLightbox,
  index, onIndexChange,
  lightboxIndex: lightboxIndexProp, onLightboxIndexChange,
  className, wrapperClassName,
  slideClassName, activeSlideClassName, visibleSlideClassName,
  previousBtnClassName, nextBtnClassName,
  modalClassName, modalOverlayClassName, modalPortalClassName,
  modalBodyOpenClassName, modalHtmlOpenClassName,
  itemsPerPageClassName,
  navigationTriggers, navigationTarget,
  withScaling, withLightboxScaling
}: SliderProps) {
  const [ body, lightboxBody ] = useFilteredChildren(childrenProp);
  const [
    lightboxIndex, setLightboxIndex
  ] = useIndex(lightboxBody.length, lightboxIndexProp, onLightboxIndexChange);

  const handleItemClick = useCallback((idx) => {
    if (withLightbox) {
      setLightboxIndex(idx);
    }
  }, [ withLightbox, setLightboxIndex ]);

  const sharedProps = {
    className,
    slideClassName,
    activeSlideClassName,
    visibleSlideClassName,
    wrapperClassName,
    previousBtnClassName,
    nextBtnClassName,
    itemsPerPageClassName,
    navigationTriggers,
    navigationTarget
  };

  return (
    <>
      {withLightbox && (
        <ReactModal
          isOpen={typeof lightboxIndex !== 'undefined'}
          contentLabel={modalLabel}
          onRequestClose={() => setLightboxIndex(undefined)}
          className={modalClassName}
          overlayClassName={modalOverlayClassName}
          portalClassName={modalPortalClassName}
          bodyOpenClassName={modalBodyOpenClassName}
          htmlOpenClassName={modalHtmlOpenClassName}
        >
          <SliderComponent
            {...sharedProps}
            index={lightboxIndex}
            onIndexChange={setLightboxIndex}
            withScaling={withLightboxScaling}
            lightboxMode
          >
            {lightboxBody}
          </SliderComponent>
        </ReactModal>
      )}
      <SliderComponent
        {...sharedProps}
        itemsPerPage={itemsPerPage}
        index={index}
        onIndexChange={onIndexChange}
        onItemClick={handleItemClick}
        withScaling={withScaling}
      >
        {body}
      </SliderComponent>
    </>
  );
}

Slider.defaultProps = {
  ...SliderComponent.defaultProps,
  withLightbox: false,
  withLightboxScaling: true
};

export default Slider;
