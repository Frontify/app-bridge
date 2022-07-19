/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNativeDummy } from './AppBridgeNativeDummy';
import { Asset } from '../types/Asset';
import { IAppBridgeNative } from '../types/IAppBridgeNative';
import { ComponentType } from 'react';
import { stub } from 'sinon';

type GetStubbedAppBridgeProps = {
    blockSettings?: Record<string, unknown>;
    blockAssets?: Record<string, Asset[]>;
    editorState?: boolean;
    openAssetChooser?: () => void;
    closeAssetChooser?: () => void;
};

const stubWindowObject = (windowObject: Window | Cypress.AUTWindow) => {
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

const getStubbedAppBridge = ({
    blockSettings = {},
    blockAssets = {},
    editorState = false,
    openAssetChooser = () => null,
    closeAssetChooser = () => null,
}: GetStubbedAppBridgeProps): IAppBridgeNative => {
    const appBridge = new AppBridgeNativeDummy();

    if (cy) {
        cy.window().then((window) => stubWindowObject(window));
    } else {
        stubWindowObject(window);
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
    props?: GetStubbedAppBridgeProps,
): [ComponentType<Omit<T, keyof withAppBridgeStubsProps>>, IAppBridgeNative] {
    const appBridge = getStubbedAppBridge(props ?? {});
    const ComponentWithAppBridgeStubs = (props: Omit<T, keyof withAppBridgeStubsProps>) => {
        return <WrappedComponent appBridge={appBridge} {...(props as T)} />;
    };

    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    ComponentWithAppBridgeStubs.displayName = `withAppBridgeStubs(${displayName})`;

    return [ComponentWithAppBridgeStubs, appBridge];
}
