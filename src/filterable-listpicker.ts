
import { ObservableArray } from 'tns-core-modules/data/observable-array';

import { View, Property } from "tns-core-modules/ui/core/view";
import { AnimationCurve } from "tns-core-modules/ui/enums";
import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { TextField } from 'tns-core-modules/ui/text-field';
import * as frame from 'tns-core-modules/ui/frame';
import { isIOS } from "tns-core-modules/platform";
import * as enums from "tns-core-modules/ui/enums";
let builder = require('tns-core-modules/ui/builder');

let unfilteredSource: Array<string> = [];
let filtering: boolean = false;

export const listWidthProperty = new Property<FilterableListpicker, string>({ name: "listWidth", defaultValue: '300' });
export const listHeightProperty = new Property<FilterableListpicker, string>({ name: "listHeight", defaultValue: '300' });
export const dimmerColorProperty = new Property<FilterableListpicker, string>({ name: "dimmerColor", defaultValue: 'rgba(0,0,0,0.8)' });
export const blurProperty = new Property<FilterableListpicker, string>({ name: "blur", defaultValue: 'none' });
export const focusOnShowProperty = new Property<FilterableListpicker, boolean>({ name: "focusOnShow", defaultValue: false });
export const hideFilterProperty = new Property<FilterableListpicker, boolean>({ name: "hideFilter", defaultValue: false });
export const hintTextProperty = new Property<FilterableListpicker, string>({ name: "hintText", defaultValue: 'Enter text to filter...' });
export const sourceProperty = new Property<FilterableListpicker, ObservableArray<string>>({ name: "source", defaultValue: undefined, affectsLayout: true, valueChanged: (target, oldValue, newValue) => {
    if (!filtering) {
        while (unfilteredSource.length) unfilteredSource.pop();
        newValue.forEach(element => {
            unfilteredSource.push(element)
        })
    }    
} });

export class FilterableListpicker extends GridLayout {
    constructor() {
        super();
        let innerComponent = builder.load(__dirname + '/filterable-listpicker.xml') as View;
        innerComponent.bindingContext = this;
        this.addChild(innerComponent);
        let textfield: TextField = <TextField>innerComponent.getViewById('filterTextField')
        textfield.on('textChange', (data: any) => {
            filtering = true;
            this.source = unfilteredSource.filter(item => {
                return item.toLowerCase().indexOf(data.value.toLowerCase()) !== -1;
            })
            filtering = false;
        })
    }
    public static canceledEvent = "canceled";
    public static itemTappedEvent = "itemTapped";
    public source: any;
    public dimmerColor: any;
    public hintText: any;
    public hideFilter: any;
    public blur: any;    
    private blurView: any = false;
    public focusOnShow: any;

    visibility:any = enums.Visibility.collapse;

    public choose(args) {
        let item = this.source[args.index];
        this.hide();
        this.notify({
            eventName: 'itemTapped',
            object: this,
            selectedItem: item
        });
    }

    public cancel() {
        this.notify({
            eventName: 'canceled',
            object: this
        });
        this.hide();
    }
    
    public hide() {
        let textField: TextField = <TextField>frame.topmost().getViewById('filterTextField');
        if (textField.dismissSoftInput) textField.dismissSoftInput();
        textField.text = '';
        let container: GridLayout = frame.topmost().getViewById('dc_flp_container') as GridLayout;
        let picker: StackLayout = frame.topmost().getViewById('dc_flp') as StackLayout;
        if (this.blurView) {
            UIView.animateWithDurationAnimationsCompletion(.3, () => {
                this.blurView.effect = null;
            }, () => {
                this.blurView.removeFromSuperview();
            })
        } else {
            container.animate({
                opacity: 0,
                duration: 200
            })
        }

        return picker.animate({
            scale: {x: .7, y: .7},
            opacity: 0,
            duration: 400,
            curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
        }).then(() => {
            this.visibility = enums.Visibility.collapse;
            container.visibility = 'collapse';
        })
    }

    public show() {
        
        let container: GridLayout = frame.topmost().getViewById('dc_flp_container') as GridLayout;
        let picker: StackLayout = frame.topmost().getViewById('dc_flp') as StackLayout;
        this.visibility = enums.Visibility.visible;
        container.visibility = 'visible';

        if (isIOS && this.blur && this.blur != 'none') {
            let iosView: UIView = container.ios;
            let effectView = UIVisualEffectView.alloc().init();
            effectView.frame = CGRectMake(0, 0, iosView.bounds.size.width, iosView.bounds.size.height);
            effectView.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
            this.blurView = effectView;
            iosView.addSubview(effectView)
            iosView.sendSubviewToBack(effectView);
            UIView.animateWithDurationAnimationsCompletion(.3, () => {
                let theme = UIBlurEffectStyle.Dark;
                if (this.blur == 'light') theme = UIBlurEffectStyle.Light;
                effectView.effect = UIBlurEffect.effectWithStyle(theme);
            }, () => {
                // the animation is complete.
            })
        } else {
            container.opacity = 0;
            container.backgroundColor = this.dimmerColor;
            container.animate({
                opacity: 1,
                duration: 200
            })
        }

        picker.scaleX = .7;
        picker.scaleY = .7;
        picker.opacity = 0;
        picker.animate({
            scale: {x: 1, y: 1},
            opacity: 1,
            duration: 400,
            curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
        })

        let textField: TextField = <TextField>frame.topmost().getViewById('filterTextField');
        if (JSON.parse(this.focusOnShow)) textField.focus();
        
    }
}

listWidthProperty.register(FilterableListpicker);
listHeightProperty.register(FilterableListpicker);
dimmerColorProperty.register(FilterableListpicker);
focusOnShowProperty.register(FilterableListpicker);
hideFilterProperty.register(FilterableListpicker);
blurProperty.register(FilterableListpicker);
hintTextProperty.register(FilterableListpicker);
sourceProperty.register(FilterableListpicker);