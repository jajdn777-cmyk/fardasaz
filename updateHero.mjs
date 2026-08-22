import fs from 'fs';
const file = 'src/components/Hero.tsx';
let content = fs.readFileSync(file, 'utf8');

// We need to add useMemo
if (!content.includes('useMemo')) {
  content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect, useMemo } from 'react';");
}

const target = "const slides = [";
const replacement = "const slides = useMemo(() => [";

if (content.includes(target) && !content.includes(replacement)) {
  content = content.replace(target, replacement);
  
  // Find the end of the array to close the useMemo
  // It ends with: "    }\n  ];"
  const endTarget = "    }\n  ];";
  const endReplacement = "    }\n  ], [t]);";
  
  content = content.replace(endTarget, endReplacement);
  
  fs.writeFileSync(file, content);
  console.log("Updated Hero.tsx");
} else {
  console.log("Target not found or already updated in Hero.tsx");
}
