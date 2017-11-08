import { Observable } from 'tns-core-modules/data/observable';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import * as app from 'tns-core-modules/application';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import { View, Property } from "tns-core-modules/ui/core/view";
import { AnimationCurve } from "tns-core-modules/ui/enums";
import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import * as frame from 'tns-core-modules/ui/frame';
import { isIOS } from "tns-core-modules/platform";
let builder = require('tns-core-modules/ui/builder');

export const listWidthProperty = new Property<FilterableListpicker, string>({ name: "listWidth", defaultValue: '300' });
export const listHeightProperty = new Property<FilterableListpicker, string>({ name: "listHeight", defaultValue: '300' });
export const dimmerColorProperty = new Property<FilterableListpicker, string>({ name: "dimmerColor", defaultValue: 'rgba(0,0,0,0.8)' });
export const blurProperty = new Property<FilterableListpicker, string>({ name: "blur", defaultValue: 'none' });
export const hintTextProperty = new Property<FilterableListpicker, string>({ name: "hintText", defaultValue: 'Enter text to filter...' });
export const sourceProperty = new Property<FilterableListpicker, ObservableArray<string>>({ name: "source", defaultValue: new ObservableArray(["Test"]), affectsLayout: true });

export class FilterableListpicker extends GridLayout {
    constructor() {
        super();
        let innerComponent = builder.load(__dirname + '/filterable-listpicker.xml') as View;
        innerComponent.bindingContext = this;
        this.addChild(innerComponent);

        setTimeout(() => {
            this.source.forEach(element => {
                this.unfilteredSource.push(element);
            });
            if (isIOS) {
                let parent: any = frame.topmost().getViewById('dc_flp_container').parent;
                parent.visibility = "collapse";
            }
        }, 10)
        
        let textfield = innerComponent.getViewById('filterTextField')
        textfield.on('textChange', (data: any) => {
            this.source = this.unfilteredSource.filter(item => {
                return item.toLowerCase().indexOf(data.value.toLowerCase()) !== -1;
            })
        })
    }
    public static canceledEvent = "canceled";
    public static itemTappedEvent = "itemTapped";
    public source: any;
    public dimmerColor: any;
    public hintText: any;
    public blur: any;    
    private blurView: any = false;
    private unfilteredSource: Array<string> = [];

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
            if (isIOS) {
                let parent: any = frame.topmost().getViewById('dc_flp_container').parent;
                parent.visibility = "collapse";
            }
            container.visibility = 'collapse';
        })
    }

    public show() {
        let container: GridLayout = frame.topmost().getViewById('dc_flp_container') as GridLayout;
        let picker: StackLayout = frame.topmost().getViewById('dc_flp') as StackLayout;
        if (isIOS) {
            let parent: any = frame.topmost().getViewById('dc_flp_container').parent;
            parent.visibility = "visible";
        }
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
    }
}

listWidthProperty.register(FilterableListpicker);
listHeightProperty.register(FilterableListpicker);
dimmerColorProperty.register(FilterableListpicker);
blurProperty.register(FilterableListpicker);
hintTextProperty.register(FilterableListpicker);
sourceProperty.register(FilterableListpicker);