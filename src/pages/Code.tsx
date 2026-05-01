import PagePlaceholder from "../components/ui/PagePlaceholder";
import { useTranslation } from "../context/LanguageContext";

export default function Code() {
  const { t } = useTranslation();
  return (
    <PagePlaceholder 
      title={t("footer.beast_code")} 
      description={t("footer.description")} 
    />
  );
}
