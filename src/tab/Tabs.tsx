import React from 'react'
import { SerializedStyles } from '@emotion/react'
import TabList, { TabListProps } from '@mui/lab/TabList'
import tw, { css, TwStyle } from 'twin.macro'

export interface TabsProps extends TabListProps {
  noBorder?: boolean
  reverse?: boolean
  twin?: (TwStyle | SerializedStyles)[]
}

export const Tabs: React.VFC<TabsProps> = ({
  twin,
  noBorder = false,
  reverse = false,
  onChange,
  children,
  ...rest
}) => {
  return (
    <TabList
      onChange={onChange}
      aria-label="lab API tabs example"
      css={[
        css`
          &.MuiTabs-root {
            ${reverse
              ? tw`(border-transparent border-t-2)!`
              : tw`(border-low border-b-2)!`}
          }
          & .MuiTabs-indicator {
            ${tw`(bg-primary-main)!`}
            ${reverse && tw`top-0`}
          }
        `,
        noBorder && tw`border-none!`,
        twin,
      ]}
      {...rest}
    >
      {children}
    </TabList>
  )
}
