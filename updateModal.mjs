import fs from 'fs';
const file = 'src/components/VolunteerModal.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `      // Auto-close after 3 seconds on success
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);`;

const replacement = `      // Auto-close after 3 seconds on success
      setTimeout(() => {
        onClose();
        setTimeout(() => setIsSuccess(false), 500); // Wait for exit animation
      }, 3000);`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(file, content);
  console.log("Updated VolunteerModal.tsx");
} else {
  console.log("Target not found");
}
