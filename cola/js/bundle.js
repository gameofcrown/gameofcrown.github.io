var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

(function (window, document, Laya) {
	var __un = Laya.un,
	    __uns = Laya.uns,
	    __static = Laya.static,
	    __class = Laya.class,
	    __getset = Laya.getset,
	    __newvec = Laya.__newvec;

	var Bitmap = laya.resource.Bitmap,
	    Browser = laya.utils.Browser,
	    Event = laya.events.Event,
	    EventDispatcher = laya.events.EventDispatcher;
	var Handler = laya.utils.Handler,
	    LayaGL = laya.layagl.LayaGL,
	    Rectangle = laya.maths.Rectangle,
	    Render = laya.renders.Render;
	var Sprite = laya.display.Sprite,
	    Stage = laya.display.Stage,
	    Texture = laya.resource.Texture,
	    Utils = laya.utils.Utils;
	var WebGL = laya.webgl.WebGL,
	    WebGLContext = laya.webgl.WebGLContext;
	/**
 *使用前可用<code>supported</code>查看浏览器支持。
 */
	//class laya.device.geolocation.Geolocation
	var Geolocation = function () {
		function Geolocation() {}
		__class(Geolocation, 'laya.device.geolocation.Geolocation');
		Geolocation.getCurrentPosition = function (onSuccess, onError) {
			Geolocation.navigator.geolocation.getCurrentPosition(function (pos) {
				Geolocation.position.setPosition(pos);
				onSuccess.runWith(Geolocation.position);
			}, function (error) {
				onError.runWith(error);
			}, {
				enableHighAccuracy: laya.device.geolocation.Geolocation.enableHighAccuracy,
				timeout: laya.device.geolocation.Geolocation.timeout,
				maximumAge: laya.device.geolocation.Geolocation.maximumAge
			});
		};

		Geolocation.watchPosition = function (onSuccess, onError) {
			return Geolocation.navigator.geolocation.watchPosition(function (pos) {
				Geolocation.position.setPosition(pos);
				onSuccess.runWith(Geolocation.position);
			}, function (error) {
				onError.runWith(error);
			}, {
				enableHighAccuracy: Geolocation.enableHighAccuracy,
				timeout: Geolocation.timeout,
				maximumAge: Geolocation.maximumAge
			});
		};

		Geolocation.clearWatch = function (id) {
			Geolocation.navigator.geolocation.clearWatch(id);
		};

		Geolocation.PERMISSION_DENIED = 1;
		Geolocation.POSITION_UNAVAILABLE = 2;
		Geolocation.TIMEOUT = 3;
		Geolocation.enableHighAccuracy = false;
		Geolocation.maximumAge = 0;
		__static(Geolocation, ['navigator', function () {
			return this.navigator = Browser.window.navigator;
		}, 'position', function () {
			return this.position = new GeolocationInfo();
		}, 'supported', function () {
			return this.supported = !!Geolocation.navigator.geolocation;
		}, 'timeout', function () {
			return this.timeout = 1E10;
		}]);
		return Geolocation;
	}();

	/**
 *加速度x/y/z的单位均为m/s²。
 *在硬件（陀螺仪）不支持的情况下，alpha、beta和gamma值为null。
 *
 *@author Survivor
 */
	//class laya.device.motion.AccelerationInfo
	var AccelerationInfo = function () {
		function AccelerationInfo() {
			/**
   *x轴上的加速度值。
   */
			this.x = NaN;
			/**
   *y轴上的加速度值。
   */
			this.y = NaN;
			/**
   *z轴上的加速度值。
   */
			this.z = NaN;
		}

		__class(AccelerationInfo, 'laya.device.motion.AccelerationInfo');
		return AccelerationInfo;
	}();

	//class laya.device.geolocation.GeolocationInfo
	var GeolocationInfo = function () {
		function GeolocationInfo() {
			this.pos = null;
			this.coords = null;
		}

		__class(GeolocationInfo, 'laya.device.geolocation.GeolocationInfo');
		var __proto = GeolocationInfo.prototype;
		__proto.setPosition = function (pos) {
			this.pos = pos;
			this.coords = pos.coords;
		};

		__getset(0, __proto, 'heading', function () {
			return this.coords.heading;
		});

		__getset(0, __proto, 'latitude', function () {
			return this.coords.latitude;
		});

		__getset(0, __proto, 'altitudeAccuracy', function () {
			return this.coords.altitudeAccuracy;
		});

		__getset(0, __proto, 'longitude', function () {
			return this.coords.longitude;
		});

		__getset(0, __proto, 'altitude', function () {
			return this.coords.altitude;
		});

		__getset(0, __proto, 'accuracy', function () {
			return this.coords.accuracy;
		});

		__getset(0, __proto, 'speed', function () {
			return this.coords.speed;
		});

		__getset(0, __proto, 'timestamp', function () {
			return this.pos.timestamp;
		});

		return GeolocationInfo;
	}();

	/**
 *Media用于捕捉摄像头和麦克风。可以捕捉任意之一，或者同时捕捉两者。<code>getCamera</code>前可以使用<code>supported()</code>检查当前浏览器是否支持。
 *<b>NOTE:</b>
 *<p>目前Media在移动平台只支持Android，不支持IOS。只可在FireFox完整地使用，Chrome测试时无法捕捉视频。</p>
 */
	//class laya.device.media.Media
	var Media = function () {
		function Media() {}
		__class(Media, 'laya.device.media.Media');
		Media.supported = function () {
			return !!Browser.window.navigator.getUserMedia;
		};

		Media.getMedia = function (options, onSuccess, onError) {
			if (Browser.window.navigator.getUserMedia) {
				Browser.window.navigator.getUserMedia(options, function (stream) {
					onSuccess.runWith(Browser.window.URL.createObjectURL(stream));
				}, function (err) {
					onError.runWith(err);
				});
			}
		};

		Media.__init$ = function () {
			/*__JS__ */navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;;
		};

		return Media;
	}();

	/**
 *保存旋转信息的类。请勿修改本类的属性。
 *@author Survivor
 */
	//class laya.device.motion.RotationInfo
	var RotationInfo = function () {
		function RotationInfo() {
			/**
   *<p>
   *指示设备是否可以提供绝对方位数据（指向地球坐标系），或者设备决定的任意坐标系。
   *关于坐标系参见<i>https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Orientation_and_motion_data_explained</i>。
   *</p>
   *需要注意的是，IOS环境下，该值始终为false。即使如此，你依旧可以从<code>alpha</code>中取得正确的值。
   */
			this.absolute = false;
			/**
   *Z轴旋转角度，其值范围从0至360。
   *若<code>absolute</code>为true或者在IOS中，alpha值是从北方到当前设备方向的角度值。
   */
			this.alpha = NaN;
			/**
   *X轴旋转角度,其值范围从-180至180。代表设备从前至后的运动。
   */
			this.beta = NaN;
			/**
   *Y轴旋转角度，其值范围从-90至90。代表设备从左至右的运动。
   */
			this.gamma = NaN;
			/**
   *罗盘数据的精确度（角度）。仅IOS可用。
   */
			this.compassAccuracy = NaN;
		}

		__class(RotationInfo, 'laya.device.motion.RotationInfo');
		return RotationInfo;
	}();

	/**
 *Accelerator.instance获取唯一的Accelerator引用，请勿调用构造函数。
 *
 *<p>
 *listen()的回调处理器接受四个参数：
 *<ol>
 *<li><b>acceleration</b>:表示用户给予设备的加速度。</li>
 *<li><b>accelerationIncludingGravity</b>:设备受到的总加速度（包含重力）。</li>
 *<li><b>rotationRate</b>:设备的自转速率。</li>
 *<li><b>interval</b>:加速度获取的时间间隔（毫秒）。</li>
 *</ol>
 *</p>
 *<p>
 *<b>NOTE</b><br/>
 *如，rotationRate的alpha在apple和moz文档中都是z轴旋转角度，但是实测是x轴旋转角度。为了使各属性表示的值与文档所述相同，实际值与其他属性进行了对调。
 *其中：
 *<ul>
 *<li>alpha使用gamma值。</li>
 *<li>beta使用alpha值。</li>
 *<li>gamma使用beta。</li>
 *</ul>
 *目前孰是孰非尚未可知，以此为注。
 *</p>
 */
	//class laya.device.motion.Accelerator extends laya.events.EventDispatcher
	var Accelerator = function (_super) {
		function Accelerator(singleton) {
			Accelerator.__super.call(this);
			/*__JS__ */this.onDeviceOrientationChange = this.onDeviceOrientationChange.bind(this);
		}

		__class(Accelerator, 'laya.device.motion.Accelerator', _super);
		var __proto = Accelerator.prototype;
		/**
  *侦听加速器运动。
  *@param observer 回调函数接受4个参数，见类说明。
  */
		__proto.on = function (type, caller, listener, args) {
			_super.prototype.on.call(this, type, caller, listener, args);
			Browser.window.addEventListener('devicemotion', this.onDeviceOrientationChange);
			return this;
		};

		/**
  *取消侦听加速器。
  *@param handle 侦听加速器所用处理器。
  */
		__proto.off = function (type, caller, listener, onceOnly) {
			onceOnly === void 0 && (onceOnly = false);
			if (!this.hasListener(type)) Browser.window.removeEventListener('devicemotion', this.onDeviceOrientationChange);
			return _super.prototype.off.call(this, type, caller, listener, onceOnly);
		};

		__proto.onDeviceOrientationChange = function (e) {
			var interval = e.interval;
			Accelerator.acceleration.x = e.acceleration.x;
			Accelerator.acceleration.y = e.acceleration.y;
			Accelerator.acceleration.z = e.acceleration.z;
			Accelerator.accelerationIncludingGravity.x = e.accelerationIncludingGravity.x;
			Accelerator.accelerationIncludingGravity.y = e.accelerationIncludingGravity.y;
			Accelerator.accelerationIncludingGravity.z = e.accelerationIncludingGravity.z;
			Accelerator.rotationRate.alpha = e.rotationRate.gamma * -1;
			Accelerator.rotationRate.beta = e.rotationRate.alpha * -1;
			Accelerator.rotationRate.gamma = e.rotationRate.beta;
			if (Browser.onAndroid) {
				if (Accelerator.onChrome) {
					Accelerator.rotationRate.alpha *= 180 / Math.PI;
					Accelerator.rotationRate.beta *= 180 / Math.PI;
					Accelerator.rotationRate.gamma *= 180 / Math.PI;
				}
				Accelerator.acceleration.x *= -1;
				Accelerator.accelerationIncludingGravity.x *= -1;
			} else if (Browser.onIOS) {
				Accelerator.acceleration.y *= -1;
				Accelerator.acceleration.z *= -1;
				Accelerator.accelerationIncludingGravity.y *= -1;
				Accelerator.accelerationIncludingGravity.z *= -1;
				interval *= 1000;
			}
			this.event( /*laya.events.Event.CHANGE*/"change", [Accelerator.acceleration, Accelerator.accelerationIncludingGravity, Accelerator.rotationRate, interval]);
		};

		__getset(1, Accelerator, 'instance', function () {
			Accelerator._instance = Accelerator._instance || new Accelerator(0);
			return Accelerator._instance;
		}, laya.events.EventDispatcher._$SET_instance);

		Accelerator.getTransformedAcceleration = function (acceleration) {
			Accelerator.transformedAcceleration = Accelerator.transformedAcceleration || new AccelerationInfo();
			Accelerator.transformedAcceleration.z = acceleration.z;
			if (Browser.window.orientation == 90) {
				Accelerator.transformedAcceleration.x = acceleration.y;
				Accelerator.transformedAcceleration.y = -acceleration.x;
			} else if (Browser.window.orientation == -90) {
				Accelerator.transformedAcceleration.x = -acceleration.y;
				Accelerator.transformedAcceleration.y = acceleration.x;
			} else if (!Browser.window.orientation) {
				Accelerator.transformedAcceleration.x = acceleration.x;
				Accelerator.transformedAcceleration.y = acceleration.y;
			} else if (Browser.window.orientation == 180) {
				Accelerator.transformedAcceleration.x = -acceleration.x;
				Accelerator.transformedAcceleration.y = -acceleration.y;
			};
			var tx = NaN;
			if (Laya.stage.canvasDegree == -90) {
				tx = Accelerator.transformedAcceleration.x;
				Accelerator.transformedAcceleration.x = -Accelerator.transformedAcceleration.y;
				Accelerator.transformedAcceleration.y = tx;
			} else if (Laya.stage.canvasDegree == 90) {
				tx = Accelerator.transformedAcceleration.x;
				Accelerator.transformedAcceleration.x = Accelerator.transformedAcceleration.y;
				Accelerator.transformedAcceleration.y = -tx;
			}
			return Accelerator.transformedAcceleration;
		};

		Accelerator._instance = null;
		Accelerator.transformedAcceleration = null;
		__static(Accelerator, ['acceleration', function () {
			return this.acceleration = new AccelerationInfo();
		}, 'accelerationIncludingGravity', function () {
			return this.accelerationIncludingGravity = new AccelerationInfo();
		}, 'rotationRate', function () {
			return this.rotationRate = new RotationInfo();
		}, 'onChrome', function () {
			return this.onChrome = Browser.userAgent.indexOf("Chrome") > -1;
		}]);
		return Accelerator;
	}(EventDispatcher);

	/**
 *使用Gyroscope.instance获取唯一的Gyroscope引用，请勿调用构造函数。
 *
 *<p>
 *listen()的回调处理器接受两个参数：
 *<code>function onOrientationChange(absolute:Boolean,info:RotationInfo):void</code>
 *<ol>
 *<li><b>absolute</b>:指示设备是否可以提供绝对方位数据（指向地球坐标系），或者设备决定的任意坐标系。关于坐标系参见<i>https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Orientation_and_motion_data_explained</i>。</li>
 *<li><b>info</b>:<code>RotationInfo</code>类型参数，保存设备的旋转值。</li>
 *</ol>
 *</p>
 *
 *<p>
 *浏览器兼容性参见：<i>http://caniuse.com/#search=deviceorientation</i>
 *</p>
 */
	//class laya.device.motion.Gyroscope extends laya.events.EventDispatcher
	var Gyroscope = function (_super) {
		function Gyroscope(singleton) {
			Gyroscope.__super.call(this);
			/*__JS__ */this.onDeviceOrientationChange = this.onDeviceOrientationChange.bind(this);
		}

		__class(Gyroscope, 'laya.device.motion.Gyroscope', _super);
		var __proto = Gyroscope.prototype;
		/**
  *监视陀螺仪运动。
  *@param observer 回调函数接受一个Boolean类型的<code>absolute</code>和<code>GyroscopeInfo</code>类型参数。
  */
		__proto.on = function (type, caller, listener, args) {
			_super.prototype.on.call(this, type, caller, listener, args);
			Browser.window.addEventListener('deviceorientation', this.onDeviceOrientationChange);
			return this;
		};

		/**
  *取消指定处理器对陀螺仪的监视。
  *@param observer
  */
		__proto.off = function (type, caller, listener, onceOnly) {
			onceOnly === void 0 && (onceOnly = false);
			if (!this.hasListener(type)) Browser.window.removeEventListener('deviceorientation', this.onDeviceOrientationChange);
			return _super.prototype.off.call(this, type, caller, listener, onceOnly);
		};

		__proto.onDeviceOrientationChange = function (e) {
			Gyroscope.info.alpha = e.alpha;
			Gyroscope.info.beta = e.beta;
			Gyroscope.info.gamma = e.gamma;
			if (e.webkitCompassHeading) {
				Gyroscope.info.alpha = e.webkitCompassHeading * -1;
				Gyroscope.info.compassAccuracy = e.webkitCompassAccuracy;
			}
			this.event( /*laya.events.Event.CHANGE*/"change", [e.absolute, Gyroscope.info]);
		};

		__getset(1, Gyroscope, 'instance', function () {
			Gyroscope._instance = Gyroscope._instance || new Gyroscope(0);
			return Gyroscope._instance;
		}, laya.events.EventDispatcher._$SET_instance);

		Gyroscope._instance = null;
		__static(Gyroscope, ['info', function () {
			return this.info = new RotationInfo();
		}]);
		return Gyroscope;
	}(EventDispatcher);

	/**
 *Shake只能在支持此操作的设备上有效。
 *
 *@author Survivor
 */
	//class laya.device.Shake extends laya.events.EventDispatcher
	var Shake = function (_super) {
		function Shake() {
			this.throushold = 0;
			this.shakeInterval = 0;
			this.callback = null;
			this.lastX = NaN;
			this.lastY = NaN;
			this.lastZ = NaN;
			this.lastMillSecond = NaN;
			Shake.__super.call(this);
		}

		__class(Shake, 'laya.device.Shake', _super);
		var __proto = Shake.prototype;
		/**
  *开始响应设备摇晃。
  *@param throushold 响应的瞬时速度阈值，轻度摇晃的值约在5~10间。
  *@param timeout 设备摇晃的响应间隔时间。
  *@param callback 在设备摇晃触发时调用的处理器。
  */
		__proto.start = function (throushold, interval) {
			this.throushold = throushold;
			this.shakeInterval = interval;
			this.lastX = this.lastY = this.lastZ = NaN;
			Accelerator.instance.on( /*laya.events.Event.CHANGE*/"change", this, this.onShake);
		};

		/**
  *停止响应设备摇晃。
  */
		__proto.stop = function () {
			Accelerator.instance.off( /*laya.events.Event.CHANGE*/"change", this, this.onShake);
		};

		__proto.onShake = function (acceleration, accelerationIncludingGravity, rotationRate, interval) {
			if (isNaN(this.lastX)) {
				this.lastX = accelerationIncludingGravity.x;
				this.lastY = accelerationIncludingGravity.y;
				this.lastZ = accelerationIncludingGravity.z;
				this.lastMillSecond = Browser.now();
				return;
			};
			var deltaX = Math.abs(this.lastX - accelerationIncludingGravity.x);
			var deltaY = Math.abs(this.lastY - accelerationIncludingGravity.y);
			var deltaZ = Math.abs(this.lastZ - accelerationIncludingGravity.z);
			if (this.isShaked(deltaX, deltaY, deltaZ)) {
				var deltaMillSecond = Browser.now() - this.lastMillSecond;
				if (deltaMillSecond > this.shakeInterval) {
					this.event( /*laya.events.Event.CHANGE*/"change");
					this.lastMillSecond = Browser.now();
				}
			}
			this.lastX = accelerationIncludingGravity.x;
			this.lastY = accelerationIncludingGravity.y;
			this.lastZ = accelerationIncludingGravity.z;
		};

		// 通过任意两个分量判断是否满足摇晃设定。
		__proto.isShaked = function (deltaX, deltaY, deltaZ) {
			return deltaX > this.throushold && deltaY > this.throushold || deltaX > this.throushold && deltaZ > this.throushold || deltaY > this.throushold && deltaZ > this.throushold;
		};

		__getset(1, Shake, 'instance', function () {
			Shake._instance = Shake._instance || new Shake();
			return Shake._instance;
		}, laya.events.EventDispatcher._$SET_instance);

		Shake._instance = null;
		return Shake;
	}(EventDispatcher);

	/**
 *@private
 */
	//class laya.device.media.HtmlVideo extends laya.resource.Bitmap
	var HtmlVideo = function (_super) {
		function HtmlVideo() {
			this.video = null;
			this._source = null;
			HtmlVideo.__super.call(this);
			this._width = 1;
			this._height = 1;
			this.createDomElement();
		}

		__class(HtmlVideo, 'laya.device.media.HtmlVideo', _super);
		var __proto = HtmlVideo.prototype;
		__proto.createDomElement = function () {
			var _$this = this;
			this._source = this.video = Browser.createElement("video");
			var style = this.video.style;
			style.position = 'absolute';
			style.top = '0px';
			style.left = '0px';
			this.video.addEventListener("loadedmetadata", function () {
				this._w = _$this.video.videoWidth;
				this._h = _$this.video.videoHeight;
			}['bind'](this));
		};

		__proto.setSource = function (url, extension) {
			while (this.video.childElementCount) {
				this.video.firstChild.remove();
			}if (extension & Video.MP4) this.appendSource(url, "video/mp4");
			if (extension & Video.OGG) this.appendSource(url + ".ogg", "video/ogg");
		};

		__proto.appendSource = function (source, type) {
			var sourceElement = Browser.createElement("source");
			sourceElement.src = source;
			sourceElement.type = type;
			this.video.appendChild(sourceElement);
		};

		__proto.getVideo = function () {
			return this.video;
		};

		__proto._getSource = function () {
			return this._source;
		};

		HtmlVideo.create = function () {
			return new HtmlVideo();
		};

		return HtmlVideo;
	}(Bitmap);

	/**
 *<code>Video</code>将视频显示到Canvas上。<code>Video</code>可能不会在所有浏览器有效。
 *<p>关于Video支持的所有事件参见：<i>http://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp</i>。</p>
 *<p>
 *<b>注意：</b><br/>
 *在PC端可以在任何时机调用<code>play()</code>因此，可以在程序开始运行时就使Video开始播放。但是在移动端，只有在用户第一次触碰屏幕后才可以调用play()，所以移动端不可能在程序开始运行时就自动开始播放Video。
 *</p>
 *
 *<p>MDN Video链接： <i>https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video</i></p>
 */
	//class laya.device.media.Video extends laya.display.Sprite
	var Video = function (_super) {
		function Video(width, height) {
			this.htmlVideo = null;
			this.videoElement = null;
			this.internalTexture = null;
			width === void 0 && (width = 320);
			height === void 0 && (height = 240);
			Video.__super.call(this);
			if (Render.isConchApp || Render.isWebGL) {
				this.htmlVideo = new WebGLVideo();
			} else {
				this.htmlVideo = new HtmlVideo();
			}
			this.videoElement = this.htmlVideo.getVideo();
			this.videoElement.layaTarget = this;
			this.internalTexture = new Texture(this.htmlVideo);
			this.videoElement.addEventListener("abort", Video.onAbort);
			this.videoElement.addEventListener("canplay", Video.onCanplay);
			this.videoElement.addEventListener("canplaythrough", Video.onCanplaythrough);
			this.videoElement.addEventListener("durationchange", Video.onDurationchange);
			this.videoElement.addEventListener("emptied", Video.onEmptied);
			this.videoElement.addEventListener("error", Video.onError);
			this.videoElement.addEventListener("loadeddata", Video.onLoadeddata);
			this.videoElement.addEventListener("loadedmetadata", Video.onLoadedmetadata);
			this.videoElement.addEventListener("loadstart", Video.onLoadstart);
			this.videoElement.addEventListener("pause", Video.onPause);
			this.videoElement.addEventListener("play", Video.onPlay);
			this.videoElement.addEventListener("playing", Video.onPlaying);
			this.videoElement.addEventListener("progress", Video.onProgress);
			this.videoElement.addEventListener("ratechange", Video.onRatechange);
			this.videoElement.addEventListener("seeked", Video.onSeeked);
			this.videoElement.addEventListener("seeking", Video.onSeeking);
			this.videoElement.addEventListener("stalled", Video.onStalled);
			this.videoElement.addEventListener("suspend", Video.onSuspend);
			this.videoElement.addEventListener("timeupdate", Video.onTimeupdate);
			this.videoElement.addEventListener("volumechange", Video.onVolumechange);
			this.videoElement.addEventListener("waiting", Video.onWaiting);
			this.videoElement.addEventListener("ended", this.onPlayComplete['bind'](this));
			this.size(width, height);
			if (Browser.onMobile) {
				/*__JS__ */this.onDocumentClick = this.onDocumentClick.bind(this);
				Browser.document.addEventListener("touchend", this.onDocumentClick);
			}
		}

		__class(Video, 'laya.device.media.Video', _super);
		var __proto = Video.prototype;
		__proto.onPlayComplete = function (e) {
			this.event("ended");
			if (!Render.isConchApp || !this.videoElement.loop) Laya.timer.clear(this, this.renderCanvas);
		};

		/**
  *设置播放源。
  *@param url 播放源路径。
  */
		__proto.load = function (url) {
			if (url.indexOf("blob:") == 0) this.videoElement.src = url;else this.htmlVideo.setSource(url, laya.device.media.Video.MP4);
		};

		/**
  *开始播放视频。
  */
		__proto.play = function () {
			this.videoElement.play();
			Laya.timer.frameLoop(1, this, this.renderCanvas);
		};

		/**
  *暂停视频播放。
  */
		__proto.pause = function () {
			this.videoElement.pause();
			Laya.timer.clear(this, this.renderCanvas);
		};

		/**
  *重新加载视频。
  */
		__proto.reload = function () {
			this.videoElement.load();
		};

		/**
  *检测是否支持播放指定格式视频。
  *@param type 参数为Video.MP4 / Video.OGG / Video.WEBM之一。
  *@return 表示支持的级别。可能的值：
  *<ul>
  *<li>"probably"，Video.SUPPORT_PROBABLY-浏览器最可能支持该音频/视频类型</li>
  *<li>"maybe"，Video.SUPPORT_MAYBY-浏览器也许支持该音频/视频类型</li>
  *<li>""，Video.SUPPORT_NO-（空字符串）浏览器不支持该音频/视频类型</li>
  *</ul>
  */
		__proto.canPlayType = function (type) {
			var typeString;
			switch (type) {
				case laya.device.media.Video.MP4:
					typeString = "video/mp4";
					break;
				case laya.device.media.Video.OGG:
					typeString = "video/ogg";
					break;
				case laya.device.media.Video.WEBM:
					typeString = "video/webm";
					break;
			}
			return this.videoElement.canPlayType(typeString);
		};

		__proto.renderCanvas = function () {
			if (this.readyState === 0) return;
			if (Render.isConchApp || Render.isWebGL) this.htmlVideo['updateTexture']();
			this.graphics.clear();
			this.graphics.drawTexture(this.internalTexture, 0, 0, this.width, this.height);
		};

		__proto.onDocumentClick = function () {
			this.videoElement.play();
			this.videoElement.pause();
			Browser.document.removeEventListener("touchend", this.onDocumentClick);
		};

		__proto.size = function (width, height) {
			_super.prototype.size.call(this, width, height);
			if (Render.isConchApp) {
				var transform = Utils.getTransformRelativeToWindow(this, 0, 0);
				this.videoElement.width = width * transform.scaleX;
			} else {
				this.videoElement.width = width / Browser.pixelRatio;
			}
			if (this.paused) this.renderCanvas();
			return this;
		};

		/**
  *销毁内部事件绑定。
  */
		__proto.destroy = function (detroyChildren) {
			detroyChildren === void 0 && (detroyChildren = true);
			_super.prototype.destroy.call(this, detroyChildren);
			this.videoElement.removeEventListener("abort", Video.onAbort);
			this.videoElement.removeEventListener("canplay", Video.onCanplay);
			this.videoElement.removeEventListener("canplaythrough", Video.onCanplaythrough);
			this.videoElement.removeEventListener("durationchange", Video.onDurationchange);
			this.videoElement.removeEventListener("emptied", Video.onEmptied);
			this.videoElement.removeEventListener("error", Video.onError);
			this.videoElement.removeEventListener("loadeddata", Video.onLoadeddata);
			this.videoElement.removeEventListener("loadedmetadata", Video.onLoadedmetadata);
			this.videoElement.removeEventListener("loadstart", Video.onLoadstart);
			this.videoElement.removeEventListener("pause", Video.onPause);
			this.videoElement.removeEventListener("play", Video.onPlay);
			this.videoElement.removeEventListener("playing", Video.onPlaying);
			this.videoElement.removeEventListener("progress", Video.onProgress);
			this.videoElement.removeEventListener("ratechange", Video.onRatechange);
			this.videoElement.removeEventListener("seeked", Video.onSeeked);
			this.videoElement.removeEventListener("seeking", Video.onSeeking);
			this.videoElement.removeEventListener("stalled", Video.onStalled);
			this.videoElement.removeEventListener("suspend", Video.onSuspend);
			this.videoElement.removeEventListener("timeupdate", Video.onTimeupdate);
			this.videoElement.removeEventListener("volumechange", Video.onVolumechange);
			this.videoElement.removeEventListener("waiting", Video.onWaiting);
			this.videoElement.removeEventListener("ended", this.onPlayComplete);
			this.pause();
			this.videoElement.layaTarget = null;
			this.videoElement = null;
			this.htmlVideo.destroy();
		};

		__proto.syncVideoPosition = function () {
			var stage = Laya.stage;
			var rec;
			rec = Utils.getGlobalPosAndScale(this);
			var a = stage._canvasTransform.a,
			    d = stage._canvasTransform.d;
			var x = rec.x * stage.clientScaleX * a + stage.offset.x;
			var y = rec.y * stage.clientScaleY * d + stage.offset.y;
			this.videoElement.style.left = x + 'px';;
			this.videoElement.style.top = y + 'px';
			this.videoElement.width = this.width / Browser.pixelRatio;
			this.videoElement.height = this.height / Browser.pixelRatio;
		};

		/**
  *buffered 属性返回 TimeRanges(JS)对象。TimeRanges 对象表示用户的音视频缓冲范围。缓冲范围指的是已缓冲音视频的时间范围。如果用户在音视频中跳跃播放，会得到多个缓冲范围。
  *<p>buffered.length返回缓冲范围个数。如获取第一个缓冲范围则是buffered.start(0)和buffered.end(0)。以秒计。</p>
  *@return TimeRanges(JS)对象
  */
		__getset(0, __proto, 'buffered', function () {
			return this.videoElement.buffered;
		});

		/**
  *获取视频源尺寸。ready事件触发后可用。
  */
		__getset(0, __proto, 'videoWidth', function () {
			return this.videoElement.videoWidth;
		});

		/**
  *获取当前播放源路径。
  */
		__getset(0, __proto, 'currentSrc', function () {
			return this.videoElement.currentSrc;
		});

		/**
  *设置和获取当前播放头位置。
  */
		__getset(0, __proto, 'currentTime', function () {
			return this.videoElement.currentTime;
		}, function (value) {
			this.videoElement.currentTime = value;
			this.renderCanvas();
		});

		/**
  *返回音频/视频的播放是否已结束
  */
		__getset(0, __proto, 'ended', function () {
			return this.videoElement.ended;
		});

		/**
  *设置和获取当前音量。
  */
		__getset(0, __proto, 'volume', function () {
			return this.videoElement.volume;
		}, function (value) {
			this.videoElement.volume = value;
		});

		__getset(0, __proto, 'videoHeight', function () {
			return this.videoElement.videoHeight;
		});

		/**
  *表示视频元素的就绪状态：
  *<ul>
  *<li>0=HAVE_NOTHING-没有关于音频/视频是否就绪的信息</li>
  *<li>1=HAVE_METADATA-关于音频/视频就绪的元数据</li>
  *<li>2=HAVE_CURRENT_DATA-关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒</li>
  *<li>3=HAVE_FUTURE_DATA-当前及至少下一帧的数据是可用的</li>
  *<li>4=HAVE_ENOUGH_DATA-可用数据足以开始播放</li>
  *</ul>
  */
		__getset(0, __proto, 'readyState', function () {
			return this.videoElement.readyState;
		});

		/**
  *获取视频长度（秒）。ready事件触发后可用。
  */
		__getset(0, __proto, 'duration', function () {
			return this.videoElement.duration;
		});

		/**
  *返回表示音频/视频错误状态的 MediaError（JS）对象。
  */
		__getset(0, __proto, 'error', function () {
			return this.videoElement.error;
		});

		/**
  *设置或返回音频/视频是否应在结束时重新播放。
  */
		__getset(0, __proto, 'loop', function () {
			return this.videoElement.loop;
		}, function (value) {
			this.videoElement.loop = value;
		});

		/**
  *设置视频的x坐标
  */
		__getset(0, __proto, 'x', _super.prototype._$get_x, function (val) {
			Laya.superSet(Sprite, this, 'x', val);
			if (Render.isConchApp) {
				var transform = Utils.getTransformRelativeToWindow(this, 0, 0);
				this.videoElement.style.left = transform.x;
			}
		});

		/**
  *设置视频的y坐标
  */
		__getset(0, __proto, 'y', _super.prototype._$get_y, function (val) {
			Laya.superSet(Sprite, this, 'y', val);
			if (Render.isConchApp) {
				var transform = Utils.getTransformRelativeToWindow(this, 0, 0);
				this.videoElement.style.top = transform.y;
			}
		});

		/**
  *playbackRate 属性设置或返回音频/视频的当前播放速度。如：
  *<ul>
  *<li>1.0 正常速度</li>
  *<li>0.5 半速（更慢）</li>
  *<li>2.0 倍速（更快）</li>
  *<li>-1.0 向后，正常速度</li>
  *<li>-0.5 向后，半速</li>
  *</ul>
  *<p>只有 Google Chrome 和 Safari 支持 playbackRate 属性。</p>
  */
		__getset(0, __proto, 'playbackRate', function () {
			return this.videoElement.playbackRate;
		}, function (value) {
			this.videoElement.playbackRate = value;
		});

		/**
  *获取和设置静音状态。
  */
		__getset(0, __proto, 'muted', function () {
			return this.videoElement.muted;
		}, function (value) {
			this.videoElement.muted = value;
		});

		/**
  *返回视频是否暂停
  */
		__getset(0, __proto, 'paused', function () {
			return this.videoElement.paused;
		});

		/**
  *preload 属性设置或返回是否在页面加载后立即加载视频。可赋值如下：
  *<ul>
  *<li>auto 指示一旦页面加载，则开始加载视频。</li>
  *<li>metadata 指示当页面加载后仅加载音频/视频的元数据。</li>
  *<li>none 指示页面加载后不应加载音频/视频。</li>
  *</ul>
  */
		__getset(0, __proto, 'preload', function () {
			return this.videoElement.preload;
		}, function (value) {
			this.videoElement.preload = value;
		});

		/**
  *参见 <i>http://www.w3school.com.cn/tags/av_prop_seekable.asp</i>。
  */
		__getset(0, __proto, 'seekable', function () {
			return this.videoElement.seekable;
		});

		/**
  *seeking 属性返回用户目前是否在音频/视频中寻址。
  *寻址中（Seeking）指的是用户在音频/视频中移动/跳跃到新的位置。
  */
		__getset(0, __proto, 'seeking', function () {
			return this.videoElement.seeking;
		});

		__getset(0, __proto, 'width', _super.prototype._$get_width, function (value) {
			if (Render.isConchApp) {
				var transform = Utils.getTransformRelativeToWindow(this, 0, 0);
				this.videoElement.width = value * transform.scaleX;
			} else {
				this.videoElement.width = this.width / Browser.pixelRatio;
			}
			Laya.superSet(Sprite, this, 'width', value);
			if (this.paused) this.renderCanvas();
		});

		__getset(0, __proto, 'height', _super.prototype._$get_height, function (value) {
			if (Render.isConchApp) {
				var transform = Utils.getTransformRelativeToWindow(this, 0, 0);
				this.videoElement.height = value * transform.scaleY;
			} else {
				this.videoElement.height = this.height / Browser.pixelRatio;
			}
			Laya.superSet(Sprite, this, 'height', value);
		});

		Video.onAbort = function (e) {
			e.target.layaTarget.event("abort");
		};
		Video.onCanplay = function (e) {
			e.target.layaTarget.event("canplay");
		};
		Video.onCanplaythrough = function (e) {
			e.target.layaTarget.event("canplaythrough");
		};
		Video.onDurationchange = function (e) {
			e.target.layaTarget.event("durationchange");
		};
		Video.onEmptied = function (e) {
			e.target.layaTarget.event("emptied");
		};
		Video.onError = function (e) {
			e.target.layaTarget.event("error");
		};
		Video.onLoadeddata = function (e) {
			e.target.layaTarget.event("loadeddata");
		};
		Video.onLoadedmetadata = function (e) {
			e.target.layaTarget.event("loadedmetadata");
		};
		Video.onLoadstart = function (e) {
			e.target.layaTarget.event("loadstart");
		};
		Video.onPause = function (e) {
			e.target.layaTarget.event("pause");
		};
		Video.onPlay = function (e) {
			e.target.layaTarget.event("play");
		};
		Video.onPlaying = function (e) {
			e.target.layaTarget.event("playing");
		};
		Video.onProgress = function (e) {
			e.target.layaTarget.event("progress");
		};
		Video.onRatechange = function (e) {
			e.target.layaTarget.event("ratechange");
		};
		Video.onSeeked = function (e) {
			e.target.layaTarget.event("seeked");
		};
		Video.onSeeking = function (e) {
			e.target.layaTarget.event("seeking");
		};
		Video.onStalled = function (e) {
			e.target.layaTarget.event("stalled");
		};
		Video.onSuspend = function (e) {
			e.target.layaTarget.event("suspend");
		};
		Video.onTimeupdate = function (e) {
			e.target.layaTarget.event("timeupdate");
		};
		Video.onVolumechange = function (e) {
			e.target.layaTarget.event("volumechange");
		};
		Video.onWaiting = function (e) {
			e.target.layaTarget.event("waiting");
		};
		Video.MP4 = 1;
		Video.OGG = 2;
		Video.CAMERA = 4;
		Video.WEBM = 8;
		Video.SUPPORT_PROBABLY = "probably";
		Video.SUPPORT_MAYBY = "maybe";
		Video.SUPPORT_NO = "";
		return Video;
	}(Sprite);

	/**
 *@private
 */
	//class laya.device.media.WebGLVideo extends laya.device.media.HtmlVideo
	var WebGLVideo = function (_super) {
		function WebGLVideo() {
			this.gl = null;
			this.preTarget = null;
			this.preTexture = null;
			WebGLVideo.__super.call(this);
			if (!Render.isConchApp && Browser.onIPhone) return;
			this.gl = /*__JS__ */Render.isConchApp ? LayaGLContext.instance : WebGL.mainContext;
			this._source = this.gl.createTexture();
			WebGLContext.bindTexture(this.gl, /*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, this._source);
			this.gl.texParameteri( /*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, /*laya.webgl.WebGLContext.TEXTURE_WRAP_S*/0x2802, /*laya.webgl.WebGLContext.CLAMP_TO_EDGE*/0x812F);
			this.gl.texParameteri( /*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, /*laya.webgl.WebGLContext.TEXTURE_WRAP_T*/0x2803, /*laya.webgl.WebGLContext.CLAMP_TO_EDGE*/0x812F);
			this.gl.texParameteri( /*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, /*laya.webgl.WebGLContext.TEXTURE_MAG_FILTER*/0x2800, /*laya.webgl.WebGLContext.LINEAR*/0x2601);
			this.gl.texParameteri( /*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, /*laya.webgl.WebGLContext.TEXTURE_MIN_FILTER*/0x2801, /*laya.webgl.WebGLContext.LINEAR*/0x2601);
			WebGLContext.bindTexture(this.gl, /*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, null);
		}

		__class(WebGLVideo, 'laya.device.media.WebGLVideo', _super);
		var __proto = WebGLVideo.prototype;
		//(preTarget && preTexture)&& (WebGLContext.bindTexture(gl,preTarget,preTexture));
		__proto.updateTexture = function () {
			if (!Render.isConchApp && Browser.onIPhone) return;
			WebGLContext.bindTexture(this.gl, /*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, this._source);
			this.gl.texImage2D( /*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, 0, /*laya.webgl.WebGLContext.RGB*/0x1907, /*laya.webgl.WebGLContext.RGB*/0x1907, /*laya.webgl.WebGLContext.UNSIGNED_BYTE*/0x1401, this.video);
			WebGLVideo.curBindSource = this._source;
		};

		__proto.destroy = function () {
			if (this._source) {
				this.gl = /*__JS__ */Render.isConchApp ? LayaGLContext.instance : WebGL.mainContext;
				if (WebGLVideo.curBindSource == this._source) {
					WebGLContext.bindTexture(this.gl, /*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, null);
					WebGLVideo.curBindSource = null;
				}
				this.gl.deleteTexture(this._source);
			}
			laya.resource.Resource.prototype.destroy.call(this);
		};

		__getset(0, __proto, '_glTexture', function () {
			return this._source;
		});

		WebGLVideo.curBindSource = null;
		return WebGLVideo;
	}(HtmlVideo);

	Laya.__init([Media]);
})(window, document, Laya);

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**This class is automatically generated by LayaAirIDE, please do not make any modifications. */


var _MainScene = require("./script/MainScene");

var _MainScene2 = _interopRequireDefault(_MainScene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameConfig = function () {
    function GameConfig() {
        _classCallCheck(this, GameConfig);
    }

    _createClass(GameConfig, null, [{
        key: "init",
        value: function init() {
            //注册Script或者Runtime引用
            var reg = Laya.ClassUtils.regClass;
            reg("script/MainScene.js", _MainScene2.default);
        }
    }]);

    return GameConfig;
}();

exports.default = GameConfig;

GameConfig.width = 640;
GameConfig.height = 1136;
GameConfig.scaleMode = "exactfit";
GameConfig.screenMode = "none";
GameConfig.alignV = "top";
GameConfig.alignH = "left";
GameConfig.startScene = "Main.scene";
GameConfig.sceneRoot = "";
GameConfig.debug = false;
GameConfig.stat = false;
GameConfig.physicsDebug = false;
GameConfig.exportSceneToJson = true;

GameConfig.init();

},{"./script/MainScene":4}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameConfig = require("./GameConfig");

var _GameConfig2 = _interopRequireDefault(_GameConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = function () {
	function Main() {
		_classCallCheck(this, Main);

		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(_GameConfig2.default.width, _GameConfig2.default.height);else Laya.init(_GameConfig2.default.width, _GameConfig2.default.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = _GameConfig2.default.scaleMode;
		Laya.stage.screenMode = _GameConfig2.default.screenMode;
		Laya.stage.alignV = _GameConfig2.default.alignV;
		Laya.stage.alignH = _GameConfig2.default.alignH;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = _GameConfig2.default.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (_GameConfig2.default.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (_GameConfig2.default.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (_GameConfig2.default.stat) Laya.Stat.show();
		Laya.alertGlobalError = true;

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	_createClass(Main, [{
		key: "onVersionLoaded",
		value: function onVersionLoaded() {
			//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
			Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
		}
	}, {
		key: "onConfigLoaded",
		value: function onConfigLoaded() {
			//加载IDE指定的场景
			_GameConfig2.default.startScene && Laya.Scene.open(_GameConfig2.default.startScene);
		}
	}]);

	return Main;
}();
//激活启动类


new Main();

},{"./GameConfig":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _laya = require("../../bin/libs/laya.device");

var _laya2 = _interopRequireDefault(_laya);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import  "../../bin/libs/laya.core"


var shakeCount = 0;

var MainScene = function (_Laya$Scene) {
	_inherits(MainScene, _Laya$Scene);

	_createClass(MainScene, [{
		key: "updateshaketimes",
		value: function updateshaketimes(times) {
			this.m_Shake_Text.text = times + "";
		}
	}, {
		key: "startShake",
		value: function startShake() {
			this.m_Shake_Text.text = shakeCount + "";
			var Shake = Laya.Shake;
			if (Shake == null) {
				return;
			}
			Shake.instance.start(5, 500);
			Shake.instance.on(Laya.Event.CHANGE, this, this.onShake);
			//console.text = '开始接收设备摇动\n';
			console.log('开始接收设备摇动\n');
		}
	}, {
		key: "onShake",
		value: function onShake() {
			var Shake = Laya.Shake;

			shakeCount++;

			//console.text += "设备摇晃了" + shakeCount + "次\n";
			console.log("设备摇晃了" + shakeCount + "次\n");
			this.m_Shake_Text.text = shakeCount + "";
			if (shakeCount >= 3) {
				//Shake.instance.stop();

				//console.text += "停止接收设备摇动";
				//console.log('停止接收设备摇动\n');
			}
		}
	}]);

	function MainScene() {
		_classCallCheck(this, MainScene);

		var _this = _possibleConstructorReturn(this, (MainScene.__proto__ || Object.getPrototypeOf(MainScene)).call(this));

		window.g_Main_Scene = _this;
		_this.loadScene("Main.scene");
		_this.startShake();
		return _this;
	}

	_createClass(MainScene, [{
		key: "onEnable",
		value: function onEnable() {}
	}]);

	return MainScene;
}(Laya.Scene);

exports.default = MainScene;

},{"../../bin/libs/laya.device":1}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL0xheWFBaXJJREUvcmVzb3VyY2VzL2FwcC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYmluL2xpYnMvbGF5YS5kZXZpY2UuanMiLCJzcmMvR2FtZUNvbmZpZy5qcyIsInNyYy9NYWluLmpzIiwic3JjL3NjcmlwdC9NYWluU2NlbmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDVEEsQ0FBQyxVQUFTLE1BQVQsRUFBZ0IsUUFBaEIsRUFBeUIsSUFBekIsRUFBOEI7QUFDOUIsS0FBSSxPQUFLLEtBQUssRUFBZDtBQUFBLEtBQWlCLFFBQU0sS0FBSyxHQUE1QjtBQUFBLEtBQWdDLFdBQVMsS0FBSyxNQUE5QztBQUFBLEtBQXFELFVBQVEsS0FBSyxLQUFsRTtBQUFBLEtBQXdFLFdBQVMsS0FBSyxNQUF0RjtBQUFBLEtBQTZGLFdBQVMsS0FBSyxRQUEzRzs7QUFFQSxLQUFJLFNBQU8sS0FBSyxRQUFMLENBQWMsTUFBekI7QUFBQSxLQUFnQyxVQUFRLEtBQUssS0FBTCxDQUFXLE9BQW5EO0FBQUEsS0FBMkQsUUFBTSxLQUFLLE1BQUwsQ0FBWSxLQUE3RTtBQUFBLEtBQW1GLGtCQUFnQixLQUFLLE1BQUwsQ0FBWSxlQUEvRztBQUNBLEtBQUksVUFBUSxLQUFLLEtBQUwsQ0FBVyxPQUF2QjtBQUFBLEtBQStCLFNBQU8sS0FBSyxNQUFMLENBQVksTUFBbEQ7QUFBQSxLQUF5RCxZQUFVLEtBQUssS0FBTCxDQUFXLFNBQTlFO0FBQUEsS0FBd0YsU0FBTyxLQUFLLE9BQUwsQ0FBYSxNQUE1RztBQUNBLEtBQUksU0FBTyxLQUFLLE9BQUwsQ0FBYSxNQUF4QjtBQUFBLEtBQStCLFFBQU0sS0FBSyxPQUFMLENBQWEsS0FBbEQ7QUFBQSxLQUF3RCxVQUFRLEtBQUssUUFBTCxDQUFjLE9BQTlFO0FBQUEsS0FBc0YsUUFBTSxLQUFLLEtB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RWhCLFNBQU8sWUFBUDtBQUNNLFFBQUssU0FBTCxDQUFlLFlBQWY7QUFDQSxRQUFLLFVBQUw7QUFKVTtBQUtoQjs7Ozs2QkFDVSxDQUNWOzs7O0VBMUNxQyxLQUFLLEs7O2tCQUF2QixTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlxyXG4oZnVuY3Rpb24od2luZG93LGRvY3VtZW50LExheWEpe1xyXG5cdHZhciBfX3VuPUxheWEudW4sX191bnM9TGF5YS51bnMsX19zdGF0aWM9TGF5YS5zdGF0aWMsX19jbGFzcz1MYXlhLmNsYXNzLF9fZ2V0c2V0PUxheWEuZ2V0c2V0LF9fbmV3dmVjPUxheWEuX19uZXd2ZWM7XHJcblxyXG5cdHZhciBCaXRtYXA9bGF5YS5yZXNvdXJjZS5CaXRtYXAsQnJvd3Nlcj1sYXlhLnV0aWxzLkJyb3dzZXIsRXZlbnQ9bGF5YS5ldmVudHMuRXZlbnQsRXZlbnREaXNwYXRjaGVyPWxheWEuZXZlbnRzLkV2ZW50RGlzcGF0Y2hlcjtcclxuXHR2YXIgSGFuZGxlcj1sYXlhLnV0aWxzLkhhbmRsZXIsTGF5YUdMPWxheWEubGF5YWdsLkxheWFHTCxSZWN0YW5nbGU9bGF5YS5tYXRocy5SZWN0YW5nbGUsUmVuZGVyPWxheWEucmVuZGVycy5SZW5kZXI7XHJcblx0dmFyIFNwcml0ZT1sYXlhLmRpc3BsYXkuU3ByaXRlLFN0YWdlPWxheWEuZGlzcGxheS5TdGFnZSxUZXh0dXJlPWxheWEucmVzb3VyY2UuVGV4dHVyZSxVdGlscz1sYXlhLnV0aWxzLlV0aWxzO1xyXG5cdHZhciBXZWJHTD1sYXlhLndlYmdsLldlYkdMLFdlYkdMQ29udGV4dD1sYXlhLndlYmdsLldlYkdMQ29udGV4dDtcclxuLyoqXHJcbirkvb/nlKjliY3lj6/nlKg8Y29kZT5zdXBwb3J0ZWQ8L2NvZGU+5p+l55yL5rWP6KeI5Zmo5pSv5oyB44CCXHJcbiovXHJcbi8vY2xhc3MgbGF5YS5kZXZpY2UuZ2VvbG9jYXRpb24uR2VvbG9jYXRpb25cclxudmFyIEdlb2xvY2F0aW9uPShmdW5jdGlvbigpe1xyXG5cdGZ1bmN0aW9uIEdlb2xvY2F0aW9uKCl7fVxyXG5cdF9fY2xhc3MoR2VvbG9jYXRpb24sJ2xheWEuZGV2aWNlLmdlb2xvY2F0aW9uLkdlb2xvY2F0aW9uJyk7XHJcblx0R2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uPWZ1bmN0aW9uKG9uU3VjY2VzcyxvbkVycm9yKXtcclxuXHRcdEdlb2xvY2F0aW9uLm5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oZnVuY3Rpb24ocG9zKXtcclxuXHRcdFx0R2VvbG9jYXRpb24ucG9zaXRpb24uc2V0UG9zaXRpb24ocG9zKTtcclxuXHRcdFx0b25TdWNjZXNzLnJ1bldpdGgoR2VvbG9jYXRpb24ucG9zaXRpb24pO1xyXG5cdFx0fSxcclxuXHRcdGZ1bmN0aW9uKGVycm9yKXtcclxuXHRcdFx0b25FcnJvci5ydW5XaXRoKGVycm9yKTtcclxuXHRcdFx0fSx7XHJcblx0XHRcdGVuYWJsZUhpZ2hBY2N1cmFjeSA6bGF5YS5kZXZpY2UuZ2VvbG9jYXRpb24uR2VvbG9jYXRpb24uZW5hYmxlSGlnaEFjY3VyYWN5LFxyXG5cdFx0XHR0aW1lb3V0IDpsYXlhLmRldmljZS5nZW9sb2NhdGlvbi5HZW9sb2NhdGlvbi50aW1lb3V0LFxyXG5cdFx0XHRtYXhpbXVtQWdlIDpsYXlhLmRldmljZS5nZW9sb2NhdGlvbi5HZW9sb2NhdGlvbi5tYXhpbXVtQWdlXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdEdlb2xvY2F0aW9uLndhdGNoUG9zaXRpb249ZnVuY3Rpb24ob25TdWNjZXNzLG9uRXJyb3Ipe1xyXG5cdFx0cmV0dXJuIEdlb2xvY2F0aW9uLm5hdmlnYXRvci5nZW9sb2NhdGlvbi53YXRjaFBvc2l0aW9uKGZ1bmN0aW9uKHBvcyl7XHJcblx0XHRcdEdlb2xvY2F0aW9uLnBvc2l0aW9uLnNldFBvc2l0aW9uKHBvcyk7XHJcblx0XHRcdG9uU3VjY2Vzcy5ydW5XaXRoKEdlb2xvY2F0aW9uLnBvc2l0aW9uKTtcclxuXHRcdH0sXHJcblx0XHRmdW5jdGlvbihlcnJvcil7XHJcblx0XHRcdG9uRXJyb3IucnVuV2l0aChlcnJvcik7XHJcblx0XHRcdH0se1xyXG5cdFx0XHRlbmFibGVIaWdoQWNjdXJhY3kgOkdlb2xvY2F0aW9uLmVuYWJsZUhpZ2hBY2N1cmFjeSxcclxuXHRcdFx0dGltZW91dCA6R2VvbG9jYXRpb24udGltZW91dCxcclxuXHRcdFx0bWF4aW11bUFnZSA6R2VvbG9jYXRpb24ubWF4aW11bUFnZVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRHZW9sb2NhdGlvbi5jbGVhcldhdGNoPWZ1bmN0aW9uKGlkKXtcclxuXHRcdEdlb2xvY2F0aW9uLm5hdmlnYXRvci5nZW9sb2NhdGlvbi5jbGVhcldhdGNoKGlkKTtcclxuXHR9XHJcblxyXG5cdEdlb2xvY2F0aW9uLlBFUk1JU1NJT05fREVOSUVEPTE7XHJcblx0R2VvbG9jYXRpb24uUE9TSVRJT05fVU5BVkFJTEFCTEU9MjtcclxuXHRHZW9sb2NhdGlvbi5USU1FT1VUPTM7XHJcblx0R2VvbG9jYXRpb24uZW5hYmxlSGlnaEFjY3VyYWN5PWZhbHNlO1xyXG5cdEdlb2xvY2F0aW9uLm1heGltdW1BZ2U9MDtcclxuXHRfX3N0YXRpYyhHZW9sb2NhdGlvbixcclxuXHRbJ25hdmlnYXRvcicsZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5uYXZpZ2F0b3I9QnJvd3Nlci53aW5kb3cubmF2aWdhdG9yO30sJ3Bvc2l0aW9uJyxmdW5jdGlvbigpe3JldHVybiB0aGlzLnBvc2l0aW9uPW5ldyBHZW9sb2NhdGlvbkluZm8oKTt9LCdzdXBwb3J0ZWQnLGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc3VwcG9ydGVkPSEhR2VvbG9jYXRpb24ubmF2aWdhdG9yLmdlb2xvY2F0aW9uO30sJ3RpbWVvdXQnLGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudGltZW91dD0xRTEwO31cclxuXHRdKTtcclxuXHRyZXR1cm4gR2VvbG9jYXRpb247XHJcbn0pKClcclxuXHJcblxyXG4vKipcclxuKuWKoOmAn+W6pngveS9655qE5Y2V5L2N5Z2H5Li6bS9zwrLjgIJcclxuKuWcqOehrOS7tu+8iOmZgOieuuS7qu+8ieS4jeaUr+aMgeeahOaDheWGteS4i++8jGFscGhh44CBYmV0YeWSjGdhbW1h5YC85Li6bnVsbOOAglxyXG4qXHJcbipAYXV0aG9yIFN1cnZpdm9yXHJcbiovXHJcbi8vY2xhc3MgbGF5YS5kZXZpY2UubW90aW9uLkFjY2VsZXJhdGlvbkluZm9cclxudmFyIEFjY2VsZXJhdGlvbkluZm89KGZ1bmN0aW9uKCl7XHJcblx0ZnVuY3Rpb24gQWNjZWxlcmF0aW9uSW5mbygpe1xyXG5cdFx0LyoqXHJcblx0XHQqeOi9tOS4iueahOWKoOmAn+W6puWAvOOAglxyXG5cdFx0Ki9cclxuXHRcdHRoaXMueD1OYU47XHJcblx0XHQvKipcclxuXHRcdCp56L205LiK55qE5Yqg6YCf5bqm5YC844CCXHJcblx0XHQqL1xyXG5cdFx0dGhpcy55PU5hTjtcclxuXHRcdC8qKlxyXG5cdFx0KnrovbTkuIrnmoTliqDpgJ/luqblgLzjgIJcclxuXHRcdCovXHJcblx0XHR0aGlzLno9TmFOO1xyXG5cdH1cclxuXHJcblx0X19jbGFzcyhBY2NlbGVyYXRpb25JbmZvLCdsYXlhLmRldmljZS5tb3Rpb24uQWNjZWxlcmF0aW9uSW5mbycpO1xyXG5cdHJldHVybiBBY2NlbGVyYXRpb25JbmZvO1xyXG59KSgpXHJcblxyXG5cclxuLy9jbGFzcyBsYXlhLmRldmljZS5nZW9sb2NhdGlvbi5HZW9sb2NhdGlvbkluZm9cclxudmFyIEdlb2xvY2F0aW9uSW5mbz0oZnVuY3Rpb24oKXtcclxuXHRmdW5jdGlvbiBHZW9sb2NhdGlvbkluZm8oKXtcclxuXHRcdHRoaXMucG9zPW51bGw7XHJcblx0XHR0aGlzLmNvb3Jkcz1udWxsO1xyXG5cdH1cclxuXHJcblx0X19jbGFzcyhHZW9sb2NhdGlvbkluZm8sJ2xheWEuZGV2aWNlLmdlb2xvY2F0aW9uLkdlb2xvY2F0aW9uSW5mbycpO1xyXG5cdHZhciBfX3Byb3RvPUdlb2xvY2F0aW9uSW5mby5wcm90b3R5cGU7XHJcblx0X19wcm90by5zZXRQb3NpdGlvbj1mdW5jdGlvbihwb3Mpe1xyXG5cdFx0dGhpcy5wb3M9cG9zO1xyXG5cdFx0dGhpcy5jb29yZHM9cG9zLmNvb3JkcztcclxuXHR9XHJcblxyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywnaGVhZGluZycsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLmNvb3Jkcy5oZWFkaW5nO1xyXG5cdH0pO1xyXG5cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ2xhdGl0dWRlJyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29vcmRzLmxhdGl0dWRlO1xyXG5cdH0pO1xyXG5cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ2FsdGl0dWRlQWNjdXJhY3knLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb29yZHMuYWx0aXR1ZGVBY2N1cmFjeTtcclxuXHR9KTtcclxuXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCdsb25naXR1ZGUnLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb29yZHMubG9uZ2l0dWRlO1xyXG5cdH0pO1xyXG5cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ2FsdGl0dWRlJyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29vcmRzLmFsdGl0dWRlO1xyXG5cdH0pO1xyXG5cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ2FjY3VyYWN5JyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29vcmRzLmFjY3VyYWN5O1xyXG5cdH0pO1xyXG5cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ3NwZWVkJyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29vcmRzLnNwZWVkO1xyXG5cdH0pO1xyXG5cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ3RpbWVzdGFtcCcsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLnBvcy50aW1lc3RhbXA7XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiBHZW9sb2NhdGlvbkluZm87XHJcbn0pKClcclxuXHJcblxyXG4vKipcclxuKk1lZGlh55So5LqO5o2V5o2J5pGE5YOP5aS05ZKM6bqm5YWL6aOO44CC5Y+v5Lul5o2V5o2J5Lu75oSP5LmL5LiA77yM5oiW6ICF5ZCM5pe25o2V5o2J5Lik6ICF44CCPGNvZGU+Z2V0Q2FtZXJhPC9jb2RlPuWJjeWPr+S7peS9v+eUqDxjb2RlPnN1cHBvcnRlZCgpPC9jb2RlPuajgOafpeW9k+WJjea1j+iniOWZqOaYr+WQpuaUr+aMgeOAglxyXG4qPGI+Tk9URTo8L2I+XHJcbio8cD7nm67liY1NZWRpYeWcqOenu+WKqOW5s+WPsOWPquaUr+aMgUFuZHJvaWTvvIzkuI3mlK/mjIFJT1PjgILlj6rlj6/lnKhGaXJlRm945a6M5pW05Zyw5L2/55So77yMQ2hyb21l5rWL6K+V5pe25peg5rOV5o2V5o2J6KeG6aKR44CCPC9wPlxyXG4qL1xyXG4vL2NsYXNzIGxheWEuZGV2aWNlLm1lZGlhLk1lZGlhXHJcbnZhciBNZWRpYT0oZnVuY3Rpb24oKXtcclxuXHRmdW5jdGlvbiBNZWRpYSgpe31cclxuXHRfX2NsYXNzKE1lZGlhLCdsYXlhLmRldmljZS5tZWRpYS5NZWRpYScpO1xyXG5cdE1lZGlhLnN1cHBvcnRlZD1mdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuICEhQnJvd3Nlci53aW5kb3cubmF2aWdhdG9yLmdldFVzZXJNZWRpYTtcclxuXHR9XHJcblxyXG5cdE1lZGlhLmdldE1lZGlhPWZ1bmN0aW9uKG9wdGlvbnMsb25TdWNjZXNzLG9uRXJyb3Ipe1xyXG5cdFx0aWYgKEJyb3dzZXIud2luZG93Lm5hdmlnYXRvci5nZXRVc2VyTWVkaWEpe1xyXG5cdFx0XHRCcm93c2VyLndpbmRvdy5uYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKG9wdGlvbnMsZnVuY3Rpb24oc3RyZWFtKXtcclxuXHRcdFx0XHRvblN1Y2Nlc3MucnVuV2l0aChCcm93c2VyLndpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKHN0cmVhbSkpO1xyXG5cdFx0XHRcdH0sZnVuY3Rpb24oZXJyKXtcclxuXHRcdFx0XHRvbkVycm9yLnJ1bldpdGgoZXJyKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRNZWRpYS5fX2luaXQkPWZ1bmN0aW9uKCl7XHJcblx0XHQvKl9fSlNfXyAqL25hdmlnYXRvci5nZXRVc2VyTWVkaWE9bmF2aWdhdG9yLmdldFVzZXJNZWRpYSB8fCBuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhIHx8IG5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWE7O1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIE1lZGlhO1xyXG59KSgpXHJcblxyXG5cclxuLyoqXHJcbirkv53lrZjml4vovazkv6Hmga/nmoTnsbvjgILor7fli7/kv67mlLnmnKznsbvnmoTlsZ7mgKfjgIJcclxuKkBhdXRob3IgU3Vydml2b3JcclxuKi9cclxuLy9jbGFzcyBsYXlhLmRldmljZS5tb3Rpb24uUm90YXRpb25JbmZvXHJcbnZhciBSb3RhdGlvbkluZm89KGZ1bmN0aW9uKCl7XHJcblx0ZnVuY3Rpb24gUm90YXRpb25JbmZvKCl7XHJcblx0XHQvKipcclxuXHRcdCo8cD5cclxuXHRcdCrmjIfnpLrorr7lpIfmmK/lkKblj6/ku6Xmj5Dkvpvnu53lr7nmlrnkvY3mlbDmja7vvIjmjIflkJHlnLDnkIPlnZDmoIfns7vvvInvvIzmiJbogIXorr7lpIflhrPlrprnmoTku7vmhI/lnZDmoIfns7vjgIJcclxuXHRcdCrlhbPkuo7lnZDmoIfns7vlj4Lop4E8aT5odHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9HdWlkZS9FdmVudHMvT3JpZW50YXRpb25fYW5kX21vdGlvbl9kYXRhX2V4cGxhaW5lZDwvaT7jgIJcclxuXHRcdCo8L3A+XHJcblx0XHQq6ZyA6KaB5rOo5oSP55qE5piv77yMSU9T546v5aKD5LiL77yM6K+l5YC85aeL57uI5Li6ZmFsc2XjgILljbPkvb/lpoLmraTvvIzkvaDkvp3ml6flj6/ku6Xku448Y29kZT5hbHBoYTwvY29kZT7kuK3lj5blvpfmraPnoa7nmoTlgLzjgIJcclxuXHRcdCovXHJcblx0XHR0aGlzLmFic29sdXRlPWZhbHNlO1xyXG5cdFx0LyoqXHJcblx0XHQqWui9tOaXi+i9rOinkuW6pu+8jOWFtuWAvOiMg+WbtOS7jjDoh7MzNjDjgIJcclxuXHRcdCroi6U8Y29kZT5hYnNvbHV0ZTwvY29kZT7kuLp0cnVl5oiW6ICF5ZyoSU9T5Lit77yMYWxwaGHlgLzmmK/ku47ljJfmlrnliLDlvZPliY3orr7lpIfmlrnlkJHnmoTop5LluqblgLzjgIJcclxuXHRcdCovXHJcblx0XHR0aGlzLmFscGhhPU5hTjtcclxuXHRcdC8qKlxyXG5cdFx0KljovbTml4vovazop5LluqYs5YW25YC86IyD5Zu05LuOLTE4MOiHszE4MOOAguS7o+ihqOiuvuWkh+S7juWJjeiHs+WQjueahOi/kOWKqOOAglxyXG5cdFx0Ki9cclxuXHRcdHRoaXMuYmV0YT1OYU47XHJcblx0XHQvKipcclxuXHRcdCpZ6L205peL6L2s6KeS5bqm77yM5YW25YC86IyD5Zu05LuOLTkw6IezOTDjgILku6Pooajorr7lpIfku47lt6boh7Plj7PnmoTov5DliqjjgIJcclxuXHRcdCovXHJcblx0XHR0aGlzLmdhbW1hPU5hTjtcclxuXHRcdC8qKlxyXG5cdFx0Kue9l+ebmOaVsOaNrueahOeyvuehruW6pu+8iOinkuW6pu+8ieOAguS7hUlPU+WPr+eUqOOAglxyXG5cdFx0Ki9cclxuXHRcdHRoaXMuY29tcGFzc0FjY3VyYWN5PU5hTjtcclxuXHR9XHJcblxyXG5cdF9fY2xhc3MoUm90YXRpb25JbmZvLCdsYXlhLmRldmljZS5tb3Rpb24uUm90YXRpb25JbmZvJyk7XHJcblx0cmV0dXJuIFJvdGF0aW9uSW5mbztcclxufSkoKVxyXG5cclxuXHJcbi8qKlxyXG4qQWNjZWxlcmF0b3IuaW5zdGFuY2Xojrflj5bllK/kuIDnmoRBY2NlbGVyYXRvcuW8leeUqO+8jOivt+WLv+iwg+eUqOaehOmAoOWHveaVsOOAglxyXG4qXHJcbio8cD5cclxuKmxpc3Rlbigp55qE5Zue6LCD5aSE55CG5Zmo5o6l5Y+X5Zub5Liq5Y+C5pWw77yaXHJcbio8b2w+XHJcbio8bGk+PGI+YWNjZWxlcmF0aW9uPC9iPjrooajnpLrnlKjmiLfnu5nkuojorr7lpIfnmoTliqDpgJ/luqbjgII8L2xpPlxyXG4qPGxpPjxiPmFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHk8L2I+OuiuvuWkh+WPl+WIsOeahOaAu+WKoOmAn+W6pu+8iOWMheWQq+mHjeWKm++8ieOAgjwvbGk+XHJcbio8bGk+PGI+cm90YXRpb25SYXRlPC9iPjrorr7lpIfnmoToh6rovazpgJ/njofjgII8L2xpPlxyXG4qPGxpPjxiPmludGVydmFsPC9iPjrliqDpgJ/luqbojrflj5bnmoTml7bpl7Tpl7TpmpTvvIjmr6vnp5LvvInjgII8L2xpPlxyXG4qPC9vbD5cclxuKjwvcD5cclxuKjxwPlxyXG4qPGI+Tk9URTwvYj48YnIvPlxyXG4q5aaC77yMcm90YXRpb25SYXRl55qEYWxwaGHlnKhhcHBsZeWSjG1veuaWh+aho+S4remDveaYr3rovbTml4vovazop5LluqbvvIzkvYbmmK/lrp7mtYvmmK946L205peL6L2s6KeS5bqm44CC5Li65LqG5L2/5ZCE5bGe5oCn6KGo56S655qE5YC85LiO5paH5qGj5omA6L+w55u45ZCM77yM5a6e6ZmF5YC85LiO5YW25LuW5bGe5oCn6L+b6KGM5LqG5a+56LCD44CCXHJcbirlhbbkuK3vvJpcclxuKjx1bD5cclxuKjxsaT5hbHBoYeS9v+eUqGdhbW1h5YC844CCPC9saT5cclxuKjxsaT5iZXRh5L2/55SoYWxwaGHlgLzjgII8L2xpPlxyXG4qPGxpPmdhbW1h5L2/55SoYmV0YeOAgjwvbGk+XHJcbio8L3VsPlxyXG4q55uu5YmN5a2w5piv5a2w6Z2e5bCa5pyq5Y+v55+l77yM5Lul5q2k5Li65rOo44CCXHJcbio8L3A+XHJcbiovXHJcbi8vY2xhc3MgbGF5YS5kZXZpY2UubW90aW9uLkFjY2VsZXJhdG9yIGV4dGVuZHMgbGF5YS5ldmVudHMuRXZlbnREaXNwYXRjaGVyXHJcbnZhciBBY2NlbGVyYXRvcj0oZnVuY3Rpb24oX3N1cGVyKXtcclxuXHRmdW5jdGlvbiBBY2NlbGVyYXRvcihzaW5nbGV0b24pe1xyXG5cdFx0QWNjZWxlcmF0b3IuX19zdXBlci5jYWxsKHRoaXMpO1xyXG5cdFx0LypfX0pTX18gKi90aGlzLm9uRGV2aWNlT3JpZW50YXRpb25DaGFuZ2U9dGhpcy5vbkRldmljZU9yaWVudGF0aW9uQ2hhbmdlLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cclxuXHRfX2NsYXNzKEFjY2VsZXJhdG9yLCdsYXlhLmRldmljZS5tb3Rpb24uQWNjZWxlcmF0b3InLF9zdXBlcik7XHJcblx0dmFyIF9fcHJvdG89QWNjZWxlcmF0b3IucHJvdG90eXBlO1xyXG5cdC8qKlxyXG5cdCrkvqblkKzliqDpgJ/lmajov5DliqjjgIJcclxuXHQqQHBhcmFtIG9ic2VydmVyIOWbnuiwg+WHveaVsOaOpeWPlzTkuKrlj4LmlbDvvIzop4Hnsbvor7TmmI7jgIJcclxuXHQqL1xyXG5cdF9fcHJvdG8ub249ZnVuY3Rpb24odHlwZSxjYWxsZXIsbGlzdGVuZXIsYXJncyl7XHJcblx0XHRfc3VwZXIucHJvdG90eXBlLm9uLmNhbGwodGhpcyx0eXBlLGNhbGxlcixsaXN0ZW5lcixhcmdzKTtcclxuXHRcdEJyb3dzZXIud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZW1vdGlvbicsdGhpcy5vbkRldmljZU9yaWVudGF0aW9uQ2hhbmdlKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0KuWPlua2iOS+puWQrOWKoOmAn+WZqOOAglxyXG5cdCpAcGFyYW0gaGFuZGxlIOS+puWQrOWKoOmAn+WZqOaJgOeUqOWkhOeQhuWZqOOAglxyXG5cdCovXHJcblx0X19wcm90by5vZmY9ZnVuY3Rpb24odHlwZSxjYWxsZXIsbGlzdGVuZXIsb25jZU9ubHkpe1xyXG5cdFx0KG9uY2VPbmx5PT09dm9pZCAwKSYmIChvbmNlT25seT1mYWxzZSk7XHJcblx0XHRpZiAoIXRoaXMuaGFzTGlzdGVuZXIodHlwZSkpXHJcblx0XHRcdEJyb3dzZXIud2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RldmljZW1vdGlvbicsdGhpcy5vbkRldmljZU9yaWVudGF0aW9uQ2hhbmdlKVxyXG5cdFx0cmV0dXJuIF9zdXBlci5wcm90b3R5cGUub2ZmLmNhbGwodGhpcyx0eXBlLGNhbGxlcixsaXN0ZW5lcixvbmNlT25seSk7XHJcblx0fVxyXG5cclxuXHRfX3Byb3RvLm9uRGV2aWNlT3JpZW50YXRpb25DaGFuZ2U9ZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgaW50ZXJ2YWw9ZS5pbnRlcnZhbDtcclxuXHRcdEFjY2VsZXJhdG9yLmFjY2VsZXJhdGlvbi54PWUuYWNjZWxlcmF0aW9uLng7XHJcblx0XHRBY2NlbGVyYXRvci5hY2NlbGVyYXRpb24ueT1lLmFjY2VsZXJhdGlvbi55O1xyXG5cdFx0QWNjZWxlcmF0b3IuYWNjZWxlcmF0aW9uLno9ZS5hY2NlbGVyYXRpb24uejtcclxuXHRcdEFjY2VsZXJhdG9yLmFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkueD1lLmFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkueDtcclxuXHRcdEFjY2VsZXJhdG9yLmFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkueT1lLmFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkueTtcclxuXHRcdEFjY2VsZXJhdG9yLmFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkuej1lLmFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkuejtcclxuXHRcdEFjY2VsZXJhdG9yLnJvdGF0aW9uUmF0ZS5hbHBoYT1lLnJvdGF0aW9uUmF0ZS5nYW1tYSAqLTE7XHJcblx0XHRBY2NlbGVyYXRvci5yb3RhdGlvblJhdGUuYmV0YT1lLnJvdGF0aW9uUmF0ZS5hbHBoYSAqLTE7XHJcblx0XHRBY2NlbGVyYXRvci5yb3RhdGlvblJhdGUuZ2FtbWE9ZS5yb3RhdGlvblJhdGUuYmV0YTtcclxuXHRcdGlmIChCcm93c2VyLm9uQW5kcm9pZCl7XHJcblx0XHRcdGlmIChBY2NlbGVyYXRvci5vbkNocm9tZSl7XHJcblx0XHRcdFx0QWNjZWxlcmF0b3Iucm90YXRpb25SYXRlLmFscGhhICo9MTgwIC8gTWF0aC5QSTtcclxuXHRcdFx0XHRBY2NlbGVyYXRvci5yb3RhdGlvblJhdGUuYmV0YSAqPTE4MCAvIE1hdGguUEk7XHJcblx0XHRcdFx0QWNjZWxlcmF0b3Iucm90YXRpb25SYXRlLmdhbW1hICo9MTgwIC8gTWF0aC5QSTtcclxuXHRcdFx0fVxyXG5cdFx0XHRBY2NlbGVyYXRvci5hY2NlbGVyYXRpb24ueCAqPS0xO1xyXG5cdFx0XHRBY2NlbGVyYXRvci5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5LnggKj0tMTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKEJyb3dzZXIub25JT1Mpe1xyXG5cdFx0XHRBY2NlbGVyYXRvci5hY2NlbGVyYXRpb24ueSAqPS0xO1xyXG5cdFx0XHRBY2NlbGVyYXRvci5hY2NlbGVyYXRpb24ueiAqPS0xO1xyXG5cdFx0XHRBY2NlbGVyYXRvci5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5LnkgKj0tMTtcclxuXHRcdFx0QWNjZWxlcmF0b3IuYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS56ICo9LTE7XHJcblx0XHRcdGludGVydmFsICo9MTAwMDtcclxuXHRcdH1cclxuXHRcdHRoaXMuZXZlbnQoLypsYXlhLmV2ZW50cy5FdmVudC5DSEFOR0UqL1wiY2hhbmdlXCIsW0FjY2VsZXJhdG9yLmFjY2VsZXJhdGlvbixBY2NlbGVyYXRvci5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5LEFjY2VsZXJhdG9yLnJvdGF0aW9uUmF0ZSxpbnRlcnZhbF0pO1xyXG5cdH1cclxuXHJcblx0X19nZXRzZXQoMSxBY2NlbGVyYXRvciwnaW5zdGFuY2UnLGZ1bmN0aW9uKCl7QWNjZWxlcmF0b3IuX2luc3RhbmNlPUFjY2VsZXJhdG9yLl9pbnN0YW5jZXx8IG5ldyBBY2NlbGVyYXRvcigwKVxyXG5cdFx0cmV0dXJuIEFjY2VsZXJhdG9yLl9pbnN0YW5jZTtcclxuXHR9LGxheWEuZXZlbnRzLkV2ZW50RGlzcGF0Y2hlci5fJFNFVF9pbnN0YW5jZSk7XHJcblxyXG5cdEFjY2VsZXJhdG9yLmdldFRyYW5zZm9ybWVkQWNjZWxlcmF0aW9uPWZ1bmN0aW9uKGFjY2VsZXJhdGlvbil7QWNjZWxlcmF0b3IudHJhbnNmb3JtZWRBY2NlbGVyYXRpb249QWNjZWxlcmF0b3IudHJhbnNmb3JtZWRBY2NlbGVyYXRpb258fCBuZXcgQWNjZWxlcmF0aW9uSW5mbygpO1xyXG5cdFx0QWNjZWxlcmF0b3IudHJhbnNmb3JtZWRBY2NlbGVyYXRpb24uej1hY2NlbGVyYXRpb24uejtcclxuXHRcdGlmIChCcm93c2VyLndpbmRvdy5vcmllbnRhdGlvbj09OTApe1xyXG5cdFx0XHRBY2NlbGVyYXRvci50cmFuc2Zvcm1lZEFjY2VsZXJhdGlvbi54PWFjY2VsZXJhdGlvbi55O1xyXG5cdFx0XHRBY2NlbGVyYXRvci50cmFuc2Zvcm1lZEFjY2VsZXJhdGlvbi55PS1hY2NlbGVyYXRpb24ueDtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKEJyb3dzZXIud2luZG93Lm9yaWVudGF0aW9uPT0tOTApe1xyXG5cdFx0XHRBY2NlbGVyYXRvci50cmFuc2Zvcm1lZEFjY2VsZXJhdGlvbi54PS1hY2NlbGVyYXRpb24ueTtcclxuXHRcdFx0QWNjZWxlcmF0b3IudHJhbnNmb3JtZWRBY2NlbGVyYXRpb24ueT1hY2NlbGVyYXRpb24ueDtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKCFCcm93c2VyLndpbmRvdy5vcmllbnRhdGlvbil7XHJcblx0XHRcdEFjY2VsZXJhdG9yLnRyYW5zZm9ybWVkQWNjZWxlcmF0aW9uLng9YWNjZWxlcmF0aW9uLng7XHJcblx0XHRcdEFjY2VsZXJhdG9yLnRyYW5zZm9ybWVkQWNjZWxlcmF0aW9uLnk9YWNjZWxlcmF0aW9uLnk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChCcm93c2VyLndpbmRvdy5vcmllbnRhdGlvbj09MTgwKXtcclxuXHRcdFx0QWNjZWxlcmF0b3IudHJhbnNmb3JtZWRBY2NlbGVyYXRpb24ueD0tYWNjZWxlcmF0aW9uLng7XHJcblx0XHRcdEFjY2VsZXJhdG9yLnRyYW5zZm9ybWVkQWNjZWxlcmF0aW9uLnk9LWFjY2VsZXJhdGlvbi55O1xyXG5cdFx0fTtcclxuXHRcdHZhciB0eD1OYU47XHJcblx0XHRpZiAoTGF5YS5zdGFnZS5jYW52YXNEZWdyZWU9PS05MCl7XHJcblx0XHRcdHR4PUFjY2VsZXJhdG9yLnRyYW5zZm9ybWVkQWNjZWxlcmF0aW9uLng7XHJcblx0XHRcdEFjY2VsZXJhdG9yLnRyYW5zZm9ybWVkQWNjZWxlcmF0aW9uLng9LUFjY2VsZXJhdG9yLnRyYW5zZm9ybWVkQWNjZWxlcmF0aW9uLnk7XHJcblx0XHRcdEFjY2VsZXJhdG9yLnRyYW5zZm9ybWVkQWNjZWxlcmF0aW9uLnk9dHg7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChMYXlhLnN0YWdlLmNhbnZhc0RlZ3JlZT09OTApe1xyXG5cdFx0XHR0eD1BY2NlbGVyYXRvci50cmFuc2Zvcm1lZEFjY2VsZXJhdGlvbi54O1xyXG5cdFx0XHRBY2NlbGVyYXRvci50cmFuc2Zvcm1lZEFjY2VsZXJhdGlvbi54PUFjY2VsZXJhdG9yLnRyYW5zZm9ybWVkQWNjZWxlcmF0aW9uLnk7XHJcblx0XHRcdEFjY2VsZXJhdG9yLnRyYW5zZm9ybWVkQWNjZWxlcmF0aW9uLnk9LXR4O1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIEFjY2VsZXJhdG9yLnRyYW5zZm9ybWVkQWNjZWxlcmF0aW9uO1xyXG5cdH1cclxuXHJcblx0QWNjZWxlcmF0b3IuX2luc3RhbmNlPW51bGw7XHJcblx0QWNjZWxlcmF0b3IudHJhbnNmb3JtZWRBY2NlbGVyYXRpb249bnVsbDtcclxuXHRfX3N0YXRpYyhBY2NlbGVyYXRvcixcclxuXHRbJ2FjY2VsZXJhdGlvbicsZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5hY2NlbGVyYXRpb249bmV3IEFjY2VsZXJhdGlvbkluZm8oKTt9LCdhY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5JyxmdW5jdGlvbigpe3JldHVybiB0aGlzLmFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHk9bmV3IEFjY2VsZXJhdGlvbkluZm8oKTt9LCdyb3RhdGlvblJhdGUnLGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucm90YXRpb25SYXRlPW5ldyBSb3RhdGlvbkluZm8oKTt9LCdvbkNocm9tZScsZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5vbkNocm9tZT0oQnJvd3Nlci51c2VyQWdlbnQuaW5kZXhPZihcIkNocm9tZVwiKT4tMSk7fVxyXG5cdF0pO1xyXG5cdHJldHVybiBBY2NlbGVyYXRvcjtcclxufSkoRXZlbnREaXNwYXRjaGVyKVxyXG5cclxuXHJcbi8qKlxyXG4q5L2/55SoR3lyb3Njb3BlLmluc3RhbmNl6I635Y+W5ZSv5LiA55qER3lyb3Njb3Bl5byV55So77yM6K+35Yu/6LCD55So5p6E6YCg5Ye95pWw44CCXHJcbipcclxuKjxwPlxyXG4qbGlzdGVuKCnnmoTlm57osIPlpITnkIblmajmjqXlj5fkuKTkuKrlj4LmlbDvvJpcclxuKjxjb2RlPmZ1bmN0aW9uIG9uT3JpZW50YXRpb25DaGFuZ2UoYWJzb2x1dGU6Qm9vbGVhbixpbmZvOlJvdGF0aW9uSW5mbyk6dm9pZDwvY29kZT5cclxuKjxvbD5cclxuKjxsaT48Yj5hYnNvbHV0ZTwvYj465oyH56S66K6+5aSH5piv5ZCm5Y+v5Lul5o+Q5L6b57ud5a+55pa55L2N5pWw5o2u77yI5oyH5ZCR5Zyw55CD5Z2Q5qCH57O777yJ77yM5oiW6ICF6K6+5aSH5Yaz5a6a55qE5Lu75oSP5Z2Q5qCH57O744CC5YWz5LqO5Z2Q5qCH57O75Y+C6KeBPGk+aHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvR3VpZGUvRXZlbnRzL09yaWVudGF0aW9uX2FuZF9tb3Rpb25fZGF0YV9leHBsYWluZWQ8L2k+44CCPC9saT5cclxuKjxsaT48Yj5pbmZvPC9iPjo8Y29kZT5Sb3RhdGlvbkluZm88L2NvZGU+57G75Z6L5Y+C5pWw77yM5L+d5a2Y6K6+5aSH55qE5peL6L2s5YC844CCPC9saT5cclxuKjwvb2w+XHJcbio8L3A+XHJcbipcclxuKjxwPlxyXG4q5rWP6KeI5Zmo5YW85a655oCn5Y+C6KeB77yaPGk+aHR0cDovL2Nhbml1c2UuY29tLyNzZWFyY2g9ZGV2aWNlb3JpZW50YXRpb248L2k+XHJcbio8L3A+XHJcbiovXHJcbi8vY2xhc3MgbGF5YS5kZXZpY2UubW90aW9uLkd5cm9zY29wZSBleHRlbmRzIGxheWEuZXZlbnRzLkV2ZW50RGlzcGF0Y2hlclxyXG52YXIgR3lyb3Njb3BlPShmdW5jdGlvbihfc3VwZXIpe1xyXG5cdGZ1bmN0aW9uIEd5cm9zY29wZShzaW5nbGV0b24pe1xyXG5cdFx0R3lyb3Njb3BlLl9fc3VwZXIuY2FsbCh0aGlzKTtcclxuXHRcdC8qX19KU19fICovdGhpcy5vbkRldmljZU9yaWVudGF0aW9uQ2hhbmdlPXRoaXMub25EZXZpY2VPcmllbnRhdGlvbkNoYW5nZS5iaW5kKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0X19jbGFzcyhHeXJvc2NvcGUsJ2xheWEuZGV2aWNlLm1vdGlvbi5HeXJvc2NvcGUnLF9zdXBlcik7XHJcblx0dmFyIF9fcHJvdG89R3lyb3Njb3BlLnByb3RvdHlwZTtcclxuXHQvKipcclxuXHQq55uR6KeG6ZmA6J665Luq6L+Q5Yqo44CCXHJcblx0KkBwYXJhbSBvYnNlcnZlciDlm57osIPlh73mlbDmjqXlj5fkuIDkuKpCb29sZWFu57G75Z6L55qEPGNvZGU+YWJzb2x1dGU8L2NvZGU+5ZKMPGNvZGU+R3lyb3Njb3BlSW5mbzwvY29kZT7nsbvlnovlj4LmlbDjgIJcclxuXHQqL1xyXG5cdF9fcHJvdG8ub249ZnVuY3Rpb24odHlwZSxjYWxsZXIsbGlzdGVuZXIsYXJncyl7XHJcblx0XHRfc3VwZXIucHJvdG90eXBlLm9uLmNhbGwodGhpcyx0eXBlLGNhbGxlcixsaXN0ZW5lcixhcmdzKTtcclxuXHRcdEJyb3dzZXIud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZW9yaWVudGF0aW9uJyx0aGlzLm9uRGV2aWNlT3JpZW50YXRpb25DaGFuZ2UpO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQq5Y+W5raI5oyH5a6a5aSE55CG5Zmo5a+56ZmA6J665Luq55qE55uR6KeG44CCXHJcblx0KkBwYXJhbSBvYnNlcnZlclxyXG5cdCovXHJcblx0X19wcm90by5vZmY9ZnVuY3Rpb24odHlwZSxjYWxsZXIsbGlzdGVuZXIsb25jZU9ubHkpe1xyXG5cdFx0KG9uY2VPbmx5PT09dm9pZCAwKSYmIChvbmNlT25seT1mYWxzZSk7XHJcblx0XHRpZiAoIXRoaXMuaGFzTGlzdGVuZXIodHlwZSkpXHJcblx0XHRcdEJyb3dzZXIud2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RldmljZW9yaWVudGF0aW9uJyx0aGlzLm9uRGV2aWNlT3JpZW50YXRpb25DaGFuZ2UpO1xyXG5cdFx0cmV0dXJuIF9zdXBlci5wcm90b3R5cGUub2ZmLmNhbGwodGhpcyx0eXBlLGNhbGxlcixsaXN0ZW5lcixvbmNlT25seSk7XHJcblx0fVxyXG5cclxuXHRfX3Byb3RvLm9uRGV2aWNlT3JpZW50YXRpb25DaGFuZ2U9ZnVuY3Rpb24oZSl7XHJcblx0XHRHeXJvc2NvcGUuaW5mby5hbHBoYT1lLmFscGhhO1xyXG5cdFx0R3lyb3Njb3BlLmluZm8uYmV0YT1lLmJldGE7XHJcblx0XHRHeXJvc2NvcGUuaW5mby5nYW1tYT1lLmdhbW1hO1xyXG5cdFx0aWYgKGUud2Via2l0Q29tcGFzc0hlYWRpbmcpe1xyXG5cdFx0XHRHeXJvc2NvcGUuaW5mby5hbHBoYT1lLndlYmtpdENvbXBhc3NIZWFkaW5nICotMTtcclxuXHRcdFx0R3lyb3Njb3BlLmluZm8uY29tcGFzc0FjY3VyYWN5PWUud2Via2l0Q29tcGFzc0FjY3VyYWN5O1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5ldmVudCgvKmxheWEuZXZlbnRzLkV2ZW50LkNIQU5HRSovXCJjaGFuZ2VcIixbZS5hYnNvbHV0ZSxHeXJvc2NvcGUuaW5mb10pO1xyXG5cdH1cclxuXHJcblx0X19nZXRzZXQoMSxHeXJvc2NvcGUsJ2luc3RhbmNlJyxmdW5jdGlvbigpe0d5cm9zY29wZS5faW5zdGFuY2U9R3lyb3Njb3BlLl9pbnN0YW5jZXx8IG5ldyBHeXJvc2NvcGUoMCk7XHJcblx0XHRyZXR1cm4gR3lyb3Njb3BlLl9pbnN0YW5jZTtcclxuXHR9LGxheWEuZXZlbnRzLkV2ZW50RGlzcGF0Y2hlci5fJFNFVF9pbnN0YW5jZSk7XHJcblxyXG5cdEd5cm9zY29wZS5faW5zdGFuY2U9bnVsbDtcclxuXHRfX3N0YXRpYyhHeXJvc2NvcGUsXHJcblx0WydpbmZvJyxmdW5jdGlvbigpe3JldHVybiB0aGlzLmluZm89bmV3IFJvdGF0aW9uSW5mbygpO31cclxuXHRdKTtcclxuXHRyZXR1cm4gR3lyb3Njb3BlO1xyXG59KShFdmVudERpc3BhdGNoZXIpXHJcblxyXG5cclxuLyoqXHJcbipTaGFrZeWPquiDveWcqOaUr+aMgeatpOaTjeS9nOeahOiuvuWkh+S4iuacieaViOOAglxyXG4qXHJcbipAYXV0aG9yIFN1cnZpdm9yXHJcbiovXHJcbi8vY2xhc3MgbGF5YS5kZXZpY2UuU2hha2UgZXh0ZW5kcyBsYXlhLmV2ZW50cy5FdmVudERpc3BhdGNoZXJcclxudmFyIFNoYWtlPShmdW5jdGlvbihfc3VwZXIpe1xyXG5cdGZ1bmN0aW9uIFNoYWtlKCl7XHJcblx0XHR0aGlzLnRocm91c2hvbGQ9MDtcclxuXHRcdHRoaXMuc2hha2VJbnRlcnZhbD0wO1xyXG5cdFx0dGhpcy5jYWxsYmFjaz1udWxsO1xyXG5cdFx0dGhpcy5sYXN0WD1OYU47XHJcblx0XHR0aGlzLmxhc3RZPU5hTjtcclxuXHRcdHRoaXMubGFzdFo9TmFOO1xyXG5cdFx0dGhpcy5sYXN0TWlsbFNlY29uZD1OYU47XHJcblx0XHRTaGFrZS5fX3N1cGVyLmNhbGwodGhpcyk7XHJcblx0fVxyXG5cclxuXHRfX2NsYXNzKFNoYWtlLCdsYXlhLmRldmljZS5TaGFrZScsX3N1cGVyKTtcclxuXHR2YXIgX19wcm90bz1TaGFrZS5wcm90b3R5cGU7XHJcblx0LyoqXHJcblx0KuW8gOWni+WTjeW6lOiuvuWkh+aRh+aZg+OAglxyXG5cdCpAcGFyYW0gdGhyb3VzaG9sZCDlk43lupTnmoTnnqzml7bpgJ/luqbpmIjlgLzvvIzovbvluqbmkYfmmYPnmoTlgLznuqblnKg1fjEw6Ze044CCXHJcblx0KkBwYXJhbSB0aW1lb3V0IOiuvuWkh+aRh+aZg+eahOWTjeW6lOmXtOmalOaXtumXtOOAglxyXG5cdCpAcGFyYW0gY2FsbGJhY2sg5Zyo6K6+5aSH5pGH5pmD6Kem5Y+R5pe26LCD55So55qE5aSE55CG5Zmo44CCXHJcblx0Ki9cclxuXHRfX3Byb3RvLnN0YXJ0PWZ1bmN0aW9uKHRocm91c2hvbGQsaW50ZXJ2YWwpe1xyXG5cdFx0dGhpcy50aHJvdXNob2xkPXRocm91c2hvbGQ7XHJcblx0XHR0aGlzLnNoYWtlSW50ZXJ2YWw9aW50ZXJ2YWw7XHJcblx0XHR0aGlzLmxhc3RYPXRoaXMubGFzdFk9dGhpcy5sYXN0Wj1OYU47XHJcblx0XHRBY2NlbGVyYXRvci5pbnN0YW5jZS5vbigvKmxheWEuZXZlbnRzLkV2ZW50LkNIQU5HRSovXCJjaGFuZ2VcIix0aGlzLHRoaXMub25TaGFrZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQq5YGc5q2i5ZON5bqU6K6+5aSH5pGH5pmD44CCXHJcblx0Ki9cclxuXHRfX3Byb3RvLnN0b3A9ZnVuY3Rpb24oKXtcclxuXHRcdEFjY2VsZXJhdG9yLmluc3RhbmNlLm9mZigvKmxheWEuZXZlbnRzLkV2ZW50LkNIQU5HRSovXCJjaGFuZ2VcIix0aGlzLHRoaXMub25TaGFrZSk7XHJcblx0fVxyXG5cclxuXHRfX3Byb3RvLm9uU2hha2U9ZnVuY3Rpb24oYWNjZWxlcmF0aW9uLGFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkscm90YXRpb25SYXRlLGludGVydmFsKXtcclxuXHRcdGlmKGlzTmFOKHRoaXMubGFzdFgpKXtcclxuXHRcdFx0dGhpcy5sYXN0WD1hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lng7XHJcblx0XHRcdHRoaXMubGFzdFk9YWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS55O1xyXG5cdFx0XHR0aGlzLmxhc3RaPWFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkuejtcclxuXHRcdFx0dGhpcy5sYXN0TWlsbFNlY29uZD1Ccm93c2VyLm5vdygpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9O1xyXG5cdFx0dmFyIGRlbHRhWD1NYXRoLmFicyh0aGlzLmxhc3RYLWFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkueCk7XHJcblx0XHR2YXIgZGVsdGFZPU1hdGguYWJzKHRoaXMubGFzdFktYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS55KTtcclxuXHRcdHZhciBkZWx0YVo9TWF0aC5hYnModGhpcy5sYXN0Wi1hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5LnopO1xyXG5cdFx0aWYodGhpcy5pc1NoYWtlZChkZWx0YVgsZGVsdGFZLGRlbHRhWikpe1xyXG5cdFx0XHR2YXIgZGVsdGFNaWxsU2Vjb25kPUJyb3dzZXIubm93KCktdGhpcy5sYXN0TWlsbFNlY29uZDtcclxuXHRcdFx0aWYgKGRlbHRhTWlsbFNlY29uZCA+IHRoaXMuc2hha2VJbnRlcnZhbCl7XHJcblx0XHRcdFx0dGhpcy5ldmVudCgvKmxheWEuZXZlbnRzLkV2ZW50LkNIQU5HRSovXCJjaGFuZ2VcIik7XHJcblx0XHRcdFx0dGhpcy5sYXN0TWlsbFNlY29uZD1Ccm93c2VyLm5vdygpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLmxhc3RYPWFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkueDtcclxuXHRcdHRoaXMubGFzdFk9YWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS55O1xyXG5cdFx0dGhpcy5sYXN0Wj1hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lno7XHJcblx0fVxyXG5cclxuXHQvLyDpgJrov4fku7vmhI/kuKTkuKrliIbph4/liKTmlq3mmK/lkKbmu6HotrPmkYfmmYPorr7lrprjgIJcclxuXHRfX3Byb3RvLmlzU2hha2VkPWZ1bmN0aW9uKGRlbHRhWCxkZWx0YVksZGVsdGFaKXtcclxuXHRcdHJldHVybiAoZGVsdGFYID4gdGhpcy50aHJvdXNob2xkICYmIGRlbHRhWSA+IHRoaXMudGhyb3VzaG9sZCl8fFxyXG5cdFx0KGRlbHRhWCA+IHRoaXMudGhyb3VzaG9sZCAmJiBkZWx0YVogPiB0aGlzLnRocm91c2hvbGQpfHxcclxuXHRcdChkZWx0YVkgPiB0aGlzLnRocm91c2hvbGQgJiYgZGVsdGFaID4gdGhpcy50aHJvdXNob2xkKVxyXG5cdH1cclxuXHJcblx0X19nZXRzZXQoMSxTaGFrZSwnaW5zdGFuY2UnLGZ1bmN0aW9uKCl7U2hha2UuX2luc3RhbmNlPVNoYWtlLl9pbnN0YW5jZXx8IG5ldyBTaGFrZSgpO1xyXG5cdFx0cmV0dXJuIFNoYWtlLl9pbnN0YW5jZTtcclxuXHR9LGxheWEuZXZlbnRzLkV2ZW50RGlzcGF0Y2hlci5fJFNFVF9pbnN0YW5jZSk7XHJcblxyXG5cdFNoYWtlLl9pbnN0YW5jZT1udWxsO1xyXG5cdHJldHVybiBTaGFrZTtcclxufSkoRXZlbnREaXNwYXRjaGVyKVxyXG5cclxuXHJcbi8qKlxyXG4qQHByaXZhdGVcclxuKi9cclxuLy9jbGFzcyBsYXlhLmRldmljZS5tZWRpYS5IdG1sVmlkZW8gZXh0ZW5kcyBsYXlhLnJlc291cmNlLkJpdG1hcFxyXG52YXIgSHRtbFZpZGVvPShmdW5jdGlvbihfc3VwZXIpe1xyXG5cdGZ1bmN0aW9uIEh0bWxWaWRlbygpe1xyXG5cdFx0dGhpcy52aWRlbz1udWxsO1xyXG5cdFx0dGhpcy5fc291cmNlPW51bGw7XHJcblx0XHRIdG1sVmlkZW8uX19zdXBlci5jYWxsKHRoaXMpO1xyXG5cdFx0dGhpcy5fd2lkdGg9MTtcclxuXHRcdHRoaXMuX2hlaWdodD0xO1xyXG5cdFx0dGhpcy5jcmVhdGVEb21FbGVtZW50KCk7XHJcblx0fVxyXG5cclxuXHRfX2NsYXNzKEh0bWxWaWRlbywnbGF5YS5kZXZpY2UubWVkaWEuSHRtbFZpZGVvJyxfc3VwZXIpO1xyXG5cdHZhciBfX3Byb3RvPUh0bWxWaWRlby5wcm90b3R5cGU7XHJcblx0X19wcm90by5jcmVhdGVEb21FbGVtZW50PWZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgXyR0aGlzPXRoaXM7XHJcblx0XHR0aGlzLl9zb3VyY2U9dGhpcy52aWRlbz1Ccm93c2VyLmNyZWF0ZUVsZW1lbnQoXCJ2aWRlb1wiKTtcclxuXHRcdHZhciBzdHlsZT10aGlzLnZpZGVvLnN0eWxlO1xyXG5cdFx0c3R5bGUucG9zaXRpb249J2Fic29sdXRlJztcclxuXHRcdHN0eWxlLnRvcD0nMHB4JztcclxuXHRcdHN0eWxlLmxlZnQ9JzBweCc7XHJcblx0XHR0aGlzLnZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZWRtZXRhZGF0YVwiLChmdW5jdGlvbigpe1xyXG5cdFx0XHR0aGlzLl93PV8kdGhpcy52aWRlby52aWRlb1dpZHRoO1xyXG5cdFx0XHR0aGlzLl9oPV8kdGhpcy52aWRlby52aWRlb0hlaWdodDtcclxuXHRcdH0pWydiaW5kJ10odGhpcykpO1xyXG5cdH1cclxuXHJcblx0X19wcm90by5zZXRTb3VyY2U9ZnVuY3Rpb24odXJsLGV4dGVuc2lvbil7XHJcblx0XHR3aGlsZSh0aGlzLnZpZGVvLmNoaWxkRWxlbWVudENvdW50KVxyXG5cdFx0dGhpcy52aWRlby5maXJzdENoaWxkLnJlbW92ZSgpO1xyXG5cdFx0aWYgKGV4dGVuc2lvbiAmIFZpZGVvLk1QNClcclxuXHRcdFx0dGhpcy5hcHBlbmRTb3VyY2UodXJsLFwidmlkZW8vbXA0XCIpO1xyXG5cdFx0aWYgKGV4dGVuc2lvbiAmIFZpZGVvLk9HRylcclxuXHRcdFx0dGhpcy5hcHBlbmRTb3VyY2UodXJsK1wiLm9nZ1wiLFwidmlkZW8vb2dnXCIpO1xyXG5cdH1cclxuXHJcblx0X19wcm90by5hcHBlbmRTb3VyY2U9ZnVuY3Rpb24oc291cmNlLHR5cGUpe1xyXG5cdFx0dmFyIHNvdXJjZUVsZW1lbnQ9QnJvd3Nlci5jcmVhdGVFbGVtZW50KFwic291cmNlXCIpO1xyXG5cdFx0c291cmNlRWxlbWVudC5zcmM9c291cmNlO1xyXG5cdFx0c291cmNlRWxlbWVudC50eXBlPXR5cGU7XHJcblx0XHR0aGlzLnZpZGVvLmFwcGVuZENoaWxkKHNvdXJjZUVsZW1lbnQpO1xyXG5cdH1cclxuXHJcblx0X19wcm90by5nZXRWaWRlbz1mdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMudmlkZW87XHJcblx0fVxyXG5cclxuXHRfX3Byb3RvLl9nZXRTb3VyY2U9ZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLl9zb3VyY2U7XHJcblx0fVxyXG5cclxuXHRIdG1sVmlkZW8uY3JlYXRlPWZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gbmV3IEh0bWxWaWRlbygpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIEh0bWxWaWRlbztcclxufSkoQml0bWFwKVxyXG5cclxuXHJcbi8qKlxyXG4qPGNvZGU+VmlkZW88L2NvZGU+5bCG6KeG6aKR5pi+56S65YiwQ2FudmFz5LiK44CCPGNvZGU+VmlkZW88L2NvZGU+5Y+v6IO95LiN5Lya5Zyo5omA5pyJ5rWP6KeI5Zmo5pyJ5pWI44CCXHJcbio8cD7lhbPkuo5WaWRlb+aUr+aMgeeahOaJgOacieS6i+S7tuWPguinge+8mjxpPmh0dHA6Ly93d3cudzNzY2hvb2wuY29tLmNuL3RhZ3MvaHRtbF9yZWZfYXVkaW9fdmlkZW9fZG9tLmFzcDwvaT7jgII8L3A+XHJcbio8cD5cclxuKjxiPuazqOaEj++8mjwvYj48YnIvPlxyXG4q5ZyoUEPnq6/lj6/ku6XlnKjku7vkvZXml7bmnLrosIPnlKg8Y29kZT5wbGF5KCk8L2NvZGU+5Zug5q2k77yM5Y+v5Lul5Zyo56iL5bqP5byA5aeL6L+Q6KGM5pe25bCx5L2/VmlkZW/lvIDlp4vmkq3mlL7jgILkvYbmmK/lnKjnp7vliqjnq6/vvIzlj6rmnInlnKjnlKjmiLfnrKzkuIDmrKHop6bnorDlsY/luZXlkI7miY3lj6/ku6XosIPnlKhwbGF5KCnvvIzmiYDku6Xnp7vliqjnq6/kuI3lj6/og73lnKjnqIvluo/lvIDlp4vov5DooYzml7blsLHoh6rliqjlvIDlp4vmkq3mlL5WaWRlb+OAglxyXG4qPC9wPlxyXG4qXHJcbio8cD5NRE4gVmlkZW/pk77mjqXvvJogPGk+aHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRNTC9FbGVtZW50L3ZpZGVvPC9pPjwvcD5cclxuKi9cclxuLy9jbGFzcyBsYXlhLmRldmljZS5tZWRpYS5WaWRlbyBleHRlbmRzIGxheWEuZGlzcGxheS5TcHJpdGVcclxudmFyIFZpZGVvPShmdW5jdGlvbihfc3VwZXIpe1xyXG5cdGZ1bmN0aW9uIFZpZGVvKHdpZHRoLGhlaWdodCl7XHJcblx0XHR0aGlzLmh0bWxWaWRlbz1udWxsO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQ9bnVsbDtcclxuXHRcdHRoaXMuaW50ZXJuYWxUZXh0dXJlPW51bGw7XHJcblx0XHQod2lkdGg9PT12b2lkIDApJiYgKHdpZHRoPTMyMCk7XHJcblx0XHQoaGVpZ2h0PT09dm9pZCAwKSYmIChoZWlnaHQ9MjQwKTtcclxuXHRcdFZpZGVvLl9fc3VwZXIuY2FsbCh0aGlzKTtcclxuXHRcdGlmIChSZW5kZXIuaXNDb25jaEFwcCB8fCBSZW5kZXIuaXNXZWJHTCl7XHJcblx0XHRcdHRoaXMuaHRtbFZpZGVvPW5ldyBXZWJHTFZpZGVvKCk7XHJcblx0XHR9XHJcblx0XHRlbHNle1xyXG5cdFx0XHR0aGlzLmh0bWxWaWRlbz1uZXcgSHRtbFZpZGVvKCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudD10aGlzLmh0bWxWaWRlby5nZXRWaWRlbygpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQubGF5YVRhcmdldD10aGlzO1xyXG5cdFx0dGhpcy5pbnRlcm5hbFRleHR1cmU9bmV3IFRleHR1cmUodGhpcy5odG1sVmlkZW8pO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsVmlkZW8ub25BYm9ydCk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2FucGxheVwiLFZpZGVvLm9uQ2FucGxheSk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2FucGxheXRocm91Z2hcIixWaWRlby5vbkNhbnBsYXl0aHJvdWdoKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkdXJhdGlvbmNoYW5nZVwiLFZpZGVvLm9uRHVyYXRpb25jaGFuZ2UpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImVtcHRpZWRcIixWaWRlby5vbkVtcHRpZWQpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsVmlkZW8ub25FcnJvcik7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVkZGF0YVwiLFZpZGVvLm9uTG9hZGVkZGF0YSk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVkbWV0YWRhdGFcIixWaWRlby5vbkxvYWRlZG1ldGFkYXRhKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2Fkc3RhcnRcIixWaWRlby5vbkxvYWRzdGFydCk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwicGF1c2VcIixWaWRlby5vblBhdXNlKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwbGF5XCIsVmlkZW8ub25QbGF5KTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwbGF5aW5nXCIsVmlkZW8ub25QbGF5aW5nKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwcm9ncmVzc1wiLFZpZGVvLm9uUHJvZ3Jlc3MpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInJhdGVjaGFuZ2VcIixWaWRlby5vblJhdGVjaGFuZ2UpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInNlZWtlZFwiLFZpZGVvLm9uU2Vla2VkKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzZWVraW5nXCIsVmlkZW8ub25TZWVraW5nKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdGFsbGVkXCIsVmlkZW8ub25TdGFsbGVkKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdXNwZW5kXCIsVmlkZW8ub25TdXNwZW5kKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0aW1ldXBkYXRlXCIsVmlkZW8ub25UaW1ldXBkYXRlKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ2b2x1bWVjaGFuZ2VcIixWaWRlby5vblZvbHVtZWNoYW5nZSk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwid2FpdGluZ1wiLFZpZGVvLm9uV2FpdGluZyk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZW5kZWRcIix0aGlzLm9uUGxheUNvbXBsZXRlWydiaW5kJ10odGhpcykpO1xyXG5cdFx0dGhpcy5zaXplKHdpZHRoLGhlaWdodCk7XHJcblx0XHRpZiAoQnJvd3Nlci5vbk1vYmlsZSl7XHJcblx0XHRcdC8qX19KU19fICovdGhpcy5vbkRvY3VtZW50Q2xpY2s9dGhpcy5vbkRvY3VtZW50Q2xpY2suYmluZCh0aGlzKTtcclxuXHRcdFx0QnJvd3Nlci5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIix0aGlzLm9uRG9jdW1lbnRDbGljayk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRfX2NsYXNzKFZpZGVvLCdsYXlhLmRldmljZS5tZWRpYS5WaWRlbycsX3N1cGVyKTtcclxuXHR2YXIgX19wcm90bz1WaWRlby5wcm90b3R5cGU7XHJcblx0X19wcm90by5vblBsYXlDb21wbGV0ZT1mdW5jdGlvbihlKXtcclxuXHRcdHRoaXMuZXZlbnQoXCJlbmRlZFwiKTtcclxuXHRcdGlmKCFSZW5kZXIuaXNDb25jaEFwcCB8fCAhdGhpcy52aWRlb0VsZW1lbnQubG9vcClcclxuXHRcdFx0TGF5YS50aW1lci5jbGVhcih0aGlzLHRoaXMucmVuZGVyQ2FudmFzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCrorr7nva7mkq3mlL7mupDjgIJcclxuXHQqQHBhcmFtIHVybCDmkq3mlL7mupDot6/lvoTjgIJcclxuXHQqL1xyXG5cdF9fcHJvdG8ubG9hZD1mdW5jdGlvbih1cmwpe1xyXG5cdFx0aWYgKHVybC5pbmRleE9mKFwiYmxvYjpcIik9PTApXHJcblx0XHRcdHRoaXMudmlkZW9FbGVtZW50LnNyYz11cmw7XHJcblx0XHRlbHNlXHJcblx0XHR0aGlzLmh0bWxWaWRlby5zZXRTb3VyY2UodXJsLGxheWEuZGV2aWNlLm1lZGlhLlZpZGVvLk1QNCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQq5byA5aeL5pKt5pS+6KeG6aKR44CCXHJcblx0Ki9cclxuXHRfX3Byb3RvLnBsYXk9ZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnBsYXkoKTtcclxuXHRcdExheWEudGltZXIuZnJhbWVMb29wKDEsdGhpcyx0aGlzLnJlbmRlckNhbnZhcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQq5pqC5YGc6KeG6aKR5pKt5pS+44CCXHJcblx0Ki9cclxuXHRfX3Byb3RvLnBhdXNlPWZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5wYXVzZSgpO1xyXG5cdFx0TGF5YS50aW1lci5jbGVhcih0aGlzLHRoaXMucmVuZGVyQ2FudmFzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCrph43mlrDliqDovb3op4bpopHjgIJcclxuXHQqL1xyXG5cdF9fcHJvdG8ucmVsb2FkPWZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5sb2FkKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQq5qOA5rWL5piv5ZCm5pSv5oyB5pKt5pS+5oyH5a6a5qC85byP6KeG6aKR44CCXHJcblx0KkBwYXJhbSB0eXBlIOWPguaVsOS4ulZpZGVvLk1QNCAvIFZpZGVvLk9HRyAvIFZpZGVvLldFQk3kuYvkuIDjgIJcclxuXHQqQHJldHVybiDooajnpLrmlK/mjIHnmoTnuqfliKvjgILlj6/og73nmoTlgLzvvJpcclxuXHQqPHVsPlxyXG5cdCo8bGk+XCJwcm9iYWJseVwi77yMVmlkZW8uU1VQUE9SVF9QUk9CQUJMWS3mtY/op4jlmajmnIDlj6/og73mlK/mjIHor6Xpn7PpopEv6KeG6aKR57G75Z6LPC9saT5cclxuXHQqPGxpPlwibWF5YmVcIu+8jFZpZGVvLlNVUFBPUlRfTUFZQlkt5rWP6KeI5Zmo5Lmf6K645pSv5oyB6K+l6Z+z6aKRL+inhumikeexu+WeizwvbGk+XHJcblx0KjxsaT5cIlwi77yMVmlkZW8uU1VQUE9SVF9OTy3vvIjnqbrlrZfnrKbkuLLvvInmtY/op4jlmajkuI3mlK/mjIHor6Xpn7PpopEv6KeG6aKR57G75Z6LPC9saT5cclxuXHQqPC91bD5cclxuXHQqL1xyXG5cdF9fcHJvdG8uY2FuUGxheVR5cGU9ZnVuY3Rpb24odHlwZSl7XHJcblx0XHR2YXIgdHlwZVN0cmluZztcclxuXHRcdHN3aXRjaCAodHlwZSl7XHJcblx0XHRcdGNhc2UgbGF5YS5kZXZpY2UubWVkaWEuVmlkZW8uTVA0OlxyXG5cdFx0XHRcdHR5cGVTdHJpbmc9XCJ2aWRlby9tcDRcIjtcclxuXHRcdFx0XHRicmVhayA7XHJcblx0XHRcdGNhc2UgbGF5YS5kZXZpY2UubWVkaWEuVmlkZW8uT0dHOlxyXG5cdFx0XHRcdHR5cGVTdHJpbmc9XCJ2aWRlby9vZ2dcIjtcclxuXHRcdFx0XHRicmVhayA7XHJcblx0XHRcdGNhc2UgbGF5YS5kZXZpY2UubWVkaWEuVmlkZW8uV0VCTTpcclxuXHRcdFx0XHR0eXBlU3RyaW5nPVwidmlkZW8vd2VibVwiO1xyXG5cdFx0XHRcdGJyZWFrIDtcclxuXHRcdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMudmlkZW9FbGVtZW50LmNhblBsYXlUeXBlKHR5cGVTdHJpbmcpO1xyXG5cdH1cclxuXHJcblx0X19wcm90by5yZW5kZXJDYW52YXM9ZnVuY3Rpb24oKXtcclxuXHRcdGlmICh0aGlzLnJlYWR5U3RhdGU9PT0wKVxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHRpZiAoUmVuZGVyLmlzQ29uY2hBcHAgfHwgUmVuZGVyLmlzV2ViR0wpXHJcblx0XHRcdHRoaXMuaHRtbFZpZGVvWyd1cGRhdGVUZXh0dXJlJ10oKTtcclxuXHRcdHRoaXMuZ3JhcGhpY3MuY2xlYXIoKTtcclxuXHRcdHRoaXMuZ3JhcGhpY3MuZHJhd1RleHR1cmUodGhpcy5pbnRlcm5hbFRleHR1cmUsMCwwLHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpO1xyXG5cdH1cclxuXHJcblx0X19wcm90by5vbkRvY3VtZW50Q2xpY2s9ZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnBsYXkoKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnBhdXNlKCk7XHJcblx0XHRCcm93c2VyLmRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLHRoaXMub25Eb2N1bWVudENsaWNrKTtcclxuXHR9XHJcblxyXG5cdF9fcHJvdG8uc2l6ZT1mdW5jdGlvbih3aWR0aCxoZWlnaHQpe1xyXG5cdFx0X3N1cGVyLnByb3RvdHlwZS5zaXplLmNhbGwodGhpcyx3aWR0aCxoZWlnaHQpXHJcblx0XHRpZiAoUmVuZGVyLmlzQ29uY2hBcHApe1xyXG5cdFx0XHR2YXIgdHJhbnNmb3JtPVV0aWxzLmdldFRyYW5zZm9ybVJlbGF0aXZlVG9XaW5kb3codGhpcywwLDApO1xyXG5cdFx0XHR0aGlzLnZpZGVvRWxlbWVudC53aWR0aD13aWR0aCAqdHJhbnNmb3JtLnNjYWxlWDtcclxuXHRcdH1cclxuXHRcdGVsc2V7XHJcblx0XHRcdHRoaXMudmlkZW9FbGVtZW50LndpZHRoPXdpZHRoIC8gQnJvd3Nlci5waXhlbFJhdGlvO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMucGF1c2VkKXRoaXMucmVuZGVyQ2FudmFzKCk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCrplIDmr4HlhoXpg6jkuovku7bnu5HlrprjgIJcclxuXHQqL1xyXG5cdF9fcHJvdG8uZGVzdHJveT1mdW5jdGlvbihkZXRyb3lDaGlsZHJlbil7XHJcblx0XHQoZGV0cm95Q2hpbGRyZW49PT12b2lkIDApJiYgKGRldHJveUNoaWxkcmVuPXRydWUpO1xyXG5cdFx0X3N1cGVyLnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyxkZXRyb3lDaGlsZHJlbik7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiYWJvcnRcIixWaWRlby5vbkFib3J0KTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5XCIsVmlkZW8ub25DYW5wbGF5KTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5dGhyb3VnaFwiLFZpZGVvLm9uQ2FucGxheXRocm91Z2gpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImR1cmF0aW9uY2hhbmdlXCIsVmlkZW8ub25EdXJhdGlvbmNoYW5nZSk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZW1wdGllZFwiLFZpZGVvLm9uRW1wdGllZCk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXJyb3JcIixWaWRlby5vbkVycm9yKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkZWRkYXRhXCIsVmlkZW8ub25Mb2FkZWRkYXRhKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkZWRtZXRhZGF0YVwiLFZpZGVvLm9uTG9hZGVkbWV0YWRhdGEpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRzdGFydFwiLFZpZGVvLm9uTG9hZHN0YXJ0KTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwYXVzZVwiLFZpZGVvLm9uUGF1c2UpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBsYXlcIixWaWRlby5vblBsYXkpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBsYXlpbmdcIixWaWRlby5vblBsYXlpbmcpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInByb2dyZXNzXCIsVmlkZW8ub25Qcm9ncmVzcyk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwicmF0ZWNoYW5nZVwiLFZpZGVvLm9uUmF0ZWNoYW5nZSk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Vla2VkXCIsVmlkZW8ub25TZWVrZWQpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNlZWtpbmdcIixWaWRlby5vblNlZWtpbmcpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInN0YWxsZWRcIixWaWRlby5vblN0YWxsZWQpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInN1c3BlbmRcIixWaWRlby5vblN1c3BlbmQpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRpbWV1cGRhdGVcIixWaWRlby5vblRpbWV1cGRhdGUpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZvbHVtZWNoYW5nZVwiLFZpZGVvLm9uVm9sdW1lY2hhbmdlKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ3YWl0aW5nXCIsVmlkZW8ub25XYWl0aW5nKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJlbmRlZFwiLHRoaXMub25QbGF5Q29tcGxldGUpO1xyXG5cdFx0dGhpcy5wYXVzZSgpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQubGF5YVRhcmdldD1udWxsXHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudD1udWxsO1xyXG5cdFx0dGhpcy5odG1sVmlkZW8uZGVzdHJveSgpO1xyXG5cdH1cclxuXHJcblx0X19wcm90by5zeW5jVmlkZW9Qb3NpdGlvbj1mdW5jdGlvbigpe1xyXG5cdFx0dmFyIHN0YWdlPUxheWEuc3RhZ2U7XHJcblx0XHR2YXIgcmVjO1xyXG5cdFx0cmVjPVV0aWxzLmdldEdsb2JhbFBvc0FuZFNjYWxlKHRoaXMpO1xyXG5cdFx0dmFyIGE9c3RhZ2UuX2NhbnZhc1RyYW5zZm9ybS5hLGQ9c3RhZ2UuX2NhbnZhc1RyYW5zZm9ybS5kO1xyXG5cdFx0dmFyIHg9cmVjLnggKnN0YWdlLmNsaWVudFNjYWxlWCAqYStzdGFnZS5vZmZzZXQueDtcclxuXHRcdHZhciB5PXJlYy55ICpzdGFnZS5jbGllbnRTY2FsZVkgKmQrc3RhZ2Uub2Zmc2V0Lnk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5zdHlsZS5sZWZ0PXgrJ3B4Jzs7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5zdHlsZS50b3A9eSsncHgnO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQud2lkdGg9dGhpcy53aWR0aCAvIEJyb3dzZXIucGl4ZWxSYXRpbztcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmhlaWdodD10aGlzLmhlaWdodCAvIEJyb3dzZXIucGl4ZWxSYXRpbztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCpidWZmZXJlZCDlsZ7mgKfov5Tlm54gVGltZVJhbmdlcyhKUynlr7nosaHjgIJUaW1lUmFuZ2VzIOWvueixoeihqOekuueUqOaIt+eahOmfs+inhumikee8k+WGsuiMg+WbtOOAgue8k+WGsuiMg+WbtOaMh+eahOaYr+W3sue8k+WGsumfs+inhumikeeahOaXtumXtOiMg+WbtOOAguWmguaenOeUqOaIt+WcqOmfs+inhumikeS4rei3s+i3g+aSreaUvu+8jOS8muW+l+WIsOWkmuS4que8k+WGsuiMg+WbtOOAglxyXG5cdCo8cD5idWZmZXJlZC5sZW5ndGjov5Tlm57nvJPlhrLojIPlm7TkuKrmlbDjgILlpoLojrflj5bnrKzkuIDkuKrnvJPlhrLojIPlm7TliJnmmK9idWZmZXJlZC5zdGFydCgwKeWSjGJ1ZmZlcmVkLmVuZCgwKeOAguS7peenkuiuoeOAgjwvcD5cclxuXHQqQHJldHVybiBUaW1lUmFuZ2VzKEpTKeWvueixoVxyXG5cdCovXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCdidWZmZXJlZCcsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLnZpZGVvRWxlbWVudC5idWZmZXJlZDtcclxuXHR9KTtcclxuXHJcblx0LyoqXHJcblx0KuiOt+WPluinhumikea6kOWwuuWvuOOAgnJlYWR55LqL5Lu26Kem5Y+R5ZCO5Y+v55So44CCXHJcblx0Ki9cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ3ZpZGVvV2lkdGgnLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy52aWRlb0VsZW1lbnQudmlkZW9XaWR0aDtcclxuXHR9KTtcclxuXHJcblx0LyoqXHJcblx0KuiOt+WPluW9k+WJjeaSreaUvua6kOi3r+W+hOOAglxyXG5cdCovXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCdjdXJyZW50U3JjJyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMudmlkZW9FbGVtZW50LmN1cnJlbnRTcmM7XHJcblx0fSk7XHJcblxyXG5cdC8qKlxyXG5cdCrorr7nva7lkozojrflj5blvZPliY3mkq3mlL7lpLTkvY3nva7jgIJcclxuXHQqL1xyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywnY3VycmVudFRpbWUnLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy52aWRlb0VsZW1lbnQuY3VycmVudFRpbWU7XHJcblx0XHR9LGZ1bmN0aW9uKHZhbHVlKXtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmN1cnJlbnRUaW1lPXZhbHVlO1xyXG5cdFx0dGhpcy5yZW5kZXJDYW52YXMoKTtcclxuXHR9KTtcclxuXHJcblx0LyoqXHJcblx0Kui/lOWbnumfs+mikS/op4bpopHnmoTmkq3mlL7mmK/lkKblt7Lnu5PmnZ9cclxuXHQqL1xyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywnZW5kZWQnLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy52aWRlb0VsZW1lbnQuZW5kZWQ7XHJcblx0fSk7XHJcblxyXG5cdC8qKlxyXG5cdCrorr7nva7lkozojrflj5blvZPliY3pn7Pph4/jgIJcclxuXHQqL1xyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywndm9sdW1lJyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMudmlkZW9FbGVtZW50LnZvbHVtZTtcclxuXHRcdH0sZnVuY3Rpb24odmFsdWUpe1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQudm9sdW1lPXZhbHVlO1xyXG5cdH0pO1xyXG5cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ3ZpZGVvSGVpZ2h0JyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMudmlkZW9FbGVtZW50LnZpZGVvSGVpZ2h0O1xyXG5cdH0pO1xyXG5cclxuXHQvKipcclxuXHQq6KGo56S66KeG6aKR5YWD57Sg55qE5bCx57uq54q25oCB77yaXHJcblx0Kjx1bD5cclxuXHQqPGxpPjA9SEFWRV9OT1RISU5HLeayoeacieWFs+S6jumfs+mikS/op4bpopHmmK/lkKblsLHnu6rnmoTkv6Hmga88L2xpPlxyXG5cdCo8bGk+MT1IQVZFX01FVEFEQVRBLeWFs+S6jumfs+mikS/op4bpopHlsLHnu6rnmoTlhYPmlbDmja48L2xpPlxyXG5cdCo8bGk+Mj1IQVZFX0NVUlJFTlRfREFUQS3lhbPkuo7lvZPliY3mkq3mlL7kvY3nva7nmoTmlbDmja7mmK/lj6/nlKjnmoTvvIzkvYbmsqHmnInotrPlpJ/nmoTmlbDmja7mnaXmkq3mlL7kuIvkuIDluKcv5q+r56eSPC9saT5cclxuXHQqPGxpPjM9SEFWRV9GVVRVUkVfREFUQS3lvZPliY3lj4roh7PlsJHkuIvkuIDluKfnmoTmlbDmja7mmK/lj6/nlKjnmoQ8L2xpPlxyXG5cdCo8bGk+ND1IQVZFX0VOT1VHSF9EQVRBLeWPr+eUqOaVsOaNrui2s+S7peW8gOWni+aSreaUvjwvbGk+XHJcblx0KjwvdWw+XHJcblx0Ki9cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ3JlYWR5U3RhdGUnLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy52aWRlb0VsZW1lbnQucmVhZHlTdGF0ZTtcclxuXHR9KTtcclxuXHJcblx0LyoqXHJcblx0KuiOt+WPluinhumikemVv+W6pu+8iOenku+8ieOAgnJlYWR55LqL5Lu26Kem5Y+R5ZCO5Y+v55So44CCXHJcblx0Ki9cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ2R1cmF0aW9uJyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMudmlkZW9FbGVtZW50LmR1cmF0aW9uO1xyXG5cdH0pO1xyXG5cclxuXHQvKipcclxuXHQq6L+U5Zue6KGo56S66Z+z6aKRL+inhumikemUmeivr+eKtuaAgeeahCBNZWRpYUVycm9y77yISlPvvInlr7nosaHjgIJcclxuXHQqL1xyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywnZXJyb3InLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy52aWRlb0VsZW1lbnQuZXJyb3I7XHJcblx0fSk7XHJcblxyXG5cdC8qKlxyXG5cdCrorr7nva7miJbov5Tlm57pn7PpopEv6KeG6aKR5piv5ZCm5bqU5Zyo57uT5p2f5pe26YeN5paw5pKt5pS+44CCXHJcblx0Ki9cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ2xvb3AnLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy52aWRlb0VsZW1lbnQubG9vcDtcclxuXHRcdH0sZnVuY3Rpb24odmFsdWUpe1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQubG9vcD12YWx1ZTtcclxuXHR9KTtcclxuXHJcblx0LyoqXHJcblx0Kuiuvue9ruinhumikeeahHjlnZDmoIdcclxuXHQqL1xyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywneCcsX3N1cGVyLnByb3RvdHlwZS5fJGdldF94LGZ1bmN0aW9uKHZhbCl7XHJcblx0XHRMYXlhLnN1cGVyU2V0KFNwcml0ZSx0aGlzLCd4Jyx2YWwpO1xyXG5cdFx0aWYgKFJlbmRlci5pc0NvbmNoQXBwKXtcclxuXHRcdFx0dmFyIHRyYW5zZm9ybT1VdGlscy5nZXRUcmFuc2Zvcm1SZWxhdGl2ZVRvV2luZG93KHRoaXMsMCwwKTtcclxuXHRcdFx0dGhpcy52aWRlb0VsZW1lbnQuc3R5bGUubGVmdD10cmFuc2Zvcm0ueDtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyoqXHJcblx0Kuiuvue9ruinhumikeeahHnlnZDmoIdcclxuXHQqL1xyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywneScsX3N1cGVyLnByb3RvdHlwZS5fJGdldF95LGZ1bmN0aW9uKHZhbCl7XHJcblx0XHRMYXlhLnN1cGVyU2V0KFNwcml0ZSx0aGlzLCd5Jyx2YWwpO1xyXG5cdFx0aWYgKFJlbmRlci5pc0NvbmNoQXBwKXtcclxuXHRcdFx0dmFyIHRyYW5zZm9ybT1VdGlscy5nZXRUcmFuc2Zvcm1SZWxhdGl2ZVRvV2luZG93KHRoaXMsMCwwKTtcclxuXHRcdFx0dGhpcy52aWRlb0VsZW1lbnQuc3R5bGUudG9wPXRyYW5zZm9ybS55O1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKipcclxuXHQqcGxheWJhY2tSYXRlIOWxnuaAp+iuvue9ruaIlui/lOWbnumfs+mikS/op4bpopHnmoTlvZPliY3mkq3mlL7pgJ/luqbjgILlpoLvvJpcclxuXHQqPHVsPlxyXG5cdCo8bGk+MS4wIOato+W4uOmAn+W6pjwvbGk+XHJcblx0KjxsaT4wLjUg5Y2K6YCf77yI5pu05oWi77yJPC9saT5cclxuXHQqPGxpPjIuMCDlgI3pgJ/vvIjmm7Tlv6vvvIk8L2xpPlxyXG5cdCo8bGk+LTEuMCDlkJHlkI7vvIzmraPluLjpgJ/luqY8L2xpPlxyXG5cdCo8bGk+LTAuNSDlkJHlkI7vvIzljYrpgJ88L2xpPlxyXG5cdCo8L3VsPlxyXG5cdCo8cD7lj6rmnIkgR29vZ2xlIENocm9tZSDlkowgU2FmYXJpIOaUr+aMgSBwbGF5YmFja1JhdGUg5bGe5oCn44CCPC9wPlxyXG5cdCovXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCdwbGF5YmFja1JhdGUnLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy52aWRlb0VsZW1lbnQucGxheWJhY2tSYXRlO1xyXG5cdFx0fSxmdW5jdGlvbih2YWx1ZSl7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5wbGF5YmFja1JhdGU9dmFsdWU7XHJcblx0fSk7XHJcblxyXG5cdC8qKlxyXG5cdCrojrflj5blkozorr7nva7pnZnpn7PnirbmgIHjgIJcclxuXHQqL1xyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywnbXV0ZWQnLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy52aWRlb0VsZW1lbnQubXV0ZWQ7XHJcblx0XHR9LGZ1bmN0aW9uKHZhbHVlKXtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50Lm11dGVkPXZhbHVlO1xyXG5cdH0pO1xyXG5cclxuXHQvKipcclxuXHQq6L+U5Zue6KeG6aKR5piv5ZCm5pqC5YGcXHJcblx0Ki9cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ3BhdXNlZCcsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLnZpZGVvRWxlbWVudC5wYXVzZWQ7XHJcblx0fSk7XHJcblxyXG5cdC8qKlxyXG5cdCpwcmVsb2FkIOWxnuaAp+iuvue9ruaIlui/lOWbnuaYr+WQpuWcqOmhtemdouWKoOi9veWQjueri+WNs+WKoOi9veinhumikeOAguWPr+i1i+WAvOWmguS4i++8mlxyXG5cdCo8dWw+XHJcblx0KjxsaT5hdXRvIOaMh+ekuuS4gOaXpumhtemdouWKoOi9ve+8jOWImeW8gOWni+WKoOi9veinhumikeOAgjwvbGk+XHJcblx0KjxsaT5tZXRhZGF0YSDmjIfnpLrlvZPpobXpnaLliqDovb3lkI7ku4XliqDovb3pn7PpopEv6KeG6aKR55qE5YWD5pWw5o2u44CCPC9saT5cclxuXHQqPGxpPm5vbmUg5oyH56S66aG16Z2i5Yqg6L295ZCO5LiN5bqU5Yqg6L296Z+z6aKRL+inhumikeOAgjwvbGk+XHJcblx0KjwvdWw+XHJcblx0Ki9cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ3ByZWxvYWQnLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy52aWRlb0VsZW1lbnQucHJlbG9hZDtcclxuXHRcdH0sZnVuY3Rpb24odmFsdWUpe1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucHJlbG9hZD12YWx1ZTtcclxuXHR9KTtcclxuXHJcblx0LyoqXHJcblx0KuWPguingSA8aT5odHRwOi8vd3d3Lnczc2Nob29sLmNvbS5jbi90YWdzL2F2X3Byb3Bfc2Vla2FibGUuYXNwPC9pPuOAglxyXG5cdCovXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCdzZWVrYWJsZScsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLnZpZGVvRWxlbWVudC5zZWVrYWJsZTtcclxuXHR9KTtcclxuXHJcblx0LyoqXHJcblx0KnNlZWtpbmcg5bGe5oCn6L+U5Zue55So5oi355uu5YmN5piv5ZCm5Zyo6Z+z6aKRL+inhumikeS4reWvu+WdgOOAglxyXG5cdCrlr7vlnYDkuK3vvIhTZWVraW5n77yJ5oyH55qE5piv55So5oi35Zyo6Z+z6aKRL+inhumikeS4reenu+WKqC/ot7Pot4PliLDmlrDnmoTkvY3nva7jgIJcclxuXHQqL1xyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywnc2Vla2luZycsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLnZpZGVvRWxlbWVudC5zZWVraW5nO1xyXG5cdH0pO1xyXG5cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ3dpZHRoJyxfc3VwZXIucHJvdG90eXBlLl8kZ2V0X3dpZHRoLGZ1bmN0aW9uKHZhbHVlKXtcclxuXHRcdGlmIChSZW5kZXIuaXNDb25jaEFwcCl7XHJcblx0XHRcdHZhciB0cmFuc2Zvcm09VXRpbHMuZ2V0VHJhbnNmb3JtUmVsYXRpdmVUb1dpbmRvdyh0aGlzLDAsMCk7XHJcblx0XHRcdHRoaXMudmlkZW9FbGVtZW50LndpZHRoPXZhbHVlICp0cmFuc2Zvcm0uc2NhbGVYO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0dGhpcy52aWRlb0VsZW1lbnQud2lkdGg9dGhpcy53aWR0aCAvIEJyb3dzZXIucGl4ZWxSYXRpbztcclxuXHRcdH1cclxuXHRcdExheWEuc3VwZXJTZXQoU3ByaXRlLHRoaXMsJ3dpZHRoJyx2YWx1ZSk7XHJcblx0XHRpZiAodGhpcy5wYXVzZWQpdGhpcy5yZW5kZXJDYW52YXMoKTtcclxuXHR9KTtcclxuXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCdoZWlnaHQnLF9zdXBlci5wcm90b3R5cGUuXyRnZXRfaGVpZ2h0LGZ1bmN0aW9uKHZhbHVlKXtcclxuXHRcdGlmIChSZW5kZXIuaXNDb25jaEFwcCl7XHJcblx0XHRcdHZhciB0cmFuc2Zvcm09VXRpbHMuZ2V0VHJhbnNmb3JtUmVsYXRpdmVUb1dpbmRvdyh0aGlzLDAsMCk7XHJcblx0XHRcdHRoaXMudmlkZW9FbGVtZW50LmhlaWdodD12YWx1ZSAqdHJhbnNmb3JtLnNjYWxlWTtcclxuXHRcdH1cclxuXHRcdGVsc2V7XHJcblx0XHRcdHRoaXMudmlkZW9FbGVtZW50LmhlaWdodD10aGlzLmhlaWdodCAvIEJyb3dzZXIucGl4ZWxSYXRpbztcclxuXHRcdH1cclxuXHRcdExheWEuc3VwZXJTZXQoU3ByaXRlLHRoaXMsJ2hlaWdodCcsdmFsdWUpO1xyXG5cdH0pO1xyXG5cclxuXHRWaWRlby5vbkFib3J0PWZ1bmN0aW9uKGUpe2UudGFyZ2V0LmxheWFUYXJnZXQuZXZlbnQoXCJhYm9ydFwiKX1cclxuXHRWaWRlby5vbkNhbnBsYXk9ZnVuY3Rpb24oZSl7ZS50YXJnZXQubGF5YVRhcmdldC5ldmVudChcImNhbnBsYXlcIil9XHJcblx0VmlkZW8ub25DYW5wbGF5dGhyb3VnaD1mdW5jdGlvbihlKXtlLnRhcmdldC5sYXlhVGFyZ2V0LmV2ZW50KFwiY2FucGxheXRocm91Z2hcIil9XHJcblx0VmlkZW8ub25EdXJhdGlvbmNoYW5nZT1mdW5jdGlvbihlKXtlLnRhcmdldC5sYXlhVGFyZ2V0LmV2ZW50KFwiZHVyYXRpb25jaGFuZ2VcIil9XHJcblx0VmlkZW8ub25FbXB0aWVkPWZ1bmN0aW9uKGUpe2UudGFyZ2V0LmxheWFUYXJnZXQuZXZlbnQoXCJlbXB0aWVkXCIpfVxyXG5cdFZpZGVvLm9uRXJyb3I9ZnVuY3Rpb24oZSl7ZS50YXJnZXQubGF5YVRhcmdldC5ldmVudChcImVycm9yXCIpfVxyXG5cdFZpZGVvLm9uTG9hZGVkZGF0YT1mdW5jdGlvbihlKXtlLnRhcmdldC5sYXlhVGFyZ2V0LmV2ZW50KFwibG9hZGVkZGF0YVwiKX1cclxuXHRWaWRlby5vbkxvYWRlZG1ldGFkYXRhPWZ1bmN0aW9uKGUpe2UudGFyZ2V0LmxheWFUYXJnZXQuZXZlbnQoXCJsb2FkZWRtZXRhZGF0YVwiKX1cclxuXHRWaWRlby5vbkxvYWRzdGFydD1mdW5jdGlvbihlKXtlLnRhcmdldC5sYXlhVGFyZ2V0LmV2ZW50KFwibG9hZHN0YXJ0XCIpfVxyXG5cdFZpZGVvLm9uUGF1c2U9ZnVuY3Rpb24oZSl7ZS50YXJnZXQubGF5YVRhcmdldC5ldmVudChcInBhdXNlXCIpfVxyXG5cdFZpZGVvLm9uUGxheT1mdW5jdGlvbihlKXtlLnRhcmdldC5sYXlhVGFyZ2V0LmV2ZW50KFwicGxheVwiKX1cclxuXHRWaWRlby5vblBsYXlpbmc9ZnVuY3Rpb24oZSl7ZS50YXJnZXQubGF5YVRhcmdldC5ldmVudChcInBsYXlpbmdcIil9XHJcblx0VmlkZW8ub25Qcm9ncmVzcz1mdW5jdGlvbihlKXtlLnRhcmdldC5sYXlhVGFyZ2V0LmV2ZW50KFwicHJvZ3Jlc3NcIil9XHJcblx0VmlkZW8ub25SYXRlY2hhbmdlPWZ1bmN0aW9uKGUpe2UudGFyZ2V0LmxheWFUYXJnZXQuZXZlbnQoXCJyYXRlY2hhbmdlXCIpfVxyXG5cdFZpZGVvLm9uU2Vla2VkPWZ1bmN0aW9uKGUpe2UudGFyZ2V0LmxheWFUYXJnZXQuZXZlbnQoXCJzZWVrZWRcIil9XHJcblx0VmlkZW8ub25TZWVraW5nPWZ1bmN0aW9uKGUpe2UudGFyZ2V0LmxheWFUYXJnZXQuZXZlbnQoXCJzZWVraW5nXCIpfVxyXG5cdFZpZGVvLm9uU3RhbGxlZD1mdW5jdGlvbihlKXtlLnRhcmdldC5sYXlhVGFyZ2V0LmV2ZW50KFwic3RhbGxlZFwiKX1cclxuXHRWaWRlby5vblN1c3BlbmQ9ZnVuY3Rpb24oZSl7ZS50YXJnZXQubGF5YVRhcmdldC5ldmVudChcInN1c3BlbmRcIil9XHJcblx0VmlkZW8ub25UaW1ldXBkYXRlPWZ1bmN0aW9uKGUpe2UudGFyZ2V0LmxheWFUYXJnZXQuZXZlbnQoXCJ0aW1ldXBkYXRlXCIpfVxyXG5cdFZpZGVvLm9uVm9sdW1lY2hhbmdlPWZ1bmN0aW9uKGUpe2UudGFyZ2V0LmxheWFUYXJnZXQuZXZlbnQoXCJ2b2x1bWVjaGFuZ2VcIil9XHJcblx0VmlkZW8ub25XYWl0aW5nPWZ1bmN0aW9uKGUpe2UudGFyZ2V0LmxheWFUYXJnZXQuZXZlbnQoXCJ3YWl0aW5nXCIpfVxyXG5cdFZpZGVvLk1QND0xO1xyXG5cdFZpZGVvLk9HRz0yO1xyXG5cdFZpZGVvLkNBTUVSQT00O1xyXG5cdFZpZGVvLldFQk09ODtcclxuXHRWaWRlby5TVVBQT1JUX1BST0JBQkxZPVwicHJvYmFibHlcIjtcclxuXHRWaWRlby5TVVBQT1JUX01BWUJZPVwibWF5YmVcIjtcclxuXHRWaWRlby5TVVBQT1JUX05PPVwiXCI7XHJcblx0cmV0dXJuIFZpZGVvO1xyXG59KShTcHJpdGUpXHJcblxyXG5cclxuLyoqXHJcbipAcHJpdmF0ZVxyXG4qL1xyXG4vL2NsYXNzIGxheWEuZGV2aWNlLm1lZGlhLldlYkdMVmlkZW8gZXh0ZW5kcyBsYXlhLmRldmljZS5tZWRpYS5IdG1sVmlkZW9cclxudmFyIFdlYkdMVmlkZW89KGZ1bmN0aW9uKF9zdXBlcil7XHJcblx0ZnVuY3Rpb24gV2ViR0xWaWRlbygpe1xyXG5cdFx0dGhpcy5nbD1udWxsO1xyXG5cdFx0dGhpcy5wcmVUYXJnZXQ9bnVsbDtcclxuXHRcdHRoaXMucHJlVGV4dHVyZT1udWxsO1xyXG5cdFx0V2ViR0xWaWRlby5fX3N1cGVyLmNhbGwodGhpcyk7XHJcblx0XHRpZighUmVuZGVyLmlzQ29uY2hBcHAgJiYgQnJvd3Nlci5vbklQaG9uZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0dGhpcy5nbD0vKl9fSlNfXyAqL1JlbmRlci5pc0NvbmNoQXBwID8gTGF5YUdMQ29udGV4dC5pbnN0YW5jZSA6V2ViR0wubWFpbkNvbnRleHQ7XHJcblx0XHR0aGlzLl9zb3VyY2U9dGhpcy5nbC5jcmVhdGVUZXh0dXJlKCk7XHJcblx0XHRXZWJHTENvbnRleHQuYmluZFRleHR1cmUodGhpcy5nbCwvKmxheWEud2ViZ2wuV2ViR0xDb250ZXh0LlRFWFRVUkVfMkQqLzB4MERFMSx0aGlzLl9zb3VyY2UpO1xyXG5cdFx0dGhpcy5nbC50ZXhQYXJhbWV0ZXJpKC8qbGF5YS53ZWJnbC5XZWJHTENvbnRleHQuVEVYVFVSRV8yRCovMHgwREUxLC8qbGF5YS53ZWJnbC5XZWJHTENvbnRleHQuVEVYVFVSRV9XUkFQX1MqLzB4MjgwMiwvKmxheWEud2ViZ2wuV2ViR0xDb250ZXh0LkNMQU1QX1RPX0VER0UqLzB4ODEyRik7XHJcblx0XHR0aGlzLmdsLnRleFBhcmFtZXRlcmkoLypsYXlhLndlYmdsLldlYkdMQ29udGV4dC5URVhUVVJFXzJEKi8weDBERTEsLypsYXlhLndlYmdsLldlYkdMQ29udGV4dC5URVhUVVJFX1dSQVBfVCovMHgyODAzLC8qbGF5YS53ZWJnbC5XZWJHTENvbnRleHQuQ0xBTVBfVE9fRURHRSovMHg4MTJGKTtcclxuXHRcdHRoaXMuZ2wudGV4UGFyYW1ldGVyaSgvKmxheWEud2ViZ2wuV2ViR0xDb250ZXh0LlRFWFRVUkVfMkQqLzB4MERFMSwvKmxheWEud2ViZ2wuV2ViR0xDb250ZXh0LlRFWFRVUkVfTUFHX0ZJTFRFUiovMHgyODAwLC8qbGF5YS53ZWJnbC5XZWJHTENvbnRleHQuTElORUFSKi8weDI2MDEpO1xyXG5cdFx0dGhpcy5nbC50ZXhQYXJhbWV0ZXJpKC8qbGF5YS53ZWJnbC5XZWJHTENvbnRleHQuVEVYVFVSRV8yRCovMHgwREUxLC8qbGF5YS53ZWJnbC5XZWJHTENvbnRleHQuVEVYVFVSRV9NSU5fRklMVEVSKi8weDI4MDEsLypsYXlhLndlYmdsLldlYkdMQ29udGV4dC5MSU5FQVIqLzB4MjYwMSk7XHJcblx0XHRXZWJHTENvbnRleHQuYmluZFRleHR1cmUodGhpcy5nbCwvKmxheWEud2ViZ2wuV2ViR0xDb250ZXh0LlRFWFRVUkVfMkQqLzB4MERFMSxudWxsKTtcclxuXHR9XHJcblxyXG5cdF9fY2xhc3MoV2ViR0xWaWRlbywnbGF5YS5kZXZpY2UubWVkaWEuV2ViR0xWaWRlbycsX3N1cGVyKTtcclxuXHR2YXIgX19wcm90bz1XZWJHTFZpZGVvLnByb3RvdHlwZTtcclxuXHQvLyhwcmVUYXJnZXQgJiYgcHJlVGV4dHVyZSkmJiAoV2ViR0xDb250ZXh0LmJpbmRUZXh0dXJlKGdsLHByZVRhcmdldCxwcmVUZXh0dXJlKSk7XHJcblx0X19wcm90by51cGRhdGVUZXh0dXJlPWZ1bmN0aW9uKCl7XHJcblx0XHRpZighUmVuZGVyLmlzQ29uY2hBcHAgJiYgQnJvd3Nlci5vbklQaG9uZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0V2ViR0xDb250ZXh0LmJpbmRUZXh0dXJlKHRoaXMuZ2wsLypsYXlhLndlYmdsLldlYkdMQ29udGV4dC5URVhUVVJFXzJEKi8weDBERTEsdGhpcy5fc291cmNlKTtcclxuXHRcdHRoaXMuZ2wudGV4SW1hZ2UyRCgvKmxheWEud2ViZ2wuV2ViR0xDb250ZXh0LlRFWFRVUkVfMkQqLzB4MERFMSwwLC8qbGF5YS53ZWJnbC5XZWJHTENvbnRleHQuUkdCKi8weDE5MDcsLypsYXlhLndlYmdsLldlYkdMQ29udGV4dC5SR0IqLzB4MTkwNywvKmxheWEud2ViZ2wuV2ViR0xDb250ZXh0LlVOU0lHTkVEX0JZVEUqLzB4MTQwMSx0aGlzLnZpZGVvKTtcclxuXHRcdFdlYkdMVmlkZW8uY3VyQmluZFNvdXJjZT10aGlzLl9zb3VyY2U7XHJcblx0fVxyXG5cclxuXHRfX3Byb3RvLmRlc3Ryb3k9ZnVuY3Rpb24oKXtcclxuXHRcdGlmICh0aGlzLl9zb3VyY2Upe1xyXG5cdFx0XHR0aGlzLmdsPS8qX19KU19fICovUmVuZGVyLmlzQ29uY2hBcHAgPyBMYXlhR0xDb250ZXh0Lmluc3RhbmNlIDpXZWJHTC5tYWluQ29udGV4dDtcclxuXHRcdFx0aWYgKFdlYkdMVmlkZW8uY3VyQmluZFNvdXJjZT09dGhpcy5fc291cmNlKXtcclxuXHRcdFx0XHRXZWJHTENvbnRleHQuYmluZFRleHR1cmUodGhpcy5nbCwvKmxheWEud2ViZ2wuV2ViR0xDb250ZXh0LlRFWFRVUkVfMkQqLzB4MERFMSxudWxsKTtcclxuXHRcdFx0XHRXZWJHTFZpZGVvLmN1ckJpbmRTb3VyY2U9bnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmdsLmRlbGV0ZVRleHR1cmUodGhpcy5fc291cmNlKTtcclxuXHRcdH1cclxuXHRcdGxheWEucmVzb3VyY2UuUmVzb3VyY2UucHJvdG90eXBlLmRlc3Ryb3kuY2FsbCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywnX2dsVGV4dHVyZScsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLl9zb3VyY2U7XHJcblx0fSk7XHJcblxyXG5cdFdlYkdMVmlkZW8uY3VyQmluZFNvdXJjZT1udWxsO1xyXG5cdHJldHVybiBXZWJHTFZpZGVvO1xyXG59KShIdG1sVmlkZW8pXHJcblxyXG5cclxuXHRMYXlhLl9faW5pdChbTWVkaWFdKTtcclxufSkod2luZG93LGRvY3VtZW50LExheWEpO1xyXG4iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cclxuaW1wb3J0IE1haW5TY2VuZSBmcm9tIFwiLi9zY3JpcHQvTWFpblNjZW5lXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb25maWcge1xyXG4gICAgc3RhdGljIGluaXQoKSB7XHJcbiAgICAgICAgLy/ms6jlhoxTY3JpcHTmiJbogIVSdW50aW1l5byV55SoXHJcbiAgICAgICAgbGV0IHJlZyA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcclxuXHRcdHJlZyhcInNjcmlwdC9NYWluU2NlbmUuanNcIixNYWluU2NlbmUpO1xyXG4gICAgfVxyXG59XHJcbkdhbWVDb25maWcud2lkdGggPSA2NDA7XHJcbkdhbWVDb25maWcuaGVpZ2h0ID0gMTEzNjtcclxuR2FtZUNvbmZpZy5zY2FsZU1vZGUgPVwiZXhhY3RmaXRcIjtcclxuR2FtZUNvbmZpZy5zY3JlZW5Nb2RlID0gXCJub25lXCI7XHJcbkdhbWVDb25maWcuYWxpZ25WID0gXCJ0b3BcIjtcclxuR2FtZUNvbmZpZy5hbGlnbkggPSBcImxlZnRcIjtcclxuR2FtZUNvbmZpZy5zdGFydFNjZW5lID0gXCJNYWluLnNjZW5lXCI7XHJcbkdhbWVDb25maWcuc2NlbmVSb290ID0gXCJcIjtcclxuR2FtZUNvbmZpZy5kZWJ1ZyA9IGZhbHNlO1xyXG5HYW1lQ29uZmlnLnN0YXQgPSBmYWxzZTtcclxuR2FtZUNvbmZpZy5waHlzaWNzRGVidWcgPSBmYWxzZTtcclxuR2FtZUNvbmZpZy5leHBvcnRTY2VuZVRvSnNvbiA9IHRydWU7XHJcblxyXG5HYW1lQ29uZmlnLmluaXQoKTtcclxuIiwiaW1wb3J0IEdhbWVDb25maWcgZnJvbSBcIi4vR2FtZUNvbmZpZ1wiO1xyXG5jbGFzcyBNYWluIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdC8v5qC55o2uSURF6K6+572u5Yid5aeL5YyW5byV5pOOXHRcdFxyXG5cdFx0aWYgKHdpbmRvd1tcIkxheWEzRFwiXSkgTGF5YTNELmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQpO1xyXG5cdFx0ZWxzZSBMYXlhLmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQsIExheWFbXCJXZWJHTFwiXSk7XHJcblx0XHRMYXlhW1wiUGh5c2ljc1wiXSAmJiBMYXlhW1wiUGh5c2ljc1wiXS5lbmFibGUoKTtcclxuXHRcdExheWFbXCJEZWJ1Z1BhbmVsXCJdICYmIExheWFbXCJEZWJ1Z1BhbmVsXCJdLmVuYWJsZSgpO1xyXG5cdFx0TGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBHYW1lQ29uZmlnLnNjYWxlTW9kZTtcclxuXHRcdExheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IEdhbWVDb25maWcuc2NyZWVuTW9kZTtcclxuXHRcdExheWEuc3RhZ2UuYWxpZ25WID0gR2FtZUNvbmZpZy5hbGlnblY7XHJcblx0XHRMYXlhLnN0YWdlLmFsaWduSCA9IEdhbWVDb25maWcuYWxpZ25IO1xyXG5cdFx0Ly/lhbzlrrnlvq7kv6HkuI3mlK/mjIHliqDovb1zY2VuZeWQjue8gOWcuuaZr1xyXG5cdFx0TGF5YS5VUkwuZXhwb3J0U2NlbmVUb0pzb24gPSBHYW1lQ29uZmlnLmV4cG9ydFNjZW5lVG9Kc29uO1xyXG5cclxuXHRcdC8v5omT5byA6LCD6K+V6Z2i5p2/77yI6YCa6L+HSURF6K6+572u6LCD6K+V5qih5byP77yM5oiW6ICFdXJs5Zyw5Z2A5aKe5YqgZGVidWc9dHJ1ZeWPguaVsO+8jOWdh+WPr+aJk+W8gOiwg+ivlemdouadv++8iVxyXG5cdFx0aWYgKEdhbWVDb25maWcuZGVidWcgfHwgTGF5YS5VdGlscy5nZXRRdWVyeVN0cmluZyhcImRlYnVnXCIpID09IFwidHJ1ZVwiKSBMYXlhLmVuYWJsZURlYnVnUGFuZWwoKTtcclxuXHRcdGlmIChHYW1lQ29uZmlnLnBoeXNpY3NEZWJ1ZyAmJiBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXSkgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0uZW5hYmxlKCk7XHJcblx0XHRpZiAoR2FtZUNvbmZpZy5zdGF0KSBMYXlhLlN0YXQuc2hvdygpO1xyXG5cdFx0TGF5YS5hbGVydEdsb2JhbEVycm9yID0gdHJ1ZTtcclxuXHJcblx0XHQvL+a/gOa0u+i1hOa6kOeJiOacrOaOp+WItu+8jHZlcnNpb24uanNvbueUsUlEReWPkeW4g+WKn+iDveiHquWKqOeUn+aIkO+8jOWmguaenOayoeacieS5n+S4jeW9seWTjeWQjue7rea1geeoi1xyXG5cdFx0TGF5YS5SZXNvdXJjZVZlcnNpb24uZW5hYmxlKFwidmVyc2lvbi5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vblZlcnNpb25Mb2FkZWQpLCBMYXlhLlJlc291cmNlVmVyc2lvbi5GSUxFTkFNRV9WRVJTSU9OKTtcclxuXHR9XHJcblxyXG5cdG9uVmVyc2lvbkxvYWRlZCgpIHtcclxuXHRcdC8v5r+A5rS75aSn5bCP5Zu+5pig5bCE77yM5Yqg6L295bCP5Zu+55qE5pe25YCZ77yM5aaC5p6c5Y+R546w5bCP5Zu+5Zyo5aSn5Zu+5ZCI6ZuG6YeM6Z2i77yM5YiZ5LyY5YWI5Yqg6L295aSn5Zu+5ZCI6ZuG77yM6ICM5LiN5piv5bCP5Zu+XHJcblx0XHRMYXlhLkF0bGFzSW5mb01hbmFnZXIuZW5hYmxlKFwiZmlsZWNvbmZpZy5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkNvbmZpZ0xvYWRlZCkpO1xyXG5cdH1cclxuXHJcblx0b25Db25maWdMb2FkZWQoKSB7XHJcblx0XHQvL+WKoOi9vUlEReaMh+WumueahOWcuuaZr1xyXG5cdFx0R2FtZUNvbmZpZy5zdGFydFNjZW5lICYmIExheWEuU2NlbmUub3BlbihHYW1lQ29uZmlnLnN0YXJ0U2NlbmUpO1xyXG5cdH1cclxufVxyXG4vL+a/gOa0u+WQr+WKqOexu1xyXG5uZXcgTWFpbigpO1xyXG4iLCJpbXBvcnQgU2hha2UgZnJvbSBcIi4uLy4uL2Jpbi9saWJzL2xheWEuZGV2aWNlXCJcclxuLy9pbXBvcnQgIFwiLi4vLi4vYmluL2xpYnMvbGF5YS5jb3JlXCJcclxuXHJcblxyXG5sZXQgc2hha2VDb3VudD0wO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluU2NlbmUgZXh0ZW5kcyBMYXlhLlNjZW5lIHtcclxuXHJcbiBcclxuXHR1cGRhdGVzaGFrZXRpbWVzKHRpbWVzKVxyXG5cdHtcclxuXHRcdHRoaXMubV9TaGFrZV9UZXh0LnRleHQ9dGltZXMrXCJcIjtcclxuXHR9XHJcbiAgICBzdGFydFNoYWtlKCkge1xyXG5cdFx0dGhpcy5tX1NoYWtlX1RleHQudGV4dD1zaGFrZUNvdW50K1wiXCI7XHJcblx0XHRjb25zdCBTaGFrZSA9IExheWEuU2hha2U7XHJcbiAgICAgICAgaWYoU2hha2U9PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cdFx0U2hha2UuaW5zdGFuY2Uuc3RhcnQoNSwgNTAwKTtcclxuXHRcdFNoYWtlLmluc3RhbmNlLm9uKExheWEuRXZlbnQuQ0hBTkdFLCB0aGlzLCB0aGlzLm9uU2hha2UpO1xyXG4gICAgICAgIC8vY29uc29sZS50ZXh0ID0gJ+W8gOWni+aOpeaUtuiuvuWkh+aRh+WKqFxcbic7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+W8gOWni+aOpeaUtuiuvuWkh+aRh+WKqFxcbicpO1xyXG5cdH1cclxuXHRcclxuXHRvblNoYWtlKCkge1xyXG5cdFx0Y29uc3QgU2hha2UgPSBMYXlhLlNoYWtlO1xyXG5cclxuXHRcdHNoYWtlQ291bnQrKztcclxuXHRcdFxyXG5cdFx0Ly9jb25zb2xlLnRleHQgKz0gXCLorr7lpIfmkYfmmYPkuoZcIiArIHNoYWtlQ291bnQgKyBcIuasoVxcblwiO1xyXG5cdFx0Y29uc29sZS5sb2coXCLorr7lpIfmkYfmmYPkuoZcIiArIHNoYWtlQ291bnQgKyBcIuasoVxcblwiKTtcclxuXHRcdHRoaXMubV9TaGFrZV9UZXh0LnRleHQ9c2hha2VDb3VudCtcIlwiO1xyXG5cdFx0aWYgKHNoYWtlQ291bnQgPj0gMykge1xyXG5cdFx0XHQvL1NoYWtlLmluc3RhbmNlLnN0b3AoKTtcclxuXHRcdFx0XHJcbiAgICAgICAgICAgIC8vY29uc29sZS50ZXh0ICs9IFwi5YGc5q2i5o6l5pS26K6+5aSH5pGH5YqoXCI7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ+WBnOatouaOpeaUtuiuvuWkh+aRh+WKqFxcbicpO1xyXG5cdFx0fVxyXG5cdH1cclxuICAgIGNvbnN0cnVjdG9yKCkgeyBcclxuXHRcdHN1cGVyKCk7IFxyXG5cdFx0d2luZG93LmdfTWFpbl9TY2VuZT10aGlzO1xyXG4gICAgICAgIHRoaXMubG9hZFNjZW5lKFwiTWFpbi5zY2VuZVwiKTtcclxuICAgICAgICB0aGlzLnN0YXJ0U2hha2UoKTtcclxuXHR9XHJcblx0b25FbmFibGUoKSB7XHJcblx0fVxyXG59Il19
