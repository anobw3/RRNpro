import { Suspense, lazy } from "react";
import Container from "../layout/Container";
import Footer from "../components/Footer";
import SectionLoader from "../components/ui/SectionLoader";

const Collection = lazy(() => import("../components/Collection"));

export default function Archive() {
  return (
    <div className="pt-24 min-h-screen">
      <Suspense fallback={<SectionLoader />}>
        <Container>
          <div className="py-12">
            <Collection />
          </div>
        </Container>
        <Footer />
      </Suspense>
    </div>
  );
}
