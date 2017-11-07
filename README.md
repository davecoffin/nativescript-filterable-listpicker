[![Twitter URL](https://img.shields.io/badge/twitter-davecoffin-blue.svg)](https://twitter.com/davecoffin)

# nativescript-filterable-listpicker

The native listpickers on iOS and Android are not great for huge lists that users may want to filter. This plugin is a modal that offers filtering capabilities.

<img src="https://github.com/davecoffin/nativescript-blur/blob/master/blur.gif?raw=true" height="320" > 


## Installation

```javascript
tns plugin add nativescript-filterable-listpicker
```

## Usage 
In order to use the plugin, you must place it on your page within a namespace. Wherever you place it, thats where it will display when invoked, but it will be hidden until you invoke it. The best way to use this is to place it on top of your page content like this: 
	
	```xml
    <GridLayout>
        <Image src="res://nicebackgroundimage.jpg" />
        <StackLayout>
            <Label text="Whats your favorite programming language?" />
            <Button text="Choose a Language" tap="{{showPicker}}" />
        </StackLayout>
        <ui:FilterableListpicker id="myfilter" blur="dark" hintText="Type to filter..." source="{{listitems}}" cancelTapped="{{cancelFilterableList}}" itemTapped="{{itemTapped}}" />
    </GridLayout>
    ```)

Then in your code...
    ```javascript
    public showPicker() {
        page.getViewById('myfilter').show();
    }

    public itemTapped(args) {
        alert(MyModel.listitems[args.index] + ' was tapped!')
    }

    public cancelFilterableList() {
        // this gets called if the user cancels the modal. 
    }
    ```)


## API

Describe your plugin methods and properties here. See [nativescript-feedback](https://github.com/EddyVerbruggen/nativescript-feedback) for example.
    
| Property | Default | Description |
| --- | --- | --- |
| some property | property default value | property description, default values, etc.. |
| another property | property default value | property description, default values, etc.. |
    
## License

Apache License Version 2.0, January 2004
