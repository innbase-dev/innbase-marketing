import SpotlightMenu from "./SpotlightMenu";
import {
    COMPANY_MENU_ITEMS,
    COMPANY_MENU_QUICK_LINKS,
} from "@/data/companyMenuData";

export default function CompanyDropdown() {
    return (
        <SpotlightMenu
            label="Company"
            ariaLabel="Company menu"
            items={COMPANY_MENU_ITEMS}
            quickLinks={COMPANY_MENU_QUICK_LINKS}
        />
    );
}
