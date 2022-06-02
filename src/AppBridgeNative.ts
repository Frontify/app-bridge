/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IAppBridgeNative } from './types/IAppBridgeNative';
import {
    Asset,
    AssetChooserAssetChosenCallback,
    AssetChooserOptions,
    AssetChooserProjectType,
    Color,
    ColorPalette,
    Template,
    TemplateChooserTemplateChosenCallback,
    TerrificEvent,
    User,
} from './types';
import { getJqueryDataByElement, getJqueryDatasetByClassName } from './utilities/jquery';
import { HttpClient } from './utilities/httpClient';

export class AppBridgeNative implements IAppBridgeNative {
    constructor(public blockId?: number, public sectionId?: number) {
        this.registerAppBridgeSubscriberInTerrificContext();
    }

    public getBlockId(): number | undefined {
        return this.blockId;
    }

    private registerAppBridgeSubscriberInTerrificContext() {
        if (!window.application.connectors.events.components.appBridge) {
            window.application.connectors.events.registerComponent({ id: 'appBridge' });
        }
    }

    public async getAssetById(assetId: number): Promise<Asset> {
        const response = await window.fetch(`/api/asset/${assetId}?include_urls=true&block_id=${this.blockId}`, {
            method: 'GET',
            headers: {
                'x-csrf-token': (document.getElementsByName('x-csrf-token')[0] as HTMLMetaElement).content,
                'Content-Type': 'application/json',
            },
        });

        const responseJson: { success: boolean; data: Asset } = await response.json();

        if (!responseJson.success) {
            throw new Error(`Could not get the asset with id ${assetId}.`);
        }

        return {
            id: responseJson.data.id,
            creator_name: responseJson.data.creator_name,
            ext: responseJson.data.ext,
            external_url: responseJson.data.external_url,
            generic_url: responseJson.data.generic_url,
            preview_url: responseJson.data.preview_url,
            height: responseJson.data.height,
            name: responseJson.data.name,
            filename: responseJson.data.filename,
            file_id: responseJson.data.file_id,
            object_type: responseJson.data.object_type,
            project_id: responseJson.data.project_id,
            project_type: responseJson.data.project_type,
            project_name: responseJson.data.project_name,
            width: responseJson.data.width,
            size: responseJson.data.size,
            title: responseJson.data.title,
            status: responseJson.data.status,
        };
    }

    public async getBlockAssets(): Promise<Record<string, Asset[]>> {
        const { result } = await HttpClient.get<Record<string, Asset[]>>(`/api/document-block/${this.blockId}/asset`);

        if (!result.success) {
            throw new Error("Couldn't fetch block assets");
        }

        return this.mapDocumentBlockAssetsToBlockAssets(result.data);
    }

    public async deleteAssetIdsFromBlockAssetKey(key: string, assetIds: number[]): Promise<void> {
        if (this.blockId === undefined) {
            throw new Error('You need to instanciate the App Bridge with a block id.');
        }

        const { result } = await HttpClient.delete<Record<string, Asset[]>>(
            `/api/document-block/${this.blockId}/asset/${key}`,
            { asset_ids: assetIds },
        );

        if (!result.success) {
            throw new Error("Couldn't delete assets");
        }
    }

    public async addAssetIdsToBlockAssetKey(key: string, assetIds: number[]): Promise<Asset[]> {
        if (this.blockId === undefined) {
            throw new Error('You need to instanciate the App Bridge with a block id.');
        }

        const { result } = await HttpClient.post<Record<string, Asset[]>>(
            `/api/document-block/${this.blockId}/asset/${key}`,
            { asset_ids: assetIds },
        );

        if (!result.success) {
            throw new Error("Couldn't add assets");
        }
        await this.waitForFinishedProcessing(key);

        return this.mapDocumentBlockAssetsToBlockAssets(result.data)[key];
    }

    private async waitForFinishedProcessing(key: string): Promise<void> {
        return new Promise((resolve) => {
            const intervalId = window.setInterval(async () => {
                const currentBlockAssets = await this.getBlockAssets();

                if (currentBlockAssets[key] && currentBlockAssets[key].every((asset) => asset.status === 'FINISHED')) {
                    clearInterval(intervalId);
                    resolve();
                }
            }, 1200);
        });
    }

