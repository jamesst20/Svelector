export const isInViewport = (rect: Pick<DOMRect, "bottom" | "top">) => {
  if (rect.bottom < 0 || rect.top < 0) return false;
  return (
    rect.bottom + window.scrollY <= window.innerHeight + window.scrollY &&
    rect.top + window.scrollY <= window.innerHeight + window.scrollY
  );
};
