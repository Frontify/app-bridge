/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';
import { getGuidelineNavigations } from '../repositories/GuidelineNavigationRepository';
import { getGuidelineNavigationItems } from '../repositories/GuidelineNavigationItemRepository';
import { GuidelineNavigationUsage, GuidelineNavigations, GuidelineNavigationsId } from '../types/Guideline';

export const useNavigation = (
    guidelineId: number,
): { navigation: GuidelineNavigations; getNavigationId: (usage: GuidelineNavigationUsage) => Nullable<number> } => {
    const [navigation, setNavigation] = useState<GuidelineNavigations>({
        main: [],
        footer: [],
        hidden: [],
        trash: [],
    });

    const [navigationId, setNavigationId] = useState<GuidelineNavigationsId>({
        main: null,
        footer: null,
        hidden: null,
        trash: null,
    });

    const getNavigationId = (usage: GuidelineNavigationUsage) => {
        return navigationId[usage];
    };

    useEffect(() => {
        const fetchNavigation = async () => {
            try {
                if (guidelineId) {
                    const guidelineNavigations = await getGuidelineNavigations(guidelineId);

                    const navigationItems = await Promise.all(
                        guidelineNavigations.map((guidelineNavigation) =>
                            getGuidelineNavigationItems(guidelineNavigation.id),
                        ),
                    );

                    setNavigationId(
                        guidelineNavigations.reduce((stack, guidelineNavigation) => {
                            stack[guidelineNavigation.usage] = guidelineNavigation.id;
                            return stack;
                        }, {} as GuidelineNavigationsId),
                    );

                    setNavigation(
                        guidelineNavigations.reduce((stack, guidelineNavigation, index) => {
                            stack[guidelineNavigation.usage] = navigationItems[index];
                            return stack;
                        }, {} as GuidelineNavigations),
                    );
                }
            } catch (error) {
                console.error("Couldn't fetch the guideline navigation : ", error);
            }
        };
        fetchNavigation();

        window.emitter.on('GuidelineNavigationUpdated', fetchNavigation);

        return () => {
            window.emitter.off('GuidelineNavigationUpdated', fetchNavigation);
        };
    }, [guidelineId]);

    return {
        navigation,
        getNavigationId,
    };
};
