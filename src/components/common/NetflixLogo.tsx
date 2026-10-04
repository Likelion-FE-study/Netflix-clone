interface NetflixLogoProps {
  className?: string;
}

export default function NetflixLogo({ className = "w-[72px] sm:w-[93px] lg:w-[110px]" }: NetflixLogoProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 111 30" className={`h-auto text-netflix-red ${className}`} fill="currentColor">
      <path d="M0 30V0h5l8 19V0h5v28.1l-5 .4L5 10v19.4zM22 0h15v5H27v6h9v5h-9v6.7l10-.8v5l-15 1.2zM40 0h18v5h-6v21.2l-5 .2V5h-7zM61 0h15v5H66v6h9v5h-9v10l-5-.1zM79 0h5v22l9 .7v5l-14-1zM96 0h5v28.3l-5-.5zM104 0h6l4 8 4-8h6l-7 14 7 16-6-.7-4-9-4 8.4-6-.6 7-13.8z" transform="scale(.89 1)" />
    </svg>
  );
}
