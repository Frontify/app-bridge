/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';
import { getStyleguideNavigations } from '../repositories/StyleguideNavigationRepository';
import { getStyleguideNavigationItems } from '../repositories/StyleguideNavigationItemRepository';
import { StyleguideNavigationArea, StyleguideNavigations, StyleguideNavigationsId } from '../types/Guideline';

export const useNavigation = (
    styleguideId: number,
): { navigation: StyleguideNavigations; getNavigationId: (usage: StyleguideNavigationArea) => Nullable<number> } => {
    const [navigation, setNavigation] = useState<StyleguideNavigations>({
        main: [],
        footer: [],
        hidden: [],
        trash: [],
    });

    const [navigationId, setNavigationId] = useState<StyleguideNavigationsId>({
        main: null,
        footer: null,
        hidden: null,
        trash: null,
    });

    const getNavigationId = (usage: StyleguideNavigationArea) => {
        return navigationId[usage];
    };

    useEffect(() => {
        const fetchNavigation = async () => {
            try {
                if (styleguideId) {
                    const styleguideNavigations = await getStyleguideNavigations(styleguideId);

                    const navigationItems = await Promise.all(
                        styleguideNavigations.map((styleguideNavigation) =>
                            getStyleguideNavigationItems(styleguideNavigation.id),
                        ),
                    );

                    setNavigationId(
                        styleguideNavigations.reduce((stack, styleguideNavigation) => {
                            stack[styleguideNavigation.usage.toLocaleLowerCase() as StyleguideNavigationArea] =
                                styleguideNavigation.id;
                            return stack;
                        }, {} as StyleguideNavigationsId),
                    );

                    setNavigation(
                        styleguideNavigations.reduce((stack, styleguideNavigation, index) => {
                            stack[styleguideNavigation.usage.toLocaleLowerCase() as StyleguideNavigationArea] =
                                navigationItems[index];
                            return stack;
                        }, {} as StyleguideNavigations),
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
