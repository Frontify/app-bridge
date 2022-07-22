/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNativeDummy } from './AppBridgeNativeDummy';
import { Asset } from '../types/Asset';
import { IAppBridgeNative } from '../types/IAppBridgeNative';
import React, { ComponentType } from 'react';
import { stub } from 'sinon';
import mitt from 'mitt';

type GetStubbedAppBridgeProps = {
    blockSettings?: Record<string, unknown>;
    blockAssets?: Record<string, Asset[]>;
    editorState?: boolean;
    openAssetChooser?: () => void;
    closeAssetChooser?: () => void;
};

const getStubbedAppBridge = ({
    blockSettings = {},
    blockAssets = {},
    editorState = false,
    openAssetChooser = () => null,
    closeAssetChooser = () => null,
}: GetStubbedAppBridgeProps): IAppBridgeNative => {
    window.emitter = mitt();

    const appBridge = new AppBridgeNativeDummy();

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
