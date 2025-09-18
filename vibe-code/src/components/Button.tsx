import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  ...props
}) => {
  // 기본 스타일
  let baseClasses = 'font-modern rounded-md transition-all duration-300 neon-glow ';
  
  // variant에 따른 스타일
  switch (variant) {
    case 'primary':
      baseClasses += 'bg-[var(--primary-color)] text-white hover:bg-opacity-90 ';
      break;
    case 'secondary':
      baseClasses += 'bg-[var(--secondary-color)] text-white hover:bg-opacity-90 ';
      break;
    case 'outline':
      baseClasses += 'bg-transparent border-2 border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white ';
      break;
  }
  
  // size에 따른 스타일
  switch (size) {
    case 'small':
      baseClasses += 'px-3 py-1.5 text-sm ';
      break;
    case 'medium':
      baseClasses += 'px-4 py-2 text-base ';
      break;
    case 'large':
      baseClasses += 'px-6 py-3 text-lg ';
      break;
  }
  
  // 최종 클래스명
  const finalClasses = `${baseClasses} ${className}`;
  
  return (
    <button className={finalClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;