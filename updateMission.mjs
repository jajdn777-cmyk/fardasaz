import fs from 'fs';
const file = 'src/components/Mission.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('useMemo')) {
  content = content.replace("import React from 'react';", "import React, { useMemo, memo } from 'react';");
}

const target = "const services = [";
const replacement = "const services = useMemo(() => [";

if (content.includes(target) && !content.includes(replacement)) {
  content = content.replace(target, replacement);
  
  const endTarget = "    }\n  ];";
  const endReplacement = "    }\n  ], [t]);";
  
  content = content.replace(endTarget, endReplacement);
  
  if (!content.includes('memo(')) {
    content = content.replace("export default function Mission()", "const Mission = memo(function Mission()");
    content = content.replace(/}\s*$/, "});\nexport default Mission;");
  }

  fs.writeFileSync(file, content);
  console.log("Updated Mission.tsx");
} else {
  console.log("Target not found or already updated in Mission.tsx");
}
