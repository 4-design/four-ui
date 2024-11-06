import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './TablePagination';

describe('Pagination', () => {
  it('is rendered with first, last, prev, next, and current page buttons', async () => {
    render(<Pagination total={100} page={50} />);
    expect(screen.queryByRole('button', { name: '最初のページへ移動' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '最後のページへ移動' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '前のページへ移動' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '次のページへ移動' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'ページ1へ移動' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'ページ100へ移動' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '現在のページ ページ50' })).toBeInTheDocument();
  });
  it('calls event handlers when first page button is clicked', async () => {
    const user = userEvent.setup();
    const onChangePage = vi.fn((page: number) => page);
    const onClickFirstPageButton = vi.fn();
    render(
      <Pagination
        total={100}
        defaultPage={50}
        onChangePage={onChangePage}
        onClickFirstPageButton={onClickFirstPageButton}
      />,
    );
    await user.click(screen.getByRole('button', { name: '最初のページへ移動' }));
    expect(onChangePage).toHaveBeenCalledOnce();
    expect(onChangePage).toHaveLastReturnedWith(1);
    expect(onClickFirstPageButton).toHaveBeenCalledOnce();
  });
  it('calls event handlers when last page button is clicked', async () => {
    const user = userEvent.setup();
    const onChangePage = vi.fn((page: number) => page);
    const onClickLastPageButton = vi.fn();
    render(
      <Pagination
        total={100}
        defaultPage={50}
        onChangePage={onChangePage}
        onClickLastPageButton={onClickLastPageButton}
      />,
    );
    await user.click(screen.getByRole('button', { name: '最後のページへ移動' }));
    expect(onChangePage).toHaveBeenCalledOnce();
    expect(onChangePage).toHaveLastReturnedWith(100);
    expect(onClickLastPageButton).toHaveBeenCalledOnce();
  });
  it('calls event handlers when previous page button is clicked', async () => {
    const user = userEvent.setup();
    const onChangePage = vi.fn((page: number) => page);
    const onClickPreviousPageButton = vi.fn();
    render(
      <Pagination
        total={100}
        defaultPage={50}
        onChangePage={onChangePage}
        onClickPreviousPageButton={onClickPreviousPageButton}
      />,
    );
    await user.click(screen.getByRole('button', { name: '前のページへ移動' }));
    expect(onChangePage).toHaveBeenCalledOnce();
    expect(onChangePage).toHaveLastReturnedWith(49);
    expect(onClickPreviousPageButton).toHaveBeenCalledOnce();
  });
  it('calls event handlers when next page button is clicked', async () => {
    const user = userEvent.setup();
    const onChangePage = vi.fn((page: number) => page);
    const onClickNextPageButton = vi.fn();
    render(
      <Pagination
        total={100}
        defaultPage={50}
        onChangePage={onChangePage}
        onClickNextPageButton={onClickNextPageButton}
      />,
    );
    await user.click(screen.getByRole('button', { name: '次のページへ移動' }));
    expect(onChangePage).toHaveBeenCalledOnce();
    expect(onChangePage).toHaveLastReturnedWith(51);
    expect(onClickNextPageButton).toHaveBeenCalledOnce();
  });
});
