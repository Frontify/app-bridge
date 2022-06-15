/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';
import { getStyleguideNavigations } from '../repositories/StyleguideNavigationRepository';
import { getStyleguideNavigationItems } from '../repositories/StyleguideNavigationItemRepository';
import { StyleguideNavigationItem } from '../types';

export type StyleguideNavigationArea = 'main' | 'footer' | 'trash' | 'hidden';
export type StyleguideNavigation = Record<StyleguideNavigationArea, StyleguideNavigationItem[]>;

export const useNavigation = (styleguideId: number): { navigation: StyleguideNavigation } => {
    const [navigation, setNavigation] = useState<StyleguideNavigation>({
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

                    const navigationItems = await Promise.all(
                        styleguideNavigations.map((styleguideNavigation) =>
                            getStyleguideNavigationItems(styleguideNavigation.id),
                        ),
                    );

                    setNavigation(
                        styleguideNavigations.reduce((stack, styleguideNavigation, index) => {
                            stack[styleguideNavigation.usage.toLocaleLowerCase() as StyleguideNavigationArea] =
                                navigationItems[index];
                            return stack;
                        }, {} as StyleguideNavigation),
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
