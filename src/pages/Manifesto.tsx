import { Suspense, lazy } from "react";
import Container from "../layout/Container";
import Footer from "../components/Footer";
import SectionLoader from "../components/ui/SectionLoader";

const Lore = lazy(() => import("../components/Lore"));

export default function Manifesto() {
  return (
    <div className="pt-24 min-h-screen font-display">
      <Suspense fallback={<SectionLoader />}>
        <Container>
          <div className="py-12">
            <Lore />
          </div>
        </Container>
        <Footer />
      </Suspense>
    </div>
  );
}
