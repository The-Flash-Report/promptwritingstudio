/**
 * Creative Writing Prompts System
 * 
 * This file contains writing-specific prompts and templates for creative writers
 * Categories: Fiction, Character Development, Setting, Dialogue, Poetry, Non-fiction, Writing Exercises
 */

// =========================================
// WRITING PROMPT CATEGORIES
// =========================================

export const writingPromptCategories = {
  fiction: {
    name: "Fiction Stories",
    description: "Story prompts for novels, short stories, and flash fiction",
    icon: "📚"
  },
  character: {
    name: "Character Development", 
    description: "Prompts to develop compelling characters",
    icon: "👤"
  },
  setting: {
    name: "Setting & World-building",
    description: "Prompts for creating vivid places and worlds",
    icon: "🌍"
  },
  dialogue: {
    name: "Dialogue & Voice",
    description: "Prompts to practice dialogue and narrative voice",
    icon: "💬"
  },
  poetry: {
    name: "Poetry & Verse",
    description: "Prompts for poems, lyrics, and experimental verse",
    icon: "🎭"
  },
  nonfiction: {
    name: "Non-fiction & Memoir",
    description: "Prompts for essays, memoirs, and creative non-fiction",
    icon: "📖"
  },
  exercises: {
    name: "Writing Exercises",
    description: "Skill-building prompts and writing techniques",
    icon: "✏️"
  }
};

// =========================================
// WRITING PROMPT TEMPLATES
// =========================================

