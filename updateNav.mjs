import fs from 'fs';
const file = 'src/components/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `          {/* Desktop Navigation - Hidden on smaller screens (below xl) */}
          <div className="hidden xl:flex items-center gap-6 2xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={\`text-base font-bold transition-colors hover:text-sky-500 whitespace-nowrap \${
                  (location.pathname === link.href || (location.pathname === '/' && location.hash === link.href.replace('/', '')))
                     ? (isScrolled ? 'text-sky-600 border-b-2 border-sky-600 pb-1' : 'text-white border-b-2 border-white pb-1')
                     : (isScrolled ? 'text-slate-600' : 'text-white/90')
                }\`}
              >
                {link.name}
              </Link>
            ))}
          </div>`;

const replacement = `          {/* Desktop Navigation - Hidden on smaller screens (below xl) */}
          <div className="hidden xl:flex items-center gap-6 2xl:gap-8 relative">
            {navLinks.map((link) => {
              const isActive = (location.pathname === link.href || (location.pathname === '/' && location.hash === link.href.replace('/', '')));
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={\`relative px-2 py-1 text-base font-bold transition-colors hover:text-sky-500 whitespace-nowrap \${
                    isActive
                       ? (isScrolled ? 'text-sky-600' : 'text-white')
                       : (isScrolled ? 'text-slate-600' : 'text-white/90')
                  }\`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className={\`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full \${isScrolled ? 'bg-sky-600' : 'bg-white'}\`}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>`;

if (content.includes(target)) {
    fs.writeFileSync(file, content.replace(target, replacement));
    console.log('updated nav');
} else {
    console.log('target not found, let me check the file content precisely.');
}
