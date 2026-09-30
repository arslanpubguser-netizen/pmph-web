import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  to?: string;
  href?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  className = '',
  onClick,
  type = 'button',
  disabled,
  to,
  href,
}: ButtonProps) {
  const base = 'relative inline-flex items-center justify-center gap-2 font-display font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary text-bg-base hover:bg-primary-electric btn-glow',
    secondary: 'bg-blue text-white hover:bg-blue-electric',
    outline: 'border border-border bg-bg-card text-white hover:border-primary/40 hover:bg-bg-hover',
    ghost: 'text-text-secondary hover:text-white hover:bg-bg-hover',
    danger: 'bg-red text-white hover:bg-red/90',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2.5',
    lg: 'text-base px-6 py-3',
  };

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
    </>
  );

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  };

  if (to) {
    return (
      <Link to={to} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
