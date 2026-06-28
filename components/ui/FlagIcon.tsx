interface FlagIconProps {
  code?: string | null;
  name?: string;
  className?: string;
}

export default function FlagIcon({ code, name = '', className = '' }: FlagIconProps) {
  if (!code) {
    return <span className={`inline-block rounded-sm bg-muted/20 ${className}`} />;
  }
  return (
    <img
      src={`https://flagcdn.com/${code.toLowerCase()}.svg`}
      alt={name}
      className={`inline-block rounded-sm ${className}`}
    />
  );
}
