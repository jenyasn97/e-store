import './Button.scss'

type ButtonVariant = 'white-stroke' | 'black-stroke' | 'fill-small'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: 'default' | 'small'
  className?: string
}

export default function Button({ children, variant = 'black-stroke', size = 'default', className = '' }: ButtonProps) {
  return <button type="button" className={`button button--${variant} button--${size} ${className}`.trim()}>{children}</button>
}
