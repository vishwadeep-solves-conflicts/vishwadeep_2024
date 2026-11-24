import Header from "./components/Header";
import Hero from "./components/Hero";
import { Experience, Footer, Highlights, Skills, Work } from "./components/Sections";
import { ThemeProvider } from "./theme";

function App() {
  return (
    <ThemeProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <div id="top" />
        <Hero />
        <Highlights />
        <Experience />
        <Work />
        <Skills />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
