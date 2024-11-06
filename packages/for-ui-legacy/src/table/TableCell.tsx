import { FC, forwardRef, HTMLAttributes, ReactNode } from 'react';
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';
import { ComponentPropsWithAs, Element, Ref } from '../system/componentType';
import { fsx } from '../system/fsx';
import { Text } from '../text';

export type TableCellProps<As extends 'th' | 'td' = 'td'> = ComponentPropsWithAs<
  {
    /**
     * @deprecated `as` propを使ってください
     */
    component?: 'th' | 'td';

    className?: string;
  },
  As
>;

type TableCellComponent = <As extends 'th' | 'td' = 'td'>(props: TableCellProps<As>) => Element;

export const TableCell: TableCellComponent = forwardRef(
  <As extends 'th' | 'td' = 'td'>({ component = 'td', as, className, ...rest }: TableCellProps<As>, ref?: Ref<As>) => {
    const Component = as || component || 'td';
    return (
      <Component
        className={fsx([
          `border-shade-light-default text-shade-dark-default border-t px-3 text-left`,
          {
            th: `py-1 font-bold break-keep`,
            td: `py-2 font-normal`,
          }[Component],
          className,
        ])}
        ref={ref}
        {...rest}
      />
    );
  },
);

export const SortableTableCellHead: FC<
  TableCellProps<'th'> & {
    sortable: boolean;
    sorted: false | 'asc' | 'desc';
    nextSortingOrder: false | 'asc' | 'desc';
    children: ReactNode;
    disabled?: boolean;
    onClick?: HTMLAttributes<HTMLButtonElement>['onClick'];
  }
> = ({ sortable, sorted, nextSortingOrder, onClick, disabled, children, ...rest }) => (
  <TableCell
    as="th"
    aria-sort={sorted ? ({ asc: 'ascending', desc: 'descending' } as const)[sorted] : undefined}
    className={fsx(sortable && `p-0`)}
    {...rest}
  >
    {sortable ? (
      <button
        disabled={disabled}
        onClick={onClick}
        className={fsx(
          `hover:bg-shade-light-hover focus-visible:bg-shade-light-hover group flex w-full items-center gap-1 px-3 py-1 focus-visible:outline-none`,
        )}
      >
        {children}
        <span
          aria-hidden
          className={fsx(
            `fill-shade-dark-default [&_svg]:h-4 [&_svg]:w-4 [&_svg]:fill-inherit`,
            !sorted && `fill-shade-medium-default`,
          )}
        >
          {sorted
            ? {
                asc: <MdArrowUpward />,
                desc: <MdArrowDownward />,
              }[sorted]
            : nextSortingOrder &&
              {
                asc: <MdArrowUpward className={fsx(`invisible group-hover:visible`)} />,
                desc: <MdArrowDownward className={fsx(`invisible group-hover:visible`)} />,
              }[nextSortingOrder]}
        </span>
      </button>
    ) : (
      <Text className={fsx(`flex items-center`)}>{children}</Text>
    )}
  </TableCell>
);
