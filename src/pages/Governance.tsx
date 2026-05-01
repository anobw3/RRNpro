import PagePlaceholder from "../components/ui/PagePlaceholder";
import { useTranslation } from "../context/LanguageContext";

export default function Governance() {
  const { t } = useTranslation();
  return (
    <PagePlaceholder 
      title={t("footer.governance") || "Governance"} 
      description={t("footer.description")} 
    />
  );
}
