OgnoAdmin.typeFactory = {
    'types' : {}
};

/**
 * Returns a type defined in OgnoAdmin.typeFactory.types, if none found: use json.
 *
 * @param {String} name
 * @returns {Object}
 */
OgnoAdmin.typeFactory.get = function (name) {
    var t = this.types[name];

    if (!_.isObject(t)) {
        return this.types['json'];
    }

    return t;
};

/**
 * Contains all the types for presenting html input.
 *
 * @type {Object}
 */
OgnoAdmin.typeFactory.types = {
    'string' : {
        'printValue' : function (val) {
            var regex = SchemaRegEx.FilePickerImageUrl.exec(val);

            if (regex && val === regex.shift()) {
                return '<img class="ui small image" src="' + val + '"/>';
            }

            return val;
        }
    },
    'number' : {
        'printValue' : function (val) {
            return val;
        }
    },
    'boolean' : {
        'printValue' : function (val) {
            var icon = val ? 'checkmark' : 'ban circle';
            return '<i class="' + icon + ' icon"></i>';
        }
    },
    'json' : {
        'printValue' : function (val) {
            var jsonString = JSON.stringify(val);

            if (_.isString(jsonString) && jsonString.length > 20) {
                return jsonString.slice(0, 20) + '...';
            }

            return jsonString;
        }
    }
};