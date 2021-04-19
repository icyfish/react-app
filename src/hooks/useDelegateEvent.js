import { useEffect, useRef } from "react";

const useDelegateEvent = (type, selector, handler) => {
  let ref = useRef();
  useEffect(() => {
    const cur = ref.current;
    if (!cur) return;

    let handleEvent = (event) => {
      let targetNode = getTargetNode(cur, event.target, selector);
      if (targetNode) handler(event, targetNode);
    };

    cur.addEventListener(type, handleEvent, false);

    return () => {
      cur.removeEventListener(type, handleEvent, false);
    };
  }, [type, selector, handler]);

  return ref;
};

export default useDelegateEvent;

const getTargetNode = (container, target, selector) => {
  let elemList = container.querySelectorAll(selector);
  let targetNode = Array.from(elemList).find((elem) => {
    return isDescendant(elem, target);
  });
  return targetNode;
};

const isDescendant = (parent, child) => {
  if (parent === child) return true;
  let node = child.parentNode;
  while (node != null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};
