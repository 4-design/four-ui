import { FC, ReactEventHandler } from 'react';
import {
  MdMoreHoriz,
  MdOutlineChevronLeft,
  MdOutlineChevronRight,
  MdOutlineFirstPage,
  MdOutlineLastPage,
} from 'react-icons/md';
import usePagination from '@mui/material/usePagination';
import { RowData, Table } from '@tanstack/react-table';
import { Button } from '../button';
import { fsx } from '../system/fsx';

export type TablePaginationProps<T extends RowData> = {
  /**
   * Paginationをつけるテーブル
   */
  table: Table<T>;

  /**
   * 現在のページ数
   */
  page?: number;

  /**
   * デフォルトのページ数
   *
   * page propを使っているときは無視されます。
   */
  defaultPage?: number;

  /**
   * ページが変更されたときに呼ばれるコールバック
   *
   * @deprecated onChangePageをを使ってください。
   */
  onChangePagination?: (page: number) => void;

  /**
   * ページが変更されたときに呼ばれるコールバック
   */
  onChangePage?: (page: number) => void;

  /**
   * ページネーションに設定するラベル
   *
   * どのテーブルに対応するのかを示唆する名前を設定するのが好ましいです。例: テーブルの名前が「アカウント一覧」なら "アカウント一覧のページ送り" のようにする
   *
   * @default ページ送り
   */
  'aria-label'?: string;

  /**
   * 操作する対象のテーブルのidを指定
   */
  'aria-controls'?: string;

  disabled?: boolean;

  className?: string;
};

export const TablePagination = <T extends RowData>({
  table,
  page,
  defaultPage = 1,
  onChangePagination,
  onChangePage = onChangePagination,
  ...props
}: TablePaginationProps<T>) => {
  const { getPageCount, setPageIndex } = table;

  const handleChange = (p: number) => {
    onChangePage?.(p);
    if (!page) {
      setPageIndex(p - 1);
    }
  };

  return (
    <Pagination total={getPageCount()} page={page} defaultPage={defaultPage} onChangePage={handleChange} {...props} />
  );
};

type PaginationProps = {
  /**
   * 全てのページ数を指定
   */
  total: number;

  /**
   * 現在のページを指定
   *
   * pageかdefaultPageのどちらかは必須です。
   */
  page?: number;

  /**
   * デフォルトページを指定
   *
   * pageかdefaultPageのどちらかは必須です。
   *
   * page propが指定されていない場合、Paginationコンポーネントは内部でページの情報を持ちます。
   */
  defaultPage?: number;

  /**
   * ページ変更時に呼ばれるコールバックを指定
   */
  onChangePage?: (page: number) => void;

  /**
   * ページネーションに設定するラベル
   *
   * どのテーブルに対応するのかを示唆する名前を設定するのが好ましいです。例: テーブルの名前が「アカウント一覧」なら "アカウント一覧のページ送り" のようにする
   *
   * @default ページ送り
   */
  'aria-label'?: string;

  /**
   * 操作する対象のテーブルのidを指定
   */
  'aria-controls'?: string;

  /**
   * 前のページを表示ボタンがクリックされたときのコールバックを指定
   */
  onClickPreviousPageButton?: ReactEventHandler<HTMLButtonElement>;

  /**
   * 次のページを表示ボタンがクリックされたときのコールバックを指定
   */
  onClickNextPageButton?: ReactEventHandler<HTMLButtonElement>;

  /**
   * 最初のページを表示ボタンがクリックされたときのコールバックを指定
   */
  onClickFirstPageButton?: ReactEventHandler<HTMLButtonElement>;

  /**
   * 最後のページを表示ボタンがクリックされたときのコールバックを指定
   */
  onClickLastPageButton?: ReactEventHandler<HTMLButtonElement>;

  disabled?: boolean;

  className?: string;
};

export const Pagination: FC<PaginationProps> = ({
  defaultPage,
  total,
  page,
  onChangePage,
  onClickFirstPageButton,
  onClickLastPageButton,
  onClickNextPageButton,
  onClickPreviousPageButton,
  disabled = false,
  className,
  ...props
}) => {
  const { items } = usePagination({
    page,
    defaultPage,
    count: total,
    showFirstButton: true,
    showLastButton: true,
    siblingCount: 2,
    disabled,
    onChange: (_, page) => {
      onChangePage?.(page);
    },
  });
  return (
    <nav aria-label="ページ送り" className={fsx(className)} {...props}>
      <ul className={fsx(`flex items-center gap-2`)}>
        {items.map(({ type, page, selected, onClick, ...item }, index) => (
          <li key={index}>
            {
              {
                'start-ellipsis': <MdMoreHoriz className={fsx(`fill-shade-medium-default`)} />,
                'end-ellipsis': <MdMoreHoriz className={fsx(`fill-shade-medium-default`)} />,
                first: (
                  <Button
                    aria-label="最初のページへ移動"
                    intention="primary"
                    variant="text"
                    size="small"
                    onClick={(e) => {
                      onClickFirstPageButton?.(e);
                      onClick(e);
                    }}
                    {...item}
                  >
                    <MdOutlineFirstPage aria-hidden />
                  </Button>
                ),
                last: (
                  <Button
                    aria-label="最後のページへ移動"
                    intention="primary"
                    variant="text"
                    size="small"
                    onClick={(e) => {
                      onClickLastPageButton?.(e);
                      onClick(e);
                    }}
                    {...item}
                  >
                    <MdOutlineLastPage />
                  </Button>
                ),
                previous: (
                  <Button
                    aria-label="前のページへ移動"
                    intention="primary"
                    variant="text"
                    size="small"
                    onClick={(e) => {
                      onClickPreviousPageButton?.(e);
                      onClick(e);
                    }}
                    {...item}
                  >
                    <MdOutlineChevronLeft />
                  </Button>
                ),
                next: (
                  <Button
                    aria-label="次のページへ移動"
                    intention="primary"
                    variant="text"
                    size="small"
                    onClick={(e) => {
                      onClickNextPageButton?.(e);
                      onClick(e);
                    }}
                    {...item}
                  >
                    <MdOutlineChevronRight />
                  </Button>
                ),
                page: (
                  <Button
                    aria-label={selected ? `現在のページ ページ${page}` : `ページ${page}へ移動`}
                    aria-current={selected ? true : undefined}
                    variant={selected ? 'filled' : 'outlined'}
                    intention={selected ? 'primary' : 'subtle'}
                    size="small"
                    onClick={onClick}
                    {...item}
                  >
                    {page?.toString()}
                  </Button>
                ),
              }[type]
            }
          </li>
        ))}
      </ul>
    </nav>
  );
};
