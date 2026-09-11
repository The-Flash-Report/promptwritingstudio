import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import VideoEmbed from '../components/ui/VideoEmbed'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'

const faqs = [
  {
    question: "Should my GitHub repository be public or private?",
    answer: "Either works. I usually keep mine private. Cursor can read the repository and push to it either way, so privacy is a decision about who else sees your code, not about whether the integration functions."
  },
  {
    question: "Does this work with any AI model in Cursor?",
    answer: "Yes. When I recorded this workflow I happened to be running Gemini 2.5, but nothing here depends on the model. You are asking Cursor to run ordinary git commands in the terminal, and every model in the picker can do that. Pick whichever you already use."
  },
  {
    question: "Cursor says it cannot connect to my GitHub repository. What do I do?",
    answer: "This is the most common failure, and it is usually not an authentication problem. Cursor has no memory of how deployment works on this project, so it improvises and sometimes improvises badly. The fix is to stop re-explaining it every session: have Cursor write the deployment steps into a workflow file, then point at that file with the @ symbol whenever you push. The steps are on this page."
  },
  {
    question: "Cursor says 'working tree is clean' and nothing pushed. Is that an error?",
    answer: "No, that is the correct result when you have not changed anything since your last push. Git compares your local files against what is already on GitHub, finds no difference, and stops. You will see the same message any time you run the workflow twice in a row."
  },
  {
    question: "How often should I push to GitHub?",
    answer: "I run mine once or twice a day. The rule of thumb that matters more than frequency: push every time you finish something that works, and every time you fix a bug. Those are the two moments you would most regret losing, and they are the points you would want to restore back to."
  },
  {
    question: "Does this use the GitHub MCP server?",
    answer: "No. The workflow on this page uses Cursor's terminal and plain git commands, which is why it works without any extra setup. The GitHub MCP server is a separate route to a similar outcome and is not covered here."
  },
  {
    question: "What is the difference between a workflow file and a Cursor Rule?",
    answer: "A workflow file is a document in your project that you point Cursor at manually with the @ symbol. A Cursor Rule lives in Cursor's settings and can be pulled in automatically. The workflow file is the faster thing to create; the rule is what you graduate to once you are tired of typing the @ reference. Both hold the same content."
  }
]

const steps = [
  {
    n: '1',
    title: 'Create the repository on GitHub first',
    body: 'Log into GitHub, select Create new, and create a new repository. Give it a name and a description. You will also be asked whether it should be public or private. I usually keep mine private, and Cursor can read it either way.'
  },
  {
    n: '2',
    title: 'Copy the repository URL to your clipboard',
    body: 'Once the repository exists, GitHub hands you a link. That link is the only piece of information Cursor needs from you. Copy it.'
  },
  {
    n: '3',
    title: 'Ask Cursor to push, and paste the link',
    body: 'Back in Cursor, prompt it directly: "Can you push this project to my GitHub?" and paste the link underneath. No terminal knowledge required on your side.'
  },
  {
    n: '4',
    title: 'Let it run the git commands itself',
    body: 'Cursor will tell you the repository has not been initialised yet and that a series of commands needs to run. You do not have to run them. It works through the terminal commands itself and pushes the files across. Refresh GitHub and your project is there.'
  }
]

