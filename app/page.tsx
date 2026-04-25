import { Header } from "./shared/ui/Header";
import { Section1 } from "./features/section1/Section1";
import { Section2 } from "./features/section2/Section2";
import { Section3 } from "./features/section3/Section3";
import { Section4 } from "./features/section4/Section4";
import { Section5 } from "./features/section5/Section5";

export default function Home() {
  return (
    <main>
      <Header />
      
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </main>
  );
}
