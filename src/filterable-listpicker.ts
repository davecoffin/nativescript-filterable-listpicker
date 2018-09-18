
import { ObservableArray } from 'tns-core-modules/data/observable-array';

import { View, Property, booleanConverter } from "tns-core-modules/ui/core/view";
import { AnimationCurve } from "tns-core-modules/ui/enums";
import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { TextField } from 'tns-core-modules/ui/text-field';
import * as frame from 'tns-core-modules/ui/frame';
import { isIOS } from "tns-core-modules/platform";
import * as enums from "tns-core-modules/ui/enums";
let builder = require('tns-core-modules/ui/builder');

let unfilteredSource: Array<any> = [];
let filtering: boolean = false;
export const listWidthProperty = new Property<FilterableListpicker, string>({ name: "listWidth", defaultValue: '300' });
export const listHeightProperty = new Property<FilterableListpicker, string>({ name: "listHeight", defaultValue: '300' });
export const headingTitleProperty = new Property<FilterableListpicker, string>({ name: "headingTitle", defaultValue: undefined });
export const enableSearchProperty = new Property<FilterableListpicker, boolean>({ 
  name: "enableSearch", 
  defaultValue: true,
  valueConverter: booleanConverter
});
export const showCancelProperty = new Property<FilterableListpicker, boolean>({ 
  name: "showCancel", 
  defaultValue: true,
  valueConverter: booleanConverter
});
export const dimmerColorProperty = new Property<FilterableListpicker, string>({ name: "dimmerColor", defaultValue: 'rgba(0,0,0,0.8)' });
export const blurProperty = new Property<FilterableListpicker, string>({ name: "blur", defaultValue: 'none' });
export const focusOnShowProperty = new Property<FilterableListpicker, boolean>({ name: "focusOnShow", defaultValue: false });
export const hideFilterProperty = new Property<FilterableListpicker, boolean>({ name: "hideFilter", defaultValue: false });
export const hintTextProperty = new Property<FilterableListpicker, string>({ name: "hintText", defaultValue: 'Enter text to filter...' });
export const sourceProperty = new Property<FilterableListpicker, ObservableArray<any>>({ name: "source", defaultValue: undefined, affectsLayout: true, valueChanged: (target, oldValue, newValue) => {
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
        
    }

    onLoaded() {
      super.onLoaded();
      //let innerComponent = builder.load(__dirname + '/filterable-listpicker.xml') as View;
      let innerComponent = builder.parse(`
          <GridLayout id="dc_flp_container" class="flp-container" visibility="collapsed">
              <StackLayout tap="{{cancel}}" width="100%" height="100%"></StackLayout>
              <GridLayout width="{{listWidth}}" verticalAlignment="middle" rows="auto, auto, auto, auto" id="dc_flp" class="flp-list-container">
                  <Label row="0" text="{{headingTitle ? headingTitle : ''}}" class="flp-heading-title" visibility="{{headingTitle ? 'visible' : 'collapsed'}}"></Label>
                  <TextField hint="{{hintText}}" row="1" text="{{filterText}}" id="filterTextField" class="flp-hint-field" visibility="{{enableSearch ? 'visible' : 'collapsed'}}"></TextField>
                  <ListView items="{{ source }}" row="2" height="{{listHeight}}" itemTap="{{choose}}" class="flp-listview">
                      <ListView.itemTemplate>
                          <StackLayout class="flp-row">
                              <GridLayout columns="auto, *, auto" visibility="{{title ? 'visible' : 'collapsed'}}" class="flp-row-container">
                                  <Image src="{{image ? image : 'https://davecoffin.com/images/expert_badge.png'}}" width="30" visibility="{{image ? 'visible' : 'collapsed'}}" stretch="aspectFit" rowSpan="2" class="flp-image"></Image>
                                  <StackLayout class="flp-title-container" col="1" verticalAlignment="middle">
                                      <Label text="{{title ? title : ''}}" textWrap="true" class="flp-title"></Label>
                                      <Label text="{{description ? description : ''}}" textWrap="true" visibility="{{description ? 'visible' : 'collapsed'}}" class="flp-description"></Label>
                                  </StackLayout>
                                  <Label col="2" text="{{selected ? selected : ''}}" class="flp-item-selected" visibility="{{selected ? 'visible' : 'collapsed'}}"></Label>
                              </GridLayout>
                              <Label text="{{$value}}" textWrap="true" class="flp-no-title" visibility="{{title ? 'collapsed' : 'visible'}}"></Label>
                          </StackLayout>
                      </ListView.itemTemplate>
                  </ListView>
                  <StackLayout row="3" class="flp-cancel-container" visibility="{{showCancel ? 'visible' : 'collapsed'}}">
                      <Button text="Cancel" tap="{{cancel}}" verticalAlignment="middle" class="flp-btn-cancel"></Button>    
                  </StackLayout>
              </GridLayout>
          </GridLayout>`
      );
      innerComponent.bindingContext = this;
      this.addChild(innerComponent);

      if (this.enableSearch) {
        let textfield: TextField = <TextField>this.getViewById('filterTextField')
        textfield.on('textChange', (data: any) => {
            filtering = true;
            this.source = unfilteredSource.filter(item => {
                if (item.title) {
                    return item.title.toLowerCase().indexOf(data.value.toLowerCase()) !== -1;
                } else {
                    return item.toLowerCase().indexOf(data.value.toLowerCase()) !== -1;
                }
                
            })
            filtering = false;
        });
      }
    }
    public static canceledEvent = "canceled";
    public static itemTappedEvent = "itemTapped";
    public source: any;
    public dimmerColor: any;
    public hintText: any;
    public hideFilter: any;
    public enableSearch: boolean;
    public blur: any;    
    private blurView: any = false;
    public focusOnShow: any;
    public viewContainer: any;

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
      if (this.enableSearch) {
        let textField: TextField = <TextField>this.viewContainer.getViewById('filterTextField');
        if (textField.dismissSoftInput) textField.dismissSoftInput();
        textField.text = '';
      }
        let container: GridLayout = this.viewContainer.getViewById('dc_flp_container') as GridLayout;
        let picker: StackLayout = this.viewContainer.getViewById('dc_flp') as StackLayout;
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
            }).then(_ => {}, err => {})
        }

        return picker.animate({
            scale: {x: .7, y: .7},
            opacity: 0,
            duration: 400,
            curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
        }).then(() => {
            this.visibility = enums.Visibility.collapse;
            container.visibility = 'collapse';
        }, err => {})
    }

    public show(viewContainer?) {
        this.viewContainer = frame.topmost();
        if (viewContainer) {
            this.viewContainer = viewContainer;
        }
        let container: GridLayout = this.viewContainer.getViewById('dc_flp_container') as GridLayout;
        let picker: StackLayout = this.viewContainer.getViewById('dc_flp') as StackLayout;
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
            }).then(_ => {}, err => {})
        }

        picker.scaleX = .7;
        picker.scaleY = .7;
        picker.opacity = 0;
        picker.animate({
            scale: {x: 1, y: 1},
            opacity: 1,
            duration: 400,
            curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
        }).then(_ => {}, err => {})

        if (this.enableSearch) {
          let textField: TextField = <TextField>this.viewContainer.getViewById('filterTextField');
          if (JSON.parse(this.focusOnShow)) textField.focus();
        }
        
    }
}

listWidthProperty.register(FilterableListpicker);
listHeightProperty.register(FilterableListpicker);
headingTitleProperty.register(FilterableListpicker);
enableSearchProperty.register(FilterableListpicker);
showCancelProperty.register(FilterableListpicker);
dimmerColorProperty.register(FilterableListpicker);
focusOnShowProperty.register(FilterableListpicker);
hideFilterProperty.register(FilterableListpicker);
blurProperty.register(FilterableListpicker);
hintTextProperty.register(FilterableListpicker);
sourceProperty.register(FilterableListpicker);