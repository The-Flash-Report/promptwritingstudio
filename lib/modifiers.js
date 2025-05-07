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
  try {
    const fullPath = path.join(modifiersDirectory, `${slug}.json`);
    // Check if file exists before reading
    if (!fs.existsSync(fullPath)) {
      console.error(`File not found: ${fullPath}`);
      return { modifierName: slug, promptTemplates: [], useCases: [], faqs: [], relatedModifiers: [], seoData: { title: `${slug} Prompts`, description: `ChatGPT prompts for ${slug}` } };
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const data = JSON.parse(fileContents);
    
    return {
      modifier: slug,
      ...data
    };
  } catch (error) {
    console.error(`Error loading modifier data for ${slug}:`, error);
    // Return fallback data to prevent build failures
    return { modifierName: slug, promptTemplates: [], useCases: [], faqs: [], relatedModifiers: [], seoData: { title: `${slug} Prompts`, description: `ChatGPT prompts for ${slug}` } };
  }
}

export function getModifierSlugs() {
  try {
    // Ensure the directory exists
    if (!fs.existsSync(modifiersDirectory)) {
      console.error(`Modifiers directory not found: ${modifiersDirectory}`);
      return [];
    }
    
    // Get all JSON files in the directory
    const fileNames = fs.readdirSync(modifiersDirectory);
    
    // Filter to only include .json files and extract the slug
    return fileNames
      .filter(fileName => fileName.endsWith('.json'))
      .map(fileName => fileName.replace(/\.json$/, ''));
  } catch (error) {
    console.error('Error getting modifier slugs:', error);
    return [];
  }
}
