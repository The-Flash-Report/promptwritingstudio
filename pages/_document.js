import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script defer data-domain="promptwritingstudio.com" src="https://plausible.io/js/script.outbound-links.js"></script>
        
        {/* ConvertBox */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(e,t){(e=t.createElement("script")).src="https://cdn.convertbox.com/convertbox/js/embed.js",e.id="app-convertbox-script",e.async=true,e.dataset.uuid="9b03f284-1c74-4054-ba19-6604e0ecdd7a",document.getElementsByTagName("head")[0].appendChild(e)}(window,document);`,
          }}
        />
        
        {/* Google Analytics 4 */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />
      </Head>
      <body className="bg-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
