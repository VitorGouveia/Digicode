type createPostPromptProps = (topic: string) => {
  title: string;
  intro: string;
  outline: string;
  conclusion: string;
};

const createPostPrompt = (fn: createPostPromptProps) => (topic: string) => {
  const { title, intro, conclusion, outline } = fn(topic);

  return `
    You're going to create a post for my blog, follow the instructions below to create my post.
    ${title}
    ${intro}
    ${conclusion}
    ${outline}

    Substitute all words inside [] for words you think are fit for the context.
    Substitute XX with a number you think it's reasonable.
    Substitute [Desired outcome] for an outcome you think is desirable in ${topic}
  `;
};

const Listicles = createPostPrompt((topic) => ({
  title: `
    Create an attention-grabbing title about ${topic} following one of the templates below:

    "XX Ways to [Desired outcome]", usage "11 Ways to Sneak Snacks into a Plane";
    "XX [Topic] Tips [Benefit or Desired Outcome]", usage "7 SEO Tips that Actually Work";
    "XX [Type] Tools [Benefit or Desired Outcome]", usage "17 Productivity Tools That'll Save you 3 Hours Per Day";
    "XX Reasons Why [Problem]", usage "17 Reasons Why You're not Ranking in Google";
    "XX [Topic] Techniques [Benefit or Desired Outcome]", usage "4 Blogging Techniques to Grow Your Audience";
    "XX [Products] For [Desired Outcome]", usage "8 Protein Powders For Bulking";
  `,
  intro: `
    Create a description, build trust and excitment in as few words as possible within 50 words limit.
    Use any scientific data on the topic to solidify your point.
  `,
  outline: `
    Build an outline that gives a brief description about that point in order to catch viewer attention.
    Number each item.
    For example, if the post is about "17 Weight Loss Tips", instead of having a point be "Eat Spicy Foods" have it be "Eat Spicy Foods to Burn More Calories".
    Also, make the contents of the headings have a consistent structure, such as brief description, pros, cons and a final grade.
  `,
  conclusion: `
    Briefly summarize a key takeway.
    Recommend additional content.
  `,
}));

const HowToGuides = createPostPrompt((topic) => ({
  title: `
    Create an attention-grabbing title about ${topic} following one of the templates below:

    "How to [Achieve Desired Outcome] (XX Steps)", usage "How to Build a Deck (7 Steps)"
    "How to [Achieve Desired Outcome] (Even If [Commom Obstruction])", usage "How to Start a Business (Even If You Don't have Money)"
    "How to [Achieve Desired Outcome] ([Additional Benefit])", usage "How to Find Email Addresses for Link Building (Fully Automated)"
  `,
  intro: `
    Create a short and concise description following the PSP method (Problem, Solution, Proof).

    For example, let's say the blog post is "How to Do Youtube Keyword Research", a description fit for it would be

    "Looking to grow your youtube channel and attract more views? The "trick" is to target topics with search demand. This is the approach that helped us grow our YouTube channel from 10k to over 200k monthly views in one year."
  `,
  outline: `
    Create an outline that follows a logical sequence such as:

    "Step 1: Map out a hierarchy of topics."
    "Step 2: Generate keyword ideas."
    "Step 3: Check search intent."

    The outline must also have a prefix with the step number and a colon
  `,
  conclusion: `
    Create a short conclusion that summarizes and links to another post on the blog.
  `,
}));

const ExpandedDefinition = createPostPrompt((topic) => ({
  title: `
    Create an attention-grabbing title about ${topic} following one of the templates below:

    "What is/are [Concept]? Everything you need to know.", usage "What is an Oligarch? Everything you need to know."
    "What is/are [Acronym]? [Expanded Acronym] Explained.", usage "What are SERPs? Search Engine Results Pages Explained."
    "What is/are [Concept]? A [Brief/Quick/Detailed] Introduction.", usage "What are NFTs? A Detailed Introduction to Expensive JPEGs"
  `,
  intro: `
    Create a short description that defines the acronym or concepts.

    For example, if the post has title "What are SERPs? Search Engine Results Pages Explained." it should have the following description "Search Engine Results Pages (SERPs) are the pages that Google and other search engines show in response to a user's search query."
  `,
  outline: `
    Create an outline that has the most important points about ${topic}
  `,
  conclusion: `
    Create a conclusion that summarizes the key learnings
  `,
}));

const BeginnersGuide = createPostPrompt((topic) => ({
  title: `
    Create an attention-grabbing title about ${topic} following one of the templates below:

    "[Topic] For Beginners: [Desire]", usage "SEO For Beginners: How to Rank #1 in Google."
    "The Beginner's Guide to [Topic]", usage "The Beginner's Guide to Personal Finance."
    "The Noob-Friendly Guide to [Topic].", usage "The Noob-Friendly Guide to Potty Training"
  `,
  intro: `
    Create a short description that uses simple language to teach a noob audience.
  `,
  outline: `
    Create an outline that has the most important points about ${topic} that a beginner would like to know.
  `,
  conclusion: `
    Create a conclusion that summarizes the key learnings and encourages the reader.
  `,
}));

const PostTypes = {
  Listicles,
};
