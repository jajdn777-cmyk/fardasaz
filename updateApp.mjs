import fs from 'fs';
const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `export default function App() {`;
const replacement = `import { useTranslation } from 'react-i18next';
export default function App() {
  const { i18n } = useTranslation();
  React.useEffect(() => {
    document.documentElement.dir = ['fa', 'ps'].includes(i18n.language) ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);`;

if (content.includes(target) && !content.includes('useTranslation')) {
  fs.writeFileSync(file, content.replace(target, replacement));
  console.log('updated App.tsx');
} else {
  console.log('App.tsx already updated or target not found');
}
