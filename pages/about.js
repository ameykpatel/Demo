import Container from "../components/container";
import ExternalLink from "../components/external-link";

function About() {
  return (
    <Container>
      <section
        className="shadow-xl rounded-lg overflow-hidden  m-auto h-auto mt-4 mb-32"
        style={{ backgroundPositionY: "100%" }}
      >
        <div className="p-4 text-gray-500 dark:text-gray-400">
          <h3 className="text-gray-600 dark:text-white text-xl font-medium font-custom">
            About ReactWeather
          </h3>
          <p className="pt-4">
            ReactWeather is a beautiful weather app built on top of the{" "}
            <ExternalLink href="https://openweathermap.com/api">
              OpenWeatherMap API
            </ExternalLink> and <ExternalLink href="https://github.com/denniskigen/react-weather-next">
              React Weather Next
            </ExternalLink>
            .
          </p>
          <p className="pt-4">
            It allows you to pin your favorite locations to dashboard and make it easy to track weather of multiple places at same time
            </p>
          <p className="pt-4">
            It is a labor of ❤️ open-source project by me,{" "}
            <ExternalLink href="https://denniskigen.com">
              Dennis Kigen
            </ExternalLink>
            , a programmer, writer and maker of cool stuff.
          </p>
          <p className="pt-4">
            It is built using{" "}
            <ExternalLink href="https://nextjs.org/">Next.js</ExternalLink> and{" "}
            <ExternalLink href="https://tailwindcss.com">
              TailwindCSS
            </ExternalLink>
            . It uses{" "}
            <ExternalLink href="https://erikflowers.github.io/weather-icons/">
              Erik Flowers&apos; weather icons.
            </ExternalLink>{" "}
          </p>
        </div>
      </section>
    </Container>
  );
}

export default About;
