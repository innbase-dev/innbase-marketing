import SpotlightMenu from "./SpotlightMenu";
import {
    SOLUTIONS_MENU_ITEMS,
    SOLUTIONS_MENU_QUICK_LINKS,
} from "@/data/solutionsMenuData";

export default function SolutionsMegaMenu() {
    return (
        <SpotlightMenu
            label="Solutions"
            ariaLabel="Solutions menu"
            items={SOLUTIONS_MENU_ITEMS}
            quickLinks={SOLUTIONS_MENU_QUICK_LINKS}
            quickLinksLabel="Solutions"
        />
    );
}
