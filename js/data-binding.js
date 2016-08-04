(function(window) {
  'use strict';

const gravityMapping = {
	"Gravity": 0,
	"Radial": 1
};

const blendMapping = {
	"One": 1,
	"Zero": 0,
	"Src Alpha": 0x0302
};
  
function ParticleConfig() {
    //currentTexture
    this.imageData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEFklEQVRYR8WXu4ok2RGGvz8yK+vS1XWdAT2AvAUhkCVPT7HmwloyBHoYwRqyFmTuU8iTJRCC9fQAgpm6dnVdsjLjF1mrHmal2WXaqnROGiczvvPH5USIOz96rf1f/on+218Q9QZdh6h3wtUcv/s3+a8/cnnt/z4LoDPaL+j1RpRFTXkJimGJskZR4VOD+0nbVjTXI82l5fq5MD8L8MV3VLyjehjTb89UWQyqKF1eW8oyHS6QWtyEslfQZKMm2nNdDKifD1x4S/39l9Q/p8pPAvzuWwZbGPRgcGkGw16Z/Uz3HVRKlwmFAylxQOtQo6SO0OXaxKVfnk9XOM/g/NevOf8UxCcBfvsdw/2eYeHhSM6RejlSepgwKEy/DZeiKEhEYNO2RappxSXg7NDJ1zhacWx1Ok4mnP72JadPQfwfQHfydy0jxfChattxlh7T+IHSI2UxtOkjV+oUEJI7AFqsWuLiaE80OlLqORod6qI4OE/PbwuOn1LiRwCdz3vPjLIZjkvax6bwpMCPzhgjHsAjwSBxT6J0InUKmCbQ1XRS64h5VuShRU9lq31D8RTl6XB94Pi/MfFjgG8Yj0aM62t/ol5OZU+zjYnCE5ux4gcAiF6aMoTSOEQDeQNw6ihxcGofRe4t7XyNXdW77I9HDt//gcPHrvgA0KXaYsr4XA8mUbZTGs9QzJBnEhPbY4gH7CGiD/QwQhi4Yi5IJ8hnSQebPdYW55ZS22yK3aA679c7Dh+n6AeAL75hPCh5pKqmmTl3eE4Wc9tzyRMTjyGPbR4Mw5Arm5DI7PwPJ4nntA4in2ztJW2IdqPUJiI21PXu3PD0sQofAH79LTO1gylqZ4kXQSyMF8hzHNMOIs1U+BFiBO7LhEWCLpBHo6cQu844yh3WRmid5DrQGhdbF+fdP75m++KGG0An/7TPI/3+tHUuovUyiYXkZQfg1AwxA89BU2DcxYKhUFcDbsHX+dY70AazVXjbAdhaBbnOQqtCseZy2e0uPL244QbQ5f3TjklEf1bQLlJeyvGmUyAUnRsWhoXQ4gcIJoKRUSncGI7AvjNuvBasJa3TeVPAyvdhrVqKdeZl+zhl/1IXbgC/+TOjqJi0TTVvI5dSLGW/sby0Yy687NSwtRQsgJnh8RaIcBU8AVvfDHvVndpoJeVG3bv03s5VkbEqynqTNfu///4GzQ3gV3/hoXdikr1q3iqX0caS8BunlxEx71bkN7KWFkvQHDy51QbzDNqDNzIryyus9wqtMnPTraTeZ5GrwrGKa725Dtn/86vuu/8C3F2Bu8fA3bOg88Vd60AHcPdKePe74EWFu92GN4B79wMdxF07opcb6q494QvEXbviF4i7zgUf9213m4w+1cffZTZ87cD5mv2fNZy+5oev3fsfDNszXUW+/z8AAAAASUVORK5CYII=";

    //color props
    this.startColorAlpha = 0.3;
    this.finishColorAlpha = 0.3;
    this.startColorVarianceAlpha = 0.1;
    this.finishColorVarianceAlpha = 0;

    this.startColorAlphaMin = this.finishColorAlphaMin = 0;
    this.startColorAlphaMax = this.finishColorAlphaMax = 1;
    this.startColorAlphaStep = this.finishColorAlphaStep = 0.1;

    this.startColorVarianceAlphaMin = this.finishColorVarianceAlphaMin = 0;
    this.startColorVarianceAlphaMax = this.finishColorVarianceAlphaMax = 1;
    this.startColorVarianceAlphaStep =this.finishColorVarianceAlphaStep = 0.1;

    //action props
    this.gravityx = this.gravityy = 0;
    this.gravityxStep = this.gravityyStep = 5.55;
    this.gravityxMin = this.gravityyMin = -1000;
    this.gravityxMax = this.gravityyMax = 1000;

    this.speed = this.speedVariance = 0;
    this.speedMin = this.speedVarianceMin = 0;
    this.speedStep = this.speedVarianceStep = 5.55;
    this.speedMax = this.speedVarianceMax = 1000;

    this.radialAcceleration = this.radialAccelVariance = 0;
    this.radialAccelerationStep = this.radialAccelVarianceStep = 5.55;
    this.radialAccelerationMin = this.radialAccelVarianceMin = -500;
    this.radialAccelerationMax =this.radialAccelVarianceMax = 1000;

    this.tangentialAcceleration = this.tangentialAccelVariance = 0;
    this.tangentialAccelerationStep = this.tangentialAccelVarianceStep = 5.55;
    this.tangentialAccelerationMin = this.tangentialAccelVarianceMin = -500;
    this.tangentialAccelerationMax = this.tangentialAccelVarianceMax = 1000;

    //basic props
    this.duration = -1;		
    this.durationStep = 10;
    this.durationMax = Number.MAX_VALUE;
    this.durationMin = Number.MIN_VALUE;

    this.emitterType = 0;
    this.maxParticles = 100;
    this.maxParticlesStep = 5;
    this.maxParticlesMax = 1000;
    this.maxParticlesMin = 1;

    this.blendFuncSource = 0;
		this.blendFuncDestination = 1;

    this.sourcePositionx = 100;
    this.sourcePositionVariancex = 100;

    this.sourcePositionxStep = 5;
    this.sourcePositionxMin = -1000;
    this.sourcePositionxMax = 1000;

    this.sourcePositionVariancexStep = 5;
    this.sourcePositionVariancexMin = -1000;
    this.sourcePositionVariancexMax = 1000;
    
    this.sourcePositiony = 100;
    this.sourcePositionVariancey = 100;

    this.sourcePositionyStep = 5;
    this.sourcePositionyMin = -1000;
    this.sourcePositionyMax = 1000;

    this.sourcePositionVarianceyStep = 5;
    this.sourcePositionVarianceyMin = -1000;
    this.sourcePositionVarianceyMax = 1000;

    //
    this.angle = 0;
    this.angleVariance = 0;

    this.angleStep = 3;
    this.angleMin = -1000;
    this.angleMax = 1000;

    this.angleVarianceStep = 3;
    this.angleVarianceMin = -1000;
    this.angleVarianceMax = 1000;

    this.particleLifespan = 8;
    this.particleLifespanVariance = 5;

    this.particleLifespanStep = 0.03;
    this.particleLifespanMin = 0;
    this.particleLifespanMax = 100;

    this.particleLifespanVarianceStep = 0.03;
    this.particleLifespanVarianceMin = 0;
    this.particleLifespanVarianceMax = 100;

    this.startParticleSize = 35;
    this.startParticleSizeVariance = 10;

    this.startParticleSizeStep = 1.11;
    this.startParticleSizeMin = -100;
    this.startParticleSizeMax = 100;

    this.startParticleSizeVarianceStep = 0.5;
    this.startParticleSizeVarianceMin = -100;
    this.startParticleSizeVarianceMax = 100;

    //
    this.finishParticleSize = 10;
    this.finishParticleSizeVariance = 5;

    this.finishParticleSizeStep = 1.11;
    this.finishParticleSizeMin = -100;
    this.finishParticleSizeMax = 100;

    this.finishParticleSizeVarianceStep = 0.5;
    this.finishParticleSizeVarianceMin = -100;
    this.finishParticleSizeVarianceMax = 100;

    this.rotationStart = 60;
    this.rotationStartVariance = 30;

    this.rotationStartStep = 1;
    this.rotationStartMin = -1000;
    this.rotationStartMax = 1000;

    this.rotationStartVarianceStep = 0.5;
    this.rotationStartVarianceMin = -1000;
    this.rotationStartVarianceMax = 1000;

    this.rotationEnd = 45;
    this.rotationEndVariance = 45;

    this.rotationEndStep = 1;
    this.rotationEndMin = -1000;
    this.rotationEndMax = 1000;

    this.rotationEndVarianceStep = 0.5;
    this.rotationEndVarianceMin = -1000;
    this.rotationEndVarianceMax = 1000;

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
  
  function PropsManager() {
    this.particleConfig = new ParticleConfig();
    this.backupProps = null;
  }

  PropsManager.templateConfigs = {};
  PropsManager.templateConfigs.snow = window.tempSnow;

  PropsManager.prototype.reset = function() {
    if(this.backupProps) {
      this.particleConfig = JSON.parse(JSON.stringify(this.backupProps));
    }
  };

  PropsManager.prototype.setTempProperty = function(k, v) {
    if(!this.tmpPropertys) {
      this.tmpPropertys = {};
    }

    this.tmpPropertys[k] = v;

    return this;
  };

  PropsManager.prototype.getTempProperty = function(k) {
    if(!this.tmpPropertys || !k) {
      return '';
    }

    return this.tmpPropertys[k];
  };

  PropsManager.prototype.setProperty = function(k, v) {
    if(this.particleConfig.hasOwnProperty(k)) {
      if(this.backupProps == null) {
        this.backupProps = this.getAllPropertys();
      }
      this.particleConfig[k] = v;
      window.emitter.reload(this.getAllPropertys());
    }
    else {
      console.debug("invalid updateProperty: ", k, v);
    }
  };

  PropsManager.prototype.getProperty = function(k) {
    if(this.particleConfig.hasOwnProperty(k)) {
      return this.particleConfig[k];
    }      
    else {
      console.debug("invalid loadProperty: ", k);
    }
  };

  PropsManager.prototype.loadTemplate = function(name) {
    this.backupProps = null;
    if(name in PropsManager.templateConfigs) {
      return PropsManager.templateConfigs[name];
    }
    else {
      console.debug("invalid loadTemplate: ", name);
    }
  };

  PropsManager.prototype.getAllPropertys = function() {
    var props = JSON.parse(JSON.stringify(this.particleConfig));
		return props;
  };

  PropsManager.prototype.loadPropertys = function(configs) {
    var that = this;
		var keys = Object.keys(configs);

    this.backupProps = JSON.parse(JSON.stringify(configs));    
		keys.forEach(function(key) {
			let k = key;
			if(that.particleConfig.hasOwnProperty(k)) {
				that.particleConfig[k] = configs[key];
			}
			else {
				console.assert(false, "unknow property: " + key);
			}
		});
  };

  window.propsManager = new PropsManager();

})(this);