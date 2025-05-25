import { getServerTranslation } from "@/lib/i18n/i18n.server";
import { INavContent, INavItem } from "@/interface/nav-interface";

export const ReadyNavMenu = async (
  data: INavContent,
  locale: string = "en"
): Promise<INavItem[]> => {
  const { t } = await getServerTranslation(locale);

  const ai = data?.navHotTech?.ai || [];
  const em = data?.navHotTech?.emerging || [];
  const upcoming = data?.navGadget?.upcoming || [];
  const latest = data?.navGadget?.latest || [];

  const navMenu: INavItem[] = [
    {
      type: "link",
      label: t("navbar.mobiles"),
      href: "/mobiles",
    },
    {
      type: "dropdown",
      label: t("navbar.gadgets.label"),
      sections: [
        {
          title: t("navbar.gadgets.sub.latest"),
          items: latest,
        },
        {
          title: t("navbar.gadgets.sub.upcoming"),
          items: upcoming,
        },
      ],
    },
    {
      type: "dropdown",
      label: t("navbar.hotTech.label"),
      sections: [
        {
          title: t("navbar.hotTech.sub.ai"),
          items: ai,
        },
        {
          title: t("navbar.hotTech.sub.emerging"),
          items: em,
        },
      ],
    },
    {
      type: "link",
      label: t("navbar.contact"),
      href: "/contact",
    },
  ];

  return navMenu;
};
