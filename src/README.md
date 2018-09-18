[![Twitter URL](https://img.shields.io/badge/twitter-davecoffin-blue.svg)](https://twitter.com/davecoffin)

# nativescript-filterable-listpicker

The native listpickers on iOS and Android are not great for huge lists that users may want to filter. This plugin is a modal that offers filtering capabilities.

<img src="https://cl.ly/pj0N/Screen%20Recording%202018-02-22%20at%2010.17%20AM.gif" height="600" > 


## Installation

```
tns plugin add nativescript-filterable-listpicker
```

## Usage 
In order to use the plugin, you must place it on your page within a namespace. Wherever you place it, thats where it will display when invoked, but it will be hidden until you invoke it. The best way to use this is to place it on top of your page content like this: 

### NativeScript Core
	
```
<Page xmlns="http://schemas.nativescript.org/tns.xsd" xmlns:ui="nativescript-filterable-listpicker">
    <GridLayout>
        <Image src="res://nicebackgroundimage.jpg" />
        <StackLayout>
            <Label text="Whats your favorite programming language?" />
            <Button text="Choose a Language" tap="{{showPicker}}" />
        </StackLayout>
        <ui:FilterableListpicker id="myfilter" blur="dark" hintText="Type to filter..." source="{{listitems}}" cancel="{{cancelFilterableList}}" itemTapped="{{itemTapped}}" />
    </GridLayout>
</Page>
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

Note: When calling show, as of 2.1.0 you can pass in a viewContainer that the plugin will use to find the necessary elements. This allows you to
use the list picker in modals now! For example, you could pass in a Page element, or a GridLayout that contains the FilterableListpicker element like this:

in android:
```
@ViewChild('myContainer') myContainer: ElementRef;

public function showPicker() {
  this.myfilter.nativeElement.show(this.myContainer.nativeElement);
}
```

Note: You can change the items in the filterable list easily by just setting the source to an array in your observable, and changing then changing the array. Take a look at the demo project for an example.

### Source Array
As of version 2.0, you can supply either an array of strings, or an array of objects. The object must contain a parameter called `title`, and thats what will display as the title. Check out the gif above to see what the picker looks like when supplying an object. The 3 parameters the picker will display
if in your object are:

| Property | Description|
| --- | --- |
| title | The title, this is what your list will be filtered on, and it will display in bold. |
| image | OPTIONAL: This will display to the left of the title. |
| description | OPTIONAL: This will display under the title smaller and in gray. |

Here's some example code:
```
public listitems = [
    {
        "image": "https://lh3.googleusercontent.com/gN6iBKP1b2GTXZZoCxhyXiYIAh8QJ_8xzlhEK6csyDadA4GdkEdIEy9Bc8s5jozt1g=w300",
        "title": "Brown Bear",
        "description": "Brown bear brown bear, what do you see?"
    },
    {
        "image": "http://icons.veryicon.com/png/Flag/Rounded%20World%20Flags/Indonesia%20Flag.png",
        "title": "Red Bird"
    },
    {
        "title": "Purple Cat",
        "description": "Why are we teaching kids there are purple cats?"
    }
];

```

You could, for example, massage the results of an API call and use the result array of objects to display in the picker. Other parameters can be present in the objects in the array (like IDs for example), the picker will use `title`, `image` and `description` if they are present. Although `title` must be present. 

Here's how it will look in the picker:

<img src="https://cl.ly/phhb/Screen%20Shot%202018-02-22%20at%209.46.13%20AM.png" width="400">


### Webpack
Thanks to <a href="https://github.com/mjrichards91">Mike Richards</a>, this plugin is now compatible with webpack. Just follow the webpack instructions carefully, in particular the `bundle-config.js` and `require("bundle-entry-points");` parts. See more <a href="https://github.com/davecoffin/nativescript-filterable-listpicker/issues/13">here</a>.


## API

The UI element accepts the following parameters:
    
| Property | Default | Description |
| --- | --- | --- |
| source | REQUIRED | The array of strings or objects (see Source Array above) you want to display in the picker. |
| hintText | Enter text to filter... | This is the text that shows up as the hint for the textfield used to filter the list. |
| listWidth | 300 | The width of the modal element. |
| listHeight | 300 | The height of the modal element. |
| focusOnShow | false | true or false, indicating if the textfield should be in focus (and the keyboard open) when the listpicker is shown. |
| dimmerColor | rgba(0,0,0,0.8) | The color of the dimmer behind the modal. You can set it to `transparent`, or any color supported by NativeScript (ex: `rgba(255,255,255,0.5)`, `red`, `#0088CC`) |
| blur | none | iOS only. Pass `dark` or `light` for a dark or light blur effect. If this is passed, dimmerColor is ignored on iOS but respected on Android. |
| itemTapped(args) |  | This is the function called when an item in the list is tapped. The modal is automically dismissed, and you can access to item tapped with `args.selectedItem`. |
| canceled |  | This is just a function to call if the user cancels, probably rarely neccessary. |
| showCancel |  | Show cancel button or not. |
| enableSearch |  | Allow searching by showing the TextField at the top. |

## CSS Styling

```css
.flp-container .flp-list-container {
  border-radius: 10;
}
.flp-container .flp-list-container .flp-listview {
  background-color: white;
}

.flp-container .flp-list-container .flp-listview .flp-row {
  background-color: white;
}
/* .flp-container .flp-list-container .flp-listview .flp-row .flp-row-container {
  padding: 10;
} */
.flp-container .flp-list-container .flp-listview .flp-row .flp-image {
  margin: 10 0 10 5;
}
.flp-container .flp-list-container .flp-listview .flp-row .flp-title-container {
  margin: 10 10 10 5;
  /* margin: 0 10 0 10; */
}
.flp-container .flp-list-container .flp-listview .flp-row .flp-title-container .flp-title {
  font-weight: bold; 
  font-size: 16;
}
.flp-container .flp-list-container .flp-listview .flp-row .flp-title-container .flp-description {
  color: gray; 
  font-size: 13;
}
.flp-container .flp-list-container .flp-listview .flp-row .flp-title-container .flp-no-title {
  margin-left: 15; 
  padding: 10 0;
}
.flp-container .flp-list-container .flp-listview .flp-row .flp-item-selected {
  color: lightblue;
}

.flp-container .flp-hint-field {
  padding: 10 15; 
  height: 40; 
  background-color: #E0E0E0; 
  border-radius: 10 10 0 0;
}

.flp-container .flp-cancel-container {
  background-color: #E0E0E0; 
  height: 40; 
  border-radius: 0 0 10 10;
}

.flp-container .flp-cancel-container .flp-btn-cancel {
  font-weight: bold; 
  height: 40; 
  background-color: transparent; 
  border-color: transparent; 
  border-width: 1; 
  font-size: 12;
}
```

    
## License

Apache License Version 2.0, January 2004
