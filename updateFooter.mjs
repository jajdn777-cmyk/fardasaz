import fs from 'fs';
const file = 'src/components/Footer.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('memo(')) {
  content = content.replace("import React from 'react';", "import React, { memo } from 'react';");
  content = content.replace("export default function Footer()", "const Footer = memo(function Footer()");
  content = content.replace(/}\s*$/, "});\nexport default Footer;");
  
  fs.writeFileSync(file, content);
  console.log("Updated Footer.tsx");
} else {
  console.log("Target not found or already updated in Footer.tsx");
}
