import { Suspense, lazy } from "react";
import Container from "../layout/Container";
import Footer from "../components/Footer";
import SectionLoader from "../components/ui/SectionLoader";

const Rarity = lazy(() => import("../components/Rarity"));
const Roadmap = lazy(() => import("../components/Roadmap"));

export default function Protocol() {
  return (
    <div className="pt-24 min-h-screen">
      <Suspense fallback={<SectionLoader />}>
        <Container>
           <Rarity />
           <Roadmap />
        </Container>
        <Footer />
      </Suspense>
    </div>
  );
}
