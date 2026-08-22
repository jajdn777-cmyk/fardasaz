import fs from 'fs';
const file = 'src/components/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div className="hidden xl:flex items-center gap-6 2xl:gap-8">[\s\S]*?<\/div>/;

const replacement = `<div className="hidden xl:flex items-center gap-6 2xl:gap-8 relative">
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

fs.writeFileSync(file, content.replace(regex, replacement));
console.log('done regex');