export default function ConnectCursorToGithub() {
  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'How to Connect Cursor to GitHub (2026)',
    description: 'How to push a Cursor project to GitHub, what to do when Cursor says it cannot connect to your repository, and how to make the workflow permanent with a Cursor Rule.',
    url: 'https://promptwritingstudio.com/connect-cursor-to-github',
    datePublished: '2026-08-21',
    dateModified: '2026-08-21',
    keywords: ['connect cursor to github', 'cursor github', 'cursor github setup', 'cursor github push', 'push cursor project to github', 'cursor git commit']
  })

  return (
    <>
      <Head>
        <title>How to Connect Cursor to GitHub (2026): The Workflow I Run Daily | PromptWritingStudio</title>
        <meta name="description" content="Push a Cursor project to GitHub in four steps, fix the 'cannot connect to your repository' error that stops most people, and turn the whole thing into a Cursor Rule you never have to explain again." />
        <meta name="keywords" content="connect cursor to github, cursor github, cursor github setup, cursor github push, cursor github repository, push cursor project to github, cursor git" />
        <meta property="og:title" content="How to Connect Cursor to GitHub (2026): The Workflow I Run Daily" />
        <meta property="og:description" content="The four steps, the error that stops most people, and how to stop re-explaining your deployment to Cursor every session." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://promptwritingstudio.com/connect-cursor-to-github" />
        <link rel="canonical" href="https://promptwritingstudio.com/connect-cursor-to-github" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-[#FFDE59] font-semibold text-lg mb-4">Cursor and GitHub, updated August 2026</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              How to Connect Cursor to GitHub
              <span className="block text-[#FFDE59]">And how to stop re-explaining it every session</span>
            </h1>

            <div className="max-w-3xl mx-auto bg-white/10 border-l-4 border-[#FFDE59] p-6 mb-8 rounded-r-lg text-left">
              <p className="text-lg leading-relaxed text-gray-100">
                Create an empty repository on GitHub, copy its URL, then tell Cursor "can you push this project to my GitHub?" and paste the link. Cursor runs the git commands for you. That part takes three minutes and every tutorial covers it. What they skip is what happens on day four, when Cursor announces it cannot connect to your repository and you find yourself explaining your own deployment from scratch. Fixing that permanently is most of this page.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#setup" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                The four steps
              </a>
              <a href="#breaks" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                When it breaks
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Why bother pushing at all</h2>
            <p className="text-lg text-[#333333] mb-5">
              I push every time I finish something that works, and every time I fix a bug. Those are the two moments you would most regret losing, and they are the exact points you would want to roll back to when the next change breaks something.
            </p>
            <p className="text-lg text-[#333333]">
              If you are building with AI, this matters more than it does in ordinary coding, not less. An agent can rewrite a dozen files in one turn. A repository is the thing that makes that safe to allow.
            </p>
          </div>
        </section>

        <section id="setup" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">The four steps</h2>
            <p className="text-lg text-[#333333] mb-10">From an empty GitHub account to your project backed up. You do not need to know any git commands.</p>
            <div className="space-y-5">
              {steps.map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 flex gap-5 items-start">
                  <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">{s.n}</span>
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{s.title}</h3>
                    <p className="text-[#333333]">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]"><strong>On models:</strong> when I recorded this I was running Gemini 2.5 in Cursor, but nothing here depends on that. You are asking it to run ordinary git commands. Any model in the picker will do it.</p>
            </div>
          </div>
        </section>

        <section id="breaks" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Where this breaks</h2>
            <div className="bg-[#F9F9F9] p-6 md:p-8 rounded-lg border-l-4 border-red-300 mb-8">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Cursor gets confused and says it cannot connect to your GitHub repository</h3>
              <p className="text-[#333333]">
                It happens often enough that you should plan for it rather than be surprised by it. The instinct is to go hunting through authentication settings. That is usually the wrong place to look.
              </p>
            </div>
            <p className="text-lg text-[#333333] mb-5">
              The real problem is that nothing in your project records how deployment works. Every new session, Cursor starts from nothing, reasons its way to an approach, and sometimes reasons its way to a wrong one. You are not fighting a broken connection. You are fighting an agent with no memory.
            </p>
            <p className="text-lg text-[#333333]">
              Which means the fix is not a setting. It is a file.
            </p>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">The fix: make Cursor document its own workflow</h2>
            <p className="text-lg text-[#333333] mb-8">
              Rather than write the deployment steps yourself, get Cursor to write them down the one time it works properly. This is the prompt I use:
            </p>

            <div className="bg-[#1A1A1A] p-6 rounded-lg mb-8">
              <p className="text-sm font-semibold text-[#FFDE59] uppercase tracking-wide mb-2">Prompt</p>
              <pre className="whitespace-pre-wrap text-sm text-gray-100 font-mono">{`Create me a rule for deploying from cursor to my GitHub repository: [paste your repository URL]`}</pre>
            </div>

            <p className="text-lg text-[#333333] mb-5">
              Name the repository explicitly in that prompt so it ends up referenced inside the file. Cursor writes a git workflow file, which you will find in the left-hand sidebar under GitHub.
            </p>
            <p className="text-lg text-[#333333] mb-8">
              From then on you never explain the deployment again. You point at the file:
            </p>

            <div className="bg-[#1A1A1A] p-6 rounded-lg mb-8">
              <p className="text-sm font-semibold text-[#FFDE59] uppercase tracking-wide mb-2">Every push after that</p>
              <pre className="whitespace-pre-wrap text-sm text-gray-100 font-mono">{`Push my project to GitHub as per @deploy-to-github`}</pre>
            </div>

            <p className="text-lg text-[#333333] mb-5">
              Type the @ symbol and search for the file. Cursor reads its contents, checks whether anything has changed since the last push, and runs the commands. I do this once or twice a day.
            </p>
            <div className="bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]"><strong>If it reports "working tree is clean":</strong> that is not an error. It means nothing has changed since your last push, so there is nothing to send. You will see it any time you run the workflow twice in a row.</p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Tidy it into a rules folder</h2>
            <p className="text-lg text-[#333333] mb-6">
              Once the workflow file exists, the natural next step is a rules folder where this and your other project conventions live together. Ask Cursor to create one.
            </p>
            <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200 mb-6">
              <p className="text-sm font-bold text-[#FFB800] uppercase tracking-wide mb-2">The snag you will hit</p>
              <p className="text-[#333333]">
                When I did this, Cursor created the folder but could not find the deployment file to copy across, and asked me where it was. The fix is quicker than describing it: right-click the file, select Copy Path, and paste that in. Copy Relative Path works just as well.
              </p>
            </div>
            <p className="text-lg text-[#333333] mb-5">
              Then push the folder itself up to GitHub. Cursor runs a status check first, comparing your local files against the remote, and lists what has been updated and deleted. Say proceed and it sends everything.
            </p>
            <p className="text-lg text-[#333333]">
              To confirm it landed, open your repository on GitHub and select Commits. Everything you pushed in the last few minutes will be listed there.
            </p>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Make it permanent with a Cursor Rule</h2>
            <p className="text-lg text-[#333333] mb-8">
              The last step removes the @ reference entirely. Instead of pointing at the file each time, you register it as a rule Cursor can pull in by itself.
            </p>
            <div className="space-y-4 mb-8">
              <div className="bg-white p-5 rounded-lg border border-gray-200">
                <p className="text-[#333333]"><strong>1.</strong> Open Cursor, then Settings, then Cursor Settings, and scroll down to Rules.</p>
              </div>
              <div className="bg-white p-5 rounded-lg border border-gray-200">
                <p className="text-[#333333]"><strong>2.</strong> Select Add new rule and name it. Mine is called Deployment to GitHub.</p>
              </div>
              <div className="bg-white p-5 rounded-lg border border-gray-200">
                <p className="text-[#333333]"><strong>3.</strong> Open the workflow file you created earlier, copy its contents, and paste them into the rule.</p>
              </div>
              <div className="bg-white p-5 rounded-lg border border-gray-200">
                <p className="text-[#333333]"><strong>4.</strong> Change the rule type to <strong>Agent Requested</strong> and set the description to "when deploying to GitHub".</p>
              </div>
            </div>
            <p className="text-lg text-[#333333]">
              That last setting is the one that matters. Agent Requested means Cursor decides to pull the rule in when the description matches what you are doing, so from now on every deployment on this project should reference it without you asking.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-8">Watch the whole thing</h2>
            <VideoEmbed
              videoId="1xufb9h1Tjw"
              heading="The full workflow, start to finish"
              context="Every step on this page, recorded end to end: creating the repository, the first push, the workflow file, the rules folder, and the Cursor Rule at the end."
            />
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">The same problem in Claude Code</h2>
            <p className="text-lg text-[#333333] mb-5">
              Notice what actually fixed this. Not a setting, not a plugin, not re-authenticating. A file the agent can read that says how this project works.
            </p>
            <p className="text-lg text-[#333333] mb-5">
              That pattern is not specific to Cursor. Every coding agent forgets everything between sessions, and every one of them gets better the moment you write your conventions down somewhere it can see. In Claude Code the file has a name, <code className="bg-gray-200 px-1.5 py-0.5 rounded text-base">CLAUDE.md</code>, and the same logic applies: the difference between an agent with project context and one without it is the difference between a collaborator and a confused intern.
            </p>
            <p className="text-lg text-[#333333]">
              If you keep a Cursor rules file, most of it transfers. The <Link href="/claude-md-playbook" className="text-[#1A1A1A] underline font-semibold hover:no-underline">CLAUDE.md Playbook</Link> covers what to put in one, and <Link href="/claude-code-vs-cursor" className="text-[#1A1A1A] underline font-semibold hover:no-underline">Claude Code vs Cursor</Link> covers how the two tools split the work if you end up running both.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 text-center">Frequently asked questions</h2>
            <p className="text-xl text-[#333333] text-center mb-12">The questions that come up when people wire Cursor to GitHub for the first time.</p>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="bg-[#F9F9F9] border border-gray-200 rounded-lg overflow-hidden">
                  <summary className="p-5 cursor-pointer hover:bg-gray-100 font-semibold text-gray-900 list-none flex justify-between items-center">
                    <span>{faq.question}</span>
                    <span className="text-gray-400 ml-4 text-xl flex-shrink-0">+</span>
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#1A1A1A]">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              The fix was a better prompt, written once
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Everything on this page comes down to one habit: when an agent keeps getting something wrong, stop repeating yourself and write it down where it can read it. That skill transfers to every AI tool you touch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/prompt-grader" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                Grade Your Prompt Free
              </a>
              <Link href="/vibe-coding" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                What is Vibe Coding?
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
