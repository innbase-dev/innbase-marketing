import SpotlightMenu from "./SpotlightMenu";
import {
    PRODUCT_MENU_ITEMS,
    PRODUCT_MENU_QUICK_LINKS,
} from "@/data/productMenuData";

export default function ProductMegaMenu() {
    return (
        <SpotlightMenu
            label="Product"
            ariaLabel="Product menu"
            items={PRODUCT_MENU_ITEMS}
            quickLinks={PRODUCT_MENU_QUICK_LINKS}
        />
    );
}
