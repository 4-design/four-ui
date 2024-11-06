import { FC, isValidElement, ReactElement, ReactNode } from 'react';

export type TextDefaultStylerProps = {
  /**
   * 適用されるラベル等を指定
   *
   * contentがstringやnumberなどReactElementではない場合にdefaultRendererを用いて描画されます。
   * contentがReactElementの場合はdefaultRendererを用いずにそのまま描画されます。
   */
  content: ReactNode;

  /**
   * contentがReactElementではない場合に描画に用いるコンポーネントを指定
   */
  defaultRenderer: FC<{ children: Exclude<ReactNode, ReactElement> }>;
};

export const TextDefaultStyler: FC<TextDefaultStylerProps> = ({ content, defaultRenderer: DefaultRenderer }) => {
  if (!content) {
    return null;
  }
  // TODO: To eliminate the gap, `any` is used. (ReactNode's ReactElement is ReactElement<any>, but isValidElement's returned ReactElement is ReactElement<unknown>)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (isValidElement<any>(content)) {
    return content;
  }
  return <DefaultRenderer>{content}</DefaultRenderer>;
};
