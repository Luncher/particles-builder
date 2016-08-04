function PLIST() {
	this.options = {};
}

PLIST.ST_NONE = 0;
PLIST.ST_TEXT = 1;
PLIST.ST_END_TAG = 2;
PLIST.ST_START_TAG = 3;

PLIST.prototype.onStateChanged = function(state, str) {
	switch(this._parseState) {
		case PLIST.ST_START_TAG: {
			this.tagName = str;
			break;
		}
		case PLIST.ST_END_TAG: {
			this.tagName = null;
			break;
		}
		case PLIST.ST_TEXT: {
			if(this.tagName === "key") {
				this._propName = str;
			}
			else if(this.tagName === "real") {
				this.options[this._propName] = parseFloat(str);
			}
			else if(this.tagName === "integer") {
				this.options[this._propName] = parseInt(str);
			}
			else if(this.tagName === "string") {
				this.options[this._propName] = str;
			}

			break;
		}
	}

	this._parseState = state;
};

PLIST.prototype.dump = function() {
	console.log(JSON.stringify(this.options, null, "\t"))
};

PLIST.prototype.get = function(name) {
	if(name) {
		return this.options[name];
	}
	else {
		return this.options;
	}
};

PLIST.prototype.parse = function(buff) {
	var str = "";
	var n = buff.length;
	this.options = {};

	this._parseState = PLIST.ST_NONE;
	for(var i = 0; i < n; i++) {
		var c = buff[i];
		if(c === "<") {
			if(buff[i+1] === "/") {
				i++;
				this.onStateChanged(PLIST.ST_END_TAG, str);
			}
			else {
				this.onStateChanged(PLIST.ST_START_TAG, str);
			}
			str = "";
		}
		else if(c === ">") {
			this.onStateChanged(PLIST.ST_TEXT, str);
			str = "";
		}
		else {
			str += c;
		}
	}

	return;
};
