export const stopPropagation = <T extends Event>(func: (e: T) => void) => {
  return (e: T) => {
    e.stopPropagation();
    func(e);
  };
};
