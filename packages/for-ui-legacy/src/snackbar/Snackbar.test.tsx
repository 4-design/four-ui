import { Fragment } from 'react';
import { config } from 'react-transition-group';
import { describe, expect, it } from 'vitest';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../button';
import { Snackbar } from './Snackbar';
import { SnackbarProvider, useSnackbar } from './SnackbarContext';

describe('Snackbar with close button', () => {
  beforeAll(() => {
    config.disabled = true;
  });
  afterAll(() => {
    config.disabled = false;
  });

  it('appears when open props is true', async () => {
    render(<Snackbar open={true} autoHide={false} autoHideDuration={100} message="操作が完了しました" />);
    expect(screen.getByRole('alertdialog', { description: '操作が完了しました' })).toBeInTheDocument();
  });
  it('does not appear when open props is false', async () => {
    render(<Snackbar open={false} autoHide={false} autoHideDuration={100} message="操作が完了しました" />);
    expect(screen.queryByRole('alertdialog', { description: '操作が完了しました' })).not.toBeInTheDocument();
  });
  it('appears when TriggerComponent is pushed', async () => {
    const user = userEvent.setup();
    render(
      <Snackbar
        TriggerComponent={<Button aria-haspopup="dialog">開く</Button>}
        autoHide={false}
        autoHideDuration={100}
        message="操作が完了しました"
      />,
    );
    await user.click(screen.getByRole('button', { name: '開く' }));
    expect(screen.getByRole('alertdialog', { description: '操作が完了しました' })).toBeInTheDocument();
  });
  it('is closed when clicking close button', async () => {
    const user = userEvent.setup();
    render(
      <Snackbar
        TriggerComponent={<Button aria-haspopup="dialog">開く</Button>}
        autoHide={false}
        autoHideDuration={100}
        message="操作が完了しました"
      />,
    );
    await user.click(screen.getByRole('button', { name: '開く' }));
    user.click(screen.getByRole('button', { name: '閉じる' }));
    await waitForElementToBeRemoved(screen.queryByRole('alertdialog', { description: '操作が完了しました' }), {
      timeout: 1000,
    });
  });
  it('is not closed after autoHideDuration passes', async () => {
    const user = userEvent.setup();
    render(
      <Snackbar
        TriggerComponent={<Button>開く</Button>}
        autoHide={false}
        autoHideDuration={0}
        message="操作が完了しました"
      />,
    );
    await user.click(screen.getByRole('button', { name: '開く' }));
    await expect(screen.queryByRole('alertdialog', { description: '操作が完了しました' })).toBeInTheDocument();
  });
  it('is not closed when body of Snackbar is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Snackbar
        TriggerComponent={<Button>開く</Button>}
        autoHide={false}
        autoHideDuration={100}
        message="操作が完了しました"
      />,
    );
    await user.click(screen.getByRole('button', { name: '開く' }));
    user.click(screen.getByRole('alertdialog', { description: '操作が完了しました' }));
    await expect(screen.queryByRole('alertdialog', { description: '操作が完了しました' })).toBeInTheDocument();
  });
  it('is opened under SnackbarProvider', async () => {
    const user = userEvent.setup();
    const Inner = () => {
      const { openSnackbar } = useSnackbar();
      return (
        <Button
          aria-haspopup="dialog"
          onClick={() => {
            openSnackbar({
              message: '操作が完了しました',
              autoHide: false,
              autoHideDuration: 100,
            });
          }}
        >
          Snackbarを開く
        </Button>
      );
    };
    render(
      <SnackbarProvider>
        <Inner />
      </SnackbarProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'Snackbarを開く' }));
    expect(screen.queryByRole('alertdialog', { description: '操作が完了しました' })).toBeInTheDocument();
  });
  it('is immediately closed once other Snackbar is opened under SnackbarProvider', async () => {
    const user = userEvent.setup();
    const Inner = () => {
      const { openSnackbar } = useSnackbar();
      return (
        <Fragment>
          <Button
            aria-haspopup="dialog"
            onClick={() => {
              openSnackbar({
                message: 'Snackbar1',
                autoHide: false,
                autoHideDuration: 100,
              });
            }}
          >
            Snackbar1を開く
          </Button>
          <Button
            aria-haspopup="dialog"
            onClick={() => {
              openSnackbar({
                message: 'Snackbar2',
                autoHide: false,
                autoHideDuration: 100,
              });
            }}
          >
            Snackbar2を開く
          </Button>
        </Fragment>
      );
    };
    render(
      <SnackbarProvider>
        <Inner />
      </SnackbarProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'Snackbar1を開く' }));
    expect(screen.queryByRole('alertdialog', { description: 'Snackbar1' })).toBeInTheDocument();
    expect(screen.queryByRole('alertdialog', { description: 'Snackbar2' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Snackbar2を開く' }));
    expect(screen.queryByRole('alertdialog', { description: 'Snackbar1' })).not.toBeInTheDocument();
    expect(screen.queryByRole('alertdialog', { description: 'Snackbar2' })).toBeInTheDocument();
  });
});

