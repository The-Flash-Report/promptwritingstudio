import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* PWS Lettermark Favicon - Yellow Brand */}
        <link rel="icon" type="image/png" sizes="32x32" href="/images/pws-yellow-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/pws-yellow-16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/pws-yellow-180.png" />
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script defer data-domain="promptwritingstudio.com" src="https://plausible.io/js/script.outbound-links.js"></script>
        
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
