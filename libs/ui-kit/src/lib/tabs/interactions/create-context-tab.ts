import { lapi } from '@relax';

import { UseTab } from '../data';

export const createContextTab = <T extends UseTab>(useTab: T): T => {
    lapi(
        (useTab: T) => {
            const { templateRef } = useTab;
            useTab.context = {
                $implicit: templateRef,
            };
            // useTab.tabs = [];
            return useTab;
        },
        (useTab: T) => {
            const { activeTab, input, tabs } = useTab;
            if (tabs?.length && activeTab) {
                // set the first tab as active if not set by explicitly
                if (!activeTab && useTab.context) {
                    useTab.activeTab = tabs[0];
                }
                input.tabOrderId = activeTab.orderId;
            }
            return useTab;
        }
    )(useTab);

    return useTab;
};
