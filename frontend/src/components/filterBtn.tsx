type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

export function FilterToggleButton({ onToggle }: Props) {
  return (
    <button onClick={onToggle}>
      Filters
    </button>
  );
}
