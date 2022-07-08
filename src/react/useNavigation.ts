/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';
import { getGuidelineNavigations } from '../repositories/StyleguideNavigationRepository';
import { getGuidelineNavigationItems } from '../repositories/StyleguideNavigationItemRepository';
import { GuidelineNavigationArea, GuidelineNavigations, GuidelineNavigationsId } from '../types/Guideline';

export const useNavigation = (
    styleguideId: number,
): { navigation: GuidelineNavigations; getNavigationId: (usage: GuidelineNavigationArea) => Nullable<number> } => {
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

    const getNavigationId = (usage: GuidelineNavigationArea) => {
        return navigationId[usage];
    };

    useEffect(() => {
        const fetchNavigation = async () => {
            try {
                if (styleguideId) {
                    const styleguideNavigations = await getGuidelineNavigations(styleguideId);

                    const navigationItems = await Promise.all(
                        styleguideNavigations.map((styleguideNavigation) =>
                            getGuidelineNavigationItems(styleguideNavigation.id),
                        ),
                    );

                    setNavigationId(
                        styleguideNavigations.reduce((stack, styleguideNavigation) => {
                            stack[styleguideNavigation.usage.toLocaleLowerCase() as GuidelineNavigationArea] =
                                styleguideNavigation.id;
                            return stack;
                        }, {} as GuidelineNavigationsId),
                    );

                    setNavigation(
                        styleguideNavigations.reduce((stack, styleguideNavigation, index) => {
                            stack[styleguideNavigation.usage.toLocaleLowerCase() as GuidelineNavigationArea] =
                                navigationItems[index];
                            return stack;
                        }, {} as GuidelineNavigations),
                    );
                }
            } catch (error) {
                console.error("Couldn't fetch the styleguide navigation : ", error);
            }
        };
        fetchNavigation();

        window.emitter.on('GuidelineNavigationUpdated', fetchNavigation);

        return () => {
            window.emitter.off('GuidelineNavigationUpdated', fetchNavigation);
        };
    }, [styleguideId]);

    return {
        navigation,
        getNavigationId,
    };
};
