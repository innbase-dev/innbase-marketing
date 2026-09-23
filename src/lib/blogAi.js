const REQUESTS = [
  {
    id: "explain",
    label: "Explain it simply",
    description: "Get a plain-English explanation with everyday hotel examples.",
    request: "Explain the main ideas in five short points, with one everyday hotel example.",
  },
  {
    id: "checklist",
    label: "Make a checklist",
    description: "Turn the guide into a short checklist your team can use.",
    request: "Turn this guide into a practical checklist my team can use during a shift. Keep each action short and clear.",
  },
  {
    id: "plan",
    label: "Plan for my hotel",
    description: "Work out a practical starting point for your own property.",
    request: "Help me apply this guide to my hotel. Start by asking one short question about how we work today, then build a small, realistic plan with me.",
  },
];

// Only public article context goes into the link. No API call, account data,
// tracking parameter or hotel record is sent from the Innbase website.
export function buildBlogAiOptions(post, canonicalUrl) {
  const context = [
    "I run or manage a hotel in Nigeria. Help me put this Innbase guide to use.",
    `Guide: ${post.title}`,
    `Article: ${canonicalUrl}`,
    `Summary: ${post.excerpt}`,
    "The guide's main points:",
    ...post.takeaways.map((point) => `- ${point}`),
    `Topic to explore: ${post.aiQuestion || post.title}`,
  ].join("\n");

  return REQUESTS.map(({ request, ...option }) => {
    const prompt = [
      context,
      request,
      "Use simple English, familiar hotel examples and naira where useful. Avoid technical jargon. Do not assume the size of my property or team.",
      "If you cannot open the article, say so and work from the summary above. Do not invent claims from the article. Ask one question at a time when you need more details.",
    ].join("\n\n");
    const url = new URL("https://chatgpt.com/");
    url.searchParams.set("q", prompt);
    return { ...option, href: url.href };
  });
}
