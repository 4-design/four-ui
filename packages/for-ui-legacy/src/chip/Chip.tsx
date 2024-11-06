import { ElementType, forwardRef, MouseEvent, ReactNode } from 'react';
import { ComponentPropsWithAs, Element, ElementTypeToHTMLElement, Ref } from '../system/componentType';
import { FullChip } from './FullChip';
import { LimitedChip } from './LimitedChip';

export type ChipProps<As extends ElementType = 'button'> = ComponentPropsWithAs<
  {
    /**
     * ユーザーに提示したい意図 (e.g. エラーならばnegative) を指定
     *
     * @default 'shade'
     */
    intention?: 'shade' | 'primary' | 'secondary' | 'positive' | 'negative' | 'notice' | 'informative';

    /**
     * ラベルを指定
     */
    label: string;

    /**
     * クリックできる範囲を指定
     *
     * 通常、limitedは削除可能なChipに使い、他の用途ではなるべくfullを使うことが推奨されます。
     *
     * @default 'full'
     */
    clickableArea?: 'full' | 'limited';

    /**
     * アイコンを指定
     *
     * clickableAreahがlimitedの場合、デフォルトのiconは (Xボタン) になります。
     */
    icon?: ReactNode;

    /**
     * クリックしたときの動作を指定
     *
     * これは必須項目です。クリックできないものについてはBadgeの使用を検討してください。
     * クリックできる範囲はclickableArea propsで指定してください。
     */
    onClick: (e: MouseEvent<ElementTypeToHTMLElement<As>>) => void;

    className?: string;
  },
  As
>;

type ChipComponent = <As extends ElementType = 'button'>(props: ChipProps<As>) => Element;

export const Chip: ChipComponent = forwardRef(
  <As extends ElementType = 'button'>({ clickableArea = 'full', ...props }: ChipProps<As>, ref?: Ref<As>) =>
    ({
      full: <FullChip<As> {...props} ref={ref} />,
      limited: <LimitedChip<As> {...props} ref={ref} />,
    })[clickableArea],
);
