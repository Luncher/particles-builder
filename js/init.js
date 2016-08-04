(function(window) {
  'use strict';

  let bkload = window.onload;

  window.onload = function() {
    if(bkload) {
      bkload();
    }
    ready();
  };

  function renderLoop() {
    let canvas = document.getElementById('main-canvas');
    let context2d = canvas.getContext('2d');
    let oldTime = Date.now();

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    let renderTabView = renderVisualTabView();
    function loop() {
      let now = Date.now();
      let dt = now - oldTime;

      context2d.fillStyle = window.fillStyle;
      context2d.fillRect(0, 0, canvas.width, canvas.height);
      context2d.save();
      context2d.scale(1, -1);
      window.emitter.update(dt/1000);
      window.emitter.draw(context2d);

      context2d.restore();

      if(window.tabViewId === "visual-prop") {
        context2d.save();
        renderTabView();
        context2d.restore();
      }

      oldTime = now;

      return;
    }

    setInterval(loop, 25);

    return;
  }

  function ready() {
    initProps();
    eventBinding();
    let props = window.propsManager.getAllPropertys();
    window.emitter = new ParticleEmitter();
    window.emitter.reload(props);
    renderLoop();
  }

  function renderVisualTabView() {
    const canvas = document.getElementById('visual-canvas');
    const context = canvas.getContext('2d');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    let maxWidth = canvas.clientWidth;
    let maxHeight = canvas.clientHeight;

    let subGridWidth = maxWidth/6;
    let subGridHeight = maxHeight;
    let innerSubGridWidth = subGridWidth - 20;
    let innerSubGridHeight = subGridHeight - 20;

    function updateEmitPos(point) {
      let newWidth = 0;
      let newHeight = 0;

      if(point.x < subGridWidth/2 && point.y < subGridHeight/2) {
          newWidth = subGridWidth - point.x*2;
          newHeight = subGridHeight - point.y*2;
          window.propsManager.setProperty("sourcePositionVariancex", newWidth/2);
          window.propsManager.setProperty("sourcePositionVariancey", newHeight/2);
        }
        else if(point.x < subGridWidth/2 && point.y > subGridHeight/2) {
          newWidth = subGridWidth - point.x*2;
          newHeight = subGridHeight - (subGridHeight - point.y)*2;
          window.propsManager.setProperty("sourcePositionVariancex", newWidth/2);
          window.propsManager.setProperty("sourcePositionVariancey", newHeight/2);
        }
        else if(point.x > subGridWidth/2 && point.y < subGridHeight/2) {
          newWidth = subGridWidth - (subGridWidth - point.x)*2;
          newHeight = subGridHeight - point.y*2;          
          window.propsManager.setProperty("sourcePositionVariancex", newWidth/2);
          window.propsManager.setProperty("sourcePositionVariancey", newHeight/2);
        }
        else {
          newWidth = subGridWidth - (subGridWidth - point.x)*2;
          newHeight = subGridHeight - (subGridHeight - point.y)*2;
          window.propsManager.setProperty("sourcePositionVariancex", newWidth/2);
          window.propsManager.setProperty("sourcePositionVariancey", newHeight/2);
        }
        const sxElement = document.getElementById('sourcePositionVariancex');
        sxElement.value = newWidth/2;
        const syElement = document.getElementById('sourcePositionVariancey');
        syElement.value = newHeight/2;   
    }

    function updateGravity(point) {
      let gravityX = point.x-(subGridWidth/2+subGridWidth + 5);
      let gravityY = point.y-(subGridHeight/2);

      window.propsManager.setProperty("gravityx", gravityX);
      window.propsManager.setProperty("gravityy", gravityY);
      const gravityXElement = document.getElementById('gravityx');
      const gravityYElement = document.getElementById('gravityy');

      gravityXElement.value = gravityX;
      gravityYElement.value = gravityY;
    }

    function updateSpeedDir(point) {
      point.x = (point.x - (subGridWidth/2 + 2*subGridWidth + 5));
      point.y = (point.y - subGridHeight/2);
      let speed = Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2))*4;
      let angle = Math.atan2(point.y, point.x);
      angle = 180/Math.PI * angle;

      window.propsManager.setProperty("speed", speed);      
      window.propsManager.setProperty("angle", angle);      
      const speedElement = document.getElementById('speed');
      speedElement.value = speed;
      window.propsManager.setTempProperty("speed-point", point);
    }


    function updateVisualTabView(event) {
      //emit rect
      let point = {x: event.layerX, y: event.layerY};
      if(point.x > 20 && point.y > 20 && point.x < subGridWidth && point.y < subGridHeight) {
        updateEmitPos(point);
      }
      else if(point.x > 20 && point.y > 20 && point.x > subGridWidth+5 && 
        point.x < subGridWidth*2 + 5 && point.y < subGridHeight) {
        updateGravity(point);
      }
      else if(point.x > 20 && point.y > 20 && point.x < 3*subGridWidth+10 && point.y < subGridHeight) {
        updateSpeedDir(point);        
      }
    }

    canvas.addEventListener('click', updateVisualTabView);
    canvas.addEventListener('mousedown', function() {
      window.mouseDone = true;
    });

    canvas.addEventListener('mouseup', function() {
      window.mouseDone = false;
    });

    canvas.addEventListener('mousemove', function(e) {
      if(window.mouseDone) {
        updateVisualTabView(e);
      }
    });

    return function () {
      //emit rect
      let emitWidth = window.propsManager.getProperty("sourcePositionVariancex")*2;
      let emitHeight = window.propsManager.getProperty("sourcePositionVariancey")*2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.save();
      context.translate(subGridWidth/2, subGridHeight/2);
      context.fillRect(-innerSubGridWidth/2, -innerSubGridHeight/2, innerSubGridWidth, innerSubGridHeight);
      context.fillStyle = "white";
      context.font = "1em Arial";
      const text = "发射区域:" + "宽[" + emitWidth.toFixed(0) + "]" + ",高[" + emitHeight.toFixed(0) + "]";
      context.fillText(text, -innerSubGridWidth/2, -innerSubGridHeight/2 + 16);
      context.strokeStyle = "red";
      let maxEmitWidth = Math.abs(emitWidth) > innerSubGridWidth ? innerSubGridWidth-10 : Math.abs(emitWidth);
      let maxEmitHeight = Math.abs(emitHeight) > innerSubGridHeight ? innerSubGridHeight-10 : Math.abs(emitHeight);

      context.strokeRect(-maxEmitWidth/2, -maxEmitHeight/2, Math.abs(maxEmitWidth), Math.abs(maxEmitHeight));

      context.restore();

      //gravity direction
      context.save();
      let gravityX = +window.propsManager.getProperty("gravityx");
      let gravityY = +window.propsManager.getProperty("gravityy");
      context.translate(subGridWidth/2+subGridWidth + 5, subGridHeight/2);
      context.fillRect(-innerSubGridWidth/2, -innerSubGridHeight/2, innerSubGridWidth, innerSubGridHeight);
      context.fillStyle = "white";
      context.font = "1em Arial";
      const text2 = "重力方向:" + "x[" + gravityX.toFixed(1) + "]" + ",y[" + gravityY.toFixed(1) + "]";
      context.fillText(text2, -innerSubGridWidth/2, -innerSubGridHeight/2 + 16);
      context.restore();
      if(gravityX != 0 && gravityY != 0) {
        context.save();
        context.beginPath();
        context.moveTo((subGridWidth/2+subGridWidth + 5), (subGridHeight/2));                 
        context.lineTo(gravityX+(subGridWidth/2+subGridWidth + 5), gravityY + (subGridHeight/2));
        context.strokeStyle = "red";
        context.stroke();
        context.restore();
      }

      //speed direction
      context.save();
      let speed = +window.propsManager.getProperty("speed");
      let angle = +window.propsManager.getProperty("angle");
      context.translate(subGridWidth/2+2*subGridWidth + 5, subGridHeight/2);
      context.fillRect(-innerSubGridWidth/2, -innerSubGridHeight/2, innerSubGridWidth, innerSubGridHeight);
      context.fillStyle = "white";
      context.font = "1em Arial";
      const text3 = "速度方向:" + "大小[" + speed.toFixed(1) + "]" + ",角度[" + angle.toFixed(1) + "]";
      context.fillText(text3, -innerSubGridWidth/2, -innerSubGridHeight/2 + 16);

      angle = angle * Math.PI/180;      
      context.save();
      context.beginPath();      
      context.rotate(angle);
      context.moveTo(0, 0);
      context.lineTo(speed/4, 0);
      context.strokeStyle = "red";
      context.stroke();
      context.restore();

      if(angle !== 0) {
        context.save();
        context.beginPath();

        let sAngle = angle - 0.017453292*30;
        let eAngle = angle + 0.017453292*30;

        context.arc(0, 0, 50, sAngle, eAngle);
        context.strokeStyle = "red";
        context.stroke();
        context.restore();
      }

      context.restore();
    };
  }

  window.isOnlineVersion = function() {
    return /\http:\/\/studio\.[test\.]?holaverse\.*/.test(location.href);
  };

  function initGlobalParams() {
    window.fillStyle = "#000000";
    window.tabViewId = "basic-prop";
    window.tabItems = ["basic-prop", "visual-prop"];
    initWindowItems();
  }

  function initTabView() {
    var normalStyle = {
        "background-color": "slategray"
    };

    var focusStyle = {
        "background-color": "darkslategray"
    };

    function switchTabView() {
      const visualTabView = document.querySelector('.adjust-visual-tabview');
      if(window.tabViewId === "visual-prop") {
        visualTabView.style.visibility = 'visible';
      }
      else {
        visualTabView.style.visibility = 'hidden';        
      }

      updateStyle();
    }

    function updateStyle() {
      window.tabItems.forEach(function(id) {
        let style = "";
        const item = document.getElementById(id);
        
        item.addEventListener('click', function() {
          window.tabViewId = this.id;
          switchTabView();
        });

        if(id === window.tabViewId) {
          style = focusStyle;
        }
        else {
          style = normalStyle;        
        }

        for(let k in focusStyle) {
            item.style[k] = style[k];
        }
      });
    }

    switchTabView();
    // updateStyle();

    return;
  }

  function initTextureProps() {
    const propsManager = window.propsManager;
    let imgElement = document.getElementById('texture');
    imgElement.src = propsManager.getProperty('imageData');

    //texture
    let fileSelect = document.createElement('input');
    fileSelect.type = 'file';
    fileSelect.style.display = 'none';
    fileSelect.accept = "image/*";
    document.body.appendChild(fileSelect);
    let reader = new FileReader();
    fileSelect.onchange = function() {
      if(!this.files || !this.files.length) {
        return;
      }

      reader.onload = (e) => {
        document.getElementById('texture').src = e.target.result;
        propsManager.setProperty('imageData', e.target.result);
      };
      reader.readAsDataURL(this.files[0]);
    };

    document.querySelector('.panel-image-value').addEventListener('mouseup', (event) => {
      console.debug("updtae texture");
      fileSelect.click();
      event.stopPropagation();
    });
    return;
  }

  function initColorProps() {
    let colorTip = 'start';
    const propsManager = window.propsManager;
    let colorTransElement = document.getElementById('trans');
    let colorTransDiffElement = document.getElementById('trans-diff');    
    let colorTransStartColor = document.getElementById('colorTrans-startColor');
    let colorTransEndColor = document.getElementById('colorTrans-endColor');

    colorTransStartColor.addEventListener('click', function() {
      colorTip = 'start';
      colorTransElement.value = propsManager.getProperty('startColorAlpha');      
      colorTransDiffElement.value = propsManager.getProperty('startColorVarianceAlpha');      
    });

    colorTransEndColor.addEventListener('click', function() {
      colorTip = 'end';
      colorTransElement.value = propsManager.getProperty('finishColorAlpha');      
      colorTransDiffElement.value = propsManager.getProperty('finishColorVarianceAlpha');
    });

    function updateColorTrans() {
      if(colorTip === 'start') {
        propsManager.setProperty('startColorAlpha', this.value);
      }
      else {
        propsManager.setProperty('finishColorAlpha', this.value);
      }
    }

    function updateColorTransDiff() {
      if(colorTip === 'start') {
        propsManager.setProperty('startColorVarianceAlpha', this.value);        
      }
      else {
        propsManager.setProperty('finishColorVarianceAlpha', this.value);
      }

      return;
    }

    bindChangeProperty(colorTransElement, 'startColorAlpha', updateColorTrans);
    bindChangeProperty(colorTransDiffElement, 'startColorVarianceAlpha', updateColorTransDiff);
  }

  function bindChangeProperty(element, prop, listener) {
    const propsManager = window.propsManager;
    function onChange() {
      propsManager.setProperty(prop, this.value);      
    }
    // element.setAttribute('value', propsManager.getProperty(prop));
    element.value = propsManager.getProperty(prop);
    element.setAttribute('max', propsManager.getProperty(prop + 'Max'));    
    element.setAttribute('min', propsManager.getProperty(prop + 'Min'));    
    element.setAttribute('step', propsManager.getProperty(prop + 'Step'));    
    element.addEventListener('change', listener || onChange);
  }

  function initActionProps() {
    const gravityXElement = document.getElementById('gravityx');
    const gravityYElement = document.getElementById('gravityy');
    const speedElement = document.getElementById('speed');
    const speedVarElement = document.getElementById('speedVariance');
    const radAccElement = document.getElementById('radialAcceleration');
    const radAccVarElement = document.getElementById('radialAccelVariance');
    const tangAccElement = document.getElementById('tangentialAcceleration');
    const tangAccVarElement = document.getElementById('tangentialAccelVariance');
    
    bindChangeProperty(gravityXElement, 'gravityx');
    bindChangeProperty(gravityYElement, 'gravityy');

    bindChangeProperty(speedElement, 'speed');
    bindChangeProperty(speedVarElement, 'speedVariance');
    bindChangeProperty(radAccElement, 'radialAcceleration');
    bindChangeProperty(radAccVarElement, 'radialAccelVariance');
    bindChangeProperty(tangAccElement, 'tangentialAcceleration');
    bindChangeProperty(tangAccVarElement, 'tangentialAccelVariance');

    return;
  }

  function initBasicProps() {
    const durationElement = document.getElementById('duration');
    const maxParticlesElement = document.getElementById('maxParticles');
    const sourcePositionxElement = document.getElementById('sourcePositionx');
    const sourcePositionVariancexElement = document.getElementById('sourcePositionVariancex');
    const sourcePositionyElement = document.getElementById('sourcePositiony');
    const sourcePositionVarianceyElement = document.getElementById('sourcePositionVariancey');

    bindChangeProperty(durationElement, 'duration');
    bindChangeProperty(maxParticlesElement, 'maxParticles');
    bindChangeProperty(sourcePositionxElement, 'sourcePositionx');
    bindChangeProperty(sourcePositionVariancexElement, 'sourcePositionVariancex');
    bindChangeProperty(sourcePositionyElement, 'sourcePositiony');
    bindChangeProperty(sourcePositionVarianceyElement, 'sourcePositionVariancey');

    //middle
    const angleElement = document.getElementById('angle');
    const angleVarianceElement = document.getElementById('angleVariance');
    const particleLifespanElement = document.getElementById('particleLifespan');
    const particleLifespanVarianceElement = document.getElementById('particleLifespanVariance');
    const startParticleSizeElement = document.getElementById('startParticleSize');
    const startParticleSizeVarianceElement = document.getElementById('startParticleSizeVariance');

    bindChangeProperty(angleElement, 'angle');
    bindChangeProperty(angleVarianceElement, 'angleVariance');
    bindChangeProperty(particleLifespanElement, 'particleLifespan');
    bindChangeProperty(particleLifespanVarianceElement, 'particleLifespanVariance');
    bindChangeProperty(startParticleSizeElement, 'startParticleSize');
    bindChangeProperty(startParticleSizeVarianceElement, 'startParticleSizeVariance');

    //right
    const finishParticleSizeElement = document.getElementById('finishParticleSize');
    const finishParticleSizeVarianceElement = document.getElementById('finishParticleSizeVariance');
    const rotationStartElement = document.getElementById('rotationStart');
    const rotationStartVarianceElement = document.getElementById('rotationStartVariance');
    const rotationEndElement = document.getElementById('rotationEnd');
    const rotationEndVarianceElement = document.getElementById('rotationEndVariance');

    bindChangeProperty(finishParticleSizeElement, 'finishParticleSize');
    bindChangeProperty(finishParticleSizeVarianceElement, 'finishParticleSizeVariance');
    bindChangeProperty(rotationStartElement, 'rotationStart');
    bindChangeProperty(rotationStartVarianceElement, 'rotationStartVariance');
    bindChangeProperty(rotationEndElement, 'rotationEnd');
    bindChangeProperty(rotationEndVarianceElement, 'rotationEndVariance');

    return;
  }

  function initWindowItems() {
     if(!window.isOnlineVersion()) {
      const windowItems = document.querySelector('.window-items');
      windowItems.style.visibility = 'hidden';
    }
  }

  function initProps() {
    initGlobalParams();    
    initTextureProps();
    initColorProps();
    initActionProps();
    initBasicProps();
    initTabView();

    return;
  }

  function binddingMenuItem(itemId, listviewClass) {
    let fileMenu = document.getElementById(itemId);
    fileMenu.addEventListener('click', () => {
      console.debug("menu-item-file");
      let listFiles = document.querySelector(listviewClass);

      listFiles.style.visibility = 'visible';
      listFiles.style.left = fileMenu.offsetLeft + 'px';
      listFiles.style.top = fileMenu.offsetTop + fileMenu.clientHeight + 'px';
      listFiles.style.width = fileMenu.offsetWidth + 'px';

      let enterListView = false;
      listFiles.addEventListener('mouseenter', () => {
        console.debug('mouseenter');
        enterListView = true;
      });
      listFiles.addEventListener('mouseleave', () => {
        console.debug('mouseleave');
        enterListView = false;
        listFiles.style.visibility = 'hidden';
      });

      fileMenu.addEventListener('mouseleave', () => {
        setTimeout(() => {
          if(enterListView) {
            return;
          }
          listFiles.style.visibility = 'hidden';   
          console.debug('fileMenu mouseleave');
        }, 10);
      });
    });
  }

  function eventBinding() {
    function updateCenterPoint(event) {
      window.propsManager.setProperty('sourcePositionx', event.layerX);
      window.propsManager.setProperty('sourcePositiony', event.layerY);

      const sourcePositionxElement = document.getElementById('sourcePositionx');
      const sourcePositionyElement = document.getElementById('sourcePositiony');
      sourcePositionxElement.value = event.layerX;
      sourcePositionyElement.value = event.layerY;
    }

    document.getElementById('main-canvas').addEventListener('mouseup', updateCenterPoint);

    //menu bar
    binddingMenuItem('menu-item-file', '.listview-files');
    binddingMenuItem('menu-item-edit', '.listview-edit');
    binddingMenuItem('menu-item-help', '.listview-help');

    var listviewFiles = document.querySelector('.listview-files');
    var listviewEdit = document.querySelector('.listview-edit');
    var listviewHelp = document.querySelector('.listview-help');

    //sub file menu item 
    document.getElementById('list-import').addEventListener('click', () => {
      importData();
      listviewFiles.style.visibility = 'hidden';
    });

    document.getElementById('list-export').addEventListener('click', () => {
      exportData();
      listviewFiles.style.visibility = 'hidden';
    });

    document.getElementById('list-temp-star').addEventListener('click', () => {
      tempStar();
      listviewFiles.style.visibility = 'hidden';
    });

    document.getElementById('list-temp-snow').addEventListener('click',  () => {
      tempSnow();
      listviewFiles.style.visibility = 'hidden';
    });

    //sub edit menu item 
    // document.getElementById('list-preview').addEventListener('click', () => {
    //   preview();
    //   listviewEdit.style.visibility = 'hidden';
    // });

    document.getElementById('list-replay').addEventListener('click', () => {
      replay();
      listviewEdit.style.visibility = 'hidden';
    });

    document.getElementById('list-reset').addEventListener('click', () => {
      reset();
      listviewEdit.style.visibility = 'hidden';
    });

    document.getElementById('list-paint-white').addEventListener('click', () => {
      setBackgroundWhite();
      listviewEdit.style.visibility = 'hidden';
    });

    document.getElementById('list-paint-dark').addEventListener('click', () => {
      setBackgroundBlack();
      listviewEdit.style.visibility = 'hidden';
    });

    document.getElementById('list-paint-self').addEventListener('click', () => {
      setBackgroundColor();
      listviewEdit.style.visibility = 'hidden';
    });

    //sub help menu item     
    document.getElementById('list-about').addEventListener('click', () => {
      about();
      listviewHelp.style.visibility = 'hidden';
    });

    //action bar
    document.getElementById('import').addEventListener('click', () => {
      importData();
    });

    document.getElementById('import-plist').addEventListener('click', () => {
      importPlist();
    });

    document.getElementById('export').addEventListener('click', () => {
      exportData();
    });

    // document.getElementById('preview').addEventListener('click', () => {
    //   preview();
    // });

    document.getElementById('replay').addEventListener('click', () => {
      replay();
    });

    document.getElementById('reset').addEventListener('click', () => {
      reset();
    });

    document.getElementById('play-once').addEventListener('click', () => {
      playOnce();
    });

    document.getElementById('pause').addEventListener('click', () => {
      pause();
    });

    document.getElementById('resume').addEventListener('click', () => {
      resume();
    });
  }

  //file menu actions
  function importData() {
    readLocalFile({
      mutiple: false,
      type: 'txt'
      }, function(err, config) {
        if(!err) {
          try {
            window.propsManager.loadPropertys(JSON.parse(config));
          }
          catch(err) {
            console.debug(err.message);
            return;
          }
          initProps();
          window.emitter.reload(window.propsManager.getAllPropertys());
        }
    });	
  }

  function importPlist() {
    readLocalFile({
      mutiple: false,
      type: 'txt'
      }, function(err, data) {
        if(!err) {
          try {
            let plist = new PLIST();
            plist.parse(data);
            window.propsManager.loadPropertys(plist.options);
          }
          catch(err) {
            console.debug(err.message);
            return;
          }
          initProps();
          window.emitter.reload(window.propsManager.getAllPropertys());
        }
    });	
  }

  function exportData() {
    let props = window.propsManager.getAllPropertys();
    let blob = new Blob([JSON.stringify(props)], {type: "text/plain;charset=utf-8"});
		saveAs(blob, "particles.json");
  }

  function tempStar() {
    window.propsManager.loadPropertys(window.propsManager.loadTemplate('snow'));
    initProps();
    window.emitter.reload(window.propsManager.getAllPropertys());         
  }

  function tempSnow() {
    window.propsManager.loadPropertys(window.propsManager.loadTemplate('snow'));
    initProps();
    window.emitter.reload(window.propsManager.getAllPropertys());          
  }

  //edit menu actions
  function preview() {
    //TODO
  }

  function reset() {
      window.propsManager.reset();
      initProps();
      window.emitter.reload(window.propsManager.getAllPropertys());
  }

  function playOnce() {
    	window.emitter.emit(true);
  }

  function pause() {
    window.emitter.pause();
  }

  function resume() {
    window.emitter.resume();
  }

  function replay() {
      window.emitter.start();    
  }

  function setBackgroundWhite() {
    window.fillStyle = "#FFFFFF";        
  }

  function setBackgroundBlack() {
    window.fillStyle = "#000000";
  }

  function setBackgroundColor() {
    window.fillStyle = "#FFFFFF";    
  }

  function about() {
    window.open('http://studio.holaverse.cn', '_blank');
  }

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

})(this); 