import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';

type BaseProps = {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };

type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variants = {
  primary:
    'bg-accent hover:bg-accent-dark text-white shadow-lg shadow-accent/20 hover:shadow-accent/40',
  secondary:
    'bg-surface border border-white/10 text-white hover:border-accent/50 hover:bg-surface/80',
  ghost: 'text-white/70 hover:text-white hover:bg-white/5',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', ...rest } = props;

  const className = `inline-flex items-center justify-center gap-2 rounded-lg font-light transition-all duration-300 ${variants[variant]} ${sizes[size]} ${
    (rest as Record<string, unknown>).className ?? ''
  }`;

  if (props.as === 'a') {
    const { as: _as, variant: _v, size: _s, ...anchorProps } = props as ButtonAsAnchor;
    return <a {...anchorProps} className={className} />;
  }

  const { as: _as, variant: _v, size: _s, ...buttonProps } = props as ButtonAsButton;
  return <button {...buttonProps} className={className} />;
}
