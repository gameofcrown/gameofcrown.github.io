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


var _InfoDialog = require("./script/InfoDialog");

var _InfoDialog2 = _interopRequireDefault(_InfoDialog);

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
            reg("script/InfoDialog.js", _InfoDialog2.default);
            reg("script/MainScene.js", _MainScene2.default);
        }
    }]);

    return GameConfig;
}();

exports.default = GameConfig;

GameConfig.width = 750;
GameConfig.height = 1200;
GameConfig.scaleMode = "exactfit";
GameConfig.screenMode = "none";
GameConfig.alignV = "middle";
GameConfig.alignH = "center";
GameConfig.startScene = "Main.scene";
GameConfig.sceneRoot = "";
GameConfig.debug = false;
GameConfig.stat = false;
GameConfig.physicsDebug = false;
GameConfig.exportSceneToJson = true;

GameConfig.init();

},{"./script/InfoDialog":4,"./script/MainScene":5}],3:[function(require,module,exports){
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

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import  "../../bin/libs/laya.Dialog"
var InfoDialog = function (_Laya$Dialog) {
    _inherits(InfoDialog, _Laya$Dialog);

    function InfoDialog() {
        _classCallCheck(this, InfoDialog);

        var _this = _possibleConstructorReturn(this, (InfoDialog.__proto__ || Object.getPrototypeOf(InfoDialog)).call(this));

        _this.mouseEnabled = true;
        _this.m_Mainscene = 0;
        _this.m_CallbackFunc = 0;

        _this.loadScene("InfoDlg");
        return _this;
    }

    _createClass(InfoDialog, [{
        key: "createChildren",
        value: function createChildren() {
            _get(InfoDialog.prototype.__proto__ || Object.getPrototypeOf(InfoDialog.prototype), "createChildren", this).call(this);
            this.loadScene("InfoDlg");
        }
    }, {
        key: "onExitButton",
        value: function onExitButton(e) {

            this.m_CallbackFunc(this.m_Mainscene);
            this.destroy();
        }
    }, {
        key: "onEnable",
        value: function onEnable() {
            var Event = Laya.Event;
            this.m_ExitButton.on(Event.CLICK, this, this.onExitButton);
        }
    }, {
        key: "onDisable",
        value: function onDisable() {}
    }]);

    return InfoDialog;
}(Laya.Dialog);

exports.default = InfoDialog;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _laya = require("../../bin/libs/laya.device");

var _laya2 = _interopRequireDefault(_laya);

var _InfoDialog = require("./InfoDialog");

var _InfoDialog2 = _interopRequireDefault(_InfoDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import  "../../bin/libs/laya.core"


var shakeCount = 0;
var m_ShakeValue = 0;

var MainScene = function (_Laya$Scene) {
	_inherits(MainScene, _Laya$Scene);

	_createClass(MainScene, [{
		key: "updateshaketimes",
		value: function updateshaketimes(times) {
			if (this.m_ShakeEnable == false) {
				return;
			}
			this.m_ShakeValue += 22.0;
			if (this.m_ShakeValue >= 100) {
				this.m_ShakeEnable = false;
				this.m_ShakeValue = 0;
				this.m_Cola_Ani.visible = true;
				this.m_Cola_Ani.play();
				this.m_Key_Sprite.texture = "images/icons_0.png";
				this.m_InfoDialog = new _InfoDialog2.default();
				this.m_InfoDialog.m_Mainscene = this;
				this.m_InfoDialog.m_CallbackFunc = function (ms) {

					//this.m_InfoDialog.isModal=true;
					ms.m_Cola_Ani.visible = false;
					ms.m_Key_Sprite.texture = "images/icons_1.png";
					ms.m_ShakeEnable = true;
				};
				this.m_InfoDialog.show();
			}
		}
	}, {
		key: "animateTimeBased",
		value: function animateTimeBased() {
			this.m_ShakeValue -= 2.6;
			if (this.m_ShakeValue < 0) {
				this.m_ShakeValue = 0;
			}

			var remtime = 100.0 - this.m_ShakeValue;
			remtime /= 8.0;
			this.m_Shake_Text.text = this.m_ShakeValue.toFixed(2) + "%";
			this.m_Remain_Time.text = remtime.toFixed(2) + "s";
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

		_this.mouseEnabled = true;
		_this.m_ShakeEnable = true;
		_this.m_InfoDialog = 0;
		_this.m_ShakeValue = 0;
		window.g_Main_Scene = _this;
		_this.loadScene("Main.scene");
		//this.startShake();
		Laya.timer.loop(200, _this, _this.animateTimeBased);
		return _this;
	}

	_createClass(MainScene, [{
		key: "onEnable",
		value: function onEnable() {
			this.m_InfoDialog = new _InfoDialog2.default();
			this.m_InfoDialog.show();
			this.m_InfoDialog.destroy();
		}
	}]);

	return MainScene;
}(Laya.Scene);

exports.default = MainScene;

},{"../../bin/libs/laya.device":1,"./InfoDialog":4}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL0xheWFBaXJJREUvcmVzb3VyY2VzL2FwcC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYmluL2xpYnMvbGF5YS5kZXZpY2UuanMiLCJzcmMvR2FtZUNvbmZpZy5qcyIsInNyYy9NYWluLmpzIiwic3JjL3NjcmlwdC9JbmZvRGlhbG9nLmpzIiwic3JjL3NjcmlwdC9NYWluU2NlbmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDVEEsQ0FBQyxVQUFTLE1BQVQsRUFBZ0IsUUFBaEIsRUFBeUIsSUFBekIsRUFBOEI7QUFDOUIsS0FBSSxPQUFLLEtBQUssRUFBZDtBQUFBLEtBQWlCLFFBQU0sS0FBSyxHQUE1QjtBQUFBLEtBQWdDLFdBQVMsS0FBSyxNQUE5QztBQUFBLEtBQXFELFVBQVEsS0FBSyxLQUFsRTtBQUFBLEtBQXdFLFdBQVMsS0FBSyxNQUF0RjtBQUFBLEtBQTZGLFdBQVMsS0FBSyxRQUEzRzs7QUFFQSxLQUFJLFNBQU8sS0FBSyxRQUFMLENBQWMsTUFBekI7QUFBQSxLQUFnQyxVQUFRLEtBQUssS0FBTCxDQUFXLE9BQW5EO0FBQUEsS0FBMkQsUUFBTSxLQUFLLE1BQUwsQ0FBWSxLQUE3RTtBQUFBLEtBQW1GLGtCQUFnQixLQUFLLE1BQUwsQ0FBWSxlQUEvRztBQUNBLEtBQUksVUFBUSxLQUFLLEtBQUwsQ0FBVyxPQUF2QjtBQUFBLEtBQStCLFNBQU8sS0FBSyxNQUFMLENBQVksTUFBbEQ7QUFBQSxLQUF5RCxZQUFVLEtBQUssS0FBTCxDQUFXLFNBQTlFO0FBQUEsS0FBd0YsU0FBTyxLQUFLLE9BQUwsQ0FBYSxNQUE1RztBQUNBLEtBQUksU0FBTyxLQUFLLE9BQUwsQ0FBYSxNQUF4QjtBQUFBLEtBQStCLFFBQU0sS0FBSyxPQUFMLENBQWEsS0FBbEQ7QUFBQSxLQUF3RCxVQUFRLEtBQUssUUFBTCxDQUFjLE9B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LEVBQWxDO0FBQ0EsT0FBTSxRQUFRLEtBQUssS0FBbkI7QUFDTSxPQUFHLFNBQU8sSUFBVixFQUNBO0FBQ0k7QUFDSDtBQUNQLFNBQU0sUUFBTixDQUFlLEtBQWYsQ0FBcUIsQ0FBckIsRUFBd0IsR0FBeEI7QUFDQSxTQUFNLFFBQU4sQ0FBZSxFQUFmLENBQWtCLEtBQUssS0FBTCxDQUFXLE1BQTdCLEVBQXFDLElBQXJDLEVBQTJDLEtBQUssT0FBaEQ7QUFDTTtBQUNBLFdBQVEsR0FBUixDQUFZLFlBQVo7QUFDTjs7OzRCQUVTO0FBQ1QsT0FBTSxRQUFRLEtBQUssS0FBbkI7O0FBRUE7O0FBRUE7QUFDQSxXQUFRLEdBQVIsQ0FBWSxVQUFVLFVBQVYsR0FBdUIsS0FBbkM7QUFDQSxRQUFLLFlBQUwsQ0FBa0IsSUFBbEIsR0FBdUIsYUFBVyxFQUFsQztBQUNBLE9BQUksY0FBYyxDQUFsQixFQUFxQjtBQUNwQjs7QUFFUztBQUNBO0FBQ1Q7QUFDRDs7O0FBQ0Usc0JBQWM7QUFBQTs7QUFBQTs7QUFFaEIsUUFBSyxZQUFMLEdBQWtCLElBQWxCO0FBQ0EsUUFBSyxhQUFMLEdBQW1CLElBQW5CO0FBQ0EsUUFBSyxZQUFMLEdBQWtCLENBQWxCO0FBQ0EsUUFBSyxZQUFMLEdBQWtCLENBQWxCO0FBQ0EsU0FBTyxZQUFQO0FBQ00sUUFBSyxTQUFMLENBQWUsWUFBZjtBQUNOO0FBQ0EsT0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixHQUFoQixTQUEyQixNQUFLLGdCQUFoQztBQVRnQjtBQVVoQjs7Ozs2QkFDVTtBQUNWLFFBQUssWUFBTCxHQUFrQixJQUFJLG9CQUFKLEVBQWxCO0FBQ0EsUUFBSyxZQUFMLENBQWtCLElBQWxCO0FBQ0EsUUFBSyxZQUFMLENBQWtCLE9BQWxCO0FBQ0E7Ozs7RUF4RnFDLEtBQUssSzs7a0JBQXZCLFMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXHJcbihmdW5jdGlvbih3aW5kb3csZG9jdW1lbnQsTGF5YSl7XHJcblx0dmFyIF9fdW49TGF5YS51bixfX3Vucz1MYXlhLnVucyxfX3N0YXRpYz1MYXlhLnN0YXRpYyxfX2NsYXNzPUxheWEuY2xhc3MsX19nZXRzZXQ9TGF5YS5nZXRzZXQsX19uZXd2ZWM9TGF5YS5fX25ld3ZlYztcclxuXHJcblx0dmFyIEJpdG1hcD1sYXlhLnJlc291cmNlLkJpdG1hcCxCcm93c2VyPWxheWEudXRpbHMuQnJvd3NlcixFdmVudD1sYXlhLmV2ZW50cy5FdmVudCxFdmVudERpc3BhdGNoZXI9bGF5YS5ldmVudHMuRXZlbnREaXNwYXRjaGVyO1xyXG5cdHZhciBIYW5kbGVyPWxheWEudXRpbHMuSGFuZGxlcixMYXlhR0w9bGF5YS5sYXlhZ2wuTGF5YUdMLFJlY3RhbmdsZT1sYXlhLm1hdGhzLlJlY3RhbmdsZSxSZW5kZXI9bGF5YS5yZW5kZXJzLlJlbmRlcjtcclxuXHR2YXIgU3ByaXRlPWxheWEuZGlzcGxheS5TcHJpdGUsU3RhZ2U9bGF5YS5kaXNwbGF5LlN0YWdlLFRleHR1cmU9bGF5YS5yZXNvdXJjZS5UZXh0dXJlLFV0aWxzPWxheWEudXRpbHMuVXRpbHM7XHJcblx0dmFyIFdlYkdMPWxheWEud2ViZ2wuV2ViR0wsV2ViR0xDb250ZXh0PWxheWEud2ViZ2wuV2ViR0xDb250ZXh0O1xyXG4vKipcclxuKuS9v+eUqOWJjeWPr+eUqDxjb2RlPnN1cHBvcnRlZDwvY29kZT7mn6XnnIvmtY/op4jlmajmlK/mjIHjgIJcclxuKi9cclxuLy9jbGFzcyBsYXlhLmRldmljZS5nZW9sb2NhdGlvbi5HZW9sb2NhdGlvblxyXG52YXIgR2VvbG9jYXRpb249KGZ1bmN0aW9uKCl7XHJcblx0ZnVuY3Rpb24gR2VvbG9jYXRpb24oKXt9XHJcblx0X19jbGFzcyhHZW9sb2NhdGlvbiwnbGF5YS5kZXZpY2UuZ2VvbG9jYXRpb24uR2VvbG9jYXRpb24nKTtcclxuXHRHZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb249ZnVuY3Rpb24ob25TdWNjZXNzLG9uRXJyb3Ipe1xyXG5cdFx0R2VvbG9jYXRpb24ubmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihmdW5jdGlvbihwb3Mpe1xyXG5cdFx0XHRHZW9sb2NhdGlvbi5wb3NpdGlvbi5zZXRQb3NpdGlvbihwb3MpO1xyXG5cdFx0XHRvblN1Y2Nlc3MucnVuV2l0aChHZW9sb2NhdGlvbi5wb3NpdGlvbik7XHJcblx0XHR9LFxyXG5cdFx0ZnVuY3Rpb24oZXJyb3Ipe1xyXG5cdFx0XHRvbkVycm9yLnJ1bldpdGgoZXJyb3IpO1xyXG5cdFx0XHR9LHtcclxuXHRcdFx0ZW5hYmxlSGlnaEFjY3VyYWN5IDpsYXlhLmRldmljZS5nZW9sb2NhdGlvbi5HZW9sb2NhdGlvbi5lbmFibGVIaWdoQWNjdXJhY3ksXHJcblx0XHRcdHRpbWVvdXQgOmxheWEuZGV2aWNlLmdlb2xvY2F0aW9uLkdlb2xvY2F0aW9uLnRpbWVvdXQsXHJcblx0XHRcdG1heGltdW1BZ2UgOmxheWEuZGV2aWNlLmdlb2xvY2F0aW9uLkdlb2xvY2F0aW9uLm1heGltdW1BZ2VcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0R2VvbG9jYXRpb24ud2F0Y2hQb3NpdGlvbj1mdW5jdGlvbihvblN1Y2Nlc3Msb25FcnJvcil7XHJcblx0XHRyZXR1cm4gR2VvbG9jYXRpb24ubmF2aWdhdG9yLmdlb2xvY2F0aW9uLndhdGNoUG9zaXRpb24oZnVuY3Rpb24ocG9zKXtcclxuXHRcdFx0R2VvbG9jYXRpb24ucG9zaXRpb24uc2V0UG9zaXRpb24ocG9zKTtcclxuXHRcdFx0b25TdWNjZXNzLnJ1bldpdGgoR2VvbG9jYXRpb24ucG9zaXRpb24pO1xyXG5cdFx0fSxcclxuXHRcdGZ1bmN0aW9uKGVycm9yKXtcclxuXHRcdFx0b25FcnJvci5ydW5XaXRoKGVycm9yKTtcclxuXHRcdFx0fSx7XHJcblx0XHRcdGVuYWJsZUhpZ2hBY2N1cmFjeSA6R2VvbG9jYXRpb24uZW5hYmxlSGlnaEFjY3VyYWN5LFxyXG5cdFx0XHR0aW1lb3V0IDpHZW9sb2NhdGlvbi50aW1lb3V0LFxyXG5cdFx0XHRtYXhpbXVtQWdlIDpHZW9sb2NhdGlvbi5tYXhpbXVtQWdlXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdEdlb2xvY2F0aW9uLmNsZWFyV2F0Y2g9ZnVuY3Rpb24oaWQpe1xyXG5cdFx0R2VvbG9jYXRpb24ubmF2aWdhdG9yLmdlb2xvY2F0aW9uLmNsZWFyV2F0Y2goaWQpO1xyXG5cdH1cclxuXHJcblx0R2VvbG9jYXRpb24uUEVSTUlTU0lPTl9ERU5JRUQ9MTtcclxuXHRHZW9sb2NhdGlvbi5QT1NJVElPTl9VTkFWQUlMQUJMRT0yO1xyXG5cdEdlb2xvY2F0aW9uLlRJTUVPVVQ9MztcclxuXHRHZW9sb2NhdGlvbi5lbmFibGVIaWdoQWNjdXJhY3k9ZmFsc2U7XHJcblx0R2VvbG9jYXRpb24ubWF4aW11bUFnZT0wO1xyXG5cdF9fc3RhdGljKEdlb2xvY2F0aW9uLFxyXG5cdFsnbmF2aWdhdG9yJyxmdW5jdGlvbigpe3JldHVybiB0aGlzLm5hdmlnYXRvcj1Ccm93c2VyLndpbmRvdy5uYXZpZ2F0b3I7fSwncG9zaXRpb24nLGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucG9zaXRpb249bmV3IEdlb2xvY2F0aW9uSW5mbygpO30sJ3N1cHBvcnRlZCcsZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zdXBwb3J0ZWQ9ISFHZW9sb2NhdGlvbi5uYXZpZ2F0b3IuZ2VvbG9jYXRpb247fSwndGltZW91dCcsZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy50aW1lb3V0PTFFMTA7fVxyXG5cdF0pO1xyXG5cdHJldHVybiBHZW9sb2NhdGlvbjtcclxufSkoKVxyXG5cclxuXHJcbi8qKlxyXG4q5Yqg6YCf5bqmeC95L3rnmoTljZXkvY3lnYfkuLptL3PCsuOAglxyXG4q5Zyo56Gs5Lu277yI6ZmA6J665Luq77yJ5LiN5pSv5oyB55qE5oOF5Ya15LiL77yMYWxwaGHjgIFiZXRh5ZKMZ2FtbWHlgLzkuLpudWxs44CCXHJcbipcclxuKkBhdXRob3IgU3Vydml2b3JcclxuKi9cclxuLy9jbGFzcyBsYXlhLmRldmljZS5tb3Rpb24uQWNjZWxlcmF0aW9uSW5mb1xyXG52YXIgQWNjZWxlcmF0aW9uSW5mbz0oZnVuY3Rpb24oKXtcclxuXHRmdW5jdGlvbiBBY2NlbGVyYXRpb25JbmZvKCl7XHJcblx0XHQvKipcclxuXHRcdCp46L205LiK55qE5Yqg6YCf5bqm5YC844CCXHJcblx0XHQqL1xyXG5cdFx0dGhpcy54PU5hTjtcclxuXHRcdC8qKlxyXG5cdFx0KnnovbTkuIrnmoTliqDpgJ/luqblgLzjgIJcclxuXHRcdCovXHJcblx0XHR0aGlzLnk9TmFOO1xyXG5cdFx0LyoqXHJcblx0XHQqeui9tOS4iueahOWKoOmAn+W6puWAvOOAglxyXG5cdFx0Ki9cclxuXHRcdHRoaXMuej1OYU47XHJcblx0fVxyXG5cclxuXHRfX2NsYXNzKEFjY2VsZXJhdGlvbkluZm8sJ2xheWEuZGV2aWNlLm1vdGlvbi5BY2NlbGVyYXRpb25JbmZvJyk7XHJcblx0cmV0dXJuIEFjY2VsZXJhdGlvbkluZm87XHJcbn0pKClcclxuXHJcblxyXG4vL2NsYXNzIGxheWEuZGV2aWNlLmdlb2xvY2F0aW9uLkdlb2xvY2F0aW9uSW5mb1xyXG52YXIgR2VvbG9jYXRpb25JbmZvPShmdW5jdGlvbigpe1xyXG5cdGZ1bmN0aW9uIEdlb2xvY2F0aW9uSW5mbygpe1xyXG5cdFx0dGhpcy5wb3M9bnVsbDtcclxuXHRcdHRoaXMuY29vcmRzPW51bGw7XHJcblx0fVxyXG5cclxuXHRfX2NsYXNzKEdlb2xvY2F0aW9uSW5mbywnbGF5YS5kZXZpY2UuZ2VvbG9jYXRpb24uR2VvbG9jYXRpb25JbmZvJyk7XHJcblx0dmFyIF9fcHJvdG89R2VvbG9jYXRpb25JbmZvLnByb3RvdHlwZTtcclxuXHRfX3Byb3RvLnNldFBvc2l0aW9uPWZ1bmN0aW9uKHBvcyl7XHJcblx0XHR0aGlzLnBvcz1wb3M7XHJcblx0XHR0aGlzLmNvb3Jkcz1wb3MuY29vcmRzO1xyXG5cdH1cclxuXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCdoZWFkaW5nJyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29vcmRzLmhlYWRpbmc7XHJcblx0fSk7XHJcblxyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywnbGF0aXR1ZGUnLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb29yZHMubGF0aXR1ZGU7XHJcblx0fSk7XHJcblxyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywnYWx0aXR1ZGVBY2N1cmFjeScsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLmNvb3Jkcy5hbHRpdHVkZUFjY3VyYWN5O1xyXG5cdH0pO1xyXG5cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ2xvbmdpdHVkZScsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLmNvb3Jkcy5sb25naXR1ZGU7XHJcblx0fSk7XHJcblxyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywnYWx0aXR1ZGUnLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb29yZHMuYWx0aXR1ZGU7XHJcblx0fSk7XHJcblxyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywnYWNjdXJhY3knLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb29yZHMuYWNjdXJhY3k7XHJcblx0fSk7XHJcblxyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywnc3BlZWQnLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb29yZHMuc3BlZWQ7XHJcblx0fSk7XHJcblxyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywndGltZXN0YW1wJyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMucG9zLnRpbWVzdGFtcDtcclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIEdlb2xvY2F0aW9uSW5mbztcclxufSkoKVxyXG5cclxuXHJcbi8qKlxyXG4qTWVkaWHnlKjkuo7mjZXmjYnmkYTlg4/lpLTlkozpuqblhYvpo47jgILlj6/ku6XmjZXmjYnku7vmhI/kuYvkuIDvvIzmiJbogIXlkIzml7bmjZXmjYnkuKTogIXjgII8Y29kZT5nZXRDYW1lcmE8L2NvZGU+5YmN5Y+v5Lul5L2/55SoPGNvZGU+c3VwcG9ydGVkKCk8L2NvZGU+5qOA5p+l5b2T5YmN5rWP6KeI5Zmo5piv5ZCm5pSv5oyB44CCXHJcbio8Yj5OT1RFOjwvYj5cclxuKjxwPuebruWJjU1lZGlh5Zyo56e75Yqo5bmz5Y+w5Y+q5pSv5oyBQW5kcm9pZO+8jOS4jeaUr+aMgUlPU+OAguWPquWPr+WcqEZpcmVGb3jlrozmlbTlnLDkvb/nlKjvvIxDaHJvbWXmtYvor5Xml7bml6Dms5XmjZXmjYnop4bpopHjgII8L3A+XHJcbiovXHJcbi8vY2xhc3MgbGF5YS5kZXZpY2UubWVkaWEuTWVkaWFcclxudmFyIE1lZGlhPShmdW5jdGlvbigpe1xyXG5cdGZ1bmN0aW9uIE1lZGlhKCl7fVxyXG5cdF9fY2xhc3MoTWVkaWEsJ2xheWEuZGV2aWNlLm1lZGlhLk1lZGlhJyk7XHJcblx0TWVkaWEuc3VwcG9ydGVkPWZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gISFCcm93c2VyLndpbmRvdy5uYXZpZ2F0b3IuZ2V0VXNlck1lZGlhO1xyXG5cdH1cclxuXHJcblx0TWVkaWEuZ2V0TWVkaWE9ZnVuY3Rpb24ob3B0aW9ucyxvblN1Y2Nlc3Msb25FcnJvcil7XHJcblx0XHRpZiAoQnJvd3Nlci53aW5kb3cubmF2aWdhdG9yLmdldFVzZXJNZWRpYSl7XHJcblx0XHRcdEJyb3dzZXIud2luZG93Lm5hdmlnYXRvci5nZXRVc2VyTWVkaWEob3B0aW9ucyxmdW5jdGlvbihzdHJlYW0pe1xyXG5cdFx0XHRcdG9uU3VjY2Vzcy5ydW5XaXRoKEJyb3dzZXIud2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKSk7XHJcblx0XHRcdFx0fSxmdW5jdGlvbihlcnIpe1xyXG5cdFx0XHRcdG9uRXJyb3IucnVuV2l0aChlcnIpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdE1lZGlhLl9faW5pdCQ9ZnVuY3Rpb24oKXtcclxuXHRcdC8qX19KU19fICovbmF2aWdhdG9yLmdldFVzZXJNZWRpYT1uYXZpZ2F0b3IuZ2V0VXNlck1lZGlhIHx8IG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEgfHwgbmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYTs7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gTWVkaWE7XHJcbn0pKClcclxuXHJcblxyXG4vKipcclxuKuS/neWtmOaXi+i9rOS/oeaBr+eahOexu+OAguivt+WLv+S/ruaUueacrOexu+eahOWxnuaAp+OAglxyXG4qQGF1dGhvciBTdXJ2aXZvclxyXG4qL1xyXG4vL2NsYXNzIGxheWEuZGV2aWNlLm1vdGlvbi5Sb3RhdGlvbkluZm9cclxudmFyIFJvdGF0aW9uSW5mbz0oZnVuY3Rpb24oKXtcclxuXHRmdW5jdGlvbiBSb3RhdGlvbkluZm8oKXtcclxuXHRcdC8qKlxyXG5cdFx0KjxwPlxyXG5cdFx0KuaMh+ekuuiuvuWkh+aYr+WQpuWPr+S7peaPkOS+m+e7neWvueaWueS9jeaVsOaNru+8iOaMh+WQkeWcsOeQg+WdkOagh+ezu++8ie+8jOaIluiAheiuvuWkh+WGs+WumueahOS7u+aEj+WdkOagh+ezu+OAglxyXG5cdFx0KuWFs+S6juWdkOagh+ezu+WPguingTxpPmh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0d1aWRlL0V2ZW50cy9PcmllbnRhdGlvbl9hbmRfbW90aW9uX2RhdGFfZXhwbGFpbmVkPC9pPuOAglxyXG5cdFx0KjwvcD5cclxuXHRcdCrpnIDopoHms6jmhI/nmoTmmK/vvIxJT1Pnjq/looPkuIvvvIzor6XlgLzlp4vnu4jkuLpmYWxzZeOAguWNs+S9v+WmguatpO+8jOS9oOS+neaXp+WPr+S7peS7jjxjb2RlPmFscGhhPC9jb2RlPuS4reWPluW+l+ato+ehrueahOWAvOOAglxyXG5cdFx0Ki9cclxuXHRcdHRoaXMuYWJzb2x1dGU9ZmFsc2U7XHJcblx0XHQvKipcclxuXHRcdCpa6L205peL6L2s6KeS5bqm77yM5YW25YC86IyD5Zu05LuOMOiHszM2MOOAglxyXG5cdFx0KuiLpTxjb2RlPmFic29sdXRlPC9jb2RlPuS4unRydWXmiJbogIXlnKhJT1PkuK3vvIxhbHBoYeWAvOaYr+S7juWMl+aWueWIsOW9k+WJjeiuvuWkh+aWueWQkeeahOinkuW6puWAvOOAglxyXG5cdFx0Ki9cclxuXHRcdHRoaXMuYWxwaGE9TmFOO1xyXG5cdFx0LyoqXHJcblx0XHQqWOi9tOaXi+i9rOinkuW6pizlhbblgLzojIPlm7Tku44tMTgw6IezMTgw44CC5Luj6KGo6K6+5aSH5LuO5YmN6Iez5ZCO55qE6L+Q5Yqo44CCXHJcblx0XHQqL1xyXG5cdFx0dGhpcy5iZXRhPU5hTjtcclxuXHRcdC8qKlxyXG5cdFx0KlnovbTml4vovazop5LluqbvvIzlhbblgLzojIPlm7Tku44tOTDoh7M5MOOAguS7o+ihqOiuvuWkh+S7juW3puiHs+WPs+eahOi/kOWKqOOAglxyXG5cdFx0Ki9cclxuXHRcdHRoaXMuZ2FtbWE9TmFOO1xyXG5cdFx0LyoqXHJcblx0XHQq572X55uY5pWw5o2u55qE57K+56Gu5bqm77yI6KeS5bqm77yJ44CC5LuFSU9T5Y+v55So44CCXHJcblx0XHQqL1xyXG5cdFx0dGhpcy5jb21wYXNzQWNjdXJhY3k9TmFOO1xyXG5cdH1cclxuXHJcblx0X19jbGFzcyhSb3RhdGlvbkluZm8sJ2xheWEuZGV2aWNlLm1vdGlvbi5Sb3RhdGlvbkluZm8nKTtcclxuXHRyZXR1cm4gUm90YXRpb25JbmZvO1xyXG59KSgpXHJcblxyXG5cclxuLyoqXHJcbipBY2NlbGVyYXRvci5pbnN0YW5jZeiOt+WPluWUr+S4gOeahEFjY2VsZXJhdG9y5byV55So77yM6K+35Yu/6LCD55So5p6E6YCg5Ye95pWw44CCXHJcbipcclxuKjxwPlxyXG4qbGlzdGVuKCnnmoTlm57osIPlpITnkIblmajmjqXlj5flm5vkuKrlj4LmlbDvvJpcclxuKjxvbD5cclxuKjxsaT48Yj5hY2NlbGVyYXRpb248L2I+OuihqOekuueUqOaIt+e7meS6iOiuvuWkh+eahOWKoOmAn+W6puOAgjwvbGk+XHJcbio8bGk+PGI+YWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eTwvYj466K6+5aSH5Y+X5Yiw55qE5oC75Yqg6YCf5bqm77yI5YyF5ZCr6YeN5Yqb77yJ44CCPC9saT5cclxuKjxsaT48Yj5yb3RhdGlvblJhdGU8L2I+OuiuvuWkh+eahOiHqui9rOmAn+eOh+OAgjwvbGk+XHJcbio8bGk+PGI+aW50ZXJ2YWw8L2I+OuWKoOmAn+W6puiOt+WPlueahOaXtumXtOmXtOmalO+8iOavq+enku+8ieOAgjwvbGk+XHJcbio8L29sPlxyXG4qPC9wPlxyXG4qPHA+XHJcbio8Yj5OT1RFPC9iPjxici8+XHJcbirlpoLvvIxyb3RhdGlvblJhdGXnmoRhbHBoYeWcqGFwcGxl5ZKMbW965paH5qGj5Lit6YO95piveui9tOaXi+i9rOinkuW6pu+8jOS9huaYr+Wunua1i+aYr3jovbTml4vovazop5LluqbjgILkuLrkuobkvb/lkITlsZ7mgKfooajnpLrnmoTlgLzkuI7mlofmoaPmiYDov7Dnm7jlkIzvvIzlrp7pmYXlgLzkuI7lhbbku5blsZ7mgKfov5vooYzkuoblr7nosIPjgIJcclxuKuWFtuS4re+8mlxyXG4qPHVsPlxyXG4qPGxpPmFscGhh5L2/55SoZ2FtbWHlgLzjgII8L2xpPlxyXG4qPGxpPmJldGHkvb/nlKhhbHBoYeWAvOOAgjwvbGk+XHJcbio8bGk+Z2FtbWHkvb/nlKhiZXRh44CCPC9saT5cclxuKjwvdWw+XHJcbirnm67liY3lrbDmmK/lrbDpnZ7lsJrmnKrlj6/nn6XvvIzku6XmraTkuLrms6jjgIJcclxuKjwvcD5cclxuKi9cclxuLy9jbGFzcyBsYXlhLmRldmljZS5tb3Rpb24uQWNjZWxlcmF0b3IgZXh0ZW5kcyBsYXlhLmV2ZW50cy5FdmVudERpc3BhdGNoZXJcclxudmFyIEFjY2VsZXJhdG9yPShmdW5jdGlvbihfc3VwZXIpe1xyXG5cdGZ1bmN0aW9uIEFjY2VsZXJhdG9yKHNpbmdsZXRvbil7XHJcblx0XHRBY2NlbGVyYXRvci5fX3N1cGVyLmNhbGwodGhpcyk7XHJcblx0XHQvKl9fSlNfXyAqL3RoaXMub25EZXZpY2VPcmllbnRhdGlvbkNoYW5nZT10aGlzLm9uRGV2aWNlT3JpZW50YXRpb25DaGFuZ2UuYmluZCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdF9fY2xhc3MoQWNjZWxlcmF0b3IsJ2xheWEuZGV2aWNlLm1vdGlvbi5BY2NlbGVyYXRvcicsX3N1cGVyKTtcclxuXHR2YXIgX19wcm90bz1BY2NlbGVyYXRvci5wcm90b3R5cGU7XHJcblx0LyoqXHJcblx0KuS+puWQrOWKoOmAn+WZqOi/kOWKqOOAglxyXG5cdCpAcGFyYW0gb2JzZXJ2ZXIg5Zue6LCD5Ye95pWw5o6l5Y+XNOS4quWPguaVsO+8jOingeexu+ivtOaYjuOAglxyXG5cdCovXHJcblx0X19wcm90by5vbj1mdW5jdGlvbih0eXBlLGNhbGxlcixsaXN0ZW5lcixhcmdzKXtcclxuXHRcdF9zdXBlci5wcm90b3R5cGUub24uY2FsbCh0aGlzLHR5cGUsY2FsbGVyLGxpc3RlbmVyLGFyZ3MpO1xyXG5cdFx0QnJvd3Nlci53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZGV2aWNlbW90aW9uJyx0aGlzLm9uRGV2aWNlT3JpZW50YXRpb25DaGFuZ2UpO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQq5Y+W5raI5L6m5ZCs5Yqg6YCf5Zmo44CCXHJcblx0KkBwYXJhbSBoYW5kbGUg5L6m5ZCs5Yqg6YCf5Zmo5omA55So5aSE55CG5Zmo44CCXHJcblx0Ki9cclxuXHRfX3Byb3RvLm9mZj1mdW5jdGlvbih0eXBlLGNhbGxlcixsaXN0ZW5lcixvbmNlT25seSl7XHJcblx0XHQob25jZU9ubHk9PT12b2lkIDApJiYgKG9uY2VPbmx5PWZhbHNlKTtcclxuXHRcdGlmICghdGhpcy5oYXNMaXN0ZW5lcih0eXBlKSlcclxuXHRcdFx0QnJvd3Nlci53aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZGV2aWNlbW90aW9uJyx0aGlzLm9uRGV2aWNlT3JpZW50YXRpb25DaGFuZ2UpXHJcblx0XHRyZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5vZmYuY2FsbCh0aGlzLHR5cGUsY2FsbGVyLGxpc3RlbmVyLG9uY2VPbmx5KTtcclxuXHR9XHJcblxyXG5cdF9fcHJvdG8ub25EZXZpY2VPcmllbnRhdGlvbkNoYW5nZT1mdW5jdGlvbihlKXtcclxuXHRcdHZhciBpbnRlcnZhbD1lLmludGVydmFsO1xyXG5cdFx0QWNjZWxlcmF0b3IuYWNjZWxlcmF0aW9uLng9ZS5hY2NlbGVyYXRpb24ueDtcclxuXHRcdEFjY2VsZXJhdG9yLmFjY2VsZXJhdGlvbi55PWUuYWNjZWxlcmF0aW9uLnk7XHJcblx0XHRBY2NlbGVyYXRvci5hY2NlbGVyYXRpb24uej1lLmFjY2VsZXJhdGlvbi56O1xyXG5cdFx0QWNjZWxlcmF0b3IuYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS54PWUuYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS54O1xyXG5cdFx0QWNjZWxlcmF0b3IuYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS55PWUuYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS55O1xyXG5cdFx0QWNjZWxlcmF0b3IuYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS56PWUuYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS56O1xyXG5cdFx0QWNjZWxlcmF0b3Iucm90YXRpb25SYXRlLmFscGhhPWUucm90YXRpb25SYXRlLmdhbW1hICotMTtcclxuXHRcdEFjY2VsZXJhdG9yLnJvdGF0aW9uUmF0ZS5iZXRhPWUucm90YXRpb25SYXRlLmFscGhhICotMTtcclxuXHRcdEFjY2VsZXJhdG9yLnJvdGF0aW9uUmF0ZS5nYW1tYT1lLnJvdGF0aW9uUmF0ZS5iZXRhO1xyXG5cdFx0aWYgKEJyb3dzZXIub25BbmRyb2lkKXtcclxuXHRcdFx0aWYgKEFjY2VsZXJhdG9yLm9uQ2hyb21lKXtcclxuXHRcdFx0XHRBY2NlbGVyYXRvci5yb3RhdGlvblJhdGUuYWxwaGEgKj0xODAgLyBNYXRoLlBJO1xyXG5cdFx0XHRcdEFjY2VsZXJhdG9yLnJvdGF0aW9uUmF0ZS5iZXRhICo9MTgwIC8gTWF0aC5QSTtcclxuXHRcdFx0XHRBY2NlbGVyYXRvci5yb3RhdGlvblJhdGUuZ2FtbWEgKj0xODAgLyBNYXRoLlBJO1xyXG5cdFx0XHR9XHJcblx0XHRcdEFjY2VsZXJhdG9yLmFjY2VsZXJhdGlvbi54ICo9LTE7XHJcblx0XHRcdEFjY2VsZXJhdG9yLmFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkueCAqPS0xO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoQnJvd3Nlci5vbklPUyl7XHJcblx0XHRcdEFjY2VsZXJhdG9yLmFjY2VsZXJhdGlvbi55ICo9LTE7XHJcblx0XHRcdEFjY2VsZXJhdG9yLmFjY2VsZXJhdGlvbi56ICo9LTE7XHJcblx0XHRcdEFjY2VsZXJhdG9yLmFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkueSAqPS0xO1xyXG5cdFx0XHRBY2NlbGVyYXRvci5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5LnogKj0tMTtcclxuXHRcdFx0aW50ZXJ2YWwgKj0xMDAwO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5ldmVudCgvKmxheWEuZXZlbnRzLkV2ZW50LkNIQU5HRSovXCJjaGFuZ2VcIixbQWNjZWxlcmF0b3IuYWNjZWxlcmF0aW9uLEFjY2VsZXJhdG9yLmFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHksQWNjZWxlcmF0b3Iucm90YXRpb25SYXRlLGludGVydmFsXSk7XHJcblx0fVxyXG5cclxuXHRfX2dldHNldCgxLEFjY2VsZXJhdG9yLCdpbnN0YW5jZScsZnVuY3Rpb24oKXtBY2NlbGVyYXRvci5faW5zdGFuY2U9QWNjZWxlcmF0b3IuX2luc3RhbmNlfHwgbmV3IEFjY2VsZXJhdG9yKDApXHJcblx0XHRyZXR1cm4gQWNjZWxlcmF0b3IuX2luc3RhbmNlO1xyXG5cdH0sbGF5YS5ldmVudHMuRXZlbnREaXNwYXRjaGVyLl8kU0VUX2luc3RhbmNlKTtcclxuXHJcblx0QWNjZWxlcmF0b3IuZ2V0VHJhbnNmb3JtZWRBY2NlbGVyYXRpb249ZnVuY3Rpb24oYWNjZWxlcmF0aW9uKXtBY2NlbGVyYXRvci50cmFuc2Zvcm1lZEFjY2VsZXJhdGlvbj1BY2NlbGVyYXRvci50cmFuc2Zvcm1lZEFjY2VsZXJhdGlvbnx8IG5ldyBBY2NlbGVyYXRpb25JbmZvKCk7XHJcblx0XHRBY2NlbGVyYXRvci50cmFuc2Zvcm1lZEFjY2VsZXJhdGlvbi56PWFjY2VsZXJhdGlvbi56O1xyXG5cdFx0aWYgKEJyb3dzZXIud2luZG93Lm9yaWVudGF0aW9uPT05MCl7XHJcblx0XHRcdEFjY2VsZXJhdG9yLnRyYW5zZm9ybWVkQWNjZWxlcmF0aW9uLng9YWNjZWxlcmF0aW9uLnk7XHJcblx0XHRcdEFjY2VsZXJhdG9yLnRyYW5zZm9ybWVkQWNjZWxlcmF0aW9uLnk9LWFjY2VsZXJhdGlvbi54O1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoQnJvd3Nlci53aW5kb3cub3JpZW50YXRpb249PS05MCl7XHJcblx0XHRcdEFjY2VsZXJhdG9yLnRyYW5zZm9ybWVkQWNjZWxlcmF0aW9uLng9LWFjY2VsZXJhdGlvbi55O1xyXG5cdFx0XHRBY2NlbGVyYXRvci50cmFuc2Zvcm1lZEFjY2VsZXJhdGlvbi55PWFjY2VsZXJhdGlvbi54O1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoIUJyb3dzZXIud2luZG93Lm9yaWVudGF0aW9uKXtcclxuXHRcdFx0QWNjZWxlcmF0b3IudHJhbnNmb3JtZWRBY2NlbGVyYXRpb24ueD1hY2NlbGVyYXRpb24ueDtcclxuXHRcdFx0QWNjZWxlcmF0b3IudHJhbnNmb3JtZWRBY2NlbGVyYXRpb24ueT1hY2NlbGVyYXRpb24ueTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKEJyb3dzZXIud2luZG93Lm9yaWVudGF0aW9uPT0xODApe1xyXG5cdFx0XHRBY2NlbGVyYXRvci50cmFuc2Zvcm1lZEFjY2VsZXJhdGlvbi54PS1hY2NlbGVyYXRpb24ueDtcclxuXHRcdFx0QWNjZWxlcmF0b3IudHJhbnNmb3JtZWRBY2NlbGVyYXRpb24ueT0tYWNjZWxlcmF0aW9uLnk7XHJcblx0XHR9O1xyXG5cdFx0dmFyIHR4PU5hTjtcclxuXHRcdGlmIChMYXlhLnN0YWdlLmNhbnZhc0RlZ3JlZT09LTkwKXtcclxuXHRcdFx0dHg9QWNjZWxlcmF0b3IudHJhbnNmb3JtZWRBY2NlbGVyYXRpb24ueDtcclxuXHRcdFx0QWNjZWxlcmF0b3IudHJhbnNmb3JtZWRBY2NlbGVyYXRpb24ueD0tQWNjZWxlcmF0b3IudHJhbnNmb3JtZWRBY2NlbGVyYXRpb24ueTtcclxuXHRcdFx0QWNjZWxlcmF0b3IudHJhbnNmb3JtZWRBY2NlbGVyYXRpb24ueT10eDtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKExheWEuc3RhZ2UuY2FudmFzRGVncmVlPT05MCl7XHJcblx0XHRcdHR4PUFjY2VsZXJhdG9yLnRyYW5zZm9ybWVkQWNjZWxlcmF0aW9uLng7XHJcblx0XHRcdEFjY2VsZXJhdG9yLnRyYW5zZm9ybWVkQWNjZWxlcmF0aW9uLng9QWNjZWxlcmF0b3IudHJhbnNmb3JtZWRBY2NlbGVyYXRpb24ueTtcclxuXHRcdFx0QWNjZWxlcmF0b3IudHJhbnNmb3JtZWRBY2NlbGVyYXRpb24ueT0tdHg7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gQWNjZWxlcmF0b3IudHJhbnNmb3JtZWRBY2NlbGVyYXRpb247XHJcblx0fVxyXG5cclxuXHRBY2NlbGVyYXRvci5faW5zdGFuY2U9bnVsbDtcclxuXHRBY2NlbGVyYXRvci50cmFuc2Zvcm1lZEFjY2VsZXJhdGlvbj1udWxsO1xyXG5cdF9fc3RhdGljKEFjY2VsZXJhdG9yLFxyXG5cdFsnYWNjZWxlcmF0aW9uJyxmdW5jdGlvbigpe3JldHVybiB0aGlzLmFjY2VsZXJhdGlvbj1uZXcgQWNjZWxlcmF0aW9uSW5mbygpO30sJ2FjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHknLGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eT1uZXcgQWNjZWxlcmF0aW9uSW5mbygpO30sJ3JvdGF0aW9uUmF0ZScsZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5yb3RhdGlvblJhdGU9bmV3IFJvdGF0aW9uSW5mbygpO30sJ29uQ2hyb21lJyxmdW5jdGlvbigpe3JldHVybiB0aGlzLm9uQ2hyb21lPShCcm93c2VyLnVzZXJBZ2VudC5pbmRleE9mKFwiQ2hyb21lXCIpPi0xKTt9XHJcblx0XSk7XHJcblx0cmV0dXJuIEFjY2VsZXJhdG9yO1xyXG59KShFdmVudERpc3BhdGNoZXIpXHJcblxyXG5cclxuLyoqXHJcbirkvb/nlKhHeXJvc2NvcGUuaW5zdGFuY2Xojrflj5bllK/kuIDnmoRHeXJvc2NvcGXlvJXnlKjvvIzor7fli7/osIPnlKjmnoTpgKDlh73mlbDjgIJcclxuKlxyXG4qPHA+XHJcbipsaXN0ZW4oKeeahOWbnuiwg+WkhOeQhuWZqOaOpeWPl+S4pOS4quWPguaVsO+8mlxyXG4qPGNvZGU+ZnVuY3Rpb24gb25PcmllbnRhdGlvbkNoYW5nZShhYnNvbHV0ZTpCb29sZWFuLGluZm86Um90YXRpb25JbmZvKTp2b2lkPC9jb2RlPlxyXG4qPG9sPlxyXG4qPGxpPjxiPmFic29sdXRlPC9iPjrmjIfnpLrorr7lpIfmmK/lkKblj6/ku6Xmj5Dkvpvnu53lr7nmlrnkvY3mlbDmja7vvIjmjIflkJHlnLDnkIPlnZDmoIfns7vvvInvvIzmiJbogIXorr7lpIflhrPlrprnmoTku7vmhI/lnZDmoIfns7vjgILlhbPkuo7lnZDmoIfns7vlj4Lop4E8aT5odHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9HdWlkZS9FdmVudHMvT3JpZW50YXRpb25fYW5kX21vdGlvbl9kYXRhX2V4cGxhaW5lZDwvaT7jgII8L2xpPlxyXG4qPGxpPjxiPmluZm88L2I+Ojxjb2RlPlJvdGF0aW9uSW5mbzwvY29kZT7nsbvlnovlj4LmlbDvvIzkv53lrZjorr7lpIfnmoTml4vovazlgLzjgII8L2xpPlxyXG4qPC9vbD5cclxuKjwvcD5cclxuKlxyXG4qPHA+XHJcbirmtY/op4jlmajlhbzlrrnmgKflj4Lop4HvvJo8aT5odHRwOi8vY2FuaXVzZS5jb20vI3NlYXJjaD1kZXZpY2VvcmllbnRhdGlvbjwvaT5cclxuKjwvcD5cclxuKi9cclxuLy9jbGFzcyBsYXlhLmRldmljZS5tb3Rpb24uR3lyb3Njb3BlIGV4dGVuZHMgbGF5YS5ldmVudHMuRXZlbnREaXNwYXRjaGVyXHJcbnZhciBHeXJvc2NvcGU9KGZ1bmN0aW9uKF9zdXBlcil7XHJcblx0ZnVuY3Rpb24gR3lyb3Njb3BlKHNpbmdsZXRvbil7XHJcblx0XHRHeXJvc2NvcGUuX19zdXBlci5jYWxsKHRoaXMpO1xyXG5cdFx0LypfX0pTX18gKi90aGlzLm9uRGV2aWNlT3JpZW50YXRpb25DaGFuZ2U9dGhpcy5vbkRldmljZU9yaWVudGF0aW9uQ2hhbmdlLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cclxuXHRfX2NsYXNzKEd5cm9zY29wZSwnbGF5YS5kZXZpY2UubW90aW9uLkd5cm9zY29wZScsX3N1cGVyKTtcclxuXHR2YXIgX19wcm90bz1HeXJvc2NvcGUucHJvdG90eXBlO1xyXG5cdC8qKlxyXG5cdCrnm5Hop4bpmYDonrrku6rov5DliqjjgIJcclxuXHQqQHBhcmFtIG9ic2VydmVyIOWbnuiwg+WHveaVsOaOpeWPl+S4gOS4qkJvb2xlYW7nsbvlnovnmoQ8Y29kZT5hYnNvbHV0ZTwvY29kZT7lkow8Y29kZT5HeXJvc2NvcGVJbmZvPC9jb2RlPuexu+Wei+WPguaVsOOAglxyXG5cdCovXHJcblx0X19wcm90by5vbj1mdW5jdGlvbih0eXBlLGNhbGxlcixsaXN0ZW5lcixhcmdzKXtcclxuXHRcdF9zdXBlci5wcm90b3R5cGUub24uY2FsbCh0aGlzLHR5cGUsY2FsbGVyLGxpc3RlbmVyLGFyZ3MpO1xyXG5cdFx0QnJvd3Nlci53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZGV2aWNlb3JpZW50YXRpb24nLHRoaXMub25EZXZpY2VPcmllbnRhdGlvbkNoYW5nZSk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCrlj5bmtojmjIflrprlpITnkIblmajlr7npmYDonrrku6rnmoTnm5Hop4bjgIJcclxuXHQqQHBhcmFtIG9ic2VydmVyXHJcblx0Ki9cclxuXHRfX3Byb3RvLm9mZj1mdW5jdGlvbih0eXBlLGNhbGxlcixsaXN0ZW5lcixvbmNlT25seSl7XHJcblx0XHQob25jZU9ubHk9PT12b2lkIDApJiYgKG9uY2VPbmx5PWZhbHNlKTtcclxuXHRcdGlmICghdGhpcy5oYXNMaXN0ZW5lcih0eXBlKSlcclxuXHRcdFx0QnJvd3Nlci53aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZGV2aWNlb3JpZW50YXRpb24nLHRoaXMub25EZXZpY2VPcmllbnRhdGlvbkNoYW5nZSk7XHJcblx0XHRyZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5vZmYuY2FsbCh0aGlzLHR5cGUsY2FsbGVyLGxpc3RlbmVyLG9uY2VPbmx5KTtcclxuXHR9XHJcblxyXG5cdF9fcHJvdG8ub25EZXZpY2VPcmllbnRhdGlvbkNoYW5nZT1mdW5jdGlvbihlKXtcclxuXHRcdEd5cm9zY29wZS5pbmZvLmFscGhhPWUuYWxwaGE7XHJcblx0XHRHeXJvc2NvcGUuaW5mby5iZXRhPWUuYmV0YTtcclxuXHRcdEd5cm9zY29wZS5pbmZvLmdhbW1hPWUuZ2FtbWE7XHJcblx0XHRpZiAoZS53ZWJraXRDb21wYXNzSGVhZGluZyl7XHJcblx0XHRcdEd5cm9zY29wZS5pbmZvLmFscGhhPWUud2Via2l0Q29tcGFzc0hlYWRpbmcgKi0xO1xyXG5cdFx0XHRHeXJvc2NvcGUuaW5mby5jb21wYXNzQWNjdXJhY3k9ZS53ZWJraXRDb21wYXNzQWNjdXJhY3k7XHJcblx0XHR9XHJcblx0XHR0aGlzLmV2ZW50KC8qbGF5YS5ldmVudHMuRXZlbnQuQ0hBTkdFKi9cImNoYW5nZVwiLFtlLmFic29sdXRlLEd5cm9zY29wZS5pbmZvXSk7XHJcblx0fVxyXG5cclxuXHRfX2dldHNldCgxLEd5cm9zY29wZSwnaW5zdGFuY2UnLGZ1bmN0aW9uKCl7R3lyb3Njb3BlLl9pbnN0YW5jZT1HeXJvc2NvcGUuX2luc3RhbmNlfHwgbmV3IEd5cm9zY29wZSgwKTtcclxuXHRcdHJldHVybiBHeXJvc2NvcGUuX2luc3RhbmNlO1xyXG5cdH0sbGF5YS5ldmVudHMuRXZlbnREaXNwYXRjaGVyLl8kU0VUX2luc3RhbmNlKTtcclxuXHJcblx0R3lyb3Njb3BlLl9pbnN0YW5jZT1udWxsO1xyXG5cdF9fc3RhdGljKEd5cm9zY29wZSxcclxuXHRbJ2luZm8nLGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuaW5mbz1uZXcgUm90YXRpb25JbmZvKCk7fVxyXG5cdF0pO1xyXG5cdHJldHVybiBHeXJvc2NvcGU7XHJcbn0pKEV2ZW50RGlzcGF0Y2hlcilcclxuXHJcblxyXG4vKipcclxuKlNoYWtl5Y+q6IO95Zyo5pSv5oyB5q2k5pON5L2c55qE6K6+5aSH5LiK5pyJ5pWI44CCXHJcbipcclxuKkBhdXRob3IgU3Vydml2b3JcclxuKi9cclxuLy9jbGFzcyBsYXlhLmRldmljZS5TaGFrZSBleHRlbmRzIGxheWEuZXZlbnRzLkV2ZW50RGlzcGF0Y2hlclxyXG52YXIgU2hha2U9KGZ1bmN0aW9uKF9zdXBlcil7XHJcblx0ZnVuY3Rpb24gU2hha2UoKXtcclxuXHRcdHRoaXMudGhyb3VzaG9sZD0wO1xyXG5cdFx0dGhpcy5zaGFrZUludGVydmFsPTA7XHJcblx0XHR0aGlzLmNhbGxiYWNrPW51bGw7XHJcblx0XHR0aGlzLmxhc3RYPU5hTjtcclxuXHRcdHRoaXMubGFzdFk9TmFOO1xyXG5cdFx0dGhpcy5sYXN0Wj1OYU47XHJcblx0XHR0aGlzLmxhc3RNaWxsU2Vjb25kPU5hTjtcclxuXHRcdFNoYWtlLl9fc3VwZXIuY2FsbCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdF9fY2xhc3MoU2hha2UsJ2xheWEuZGV2aWNlLlNoYWtlJyxfc3VwZXIpO1xyXG5cdHZhciBfX3Byb3RvPVNoYWtlLnByb3RvdHlwZTtcclxuXHQvKipcclxuXHQq5byA5aeL5ZON5bqU6K6+5aSH5pGH5pmD44CCXHJcblx0KkBwYXJhbSB0aHJvdXNob2xkIOWTjeW6lOeahOeerOaXtumAn+W6pumYiOWAvO+8jOi9u+W6puaRh+aZg+eahOWAvOe6puWcqDV+MTDpl7TjgIJcclxuXHQqQHBhcmFtIHRpbWVvdXQg6K6+5aSH5pGH5pmD55qE5ZON5bqU6Ze06ZqU5pe26Ze044CCXHJcblx0KkBwYXJhbSBjYWxsYmFjayDlnKjorr7lpIfmkYfmmYPop6blj5Hml7bosIPnlKjnmoTlpITnkIblmajjgIJcclxuXHQqL1xyXG5cdF9fcHJvdG8uc3RhcnQ9ZnVuY3Rpb24odGhyb3VzaG9sZCxpbnRlcnZhbCl7XHJcblx0XHR0aGlzLnRocm91c2hvbGQ9dGhyb3VzaG9sZDtcclxuXHRcdHRoaXMuc2hha2VJbnRlcnZhbD1pbnRlcnZhbDtcclxuXHRcdHRoaXMubGFzdFg9dGhpcy5sYXN0WT10aGlzLmxhc3RaPU5hTjtcclxuXHRcdEFjY2VsZXJhdG9yLmluc3RhbmNlLm9uKC8qbGF5YS5ldmVudHMuRXZlbnQuQ0hBTkdFKi9cImNoYW5nZVwiLHRoaXMsdGhpcy5vblNoYWtlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCrlgZzmraLlk43lupTorr7lpIfmkYfmmYPjgIJcclxuXHQqL1xyXG5cdF9fcHJvdG8uc3RvcD1mdW5jdGlvbigpe1xyXG5cdFx0QWNjZWxlcmF0b3IuaW5zdGFuY2Uub2ZmKC8qbGF5YS5ldmVudHMuRXZlbnQuQ0hBTkdFKi9cImNoYW5nZVwiLHRoaXMsdGhpcy5vblNoYWtlKTtcclxuXHR9XHJcblxyXG5cdF9fcHJvdG8ub25TaGFrZT1mdW5jdGlvbihhY2NlbGVyYXRpb24sYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eSxyb3RhdGlvblJhdGUsaW50ZXJ2YWwpe1xyXG5cdFx0aWYoaXNOYU4odGhpcy5sYXN0WCkpe1xyXG5cdFx0XHR0aGlzLmxhc3RYPWFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkueDtcclxuXHRcdFx0dGhpcy5sYXN0WT1hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lnk7XHJcblx0XHRcdHRoaXMubGFzdFo9YWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS56O1xyXG5cdFx0XHR0aGlzLmxhc3RNaWxsU2Vjb25kPUJyb3dzZXIubm93KCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH07XHJcblx0XHR2YXIgZGVsdGFYPU1hdGguYWJzKHRoaXMubGFzdFgtYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS54KTtcclxuXHRcdHZhciBkZWx0YVk9TWF0aC5hYnModGhpcy5sYXN0WS1hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5LnkpO1xyXG5cdFx0dmFyIGRlbHRhWj1NYXRoLmFicyh0aGlzLmxhc3RaLWFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkueik7XHJcblx0XHRpZih0aGlzLmlzU2hha2VkKGRlbHRhWCxkZWx0YVksZGVsdGFaKSl7XHJcblx0XHRcdHZhciBkZWx0YU1pbGxTZWNvbmQ9QnJvd3Nlci5ub3coKS10aGlzLmxhc3RNaWxsU2Vjb25kO1xyXG5cdFx0XHRpZiAoZGVsdGFNaWxsU2Vjb25kID4gdGhpcy5zaGFrZUludGVydmFsKXtcclxuXHRcdFx0XHR0aGlzLmV2ZW50KC8qbGF5YS5ldmVudHMuRXZlbnQuQ0hBTkdFKi9cImNoYW5nZVwiKTtcclxuXHRcdFx0XHR0aGlzLmxhc3RNaWxsU2Vjb25kPUJyb3dzZXIubm93KCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMubGFzdFg9YWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS54O1xyXG5cdFx0dGhpcy5sYXN0WT1hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lnk7XHJcblx0XHR0aGlzLmxhc3RaPWFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkuejtcclxuXHR9XHJcblxyXG5cdC8vIOmAmui/h+S7u+aEj+S4pOS4quWIhumHj+WIpOaWreaYr+WQpua7oei2s+aRh+aZg+iuvuWumuOAglxyXG5cdF9fcHJvdG8uaXNTaGFrZWQ9ZnVuY3Rpb24oZGVsdGFYLGRlbHRhWSxkZWx0YVope1xyXG5cdFx0cmV0dXJuIChkZWx0YVggPiB0aGlzLnRocm91c2hvbGQgJiYgZGVsdGFZID4gdGhpcy50aHJvdXNob2xkKXx8XHJcblx0XHQoZGVsdGFYID4gdGhpcy50aHJvdXNob2xkICYmIGRlbHRhWiA+IHRoaXMudGhyb3VzaG9sZCl8fFxyXG5cdFx0KGRlbHRhWSA+IHRoaXMudGhyb3VzaG9sZCAmJiBkZWx0YVogPiB0aGlzLnRocm91c2hvbGQpXHJcblx0fVxyXG5cclxuXHRfX2dldHNldCgxLFNoYWtlLCdpbnN0YW5jZScsZnVuY3Rpb24oKXtTaGFrZS5faW5zdGFuY2U9U2hha2UuX2luc3RhbmNlfHwgbmV3IFNoYWtlKCk7XHJcblx0XHRyZXR1cm4gU2hha2UuX2luc3RhbmNlO1xyXG5cdH0sbGF5YS5ldmVudHMuRXZlbnREaXNwYXRjaGVyLl8kU0VUX2luc3RhbmNlKTtcclxuXHJcblx0U2hha2UuX2luc3RhbmNlPW51bGw7XHJcblx0cmV0dXJuIFNoYWtlO1xyXG59KShFdmVudERpc3BhdGNoZXIpXHJcblxyXG5cclxuLyoqXHJcbipAcHJpdmF0ZVxyXG4qL1xyXG4vL2NsYXNzIGxheWEuZGV2aWNlLm1lZGlhLkh0bWxWaWRlbyBleHRlbmRzIGxheWEucmVzb3VyY2UuQml0bWFwXHJcbnZhciBIdG1sVmlkZW89KGZ1bmN0aW9uKF9zdXBlcil7XHJcblx0ZnVuY3Rpb24gSHRtbFZpZGVvKCl7XHJcblx0XHR0aGlzLnZpZGVvPW51bGw7XHJcblx0XHR0aGlzLl9zb3VyY2U9bnVsbDtcclxuXHRcdEh0bWxWaWRlby5fX3N1cGVyLmNhbGwodGhpcyk7XHJcblx0XHR0aGlzLl93aWR0aD0xO1xyXG5cdFx0dGhpcy5faGVpZ2h0PTE7XHJcblx0XHR0aGlzLmNyZWF0ZURvbUVsZW1lbnQoKTtcclxuXHR9XHJcblxyXG5cdF9fY2xhc3MoSHRtbFZpZGVvLCdsYXlhLmRldmljZS5tZWRpYS5IdG1sVmlkZW8nLF9zdXBlcik7XHJcblx0dmFyIF9fcHJvdG89SHRtbFZpZGVvLnByb3RvdHlwZTtcclxuXHRfX3Byb3RvLmNyZWF0ZURvbUVsZW1lbnQ9ZnVuY3Rpb24oKXtcclxuXHRcdHZhciBfJHRoaXM9dGhpcztcclxuXHRcdHRoaXMuX3NvdXJjZT10aGlzLnZpZGVvPUJyb3dzZXIuY3JlYXRlRWxlbWVudChcInZpZGVvXCIpO1xyXG5cdFx0dmFyIHN0eWxlPXRoaXMudmlkZW8uc3R5bGU7XHJcblx0XHRzdHlsZS5wb3NpdGlvbj0nYWJzb2x1dGUnO1xyXG5cdFx0c3R5bGUudG9wPScwcHgnO1xyXG5cdFx0c3R5bGUubGVmdD0nMHB4JztcclxuXHRcdHRoaXMudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZG1ldGFkYXRhXCIsKGZ1bmN0aW9uKCl7XHJcblx0XHRcdHRoaXMuX3c9XyR0aGlzLnZpZGVvLnZpZGVvV2lkdGg7XHJcblx0XHRcdHRoaXMuX2g9XyR0aGlzLnZpZGVvLnZpZGVvSGVpZ2h0O1xyXG5cdFx0fSlbJ2JpbmQnXSh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHRfX3Byb3RvLnNldFNvdXJjZT1mdW5jdGlvbih1cmwsZXh0ZW5zaW9uKXtcclxuXHRcdHdoaWxlKHRoaXMudmlkZW8uY2hpbGRFbGVtZW50Q291bnQpXHJcblx0XHR0aGlzLnZpZGVvLmZpcnN0Q2hpbGQucmVtb3ZlKCk7XHJcblx0XHRpZiAoZXh0ZW5zaW9uICYgVmlkZW8uTVA0KVxyXG5cdFx0XHR0aGlzLmFwcGVuZFNvdXJjZSh1cmwsXCJ2aWRlby9tcDRcIik7XHJcblx0XHRpZiAoZXh0ZW5zaW9uICYgVmlkZW8uT0dHKVxyXG5cdFx0XHR0aGlzLmFwcGVuZFNvdXJjZSh1cmwrXCIub2dnXCIsXCJ2aWRlby9vZ2dcIik7XHJcblx0fVxyXG5cclxuXHRfX3Byb3RvLmFwcGVuZFNvdXJjZT1mdW5jdGlvbihzb3VyY2UsdHlwZSl7XHJcblx0XHR2YXIgc291cmNlRWxlbWVudD1Ccm93c2VyLmNyZWF0ZUVsZW1lbnQoXCJzb3VyY2VcIik7XHJcblx0XHRzb3VyY2VFbGVtZW50LnNyYz1zb3VyY2U7XHJcblx0XHRzb3VyY2VFbGVtZW50LnR5cGU9dHlwZTtcclxuXHRcdHRoaXMudmlkZW8uYXBwZW5kQ2hpbGQoc291cmNlRWxlbWVudCk7XHJcblx0fVxyXG5cclxuXHRfX3Byb3RvLmdldFZpZGVvPWZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy52aWRlbztcclxuXHR9XHJcblxyXG5cdF9fcHJvdG8uX2dldFNvdXJjZT1mdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMuX3NvdXJjZTtcclxuXHR9XHJcblxyXG5cdEh0bWxWaWRlby5jcmVhdGU9ZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiBuZXcgSHRtbFZpZGVvKCk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gSHRtbFZpZGVvO1xyXG59KShCaXRtYXApXHJcblxyXG5cclxuLyoqXHJcbio8Y29kZT5WaWRlbzwvY29kZT7lsIbop4bpopHmmL7npLrliLBDYW52YXPkuIrjgII8Y29kZT5WaWRlbzwvY29kZT7lj6/og73kuI3kvJrlnKjmiYDmnInmtY/op4jlmajmnInmlYjjgIJcclxuKjxwPuWFs+S6jlZpZGVv5pSv5oyB55qE5omA5pyJ5LqL5Lu25Y+C6KeB77yaPGk+aHR0cDovL3d3dy53M3NjaG9vbC5jb20uY24vdGFncy9odG1sX3JlZl9hdWRpb192aWRlb19kb20uYXNwPC9pPuOAgjwvcD5cclxuKjxwPlxyXG4qPGI+5rOo5oSP77yaPC9iPjxici8+XHJcbirlnKhQQ+err+WPr+S7peWcqOS7u+S9leaXtuacuuiwg+eUqDxjb2RlPnBsYXkoKTwvY29kZT7lm6DmraTvvIzlj6/ku6XlnKjnqIvluo/lvIDlp4vov5DooYzml7blsLHkvb9WaWRlb+W8gOWni+aSreaUvuOAguS9huaYr+WcqOenu+WKqOerr++8jOWPquacieWcqOeUqOaIt+esrOS4gOasoeinpueisOWxj+W5leWQjuaJjeWPr+S7peiwg+eUqHBsYXkoKe+8jOaJgOS7peenu+WKqOerr+S4jeWPr+iDveWcqOeoi+W6j+W8gOWni+i/kOihjOaXtuWwseiHquWKqOW8gOWni+aSreaUvlZpZGVv44CCXHJcbio8L3A+XHJcbipcclxuKjxwPk1ETiBWaWRlb+mTvuaOpe+8miA8aT5odHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVE1ML0VsZW1lbnQvdmlkZW88L2k+PC9wPlxyXG4qL1xyXG4vL2NsYXNzIGxheWEuZGV2aWNlLm1lZGlhLlZpZGVvIGV4dGVuZHMgbGF5YS5kaXNwbGF5LlNwcml0ZVxyXG52YXIgVmlkZW89KGZ1bmN0aW9uKF9zdXBlcil7XHJcblx0ZnVuY3Rpb24gVmlkZW8od2lkdGgsaGVpZ2h0KXtcclxuXHRcdHRoaXMuaHRtbFZpZGVvPW51bGw7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudD1udWxsO1xyXG5cdFx0dGhpcy5pbnRlcm5hbFRleHR1cmU9bnVsbDtcclxuXHRcdCh3aWR0aD09PXZvaWQgMCkmJiAod2lkdGg9MzIwKTtcclxuXHRcdChoZWlnaHQ9PT12b2lkIDApJiYgKGhlaWdodD0yNDApO1xyXG5cdFx0VmlkZW8uX19zdXBlci5jYWxsKHRoaXMpO1xyXG5cdFx0aWYgKFJlbmRlci5pc0NvbmNoQXBwIHx8IFJlbmRlci5pc1dlYkdMKXtcclxuXHRcdFx0dGhpcy5odG1sVmlkZW89bmV3IFdlYkdMVmlkZW8oKTtcclxuXHRcdH1cclxuXHRcdGVsc2V7XHJcblx0XHRcdHRoaXMuaHRtbFZpZGVvPW5ldyBIdG1sVmlkZW8oKTtcclxuXHRcdH1cclxuXHRcdHRoaXMudmlkZW9FbGVtZW50PXRoaXMuaHRtbFZpZGVvLmdldFZpZGVvKCk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5sYXlhVGFyZ2V0PXRoaXM7XHJcblx0XHR0aGlzLmludGVybmFsVGV4dHVyZT1uZXcgVGV4dHVyZSh0aGlzLmh0bWxWaWRlbyk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIixWaWRlby5vbkFib3J0KTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5XCIsVmlkZW8ub25DYW5wbGF5KTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5dGhyb3VnaFwiLFZpZGVvLm9uQ2FucGxheXRocm91Z2gpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImR1cmF0aW9uY2hhbmdlXCIsVmlkZW8ub25EdXJhdGlvbmNoYW5nZSk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZW1wdGllZFwiLFZpZGVvLm9uRW1wdGllZCk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixWaWRlby5vbkVycm9yKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZWRkYXRhXCIsVmlkZW8ub25Mb2FkZWRkYXRhKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZWRtZXRhZGF0YVwiLFZpZGVvLm9uTG9hZGVkbWV0YWRhdGEpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRzdGFydFwiLFZpZGVvLm9uTG9hZHN0YXJ0KTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwYXVzZVwiLFZpZGVvLm9uUGF1c2UpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBsYXlcIixWaWRlby5vblBsYXkpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBsYXlpbmdcIixWaWRlby5vblBsYXlpbmcpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInByb2dyZXNzXCIsVmlkZW8ub25Qcm9ncmVzcyk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwicmF0ZWNoYW5nZVwiLFZpZGVvLm9uUmF0ZWNoYW5nZSk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic2Vla2VkXCIsVmlkZW8ub25TZWVrZWQpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInNlZWtpbmdcIixWaWRlby5vblNlZWtpbmcpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN0YWxsZWRcIixWaWRlby5vblN0YWxsZWQpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN1c3BlbmRcIixWaWRlby5vblN1c3BlbmQpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRpbWV1cGRhdGVcIixWaWRlby5vblRpbWV1cGRhdGUpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInZvbHVtZWNoYW5nZVwiLFZpZGVvLm9uVm9sdW1lY2hhbmdlKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ3YWl0aW5nXCIsVmlkZW8ub25XYWl0aW5nKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJlbmRlZFwiLHRoaXMub25QbGF5Q29tcGxldGVbJ2JpbmQnXSh0aGlzKSk7XHJcblx0XHR0aGlzLnNpemUod2lkdGgsaGVpZ2h0KTtcclxuXHRcdGlmIChCcm93c2VyLm9uTW9iaWxlKXtcclxuXHRcdFx0LypfX0pTX18gKi90aGlzLm9uRG9jdW1lbnRDbGljaz10aGlzLm9uRG9jdW1lbnRDbGljay5iaW5kKHRoaXMpO1xyXG5cdFx0XHRCcm93c2VyLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLHRoaXMub25Eb2N1bWVudENsaWNrKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdF9fY2xhc3MoVmlkZW8sJ2xheWEuZGV2aWNlLm1lZGlhLlZpZGVvJyxfc3VwZXIpO1xyXG5cdHZhciBfX3Byb3RvPVZpZGVvLnByb3RvdHlwZTtcclxuXHRfX3Byb3RvLm9uUGxheUNvbXBsZXRlPWZ1bmN0aW9uKGUpe1xyXG5cdFx0dGhpcy5ldmVudChcImVuZGVkXCIpO1xyXG5cdFx0aWYoIVJlbmRlci5pc0NvbmNoQXBwIHx8ICF0aGlzLnZpZGVvRWxlbWVudC5sb29wKVxyXG5cdFx0XHRMYXlhLnRpbWVyLmNsZWFyKHRoaXMsdGhpcy5yZW5kZXJDYW52YXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0Kuiuvue9ruaSreaUvua6kOOAglxyXG5cdCpAcGFyYW0gdXJsIOaSreaUvua6kOi3r+W+hOOAglxyXG5cdCovXHJcblx0X19wcm90by5sb2FkPWZ1bmN0aW9uKHVybCl7XHJcblx0XHRpZiAodXJsLmluZGV4T2YoXCJibG9iOlwiKT09MClcclxuXHRcdFx0dGhpcy52aWRlb0VsZW1lbnQuc3JjPXVybDtcclxuXHRcdGVsc2VcclxuXHRcdHRoaXMuaHRtbFZpZGVvLnNldFNvdXJjZSh1cmwsbGF5YS5kZXZpY2UubWVkaWEuVmlkZW8uTVA0KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCrlvIDlp4vmkq3mlL7op4bpopHjgIJcclxuXHQqL1xyXG5cdF9fcHJvdG8ucGxheT1mdW5jdGlvbigpe1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucGxheSgpO1xyXG5cdFx0TGF5YS50aW1lci5mcmFtZUxvb3AoMSx0aGlzLHRoaXMucmVuZGVyQ2FudmFzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCrmmoLlgZzop4bpopHmkq3mlL7jgIJcclxuXHQqL1xyXG5cdF9fcHJvdG8ucGF1c2U9ZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnBhdXNlKCk7XHJcblx0XHRMYXlhLnRpbWVyLmNsZWFyKHRoaXMsdGhpcy5yZW5kZXJDYW52YXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0KumHjeaWsOWKoOi9veinhumikeOAglxyXG5cdCovXHJcblx0X19wcm90by5yZWxvYWQ9ZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmxvYWQoKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCrmo4DmtYvmmK/lkKbmlK/mjIHmkq3mlL7mjIflrprmoLzlvI/op4bpopHjgIJcclxuXHQqQHBhcmFtIHR5cGUg5Y+C5pWw5Li6VmlkZW8uTVA0IC8gVmlkZW8uT0dHIC8gVmlkZW8uV0VCTeS5i+S4gOOAglxyXG5cdCpAcmV0dXJuIOihqOekuuaUr+aMgeeahOe6p+WIq+OAguWPr+iDveeahOWAvO+8mlxyXG5cdCo8dWw+XHJcblx0KjxsaT5cInByb2JhYmx5XCLvvIxWaWRlby5TVVBQT1JUX1BST0JBQkxZLea1j+iniOWZqOacgOWPr+iDveaUr+aMgeivpemfs+mikS/op4bpopHnsbvlnos8L2xpPlxyXG5cdCo8bGk+XCJtYXliZVwi77yMVmlkZW8uU1VQUE9SVF9NQVlCWS3mtY/op4jlmajkuZ/orrjmlK/mjIHor6Xpn7PpopEv6KeG6aKR57G75Z6LPC9saT5cclxuXHQqPGxpPlwiXCLvvIxWaWRlby5TVVBQT1JUX05PLe+8iOepuuWtl+espuS4su+8iea1j+iniOWZqOS4jeaUr+aMgeivpemfs+mikS/op4bpopHnsbvlnos8L2xpPlxyXG5cdCo8L3VsPlxyXG5cdCovXHJcblx0X19wcm90by5jYW5QbGF5VHlwZT1mdW5jdGlvbih0eXBlKXtcclxuXHRcdHZhciB0eXBlU3RyaW5nO1xyXG5cdFx0c3dpdGNoICh0eXBlKXtcclxuXHRcdFx0Y2FzZSBsYXlhLmRldmljZS5tZWRpYS5WaWRlby5NUDQ6XHJcblx0XHRcdFx0dHlwZVN0cmluZz1cInZpZGVvL21wNFwiO1xyXG5cdFx0XHRcdGJyZWFrIDtcclxuXHRcdFx0Y2FzZSBsYXlhLmRldmljZS5tZWRpYS5WaWRlby5PR0c6XHJcblx0XHRcdFx0dHlwZVN0cmluZz1cInZpZGVvL29nZ1wiO1xyXG5cdFx0XHRcdGJyZWFrIDtcclxuXHRcdFx0Y2FzZSBsYXlhLmRldmljZS5tZWRpYS5WaWRlby5XRUJNOlxyXG5cdFx0XHRcdHR5cGVTdHJpbmc9XCJ2aWRlby93ZWJtXCI7XHJcblx0XHRcdFx0YnJlYWsgO1xyXG5cdFx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy52aWRlb0VsZW1lbnQuY2FuUGxheVR5cGUodHlwZVN0cmluZyk7XHJcblx0fVxyXG5cclxuXHRfX3Byb3RvLnJlbmRlckNhbnZhcz1mdW5jdGlvbigpe1xyXG5cdFx0aWYgKHRoaXMucmVhZHlTdGF0ZT09PTApXHJcblx0XHRcdHJldHVybjtcclxuXHRcdGlmIChSZW5kZXIuaXNDb25jaEFwcCB8fCBSZW5kZXIuaXNXZWJHTClcclxuXHRcdFx0dGhpcy5odG1sVmlkZW9bJ3VwZGF0ZVRleHR1cmUnXSgpO1xyXG5cdFx0dGhpcy5ncmFwaGljcy5jbGVhcigpO1xyXG5cdFx0dGhpcy5ncmFwaGljcy5kcmF3VGV4dHVyZSh0aGlzLmludGVybmFsVGV4dHVyZSwwLDAsdGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XHJcblx0fVxyXG5cclxuXHRfX3Byb3RvLm9uRG9jdW1lbnRDbGljaz1mdW5jdGlvbigpe1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucGxheSgpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucGF1c2UoKTtcclxuXHRcdEJyb3dzZXIuZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xyXG5cdH1cclxuXHJcblx0X19wcm90by5zaXplPWZ1bmN0aW9uKHdpZHRoLGhlaWdodCl7XHJcblx0XHRfc3VwZXIucHJvdG90eXBlLnNpemUuY2FsbCh0aGlzLHdpZHRoLGhlaWdodClcclxuXHRcdGlmIChSZW5kZXIuaXNDb25jaEFwcCl7XHJcblx0XHRcdHZhciB0cmFuc2Zvcm09VXRpbHMuZ2V0VHJhbnNmb3JtUmVsYXRpdmVUb1dpbmRvdyh0aGlzLDAsMCk7XHJcblx0XHRcdHRoaXMudmlkZW9FbGVtZW50LndpZHRoPXdpZHRoICp0cmFuc2Zvcm0uc2NhbGVYO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0dGhpcy52aWRlb0VsZW1lbnQud2lkdGg9d2lkdGggLyBCcm93c2VyLnBpeGVsUmF0aW87XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5wYXVzZWQpdGhpcy5yZW5kZXJDYW52YXMoKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0KumUgOavgeWGhemDqOS6i+S7tue7keWumuOAglxyXG5cdCovXHJcblx0X19wcm90by5kZXN0cm95PWZ1bmN0aW9uKGRldHJveUNoaWxkcmVuKXtcclxuXHRcdChkZXRyb3lDaGlsZHJlbj09PXZvaWQgMCkmJiAoZGV0cm95Q2hpbGRyZW49dHJ1ZSk7XHJcblx0XHRfc3VwZXIucHJvdG90eXBlLmRlc3Ryb3kuY2FsbCh0aGlzLGRldHJveUNoaWxkcmVuKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLFZpZGVvLm9uQWJvcnQpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNhbnBsYXlcIixWaWRlby5vbkNhbnBsYXkpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNhbnBsYXl0aHJvdWdoXCIsVmlkZW8ub25DYW5wbGF5dGhyb3VnaCk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZHVyYXRpb25jaGFuZ2VcIixWaWRlby5vbkR1cmF0aW9uY2hhbmdlKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJlbXB0aWVkXCIsVmlkZW8ub25FbXB0aWVkKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLFZpZGVvLm9uRXJyb3IpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRlZGRhdGFcIixWaWRlby5vbkxvYWRlZGRhdGEpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRlZG1ldGFkYXRhXCIsVmlkZW8ub25Mb2FkZWRtZXRhZGF0YSk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZHN0YXJ0XCIsVmlkZW8ub25Mb2Fkc3RhcnQpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBhdXNlXCIsVmlkZW8ub25QYXVzZSk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwicGxheVwiLFZpZGVvLm9uUGxheSk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwicGxheWluZ1wiLFZpZGVvLm9uUGxheWluZyk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwicHJvZ3Jlc3NcIixWaWRlby5vblByb2dyZXNzKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyYXRlY2hhbmdlXCIsVmlkZW8ub25SYXRlY2hhbmdlKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzZWVrZWRcIixWaWRlby5vblNlZWtlZCk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Vla2luZ1wiLFZpZGVvLm9uU2Vla2luZyk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwic3RhbGxlZFwiLFZpZGVvLm9uU3RhbGxlZCk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwic3VzcGVuZFwiLFZpZGVvLm9uU3VzcGVuZCk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidGltZXVwZGF0ZVwiLFZpZGVvLm9uVGltZXVwZGF0ZSk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidm9sdW1lY2hhbmdlXCIsVmlkZW8ub25Wb2x1bWVjaGFuZ2UpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIndhaXRpbmdcIixWaWRlby5vbldhaXRpbmcpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVuZGVkXCIsdGhpcy5vblBsYXlDb21wbGV0ZSk7XHJcblx0XHR0aGlzLnBhdXNlKCk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5sYXlhVGFyZ2V0PW51bGxcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50PW51bGw7XHJcblx0XHR0aGlzLmh0bWxWaWRlby5kZXN0cm95KCk7XHJcblx0fVxyXG5cclxuXHRfX3Byb3RvLnN5bmNWaWRlb1Bvc2l0aW9uPWZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgc3RhZ2U9TGF5YS5zdGFnZTtcclxuXHRcdHZhciByZWM7XHJcblx0XHRyZWM9VXRpbHMuZ2V0R2xvYmFsUG9zQW5kU2NhbGUodGhpcyk7XHJcblx0XHR2YXIgYT1zdGFnZS5fY2FudmFzVHJhbnNmb3JtLmEsZD1zdGFnZS5fY2FudmFzVHJhbnNmb3JtLmQ7XHJcblx0XHR2YXIgeD1yZWMueCAqc3RhZ2UuY2xpZW50U2NhbGVYICphK3N0YWdlLm9mZnNldC54O1xyXG5cdFx0dmFyIHk9cmVjLnkgKnN0YWdlLmNsaWVudFNjYWxlWSAqZCtzdGFnZS5vZmZzZXQueTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnN0eWxlLmxlZnQ9eCsncHgnOztcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnN0eWxlLnRvcD15KydweCc7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC53aWR0aD10aGlzLndpZHRoIC8gQnJvd3Nlci5waXhlbFJhdGlvO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuaGVpZ2h0PXRoaXMuaGVpZ2h0IC8gQnJvd3Nlci5waXhlbFJhdGlvO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0KmJ1ZmZlcmVkIOWxnuaAp+i/lOWbniBUaW1lUmFuZ2VzKEpTKeWvueixoeOAglRpbWVSYW5nZXMg5a+56LGh6KGo56S655So5oi355qE6Z+z6KeG6aKR57yT5Yay6IyD5Zu044CC57yT5Yay6IyD5Zu05oyH55qE5piv5bey57yT5Yay6Z+z6KeG6aKR55qE5pe26Ze06IyD5Zu044CC5aaC5p6c55So5oi35Zyo6Z+z6KeG6aKR5Lit6Lez6LeD5pKt5pS+77yM5Lya5b6X5Yiw5aSa5Liq57yT5Yay6IyD5Zu044CCXHJcblx0KjxwPmJ1ZmZlcmVkLmxlbmd0aOi/lOWbnue8k+WGsuiMg+WbtOS4quaVsOOAguWmguiOt+WPluesrOS4gOS4que8k+WGsuiMg+WbtOWImeaYr2J1ZmZlcmVkLnN0YXJ0KDAp5ZKMYnVmZmVyZWQuZW5kKDAp44CC5Lul56eS6K6h44CCPC9wPlxyXG5cdCpAcmV0dXJuIFRpbWVSYW5nZXMoSlMp5a+56LGhXHJcblx0Ki9cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ2J1ZmZlcmVkJyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMudmlkZW9FbGVtZW50LmJ1ZmZlcmVkO1xyXG5cdH0pO1xyXG5cclxuXHQvKipcclxuXHQq6I635Y+W6KeG6aKR5rqQ5bC65a+444CCcmVhZHnkuovku7bop6blj5HlkI7lj6/nlKjjgIJcclxuXHQqL1xyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywndmlkZW9XaWR0aCcsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLnZpZGVvRWxlbWVudC52aWRlb1dpZHRoO1xyXG5cdH0pO1xyXG5cclxuXHQvKipcclxuXHQq6I635Y+W5b2T5YmN5pKt5pS+5rqQ6Lev5b6E44CCXHJcblx0Ki9cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ2N1cnJlbnRTcmMnLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy52aWRlb0VsZW1lbnQuY3VycmVudFNyYztcclxuXHR9KTtcclxuXHJcblx0LyoqXHJcblx0Kuiuvue9ruWSjOiOt+WPluW9k+WJjeaSreaUvuWktOS9jee9ruOAglxyXG5cdCovXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCdjdXJyZW50VGltZScsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLnZpZGVvRWxlbWVudC5jdXJyZW50VGltZTtcclxuXHRcdH0sZnVuY3Rpb24odmFsdWUpe1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuY3VycmVudFRpbWU9dmFsdWU7XHJcblx0XHR0aGlzLnJlbmRlckNhbnZhcygpO1xyXG5cdH0pO1xyXG5cclxuXHQvKipcclxuXHQq6L+U5Zue6Z+z6aKRL+inhumikeeahOaSreaUvuaYr+WQpuW3sue7k+adn1xyXG5cdCovXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCdlbmRlZCcsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLnZpZGVvRWxlbWVudC5lbmRlZDtcclxuXHR9KTtcclxuXHJcblx0LyoqXHJcblx0Kuiuvue9ruWSjOiOt+WPluW9k+WJjemfs+mHj+OAglxyXG5cdCovXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCd2b2x1bWUnLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy52aWRlb0VsZW1lbnQudm9sdW1lO1xyXG5cdFx0fSxmdW5jdGlvbih2YWx1ZSl7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC52b2x1bWU9dmFsdWU7XHJcblx0fSk7XHJcblxyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywndmlkZW9IZWlnaHQnLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy52aWRlb0VsZW1lbnQudmlkZW9IZWlnaHQ7XHJcblx0fSk7XHJcblxyXG5cdC8qKlxyXG5cdCrooajnpLrop4bpopHlhYPntKDnmoTlsLHnu6rnirbmgIHvvJpcclxuXHQqPHVsPlxyXG5cdCo8bGk+MD1IQVZFX05PVEhJTkct5rKh5pyJ5YWz5LqO6Z+z6aKRL+inhumikeaYr+WQpuWwsee7queahOS/oeaBrzwvbGk+XHJcblx0KjxsaT4xPUhBVkVfTUVUQURBVEEt5YWz5LqO6Z+z6aKRL+inhumikeWwsee7queahOWFg+aVsOaNrjwvbGk+XHJcblx0KjxsaT4yPUhBVkVfQ1VSUkVOVF9EQVRBLeWFs+S6juW9k+WJjeaSreaUvuS9jee9rueahOaVsOaNruaYr+WPr+eUqOeahO+8jOS9huayoeaciei2s+Wkn+eahOaVsOaNruadpeaSreaUvuS4i+S4gOW4py/mr6vnp5I8L2xpPlxyXG5cdCo8bGk+Mz1IQVZFX0ZVVFVSRV9EQVRBLeW9k+WJjeWPiuiHs+WwkeS4i+S4gOW4p+eahOaVsOaNruaYr+WPr+eUqOeahDwvbGk+XHJcblx0KjxsaT40PUhBVkVfRU5PVUdIX0RBVEEt5Y+v55So5pWw5o2u6Laz5Lul5byA5aeL5pKt5pS+PC9saT5cclxuXHQqPC91bD5cclxuXHQqL1xyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywncmVhZHlTdGF0ZScsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLnZpZGVvRWxlbWVudC5yZWFkeVN0YXRlO1xyXG5cdH0pO1xyXG5cclxuXHQvKipcclxuXHQq6I635Y+W6KeG6aKR6ZW/5bqm77yI56eS77yJ44CCcmVhZHnkuovku7bop6blj5HlkI7lj6/nlKjjgIJcclxuXHQqL1xyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywnZHVyYXRpb24nLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy52aWRlb0VsZW1lbnQuZHVyYXRpb247XHJcblx0fSk7XHJcblxyXG5cdC8qKlxyXG5cdCrov5Tlm57ooajnpLrpn7PpopEv6KeG6aKR6ZSZ6K+v54q25oCB55qEIE1lZGlhRXJyb3LvvIhKU++8ieWvueixoeOAglxyXG5cdCovXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCdlcnJvcicsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLnZpZGVvRWxlbWVudC5lcnJvcjtcclxuXHR9KTtcclxuXHJcblx0LyoqXHJcblx0Kuiuvue9ruaIlui/lOWbnumfs+mikS/op4bpopHmmK/lkKblupTlnKjnu5PmnZ/ml7bph43mlrDmkq3mlL7jgIJcclxuXHQqL1xyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywnbG9vcCcsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLnZpZGVvRWxlbWVudC5sb29wO1xyXG5cdFx0fSxmdW5jdGlvbih2YWx1ZSl7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5sb29wPXZhbHVlO1xyXG5cdH0pO1xyXG5cclxuXHQvKipcclxuXHQq6K6+572u6KeG6aKR55qEeOWdkOagh1xyXG5cdCovXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCd4Jyxfc3VwZXIucHJvdG90eXBlLl8kZ2V0X3gsZnVuY3Rpb24odmFsKXtcclxuXHRcdExheWEuc3VwZXJTZXQoU3ByaXRlLHRoaXMsJ3gnLHZhbCk7XHJcblx0XHRpZiAoUmVuZGVyLmlzQ29uY2hBcHApe1xyXG5cdFx0XHR2YXIgdHJhbnNmb3JtPVV0aWxzLmdldFRyYW5zZm9ybVJlbGF0aXZlVG9XaW5kb3codGhpcywwLDApO1xyXG5cdFx0XHR0aGlzLnZpZGVvRWxlbWVudC5zdHlsZS5sZWZ0PXRyYW5zZm9ybS54O1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKipcclxuXHQq6K6+572u6KeG6aKR55qEeeWdkOagh1xyXG5cdCovXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCd5Jyxfc3VwZXIucHJvdG90eXBlLl8kZ2V0X3ksZnVuY3Rpb24odmFsKXtcclxuXHRcdExheWEuc3VwZXJTZXQoU3ByaXRlLHRoaXMsJ3knLHZhbCk7XHJcblx0XHRpZiAoUmVuZGVyLmlzQ29uY2hBcHApe1xyXG5cdFx0XHR2YXIgdHJhbnNmb3JtPVV0aWxzLmdldFRyYW5zZm9ybVJlbGF0aXZlVG9XaW5kb3codGhpcywwLDApO1xyXG5cdFx0XHR0aGlzLnZpZGVvRWxlbWVudC5zdHlsZS50b3A9dHJhbnNmb3JtLnk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qKlxyXG5cdCpwbGF5YmFja1JhdGUg5bGe5oCn6K6+572u5oiW6L+U5Zue6Z+z6aKRL+inhumikeeahOW9k+WJjeaSreaUvumAn+W6puOAguWmgu+8mlxyXG5cdCo8dWw+XHJcblx0KjxsaT4xLjAg5q2j5bi46YCf5bqmPC9saT5cclxuXHQqPGxpPjAuNSDljYrpgJ/vvIjmm7TmhaLvvIk8L2xpPlxyXG5cdCo8bGk+Mi4wIOWAjemAn++8iOabtOW/q++8iTwvbGk+XHJcblx0KjxsaT4tMS4wIOWQkeWQju+8jOato+W4uOmAn+W6pjwvbGk+XHJcblx0KjxsaT4tMC41IOWQkeWQju+8jOWNiumAnzwvbGk+XHJcblx0KjwvdWw+XHJcblx0KjxwPuWPquaciSBHb29nbGUgQ2hyb21lIOWSjCBTYWZhcmkg5pSv5oyBIHBsYXliYWNrUmF0ZSDlsZ7mgKfjgII8L3A+XHJcblx0Ki9cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ3BsYXliYWNrUmF0ZScsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLnZpZGVvRWxlbWVudC5wbGF5YmFja1JhdGU7XHJcblx0XHR9LGZ1bmN0aW9uKHZhbHVlKXtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnBsYXliYWNrUmF0ZT12YWx1ZTtcclxuXHR9KTtcclxuXHJcblx0LyoqXHJcblx0KuiOt+WPluWSjOiuvue9rumdmemfs+eKtuaAgeOAglxyXG5cdCovXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCdtdXRlZCcsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLnZpZGVvRWxlbWVudC5tdXRlZDtcclxuXHRcdH0sZnVuY3Rpb24odmFsdWUpe1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQubXV0ZWQ9dmFsdWU7XHJcblx0fSk7XHJcblxyXG5cdC8qKlxyXG5cdCrov5Tlm57op4bpopHmmK/lkKbmmoLlgZxcclxuXHQqL1xyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywncGF1c2VkJyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMudmlkZW9FbGVtZW50LnBhdXNlZDtcclxuXHR9KTtcclxuXHJcblx0LyoqXHJcblx0KnByZWxvYWQg5bGe5oCn6K6+572u5oiW6L+U5Zue5piv5ZCm5Zyo6aG16Z2i5Yqg6L295ZCO56uL5Y2z5Yqg6L296KeG6aKR44CC5Y+v6LWL5YC85aaC5LiL77yaXHJcblx0Kjx1bD5cclxuXHQqPGxpPmF1dG8g5oyH56S65LiA5pem6aG16Z2i5Yqg6L2977yM5YiZ5byA5aeL5Yqg6L296KeG6aKR44CCPC9saT5cclxuXHQqPGxpPm1ldGFkYXRhIOaMh+ekuuW9k+mhtemdouWKoOi9veWQjuS7heWKoOi9vemfs+mikS/op4bpopHnmoTlhYPmlbDmja7jgII8L2xpPlxyXG5cdCo8bGk+bm9uZSDmjIfnpLrpobXpnaLliqDovb3lkI7kuI3lupTliqDovb3pn7PpopEv6KeG6aKR44CCPC9saT5cclxuXHQqPC91bD5cclxuXHQqL1xyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywncHJlbG9hZCcsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLnZpZGVvRWxlbWVudC5wcmVsb2FkO1xyXG5cdFx0fSxmdW5jdGlvbih2YWx1ZSl7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5wcmVsb2FkPXZhbHVlO1xyXG5cdH0pO1xyXG5cclxuXHQvKipcclxuXHQq5Y+C6KeBIDxpPmh0dHA6Ly93d3cudzNzY2hvb2wuY29tLmNuL3RhZ3MvYXZfcHJvcF9zZWVrYWJsZS5hc3A8L2k+44CCXHJcblx0Ki9cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ3NlZWthYmxlJyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMudmlkZW9FbGVtZW50LnNlZWthYmxlO1xyXG5cdH0pO1xyXG5cclxuXHQvKipcclxuXHQqc2Vla2luZyDlsZ7mgKfov5Tlm57nlKjmiLfnm67liY3mmK/lkKblnKjpn7PpopEv6KeG6aKR5Lit5a+75Z2A44CCXHJcblx0KuWvu+WdgOS4re+8iFNlZWtpbmfvvInmjIfnmoTmmK/nlKjmiLflnKjpn7PpopEv6KeG6aKR5Lit56e75YqoL+i3s+i3g+WIsOaWsOeahOS9jee9ruOAglxyXG5cdCovXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCdzZWVraW5nJyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMudmlkZW9FbGVtZW50LnNlZWtpbmc7XHJcblx0fSk7XHJcblxyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywnd2lkdGgnLF9zdXBlci5wcm90b3R5cGUuXyRnZXRfd2lkdGgsZnVuY3Rpb24odmFsdWUpe1xyXG5cdFx0aWYgKFJlbmRlci5pc0NvbmNoQXBwKXtcclxuXHRcdFx0dmFyIHRyYW5zZm9ybT1VdGlscy5nZXRUcmFuc2Zvcm1SZWxhdGl2ZVRvV2luZG93KHRoaXMsMCwwKTtcclxuXHRcdFx0dGhpcy52aWRlb0VsZW1lbnQud2lkdGg9dmFsdWUgKnRyYW5zZm9ybS5zY2FsZVg7XHJcblx0XHR9XHJcblx0XHRlbHNle1xyXG5cdFx0XHR0aGlzLnZpZGVvRWxlbWVudC53aWR0aD10aGlzLndpZHRoIC8gQnJvd3Nlci5waXhlbFJhdGlvO1xyXG5cdFx0fVxyXG5cdFx0TGF5YS5zdXBlclNldChTcHJpdGUsdGhpcywnd2lkdGgnLHZhbHVlKTtcclxuXHRcdGlmICh0aGlzLnBhdXNlZCl0aGlzLnJlbmRlckNhbnZhcygpO1xyXG5cdH0pO1xyXG5cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ2hlaWdodCcsX3N1cGVyLnByb3RvdHlwZS5fJGdldF9oZWlnaHQsZnVuY3Rpb24odmFsdWUpe1xyXG5cdFx0aWYgKFJlbmRlci5pc0NvbmNoQXBwKXtcclxuXHRcdFx0dmFyIHRyYW5zZm9ybT1VdGlscy5nZXRUcmFuc2Zvcm1SZWxhdGl2ZVRvV2luZG93KHRoaXMsMCwwKTtcclxuXHRcdFx0dGhpcy52aWRlb0VsZW1lbnQuaGVpZ2h0PXZhbHVlICp0cmFuc2Zvcm0uc2NhbGVZO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0dGhpcy52aWRlb0VsZW1lbnQuaGVpZ2h0PXRoaXMuaGVpZ2h0IC8gQnJvd3Nlci5waXhlbFJhdGlvO1xyXG5cdFx0fVxyXG5cdFx0TGF5YS5zdXBlclNldChTcHJpdGUsdGhpcywnaGVpZ2h0Jyx2YWx1ZSk7XHJcblx0fSk7XHJcblxyXG5cdFZpZGVvLm9uQWJvcnQ9ZnVuY3Rpb24oZSl7ZS50YXJnZXQubGF5YVRhcmdldC5ldmVudChcImFib3J0XCIpfVxyXG5cdFZpZGVvLm9uQ2FucGxheT1mdW5jdGlvbihlKXtlLnRhcmdldC5sYXlhVGFyZ2V0LmV2ZW50KFwiY2FucGxheVwiKX1cclxuXHRWaWRlby5vbkNhbnBsYXl0aHJvdWdoPWZ1bmN0aW9uKGUpe2UudGFyZ2V0LmxheWFUYXJnZXQuZXZlbnQoXCJjYW5wbGF5dGhyb3VnaFwiKX1cclxuXHRWaWRlby5vbkR1cmF0aW9uY2hhbmdlPWZ1bmN0aW9uKGUpe2UudGFyZ2V0LmxheWFUYXJnZXQuZXZlbnQoXCJkdXJhdGlvbmNoYW5nZVwiKX1cclxuXHRWaWRlby5vbkVtcHRpZWQ9ZnVuY3Rpb24oZSl7ZS50YXJnZXQubGF5YVRhcmdldC5ldmVudChcImVtcHRpZWRcIil9XHJcblx0VmlkZW8ub25FcnJvcj1mdW5jdGlvbihlKXtlLnRhcmdldC5sYXlhVGFyZ2V0LmV2ZW50KFwiZXJyb3JcIil9XHJcblx0VmlkZW8ub25Mb2FkZWRkYXRhPWZ1bmN0aW9uKGUpe2UudGFyZ2V0LmxheWFUYXJnZXQuZXZlbnQoXCJsb2FkZWRkYXRhXCIpfVxyXG5cdFZpZGVvLm9uTG9hZGVkbWV0YWRhdGE9ZnVuY3Rpb24oZSl7ZS50YXJnZXQubGF5YVRhcmdldC5ldmVudChcImxvYWRlZG1ldGFkYXRhXCIpfVxyXG5cdFZpZGVvLm9uTG9hZHN0YXJ0PWZ1bmN0aW9uKGUpe2UudGFyZ2V0LmxheWFUYXJnZXQuZXZlbnQoXCJsb2Fkc3RhcnRcIil9XHJcblx0VmlkZW8ub25QYXVzZT1mdW5jdGlvbihlKXtlLnRhcmdldC5sYXlhVGFyZ2V0LmV2ZW50KFwicGF1c2VcIil9XHJcblx0VmlkZW8ub25QbGF5PWZ1bmN0aW9uKGUpe2UudGFyZ2V0LmxheWFUYXJnZXQuZXZlbnQoXCJwbGF5XCIpfVxyXG5cdFZpZGVvLm9uUGxheWluZz1mdW5jdGlvbihlKXtlLnRhcmdldC5sYXlhVGFyZ2V0LmV2ZW50KFwicGxheWluZ1wiKX1cclxuXHRWaWRlby5vblByb2dyZXNzPWZ1bmN0aW9uKGUpe2UudGFyZ2V0LmxheWFUYXJnZXQuZXZlbnQoXCJwcm9ncmVzc1wiKX1cclxuXHRWaWRlby5vblJhdGVjaGFuZ2U9ZnVuY3Rpb24oZSl7ZS50YXJnZXQubGF5YVRhcmdldC5ldmVudChcInJhdGVjaGFuZ2VcIil9XHJcblx0VmlkZW8ub25TZWVrZWQ9ZnVuY3Rpb24oZSl7ZS50YXJnZXQubGF5YVRhcmdldC5ldmVudChcInNlZWtlZFwiKX1cclxuXHRWaWRlby5vblNlZWtpbmc9ZnVuY3Rpb24oZSl7ZS50YXJnZXQubGF5YVRhcmdldC5ldmVudChcInNlZWtpbmdcIil9XHJcblx0VmlkZW8ub25TdGFsbGVkPWZ1bmN0aW9uKGUpe2UudGFyZ2V0LmxheWFUYXJnZXQuZXZlbnQoXCJzdGFsbGVkXCIpfVxyXG5cdFZpZGVvLm9uU3VzcGVuZD1mdW5jdGlvbihlKXtlLnRhcmdldC5sYXlhVGFyZ2V0LmV2ZW50KFwic3VzcGVuZFwiKX1cclxuXHRWaWRlby5vblRpbWV1cGRhdGU9ZnVuY3Rpb24oZSl7ZS50YXJnZXQubGF5YVRhcmdldC5ldmVudChcInRpbWV1cGRhdGVcIil9XHJcblx0VmlkZW8ub25Wb2x1bWVjaGFuZ2U9ZnVuY3Rpb24oZSl7ZS50YXJnZXQubGF5YVRhcmdldC5ldmVudChcInZvbHVtZWNoYW5nZVwiKX1cclxuXHRWaWRlby5vbldhaXRpbmc9ZnVuY3Rpb24oZSl7ZS50YXJnZXQubGF5YVRhcmdldC5ldmVudChcIndhaXRpbmdcIil9XHJcblx0VmlkZW8uTVA0PTE7XHJcblx0VmlkZW8uT0dHPTI7XHJcblx0VmlkZW8uQ0FNRVJBPTQ7XHJcblx0VmlkZW8uV0VCTT04O1xyXG5cdFZpZGVvLlNVUFBPUlRfUFJPQkFCTFk9XCJwcm9iYWJseVwiO1xyXG5cdFZpZGVvLlNVUFBPUlRfTUFZQlk9XCJtYXliZVwiO1xyXG5cdFZpZGVvLlNVUFBPUlRfTk89XCJcIjtcclxuXHRyZXR1cm4gVmlkZW87XHJcbn0pKFNwcml0ZSlcclxuXHJcblxyXG4vKipcclxuKkBwcml2YXRlXHJcbiovXHJcbi8vY2xhc3MgbGF5YS5kZXZpY2UubWVkaWEuV2ViR0xWaWRlbyBleHRlbmRzIGxheWEuZGV2aWNlLm1lZGlhLkh0bWxWaWRlb1xyXG52YXIgV2ViR0xWaWRlbz0oZnVuY3Rpb24oX3N1cGVyKXtcclxuXHRmdW5jdGlvbiBXZWJHTFZpZGVvKCl7XHJcblx0XHR0aGlzLmdsPW51bGw7XHJcblx0XHR0aGlzLnByZVRhcmdldD1udWxsO1xyXG5cdFx0dGhpcy5wcmVUZXh0dXJlPW51bGw7XHJcblx0XHRXZWJHTFZpZGVvLl9fc3VwZXIuY2FsbCh0aGlzKTtcclxuXHRcdGlmKCFSZW5kZXIuaXNDb25jaEFwcCAmJiBCcm93c2VyLm9uSVBob25lKVxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR0aGlzLmdsPS8qX19KU19fICovUmVuZGVyLmlzQ29uY2hBcHAgPyBMYXlhR0xDb250ZXh0Lmluc3RhbmNlIDpXZWJHTC5tYWluQ29udGV4dDtcclxuXHRcdHRoaXMuX3NvdXJjZT10aGlzLmdsLmNyZWF0ZVRleHR1cmUoKTtcclxuXHRcdFdlYkdMQ29udGV4dC5iaW5kVGV4dHVyZSh0aGlzLmdsLC8qbGF5YS53ZWJnbC5XZWJHTENvbnRleHQuVEVYVFVSRV8yRCovMHgwREUxLHRoaXMuX3NvdXJjZSk7XHJcblx0XHR0aGlzLmdsLnRleFBhcmFtZXRlcmkoLypsYXlhLndlYmdsLldlYkdMQ29udGV4dC5URVhUVVJFXzJEKi8weDBERTEsLypsYXlhLndlYmdsLldlYkdMQ29udGV4dC5URVhUVVJFX1dSQVBfUyovMHgyODAyLC8qbGF5YS53ZWJnbC5XZWJHTENvbnRleHQuQ0xBTVBfVE9fRURHRSovMHg4MTJGKTtcclxuXHRcdHRoaXMuZ2wudGV4UGFyYW1ldGVyaSgvKmxheWEud2ViZ2wuV2ViR0xDb250ZXh0LlRFWFRVUkVfMkQqLzB4MERFMSwvKmxheWEud2ViZ2wuV2ViR0xDb250ZXh0LlRFWFRVUkVfV1JBUF9UKi8weDI4MDMsLypsYXlhLndlYmdsLldlYkdMQ29udGV4dC5DTEFNUF9UT19FREdFKi8weDgxMkYpO1xyXG5cdFx0dGhpcy5nbC50ZXhQYXJhbWV0ZXJpKC8qbGF5YS53ZWJnbC5XZWJHTENvbnRleHQuVEVYVFVSRV8yRCovMHgwREUxLC8qbGF5YS53ZWJnbC5XZWJHTENvbnRleHQuVEVYVFVSRV9NQUdfRklMVEVSKi8weDI4MDAsLypsYXlhLndlYmdsLldlYkdMQ29udGV4dC5MSU5FQVIqLzB4MjYwMSk7XHJcblx0XHR0aGlzLmdsLnRleFBhcmFtZXRlcmkoLypsYXlhLndlYmdsLldlYkdMQ29udGV4dC5URVhUVVJFXzJEKi8weDBERTEsLypsYXlhLndlYmdsLldlYkdMQ29udGV4dC5URVhUVVJFX01JTl9GSUxURVIqLzB4MjgwMSwvKmxheWEud2ViZ2wuV2ViR0xDb250ZXh0LkxJTkVBUiovMHgyNjAxKTtcclxuXHRcdFdlYkdMQ29udGV4dC5iaW5kVGV4dHVyZSh0aGlzLmdsLC8qbGF5YS53ZWJnbC5XZWJHTENvbnRleHQuVEVYVFVSRV8yRCovMHgwREUxLG51bGwpO1xyXG5cdH1cclxuXHJcblx0X19jbGFzcyhXZWJHTFZpZGVvLCdsYXlhLmRldmljZS5tZWRpYS5XZWJHTFZpZGVvJyxfc3VwZXIpO1xyXG5cdHZhciBfX3Byb3RvPVdlYkdMVmlkZW8ucHJvdG90eXBlO1xyXG5cdC8vKHByZVRhcmdldCAmJiBwcmVUZXh0dXJlKSYmIChXZWJHTENvbnRleHQuYmluZFRleHR1cmUoZ2wscHJlVGFyZ2V0LHByZVRleHR1cmUpKTtcclxuXHRfX3Byb3RvLnVwZGF0ZVRleHR1cmU9ZnVuY3Rpb24oKXtcclxuXHRcdGlmKCFSZW5kZXIuaXNDb25jaEFwcCAmJiBCcm93c2VyLm9uSVBob25lKVxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHRXZWJHTENvbnRleHQuYmluZFRleHR1cmUodGhpcy5nbCwvKmxheWEud2ViZ2wuV2ViR0xDb250ZXh0LlRFWFRVUkVfMkQqLzB4MERFMSx0aGlzLl9zb3VyY2UpO1xyXG5cdFx0dGhpcy5nbC50ZXhJbWFnZTJEKC8qbGF5YS53ZWJnbC5XZWJHTENvbnRleHQuVEVYVFVSRV8yRCovMHgwREUxLDAsLypsYXlhLndlYmdsLldlYkdMQ29udGV4dC5SR0IqLzB4MTkwNywvKmxheWEud2ViZ2wuV2ViR0xDb250ZXh0LlJHQiovMHgxOTA3LC8qbGF5YS53ZWJnbC5XZWJHTENvbnRleHQuVU5TSUdORURfQllURSovMHgxNDAxLHRoaXMudmlkZW8pO1xyXG5cdFx0V2ViR0xWaWRlby5jdXJCaW5kU291cmNlPXRoaXMuX3NvdXJjZTtcclxuXHR9XHJcblxyXG5cdF9fcHJvdG8uZGVzdHJveT1mdW5jdGlvbigpe1xyXG5cdFx0aWYgKHRoaXMuX3NvdXJjZSl7XHJcblx0XHRcdHRoaXMuZ2w9LypfX0pTX18gKi9SZW5kZXIuaXNDb25jaEFwcCA/IExheWFHTENvbnRleHQuaW5zdGFuY2UgOldlYkdMLm1haW5Db250ZXh0O1xyXG5cdFx0XHRpZiAoV2ViR0xWaWRlby5jdXJCaW5kU291cmNlPT10aGlzLl9zb3VyY2Upe1xyXG5cdFx0XHRcdFdlYkdMQ29udGV4dC5iaW5kVGV4dHVyZSh0aGlzLmdsLC8qbGF5YS53ZWJnbC5XZWJHTENvbnRleHQuVEVYVFVSRV8yRCovMHgwREUxLG51bGwpO1xyXG5cdFx0XHRcdFdlYkdMVmlkZW8uY3VyQmluZFNvdXJjZT1udWxsO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuZ2wuZGVsZXRlVGV4dHVyZSh0aGlzLl9zb3VyY2UpO1xyXG5cdFx0fVxyXG5cdFx0bGF5YS5yZXNvdXJjZS5SZXNvdXJjZS5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCdfZ2xUZXh0dXJlJyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMuX3NvdXJjZTtcclxuXHR9KTtcclxuXHJcblx0V2ViR0xWaWRlby5jdXJCaW5kU291cmNlPW51bGw7XHJcblx0cmV0dXJuIFdlYkdMVmlkZW87XHJcbn0pKEh0bWxWaWRlbylcclxuXHJcblxyXG5cdExheWEuX19pbml0KFtNZWRpYV0pO1xyXG59KSh3aW5kb3csZG9jdW1lbnQsTGF5YSk7XHJcbiIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xyXG5pbXBvcnQgSW5mb0RpYWxvZyBmcm9tIFwiLi9zY3JpcHQvSW5mb0RpYWxvZ1wiXG5pbXBvcnQgTWFpblNjZW5lIGZyb20gXCIuL3NjcmlwdC9NYWluU2NlbmVcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUNvbmZpZyB7XHJcbiAgICBzdGF0aWMgaW5pdCgpIHtcclxuICAgICAgICAvL+azqOWGjFNjcmlwdOaIluiAhVJ1bnRpbWXlvJXnlKhcclxuICAgICAgICBsZXQgcmVnID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xyXG5cdFx0cmVnKFwic2NyaXB0L0luZm9EaWFsb2cuanNcIixJbmZvRGlhbG9nKTtcblx0XHRyZWcoXCJzY3JpcHQvTWFpblNjZW5lLmpzXCIsTWFpblNjZW5lKTtcclxuICAgIH1cclxufVxyXG5HYW1lQ29uZmlnLndpZHRoID0gNzUwO1xyXG5HYW1lQ29uZmlnLmhlaWdodCA9IDEyMDA7XHJcbkdhbWVDb25maWcuc2NhbGVNb2RlID1cImV4YWN0Zml0XCI7XHJcbkdhbWVDb25maWcuc2NyZWVuTW9kZSA9IFwibm9uZVwiO1xyXG5HYW1lQ29uZmlnLmFsaWduViA9IFwibWlkZGxlXCI7XHJcbkdhbWVDb25maWcuYWxpZ25IID0gXCJjZW50ZXJcIjtcclxuR2FtZUNvbmZpZy5zdGFydFNjZW5lID0gXCJNYWluLnNjZW5lXCI7XHJcbkdhbWVDb25maWcuc2NlbmVSb290ID0gXCJcIjtcclxuR2FtZUNvbmZpZy5kZWJ1ZyA9IGZhbHNlO1xyXG5HYW1lQ29uZmlnLnN0YXQgPSBmYWxzZTtcclxuR2FtZUNvbmZpZy5waHlzaWNzRGVidWcgPSBmYWxzZTtcclxuR2FtZUNvbmZpZy5leHBvcnRTY2VuZVRvSnNvbiA9IHRydWU7XHJcblxyXG5HYW1lQ29uZmlnLmluaXQoKTtcclxuIiwiaW1wb3J0IEdhbWVDb25maWcgZnJvbSBcIi4vR2FtZUNvbmZpZ1wiO1xyXG5jbGFzcyBNYWluIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdC8v5qC55o2uSURF6K6+572u5Yid5aeL5YyW5byV5pOOXHRcdFxyXG5cdFx0aWYgKHdpbmRvd1tcIkxheWEzRFwiXSkgTGF5YTNELmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQpO1xyXG5cdFx0ZWxzZSBMYXlhLmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQsIExheWFbXCJXZWJHTFwiXSk7XHJcblx0XHRMYXlhW1wiUGh5c2ljc1wiXSAmJiBMYXlhW1wiUGh5c2ljc1wiXS5lbmFibGUoKTtcclxuXHRcdExheWFbXCJEZWJ1Z1BhbmVsXCJdICYmIExheWFbXCJEZWJ1Z1BhbmVsXCJdLmVuYWJsZSgpO1xyXG5cdFx0TGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBHYW1lQ29uZmlnLnNjYWxlTW9kZTtcclxuXHRcdExheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IEdhbWVDb25maWcuc2NyZWVuTW9kZTtcclxuXHRcdExheWEuc3RhZ2UuYWxpZ25WID0gR2FtZUNvbmZpZy5hbGlnblY7XHJcblx0XHRMYXlhLnN0YWdlLmFsaWduSCA9IEdhbWVDb25maWcuYWxpZ25IO1xyXG5cdFx0Ly/lhbzlrrnlvq7kv6HkuI3mlK/mjIHliqDovb1zY2VuZeWQjue8gOWcuuaZr1xyXG5cdFx0TGF5YS5VUkwuZXhwb3J0U2NlbmVUb0pzb24gPSBHYW1lQ29uZmlnLmV4cG9ydFNjZW5lVG9Kc29uO1xyXG5cclxuXHRcdC8v5omT5byA6LCD6K+V6Z2i5p2/77yI6YCa6L+HSURF6K6+572u6LCD6K+V5qih5byP77yM5oiW6ICFdXJs5Zyw5Z2A5aKe5YqgZGVidWc9dHJ1ZeWPguaVsO+8jOWdh+WPr+aJk+W8gOiwg+ivlemdouadv++8iVxyXG5cdFx0aWYgKEdhbWVDb25maWcuZGVidWcgfHwgTGF5YS5VdGlscy5nZXRRdWVyeVN0cmluZyhcImRlYnVnXCIpID09IFwidHJ1ZVwiKSBMYXlhLmVuYWJsZURlYnVnUGFuZWwoKTtcclxuXHRcdGlmIChHYW1lQ29uZmlnLnBoeXNpY3NEZWJ1ZyAmJiBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXSkgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0uZW5hYmxlKCk7XHJcblx0XHRpZiAoR2FtZUNvbmZpZy5zdGF0KSBMYXlhLlN0YXQuc2hvdygpO1xyXG5cdFx0TGF5YS5hbGVydEdsb2JhbEVycm9yID0gdHJ1ZTtcclxuXHRcdFxyXG5cdFx0Ly/mv4DmtLvotYTmupDniYjmnKzmjqfliLbvvIx2ZXJzaW9uLmpzb27nlLFJREXlj5HluIPlip/og73oh6rliqjnlJ/miJDvvIzlpoLmnpzmsqHmnInkuZ/kuI3lvbHlk43lkI7nu63mtYHnqItcclxuXHRcdExheWEuUmVzb3VyY2VWZXJzaW9uLmVuYWJsZShcInZlcnNpb24uanNvblwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25WZXJzaW9uTG9hZGVkKSwgTGF5YS5SZXNvdXJjZVZlcnNpb24uRklMRU5BTUVfVkVSU0lPTik7XHJcblx0fVxyXG5cclxuXHRvblZlcnNpb25Mb2FkZWQoKSB7XHJcblx0XHQvL+a/gOa0u+Wkp+Wwj+WbvuaYoOWwhO+8jOWKoOi9veWwj+WbvueahOaXtuWAme+8jOWmguaenOWPkeeOsOWwj+WbvuWcqOWkp+WbvuWQiOmbhumHjOmdou+8jOWImeS8mOWFiOWKoOi9veWkp+WbvuWQiOmbhu+8jOiAjOS4jeaYr+Wwj+WbvlxyXG5cdFx0TGF5YS5BdGxhc0luZm9NYW5hZ2VyLmVuYWJsZShcImZpbGVjb25maWcuanNvblwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25Db25maWdMb2FkZWQpKTtcclxuXHR9XHJcblxyXG5cdG9uQ29uZmlnTG9hZGVkKCkge1xyXG5cdFx0Ly/liqDovb1JREXmjIflrprnmoTlnLrmma9cclxuXHRcdEdhbWVDb25maWcuc3RhcnRTY2VuZSAmJiBMYXlhLlNjZW5lLm9wZW4oR2FtZUNvbmZpZy5zdGFydFNjZW5lKTtcclxuXHR9XHJcbn1cclxuLy/mv4DmtLvlkK/liqjnsbtcclxubmV3IE1haW4oKTtcclxuIiwiLy9pbXBvcnQgIFwiLi4vLi4vYmluL2xpYnMvbGF5YS5EaWFsb2dcIlxyXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5mb0RpYWxvZyBleHRlbmRzIExheWEuRGlhbG9nIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgXHJcbiAgICAgICAgc3VwZXIoKTsgXHJcbiAgICAgICAgdGhpcy5tb3VzZUVuYWJsZWQ9dHJ1ZTtcclxuICAgICAgICB0aGlzLm1fTWFpbnNjZW5lPTA7XHJcbiAgICAgICAgdGhpcy5tX0NhbGxiYWNrRnVuYz0wO1xyXG4gICAgICBcclxuICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkluZm9EbGdcIik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCkge1xyXG4gICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJJbmZvRGxnXCIpO1xyXG5cclxuICAgIFxyXG4gICAgfVxyXG4gICAgb25FeGl0QnV0dG9uKGUpe1xyXG5cclxuICAgICAgICB0aGlzLm1fQ2FsbGJhY2tGdW5jKHRoaXMubV9NYWluc2NlbmUpO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICBjb25zdCBFdmVudCA9IExheWEuRXZlbnQ7XHJcbiAgICAgICAgdGhpcy5tX0V4aXRCdXR0b24ub24oRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMub25FeGl0QnV0dG9uKTtcclxuICAgIH1cclxuICAgXHJcblxyXG4gICAgb25EaXNhYmxlKCkge1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFNoYWtlIGZyb20gXCIuLi8uLi9iaW4vbGlicy9sYXlhLmRldmljZVwiXHJcbi8vaW1wb3J0ICBcIi4uLy4uL2Jpbi9saWJzL2xheWEuY29yZVwiXHJcbmltcG9ydCBJbmZvRGlhbG9nIGZyb20gXCIuL0luZm9EaWFsb2dcIlxyXG5cclxubGV0IHNoYWtlQ291bnQ9MDtcclxubGV0IG1fU2hha2VWYWx1ZT0wO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluU2NlbmUgZXh0ZW5kcyBMYXlhLlNjZW5lIHtcclxuXHJcblx0XHJcblx0dXBkYXRlc2hha2V0aW1lcyh0aW1lcylcclxuXHR7XHJcblx0XHRpZih0aGlzLm1fU2hha2VFbmFibGU9PWZhbHNlKVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHR0aGlzLm1fU2hha2VWYWx1ZSs9MjIuMDtcclxuXHRcdGlmKHRoaXMubV9TaGFrZVZhbHVlPj0xMDApXHJcblx0XHR7XHJcblx0XHRcdHRoaXMubV9TaGFrZUVuYWJsZT1mYWxzZTtcclxuXHRcdFx0dGhpcy5tX1NoYWtlVmFsdWU9MDtcclxuXHRcdFx0dGhpcy5tX0NvbGFfQW5pLnZpc2libGU9dHJ1ZTtcclxuXHRcdFx0dGhpcy5tX0NvbGFfQW5pLnBsYXkoKTtcclxuXHRcdFx0dGhpcy5tX0tleV9TcHJpdGUudGV4dHVyZT1cImltYWdlcy9pY29uc18wLnBuZ1wiXHJcblx0XHRcdHRoaXMubV9JbmZvRGlhbG9nPW5ldyBJbmZvRGlhbG9nKCk7XHJcblx0XHRcdHRoaXMubV9JbmZvRGlhbG9nLm1fTWFpbnNjZW5lPXRoaXM7XHJcblx0XHRcdHRoaXMubV9JbmZvRGlhbG9nLm1fQ2FsbGJhY2tGdW5jPSAgZnVuY3Rpb24obXMpe1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdC8vdGhpcy5tX0luZm9EaWFsb2cuaXNNb2RhbD10cnVlO1xyXG5cdFx0XHRcdG1zLm1fQ29sYV9BbmkudmlzaWJsZT1mYWxzZTtcclxuXHRcdFx0XHRtcy5tX0tleV9TcHJpdGUudGV4dHVyZT1cImltYWdlcy9pY29uc18xLnBuZ1wiXHJcblx0XHRcdFx0bXMubV9TaGFrZUVuYWJsZT10cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMubV9JbmZvRGlhbG9nLnNob3coKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdH1cclxuXHRhbmltYXRlVGltZUJhc2VkKClcclxuXHR7XHJcblx0XHR0aGlzLm1fU2hha2VWYWx1ZS09Mi42O1xyXG5cdFx0aWYodGhpcy5tX1NoYWtlVmFsdWU8MClcclxuXHRcdHtcclxuXHRcdFx0dGhpcy5tX1NoYWtlVmFsdWU9MDtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dmFyIHJlbXRpbWU9MTAwLjAtdGhpcy5tX1NoYWtlVmFsdWU7XHJcblx0XHRyZW10aW1lLz04LjA7XHJcblx0XHR0aGlzLm1fU2hha2VfVGV4dC50ZXh0PXRoaXMubV9TaGFrZVZhbHVlLnRvRml4ZWQoMikrXCIlXCI7XHJcblx0XHR0aGlzLm1fUmVtYWluX1RpbWUudGV4dD1yZW10aW1lLnRvRml4ZWQoMikrXCJzXCI7XHJcblxyXG5cdH1cclxuICAgIHN0YXJ0U2hha2UoKSB7XHJcblx0XHRcclxuXHRcdHRoaXMubV9TaGFrZV9UZXh0LnRleHQ9c2hha2VDb3VudCtcIlwiO1xyXG5cdFx0Y29uc3QgU2hha2UgPSBMYXlhLlNoYWtlO1xyXG4gICAgICAgIGlmKFNoYWtlPT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHRcdFNoYWtlLmluc3RhbmNlLnN0YXJ0KDUsIDUwMCk7XHJcblx0XHRTaGFrZS5pbnN0YW5jZS5vbihMYXlhLkV2ZW50LkNIQU5HRSwgdGhpcywgdGhpcy5vblNoYWtlKTtcclxuICAgICAgICAvL2NvbnNvbGUudGV4dCA9ICflvIDlp4vmjqXmlLborr7lpIfmkYfliqhcXG4nO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCflvIDlp4vmjqXmlLborr7lpIfmkYfliqhcXG4nKTtcclxuXHR9XHJcblx0XHJcblx0b25TaGFrZSgpIHtcclxuXHRcdGNvbnN0IFNoYWtlID0gTGF5YS5TaGFrZTtcclxuXHJcblx0XHRzaGFrZUNvdW50Kys7XHJcblx0XHRcclxuXHRcdC8vY29uc29sZS50ZXh0ICs9IFwi6K6+5aSH5pGH5pmD5LqGXCIgKyBzaGFrZUNvdW50ICsgXCLmrKFcXG5cIjtcclxuXHRcdGNvbnNvbGUubG9nKFwi6K6+5aSH5pGH5pmD5LqGXCIgKyBzaGFrZUNvdW50ICsgXCLmrKFcXG5cIik7XHJcblx0XHR0aGlzLm1fU2hha2VfVGV4dC50ZXh0PXNoYWtlQ291bnQrXCJcIjtcclxuXHRcdGlmIChzaGFrZUNvdW50ID49IDMpIHtcclxuXHRcdFx0Ly9TaGFrZS5pbnN0YW5jZS5zdG9wKCk7XHJcblx0XHRcdFxyXG4gICAgICAgICAgICAvL2NvbnNvbGUudGV4dCArPSBcIuWBnOatouaOpeaUtuiuvuWkh+aRh+WKqFwiO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCflgZzmraLmjqXmlLborr7lpIfmkYfliqhcXG4nKTtcclxuXHRcdH1cclxuXHR9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgXHJcblx0XHRzdXBlcigpOyBcclxuXHRcdHRoaXMubW91c2VFbmFibGVkPXRydWU7XHJcblx0XHR0aGlzLm1fU2hha2VFbmFibGU9dHJ1ZTtcclxuXHRcdHRoaXMubV9JbmZvRGlhbG9nPTA7XHJcblx0XHR0aGlzLm1fU2hha2VWYWx1ZT0wO1xyXG5cdFx0d2luZG93LmdfTWFpbl9TY2VuZT10aGlzO1xyXG4gICAgICAgIHRoaXMubG9hZFNjZW5lKFwiTWFpbi5zY2VuZVwiKTtcclxuXHRcdC8vdGhpcy5zdGFydFNoYWtlKCk7XHJcblx0XHRMYXlhLnRpbWVyLmxvb3AoMjAwLCB0aGlzLCB0aGlzLmFuaW1hdGVUaW1lQmFzZWQpO1xyXG5cdH1cclxuXHRvbkVuYWJsZSgpIHtcclxuXHRcdHRoaXMubV9JbmZvRGlhbG9nPW5ldyBJbmZvRGlhbG9nKCk7XHJcblx0XHR0aGlzLm1fSW5mb0RpYWxvZy5zaG93KCk7XHJcblx0XHR0aGlzLm1fSW5mb0RpYWxvZy5kZXN0cm95KCk7XHJcblx0fVxyXG59Il19
