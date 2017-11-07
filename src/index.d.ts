import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { Property } from "tns-core-modules/ui/core/view";
import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout';
export declare const listWidthProperty: Property<FilterableListpicker, string>;
export declare const listHeightProperty: Property<FilterableListpicker, string>;
export declare const modalProperty: Property<FilterableListpicker, boolean>;
export declare const sourceProperty: Property<FilterableListpicker, ObservableArray<string>>;
export declare const itemTappedProperty: Property<FilterableListpicker, string>;
export declare const cancelTappedProperty: Property<FilterableListpicker, string>;
export declare class FilterableListpicker extends GridLayout {
    constructor();
    private innerComponent;
    source: ObservableArray<string>;
    cancelTapped: any;
    modal: boolean;
    unfilteredSource: Array<string>;
    hide(): void;
    show(): void;
}
