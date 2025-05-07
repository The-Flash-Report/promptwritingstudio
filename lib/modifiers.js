import fs from 'fs';
import path from 'path';

const modifiersDirectory = path.join(process.cwd(), 'data/modifiers');

export function getAllModifiers() {
  const fileNames = fs.readdirSync(modifiersDirectory);
  
  return fileNames.map(fileName => {
    const slug = fileName.replace(/\.json$/, '');
    const fullPath = path.join(modifiersDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const data = JSON.parse(fileContents);
    
    return {
      slug,
      ...data
    };
  });
}

export function getModifierData(slug) {
  const fullPath = path.join(modifiersDirectory, `${slug}.json`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const data = JSON.parse(fileContents);
  
  return {
    modifier: slug,
    ...data
  };
}

export function getModifierSlugs() {
  const fileNames = fs.readdirSync(modifiersDirectory);
  return fileNames.map(fileName => fileName.replace(/\.json$/, ''));
}
