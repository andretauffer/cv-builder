import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usePopper } from "react-popper";


const Container = styled.div`
  position: relative;
  width: 100%;
  

  #tooltip[data-popper-placement^='top'] > #arrow {
    bottom: -4px;
  }

  #tooltip[data-popper-placement^='bottom'] > #arrow {
    top: -4px;
  }

  #tooltip[data-popper-placement^='left'] > #arrow {
    right: -4px;
  }

  #tooltip[data-popper-placement^='right'] > #arrow {
    left: -4px;
  }

  #tooltip {
    display: none;
  }

  #tooltip[data-show] {
    display: block;
  }
`;

export const PopperContent = styled.div`
  background: #333;
  color: white;
  font-weight: bold;
  padding: 4px 8px;
  font-size: 13px;
  border-radius: 4px;
  max-width: 100%;
  
  (&.)[data-popper-placement^='top'] > #arrow {
    bottom: -4px;
  }

  (&.)[data-popper-placement^='bottom'] > #arrow {
    top: -4px;
  }

  (&.)[data-popper-placement^='left'] > #arrow {
    right: -4px;
  }

  (&.)[data-popper-placement^='right'] > #arrow {
    left: -4px;
  }
`;


const Arrow = styled.div`

  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
  visibility: hidden;

  ::before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
    visibility: visible;
    content: '';
    transform: rotate(45deg);
  }
 
`;

const sameWidth = {
  name: "sameWidth",
  enabled: true,
  phase: "beforeWrite",
  requires: ["computeStyles"],
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  effect: ({ state }) => {
    state.elements.popper.style.width = `${state.elements.reference.offsetWidth
      }px`;
  }
};

export default ({ content, useSameWidth, listen, children }) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const options = {
    placement: "top",
    // strategy: "fixed",
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
    ],
  };
  if (useSameWidth) {
    options.modifiers.push(sameWidth);
  }


  const { styles, attributes, update, ...rest } = usePopper(referenceElement, popperElement, options);

  useEffect(() => {
    if (update) {
      update();
    }
  }, [listen])

  const show = () => {
    if (popperElement) {

      popperElement.setAttribute('data-show', '');

      update();
    }
  }

  const hide = () => {
    if (popperElement) {
      popperElement.removeAttribute('data-show');
    }

  }
  return <Container
    onMouseEnter={show}
    onFocus={show}
    onMouseLeave={hide}
    onBlur={hide}
    ref={setReferenceElement} >
    {content &&
      <PopperContent id="tooltip" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        {content}
        <Arrow id="arrow" ref={setArrowElement} style={styles.arrow} />
      </PopperContent>
    }
    {children}
  </Container>
}