import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { Property } from "tns-core-modules/ui/core/view";
import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout';
export declare const listWidthProperty: Property<FilterableListpicker, string>;
export declare const listHeightProperty: Property<FilterableListpicker, string>;
export declare const dimmerColorProperty: Property<FilterableListpicker, string>;
export declare const blurProperty: Property<FilterableListpicker, string>;
export declare const focusOnShowProperty: Property<FilterableListpicker, boolean>;
export declare const hideFilterProperty: Property<FilterableListpicker, boolean>;
export declare const hintTextProperty: Property<FilterableListpicker, string>;
export declare const sourceProperty: Property<FilterableListpicker, ObservableArray<any>>;
export declare class FilterableListpicker extends GridLayout {
    constructor();
    static canceledEvent: string;
    static itemTappedEvent: string;
    source: any;
    dimmerColor: any;
    hintText: any;
    hideFilter: any;
    blur: any;
    enableSearch: boolean;
    private blurView;
    focusOnShow: any;
    visibility: any;
    choose(args: any): void;
    cancel(): void;
    hide(page?): Promise<void>;
    show(page?): void;
}