    public async getTemplateById(templateId: number): Promise<Template> {
        const brandId = window.application.sandbox.config.context.brand.id;
        const response = await window.fetch(`/api/publishing/template/${brandId}?template_id=${templateId}`, {
            method: 'GET',
            headers: {
                'x-csrf-token': (document.getElementsByName('x-csrf-token')[0] as HTMLMetaElement).content,
                'Content-Type': 'application/json',
            },
        });

        const responseJson: { success: boolean; templates: Template[] } = await response.json();

        if (!responseJson.success) {
            throw new Error(`Could not get the template with id ${templateId}.`);
        }

        return responseJson.templates[0];
    }

    public async getColorsByIds(colorIds: number[]): Promise<Color[]> {
        const response = await window.fetch(`/api/color/library/${window.application.config.context.project.id}`, {
            method: 'GET',
            headers: {
                'x-csrf-token': (document.getElementsByName('x-csrf-token')[0] as HTMLMetaElement).content,
                'Content-Type': 'application/json',
            },
        });

        const responseJson: { palettes: ColorPalette[] } = await response.json();

        return responseJson.palettes
            .reduce((previous, current): Color[] => previous.concat(current.colors), <Color[]>[])
            .filter((color) => colorIds.includes(Number(color.id)));
    }

    public async getAvailableColors(): Promise<Color[]> {
        const palettes = await this.getAvailablePalettes();
        return palettes.reduce((previous, current): Color[] => previous.concat(current.colors), <Color[]>[]);
    }

    public async getAvailablePalettes(): Promise<ColorPalette[]> {
        const response = await window.fetch(`/api/color/library/${window.application.config.context.project.id}`, {
            method: 'GET',
            headers: {
                'x-csrf-token': (document.getElementsByName('x-csrf-token')[0] as HTMLMetaElement).content,
                'Content-Type': 'application/json',
            },
        });

        const responseJson = await response.json();

        if (!responseJson.success) {
            throw new Error('Could not get the available palettes');
        }

        return responseJson.palettes;
    }

    public async getBlockSettings<T = Record<string, unknown>>(): Promise<T> {
        if (!this.blockId) {
            throw new Error('You need to instanciate the App Bridge with a block id.');
        }

        const translationLanguage = getJqueryDataByElement(document.body).translationLanguage;
        const translationLanguageSuffix = translationLanguage ? `&lang=${translationLanguage}` : '';
        const response = await window.fetch(
            `/api/document/block/${this.blockId}?settings_only=true${translationLanguageSuffix}`,
            {
                headers: {
                    'x-csrf-token': (document.getElementsByName('x-csrf-token')[0] as HTMLMetaElement).content,
                    'Content-Type': 'application/json',
                },
            },
        );

        const responseJson = await response.json();

        if (!responseJson.success) {
            throw new Error('Could not get the block settings');
        }

        return responseJson.settings as T;
    }

    public async updateBlockSettings<T = Record<string, unknown>>(newSettings: T): Promise<void> {
        if (!this.blockId) {
            throw new Error('You need to instanciate the App Bridge with a block id.');
        }

        const pageId = getJqueryDatasetByClassName('page').id;
        if (!pageId) {
            throw new Error('Page ID not found');
        }

        const { translationLanguage } = getJqueryDataByElement(document.body);

        const { result } = await HttpClient.post(`/api/document/block/${pageId}/${this.sectionId}/${this.blockId}`, {
            settings: newSettings,
            ...(translationLanguage ? { language: translationLanguage } : {}),
        });

        if (!result.success) {
            throw new Error('Could not update the block settings');
        }
    }

    public getEditorState(): boolean {
        return document.body.classList.contains('editor-enabled');
    }

    public isReferencedBlock(): boolean {
        if (!this.blockId) {
            throw new Error('You need to instanciate the App Bridge with a block id.');
        }

        const blockElement = document.querySelector(`[data-block="${this.blockId}"]`) as HTMLElement;
        return blockElement.dataset.referenceToken !== undefined ? true : false;
    }

    public getProjectId(): number {
        return window.application.config.context.project.id;
    }

