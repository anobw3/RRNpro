import { lazy, Suspense } from "react";
import Hero from "../components/Hero.tsx";
import Container from "../layout/Container.tsx";
import Lore from "../components/Lore.tsx";
import Collection from "../components/Collection.tsx";
import UserPortfolio from "../components/UserPortfolio.tsx";
import Rarity from "../components/Rarity.tsx";
import Roadmap from "../components/Roadmap.tsx";
import Marketplace from "../components/Marketplace.tsx";
import WhySection from "../components/Why.tsx";
import Footer from "../components/Footer.tsx";
import SectionLoader from "../components/ui/SectionLoader.tsx";
import { useWallet } from "../context/WalletContext";

export default function Home() {
  const { isConnected } = useWallet();

  return (
    <>
      <Hero />
      
      <Suspense fallback={<SectionLoader />}>
        <Container>
          <Lore />
        </Container>

        <section id="collection" className="py-20 md:py-32">
          <Container>
            <Collection />
          </Container>
        </section>

        <Container>
          {isConnected && <UserPortfolio />}
          <Rarity />
          <Roadmap />
          <Marketplace />
          <WhySection />
        </Container>
        
        <Footer />
      </Suspense>
    </>
  );
}
