import fs from "fs";
import archiver from "archiver";
import { flavorEntries } from "@catppuccin/palette";

const themeConfig = {
  "--primary-d2": "crust",
  "--primary-d1": "mantle",
  "--primary": "base",
  "--primary-l1": "surface0",
  "--primary-l2": "base",
  "--secondary-d1": "overlay2",
  "--secondary": "text",
  "--secondary-l1": "text",
  "--secondary-l2": "text",
  "--secondary-f1": "subtext1",
  "--secondary-f2": "subtext0",
  // "--accent-d2": "", // not used anywhere
  "--accent-d1": "subtext0", // --MenuItem--selected__background-color
  "--accent": "mauve",
  "--accent-l1": "subtext1", // --MenuItem__background-color
  "--accent-l2": "text", // --MenuItem--hover__background-color
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

const BUILD_DIR = "build";
const FILENAME_PREFIX = "catppuccin";

flavorEntries.forEach(async (flavor) => {
  const [name, palette] = flavor;
  console.log(`Generating theme for "${name}"`);
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
  console.log(`"${name}" theme assembled. Creating archive...`);

  if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR);
  }
  const filename = `${BUILD_DIR}/${FILENAME_PREFIX}-${name}.keybr-theme`;
  const output = fs.createWriteStream(filename);
  const archive = archiver("zip");
  archive.pipe(output);
  archive.append(JSON.stringify(theme), { name: "theme.json" });
  archive.on("finish", () => {
    console.log(`"${filename}" created.`);
  });
  await archive.finalize();
});
