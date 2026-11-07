import { IconButton } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme();
  const toggleColorMode = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");
  return { colorMode: resolvedTheme, setColorMode: setTheme, toggleColorMode };
}

export function ColorModeButton(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      variant="ghost"
      size="sm"
      aria-label={colorMode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleColorMode}
      {...props}
    >
      {colorMode === "dark" ? <Sun /> : <Moon />}
    </IconButton>
  );
}
