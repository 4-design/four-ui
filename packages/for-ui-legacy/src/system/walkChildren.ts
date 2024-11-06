import { Children, isValidElement, ReactNode } from 'react';

// walkChildren visits children recursively for given ReactNode root.
// If given f returns true, it will stop walking at the node (no more seeking children recursively).
export const walkChildren = (root: ReactNode, f: (node: ReactNode) => boolean | void): boolean => {
  Children.forEach(root, (node) => {
    if (f(node)) {
      return;
    }
    if (!isValidElement(node)) {
      return;
    }
    walkChildren(node.props.children, f);
  });
  return true;
};