    public openAssetChooser(callback: AssetChooserAssetChosenCallback, options?: AssetChooserOptions): void {
        window.application.connectors.events.components.appBridge.component.onAssetChooserAssetChosen = callback;

        const projectTypesMap: Record<AssetChooserProjectType, string> = {
            [AssetChooserProjectType.MediaLibrary]: 'MEDIALIBRARY',
            [AssetChooserProjectType.LogoLibrary]: 'LOGOLIBRARY',
            [AssetChooserProjectType.IconLibrary]: 'ICONLIBRARY',
            [AssetChooserProjectType.DocumentLibrary]: 'DOCUMENTLIBRARY',
            [AssetChooserProjectType.TemplateLibrary]: 'TEMPLATELIBRARY',
            [AssetChooserProjectType.PatternLibrary]: 'PATTERNLIBRARY',
            [AssetChooserProjectType.Styleguide]: 'STYLEGUIDE',
            [AssetChooserProjectType.Workspace]: 'WORKSPACE',
        };

        const assetChooserOptions = options
            ? {
                  brandId: window.application.sandbox.config.context.brand.id,
                  projectTypes: options.projectTypes?.map((value) => projectTypesMap[value]),
                  multiSelectionAllowed: options.multiSelection,
                  filters: [
                      ...(options.selectedValueId !== undefined
                          ? [{ key: 'id', values: [options.selectedValueId], inverted: true }]
                          : []),
                      ...(options.extensions ? [{ key: 'ext', values: options.extensions }] : []),
                      ...(options.objectTypes ? [{ key: 'object_type', values: options.objectTypes }] : []),
                      ...(options.urlContains ? [{ key: 'external_url', containsText: options.urlContains }] : []),
                  ],
              }
            : {};
        const $assetChooser = window.application.sandbox.config.tpl.render('c-assetchooser', assetChooserOptions);

        window.application.connectors.events.notify(null, TerrificEvent.OpenModal, {
            modifier: 'flex',
            $content: $assetChooser,
        });
    }

    public closeAssetChooser(): void {
        window.application.connectors.events.notify(null, TerrificEvent.CloseModal, {});
    }

    public openTemplateChooser(callback: TemplateChooserTemplateChosenCallback) {
        window.application.connectors.events.components.appBridge.component.onTemplateChooserTemplateChosen = callback;

        const $templateChooser = window.application.sandbox.config.tpl.render('c-templatechooser', {});
        window.application.connectors.events.notify(null, TerrificEvent.OpenModal, {
            modifier: 'flex',
            $content: $templateChooser,
        });
    }

    public closeTemplateChooser() {
        window.application.connectors.events.notify(null, TerrificEvent.CloseModal, {});
    }

    public async getCurrentLoggedUser(): Promise<User> {
        const response = await window.fetch('/api/user/info', {
            headers: {
                'x-csrf-token': (document.getElementsByName('x-csrf-token')[0] as HTMLMetaElement).content,
                'Content-Type': 'application/json',
            },
        });

        const responseJson = await response.json();

        if (!responseJson.success) {
            throw new Error('Could not get the current logged user');
        }

        delete responseJson.success;

        return responseJson;
    }

    private mapDocumentBlockAssetsToBlockAssets(documentBlockAssets: any): Record<string, Asset[]> {
        return documentBlockAssets.reduce((stack: Record<string, Asset[]>, documentBlockAsset: any) => {
            if (!stack[documentBlockAsset.setting_id]) {
                stack[documentBlockAsset.setting_id] = [];
            }

            stack[documentBlockAsset.setting_id].push({
                creator_name: '', // TODO: implement enriching of the data (https://app.clickup.com/t/29ad2bj)
                ext: documentBlockAsset.asset.ext,
                file_id: documentBlockAsset.asset.file_id,
                filename: documentBlockAsset.asset.file_name,
                generic_url: documentBlockAsset.asset.generic_url,
                origin_url: documentBlockAsset.asset.file_origin_url,
                external_url: documentBlockAsset.asset.external_url,
                height: documentBlockAsset.asset.height,
                id: documentBlockAsset.asset.id,
                name: documentBlockAsset.asset.name,
                object_type: documentBlockAsset.asset.object_type,
                preview_url: documentBlockAsset.asset.preview_url,
                project_id: documentBlockAsset.asset.project_id,
                project_name: '', // TODO: implement enriching of the data (https://app.clickup.com/t/29ad2bj)
                size: documentBlockAsset.asset.file_size,
                status: documentBlockAsset.asset.status,
                title: documentBlockAsset.asset.title,
                width: documentBlockAsset.asset.width,
            });

            return stack;
        }, {});
    }
}
