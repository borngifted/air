import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTheme } from "@/contexts/ThemeContext";
import { AIR_PALETTES } from "@shared/palettes";
import { Check, Moon, Sun } from "lucide-react";

// Header control: pick a colour palette (and light/dark) for this device.
export function PalettePicker({ className = "" }: { className?: string }) {
  const { palette, setPalette, theme, toggleTheme } = useTheme();
  const current = AIR_PALETTES.find(item => item.id === palette) ?? AIR_PALETTES[0];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={`palette-toggle ${className}`} aria-label={`Colours: ${current.name}. Change colours`} title="Change colours">
          <span className="palette-dots" aria-hidden="true">
            {current.swatches.map(colour => <i key={colour} style={{ background: colour }} />)}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={10} className="palette-menu">
        <div className="palette-menu-head">
          <div><p className="eyebrow">Colours</p><b>Pick a look.</b></div>
          {toggleTheme ? (
            <button className="palette-mode" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
              <span>{theme === "dark" ? "Light" : "Dark"}</span>
            </button>
          ) : null}
        </div>
        <ul className="palette-list" role="listbox" aria-label="Colour palette">
          {AIR_PALETTES.map(item => {
            const selected = item.id === palette;
            return (
              <li key={item.id}>
                <button role="option" aria-selected={selected} className={`palette-option ${selected ? "selected" : ""}`} onClick={() => setPalette(item.id)}>
                  <span className="palette-dots" aria-hidden="true">{item.swatches.map(colour => <i key={colour} style={{ background: colour }} />)}</span>
                  <span className="palette-copy"><b>{item.name}</b><small>{item.note}</small></span>
                  {selected ? <Check className="size-4 shrink-0" aria-hidden="true" /> : null}
                </button>
              </li>
            );
          })}
        </ul>
        <p className="palette-note">Saved on this device only.</p>
      </PopoverContent>
    </Popover>
  );
}
