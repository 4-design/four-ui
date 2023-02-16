import { ReactNode, forwardRef, Ref } from 'react';
import Autocomplete, {
  AutocompleteProps as MuiAutocompleteProps,
  createFilterOptions,
} from '@mui/material/Autocomplete';
import { fsx } from '../system/fsx';
import { MdExpandMore } from 'react-icons/md';
import { Chip } from '../chip';
import { MenuItem, MenuList } from '../menu';
import { TextField } from '../textField';

export type SelectOption = {
  label: string;
  inputValue: string;
};

export type AutocompleteProps<
  Value extends SelectOption,
  Multiple extends boolean | undefined,
  FreeSolo extends boolean | undefined
> = Omit<MuiAutocompleteProps<Value, Multiple, true, FreeSolo, 'div'>, 'autoComplete' | 'renderInput' | 'size'> & {
  name: string;
  label?: ReactNode;
  placeholder?: string;
  required?: boolean;
  loadingText?: ReactNode;
  error?: boolean;
  helperText?: ReactNode;
  disabled?: boolean;
  size?: 'large' | 'medium';
  className?: string;
  disableFilter?: boolean;
  renderInput?: MuiAutocompleteProps<Value, Multiple, true, FreeSolo, 'div'>['renderInput'];
};

const _Select = <
  Value extends SelectOption,
  Multiple extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
  name,
  size = 'large',
  options = [],
  label,
  required = false,
  placeholder,
  multiple,
  freeSolo,
  onChange,
  error,
  helperText,
  disabled = false,
  disableFilter = false,
  inputRef,
  noOptionsText = 'データが見つかりません',
  className,
  ...rest
}: AutocompleteProps<Value, Multiple, FreeSolo> & {
  inputRef?: Ref<HTMLInputElement | null>;
}): JSX.Element => (
  <Autocomplete<Value, Multiple, true, FreeSolo>
    ref={inputRef}
    disablePortal
    disableCloseOnSelect={multiple}
    disableClearable
    autoHighlight
    clearOnBlur
    disabled={disabled}
    includeInputInList
    handleHomeEndKeys
    multiple={multiple}
    freeSolo={freeSolo}
    options={options}
    onChange={onChange}
    PaperComponent={(props) => (
      <div {...props} className={fsx(`overflow-visible -translate-y-0.5 bg-shade-white-default`)} />
    )}
    ListboxComponent={MenuList}
    isOptionEqualToValue={(option, v) =>
      typeof option === 'string' ? option === v : option.inputValue === v.inputValue
    }
    noOptionsText={noOptionsText}
    popupIcon={<MdExpandMore size={24} />}
    filterOptions={(options, params) => {
      const filtered = createFilterOptions<Value>()(options, params);
      const { inputValue } = params;
      // Suggest the creation of a new value
      const isExisting = options.some((option) => {
        return typeof option === 'string' ? inputValue === option : inputValue === option.inputValue;
      });

      if (!freeSolo && !isExisting) {
        return filtered;
      }

      if (inputValue !== '' && !isExisting) {
        // FIXME: filtered is a subtype of SelectOption, so may contain other fields.
        // Since no way to fill those fields, `as Value` is used.
        filtered.push({
          inputValue,
          label: inputValue,
        } as Value);
      }

      return filtered;
    }}
    getOptionLabel={(option) => {
      // Value selected with enter, right from the input
      if (typeof option === 'string') {
        return option;
      }
      // Add "xxx" option created dynamically
      if (option.label) {
        return option.label;
      }
      // Regular option
      return option.inputValue;
    }}
    renderTags={(values, getTagProps) => (
      <ul
        aria-label="選択済みアイテム"
        className={fsx([
          `inline-flex flex-row gap-1 w-min-content flex-wrap py-2`,
          { large: `py-2`, medium: `py-1` }[size],
        ])}
      >
        {values.map((option, index) => {
          const { onDelete, key, ...tagProps } = getTagProps({ index });
          const label = typeof option === 'string' ? option : option.label;
          return (
            <li key={key} className={fsx(`inline-flex`)}>
              <Chip onClick={onDelete} label={label} clickableArea="limited" {...tagProps} />
            </li>
          );
        })}
      </ul>
    )}
    renderOption={(props, option, { selected }) => {
      const label = typeof option === 'string' ? option : option.label;
      return (
        <MenuItem {...props} key={option.inputValue} selected={selected}>
          {label}
        </MenuItem>
      );
    }}
    classes={{
      root: fsx(`w-full p-0`, className),
      inputRoot: fsx([
        `p-0`,
        {
          large: `pl-2`,
          medium: `pl-1`,
        }[size],
        disableFilter && `cursor-pointer`,
      ]),
      tag: fsx(`m-0 max-w-[none]`),
      input: fsx([
        `min-w-20`,
        {
          large: `pl-2`,
          medium: `pl-1`,
        }[size],
        disableFilter && `cursor-pointer caret-transparent`,
      ]),
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        size={size}
        inputProps={{
          ...params.inputProps,
          onChange: disableFilter
            ? () => {
                // Ignore inputs if not searchable
              }
            : params.inputProps.onChange,
        }}
        autoComplete="off"
        name={name}
        required={required}
        label={label}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
      />
    )}
    {...rest}
  />
);

export const Select = forwardRef((props, ref: Ref<HTMLInputElement>) => <_Select inputRef={ref} {...props} />) as <
  Value extends SelectOption,
  Multiple extends boolean | undefined,
  FreeSolo extends boolean | undefined
>(
  props: AutocompleteProps<Value, Multiple, FreeSolo>
) => JSX.Element;