describe('Snackbar with auto hiding configuration', () => {
  beforeAll(() => {
    config.disabled = true;
  });
  afterAll(() => {
    config.disabled = false;
  });

  it('appears when open props is true', async () => {
    render(<Snackbar open={true} message="操作が完了しました" autoHide autoHideDuration={100} />);
    expect(screen.getByRole('alert', { description: '操作が完了しました' })).toBeInTheDocument();
  });
  it('does not appear when open props is false', async () => {
    render(<Snackbar open={false} message="操作が完了しました" autoHide autoHideDuration={100} />);
    expect(screen.queryByRole('alert', { description: '操作が完了しました' })).not.toBeInTheDocument();
  });
  it('appears when TriggerComponent is pushed', async () => {
    const user = userEvent.setup();
    render(
      <Snackbar
        TriggerComponent={<Button aria-haspopup="dialog">開く</Button>}
        message="操作が完了しました"
        autoHide
      />,
    );
    await user.click(screen.getByRole('button', { name: '開く' }));
    expect(screen.queryByRole('alert', { description: '操作が完了しました' })).toBeInTheDocument();
  });
  it('is closed after autoHideDuration passes', async () => {
    const user = userEvent.setup();
    render(
      <Snackbar
        TriggerComponent={<Button>開く</Button>}
        message="操作が完了しました"
        autoHide
        autoHideDuration={100}
      />,
    );
    await user.click(screen.getByRole('button', { name: '開く' }));
    await waitForElementToBeRemoved(screen.queryByRole('alert', { description: '操作が完了しました' }), {
      timeout: 1000,
    });
  });
  it('is closed body of Snackbar is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Snackbar
        TriggerComponent={<Button>開く</Button>}
        message="操作が完了しました"
        autoHide
        autoHideDuration={100}
      />,
    );
    await user.click(screen.getByRole('button', { name: '開く' }));
    user.click(screen.getByRole('alert', { description: '操作が完了しました' }));
    await waitForElementToBeRemoved(screen.queryByRole('alert', { description: '操作が完了しました' }), {
      timeout: 1000,
    });
  });
  it('is opened under SnackbarProvider', async () => {
    const user = userEvent.setup();
    const Inner = () => {
      const { openSnackbar } = useSnackbar();
      return (
        <Button
          aria-haspopup="dialog"
          onClick={() => {
            openSnackbar({ message: '操作が完了しました', autoHide: true, autoHideDuration: 100 });
          }}
        >
          Snackbarを開く
        </Button>
      );
    };
    render(
      <SnackbarProvider>
        <Inner />
      </SnackbarProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'Snackbarを開く' }));
    expect(screen.queryByRole('alert', { description: '操作が完了しました' })).toBeInTheDocument();
  });
  it('is immediately closed once other Snackbar is opened under SnackbarProvider', async () => {
    const user = userEvent.setup();
    const Inner = () => {
      const { openSnackbar } = useSnackbar();
      return (
        <Fragment>
          <Button
            aria-haspopup="dialog"
            onClick={() => {
              openSnackbar({ message: 'Snackbar1', autoHide: true, autoHideDuration: 100 });
            }}
          >
            Snackbar1を開く
          </Button>
          <Button
            aria-haspopup="dialog"
            onClick={() => {
              openSnackbar({ message: 'Snackbar2', autoHide: true, autoHideDuration: 100 });
            }}
          >
            Snackbar2を開く
          </Button>
        </Fragment>
      );
    };
    render(
      <SnackbarProvider>
        <Inner />
      </SnackbarProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'Snackbar1を開く' }));
    expect(screen.queryByRole('alert', { description: 'Snackbar1' })).toBeInTheDocument();
    expect(screen.queryByRole('alert', { description: 'Snackbar2' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Snackbar2を開く' }));
    expect(screen.queryByRole('alert', { description: 'Snackbar1' })).not.toBeInTheDocument();
    expect(screen.queryByRole('alert', { description: 'Snackbar2' })).toBeInTheDocument();
  });
});
