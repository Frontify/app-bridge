/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNativeDummy } from './AppBridgeNativeDummy';
import { Asset } from '../types/Asset';
import { IAppBridgeNative } from '../types/IAppBridgeNative';
import { ComponentType } from 'react';
import { stub } from 'sinon';

type useStubedAppBridgeProps = {
    blockSettings?: Record<string, unknown>;
    blockAssets?: Record<string, Asset[]>;
    editorState?: boolean;
    openAssetChooser?: () => void;
    closeAssetChooser?: () => void;
};

const stubWindowObject = (
    windowObject: Window | Cypress.AUTWindow,
    options: { blockId: number; blockSettings: Record<string, unknown> },
) => {
    windowObject.blockSettings = { [options.blockId]: options.blockSettings };
    windowObject.emitter = {
        emit: () => null,
        off: () => null,
        on: () => null,
        // We don't mock the `all` for now
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
    stub(windowObject.emitter, 'emit');
    stub(windowObject.emitter, 'off');
    stub(windowObject.emitter, 'on');
};

const getStubedAppBridge = ({
    blockSettings = {},
    blockAssets = {},
    editorState = false,
    openAssetChooser = () => null,
    closeAssetChooser = () => null,
}: useStubedAppBridgeProps): IAppBridgeNative => {
    const appBridge = new AppBridgeNativeDummy();
    const blockId = appBridge.getBlockId() ?? 0;

    if (cy) {
        cy.window().then((window: Cypress.AUTWindow) => stubWindowObject(window, { blockId, blockSettings }));
    } else {
        stubWindowObject(window, { blockId, blockSettings });
    }

    stub(appBridge, 'closeAssetChooser').callsFake(closeAssetChooser);
    stub(appBridge, 'getBlockAssets').callsFake(() => new Promise((resolve) => resolve(blockAssets)));
    stub(appBridge, 'getBlockSettings').returns(new Promise((resolve) => resolve(blockSettings)));
    stub(appBridge, 'getEditorState').returns(editorState);
    stub(appBridge, 'openAssetChooser').callsFake(openAssetChooser);

    return appBridge;
};

type withAppBridgeStubsProps = { appBridge: IAppBridgeNative };

export function withAppBridgeStubs<T>(
    WrappedComponent: ComponentType<T>,
    props?: useStubedAppBridgeProps,
): [ComponentType<Omit<T, keyof withAppBridgeStubsProps>>, IAppBridgeNative] {
    const appBridge = getStubedAppBridge(props ?? {});
    const ComponentWithAppBridgeStubs = (props: Omit<T, keyof withAppBridgeStubsProps>) => {
        return <WrappedComponent appBridge={appBridge} {...(props as T)} />;
    };

    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    ComponentWithAppBridgeStubs.displayName = `withAppBridgeStubs(${displayName})`;

    return [ComponentWithAppBridgeStubs, appBridge];
}
