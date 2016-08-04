function selectFile(opts, onDone) {
	var input = document.createElement("input");
	var form = document.getElementById("defform");

	if(!form) {
		form = document.createElement("form");
		form.id = "defform";
	}
	form.appendChild(input);

	for(var k in opts) {
		if(opts.hasOwnProperty(k)) {
			input[k] = opts[k];
		}
	}

	input.type = "file";
	input.onchange = function() {
		if(onDone) {
			onDone(this.files);
		}
		form.removeChild(this);
	}

	input.click();
}

function readLocalFile(opts, onDone) {
	function readFile(file) {
		var reader = new FileReader();	

		reader.onloadend = function() {
			if(this.readyState === FileReader.DONE) {
				onDone(null, this.result);
			}
			else {
				var err = new Error("readFile fail");
				err.data = {
					filename: file.name
				};
				onDone(err);
			}
		}

		switch(opts.type){
			case "image": {
				reader.readAsDataURL(file);
				break;
			}
			case "txt": {
				reader.readAsText(file);
				break;
			}
			default: {
				break;
			}
		}
	}

	selectFile(opts, function(file) {
		if(file.length >= 1) {
			readFile(file[0]);	
		}
		else {
			var err = new Error("empty file");			
			onDone(err);
		}
	});
}

function GeneralControler() {
}

GeneralControler.setApp = function(app) {
	GeneralControler.app = app;
}

GeneralControler.loadTexture = function() {
	var inst = window.getParticlesModelInst();

	readLocalFile({
		mutiple: false,
		type: 'image'
	}, function(err, imageSrc) {
		if(!err) {
			inst.setTexture(imageSrc);
			var emitter = GeneralControler.app.particlesEmitter;
			emitter.reload(inst.getSetting());
		}
	});	
}

GeneralControler.loadParticle = function() {
	var inst = window.getParticlesModelInst();

	readLocalFile({
		mutiple: false,
		type: 'txt'
	}, function(err, config) {
		if(!err) {
			inst.loadSetting(config);
			var emitter = GeneralControler.app.particlesEmitter;
			emitter.reload(inst.getSetting());
		}
	});	
}

GeneralControler.editTexture = function() {
	//TODO
}

GeneralControler.editBackground = function(oldColor, listener) {
	showColorPicker(oldColor, listener);
}

GeneralControler.randomSetting = function() {
	var configs = window.app.randomSetting();
	var inst = window.getParticlesModelInst();
	inst.randomSetting(configs);

	var emitter = GeneralControler.app.particlesEmitter;
	emitter.reload(inst.getSetting());
}

GeneralControler.exportSetting = function() {
	var inst = window.getParticlesModelInst();
	inst.exportSetting();
}

GeneralControler.updateProperty = function(key, value, needReload) {
	var inst = window.getParticlesModelInst();

	inst.updateProperty(key, value);
	if(needReload) {
		var emitter = GeneralControler.app.particlesEmitter;
		emitter.reload(inst.getSetting());
	}
}

GeneralControler.updateSrcBlend = function(value) {
	var inst = window.getParticlesModelInst();
	inst.updateProperty("blendSource", value);

	var emitter = GeneralControler.app.particlesEmitter;
	emitter.reload(inst.getSetting());
}

GeneralControler.updateDstBlend = function(value) {
	var inst = window.getParticlesModelInst();
	inst.updateProperty("blendDest", value);

	var emitter = GeneralControler.app.particlesEmitter;
	emitter.reload(inst.getSetting());
}

GeneralControler.updateEmitterType = function(type, delay) {
	var inst = window.getParticlesModelInst();
	inst.updateProperty("emitType", type);

	if(!delay) {
		var emitter = GeneralControler.app.particlesEmitter;
		emitter.reload(inst.getSetting());
	}
}

GeneralControler.getSetting = function() {
	var inst = window.getParticlesModelInst();
	return inst.getSetting();
}

GeneralControler.getTexture = function() {
	var inst = window.getParticlesModelInst();
	var src = inst.getTexture();
	var image = new Image();
	image.src = src;

	return image;
}

GeneralControler.emitOnce = function() {
	var emitter = GeneralControler.app.particlesEmitter;
	emitter.emit(true);
}

GeneralControler.stopEmit = function() {
	var emitter = GeneralControler.app.particlesEmitter;
	emitter.stop();
}

GeneralControler.startEmit = function() {
	var emitter = GeneralControler.app.particlesEmitter;
	emitter.start();
}

GeneralControler.pauseEmit = function() {
	var emitter = GeneralControler.app.particlesEmitter;
	emitter.pause();
}

GeneralControler.resumeEmit = function() {
	var emitter = GeneralControler.app.particlesEmitter;
	emitter.resume();
}
