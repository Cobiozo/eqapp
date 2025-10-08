import ThemeToggler from "../features/ThemeToggler";
import LanguageToggler from "../features/LanguageToggler";

type Props = {
  className?: string;
}

export default function QuickSettingsBox({ className }: Props) {
  return (
    <div className={className}>
      <ThemeToggler />
      <LanguageToggler />
    </div>
  )
}
