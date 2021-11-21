import Head from "next/head";
import NextLink from "next/link";
import ExternalLink from "./external-link";
import { signOut, useSession } from "next-auth/client"

function NavItem({ href, children }) {
  return (
    <NextLink href={href}>
      <a className="text-indigo-500 hover:text-indigo-700 text-lg font-medium">
        {children}
      </a>
    </NextLink>
  );
}

export default function Container(props) {
  const { children,fluid, ...customMeta } = props;
  const [session, loading] = useSession()
  const meta = {
    title: "React Weather",
    description:
      "Track weather and a five day forecast",
    type: "website",
    ...customMeta,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />
        <meta property="og:site_name" content="React Weather Next" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons.min.css"
          rel="preconnect stylesheet"
          as="style"
          type="text/css"
          async
        />
      </Head>
      <div className="bg-gradient-to-r from-blue-100 dark:from-black via-green-200 dark:via-transparent to-indigo-400 dark:to-gray-700 w-auto h-6"></div>
      <div className="flex flex-col justify-center w-5/6 max-w-xl mx-auto">
        <nav className="flex items-center justify-between w-full relative border-gray-200 mb-8">
          <div className="relative flex items-center justify-between w-full h-16">
            <div className="ml-[-0.60rem] space-x-2">
              <NavItem href="/">
                Dashboard
              </NavItem>
            </div>
            <div className="flex-1 flex items-center justify-end sm:items-stretch sm:justify-end">
              <div className="flex space-x-6 items-center">
                <NavItem href="/about">About</NavItem>
                <ExternalLink
                  href=""
                  styles="text-lg"
                >
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                    ></path>
                  </svg>
                </ExternalLink>
                {session && (<button onClick={() => signOut()}>Sign out</button>)}
              </div>
            </div>
          </div>
        </nav>
      </div>
      {fluid && (
        <main className="m-10">{children}</main>
      )}
      {!fluid && (
        <main className="m-auto w-5/6 max-w-xl">{children}</main>
      )}
    </>
  );
}