export const writingPromptTemplates = {
  fiction: [
    {
      title: "Story Starter",
      description: "Open-ended prompts to begin new stories",
      prompts: [
        "Write about a character who finds their childhood diary and discovers entries they never wrote.",
        "A new app claims to predict exactly when you'll meet your soulmate. Your character gets a notification that says 'Now.'",
        "Every morning, your character wakes up in a different person's life. Today, they wake up as someone they've hurt in the past.",
        "Write about a library where you can check out experiences instead of books.",
        "Your character inherited a house with a door that only appears during thunderstorms.",
        "A time traveler keeps trying to prevent a small, seemingly insignificant event from happening.",
        "Write about a character who can hear what plants are thinking.",
        "Your character discovers that their dreams are glimpses into parallel versions of their life.",
        "A small town where everyone is required to tell one truth and one lie each day.",
        "Write about someone who collects lost things and the day they found something that wanted to stay lost."
      ]
    },
    {
      title: "Genre-Specific Prompts",
      description: "Prompts tailored to specific fiction genres",
      prompts: [
        "Mystery: A detective realizes the evidence points to them as the culprit, but they have no memory of committing the crime.",
        "Sci-Fi: Humans have developed the ability to transfer consciousness between bodies, but your character's body is about to expire.",
        "Fantasy: A magic system where spells can only be cast by telling deeply personal truths about yourself.",
        "Horror: Your character realizes their therapist has been dead for six months.",
        "Romance: Two rival food truck owners keep parking in the same spot and leaving passive-aggressive notes for each other.",
        "Thriller: Your character receives a text meant for someone else that contains their exact location and the words 'Target acquired.'",
        "Historical Fiction: Write about a servant in a grand house who discovers letters that could change the course of a war.",
        "Literary Fiction: Explore the relationship between a parent and child through the lens of a family recipe passed down through generations.",
        "Adventure: Your character finds a map that shows places that don't exist yet.",
        "Dystopian: In a world where emotions are regulated by daily pills, your character accidentally takes a double dose."
      ]
    }
  ],
  
  character: [
    {
      title: "Character Creation",
      description: "Prompts to develop complex, compelling characters",
      prompts: [
        "Create a character whose greatest strength is also their greatest weakness.",
        "Write about someone who collects one specific item obsessively and why they started.",
        "Develop a character who speaks three languages but lies in a different one each time.",
        "Create a character whose profession is the opposite of their personality.",
        "Write about someone who remembers everything except the most important day of their life.",
        "Develop a character who can only tell the truth on Wednesdays.",
        "Create a character whose scars tell a story different from what people assume.",
        "Write about someone who inherited a skill they never wanted.",
        "Develop a character who writes letters they never send.",
        "Create a character who sees auras around people but wishes they couldn't."
      ]
    },
    {
      title: "Character Relationships",
      description: "Prompts exploring character interactions and dynamics",
      prompts: [
        "Two characters who hate each other are forced to road-trip together.",
        "Write about siblings who discover they were raised by different versions of the same parent.",
        "A mentor and student realize they've been learning from each other all along.",
        "Two ex-best friends meet at their mutual friend's wedding.",
        "A character meets their childhood imaginary friend as an adult.",
        "Write about a parent and child who can only communicate through text messages.",
        "Two characters share the same recurring dream.",
        "A character falls in love with someone who might be their worst enemy in disguise.",
        "Write about roommates who've never met in person despite living together for a year.",
        "A character must work with the person who replaced them at their dream job."
      ]
    }
  ],

  setting: [
    {
      title: "Unique Locations",
      description: "Prompts for creating memorable settings",
      prompts: [
        "A 24-hour laundromat where people wash away their regrets.",
        "A bookstore that exists in the space between two buildings.",
        "A train station where all the departure times are emotional states rather than destinations.",
        "A coffee shop where the barista knows exactly what you need before you order.",
        "A library where the books rearrange themselves based on what you need to read.",
        "A museum of lost memories where visitors can reclaim what they've forgotten.",
        "A small town where it's been the same season for five years.",
        "A house where each room exists in a different time period.",
        "A lighthouse that guides lost souls instead of ships.",
        "A garden where flowers bloom in response to the gardener's emotions."
      ]
    },
    {
      title: "World-building Elements",
      description: "Prompts for creating rich, detailed worlds",
      prompts: [
        "Create a society where your job is determined by the color of your eyes.",
        "Design a world where gravity works differently depending on your mood.",
        "Build a civilization that communicates entirely through music.",
        "Create a place where seasons change based on collective human emotion.",
        "Design a world where memories can be stored in physical objects.",
        "Build a society where everyone gets a superpower on their 16th birthday, but they don't get to choose it.",
        "Create a world where the dead can leave voicemails for the living.",
        "Design a place where colors have flavors and sounds have textures.",
        "Build a civilization where aging happens backwards.",
        "Create a world where everyone's dreams are visible to others while they sleep."
      ]
    }
  ],

  dialogue: [
    {
      title: "Conversation Starters",
      description: "Prompts focused on dialogue and character voice",
      prompts: [
        "Write a conversation between two people where neither says what they actually mean.",
        "A dialogue where one character speaks only in questions and the other only in statements.",
        "Write a conversation taking place entirely through fortune cookies.",
        "A dialogue between someone packing and someone trying to convince them to stay.",
        "Write a conversation where each character is having a completely different conversation.",
        "A dialogue between a character and their reflection.",
        "Write a conversation where the most important information is in what's not said.",
        "A dialogue between two characters who are pretending to be other people.",
        "Write a conversation that takes place entirely during a power outage.",
        "A dialogue where one character speaks only in metaphors."
      ]
    },
    {
      title: "Voice Development",
      description: "Prompts to develop distinctive narrative voices",
      prompts: [
        "Write the same scene from three different characters' perspectives, each with a unique voice.",
        "Tell a story entirely through a character's internal monologue during a silent moment.",
        "Write a story in the voice of someone who always sees the best in everything.",
        "Tell a story from the perspective of the most unreliable narrator you can create.",
        "Write in the voice of someone who speaks entirely in technical jargon.",
        "Tell a story from the perspective of someone who's lost their ability to use adjectives.",
        "Write in the voice of someone who treats every minor inconvenience as a major crisis.",
        "Tell a story from the perspective of someone who only speaks in movie quotes.",
        "Write in the voice of someone who never uses the same word twice.",
        "Tell a story from the perspective of someone who communicates primarily in questions."
      ]
    }
  ],

  poetry: [
    {
      title: "Poetic Forms",
      description: "Prompts exploring different poetry styles and structures",
      prompts: [
        "Write a sonnet about a modern everyday object.",
        "Create a haiku sequence that tells a complete story.",
        "Write a prose poem about the space between words.",
        "Create a list poem of things you've never told anyone.",
        "Write a poem where each line begins with the next letter of the alphabet.",
        "Create a poem using only questions.",
        "Write a poem that reads differently forwards and backwards.",
        "Create a concrete poem where the shape reflects the meaning.",
        "Write a poem consisting entirely of instructions.",
        "Create a poem using only words found in a single news headline."
      ]
    },
    {
      title: "Imagery & Metaphor",
      description: "Prompts focusing on poetic language and imagery",
      prompts: [
        "Write a poem comparing human emotions to weather phenomena.",
        "Create a poem where colors represent different memories.",
        "Write a poem about silence using only sound imagery.",
        "Create a poem where each stanza represents a different sense.",
        "Write a poem about time using only space imagery.",
        "Create a poem where common objects become mythical creatures.",
        "Write a poem about love using only architectural terms.",
        "Create a poem where each line contains a different texture.",
        "Write a poem about change using only geological imagery.",
        "Create a poem where abstract concepts become physical landscapes."
      ]
    }
  ],

  nonfiction: [
    {
      title: "Personal Essays",
      description: "Prompts for creative non-fiction and memoir writing",
      prompts: [
        "Write about a lesson you learned from someone you only met once.",
        "Explore a belief you held strongly as a child that you now question.",
        "Write about a place that exists only in your memory.",
        "Explore the story behind a family photograph.",
        "Write about a time when you were completely wrong about someone.",
        "Explore how your definition of home has changed over time.",
        "Write about a conversation you wish you could have with your younger self.",
        "Explore a tradition in your family that no one talks about anymore.",
        "Write about the moment you realized you were an adult.",
        "Explore something you inherited that isn't an object."
      ]
    },
    {
      title: "Observational Writing",
      description: "Prompts for documentary and observational pieces",
      prompts: [
        "Document a day in the life of your neighborhood from dawn to dusk.",
        "Write about the secret life of a public space during off-hours.",
        "Explore the stories hidden in an old building's architecture.",
        "Document the changing demographics of a place you know well.",
        "Write about the languages you hear in one location over time.",
        "Explore the economy of a single city block.",
        "Document how people use technology differently across generations.",
        "Write about the seasonal changes in human behavior in your area.",
        "Explore the unwritten rules of a specific community or group.",
        "Document the traces previous residents left in your living space."
      ]
    }
  ],

  exercises: [
    {
      title: "Technique Building",
      description: "Exercises to improve specific writing skills",
      prompts: [
        "Write a scene using only dialogue - no action or description tags.",
        "Describe a character without using any physical descriptions.",
        "Write a tense scene using only simple, short sentences.",
        "Create atmosphere using only sensory details - no emotions.",
        "Write an action sequence in slow motion.",
        "Show a character's personality through their possessions alone.",
        "Write the same emotional scene as comedy, then as tragedy.",
        "Create suspense in a completely ordinary situation.",
        "Write a love scene without using the word 'love' or any synonyms.",
        "Show the passage of time in a single paragraph."
      ]
    },
    {
      title: "Creative Constraints",
      description: "Writing exercises with specific limitations",
      prompts: [
        "Write a story in exactly 55 words.",
        "Tell a complete story using only text messages.",
        "Write a story that takes place entirely in an elevator.",
        "Create a narrative using only overheard conversations.",
        "Write a story where every sentence has exactly seven words.",
        "Tell a story through a series of lists.",
        "Write a story that takes place in real-time.",
        "Create a narrative using only descriptions of hands.",
        "Write a story from the perspective of an inanimate object.",
        "Tell a story using only questions and answers."
      ]
    }
  ]
};

