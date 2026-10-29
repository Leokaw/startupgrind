import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
} from '@/components/ui/sidebar';

export function NavFooter() {
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:p-0">
            <SidebarGroupContent>
                <SidebarMenu></SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
