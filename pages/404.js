import NextLink from "next/link";
import Container from "../components/container";
import NotFoundIllustration from "../components/not-found-illustration";

export default function Custom404() {
  return (
    <Container>
      <div className="mx-auto w-5/6 md:w-full 2xl:max-w-7xl xl:max-w-6xl bg-clip-text text-5xl font-extrabold text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        <div className="mt-24 m-auto w-1/2">
          <p className="text-left">Oops!</p>
          <p className="mt-2">What were you looking for?</p>
          <p className="mt-8 text-left text-2xl text-gray-500 underline">
            <NextLink href="/">
              <a>Head back home, Sailor!</a>
            </NextLink>
          </p>
        </div>
        <NotFoundIllustration className="h-auto m-auto" />
      </div>
    </Container>
  );
}
