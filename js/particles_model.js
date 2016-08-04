
void function(global) {
var propsMapping = {
	"MaxParticles": "maxParticles",
	"Lifespan": "particleLifespan",
	"LifeVariance": "particleLifespanVariance",
	"StartSize": "startParticleSize",
	"SizeVariance": "startParticleSizeVariance",
	"FinishSize": "finishParticleSize",
	"FSizeVariance": "finishParticleSizeVariance",
	"EmitterAngle": "angle",
	"AngleVariance": "angleVariance",
	"StartRotate": "rotationStart",
	"StartRotate.var": "rotationStartVariance",
	"EndRotate": "rotationEnd",
	"EndRotate.var": "rotationEndVariance",
	"X Variance": "sourcePositionVariancex",
	"Y Variance": "sourcePositionVariancey",
	"Speed": "speed",
	"Speed.Var": "speedVariance",
	"Gravity X": "gravityx",
	"Gravity Y": "gravityy",
	"Tan.Acc": "tangentialAcceleration",
	"Tan.Acc.Var": "tangentialAccelVariance",
	"Rad.Acc": "radialAcceleration",
	"Rad.Acc.Var": "radialAccelVariance",
	"Max Radius": "maxRadius",
	"Max.Rad.Var": "maxRadiusVariance",
	"Min Radius": "minRadius",
	"Min.Rad.Var": "minRadiusVariance",
	"Deg/Sec": "rotatePerSecond",
	"Deg/Sec Var": "rotatePerSecondVariance",

	"CS.R": "startColorRed",
	"CS.G": "startColorGreen",
	"CS.B": "startColorBlue",
	"CS.A": "startColorAlpha",

	"CF.R": "startColorVarianceRed",
	"CF.G": "startColorVarianceGreen",
	"CF.B": "startColorVarianceBlue",
	"CF.A": "startColorVarianceAlpha",

	"VS.R": "finishColorRed",
	"VS.G": "finishColorGreen",
	"VS.B": "finishColorBlue",
	"VS.A": "finishColorAlpha",

	"VF.R": "finishColorVarianceRed",
	"VF.G": "finishColorVarianceGreen",
	"VF.B": "finishColorVarianceBlue",
	"VF.A": "finishColorVarianceAlpha"
};

var gravityMapping = {
	"Gravity": 0,
	"Radial": 1
};

var blendMapping = {
	"One": 1,
	"Zero": 0,
	"Src Alpha": 0x0302
};

	function ParticleConfig() {
		this.imageData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEFklEQVRYR8WXu4ok2RGGvz8yK+vS1XWdAT2AvAUhkCVPT7HmwloyBHoYwRqyFmTuU8iTJRCC9fQAgpm6dnVdsjLjF1mrHmal2WXaqnROGiczvvPH5USIOz96rf1f/on+218Q9QZdh6h3wtUcv/s3+a8/cnnt/z4LoDPaL+j1RpRFTXkJimGJskZR4VOD+0nbVjTXI82l5fq5MD8L8MV3VLyjehjTb89UWQyqKF1eW8oyHS6QWtyEslfQZKMm2nNdDKifD1x4S/39l9Q/p8pPAvzuWwZbGPRgcGkGw16Z/Uz3HVRKlwmFAylxQOtQo6SO0OXaxKVfnk9XOM/g/NevOf8UxCcBfvsdw/2eYeHhSM6RejlSepgwKEy/DZeiKEhEYNO2RappxSXg7NDJ1zhacWx1Ok4mnP72JadPQfwfQHfydy0jxfChattxlh7T+IHSI2UxtOkjV+oUEJI7AFqsWuLiaE80OlLqORod6qI4OE/PbwuOn1LiRwCdz3vPjLIZjkvax6bwpMCPzhgjHsAjwSBxT6J0InUKmCbQ1XRS64h5VuShRU9lq31D8RTl6XB94Pi/MfFjgG8Yj0aM62t/ol5OZU+zjYnCE5ux4gcAiF6aMoTSOEQDeQNw6ihxcGofRe4t7XyNXdW77I9HDt//gcPHrvgA0KXaYsr4XA8mUbZTGs9QzJBnEhPbY4gH7CGiD/QwQhi4Yi5IJ8hnSQebPdYW55ZS22yK3aA679c7Dh+n6AeAL75hPCh5pKqmmTl3eE4Wc9tzyRMTjyGPbR4Mw5Arm5DI7PwPJ4nntA4in2ztJW2IdqPUJiI21PXu3PD0sQofAH79LTO1gylqZ4kXQSyMF8hzHNMOIs1U+BFiBO7LhEWCLpBHo6cQu844yh3WRmid5DrQGhdbF+fdP75m++KGG0An/7TPI/3+tHUuovUyiYXkZQfg1AwxA89BU2DcxYKhUFcDbsHX+dY70AazVXjbAdhaBbnOQqtCseZy2e0uPL244QbQ5f3TjklEf1bQLlJeyvGmUyAUnRsWhoXQ4gcIJoKRUSncGI7AvjNuvBasJa3TeVPAyvdhrVqKdeZl+zhl/1IXbgC/+TOjqJi0TTVvI5dSLGW/sby0Yy687NSwtRQsgJnh8RaIcBU8AVvfDHvVndpoJeVG3bv03s5VkbEqynqTNfu///4GzQ3gV3/hoXdikr1q3iqX0caS8BunlxEx71bkN7KWFkvQHDy51QbzDNqDNzIryyus9wqtMnPTraTeZ5GrwrGKa725Dtn/86vuu/8C3F2Bu8fA3bOg88Vd60AHcPdKePe74EWFu92GN4B79wMdxF07opcb6q494QvEXbviF4i7zgUf9213m4w+1cffZTZ87cD5mv2fNZy+5oev3fsfDNszXUW+/z8AAAAASUVORK5CYII=";

		this.maxParticles = 100;
		this.emitterType = 0;
		this.speed = 0;
		this.speedVariance = 0;
		this.gravityx = 0;
		this.gravityy = 0;
		this.radialAcceleration = 0;
		this.radialAccelVariance = 0;
		this.tangentialAcceleration = 0;
		this.tangentialAccelVariance = 0;

		this.maxRadius = 0;
		this.maxRadiusVariance = 0;
		this.minRadius = 0;
		this.minRadiusVariance = 0;

		this.rotatePerSecond = 0;
		this.rotatePerSecondVariance = 0;

		//emitter angle
		this.angle = 0;
		this.angleVariance = 0;

		//emitter duration
		this.duration = -1;

		//blend function
		this.blendFuncSource = 0;
		this.blendFuncDestination = 1;

		//particle color
		this.startColorRed = 0.3;
		this.startColorGreen = 0.3;
		this.startColorBlue = 0.3;
		this.startColorAlpha = 0.3;

		this.startColorVarianceRed = 0.2;
		this.startColorVarianceGreen = 0.1;
		this.startColorVarianceBlue = 0.6;
		this.startColorVarianceAlpha = 0.3;

		this.finishColorRed = 0.5;
		this.finishColorGreen = 0.6;
		this.finishColorBlue = 0.9;
		this.finishColorAlpha = 0.1;

		this.finishColorVarianceRed = 0.7;
		this.finishColorVarianceGreen = 0.3;
		this.finishColorVarianceBlue = 0.9;
		this.finishColorVarianceAlpha = 1;

		// particle size
		this.startParticleSize = 35;
		this.startParticleSizeVariance = 10;
		this.finishParticleSize = 10;
		this.finishParticleSizeVariance = 5;

		//emitter position
		this.sourcePositionx = 100;
		this.sourcePositiony = 100;
		this.sourcePositionVariancex = 100;
		this.sourcePositionVariancey = 100;

		//particle spining
		this.rotationStart = 60;
		this.rotationStartVariance = 30;
		this.rotationEnd = 45;
		this.rotationEndVariance = 45;

		//particle life span
		this.particleLifespan = 8; 
		this.particleLifespanVariance = 5;

		Object.defineProperty(this, "emitType", {
			enumerable: true,
			configurable: true,
			set: function(val) {
				this.emitterType = gravityMapping[val];	
			},
			get: function() {
				for(var k in gravityMapping) {
					if(gravityMapping[k] === this.emitterType) {
						return k;
					}
				}
				console.assert(0);
			}
		});

		Object.defineProperty(this, "blendDest", {
			enumerable: true,
			configurable: true,
			set: function(val) {
				if(val in blendMapping) {
					this.blendFuncDestination = blendMapping[val];
				}
			},
			get: function() {
				for(var k in blendMapping) {
					if(blendMapping[k] === this.blendFuncDestination) {
						return k;
					}
				}
				console.assert(0);
			}
		});

		Object.defineProperty(this, "blendSource", {
			enumerable: true,
			configurable: true,
			set: function(val) {
				if(val in blendMapping) {
					this.blendFuncSource = blendMapping[val];
				}
			},
			get: function() {
				for(var k in blendMapping) {
					if(blendMapping[k] === this.blendFuncDestination) {
						return k;
					}
				}
				console.assert(0);
			}
		});
	}

	function ParticlesModel() {
		this.props = new ParticleConfig();
	}

	ParticlesModel.loadDefaultSetting = function() {
		return this.props;
	}

	ParticlesModel.prototype.exportSetting = function() {
		var blob = new Blob([JSON.stringify(this.props)], {type: "text/plain;charset=utf-8"});
		saveAs(blob, "particles.json");
	}

	ParticlesModel.prototype.getSetting = function() {
		var props = JSON.parse(JSON.stringify(this.props));
		return props;
	}

	ParticlesModel.prototype.loadSetting = function(configs) {
		var that = this;
		var keys = Object.keys(configs);

		keys.forEach(function(key) {
			k = propsMapping[key] || key;
			if(that.props.hasOwnProperty(k)) {
				that.props[k] = configs[key];
			}
			else {
				console.assert(false, "unknow property: " + key);
			}
		});
	}

	ParticlesModel.prototype.getTexture = function() {
		return this.props['imageData'];
	}

	ParticlesModel.prototype.setTexture = function(imageData) {
		this.props['imageData'] = imageData;	
	}

	ParticlesModel.prototype.updateProperty = function(key, value) {
		var key = propsMapping[key] || key;
		if(this.props.hasOwnProperty(key)) {
			this.props[key] = value;
		}
		else {
			console.assert(false, "invalid particle property: " + key);
		}
	}

	var inst = null;
	global.getParticlesModelInst = function() {
		if(!inst) {
			inst = new ParticlesModel();
		}

		return inst;
	};
}(this);
