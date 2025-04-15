import fs from "fs";
import { flavorEntries } from "@catppuccin/palette";

// Reference - mocha
//
// Rosewater #f5e0dc
// Flamingo #f2cdcd
// Pink #f5c2e7
// Mauve #cba6f7
// Red #f38ba8
// Maroon #eba0ac
// Peach #fab387
// Yellow #f9e2af
// Green #a6e3a1
// Teal #94e2d5
// Sky #89dceb
// Sapphire #74c7ec
// Blue #89b4fa
// Lavender #b4befe
// Text #cdd6f4
// Subtext 1 #bac2de
// Subtext 0 #a6adc8
// Overlay 2 #9399b2
// Overlay 1 #7f849c
// Overlay 0 #6c7086
// Surface 2 #585b70
// Surface 1 #45475a
// Surface 0 #313244
// Base #1e1e2e
// Mantle #181825
// Crust #11111b

const themeConfig = {
  "--primary-d2": "crust",
  "--primary-d1": "mantle",
  "--primary": "base",
  "--primary-l1": "surface0",
  "--primary-l2": "surface1",
  "--secondary-d1": "base",
  "--secondary": "text",
  "--secondary-l1": "text",
  "--secondary-l2": "text",
  "--secondary-f1": "subtext1",
  "--secondary-f2": "subtext0",
  // "--accent-d2": "",
  // "--accent-d1": "",
  "--accent": "mauve",
  // "--accent-l1": "",
  // "--accent-l2": "",
  // "--error-d1": "",
  // "--error": "",
  // "--error-l1": "",
  "--textinput__color": "overlay1",
  "--textinput--special__color": "surface0",
  "--textinput--hit__color": "text",
  "--textinput--miss__color": "red",
  "--slow-key-color": "peach",
  "--fast-key-color": "green",
  // "--effort-color": "",
  "--Name-color": "text",
  "--Value-color": "rosewater",
  "--Value--more__color": "green",
  "--Value--less__color": "maroon",
  "--Chart-speed__color": "lavender",
  "--Chart-accuracy__color": "mauve",
  "--Chart-complexity__color": "flamingo",
  "--Chart-threshold__color": "rosewater",
  "--Chart-hist-h__color": "green",
  "--Chart-hist-m__color": "red",
  "--Chart-hist-r__color": "lavender",
  "--pinky-zone-color": "surface0",
  "--ring-zone-color": "surface1",
  "--middle-zone-color": "surface2",
  "--left-index-zone-color": "overlay0",
  "--right-index-zone-color": "overlay1",
  "--thumb-zone-color": "overlay2",
  "--syntax-keyword": "mauve",
  "--syntax-string": "green",
  "--syntax-number": "peach",
  "--syntax-comment": "overlay2",
};

flavorEntries.forEach((flavor) => {
  const [name, palette] = flavor;
  const theme = Object.entries(themeConfig).reduce((acc, [key, value]) => {
    try {
      acc[key] = palette.colors[value].hex;
    } catch (e) {
      console.error(
        `Error: ${key} - ${name} ${value} - ${palette.colors[value]}`,
      );
    }
    return acc;
  }, {});

  fs.mkdirSync(name, { recursive: true });
  fs.writeFileSync(`${name}/theme.json`, JSON.stringify(theme, null, 2));
});