// =========================================
// RANDOM PROMPT GENERATORS
// =========================================

export const generateRandomPrompt = (category = null) => {
  let allPrompts = [];
  
  if (category && writingPromptTemplates[category]) {
    // Get prompts from specific category
    writingPromptTemplates[category].forEach(template => {
      allPrompts = allPrompts.concat(template.prompts);
    });
  } else {
    // Get prompts from all categories
    Object.values(writingPromptTemplates).forEach(categoryTemplates => {
      categoryTemplates.forEach(template => {
        allPrompts = allPrompts.concat(template.prompts);
      });
    });
  }
  
  return allPrompts[Math.floor(Math.random() * allPrompts.length)];
};

// =========================================
// PROMPT COMBINATION GENERATORS
// =========================================

export const generateCombinationPrompt = (elements) => {
  const { genre, character, setting, conflict, theme } = elements;
  
  const templates = [
    `Write a ${genre} story about ${character} in ${setting} who must deal with ${conflict} while exploring themes of ${theme}.`,
    `Create a ${genre} narrative featuring ${character}. Set in ${setting}, the story should center around ${conflict} and examine ${theme}.`,
    `In ${setting}, ${character} faces ${conflict}. Write this as a ${genre} story that explores ${theme}.`,
    `Your ${genre} story begins with ${character} in ${setting}. The central conflict involves ${conflict}, and the underlying theme is ${theme}.`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
};

// =========================================
// WRITING CHALLENGE GENERATORS
// =========================================

export const writingChallenges = {
  daily: [
    "Write for 15 minutes without stopping, using the first word you see as your starting point.",
    "Create a character based on someone you observed today, but give them an opposite personality.",
    "Write a scene that takes place entirely during a phone call.",
    "Describe your current surroundings from the perspective of an alien visitor.",
    "Write dialogue between two characters who are trying to avoid talking about the obvious."
  ],
  weekly: [
    "Write a short story that spans exactly one week, with each day representing a different stage of change.",
    "Create a character, then write them into three different genres (mystery, romance, sci-fi).",
    "Write the same scene from three different time periods (past, present, future).",
    "Develop a story using a different narrator for each chapter (first person, third person limited, omniscient).",
    "Write a complete story using only scenes that take place during transitions (arriving, leaving, waiting)."
  ],
  monthly: [
    "Write a novella where each chapter is written in a different literary style or voice.",
    "Create a interconnected story collection where characters from each story appear in others.",
    "Write the biography of a fictional character, covering their entire life.",
    "Develop a world-building project with complete history, culture, and geography.",
    "Write a story that spans multiple generations of the same family."
  ]
};

export default {
  writingPromptCategories,
  writingPromptTemplates,
  generateRandomPrompt,
  generateCombinationPrompt,
  writingChallenges
}; 