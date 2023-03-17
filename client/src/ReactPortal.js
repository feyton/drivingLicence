import { useLayoutEffect } from "react";
import { createPortal } from "react-dom";

function ReactPortal({ children, wrapperId = "modal-wrapper" }) {
  const [wrapperElement, setWrapperElement] = useState(null);
  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);
    return () => {
      // delete the programatically created element
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);
  if (wrapperElement === null) return null;

  return createPortal(children, document.getElementById(wrapperId));
}

function createWrapperAndAppendToBody(wrapperId) {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

export default ReactPortal;
