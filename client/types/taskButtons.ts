export interface IButtonProps {
  children: React.ReactNode;
  className: string;
  onDelete?: () => void;
  onDone?: () => void;
}
