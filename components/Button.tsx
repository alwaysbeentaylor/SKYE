import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'accent';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  to, 
  variant = 'primary', 
  className = '', 
  onClick,
  type = 'button'
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primaryDark focus:ring-primary shadow-lg shadow-primary/30",
    secondary: "bg-navy text-white hover:bg-slate-800 focus:ring-navy shadow-lg shadow-navy/30",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary/10 focus:ring-primary",
    accent: "bg-accent text-white hover:bg-orange-600 focus:ring-accent shadow-lg shadow-accent/30",
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
};

export default Button;