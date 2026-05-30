import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-24 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <p className="tracking-[0.2em] font-semibold mb-4">UPRYZE</p>
          <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed">{t("footer_tag")}</p>
        </div>
        <div>
          <p className="font-medium mb-3">{t("f_shop")}</p>
          <ul className="space-y-2 text-neutral-500 dark:text-neutral-400">
            <li><Link to="/products">{t("nav_products")}</Link></li>
            <li><Link to="/track">{t("nav_track")}</Link></li>
            <li><Link to="/faq">{t("nav_faq")}</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-medium mb-3">{t("f_policies")}</p>
          <ul className="space-y-2 text-neutral-500 dark:text-neutral-400">
            <li>{t("f_terms")}</li>
            <li>{t("f_privacy")}</li>
            <li>{t("f_ship")}</li>
            <li>{t("f_warranty")}</li>
          </ul>
        </div>
        <div>
          <p className="font-medium mb-3">{t("f_contact")}</p>
          <ul className="space-y-2 text-neutral-500 dark:text-neutral-400">
            <li>upryze.hcm@gmail.com</li>
            <li>+84 000 000 000</li>
            <li>{t("address_label")}: Ho Chi Minh City, VN</li>
            <li>
              <a href="https://facebook.com/upryze" target="_blank" rel="noreferrer" className="hover:text-neutral-900 dark:hover:text-neutral-50">
                {t("facebook")} ↗
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-200 dark:border-neutral-800 py-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
        © {new Date().getFullYear()} Upryze. All rights reserved.
      </div>
    </footer>
  );
}