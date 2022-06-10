/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';
import { getStyleguideNavigations } from '../repositories/StyleguideNavigationRepository';
import { getStyleguideNavigationItems } from '../repositories/StyleguideNavigationItemRepository';
import { StyleguideNavigationItem } from '../types';

type GuidelineNavigationArea = 'main' | 'footer' | 'trash' | 'hidden';
export type GuidelineNavigation = Record<GuidelineNavigationArea, StyleguideNavigationItem[]>;

export const useNavigation = (styleguideId: number): { navigation: GuidelineNavigation } => {
    const [navigation, setNavigation] = useState<GuidelineNavigation>({
        main: [],
        footer: [],
        hidden: [],
        trash: [],
    });

    useEffect(() => {
        const fetchNavigation = async () => {
            try {
                if (styleguideId) {
                    const styleguideNavigations = await getStyleguideNavigations(styleguideId);

                    await Promise.all(
                        styleguideNavigations.map(async (styleguideNavigation) => {
                            const navigationItems = await getStyleguideNavigationItems(styleguideNavigation.id);
                            setNavigation((prevState) => ({
                                ...prevState,
                                [styleguideNavigation.usage.toLocaleLowerCase()]: navigationItems,
                            }));
                        }),
                    );
                }
            } catch (error) {
                console.log("Couldn't fetch the styleguide navigation : ", error);
            }
        };
        fetchNavigation();

        window.emitter.on('StyleguideNavigationUpdated', fetchNavigation);

        return () => {
            window.emitter.off('StyleguideNavigationUpdated', fetchNavigation);
        };
    }, [styleguideId]);

    return {
        navigation,
    };
};
