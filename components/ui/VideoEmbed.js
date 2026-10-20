import Head from 'next/head'

/**
 * Single-video companion to YouTubeVideoSection (which handles playlists).
 *
 * Metadata below is taken from the YouTube Data API for the Become A Writer
 * Today channel (UCglNILz3uBqPer5EMJ_pzVg), verified live against videos.list on 2026-08-21.
 * Titles change: yRMCSueiMTU was retitled 2026-08-19 and a cached dump missed it.
 * Re-pull from the API rather than trusting data/dump-*.json. Titles,
 * publish dates and durations are the real values, so the VideoObject schema
 * this component emits matches what Google sees on YouTube.
 *
 * Only public videos are listed here. Do not add a video id until it is public.
 */
export const VIDEO_META = {
  TGy3DLIC9Gw: {
    title: 'I Used Claude Code on my Zettelkasten!',
    description:
      'A field report on connecting Claude Code to a 7,000+ note Zettelkasten and building three AI analyzers that draft a week of content in about two minutes.',
    uploadDate: '2026-01-31',
    duration: 'PT11M44S'
  },
  yRMCSueiMTU: {
    title: 'Cursor vs VS Code: Why I Switched (Honest Comparison)',
    description:
      'Why I moved my day-to-day editing from VS Code to Cursor for vibe coding projects, and what actually changed in the workflow.',
    uploadDate: '2025-09-05',
    duration: 'PT9M3S'
  },
  GRylWQKlN8U: {
    title: 'How to Train Claude AI to Write like You',
    description:
      'A step-by-step walkthrough of Claude Projects: loading your own writing as context, comparing Projects to ChatGPT custom bots, and using them in a content business.',
    uploadDate: '2024-10-03',
    duration: 'PT10M22S'
  },
  'd-EXvNDabmA': {
    title: "Claude vs ChatGPT: What's Best For Content Creation?",
    description:
      'A side-by-side test of Claude and ChatGPT on real content work, with a clear call on when to reach for each one.',
    uploadDate: '2024-12-09',
    duration: 'PT12M10S'
  },
  IgqmJQk3O6U: {
    title: 'Claude Tutorial: The AI Tool Creators Needs',
    description:
      'Setting up Claude from scratch: account setup, customising preferences, and building project templates for repeatable content work.',
    uploadDate: '2025-04-09',
    duration: 'PT16M17S'
  },
  cHkBSjLR4Yk: {
    title: 'How I Write Rules for Cursor AI',
    description:
      'How I write project rules for Cursor AI, the same idea a CLAUDE.md file serves in Claude Code.',
    uploadDate: '2025-07-05',
    duration: 'PT5M5S'
  },
  '1xufb9h1Tjw': {
    title: 'How to Connect Cursor to GitHub (Beginner Tutorial)',
    description:
      'Pushing a Cursor project to GitHub end to end: creating the repository, the first push, writing the deployment workflow into a file, and registering it as an Agent Requested Cursor Rule.',
    uploadDate: '2025-07-07',
    duration: 'PT4M45S'
  },
  yGs7WVcozbQ: {
    title: 'How to Build a Website With Cursor AI',
    description:
      'A short walkthrough of building a website with Cursor AI, prompt first.',
    uploadDate: '2026-02-05',
    duration: 'PT1M7S'
  }
}

export default function VideoEmbed({
  videoId,
  heading,
  context,
  className = ''
}) {
  const meta = VIDEO_META[videoId]

  // A missing entry used to render nothing at all, which meant a typo'd or
  // unregistered id removed the embed from the page with no trace anywhere.
  // Now it shouts, and still renders the video: only the schema is dropped,
  // because schema built from guessed metadata is worse than no schema.
  if (!meta) {
    console.error(
      `[VideoEmbed] No VIDEO_META entry for "${videoId}". Rendering the iframe without VideoObject schema. Add the video to VIDEO_META in components/ui/VideoEmbed.js.`
    )
    return (
      <div className={`bg-[#F9F9F9] border border-gray-200 rounded-lg overflow-hidden ${className}`}>
        <div className="aspect-video bg-black">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
            title={heading || 'Video'}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    )
  }

  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: meta.title,
    description: meta.description,
    thumbnailUrl: [`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`],
    uploadDate: meta.uploadDate,
    duration: meta.duration,
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    publisher: {
      '@type': 'Organization',
      name: 'PromptWritingStudio',
      url: 'https://promptwritingstudio.com'
    },
    creator: {
      '@type': 'Person',
      name: 'Bryan Collins',
      url: 'https://www.youtube.com/channel/UCglNILz3uBqPer5EMJ_pzVg'
    }
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
        />
      </Head>

      <div className={`bg-[#F9F9F9] border border-gray-200 rounded-lg overflow-hidden ${className}`}>
        <div className="aspect-video bg-black">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
            title={meta.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
        <div className="p-5 md:p-6">
          <p className="text-sm font-bold text-[#FFB800] uppercase tracking-wide mb-2">
            {heading || 'Watch me do this'}
          </p>
          <h3 className="text-lg md:text-xl font-bold text-[#1A1A1A] mb-2">{meta.title}</h3>
          <p className="text-[#333333]">{context || meta.description}</p>
        </div>
      </div>
    </>
  )
}
