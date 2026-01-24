import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import React from 'react'
import { cn } from '@/lib/cn'

const baseStyle = 'transition-all duration-500'

export const textStyles = {
  default: cn(baseStyle, 'text-white opacity-95'),
  secondary: cn(baseStyle, 'text-white opacity-55'),
  tertiary: cn(baseStyle, 'text-white opacity-[0.31]'),
}

export const textVariants = cva('', {
  variants: {
    variant: {
      default: '',
      secondary: '',
      tertiary: '',
    },
    size: {
      title1: 'leading-loose text-2xl font-bold',
      title2: 'leading-7 text-[22px] font-bold',
      title3: 'leading-normal text-[19px] font-bold',
      largeTitle: 'leading-[38px] text-[29px] font-bold',
      XLTitle1: 'leading-[56px] text-5xl font-bold',
      XLTitle2: 'leading-[46px] text-[38px] font-bold',
      headline: 'leading-snug text-[17px] font-bold',
      body: 'leading-snug text-[17px]',
      callout: 'leading-tight text-[15px]',
      subheadline: 'leading-tight text-[15px] font-normal',
      footnote: 'leading-[18px] text-[13px]',
      caption1: 'leading-none text-xs',
      caption2: 'leading-none text-xs',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'body',
  },
})

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  asChild?: boolean
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'p'
    return (
      <Comp
        className={cn(
          textStyles[variant ?? 'default'],
          textVariants({ variant, size, className })
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Text.displayName = 'Text'

export { Text }
