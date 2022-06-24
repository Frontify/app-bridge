/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';
import { getStyleguideNavigations } from '../repositories/StyleguideNavigationRepository';
import { getStyleguideNavigationItems } from '../repositories/StyleguideNavigationItemRepository';
import { StyleguideNavigationArea, StyleguideNavigations } from '../types/Styleguide';

export const useNavigation = (styleguideId: number): { navigation: StyleguideNavigations } => {
    const [navigation, setNavigation] = useState<StyleguideNavigations>({
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
                        }, {} as StyleguideNavigations),
                    );
                }
            } catch (error) {
                console.error("Couldn't fetch the styleguide navigation : ", error);
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
