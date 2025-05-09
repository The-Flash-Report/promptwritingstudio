// Import all prompt categories
import { contentIdeationPrompts } from './content-ideation-prompts';
import { writingAssistancePrompts } from './writing-assistance-prompts';
import { audienceEngagementPrompts } from './audience-engagement-prompts';
import { brandingMessagingPrompts } from './branding-messaging-prompts';
import { salesNurturePrompts } from './sales-nurture-prompts';
import { repurposingEfficiencyPrompts } from './repurposing-efficiency-prompts';

// Import categories from sample-prompts
import { categories } from './sample-prompts';

// Combine all prompts into one array
export const allAuthenticCreatorPrompts = [
  ...contentIdeationPrompts,         // 15 prompts (1-15)
  ...writingAssistancePrompts,       // 25 prompts (16-40)
  ...audienceEngagementPrompts,      // 20 prompts (41-60)
  ...brandingMessagingPrompts,       // 15 prompts (61-75)
  ...salesNurturePrompts,            // 15 prompts (76-90)
  ...repurposingEfficiencyPrompts    // 11 prompts (91-101)
];

// Export categories
export { categories };

