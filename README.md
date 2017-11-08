[![Twitter URL](https://img.shields.io/badge/twitter-davecoffin-blue.svg)](https://twitter.com/davecoffin)

# nativescript-filterable-listpicker

The native listpickers on iOS and Android are not great for huge lists that users may want to filter. This plugin is a modal that offers filtering capabilities.

<img src="https://github.com/davecoffin/nativescript-filterable-listpicker/blob/master/assets/filterablelist.gif?raw=true" height="600" > 


## Installation

```
tns plugin add nativescript-filterable-listpicker
```

## Usage 
In order to use the plugin, you must place it on your page within a namespace. Wherever you place it, thats where it will display when invoked, but it will be hidden until you invoke it. The best way to use this is to place it on top of your page content like this: 

### NativeScript Core
	
```
<GridLayout>
    <Image src="res://nicebackgroundimage.jpg" />
    <StackLayout>
        <Label text="Whats your favorite programming language?" />
        <Button text="Choose a Language" tap="{{showPicker}}" />
    </StackLayout>
    <ui:FilterableListpicker id="myfilter" blur="dark" hintText="Type to filter..." source="{{listitems}}" cancel="{{cancelFilterableList}}" itemTapped="{{itemTapped}}" />
</GridLayout>
```

Then in your code...
```
public showPicker() {
    page.getViewById('myfilter').show();
}

public itemTapped(args) {
    alert(args.selectedItem + ' was tapped!')
}

public cancelFilterableList() {
    // this gets called if the user cancels the modal. 
}
```


### NativeScript Angular
In angular, you have to register the element in your app component like so:

```
// app.component.ts
import {registerElement} from "nativescript-angular/element-registry";
registerElement("FilterableListpicker", () => require("nativescript-filterable-listpicker").FilterableListpicker);
```

Then use it in your templates like...

```
<GridLayout>
    <Image src="res://nicebackgroundimage.jpg"></Image>
    <StackLayout>
        <Label text="Whats your favorite programming language?"></Label>
        <Button text="Choose a Language" (tap)="showPicker()"></Button>
    </StackLayout>
    <FilterableListpicker #myfilter blur="dark" hintText="Type to filter..." [source]="listitems" (canceled)="cancelFilterableList($event)" (itemTapped)="itemTapped($event)"></FilterableListpicker>
</GridLayout>
```

Then in your code...
```
@ViewChild('myfilter') myfilter: ElementRef;

cancelFilterableList() {
    console.log('canceled');
}

itemTapped(args) {
    alert(args.selectedItem)
}

showPicker() {
    this.myfilter.nativeElement.show();
}
```

## API

The UI element accepts the following parameters:
    
| Property | Default | Description |
| --- | --- | --- |
| source | REQUIRED | The array of strings you want to display in the picker. |
| hintText | Enter text to filter... | This is the text that shows up as the hint for the textfield used to filter the list. |
| listWidth | 300 | The width of the modal element. |
| listHeight | 300 | The height of the modal element. |
| dimmerColor | rgba(0,0,0,0.8) | The color of the dimmer behind the modal. You can set it to `transparent`, or any color supported by NativeScript (ex: `rgba(255,255,255,0.5)`, `red`, `#0088CC`) |
| blur | none | iOS only. Pass `dark` or `light` for a dark or light blur effect. If this is passed, dimmerColor is ignored on iOS but respected on Android. |
| itemTapped(args) |  | This is the function called when an item in the list is tapped. The modal is automically dismissed, and you can access to item tapped with `args.selectedItem`. |
| canceled |  | This is just a function to call if the user cancels, probably rarely neccessary. |

    
## License

Apache License Version 2.0, January 2004
