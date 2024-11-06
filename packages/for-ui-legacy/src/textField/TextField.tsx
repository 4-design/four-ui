import { FC, forwardRef, ReactNode, useId } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { InputBaseComponentProps } from '@mui/material/InputBase';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { fsx } from '../system/fsx';
import { TextDefaultStyler } from '../system/TextDefaultStyler';
import { Text } from '../text';

export type TextFieldProps = Omit<OutlinedInputProps, 'size' | 'multiline' | 'rows' | 'margin' | 'fullWidth'> & {
  /**
   * 3桁区切りの金額表示をする場合に指定
   *
   * trueにすることでTextFieldへの入力値はnumberのみ許可されます
   */
  isPriceFormat?: boolean;

  /**
   * URLの先頭部分など期待する入力値にユーザーが入力しない部分があることを明示的にしたい場合に指定
   */
  prefix?: string;

  /**
   * 単位など期待する入力値にユーザーが入力しない部分があることを明示的にしたい場合に指定
   */
  suffix?: string;

  /**
   * サイズを指定
   *
   * @default large
   */
  size?: 'large' | 'medium';

  /**
   * アイコンを表示する場合に指定
   *
   * prefixまたはsuffixと同時に使用することはできません
   */
  icon?: ReactNode;

  /**
   * ラベルを表示するときに指定
   *
   * 文字列の場合はデフォルトのスタイルが適用され、ValidなReactElementを渡すと渡したものがそのまま描画されます。
   */
  label?: ReactNode;

  /**
   * エラーメッセージ等の副次的内容をユーザーに示すときに指定
   *
   * 文字列の場合はデフォルトのスタイルが適用され、ValidなReactElementを渡すと渡したものがそのまま描画されます。
   */
  helperText?: ReactNode;

  className?: string;
};

type NumberFormatCustomProps = InputBaseComponentProps &
  NumericFormatProps & {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
  };

const NumberFormatCustom = forwardRef<HTMLInputElement, NumberFormatCustomProps>(
  ({ onChange, name, className, ...rest }, ref) => {
    return (
      <NumericFormat
        {...rest}
        className={fsx(className)}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
      />
    );
  },
);

const Adornment: FC<{ size: 'large' | 'medium'; className?: string; children: string }> = ({
  size,
  className,
  ...rest
}) => (
  <Text
    size="r"
    typeface="sansSerif"
    className={fsx([
      `border-shade-light-default bg-shade-light-default text-shade-medium-default m-0 inline-flex h-full max-h-[fit-content] cursor-default break-keep`,
      {
        large: `py-2 px-4`,
        medium: `py-1 px-2`,
      }[size],
      className,
    ])}
    {...rest}
  />
);

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      size = 'large',
      label,
      className,
      placeholder,
      disabled,
      required,
      inputRef,
      error,
      helperText,
      isPriceFormat = false,
      prefix,
      suffix,
      icon,
      inputProps,
      'aria-errormessage': ariaErrormessage,
      'aria-describedby': ariaDescribedby,
      id: passedId,
      ...rest
    },
    ref,
  ) => {
    const innerId = useId();
    const id = passedId || innerId;

    const helperTextId = useId();

    return (
      <div className={fsx(`flex w-full flex-col gap-1`, className)}>
        <fieldset className={fsx(`contents`)}>
          {label && (
            <legend className={fsx(`contents`)}>
              <Text as="label" htmlFor={id} className="w-fit">
                <TextDefaultStyler
                  content={label}
                  defaultRenderer={({ children, ...rest }) => (
                    <Text weight="bold" size="s" className={fsx(`text-shade-medium-default`)} {...rest}>
                      {children}
                      {required && (
                        <Text as="abbr" title="必須" className="text-negative-dark-default no-underline">
                          *
                        </Text>
                      )}
                    </Text>
                  )}
                />
              </Text>
            </legend>
          )}
          <OutlinedInput
            id={id}
            disabled={disabled}
            error={error}
            inputRef={inputRef}
            ref={ref}
            required={required}
            placeholder={placeholder}
            classes={{
              root: fsx([
                `bg-shade-white-default text-r flex w-full flex-nowrap gap-1 p-0`,
                {
                  large: [`py-2 pl-2`, prefix && `py-0 pl-0`, suffix && `py-0 pr-0`],
                  medium: [`py-1 pl-1`, prefix && `py-0 pl-0`, suffix && `py-0 pr-0`],
                }[size],
              ]),
              disabled: fsx(
                `bg-shade-white-disabled placeholder:text-shade-light-default text-shade-light-disabled cursor-not-allowed [-webkit-text-fill-color:currentColor_!important]`,
              ),
              input: fsx([
                `text-r text-shade-dark-default placeholder:text-shade-light-default h-6 grow p-0 font-sans placeholder:opacity-100 focus:shadow-none [&::-webkit-date-and-time-value]:text-start`,
                {
                  large: [`px-2`, icon && `pl-1`],
                  medium: [`px-1`, icon && `pl-1`],
                }[size],
              ]),
              notchedOutline: fsx([
                `border-shade-medium-default [.Mui-focused_&]:border-primary-medium-active border [.Mui-focused_&]:border-2`,
                error && `border-negative-medium-default`,
                disabled && `border-shade-medium-disabled`,
              ]),
            }}
            startAdornment={
              (prefix && (
                <Adornment size={size} className="border-r">
                  {prefix}
                </Adornment>
              )) ||
              (icon && <span className="[&_svg]:fill-shade-medium-default pl-2">{icon}</span>)
            }
            endAdornment={
              suffix && (
                <Adornment size={size} className="border-l">
                  {suffix}
                </Adornment>
              )
            }
            inputComponent={isPriceFormat ? NumberFormatCustom : 'input'}
            inputProps={{
              'aria-errormessage': error && helperText ? helperTextId : ariaErrormessage,
              'aria-describedby': !error && helperText ? helperTextId : ariaDescribedby,
              ...inputProps,
            }}
            {...rest}
          />
        </fieldset>
        <TextDefaultStyler
          content={helperText}
          defaultRenderer={(props) => (
            <Text
              id={helperTextId}
              size="s"
              weight="regular"
              className={fsx(`text-shade-dark-default`, error && `text-negative-dark-default`)}
              {...props}
            />
          )}
        />
      </div>
    );
  },
);
