interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'small' | 'normal' | 'large'
}

export function Button({ variant = 'primary', size = 'normal', className = '', children, ...rest }: Props) {
  const classes = [
    'btn',
    `btn-${variant}`,
    size !== 'normal' ? `btn-${size}` : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
