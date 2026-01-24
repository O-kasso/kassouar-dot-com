import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '@/lib/cn'

const buttonVariants = cva(
  cn(
    //* base *//
    'vision-pro-ui-hoverable',
    'relative flex min-h-[44px] min-w-[44px] items-center justify-center',
    'text-[17px] leading-[22px] font-medium',
    'rounded-md ring-offset-white *:pointer-events-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5ac8f5] focus-visible:ring-offset-2',
    "[font-feature-settings:'liga'_off,_'clig'_off]",
    'transition-all duration-200',
    //* icon *//
    '[&_svg]:shrink-0',
    '[&_svg]:stroke-[2.25px]',
    '[&_svg]:transition-opacity [&_svg]:duration-300',
    //* disabled *//
    'disabled:pointer-events-none disabled:text-[color-mix(in_sRGB,white_10%,#5E5E5E_45%)]',
    //* before (hover effect layer) *//
    'before:[filter:blur(0.25px)] before:absolute before:inset-0 before:z-0 before:rounded-[var(--radius,theme(borderRadius.md))]',
    'before:[transform:translateX(var(--btn-bg-translate-x,0))_translateY(var(--btn-bg-translate-y,0))]',
    'before:[background-blend-mode:color-dodge,lighten] before:transition-opacity before:duration-300',
    'before:[background:linear-gradient(0deg,rgba(94,94,94,0.24)_0%,rgba(94,94,94,0.24)_100%),rgba(255,255,255,0.12)]',
    'before:opacity-0'
  ),
  {
    variants: {
      variant: {
        default: cn(
          'text-white/90',
          '[&_svg]:text-white [&_svg]:opacity-[0.96]',
          'before:opacity-75 hover:before:opacity-[0.96]'
        ),
        primary: cn(
          'text-black/90 bg-[#5ac8f5]/90',
          'hover:text-black focus:text-black active:text-black',
          '[&_svg]:text-black [&_svg]:opacity-[0.96]',
          'before:[background:var(--primary,#5ac8f5)]',
          'before:opacity-15 hover:before:opacity-[0.15]'
        ),
        secondary: cn(
          'text-white/50 hover:text-white/95 transition-colors',
          '[&_svg]:text-white [&_svg]:opacity-60 [&_svg]:hover:opacity-[0.96]',
          'hover:before:opacity-50',
          'hover:before:[background:linear-gradient(0deg,rgba(94,94,94,0.24)_0%,rgba(94,94,94,0.24)_100%),rgba(255,255,255,0.12)]'
        ),
        ghost: cn(
          'text-white/80 hover:text-white',
          '[&_svg]:text-white [&_svg]:opacity-70 [&_svg]:hover:opacity-[0.96]',
          'hover:before:opacity-50 before:opacity-0'
        ),
        link: cn(
          'text-[#5ac8f5]',
          '[&_svg]:text-[#5ac8f5] [&_svg]:opacity-70 [&_svg]:hover:opacity-[0.96]',
          'hover:before:opacity-50 before:opacity-0'
        ),
      },
      size: {
        default: 'h-[2.75rem] px-[20px]',
        sm: 'h-[2.25rem] px-[16px] text-[15px]',
        lg: 'h-[3rem] px-[24px]',
        icon: 'h-[2.75rem] w-[2.75rem] [--radius:50%]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

type ButtonVariant = VariantProps<typeof buttonVariants>

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariant {
  asChild?: boolean
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

function ButtonGroup({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 p-3',
        '*:rounded-full [&_button:before]:rounded-full',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Button, buttonVariants, ButtonGroup }
export type { ButtonVariant, ButtonProps }
