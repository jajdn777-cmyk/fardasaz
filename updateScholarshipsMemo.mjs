import fs from 'fs';
const file = 'src/components/Scholarships.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('useMemo')) {
  content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect, useMemo } from 'react';");
}

const targetFilter = `  const filtered = scholarships.filter((s) => {
    const matchGender = selectedGenders.length === 0 || selectedGenders.includes(s.gender);
    const matchLevel = selectedLevels.length === 0 || s.levels.some((l) => selectedLevels.includes(l));
    const matchFormat = selectedFormats.length === 0 || selectedFormats.includes(s.format);
    const matchCoverage = selectedCoverages.length === 0 || selectedCoverages.includes(s.coverage);
    const matchCountry = selectedCountries.length === 0 || (s.country && selectedCountries.includes(s.country));
    return matchGender && matchLevel && matchFormat && matchCoverage && matchCountry;
  });`;

const replacementFilter = `  const filtered = useMemo(() => scholarships.filter((s) => {
    const matchGender = selectedGenders.length === 0 || selectedGenders.includes(s.gender);
    const matchLevel = selectedLevels.length === 0 || s.levels.some((l) => selectedLevels.includes(l));
    const matchFormat = selectedFormats.length === 0 || selectedFormats.includes(s.format);
    const matchCoverage = selectedCoverages.length === 0 || selectedCoverages.includes(s.coverage);
    const matchCountry = selectedCountries.length === 0 || (s.country && selectedCountries.includes(s.country));
    return matchGender && matchLevel && matchFormat && matchCoverage && matchCountry;
  }), [scholarships, selectedGenders, selectedLevels, selectedFormats, selectedCoverages, selectedCountries]);`;

const targetCountries = `  const availableCountries = Array.from(new Set(scholarships.map(s => s.country).filter(Boolean))) as string[];`;
const replacementCountries = `  const availableCountries = useMemo(() => Array.from(new Set(scholarships.map(s => s.country).filter(Boolean))) as string[], [scholarships]);`;

if (content.includes(targetFilter)) {
  content = content.replace(targetFilter, replacementFilter);
}
if (content.includes(targetCountries)) {
  content = content.replace(targetCountries, replacementCountries);
}

fs.writeFileSync(file, content);
console.log("Updated Scholarships.tsx");
