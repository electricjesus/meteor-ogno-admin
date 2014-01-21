Ogno-Admin
=================

This package creates an Admin UI with a menu structure and configuration through the ``OgnoAdmin`` API.
It validates itself with the [simple-schema](https://github.com/aldeed/meteor-simple-schema) package and generates
the create / edit forms with [autoform](https://github.com/aldeed/meteor-autoform). Routes are created with
[iron-router](https://github.com/EventedMind/iron-router) and the html, css is enhanced with
[semantic-ui](https://github.com/nooitaf/meteor-semantic-ui).

## Quick Intro
```javascript
// Client and Server

OgnoAdmin.config({
    auto : true,
    isAllowed : function () {
        var user = Meteor.user();

        if (user) {
            return 'admin' === user.username;
        }
    }
});
```

The ``auto`` property will search your global window scope and create a basic menu structures with all your
Meteor.Collection and Meteor.Collection2's in it. Only a user with the username "admin" will be allowed to see the
Admin UI, configured with the ``isAllowed`` property.

The API is always useable on the client and server.

## How to install

```bash
mrt add ogno-admin
```

## Enhance UI with Structure

You can enhance the menu structure for your Admin UI with your own views, by using the API.

```javascript
Meteor.startup(function () {
    OgnoAdmin.structure({
        'weight'     : 5,
        'type'       : 'no-link',
        'icon'       : 'archive',
        'menu-title' : 'Collections',
        'tree'   : [
            {
                // Type is a collection view, which creates a view with
                // all CRUD operations handled
                'type' : 'collection',
                'use'  : (instanceof Meteor.Collection2 || Meteor.Collection),
                'menu-title' : 'Some Collection'
            },
            {
                // Type is a custom view, which will render a custom template
                // it is accessed through Template[templateString]
                'type' : 'custom',
                'use'  : 'templateString',
                'menu-title' : 'Some custom view'
            },
            {...}
        ]
    });
});
```

It's also possible to use an array as the first parameter. It doesn't replace the existing menu structure but extends it,
so you can have multiple structure() calls in your code.

The ``tree`` is only useable on the root menu elements. Use weight to define the order of the menu elements.

## Possible properties for views
```javascript
Meteor.startup(function () {
    OgnoAdmin.structure({
        'tree'          : Array,   // Define sub elements, only possible on root
        'weight'        : Number,  // Sort order for all menu elements / views
        'type'          : String,  // View type, currently "collection" or "custom"
        'slug'          : String,  // Custom url slug, gets auto-defined if none
        'icon'          : String,  // UI Menu Icons: http://semantic-ui.com/elements/icon.html
        'menu-title'    : String,  // The Menu title, gets auto-defined if none
        'site-title'    : String,  // Custom site title, gets auto-defined if none
        'use'           : 'Mixed', // Additional information for "type", variates
    });
});
```

## Using images

You can add an API key to the property ``filepicker`` in your configuration and use the meteor package "filepicker",
to handle images in your collections.

To actually define an "image" field, use a custom schema definition as following:

```javascript
'image' : {
    'type' : String,
    'regEx' : SchemaRegEx.FilePickerImageUrl // the RegEx defined here defines the image field
}
```

All your images are handled through the collection view and the uploading by the filepicker service.

## Possible configurations

You can configurate quite some options, but you don't have to (Client and Server):
```javascript
OgnoAdmin.config({
    auto                : Boolean,  // default: false,
    filepicker          : String,   // default: ''
    homeScreenTemplate  : String,   // default: 'ognoAdminOverview'
    isAllowed           : Function, // default: return Meteor.user()
    prefix              : String    // default: '/ogno-admin'
});
```
