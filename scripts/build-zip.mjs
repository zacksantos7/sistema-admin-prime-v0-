import fs from 'fs';
import path from 'path';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import archiver from 'archiver';

const projectRoot = process.cwd();
const zipPath = path.join(projectRoot, 'prime-life-admin.zip');

// Files and directories to exclude
const excludePatterns = [
  'node_modules',
  '.next',
  '.git',
  '.gitignore',
  'dist',
  '.env.local',
  '.env*.local',
  '.vercel',
  'pnpm-lock.yaml',
  'package-lock.json',
  'yarn.lock',
  'scripts/build-zip.mjs',
  'prime-life-admin.zip',
  'user_read_only_context',
  'styles/globals.css' // Remove duplicated styles
];

function shouldExclude(filePath) {
  return excludePatterns.some(pattern => {
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace(/\*/g, '.*'));
      return regex.test(filePath);
    }
    return filePath.includes(pattern);
  });
}

async function createZip() {
  try {
    const output = createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    await pipeline(archive, output);

    archive.on('error', (err) => {
      throw err;
    });

    // Add all files recursively
    function addFiles(dir, arcPath = '') {
      const files = fs.readdirSync(dir);
      
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        const relativePath = path.join(arcPath, file);
        
        if (shouldExclude(relativePath)) {
          continue;
        }
        
        if (stat.isDirectory()) {
          addFiles(filePath, relativePath);
        } else {
          archive.file(filePath, { name: `prime-life-admin/${relativePath}` });
        }
      }
    }

    addFiles(projectRoot);
    await archive.finalize();

    const stats = fs.statSync(zipPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    
    console.log(`✅ ZIP criado com sucesso!`);
    console.log(`📦 Arquivo: prime-life-admin.zip`);
    console.log(`📊 Tamanho: ${sizeKB} KB`);
    console.log(`📍 Localização: ${zipPath}`);
    
  } catch (error) {
    console.error('❌ Erro ao criar ZIP:', error.message);
    process.exit(1);
  }
}

createZip();
