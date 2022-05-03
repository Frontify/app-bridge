import { AppBridgeNativeDummy, Asset, IAppBridgeNative } from '@frontify/app-bridge';
import { ComponentType } from 'react';

type useStubedAppBridgeProps = {
    blockSettings?: Record<string, unknown>;
    blockAssets?: Record<string, Asset[]>;
    editorState?: boolean;
    openAssetChooser?: () => void;
    closeAssetChooser?: () => void;
};

const getStubedAppBridge = ({
    blockSettings = {},
    blockAssets = {},
    editorState = false,
    openAssetChooser = () => null,
    closeAssetChooser = () => null,
}: useStubedAppBridgeProps): IAppBridgeNative => {
    const appBridge = new AppBridgeNativeDummy();
    const blockId = appBridge.getBlockId();

    cy.window().then((window: Cypress.AUTWindow) => {
        window.blockSettings = { [blockId ?? 0]: blockSettings };
        window.emitter = {
            emit: () => null,
            off: () => null,
            on: () => null,
            // We don't mock the `all` for now
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any;
        cy.stub(window.emitter, 'emit');
        cy.stub(window.emitter, 'off');
        cy.stub(window.emitter, 'on');
    });

    cy.stub(appBridge, 'closeAssetChooser').callsFake(closeAssetChooser);
    cy.stub(appBridge, 'getBlockAssets').callsFake(() => new Promise((resolve) => resolve(blockAssets)));
    cy.stub(appBridge, 'getBlockSettings').returns(new Promise((resolve) => resolve(blockSettings)));
    cy.stub(appBridge, 'getEditorState').returns(editorState);
    cy.stub(appBridge, 'openAssetChooser').callsFake(openAssetChooser);

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
