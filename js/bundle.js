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

var shakeCount = 0;

var MainScene = function (_Laya$Scene) {
	_inherits(MainScene, _Laya$Scene);

	_createClass(MainScene, [{
		key: "startShake",
		value: function startShake() {
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
			m_Shake_Text.text = shakeCount + "";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL0xheWFBaXJJREUvcmVzb3VyY2VzL2FwcC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYmluL2xpYnMvbGF5YS5kZXZpY2UuanMiLCJzcmMvR2FtZUNvbmZpZy5qcyIsInNyYy9NYWluLmpzIiwic3JjL3NjcmlwdC9NYWluU2NlbmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDVEEsQ0FBQyxVQUFTLE1BQVQsRUFBZ0IsUUFBaEIsRUFBeUIsSUFBekIsRUFBOEI7QUFDOUIsS0FBSSxPQUFLLEtBQUssRUFBZDtBQUFBLEtBQWlCLFFBQU0sS0FBSyxHQUE1QjtBQUFBLEtBQWdDLFdBQVMsS0FBSyxNQUE5QztBQUFBLEtBQXFELFVBQVEsS0FBSyxLQUFsRTtBQUFBLEtBQXdFLFdBQVMsS0FBSyxNQUF0RjtBQUFBLEtBQTZGLFdBQVMsS0FBSyxRQUEzRzs7QUFFQSxLQUFJLFNBQU8sS0FBSyxRQUFMLENBQWMsTUFBekI7QUFBQSxLQUFnQyxVQUFRLEtBQUssS0FBTCxDQUFXLE9BQW5EO0FBQUEsS0FBMkQsUUFBTSxLQUFLLE1BQUwsQ0FBWSxLQUE3RTtBQUFBLEtBQW1GLGtCQUFnQixLQUFLLE1BQUwsQ0FBWSxlQUEvRztBQUNBLEtBQUksVUFBUSxLQUFLLEtBQUwsQ0FBVyxPQUF2QjtBQUFBLEtBQStCLFNBQU8sS0FBSyxNQUFMLENBQVksTUFBbEQ7QUFBQSxLQUF5RCxZQUFVLEtBQUssS0FBTCxDQUFXLFNBQTlFO0FBQUEsS0FBd0YsU0FBTyxLQUFLLE9BQUwsQ0FBYSxNQUE1RztBQUNBLEtBQUksU0FBTyxLQUFLLE9BQUwsQ0FBYSxNQUF4QjtBQUFBLEtBQStCLFFBQU0sS0FBSyxPQUFMLENBQWEsS0FBbEQ7QUFBQSxLQUF3RCxVQUFRLEtBQUssUUFBTCxDQUFjLE9BQTlFO0FBQUEsS0FBc0YsUUFBTSxLQUFLLEtB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Iiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcclxuKGZ1bmN0aW9uKHdpbmRvdyxkb2N1bWVudCxMYXlhKXtcclxuXHR2YXIgX191bj1MYXlhLnVuLF9fdW5zPUxheWEudW5zLF9fc3RhdGljPUxheWEuc3RhdGljLF9fY2xhc3M9TGF5YS5jbGFzcyxfX2dldHNldD1MYXlhLmdldHNldCxfX25ld3ZlYz1MYXlhLl9fbmV3dmVjO1xyXG5cclxuXHR2YXIgQml0bWFwPWxheWEucmVzb3VyY2UuQml0bWFwLEJyb3dzZXI9bGF5YS51dGlscy5Ccm93c2VyLEV2ZW50PWxheWEuZXZlbnRzLkV2ZW50LEV2ZW50RGlzcGF0Y2hlcj1sYXlhLmV2ZW50cy5FdmVudERpc3BhdGNoZXI7XHJcblx0dmFyIEhhbmRsZXI9bGF5YS51dGlscy5IYW5kbGVyLExheWFHTD1sYXlhLmxheWFnbC5MYXlhR0wsUmVjdGFuZ2xlPWxheWEubWF0aHMuUmVjdGFuZ2xlLFJlbmRlcj1sYXlhLnJlbmRlcnMuUmVuZGVyO1xyXG5cdHZhciBTcHJpdGU9bGF5YS5kaXNwbGF5LlNwcml0ZSxTdGFnZT1sYXlhLmRpc3BsYXkuU3RhZ2UsVGV4dHVyZT1sYXlhLnJlc291cmNlLlRleHR1cmUsVXRpbHM9bGF5YS51dGlscy5VdGlscztcclxuXHR2YXIgV2ViR0w9bGF5YS53ZWJnbC5XZWJHTCxXZWJHTENvbnRleHQ9bGF5YS53ZWJnbC5XZWJHTENvbnRleHQ7XHJcbi8qKlxyXG4q5L2/55So5YmN5Y+v55SoPGNvZGU+c3VwcG9ydGVkPC9jb2RlPuafpeeci+a1j+iniOWZqOaUr+aMgeOAglxyXG4qL1xyXG4vL2NsYXNzIGxheWEuZGV2aWNlLmdlb2xvY2F0aW9uLkdlb2xvY2F0aW9uXHJcbnZhciBHZW9sb2NhdGlvbj0oZnVuY3Rpb24oKXtcclxuXHRmdW5jdGlvbiBHZW9sb2NhdGlvbigpe31cclxuXHRfX2NsYXNzKEdlb2xvY2F0aW9uLCdsYXlhLmRldmljZS5nZW9sb2NhdGlvbi5HZW9sb2NhdGlvbicpO1xyXG5cdEdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbj1mdW5jdGlvbihvblN1Y2Nlc3Msb25FcnJvcil7XHJcblx0XHRHZW9sb2NhdGlvbi5uYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKGZ1bmN0aW9uKHBvcyl7XHJcblx0XHRcdEdlb2xvY2F0aW9uLnBvc2l0aW9uLnNldFBvc2l0aW9uKHBvcyk7XHJcblx0XHRcdG9uU3VjY2Vzcy5ydW5XaXRoKEdlb2xvY2F0aW9uLnBvc2l0aW9uKTtcclxuXHRcdH0sXHJcblx0XHRmdW5jdGlvbihlcnJvcil7XHJcblx0XHRcdG9uRXJyb3IucnVuV2l0aChlcnJvcik7XHJcblx0XHRcdH0se1xyXG5cdFx0XHRlbmFibGVIaWdoQWNjdXJhY3kgOmxheWEuZGV2aWNlLmdlb2xvY2F0aW9uLkdlb2xvY2F0aW9uLmVuYWJsZUhpZ2hBY2N1cmFjeSxcclxuXHRcdFx0dGltZW91dCA6bGF5YS5kZXZpY2UuZ2VvbG9jYXRpb24uR2VvbG9jYXRpb24udGltZW91dCxcclxuXHRcdFx0bWF4aW11bUFnZSA6bGF5YS5kZXZpY2UuZ2VvbG9jYXRpb24uR2VvbG9jYXRpb24ubWF4aW11bUFnZVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRHZW9sb2NhdGlvbi53YXRjaFBvc2l0aW9uPWZ1bmN0aW9uKG9uU3VjY2VzcyxvbkVycm9yKXtcclxuXHRcdHJldHVybiBHZW9sb2NhdGlvbi5uYXZpZ2F0b3IuZ2VvbG9jYXRpb24ud2F0Y2hQb3NpdGlvbihmdW5jdGlvbihwb3Mpe1xyXG5cdFx0XHRHZW9sb2NhdGlvbi5wb3NpdGlvbi5zZXRQb3NpdGlvbihwb3MpO1xyXG5cdFx0XHRvblN1Y2Nlc3MucnVuV2l0aChHZW9sb2NhdGlvbi5wb3NpdGlvbik7XHJcblx0XHR9LFxyXG5cdFx0ZnVuY3Rpb24oZXJyb3Ipe1xyXG5cdFx0XHRvbkVycm9yLnJ1bldpdGgoZXJyb3IpO1xyXG5cdFx0XHR9LHtcclxuXHRcdFx0ZW5hYmxlSGlnaEFjY3VyYWN5IDpHZW9sb2NhdGlvbi5lbmFibGVIaWdoQWNjdXJhY3ksXHJcblx0XHRcdHRpbWVvdXQgOkdlb2xvY2F0aW9uLnRpbWVvdXQsXHJcblx0XHRcdG1heGltdW1BZ2UgOkdlb2xvY2F0aW9uLm1heGltdW1BZ2VcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0R2VvbG9jYXRpb24uY2xlYXJXYXRjaD1mdW5jdGlvbihpZCl7XHJcblx0XHRHZW9sb2NhdGlvbi5uYXZpZ2F0b3IuZ2VvbG9jYXRpb24uY2xlYXJXYXRjaChpZCk7XHJcblx0fVxyXG5cclxuXHRHZW9sb2NhdGlvbi5QRVJNSVNTSU9OX0RFTklFRD0xO1xyXG5cdEdlb2xvY2F0aW9uLlBPU0lUSU9OX1VOQVZBSUxBQkxFPTI7XHJcblx0R2VvbG9jYXRpb24uVElNRU9VVD0zO1xyXG5cdEdlb2xvY2F0aW9uLmVuYWJsZUhpZ2hBY2N1cmFjeT1mYWxzZTtcclxuXHRHZW9sb2NhdGlvbi5tYXhpbXVtQWdlPTA7XHJcblx0X19zdGF0aWMoR2VvbG9jYXRpb24sXHJcblx0WyduYXZpZ2F0b3InLGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubmF2aWdhdG9yPUJyb3dzZXIud2luZG93Lm5hdmlnYXRvcjt9LCdwb3NpdGlvbicsZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5wb3NpdGlvbj1uZXcgR2VvbG9jYXRpb25JbmZvKCk7fSwnc3VwcG9ydGVkJyxmdW5jdGlvbigpe3JldHVybiB0aGlzLnN1cHBvcnRlZD0hIUdlb2xvY2F0aW9uLm5hdmlnYXRvci5nZW9sb2NhdGlvbjt9LCd0aW1lb3V0JyxmdW5jdGlvbigpe3JldHVybiB0aGlzLnRpbWVvdXQ9MUUxMDt9XHJcblx0XSk7XHJcblx0cmV0dXJuIEdlb2xvY2F0aW9uO1xyXG59KSgpXHJcblxyXG5cclxuLyoqXHJcbirliqDpgJ/luqZ4L3kveueahOWNleS9jeWdh+S4um0vc8Ky44CCXHJcbirlnKjnoazku7bvvIjpmYDonrrku6rvvInkuI3mlK/mjIHnmoTmg4XlhrXkuIvvvIxhbHBoYeOAgWJldGHlkoxnYW1tYeWAvOS4um51bGzjgIJcclxuKlxyXG4qQGF1dGhvciBTdXJ2aXZvclxyXG4qL1xyXG4vL2NsYXNzIGxheWEuZGV2aWNlLm1vdGlvbi5BY2NlbGVyYXRpb25JbmZvXHJcbnZhciBBY2NlbGVyYXRpb25JbmZvPShmdW5jdGlvbigpe1xyXG5cdGZ1bmN0aW9uIEFjY2VsZXJhdGlvbkluZm8oKXtcclxuXHRcdC8qKlxyXG5cdFx0KnjovbTkuIrnmoTliqDpgJ/luqblgLzjgIJcclxuXHRcdCovXHJcblx0XHR0aGlzLng9TmFOO1xyXG5cdFx0LyoqXHJcblx0XHQqeei9tOS4iueahOWKoOmAn+W6puWAvOOAglxyXG5cdFx0Ki9cclxuXHRcdHRoaXMueT1OYU47XHJcblx0XHQvKipcclxuXHRcdCp66L205LiK55qE5Yqg6YCf5bqm5YC844CCXHJcblx0XHQqL1xyXG5cdFx0dGhpcy56PU5hTjtcclxuXHR9XHJcblxyXG5cdF9fY2xhc3MoQWNjZWxlcmF0aW9uSW5mbywnbGF5YS5kZXZpY2UubW90aW9uLkFjY2VsZXJhdGlvbkluZm8nKTtcclxuXHRyZXR1cm4gQWNjZWxlcmF0aW9uSW5mbztcclxufSkoKVxyXG5cclxuXHJcbi8vY2xhc3MgbGF5YS5kZXZpY2UuZ2VvbG9jYXRpb24uR2VvbG9jYXRpb25JbmZvXHJcbnZhciBHZW9sb2NhdGlvbkluZm89KGZ1bmN0aW9uKCl7XHJcblx0ZnVuY3Rpb24gR2VvbG9jYXRpb25JbmZvKCl7XHJcblx0XHR0aGlzLnBvcz1udWxsO1xyXG5cdFx0dGhpcy5jb29yZHM9bnVsbDtcclxuXHR9XHJcblxyXG5cdF9fY2xhc3MoR2VvbG9jYXRpb25JbmZvLCdsYXlhLmRldmljZS5nZW9sb2NhdGlvbi5HZW9sb2NhdGlvbkluZm8nKTtcclxuXHR2YXIgX19wcm90bz1HZW9sb2NhdGlvbkluZm8ucHJvdG90eXBlO1xyXG5cdF9fcHJvdG8uc2V0UG9zaXRpb249ZnVuY3Rpb24ocG9zKXtcclxuXHRcdHRoaXMucG9zPXBvcztcclxuXHRcdHRoaXMuY29vcmRzPXBvcy5jb29yZHM7XHJcblx0fVxyXG5cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ2hlYWRpbmcnLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb29yZHMuaGVhZGluZztcclxuXHR9KTtcclxuXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCdsYXRpdHVkZScsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLmNvb3Jkcy5sYXRpdHVkZTtcclxuXHR9KTtcclxuXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCdhbHRpdHVkZUFjY3VyYWN5JyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29vcmRzLmFsdGl0dWRlQWNjdXJhY3k7XHJcblx0fSk7XHJcblxyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywnbG9uZ2l0dWRlJyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29vcmRzLmxvbmdpdHVkZTtcclxuXHR9KTtcclxuXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCdhbHRpdHVkZScsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLmNvb3Jkcy5hbHRpdHVkZTtcclxuXHR9KTtcclxuXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCdhY2N1cmFjeScsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLmNvb3Jkcy5hY2N1cmFjeTtcclxuXHR9KTtcclxuXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCdzcGVlZCcsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLmNvb3Jkcy5zcGVlZDtcclxuXHR9KTtcclxuXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCd0aW1lc3RhbXAnLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5wb3MudGltZXN0YW1wO1xyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gR2VvbG9jYXRpb25JbmZvO1xyXG59KSgpXHJcblxyXG5cclxuLyoqXHJcbipNZWRpYeeUqOS6juaNleaNieaRhOWDj+WktOWSjOm6puWFi+mjjuOAguWPr+S7peaNleaNieS7u+aEj+S5i+S4gO+8jOaIluiAheWQjOaXtuaNleaNieS4pOiAheOAgjxjb2RlPmdldENhbWVyYTwvY29kZT7liY3lj6/ku6Xkvb/nlKg8Y29kZT5zdXBwb3J0ZWQoKTwvY29kZT7mo4Dmn6XlvZPliY3mtY/op4jlmajmmK/lkKbmlK/mjIHjgIJcclxuKjxiPk5PVEU6PC9iPlxyXG4qPHA+55uu5YmNTWVkaWHlnKjnp7vliqjlubPlj7Dlj6rmlK/mjIFBbmRyb2lk77yM5LiN5pSv5oyBSU9T44CC5Y+q5Y+v5ZyoRmlyZUZveOWujOaVtOWcsOS9v+eUqO+8jENocm9tZea1i+ivleaXtuaXoOazleaNleaNieinhumikeOAgjwvcD5cclxuKi9cclxuLy9jbGFzcyBsYXlhLmRldmljZS5tZWRpYS5NZWRpYVxyXG52YXIgTWVkaWE9KGZ1bmN0aW9uKCl7XHJcblx0ZnVuY3Rpb24gTWVkaWEoKXt9XHJcblx0X19jbGFzcyhNZWRpYSwnbGF5YS5kZXZpY2UubWVkaWEuTWVkaWEnKTtcclxuXHRNZWRpYS5zdXBwb3J0ZWQ9ZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiAhIUJyb3dzZXIud2luZG93Lm5hdmlnYXRvci5nZXRVc2VyTWVkaWE7XHJcblx0fVxyXG5cclxuXHRNZWRpYS5nZXRNZWRpYT1mdW5jdGlvbihvcHRpb25zLG9uU3VjY2VzcyxvbkVycm9yKXtcclxuXHRcdGlmIChCcm93c2VyLndpbmRvdy5uYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKXtcclxuXHRcdFx0QnJvd3Nlci53aW5kb3cubmF2aWdhdG9yLmdldFVzZXJNZWRpYShvcHRpb25zLGZ1bmN0aW9uKHN0cmVhbSl7XHJcblx0XHRcdFx0b25TdWNjZXNzLnJ1bldpdGgoQnJvd3Nlci53aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChzdHJlYW0pKTtcclxuXHRcdFx0XHR9LGZ1bmN0aW9uKGVycil7XHJcblx0XHRcdFx0b25FcnJvci5ydW5XaXRoKGVycik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0TWVkaWEuX19pbml0JD1mdW5jdGlvbigpe1xyXG5cdFx0LypfX0pTX18gKi9uYXZpZ2F0b3IuZ2V0VXNlck1lZGlhPW5hdmlnYXRvci5nZXRVc2VyTWVkaWEgfHwgbmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYSB8fCBuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhOztcclxuXHR9XHJcblxyXG5cdHJldHVybiBNZWRpYTtcclxufSkoKVxyXG5cclxuXHJcbi8qKlxyXG4q5L+d5a2Y5peL6L2s5L+h5oGv55qE57G744CC6K+35Yu/5L+u5pS55pys57G755qE5bGe5oCn44CCXHJcbipAYXV0aG9yIFN1cnZpdm9yXHJcbiovXHJcbi8vY2xhc3MgbGF5YS5kZXZpY2UubW90aW9uLlJvdGF0aW9uSW5mb1xyXG52YXIgUm90YXRpb25JbmZvPShmdW5jdGlvbigpe1xyXG5cdGZ1bmN0aW9uIFJvdGF0aW9uSW5mbygpe1xyXG5cdFx0LyoqXHJcblx0XHQqPHA+XHJcblx0XHQq5oyH56S66K6+5aSH5piv5ZCm5Y+v5Lul5o+Q5L6b57ud5a+55pa55L2N5pWw5o2u77yI5oyH5ZCR5Zyw55CD5Z2Q5qCH57O777yJ77yM5oiW6ICF6K6+5aSH5Yaz5a6a55qE5Lu75oSP5Z2Q5qCH57O744CCXHJcblx0XHQq5YWz5LqO5Z2Q5qCH57O75Y+C6KeBPGk+aHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvR3VpZGUvRXZlbnRzL09yaWVudGF0aW9uX2FuZF9tb3Rpb25fZGF0YV9leHBsYWluZWQ8L2k+44CCXHJcblx0XHQqPC9wPlxyXG5cdFx0KumcgOimgeazqOaEj+eahOaYr++8jElPU+eOr+Wig+S4i++8jOivpeWAvOWni+e7iOS4umZhbHNl44CC5Y2z5L2/5aaC5q2k77yM5L2g5L6d5pen5Y+v5Lul5LuOPGNvZGU+YWxwaGE8L2NvZGU+5Lit5Y+W5b6X5q2j56Gu55qE5YC844CCXHJcblx0XHQqL1xyXG5cdFx0dGhpcy5hYnNvbHV0ZT1mYWxzZTtcclxuXHRcdC8qKlxyXG5cdFx0KlrovbTml4vovazop5LluqbvvIzlhbblgLzojIPlm7Tku44w6IezMzYw44CCXHJcblx0XHQq6IulPGNvZGU+YWJzb2x1dGU8L2NvZGU+5Li6dHJ1ZeaIluiAheWcqElPU+S4re+8jGFscGhh5YC85piv5LuO5YyX5pa55Yiw5b2T5YmN6K6+5aSH5pa55ZCR55qE6KeS5bqm5YC844CCXHJcblx0XHQqL1xyXG5cdFx0dGhpcy5hbHBoYT1OYU47XHJcblx0XHQvKipcclxuXHRcdCpY6L205peL6L2s6KeS5bqmLOWFtuWAvOiMg+WbtOS7ji0xODDoh7MxODDjgILku6Pooajorr7lpIfku47liY3oh7PlkI7nmoTov5DliqjjgIJcclxuXHRcdCovXHJcblx0XHR0aGlzLmJldGE9TmFOO1xyXG5cdFx0LyoqXHJcblx0XHQqWei9tOaXi+i9rOinkuW6pu+8jOWFtuWAvOiMg+WbtOS7ji05MOiHszkw44CC5Luj6KGo6K6+5aSH5LuO5bem6Iez5Y+z55qE6L+Q5Yqo44CCXHJcblx0XHQqL1xyXG5cdFx0dGhpcy5nYW1tYT1OYU47XHJcblx0XHQvKipcclxuXHRcdCrnvZfnm5jmlbDmja7nmoTnsr7noa7luqbvvIjop5LluqbvvInjgILku4VJT1Plj6/nlKjjgIJcclxuXHRcdCovXHJcblx0XHR0aGlzLmNvbXBhc3NBY2N1cmFjeT1OYU47XHJcblx0fVxyXG5cclxuXHRfX2NsYXNzKFJvdGF0aW9uSW5mbywnbGF5YS5kZXZpY2UubW90aW9uLlJvdGF0aW9uSW5mbycpO1xyXG5cdHJldHVybiBSb3RhdGlvbkluZm87XHJcbn0pKClcclxuXHJcblxyXG4vKipcclxuKkFjY2VsZXJhdG9yLmluc3RhbmNl6I635Y+W5ZSv5LiA55qEQWNjZWxlcmF0b3LlvJXnlKjvvIzor7fli7/osIPnlKjmnoTpgKDlh73mlbDjgIJcclxuKlxyXG4qPHA+XHJcbipsaXN0ZW4oKeeahOWbnuiwg+WkhOeQhuWZqOaOpeWPl+Wbm+S4quWPguaVsO+8mlxyXG4qPG9sPlxyXG4qPGxpPjxiPmFjY2VsZXJhdGlvbjwvYj466KGo56S655So5oi357uZ5LqI6K6+5aSH55qE5Yqg6YCf5bqm44CCPC9saT5cclxuKjxsaT48Yj5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5PC9iPjrorr7lpIflj5fliLDnmoTmgLvliqDpgJ/luqbvvIjljIXlkKvph43lipvvvInjgII8L2xpPlxyXG4qPGxpPjxiPnJvdGF0aW9uUmF0ZTwvYj466K6+5aSH55qE6Ieq6L2s6YCf546H44CCPC9saT5cclxuKjxsaT48Yj5pbnRlcnZhbDwvYj465Yqg6YCf5bqm6I635Y+W55qE5pe26Ze06Ze06ZqU77yI5q+r56eS77yJ44CCPC9saT5cclxuKjwvb2w+XHJcbio8L3A+XHJcbio8cD5cclxuKjxiPk5PVEU8L2I+PGJyLz5cclxuKuWmgu+8jHJvdGF0aW9uUmF0ZeeahGFscGhh5ZyoYXBwbGXlkoxtb3rmlofmoaPkuK3pg73mmK966L205peL6L2s6KeS5bqm77yM5L2G5piv5a6e5rWL5piveOi9tOaXi+i9rOinkuW6puOAguS4uuS6huS9v+WQhOWxnuaAp+ihqOekuueahOWAvOS4juaWh+aho+aJgOi/sOebuOWQjO+8jOWunumZheWAvOS4juWFtuS7luWxnuaAp+i/m+ihjOS6huWvueiwg+OAglxyXG4q5YW25Lit77yaXHJcbio8dWw+XHJcbio8bGk+YWxwaGHkvb/nlKhnYW1tYeWAvOOAgjwvbGk+XHJcbio8bGk+YmV0YeS9v+eUqGFscGhh5YC844CCPC9saT5cclxuKjxsaT5nYW1tYeS9v+eUqGJldGHjgII8L2xpPlxyXG4qPC91bD5cclxuKuebruWJjeWtsOaYr+WtsOmdnuWwmuacquWPr+efpe+8jOS7peatpOS4uuazqOOAglxyXG4qPC9wPlxyXG4qL1xyXG4vL2NsYXNzIGxheWEuZGV2aWNlLm1vdGlvbi5BY2NlbGVyYXRvciBleHRlbmRzIGxheWEuZXZlbnRzLkV2ZW50RGlzcGF0Y2hlclxyXG52YXIgQWNjZWxlcmF0b3I9KGZ1bmN0aW9uKF9zdXBlcil7XHJcblx0ZnVuY3Rpb24gQWNjZWxlcmF0b3Ioc2luZ2xldG9uKXtcclxuXHRcdEFjY2VsZXJhdG9yLl9fc3VwZXIuY2FsbCh0aGlzKTtcclxuXHRcdC8qX19KU19fICovdGhpcy5vbkRldmljZU9yaWVudGF0aW9uQ2hhbmdlPXRoaXMub25EZXZpY2VPcmllbnRhdGlvbkNoYW5nZS5iaW5kKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0X19jbGFzcyhBY2NlbGVyYXRvciwnbGF5YS5kZXZpY2UubW90aW9uLkFjY2VsZXJhdG9yJyxfc3VwZXIpO1xyXG5cdHZhciBfX3Byb3RvPUFjY2VsZXJhdG9yLnByb3RvdHlwZTtcclxuXHQvKipcclxuXHQq5L6m5ZCs5Yqg6YCf5Zmo6L+Q5Yqo44CCXHJcblx0KkBwYXJhbSBvYnNlcnZlciDlm57osIPlh73mlbDmjqXlj5c05Liq5Y+C5pWw77yM6KeB57G76K+05piO44CCXHJcblx0Ki9cclxuXHRfX3Byb3RvLm9uPWZ1bmN0aW9uKHR5cGUsY2FsbGVyLGxpc3RlbmVyLGFyZ3Mpe1xyXG5cdFx0X3N1cGVyLnByb3RvdHlwZS5vbi5jYWxsKHRoaXMsdHlwZSxjYWxsZXIsbGlzdGVuZXIsYXJncyk7XHJcblx0XHRCcm93c2VyLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2Vtb3Rpb24nLHRoaXMub25EZXZpY2VPcmllbnRhdGlvbkNoYW5nZSk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCrlj5bmtojkvqblkKzliqDpgJ/lmajjgIJcclxuXHQqQHBhcmFtIGhhbmRsZSDkvqblkKzliqDpgJ/lmajmiYDnlKjlpITnkIblmajjgIJcclxuXHQqL1xyXG5cdF9fcHJvdG8ub2ZmPWZ1bmN0aW9uKHR5cGUsY2FsbGVyLGxpc3RlbmVyLG9uY2VPbmx5KXtcclxuXHRcdChvbmNlT25seT09PXZvaWQgMCkmJiAob25jZU9ubHk9ZmFsc2UpO1xyXG5cdFx0aWYgKCF0aGlzLmhhc0xpc3RlbmVyKHR5cGUpKVxyXG5cdFx0XHRCcm93c2VyLndpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdkZXZpY2Vtb3Rpb24nLHRoaXMub25EZXZpY2VPcmllbnRhdGlvbkNoYW5nZSlcclxuXHRcdHJldHVybiBfc3VwZXIucHJvdG90eXBlLm9mZi5jYWxsKHRoaXMsdHlwZSxjYWxsZXIsbGlzdGVuZXIsb25jZU9ubHkpO1xyXG5cdH1cclxuXHJcblx0X19wcm90by5vbkRldmljZU9yaWVudGF0aW9uQ2hhbmdlPWZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIGludGVydmFsPWUuaW50ZXJ2YWw7XHJcblx0XHRBY2NlbGVyYXRvci5hY2NlbGVyYXRpb24ueD1lLmFjY2VsZXJhdGlvbi54O1xyXG5cdFx0QWNjZWxlcmF0b3IuYWNjZWxlcmF0aW9uLnk9ZS5hY2NlbGVyYXRpb24ueTtcclxuXHRcdEFjY2VsZXJhdG9yLmFjY2VsZXJhdGlvbi56PWUuYWNjZWxlcmF0aW9uLno7XHJcblx0XHRBY2NlbGVyYXRvci5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lng9ZS5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lng7XHJcblx0XHRBY2NlbGVyYXRvci5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lnk9ZS5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lnk7XHJcblx0XHRBY2NlbGVyYXRvci5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lno9ZS5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lno7XHJcblx0XHRBY2NlbGVyYXRvci5yb3RhdGlvblJhdGUuYWxwaGE9ZS5yb3RhdGlvblJhdGUuZ2FtbWEgKi0xO1xyXG5cdFx0QWNjZWxlcmF0b3Iucm90YXRpb25SYXRlLmJldGE9ZS5yb3RhdGlvblJhdGUuYWxwaGEgKi0xO1xyXG5cdFx0QWNjZWxlcmF0b3Iucm90YXRpb25SYXRlLmdhbW1hPWUucm90YXRpb25SYXRlLmJldGE7XHJcblx0XHRpZiAoQnJvd3Nlci5vbkFuZHJvaWQpe1xyXG5cdFx0XHRpZiAoQWNjZWxlcmF0b3Iub25DaHJvbWUpe1xyXG5cdFx0XHRcdEFjY2VsZXJhdG9yLnJvdGF0aW9uUmF0ZS5hbHBoYSAqPTE4MCAvIE1hdGguUEk7XHJcblx0XHRcdFx0QWNjZWxlcmF0b3Iucm90YXRpb25SYXRlLmJldGEgKj0xODAgLyBNYXRoLlBJO1xyXG5cdFx0XHRcdEFjY2VsZXJhdG9yLnJvdGF0aW9uUmF0ZS5nYW1tYSAqPTE4MCAvIE1hdGguUEk7XHJcblx0XHRcdH1cclxuXHRcdFx0QWNjZWxlcmF0b3IuYWNjZWxlcmF0aW9uLnggKj0tMTtcclxuXHRcdFx0QWNjZWxlcmF0b3IuYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS54ICo9LTE7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChCcm93c2VyLm9uSU9TKXtcclxuXHRcdFx0QWNjZWxlcmF0b3IuYWNjZWxlcmF0aW9uLnkgKj0tMTtcclxuXHRcdFx0QWNjZWxlcmF0b3IuYWNjZWxlcmF0aW9uLnogKj0tMTtcclxuXHRcdFx0QWNjZWxlcmF0b3IuYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS55ICo9LTE7XHJcblx0XHRcdEFjY2VsZXJhdG9yLmFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkueiAqPS0xO1xyXG5cdFx0XHRpbnRlcnZhbCAqPTEwMDA7XHJcblx0XHR9XHJcblx0XHR0aGlzLmV2ZW50KC8qbGF5YS5ldmVudHMuRXZlbnQuQ0hBTkdFKi9cImNoYW5nZVwiLFtBY2NlbGVyYXRvci5hY2NlbGVyYXRpb24sQWNjZWxlcmF0b3IuYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eSxBY2NlbGVyYXRvci5yb3RhdGlvblJhdGUsaW50ZXJ2YWxdKTtcclxuXHR9XHJcblxyXG5cdF9fZ2V0c2V0KDEsQWNjZWxlcmF0b3IsJ2luc3RhbmNlJyxmdW5jdGlvbigpe0FjY2VsZXJhdG9yLl9pbnN0YW5jZT1BY2NlbGVyYXRvci5faW5zdGFuY2V8fCBuZXcgQWNjZWxlcmF0b3IoMClcclxuXHRcdHJldHVybiBBY2NlbGVyYXRvci5faW5zdGFuY2U7XHJcblx0fSxsYXlhLmV2ZW50cy5FdmVudERpc3BhdGNoZXIuXyRTRVRfaW5zdGFuY2UpO1xyXG5cclxuXHRBY2NlbGVyYXRvci5nZXRUcmFuc2Zvcm1lZEFjY2VsZXJhdGlvbj1mdW5jdGlvbihhY2NlbGVyYXRpb24pe0FjY2VsZXJhdG9yLnRyYW5zZm9ybWVkQWNjZWxlcmF0aW9uPUFjY2VsZXJhdG9yLnRyYW5zZm9ybWVkQWNjZWxlcmF0aW9ufHwgbmV3IEFjY2VsZXJhdGlvbkluZm8oKTtcclxuXHRcdEFjY2VsZXJhdG9yLnRyYW5zZm9ybWVkQWNjZWxlcmF0aW9uLno9YWNjZWxlcmF0aW9uLno7XHJcblx0XHRpZiAoQnJvd3Nlci53aW5kb3cub3JpZW50YXRpb249PTkwKXtcclxuXHRcdFx0QWNjZWxlcmF0b3IudHJhbnNmb3JtZWRBY2NlbGVyYXRpb24ueD1hY2NlbGVyYXRpb24ueTtcclxuXHRcdFx0QWNjZWxlcmF0b3IudHJhbnNmb3JtZWRBY2NlbGVyYXRpb24ueT0tYWNjZWxlcmF0aW9uLng7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChCcm93c2VyLndpbmRvdy5vcmllbnRhdGlvbj09LTkwKXtcclxuXHRcdFx0QWNjZWxlcmF0b3IudHJhbnNmb3JtZWRBY2NlbGVyYXRpb24ueD0tYWNjZWxlcmF0aW9uLnk7XHJcblx0XHRcdEFjY2VsZXJhdG9yLnRyYW5zZm9ybWVkQWNjZWxlcmF0aW9uLnk9YWNjZWxlcmF0aW9uLng7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICghQnJvd3Nlci53aW5kb3cub3JpZW50YXRpb24pe1xyXG5cdFx0XHRBY2NlbGVyYXRvci50cmFuc2Zvcm1lZEFjY2VsZXJhdGlvbi54PWFjY2VsZXJhdGlvbi54O1xyXG5cdFx0XHRBY2NlbGVyYXRvci50cmFuc2Zvcm1lZEFjY2VsZXJhdGlvbi55PWFjY2VsZXJhdGlvbi55O1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoQnJvd3Nlci53aW5kb3cub3JpZW50YXRpb249PTE4MCl7XHJcblx0XHRcdEFjY2VsZXJhdG9yLnRyYW5zZm9ybWVkQWNjZWxlcmF0aW9uLng9LWFjY2VsZXJhdGlvbi54O1xyXG5cdFx0XHRBY2NlbGVyYXRvci50cmFuc2Zvcm1lZEFjY2VsZXJhdGlvbi55PS1hY2NlbGVyYXRpb24ueTtcclxuXHRcdH07XHJcblx0XHR2YXIgdHg9TmFOO1xyXG5cdFx0aWYgKExheWEuc3RhZ2UuY2FudmFzRGVncmVlPT0tOTApe1xyXG5cdFx0XHR0eD1BY2NlbGVyYXRvci50cmFuc2Zvcm1lZEFjY2VsZXJhdGlvbi54O1xyXG5cdFx0XHRBY2NlbGVyYXRvci50cmFuc2Zvcm1lZEFjY2VsZXJhdGlvbi54PS1BY2NlbGVyYXRvci50cmFuc2Zvcm1lZEFjY2VsZXJhdGlvbi55O1xyXG5cdFx0XHRBY2NlbGVyYXRvci50cmFuc2Zvcm1lZEFjY2VsZXJhdGlvbi55PXR4O1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoTGF5YS5zdGFnZS5jYW52YXNEZWdyZWU9PTkwKXtcclxuXHRcdFx0dHg9QWNjZWxlcmF0b3IudHJhbnNmb3JtZWRBY2NlbGVyYXRpb24ueDtcclxuXHRcdFx0QWNjZWxlcmF0b3IudHJhbnNmb3JtZWRBY2NlbGVyYXRpb24ueD1BY2NlbGVyYXRvci50cmFuc2Zvcm1lZEFjY2VsZXJhdGlvbi55O1xyXG5cdFx0XHRBY2NlbGVyYXRvci50cmFuc2Zvcm1lZEFjY2VsZXJhdGlvbi55PS10eDtcclxuXHRcdH1cclxuXHRcdHJldHVybiBBY2NlbGVyYXRvci50cmFuc2Zvcm1lZEFjY2VsZXJhdGlvbjtcclxuXHR9XHJcblxyXG5cdEFjY2VsZXJhdG9yLl9pbnN0YW5jZT1udWxsO1xyXG5cdEFjY2VsZXJhdG9yLnRyYW5zZm9ybWVkQWNjZWxlcmF0aW9uPW51bGw7XHJcblx0X19zdGF0aWMoQWNjZWxlcmF0b3IsXHJcblx0WydhY2NlbGVyYXRpb24nLGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuYWNjZWxlcmF0aW9uPW5ldyBBY2NlbGVyYXRpb25JbmZvKCk7fSwnYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eScsZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5PW5ldyBBY2NlbGVyYXRpb25JbmZvKCk7fSwncm90YXRpb25SYXRlJyxmdW5jdGlvbigpe3JldHVybiB0aGlzLnJvdGF0aW9uUmF0ZT1uZXcgUm90YXRpb25JbmZvKCk7fSwnb25DaHJvbWUnLGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMub25DaHJvbWU9KEJyb3dzZXIudXNlckFnZW50LmluZGV4T2YoXCJDaHJvbWVcIik+LTEpO31cclxuXHRdKTtcclxuXHRyZXR1cm4gQWNjZWxlcmF0b3I7XHJcbn0pKEV2ZW50RGlzcGF0Y2hlcilcclxuXHJcblxyXG4vKipcclxuKuS9v+eUqEd5cm9zY29wZS5pbnN0YW5jZeiOt+WPluWUr+S4gOeahEd5cm9zY29wZeW8leeUqO+8jOivt+WLv+iwg+eUqOaehOmAoOWHveaVsOOAglxyXG4qXHJcbio8cD5cclxuKmxpc3Rlbigp55qE5Zue6LCD5aSE55CG5Zmo5o6l5Y+X5Lik5Liq5Y+C5pWw77yaXHJcbio8Y29kZT5mdW5jdGlvbiBvbk9yaWVudGF0aW9uQ2hhbmdlKGFic29sdXRlOkJvb2xlYW4saW5mbzpSb3RhdGlvbkluZm8pOnZvaWQ8L2NvZGU+XHJcbio8b2w+XHJcbio8bGk+PGI+YWJzb2x1dGU8L2I+OuaMh+ekuuiuvuWkh+aYr+WQpuWPr+S7peaPkOS+m+e7neWvueaWueS9jeaVsOaNru+8iOaMh+WQkeWcsOeQg+WdkOagh+ezu++8ie+8jOaIluiAheiuvuWkh+WGs+WumueahOS7u+aEj+WdkOagh+ezu+OAguWFs+S6juWdkOagh+ezu+WPguingTxpPmh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0d1aWRlL0V2ZW50cy9PcmllbnRhdGlvbl9hbmRfbW90aW9uX2RhdGFfZXhwbGFpbmVkPC9pPuOAgjwvbGk+XHJcbio8bGk+PGI+aW5mbzwvYj46PGNvZGU+Um90YXRpb25JbmZvPC9jb2RlPuexu+Wei+WPguaVsO+8jOS/neWtmOiuvuWkh+eahOaXi+i9rOWAvOOAgjwvbGk+XHJcbio8L29sPlxyXG4qPC9wPlxyXG4qXHJcbio8cD5cclxuKua1j+iniOWZqOWFvOWuueaAp+WPguinge+8mjxpPmh0dHA6Ly9jYW5pdXNlLmNvbS8jc2VhcmNoPWRldmljZW9yaWVudGF0aW9uPC9pPlxyXG4qPC9wPlxyXG4qL1xyXG4vL2NsYXNzIGxheWEuZGV2aWNlLm1vdGlvbi5HeXJvc2NvcGUgZXh0ZW5kcyBsYXlhLmV2ZW50cy5FdmVudERpc3BhdGNoZXJcclxudmFyIEd5cm9zY29wZT0oZnVuY3Rpb24oX3N1cGVyKXtcclxuXHRmdW5jdGlvbiBHeXJvc2NvcGUoc2luZ2xldG9uKXtcclxuXHRcdEd5cm9zY29wZS5fX3N1cGVyLmNhbGwodGhpcyk7XHJcblx0XHQvKl9fSlNfXyAqL3RoaXMub25EZXZpY2VPcmllbnRhdGlvbkNoYW5nZT10aGlzLm9uRGV2aWNlT3JpZW50YXRpb25DaGFuZ2UuYmluZCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdF9fY2xhc3MoR3lyb3Njb3BlLCdsYXlhLmRldmljZS5tb3Rpb24uR3lyb3Njb3BlJyxfc3VwZXIpO1xyXG5cdHZhciBfX3Byb3RvPUd5cm9zY29wZS5wcm90b3R5cGU7XHJcblx0LyoqXHJcblx0KuebkeinhumZgOieuuS7qui/kOWKqOOAglxyXG5cdCpAcGFyYW0gb2JzZXJ2ZXIg5Zue6LCD5Ye95pWw5o6l5Y+X5LiA5LiqQm9vbGVhbuexu+Wei+eahDxjb2RlPmFic29sdXRlPC9jb2RlPuWSjDxjb2RlPkd5cm9zY29wZUluZm88L2NvZGU+57G75Z6L5Y+C5pWw44CCXHJcblx0Ki9cclxuXHRfX3Byb3RvLm9uPWZ1bmN0aW9uKHR5cGUsY2FsbGVyLGxpc3RlbmVyLGFyZ3Mpe1xyXG5cdFx0X3N1cGVyLnByb3RvdHlwZS5vbi5jYWxsKHRoaXMsdHlwZSxjYWxsZXIsbGlzdGVuZXIsYXJncyk7XHJcblx0XHRCcm93c2VyLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VvcmllbnRhdGlvbicsdGhpcy5vbkRldmljZU9yaWVudGF0aW9uQ2hhbmdlKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0KuWPlua2iOaMh+WumuWkhOeQhuWZqOWvuemZgOieuuS7queahOebkeinhuOAglxyXG5cdCpAcGFyYW0gb2JzZXJ2ZXJcclxuXHQqL1xyXG5cdF9fcHJvdG8ub2ZmPWZ1bmN0aW9uKHR5cGUsY2FsbGVyLGxpc3RlbmVyLG9uY2VPbmx5KXtcclxuXHRcdChvbmNlT25seT09PXZvaWQgMCkmJiAob25jZU9ubHk9ZmFsc2UpO1xyXG5cdFx0aWYgKCF0aGlzLmhhc0xpc3RlbmVyKHR5cGUpKVxyXG5cdFx0XHRCcm93c2VyLndpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdkZXZpY2VvcmllbnRhdGlvbicsdGhpcy5vbkRldmljZU9yaWVudGF0aW9uQ2hhbmdlKTtcclxuXHRcdHJldHVybiBfc3VwZXIucHJvdG90eXBlLm9mZi5jYWxsKHRoaXMsdHlwZSxjYWxsZXIsbGlzdGVuZXIsb25jZU9ubHkpO1xyXG5cdH1cclxuXHJcblx0X19wcm90by5vbkRldmljZU9yaWVudGF0aW9uQ2hhbmdlPWZ1bmN0aW9uKGUpe1xyXG5cdFx0R3lyb3Njb3BlLmluZm8uYWxwaGE9ZS5hbHBoYTtcclxuXHRcdEd5cm9zY29wZS5pbmZvLmJldGE9ZS5iZXRhO1xyXG5cdFx0R3lyb3Njb3BlLmluZm8uZ2FtbWE9ZS5nYW1tYTtcclxuXHRcdGlmIChlLndlYmtpdENvbXBhc3NIZWFkaW5nKXtcclxuXHRcdFx0R3lyb3Njb3BlLmluZm8uYWxwaGE9ZS53ZWJraXRDb21wYXNzSGVhZGluZyAqLTE7XHJcblx0XHRcdEd5cm9zY29wZS5pbmZvLmNvbXBhc3NBY2N1cmFjeT1lLndlYmtpdENvbXBhc3NBY2N1cmFjeTtcclxuXHRcdH1cclxuXHRcdHRoaXMuZXZlbnQoLypsYXlhLmV2ZW50cy5FdmVudC5DSEFOR0UqL1wiY2hhbmdlXCIsW2UuYWJzb2x1dGUsR3lyb3Njb3BlLmluZm9dKTtcclxuXHR9XHJcblxyXG5cdF9fZ2V0c2V0KDEsR3lyb3Njb3BlLCdpbnN0YW5jZScsZnVuY3Rpb24oKXtHeXJvc2NvcGUuX2luc3RhbmNlPUd5cm9zY29wZS5faW5zdGFuY2V8fCBuZXcgR3lyb3Njb3BlKDApO1xyXG5cdFx0cmV0dXJuIEd5cm9zY29wZS5faW5zdGFuY2U7XHJcblx0fSxsYXlhLmV2ZW50cy5FdmVudERpc3BhdGNoZXIuXyRTRVRfaW5zdGFuY2UpO1xyXG5cclxuXHRHeXJvc2NvcGUuX2luc3RhbmNlPW51bGw7XHJcblx0X19zdGF0aWMoR3lyb3Njb3BlLFxyXG5cdFsnaW5mbycsZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5pbmZvPW5ldyBSb3RhdGlvbkluZm8oKTt9XHJcblx0XSk7XHJcblx0cmV0dXJuIEd5cm9zY29wZTtcclxufSkoRXZlbnREaXNwYXRjaGVyKVxyXG5cclxuXHJcbi8qKlxyXG4qU2hha2Xlj6rog73lnKjmlK/mjIHmraTmk43kvZznmoTorr7lpIfkuIrmnInmlYjjgIJcclxuKlxyXG4qQGF1dGhvciBTdXJ2aXZvclxyXG4qL1xyXG4vL2NsYXNzIGxheWEuZGV2aWNlLlNoYWtlIGV4dGVuZHMgbGF5YS5ldmVudHMuRXZlbnREaXNwYXRjaGVyXHJcbnZhciBTaGFrZT0oZnVuY3Rpb24oX3N1cGVyKXtcclxuXHRmdW5jdGlvbiBTaGFrZSgpe1xyXG5cdFx0dGhpcy50aHJvdXNob2xkPTA7XHJcblx0XHR0aGlzLnNoYWtlSW50ZXJ2YWw9MDtcclxuXHRcdHRoaXMuY2FsbGJhY2s9bnVsbDtcclxuXHRcdHRoaXMubGFzdFg9TmFOO1xyXG5cdFx0dGhpcy5sYXN0WT1OYU47XHJcblx0XHR0aGlzLmxhc3RaPU5hTjtcclxuXHRcdHRoaXMubGFzdE1pbGxTZWNvbmQ9TmFOO1xyXG5cdFx0U2hha2UuX19zdXBlci5jYWxsKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0X19jbGFzcyhTaGFrZSwnbGF5YS5kZXZpY2UuU2hha2UnLF9zdXBlcik7XHJcblx0dmFyIF9fcHJvdG89U2hha2UucHJvdG90eXBlO1xyXG5cdC8qKlxyXG5cdCrlvIDlp4vlk43lupTorr7lpIfmkYfmmYPjgIJcclxuXHQqQHBhcmFtIHRocm91c2hvbGQg5ZON5bqU55qE556s5pe26YCf5bqm6ZiI5YC877yM6L275bqm5pGH5pmD55qE5YC857qm5ZyoNX4xMOmXtOOAglxyXG5cdCpAcGFyYW0gdGltZW91dCDorr7lpIfmkYfmmYPnmoTlk43lupTpl7TpmpTml7bpl7TjgIJcclxuXHQqQHBhcmFtIGNhbGxiYWNrIOWcqOiuvuWkh+aRh+aZg+inpuWPkeaXtuiwg+eUqOeahOWkhOeQhuWZqOOAglxyXG5cdCovXHJcblx0X19wcm90by5zdGFydD1mdW5jdGlvbih0aHJvdXNob2xkLGludGVydmFsKXtcclxuXHRcdHRoaXMudGhyb3VzaG9sZD10aHJvdXNob2xkO1xyXG5cdFx0dGhpcy5zaGFrZUludGVydmFsPWludGVydmFsO1xyXG5cdFx0dGhpcy5sYXN0WD10aGlzLmxhc3RZPXRoaXMubGFzdFo9TmFOO1xyXG5cdFx0QWNjZWxlcmF0b3IuaW5zdGFuY2Uub24oLypsYXlhLmV2ZW50cy5FdmVudC5DSEFOR0UqL1wiY2hhbmdlXCIsdGhpcyx0aGlzLm9uU2hha2UpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0KuWBnOatouWTjeW6lOiuvuWkh+aRh+aZg+OAglxyXG5cdCovXHJcblx0X19wcm90by5zdG9wPWZ1bmN0aW9uKCl7XHJcblx0XHRBY2NlbGVyYXRvci5pbnN0YW5jZS5vZmYoLypsYXlhLmV2ZW50cy5FdmVudC5DSEFOR0UqL1wiY2hhbmdlXCIsdGhpcyx0aGlzLm9uU2hha2UpO1xyXG5cdH1cclxuXHJcblx0X19wcm90by5vblNoYWtlPWZ1bmN0aW9uKGFjY2VsZXJhdGlvbixhY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5LHJvdGF0aW9uUmF0ZSxpbnRlcnZhbCl7XHJcblx0XHRpZihpc05hTih0aGlzLmxhc3RYKSl7XHJcblx0XHRcdHRoaXMubGFzdFg9YWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS54O1xyXG5cdFx0XHR0aGlzLmxhc3RZPWFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkueTtcclxuXHRcdFx0dGhpcy5sYXN0Wj1hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lno7XHJcblx0XHRcdHRoaXMubGFzdE1pbGxTZWNvbmQ9QnJvd3Nlci5ub3coKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fTtcclxuXHRcdHZhciBkZWx0YVg9TWF0aC5hYnModGhpcy5sYXN0WC1hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5LngpO1xyXG5cdFx0dmFyIGRlbHRhWT1NYXRoLmFicyh0aGlzLmxhc3RZLWFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkueSk7XHJcblx0XHR2YXIgZGVsdGFaPU1hdGguYWJzKHRoaXMubGFzdFotYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS56KTtcclxuXHRcdGlmKHRoaXMuaXNTaGFrZWQoZGVsdGFYLGRlbHRhWSxkZWx0YVopKXtcclxuXHRcdFx0dmFyIGRlbHRhTWlsbFNlY29uZD1Ccm93c2VyLm5vdygpLXRoaXMubGFzdE1pbGxTZWNvbmQ7XHJcblx0XHRcdGlmIChkZWx0YU1pbGxTZWNvbmQgPiB0aGlzLnNoYWtlSW50ZXJ2YWwpe1xyXG5cdFx0XHRcdHRoaXMuZXZlbnQoLypsYXlhLmV2ZW50cy5FdmVudC5DSEFOR0UqL1wiY2hhbmdlXCIpO1xyXG5cdFx0XHRcdHRoaXMubGFzdE1pbGxTZWNvbmQ9QnJvd3Nlci5ub3coKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5sYXN0WD1hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lng7XHJcblx0XHR0aGlzLmxhc3RZPWFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkueTtcclxuXHRcdHRoaXMubGFzdFo9YWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS56O1xyXG5cdH1cclxuXHJcblx0Ly8g6YCa6L+H5Lu75oSP5Lik5Liq5YiG6YeP5Yik5pat5piv5ZCm5ruh6Laz5pGH5pmD6K6+5a6a44CCXHJcblx0X19wcm90by5pc1NoYWtlZD1mdW5jdGlvbihkZWx0YVgsZGVsdGFZLGRlbHRhWil7XHJcblx0XHRyZXR1cm4gKGRlbHRhWCA+IHRoaXMudGhyb3VzaG9sZCAmJiBkZWx0YVkgPiB0aGlzLnRocm91c2hvbGQpfHxcclxuXHRcdChkZWx0YVggPiB0aGlzLnRocm91c2hvbGQgJiYgZGVsdGFaID4gdGhpcy50aHJvdXNob2xkKXx8XHJcblx0XHQoZGVsdGFZID4gdGhpcy50aHJvdXNob2xkICYmIGRlbHRhWiA+IHRoaXMudGhyb3VzaG9sZClcclxuXHR9XHJcblxyXG5cdF9fZ2V0c2V0KDEsU2hha2UsJ2luc3RhbmNlJyxmdW5jdGlvbigpe1NoYWtlLl9pbnN0YW5jZT1TaGFrZS5faW5zdGFuY2V8fCBuZXcgU2hha2UoKTtcclxuXHRcdHJldHVybiBTaGFrZS5faW5zdGFuY2U7XHJcblx0fSxsYXlhLmV2ZW50cy5FdmVudERpc3BhdGNoZXIuXyRTRVRfaW5zdGFuY2UpO1xyXG5cclxuXHRTaGFrZS5faW5zdGFuY2U9bnVsbDtcclxuXHRyZXR1cm4gU2hha2U7XHJcbn0pKEV2ZW50RGlzcGF0Y2hlcilcclxuXHJcblxyXG4vKipcclxuKkBwcml2YXRlXHJcbiovXHJcbi8vY2xhc3MgbGF5YS5kZXZpY2UubWVkaWEuSHRtbFZpZGVvIGV4dGVuZHMgbGF5YS5yZXNvdXJjZS5CaXRtYXBcclxudmFyIEh0bWxWaWRlbz0oZnVuY3Rpb24oX3N1cGVyKXtcclxuXHRmdW5jdGlvbiBIdG1sVmlkZW8oKXtcclxuXHRcdHRoaXMudmlkZW89bnVsbDtcclxuXHRcdHRoaXMuX3NvdXJjZT1udWxsO1xyXG5cdFx0SHRtbFZpZGVvLl9fc3VwZXIuY2FsbCh0aGlzKTtcclxuXHRcdHRoaXMuX3dpZHRoPTE7XHJcblx0XHR0aGlzLl9oZWlnaHQ9MTtcclxuXHRcdHRoaXMuY3JlYXRlRG9tRWxlbWVudCgpO1xyXG5cdH1cclxuXHJcblx0X19jbGFzcyhIdG1sVmlkZW8sJ2xheWEuZGV2aWNlLm1lZGlhLkh0bWxWaWRlbycsX3N1cGVyKTtcclxuXHR2YXIgX19wcm90bz1IdG1sVmlkZW8ucHJvdG90eXBlO1xyXG5cdF9fcHJvdG8uY3JlYXRlRG9tRWxlbWVudD1mdW5jdGlvbigpe1xyXG5cdFx0dmFyIF8kdGhpcz10aGlzO1xyXG5cdFx0dGhpcy5fc291cmNlPXRoaXMudmlkZW89QnJvd3Nlci5jcmVhdGVFbGVtZW50KFwidmlkZW9cIik7XHJcblx0XHR2YXIgc3R5bGU9dGhpcy52aWRlby5zdHlsZTtcclxuXHRcdHN0eWxlLnBvc2l0aW9uPSdhYnNvbHV0ZSc7XHJcblx0XHRzdHlsZS50b3A9JzBweCc7XHJcblx0XHRzdHlsZS5sZWZ0PScwcHgnO1xyXG5cdFx0dGhpcy52aWRlby5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVkbWV0YWRhdGFcIiwoZnVuY3Rpb24oKXtcclxuXHRcdFx0dGhpcy5fdz1fJHRoaXMudmlkZW8udmlkZW9XaWR0aDtcclxuXHRcdFx0dGhpcy5faD1fJHRoaXMudmlkZW8udmlkZW9IZWlnaHQ7XHJcblx0XHR9KVsnYmluZCddKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdF9fcHJvdG8uc2V0U291cmNlPWZ1bmN0aW9uKHVybCxleHRlbnNpb24pe1xyXG5cdFx0d2hpbGUodGhpcy52aWRlby5jaGlsZEVsZW1lbnRDb3VudClcclxuXHRcdHRoaXMudmlkZW8uZmlyc3RDaGlsZC5yZW1vdmUoKTtcclxuXHRcdGlmIChleHRlbnNpb24gJiBWaWRlby5NUDQpXHJcblx0XHRcdHRoaXMuYXBwZW5kU291cmNlKHVybCxcInZpZGVvL21wNFwiKTtcclxuXHRcdGlmIChleHRlbnNpb24gJiBWaWRlby5PR0cpXHJcblx0XHRcdHRoaXMuYXBwZW5kU291cmNlKHVybCtcIi5vZ2dcIixcInZpZGVvL29nZ1wiKTtcclxuXHR9XHJcblxyXG5cdF9fcHJvdG8uYXBwZW5kU291cmNlPWZ1bmN0aW9uKHNvdXJjZSx0eXBlKXtcclxuXHRcdHZhciBzb3VyY2VFbGVtZW50PUJyb3dzZXIuY3JlYXRlRWxlbWVudChcInNvdXJjZVwiKTtcclxuXHRcdHNvdXJjZUVsZW1lbnQuc3JjPXNvdXJjZTtcclxuXHRcdHNvdXJjZUVsZW1lbnQudHlwZT10eXBlO1xyXG5cdFx0dGhpcy52aWRlby5hcHBlbmRDaGlsZChzb3VyY2VFbGVtZW50KTtcclxuXHR9XHJcblxyXG5cdF9fcHJvdG8uZ2V0VmlkZW89ZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLnZpZGVvO1xyXG5cdH1cclxuXHJcblx0X19wcm90by5fZ2V0U291cmNlPWZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5fc291cmNlO1xyXG5cdH1cclxuXHJcblx0SHRtbFZpZGVvLmNyZWF0ZT1mdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIG5ldyBIdG1sVmlkZW8oKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBIdG1sVmlkZW87XHJcbn0pKEJpdG1hcClcclxuXHJcblxyXG4vKipcclxuKjxjb2RlPlZpZGVvPC9jb2RlPuWwhuinhumikeaYvuekuuWIsENhbnZhc+S4iuOAgjxjb2RlPlZpZGVvPC9jb2RlPuWPr+iDveS4jeS8muWcqOaJgOaciea1j+iniOWZqOacieaViOOAglxyXG4qPHA+5YWz5LqOVmlkZW/mlK/mjIHnmoTmiYDmnInkuovku7blj4Lop4HvvJo8aT5odHRwOi8vd3d3Lnczc2Nob29sLmNvbS5jbi90YWdzL2h0bWxfcmVmX2F1ZGlvX3ZpZGVvX2RvbS5hc3A8L2k+44CCPC9wPlxyXG4qPHA+XHJcbio8Yj7ms6jmhI/vvJo8L2I+PGJyLz5cclxuKuWcqFBD56uv5Y+v5Lul5Zyo5Lu75L2V5pe25py66LCD55SoPGNvZGU+cGxheSgpPC9jb2RlPuWboOatpO+8jOWPr+S7peWcqOeoi+W6j+W8gOWni+i/kOihjOaXtuWwseS9v1ZpZGVv5byA5aeL5pKt5pS+44CC5L2G5piv5Zyo56e75Yqo56uv77yM5Y+q5pyJ5Zyo55So5oi356ys5LiA5qyh6Kem56Kw5bGP5bmV5ZCO5omN5Y+v5Lul6LCD55SocGxheSgp77yM5omA5Lul56e75Yqo56uv5LiN5Y+v6IO95Zyo56iL5bqP5byA5aeL6L+Q6KGM5pe25bCx6Ieq5Yqo5byA5aeL5pKt5pS+VmlkZW/jgIJcclxuKjwvcD5cclxuKlxyXG4qPHA+TUROIFZpZGVv6ZO+5o6l77yaIDxpPmh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUTUwvRWxlbWVudC92aWRlbzwvaT48L3A+XHJcbiovXHJcbi8vY2xhc3MgbGF5YS5kZXZpY2UubWVkaWEuVmlkZW8gZXh0ZW5kcyBsYXlhLmRpc3BsYXkuU3ByaXRlXHJcbnZhciBWaWRlbz0oZnVuY3Rpb24oX3N1cGVyKXtcclxuXHRmdW5jdGlvbiBWaWRlbyh3aWR0aCxoZWlnaHQpe1xyXG5cdFx0dGhpcy5odG1sVmlkZW89bnVsbDtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50PW51bGw7XHJcblx0XHR0aGlzLmludGVybmFsVGV4dHVyZT1udWxsO1xyXG5cdFx0KHdpZHRoPT09dm9pZCAwKSYmICh3aWR0aD0zMjApO1xyXG5cdFx0KGhlaWdodD09PXZvaWQgMCkmJiAoaGVpZ2h0PTI0MCk7XHJcblx0XHRWaWRlby5fX3N1cGVyLmNhbGwodGhpcyk7XHJcblx0XHRpZiAoUmVuZGVyLmlzQ29uY2hBcHAgfHwgUmVuZGVyLmlzV2ViR0wpe1xyXG5cdFx0XHR0aGlzLmh0bWxWaWRlbz1uZXcgV2ViR0xWaWRlbygpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0dGhpcy5odG1sVmlkZW89bmV3IEh0bWxWaWRlbygpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQ9dGhpcy5odG1sVmlkZW8uZ2V0VmlkZW8oKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmxheWFUYXJnZXQ9dGhpcztcclxuXHRcdHRoaXMuaW50ZXJuYWxUZXh0dXJlPW5ldyBUZXh0dXJlKHRoaXMuaHRtbFZpZGVvKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLFZpZGVvLm9uQWJvcnQpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNhbnBsYXlcIixWaWRlby5vbkNhbnBsYXkpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNhbnBsYXl0aHJvdWdoXCIsVmlkZW8ub25DYW5wbGF5dGhyb3VnaCk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHVyYXRpb25jaGFuZ2VcIixWaWRlby5vbkR1cmF0aW9uY2hhbmdlKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJlbXB0aWVkXCIsVmlkZW8ub25FbXB0aWVkKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLFZpZGVvLm9uRXJyb3IpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZGRhdGFcIixWaWRlby5vbkxvYWRlZGRhdGEpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZG1ldGFkYXRhXCIsVmlkZW8ub25Mb2FkZWRtZXRhZGF0YSk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibG9hZHN0YXJ0XCIsVmlkZW8ub25Mb2Fkc3RhcnQpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBhdXNlXCIsVmlkZW8ub25QYXVzZSk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwicGxheVwiLFZpZGVvLm9uUGxheSk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwicGxheWluZ1wiLFZpZGVvLm9uUGxheWluZyk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwicHJvZ3Jlc3NcIixWaWRlby5vblByb2dyZXNzKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJyYXRlY2hhbmdlXCIsVmlkZW8ub25SYXRlY2hhbmdlKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzZWVrZWRcIixWaWRlby5vblNlZWtlZCk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic2Vla2luZ1wiLFZpZGVvLm9uU2Vla2luZyk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic3RhbGxlZFwiLFZpZGVvLm9uU3RhbGxlZCk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic3VzcGVuZFwiLFZpZGVvLm9uU3VzcGVuZCk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwidGltZXVwZGF0ZVwiLFZpZGVvLm9uVGltZXVwZGF0ZSk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwidm9sdW1lY2hhbmdlXCIsVmlkZW8ub25Wb2x1bWVjaGFuZ2UpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIndhaXRpbmdcIixWaWRlby5vbldhaXRpbmcpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImVuZGVkXCIsdGhpcy5vblBsYXlDb21wbGV0ZVsnYmluZCddKHRoaXMpKTtcclxuXHRcdHRoaXMuc2l6ZSh3aWR0aCxoZWlnaHQpO1xyXG5cdFx0aWYgKEJyb3dzZXIub25Nb2JpbGUpe1xyXG5cdFx0XHQvKl9fSlNfXyAqL3RoaXMub25Eb2N1bWVudENsaWNrPXRoaXMub25Eb2N1bWVudENsaWNrLmJpbmQodGhpcyk7XHJcblx0XHRcdEJyb3dzZXIuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0X19jbGFzcyhWaWRlbywnbGF5YS5kZXZpY2UubWVkaWEuVmlkZW8nLF9zdXBlcik7XHJcblx0dmFyIF9fcHJvdG89VmlkZW8ucHJvdG90eXBlO1xyXG5cdF9fcHJvdG8ub25QbGF5Q29tcGxldGU9ZnVuY3Rpb24oZSl7XHJcblx0XHR0aGlzLmV2ZW50KFwiZW5kZWRcIik7XHJcblx0XHRpZighUmVuZGVyLmlzQ29uY2hBcHAgfHwgIXRoaXMudmlkZW9FbGVtZW50Lmxvb3ApXHJcblx0XHRcdExheWEudGltZXIuY2xlYXIodGhpcyx0aGlzLnJlbmRlckNhbnZhcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQq6K6+572u5pKt5pS+5rqQ44CCXHJcblx0KkBwYXJhbSB1cmwg5pKt5pS+5rqQ6Lev5b6E44CCXHJcblx0Ki9cclxuXHRfX3Byb3RvLmxvYWQ9ZnVuY3Rpb24odXJsKXtcclxuXHRcdGlmICh1cmwuaW5kZXhPZihcImJsb2I6XCIpPT0wKVxyXG5cdFx0XHR0aGlzLnZpZGVvRWxlbWVudC5zcmM9dXJsO1xyXG5cdFx0ZWxzZVxyXG5cdFx0dGhpcy5odG1sVmlkZW8uc2V0U291cmNlKHVybCxsYXlhLmRldmljZS5tZWRpYS5WaWRlby5NUDQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0KuW8gOWni+aSreaUvuinhumikeOAglxyXG5cdCovXHJcblx0X19wcm90by5wbGF5PWZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5wbGF5KCk7XHJcblx0XHRMYXlhLnRpbWVyLmZyYW1lTG9vcCgxLHRoaXMsdGhpcy5yZW5kZXJDYW52YXMpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0KuaaguWBnOinhumikeaSreaUvuOAglxyXG5cdCovXHJcblx0X19wcm90by5wYXVzZT1mdW5jdGlvbigpe1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucGF1c2UoKTtcclxuXHRcdExheWEudGltZXIuY2xlYXIodGhpcyx0aGlzLnJlbmRlckNhbnZhcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQq6YeN5paw5Yqg6L296KeG6aKR44CCXHJcblx0Ki9cclxuXHRfX3Byb3RvLnJlbG9hZD1mdW5jdGlvbigpe1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQubG9hZCgpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0KuajgOa1i+aYr+WQpuaUr+aMgeaSreaUvuaMh+WumuagvOW8j+inhumikeOAglxyXG5cdCpAcGFyYW0gdHlwZSDlj4LmlbDkuLpWaWRlby5NUDQgLyBWaWRlby5PR0cgLyBWaWRlby5XRUJN5LmL5LiA44CCXHJcblx0KkByZXR1cm4g6KGo56S65pSv5oyB55qE57qn5Yir44CC5Y+v6IO955qE5YC877yaXHJcblx0Kjx1bD5cclxuXHQqPGxpPlwicHJvYmFibHlcIu+8jFZpZGVvLlNVUFBPUlRfUFJPQkFCTFkt5rWP6KeI5Zmo5pyA5Y+v6IO95pSv5oyB6K+l6Z+z6aKRL+inhumikeexu+WeizwvbGk+XHJcblx0KjxsaT5cIm1heWJlXCLvvIxWaWRlby5TVVBQT1JUX01BWUJZLea1j+iniOWZqOS5n+iuuOaUr+aMgeivpemfs+mikS/op4bpopHnsbvlnos8L2xpPlxyXG5cdCo8bGk+XCJcIu+8jFZpZGVvLlNVUFBPUlRfTk8t77yI56m65a2X56ym5Liy77yJ5rWP6KeI5Zmo5LiN5pSv5oyB6K+l6Z+z6aKRL+inhumikeexu+WeizwvbGk+XHJcblx0KjwvdWw+XHJcblx0Ki9cclxuXHRfX3Byb3RvLmNhblBsYXlUeXBlPWZ1bmN0aW9uKHR5cGUpe1xyXG5cdFx0dmFyIHR5cGVTdHJpbmc7XHJcblx0XHRzd2l0Y2ggKHR5cGUpe1xyXG5cdFx0XHRjYXNlIGxheWEuZGV2aWNlLm1lZGlhLlZpZGVvLk1QNDpcclxuXHRcdFx0XHR0eXBlU3RyaW5nPVwidmlkZW8vbXA0XCI7XHJcblx0XHRcdFx0YnJlYWsgO1xyXG5cdFx0XHRjYXNlIGxheWEuZGV2aWNlLm1lZGlhLlZpZGVvLk9HRzpcclxuXHRcdFx0XHR0eXBlU3RyaW5nPVwidmlkZW8vb2dnXCI7XHJcblx0XHRcdFx0YnJlYWsgO1xyXG5cdFx0XHRjYXNlIGxheWEuZGV2aWNlLm1lZGlhLlZpZGVvLldFQk06XHJcblx0XHRcdFx0dHlwZVN0cmluZz1cInZpZGVvL3dlYm1cIjtcclxuXHRcdFx0XHRicmVhayA7XHJcblx0XHRcdH1cclxuXHRcdHJldHVybiB0aGlzLnZpZGVvRWxlbWVudC5jYW5QbGF5VHlwZSh0eXBlU3RyaW5nKTtcclxuXHR9XHJcblxyXG5cdF9fcHJvdG8ucmVuZGVyQ2FudmFzPWZ1bmN0aW9uKCl7XHJcblx0XHRpZiAodGhpcy5yZWFkeVN0YXRlPT09MClcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0aWYgKFJlbmRlci5pc0NvbmNoQXBwIHx8IFJlbmRlci5pc1dlYkdMKVxyXG5cdFx0XHR0aGlzLmh0bWxWaWRlb1sndXBkYXRlVGV4dHVyZSddKCk7XHJcblx0XHR0aGlzLmdyYXBoaWNzLmNsZWFyKCk7XHJcblx0XHR0aGlzLmdyYXBoaWNzLmRyYXdUZXh0dXJlKHRoaXMuaW50ZXJuYWxUZXh0dXJlLDAsMCx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcclxuXHR9XHJcblxyXG5cdF9fcHJvdG8ub25Eb2N1bWVudENsaWNrPWZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5wbGF5KCk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5wYXVzZSgpO1xyXG5cdFx0QnJvd3Nlci5kb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIix0aGlzLm9uRG9jdW1lbnRDbGljayk7XHJcblx0fVxyXG5cclxuXHRfX3Byb3RvLnNpemU9ZnVuY3Rpb24od2lkdGgsaGVpZ2h0KXtcclxuXHRcdF9zdXBlci5wcm90b3R5cGUuc2l6ZS5jYWxsKHRoaXMsd2lkdGgsaGVpZ2h0KVxyXG5cdFx0aWYgKFJlbmRlci5pc0NvbmNoQXBwKXtcclxuXHRcdFx0dmFyIHRyYW5zZm9ybT1VdGlscy5nZXRUcmFuc2Zvcm1SZWxhdGl2ZVRvV2luZG93KHRoaXMsMCwwKTtcclxuXHRcdFx0dGhpcy52aWRlb0VsZW1lbnQud2lkdGg9d2lkdGggKnRyYW5zZm9ybS5zY2FsZVg7XHJcblx0XHR9XHJcblx0XHRlbHNle1xyXG5cdFx0XHR0aGlzLnZpZGVvRWxlbWVudC53aWR0aD13aWR0aCAvIEJyb3dzZXIucGl4ZWxSYXRpbztcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLnBhdXNlZCl0aGlzLnJlbmRlckNhbnZhcygpO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQq6ZSA5q+B5YaF6YOo5LqL5Lu257uR5a6a44CCXHJcblx0Ki9cclxuXHRfX3Byb3RvLmRlc3Ryb3k9ZnVuY3Rpb24oZGV0cm95Q2hpbGRyZW4pe1xyXG5cdFx0KGRldHJveUNoaWxkcmVuPT09dm9pZCAwKSYmIChkZXRyb3lDaGlsZHJlbj10cnVlKTtcclxuXHRcdF9zdXBlci5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMsZGV0cm95Q2hpbGRyZW4pO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsVmlkZW8ub25BYm9ydCk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2FucGxheVwiLFZpZGVvLm9uQ2FucGxheSk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2FucGxheXRocm91Z2hcIixWaWRlby5vbkNhbnBsYXl0aHJvdWdoKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJkdXJhdGlvbmNoYW5nZVwiLFZpZGVvLm9uRHVyYXRpb25jaGFuZ2UpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVtcHRpZWRcIixWaWRlby5vbkVtcHRpZWQpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsVmlkZW8ub25FcnJvcik7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZGVkZGF0YVwiLFZpZGVvLm9uTG9hZGVkZGF0YSk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZGVkbWV0YWRhdGFcIixWaWRlby5vbkxvYWRlZG1ldGFkYXRhKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2Fkc3RhcnRcIixWaWRlby5vbkxvYWRzdGFydCk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwicGF1c2VcIixWaWRlby5vblBhdXNlKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwbGF5XCIsVmlkZW8ub25QbGF5KTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwbGF5aW5nXCIsVmlkZW8ub25QbGF5aW5nKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwcm9ncmVzc1wiLFZpZGVvLm9uUHJvZ3Jlc3MpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJhdGVjaGFuZ2VcIixWaWRlby5vblJhdGVjaGFuZ2UpO1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNlZWtlZFwiLFZpZGVvLm9uU2Vla2VkKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzZWVraW5nXCIsVmlkZW8ub25TZWVraW5nKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzdGFsbGVkXCIsVmlkZW8ub25TdGFsbGVkKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzdXNwZW5kXCIsVmlkZW8ub25TdXNwZW5kKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0aW1ldXBkYXRlXCIsVmlkZW8ub25UaW1ldXBkYXRlKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2b2x1bWVjaGFuZ2VcIixWaWRlby5vblZvbHVtZWNoYW5nZSk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwid2FpdGluZ1wiLFZpZGVvLm9uV2FpdGluZyk7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZW5kZWRcIix0aGlzLm9uUGxheUNvbXBsZXRlKTtcclxuXHRcdHRoaXMucGF1c2UoKTtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LmxheWFUYXJnZXQ9bnVsbFxyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQ9bnVsbDtcclxuXHRcdHRoaXMuaHRtbFZpZGVvLmRlc3Ryb3koKTtcclxuXHR9XHJcblxyXG5cdF9fcHJvdG8uc3luY1ZpZGVvUG9zaXRpb249ZnVuY3Rpb24oKXtcclxuXHRcdHZhciBzdGFnZT1MYXlhLnN0YWdlO1xyXG5cdFx0dmFyIHJlYztcclxuXHRcdHJlYz1VdGlscy5nZXRHbG9iYWxQb3NBbmRTY2FsZSh0aGlzKTtcclxuXHRcdHZhciBhPXN0YWdlLl9jYW52YXNUcmFuc2Zvcm0uYSxkPXN0YWdlLl9jYW52YXNUcmFuc2Zvcm0uZDtcclxuXHRcdHZhciB4PXJlYy54ICpzdGFnZS5jbGllbnRTY2FsZVggKmErc3RhZ2Uub2Zmc2V0Lng7XHJcblx0XHR2YXIgeT1yZWMueSAqc3RhZ2UuY2xpZW50U2NhbGVZICpkK3N0YWdlLm9mZnNldC55O1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuc3R5bGUubGVmdD14KydweCc7O1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQuc3R5bGUudG9wPXkrJ3B4JztcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LndpZHRoPXRoaXMud2lkdGggLyBCcm93c2VyLnBpeGVsUmF0aW87XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5oZWlnaHQ9dGhpcy5oZWlnaHQgLyBCcm93c2VyLnBpeGVsUmF0aW87XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQqYnVmZmVyZWQg5bGe5oCn6L+U5ZueIFRpbWVSYW5nZXMoSlMp5a+56LGh44CCVGltZVJhbmdlcyDlr7nosaHooajnpLrnlKjmiLfnmoTpn7Pop4bpopHnvJPlhrLojIPlm7TjgILnvJPlhrLojIPlm7TmjIfnmoTmmK/lt7LnvJPlhrLpn7Pop4bpopHnmoTml7bpl7TojIPlm7TjgILlpoLmnpznlKjmiLflnKjpn7Pop4bpopHkuK3ot7Pot4Pmkq3mlL7vvIzkvJrlvpfliLDlpJrkuKrnvJPlhrLojIPlm7TjgIJcclxuXHQqPHA+YnVmZmVyZWQubGVuZ3Ro6L+U5Zue57yT5Yay6IyD5Zu05Liq5pWw44CC5aaC6I635Y+W56ys5LiA5Liq57yT5Yay6IyD5Zu05YiZ5pivYnVmZmVyZWQuc3RhcnQoMCnlkoxidWZmZXJlZC5lbmQoMCnjgILku6Xnp5LorqHjgII8L3A+XHJcblx0KkByZXR1cm4gVGltZVJhbmdlcyhKUynlr7nosaFcclxuXHQqL1xyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywnYnVmZmVyZWQnLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy52aWRlb0VsZW1lbnQuYnVmZmVyZWQ7XHJcblx0fSk7XHJcblxyXG5cdC8qKlxyXG5cdCrojrflj5bop4bpopHmupDlsLrlr7jjgIJyZWFkeeS6i+S7tuinpuWPkeWQjuWPr+eUqOOAglxyXG5cdCovXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCd2aWRlb1dpZHRoJyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMudmlkZW9FbGVtZW50LnZpZGVvV2lkdGg7XHJcblx0fSk7XHJcblxyXG5cdC8qKlxyXG5cdCrojrflj5blvZPliY3mkq3mlL7mupDot6/lvoTjgIJcclxuXHQqL1xyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywnY3VycmVudFNyYycsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLnZpZGVvRWxlbWVudC5jdXJyZW50U3JjO1xyXG5cdH0pO1xyXG5cclxuXHQvKipcclxuXHQq6K6+572u5ZKM6I635Y+W5b2T5YmN5pKt5pS+5aS05L2N572u44CCXHJcblx0Ki9cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ2N1cnJlbnRUaW1lJyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMudmlkZW9FbGVtZW50LmN1cnJlbnRUaW1lO1xyXG5cdFx0fSxmdW5jdGlvbih2YWx1ZSl7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5jdXJyZW50VGltZT12YWx1ZTtcclxuXHRcdHRoaXMucmVuZGVyQ2FudmFzKCk7XHJcblx0fSk7XHJcblxyXG5cdC8qKlxyXG5cdCrov5Tlm57pn7PpopEv6KeG6aKR55qE5pKt5pS+5piv5ZCm5bey57uT5p2fXHJcblx0Ki9cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ2VuZGVkJyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMudmlkZW9FbGVtZW50LmVuZGVkO1xyXG5cdH0pO1xyXG5cclxuXHQvKipcclxuXHQq6K6+572u5ZKM6I635Y+W5b2T5YmN6Z+z6YeP44CCXHJcblx0Ki9cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ3ZvbHVtZScsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLnZpZGVvRWxlbWVudC52b2x1bWU7XHJcblx0XHR9LGZ1bmN0aW9uKHZhbHVlKXtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnZvbHVtZT12YWx1ZTtcclxuXHR9KTtcclxuXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCd2aWRlb0hlaWdodCcsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLnZpZGVvRWxlbWVudC52aWRlb0hlaWdodDtcclxuXHR9KTtcclxuXHJcblx0LyoqXHJcblx0KuihqOekuuinhumikeWFg+e0oOeahOWwsee7queKtuaAge+8mlxyXG5cdCo8dWw+XHJcblx0KjxsaT4wPUhBVkVfTk9USElORy3msqHmnInlhbPkuo7pn7PpopEv6KeG6aKR5piv5ZCm5bCx57uq55qE5L+h5oGvPC9saT5cclxuXHQqPGxpPjE9SEFWRV9NRVRBREFUQS3lhbPkuo7pn7PpopEv6KeG6aKR5bCx57uq55qE5YWD5pWw5o2uPC9saT5cclxuXHQqPGxpPjI9SEFWRV9DVVJSRU5UX0RBVEEt5YWz5LqO5b2T5YmN5pKt5pS+5L2N572u55qE5pWw5o2u5piv5Y+v55So55qE77yM5L2G5rKh5pyJ6Laz5aSf55qE5pWw5o2u5p2l5pKt5pS+5LiL5LiA5binL+avq+enkjwvbGk+XHJcblx0KjxsaT4zPUhBVkVfRlVUVVJFX0RBVEEt5b2T5YmN5Y+K6Iez5bCR5LiL5LiA5bin55qE5pWw5o2u5piv5Y+v55So55qEPC9saT5cclxuXHQqPGxpPjQ9SEFWRV9FTk9VR0hfREFUQS3lj6/nlKjmlbDmja7otrPku6XlvIDlp4vmkq3mlL48L2xpPlxyXG5cdCo8L3VsPlxyXG5cdCovXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCdyZWFkeVN0YXRlJyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMudmlkZW9FbGVtZW50LnJlYWR5U3RhdGU7XHJcblx0fSk7XHJcblxyXG5cdC8qKlxyXG5cdCrojrflj5bop4bpopHplb/luqbvvIjnp5LvvInjgIJyZWFkeeS6i+S7tuinpuWPkeWQjuWPr+eUqOOAglxyXG5cdCovXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCdkdXJhdGlvbicsZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLnZpZGVvRWxlbWVudC5kdXJhdGlvbjtcclxuXHR9KTtcclxuXHJcblx0LyoqXHJcblx0Kui/lOWbnuihqOekuumfs+mikS/op4bpopHplJnor6/nirbmgIHnmoQgTWVkaWFFcnJvcu+8iEpT77yJ5a+56LGh44CCXHJcblx0Ki9cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ2Vycm9yJyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMudmlkZW9FbGVtZW50LmVycm9yO1xyXG5cdH0pO1xyXG5cclxuXHQvKipcclxuXHQq6K6+572u5oiW6L+U5Zue6Z+z6aKRL+inhumikeaYr+WQpuW6lOWcqOe7k+adn+aXtumHjeaWsOaSreaUvuOAglxyXG5cdCovXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCdsb29wJyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMudmlkZW9FbGVtZW50Lmxvb3A7XHJcblx0XHR9LGZ1bmN0aW9uKHZhbHVlKXtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50Lmxvb3A9dmFsdWU7XHJcblx0fSk7XHJcblxyXG5cdC8qKlxyXG5cdCrorr7nva7op4bpopHnmoR45Z2Q5qCHXHJcblx0Ki9cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ3gnLF9zdXBlci5wcm90b3R5cGUuXyRnZXRfeCxmdW5jdGlvbih2YWwpe1xyXG5cdFx0TGF5YS5zdXBlclNldChTcHJpdGUsdGhpcywneCcsdmFsKTtcclxuXHRcdGlmIChSZW5kZXIuaXNDb25jaEFwcCl7XHJcblx0XHRcdHZhciB0cmFuc2Zvcm09VXRpbHMuZ2V0VHJhbnNmb3JtUmVsYXRpdmVUb1dpbmRvdyh0aGlzLDAsMCk7XHJcblx0XHRcdHRoaXMudmlkZW9FbGVtZW50LnN0eWxlLmxlZnQ9dHJhbnNmb3JtLng7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qKlxyXG5cdCrorr7nva7op4bpopHnmoR55Z2Q5qCHXHJcblx0Ki9cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ3knLF9zdXBlci5wcm90b3R5cGUuXyRnZXRfeSxmdW5jdGlvbih2YWwpe1xyXG5cdFx0TGF5YS5zdXBlclNldChTcHJpdGUsdGhpcywneScsdmFsKTtcclxuXHRcdGlmIChSZW5kZXIuaXNDb25jaEFwcCl7XHJcblx0XHRcdHZhciB0cmFuc2Zvcm09VXRpbHMuZ2V0VHJhbnNmb3JtUmVsYXRpdmVUb1dpbmRvdyh0aGlzLDAsMCk7XHJcblx0XHRcdHRoaXMudmlkZW9FbGVtZW50LnN0eWxlLnRvcD10cmFuc2Zvcm0ueTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LyoqXHJcblx0KnBsYXliYWNrUmF0ZSDlsZ7mgKforr7nva7miJbov5Tlm57pn7PpopEv6KeG6aKR55qE5b2T5YmN5pKt5pS+6YCf5bqm44CC5aaC77yaXHJcblx0Kjx1bD5cclxuXHQqPGxpPjEuMCDmraPluLjpgJ/luqY8L2xpPlxyXG5cdCo8bGk+MC41IOWNiumAn++8iOabtOaFou+8iTwvbGk+XHJcblx0KjxsaT4yLjAg5YCN6YCf77yI5pu05b+r77yJPC9saT5cclxuXHQqPGxpPi0xLjAg5ZCR5ZCO77yM5q2j5bi46YCf5bqmPC9saT5cclxuXHQqPGxpPi0wLjUg5ZCR5ZCO77yM5Y2K6YCfPC9saT5cclxuXHQqPC91bD5cclxuXHQqPHA+5Y+q5pyJIEdvb2dsZSBDaHJvbWUg5ZKMIFNhZmFyaSDmlK/mjIEgcGxheWJhY2tSYXRlIOWxnuaAp+OAgjwvcD5cclxuXHQqL1xyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywncGxheWJhY2tSYXRlJyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMudmlkZW9FbGVtZW50LnBsYXliYWNrUmF0ZTtcclxuXHRcdH0sZnVuY3Rpb24odmFsdWUpe1xyXG5cdFx0dGhpcy52aWRlb0VsZW1lbnQucGxheWJhY2tSYXRlPXZhbHVlO1xyXG5cdH0pO1xyXG5cclxuXHQvKipcclxuXHQq6I635Y+W5ZKM6K6+572u6Z2Z6Z+z54q25oCB44CCXHJcblx0Ki9cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ211dGVkJyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMudmlkZW9FbGVtZW50Lm11dGVkO1xyXG5cdFx0fSxmdW5jdGlvbih2YWx1ZSl7XHJcblx0XHR0aGlzLnZpZGVvRWxlbWVudC5tdXRlZD12YWx1ZTtcclxuXHR9KTtcclxuXHJcblx0LyoqXHJcblx0Kui/lOWbnuinhumikeaYr+WQpuaaguWBnFxyXG5cdCovXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCdwYXVzZWQnLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy52aWRlb0VsZW1lbnQucGF1c2VkO1xyXG5cdH0pO1xyXG5cclxuXHQvKipcclxuXHQqcHJlbG9hZCDlsZ7mgKforr7nva7miJbov5Tlm57mmK/lkKblnKjpobXpnaLliqDovb3lkI7nq4vljbPliqDovb3op4bpopHjgILlj6/otYvlgLzlpoLkuIvvvJpcclxuXHQqPHVsPlxyXG5cdCo8bGk+YXV0byDmjIfnpLrkuIDml6bpobXpnaLliqDovb3vvIzliJnlvIDlp4vliqDovb3op4bpopHjgII8L2xpPlxyXG5cdCo8bGk+bWV0YWRhdGEg5oyH56S65b2T6aG16Z2i5Yqg6L295ZCO5LuF5Yqg6L296Z+z6aKRL+inhumikeeahOWFg+aVsOaNruOAgjwvbGk+XHJcblx0KjxsaT5ub25lIOaMh+ekuumhtemdouWKoOi9veWQjuS4jeW6lOWKoOi9vemfs+mikS/op4bpopHjgII8L2xpPlxyXG5cdCo8L3VsPlxyXG5cdCovXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCdwcmVsb2FkJyxmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMudmlkZW9FbGVtZW50LnByZWxvYWQ7XHJcblx0XHR9LGZ1bmN0aW9uKHZhbHVlKXtcclxuXHRcdHRoaXMudmlkZW9FbGVtZW50LnByZWxvYWQ9dmFsdWU7XHJcblx0fSk7XHJcblxyXG5cdC8qKlxyXG5cdCrlj4Lop4EgPGk+aHR0cDovL3d3dy53M3NjaG9vbC5jb20uY24vdGFncy9hdl9wcm9wX3NlZWthYmxlLmFzcDwvaT7jgIJcclxuXHQqL1xyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywnc2Vla2FibGUnLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy52aWRlb0VsZW1lbnQuc2Vla2FibGU7XHJcblx0fSk7XHJcblxyXG5cdC8qKlxyXG5cdCpzZWVraW5nIOWxnuaAp+i/lOWbnueUqOaIt+ebruWJjeaYr+WQpuWcqOmfs+mikS/op4bpopHkuK3lr7vlnYDjgIJcclxuXHQq5a+75Z2A5Lit77yIU2Vla2luZ++8ieaMh+eahOaYr+eUqOaIt+WcqOmfs+mikS/op4bpopHkuK3np7vliqgv6Lez6LeD5Yiw5paw55qE5L2N572u44CCXHJcblx0Ki9cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ3NlZWtpbmcnLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy52aWRlb0VsZW1lbnQuc2Vla2luZztcclxuXHR9KTtcclxuXHJcblx0X19nZXRzZXQoMCxfX3Byb3RvLCd3aWR0aCcsX3N1cGVyLnByb3RvdHlwZS5fJGdldF93aWR0aCxmdW5jdGlvbih2YWx1ZSl7XHJcblx0XHRpZiAoUmVuZGVyLmlzQ29uY2hBcHApe1xyXG5cdFx0XHR2YXIgdHJhbnNmb3JtPVV0aWxzLmdldFRyYW5zZm9ybVJlbGF0aXZlVG9XaW5kb3codGhpcywwLDApO1xyXG5cdFx0XHR0aGlzLnZpZGVvRWxlbWVudC53aWR0aD12YWx1ZSAqdHJhbnNmb3JtLnNjYWxlWDtcclxuXHRcdH1cclxuXHRcdGVsc2V7XHJcblx0XHRcdHRoaXMudmlkZW9FbGVtZW50LndpZHRoPXRoaXMud2lkdGggLyBCcm93c2VyLnBpeGVsUmF0aW87XHJcblx0XHR9XHJcblx0XHRMYXlhLnN1cGVyU2V0KFNwcml0ZSx0aGlzLCd3aWR0aCcsdmFsdWUpO1xyXG5cdFx0aWYgKHRoaXMucGF1c2VkKXRoaXMucmVuZGVyQ2FudmFzKCk7XHJcblx0fSk7XHJcblxyXG5cdF9fZ2V0c2V0KDAsX19wcm90bywnaGVpZ2h0Jyxfc3VwZXIucHJvdG90eXBlLl8kZ2V0X2hlaWdodCxmdW5jdGlvbih2YWx1ZSl7XHJcblx0XHRpZiAoUmVuZGVyLmlzQ29uY2hBcHApe1xyXG5cdFx0XHR2YXIgdHJhbnNmb3JtPVV0aWxzLmdldFRyYW5zZm9ybVJlbGF0aXZlVG9XaW5kb3codGhpcywwLDApO1xyXG5cdFx0XHR0aGlzLnZpZGVvRWxlbWVudC5oZWlnaHQ9dmFsdWUgKnRyYW5zZm9ybS5zY2FsZVk7XHJcblx0XHR9XHJcblx0XHRlbHNle1xyXG5cdFx0XHR0aGlzLnZpZGVvRWxlbWVudC5oZWlnaHQ9dGhpcy5oZWlnaHQgLyBCcm93c2VyLnBpeGVsUmF0aW87XHJcblx0XHR9XHJcblx0XHRMYXlhLnN1cGVyU2V0KFNwcml0ZSx0aGlzLCdoZWlnaHQnLHZhbHVlKTtcclxuXHR9KTtcclxuXHJcblx0VmlkZW8ub25BYm9ydD1mdW5jdGlvbihlKXtlLnRhcmdldC5sYXlhVGFyZ2V0LmV2ZW50KFwiYWJvcnRcIil9XHJcblx0VmlkZW8ub25DYW5wbGF5PWZ1bmN0aW9uKGUpe2UudGFyZ2V0LmxheWFUYXJnZXQuZXZlbnQoXCJjYW5wbGF5XCIpfVxyXG5cdFZpZGVvLm9uQ2FucGxheXRocm91Z2g9ZnVuY3Rpb24oZSl7ZS50YXJnZXQubGF5YVRhcmdldC5ldmVudChcImNhbnBsYXl0aHJvdWdoXCIpfVxyXG5cdFZpZGVvLm9uRHVyYXRpb25jaGFuZ2U9ZnVuY3Rpb24oZSl7ZS50YXJnZXQubGF5YVRhcmdldC5ldmVudChcImR1cmF0aW9uY2hhbmdlXCIpfVxyXG5cdFZpZGVvLm9uRW1wdGllZD1mdW5jdGlvbihlKXtlLnRhcmdldC5sYXlhVGFyZ2V0LmV2ZW50KFwiZW1wdGllZFwiKX1cclxuXHRWaWRlby5vbkVycm9yPWZ1bmN0aW9uKGUpe2UudGFyZ2V0LmxheWFUYXJnZXQuZXZlbnQoXCJlcnJvclwiKX1cclxuXHRWaWRlby5vbkxvYWRlZGRhdGE9ZnVuY3Rpb24oZSl7ZS50YXJnZXQubGF5YVRhcmdldC5ldmVudChcImxvYWRlZGRhdGFcIil9XHJcblx0VmlkZW8ub25Mb2FkZWRtZXRhZGF0YT1mdW5jdGlvbihlKXtlLnRhcmdldC5sYXlhVGFyZ2V0LmV2ZW50KFwibG9hZGVkbWV0YWRhdGFcIil9XHJcblx0VmlkZW8ub25Mb2Fkc3RhcnQ9ZnVuY3Rpb24oZSl7ZS50YXJnZXQubGF5YVRhcmdldC5ldmVudChcImxvYWRzdGFydFwiKX1cclxuXHRWaWRlby5vblBhdXNlPWZ1bmN0aW9uKGUpe2UudGFyZ2V0LmxheWFUYXJnZXQuZXZlbnQoXCJwYXVzZVwiKX1cclxuXHRWaWRlby5vblBsYXk9ZnVuY3Rpb24oZSl7ZS50YXJnZXQubGF5YVRhcmdldC5ldmVudChcInBsYXlcIil9XHJcblx0VmlkZW8ub25QbGF5aW5nPWZ1bmN0aW9uKGUpe2UudGFyZ2V0LmxheWFUYXJnZXQuZXZlbnQoXCJwbGF5aW5nXCIpfVxyXG5cdFZpZGVvLm9uUHJvZ3Jlc3M9ZnVuY3Rpb24oZSl7ZS50YXJnZXQubGF5YVRhcmdldC5ldmVudChcInByb2dyZXNzXCIpfVxyXG5cdFZpZGVvLm9uUmF0ZWNoYW5nZT1mdW5jdGlvbihlKXtlLnRhcmdldC5sYXlhVGFyZ2V0LmV2ZW50KFwicmF0ZWNoYW5nZVwiKX1cclxuXHRWaWRlby5vblNlZWtlZD1mdW5jdGlvbihlKXtlLnRhcmdldC5sYXlhVGFyZ2V0LmV2ZW50KFwic2Vla2VkXCIpfVxyXG5cdFZpZGVvLm9uU2Vla2luZz1mdW5jdGlvbihlKXtlLnRhcmdldC5sYXlhVGFyZ2V0LmV2ZW50KFwic2Vla2luZ1wiKX1cclxuXHRWaWRlby5vblN0YWxsZWQ9ZnVuY3Rpb24oZSl7ZS50YXJnZXQubGF5YVRhcmdldC5ldmVudChcInN0YWxsZWRcIil9XHJcblx0VmlkZW8ub25TdXNwZW5kPWZ1bmN0aW9uKGUpe2UudGFyZ2V0LmxheWFUYXJnZXQuZXZlbnQoXCJzdXNwZW5kXCIpfVxyXG5cdFZpZGVvLm9uVGltZXVwZGF0ZT1mdW5jdGlvbihlKXtlLnRhcmdldC5sYXlhVGFyZ2V0LmV2ZW50KFwidGltZXVwZGF0ZVwiKX1cclxuXHRWaWRlby5vblZvbHVtZWNoYW5nZT1mdW5jdGlvbihlKXtlLnRhcmdldC5sYXlhVGFyZ2V0LmV2ZW50KFwidm9sdW1lY2hhbmdlXCIpfVxyXG5cdFZpZGVvLm9uV2FpdGluZz1mdW5jdGlvbihlKXtlLnRhcmdldC5sYXlhVGFyZ2V0LmV2ZW50KFwid2FpdGluZ1wiKX1cclxuXHRWaWRlby5NUDQ9MTtcclxuXHRWaWRlby5PR0c9MjtcclxuXHRWaWRlby5DQU1FUkE9NDtcclxuXHRWaWRlby5XRUJNPTg7XHJcblx0VmlkZW8uU1VQUE9SVF9QUk9CQUJMWT1cInByb2JhYmx5XCI7XHJcblx0VmlkZW8uU1VQUE9SVF9NQVlCWT1cIm1heWJlXCI7XHJcblx0VmlkZW8uU1VQUE9SVF9OTz1cIlwiO1xyXG5cdHJldHVybiBWaWRlbztcclxufSkoU3ByaXRlKVxyXG5cclxuXHJcbi8qKlxyXG4qQHByaXZhdGVcclxuKi9cclxuLy9jbGFzcyBsYXlhLmRldmljZS5tZWRpYS5XZWJHTFZpZGVvIGV4dGVuZHMgbGF5YS5kZXZpY2UubWVkaWEuSHRtbFZpZGVvXHJcbnZhciBXZWJHTFZpZGVvPShmdW5jdGlvbihfc3VwZXIpe1xyXG5cdGZ1bmN0aW9uIFdlYkdMVmlkZW8oKXtcclxuXHRcdHRoaXMuZ2w9bnVsbDtcclxuXHRcdHRoaXMucHJlVGFyZ2V0PW51bGw7XHJcblx0XHR0aGlzLnByZVRleHR1cmU9bnVsbDtcclxuXHRcdFdlYkdMVmlkZW8uX19zdXBlci5jYWxsKHRoaXMpO1xyXG5cdFx0aWYoIVJlbmRlci5pc0NvbmNoQXBwICYmIEJyb3dzZXIub25JUGhvbmUpXHJcblx0XHRcdHJldHVybjtcclxuXHRcdHRoaXMuZ2w9LypfX0pTX18gKi9SZW5kZXIuaXNDb25jaEFwcCA/IExheWFHTENvbnRleHQuaW5zdGFuY2UgOldlYkdMLm1haW5Db250ZXh0O1xyXG5cdFx0dGhpcy5fc291cmNlPXRoaXMuZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG5cdFx0V2ViR0xDb250ZXh0LmJpbmRUZXh0dXJlKHRoaXMuZ2wsLypsYXlhLndlYmdsLldlYkdMQ29udGV4dC5URVhUVVJFXzJEKi8weDBERTEsdGhpcy5fc291cmNlKTtcclxuXHRcdHRoaXMuZ2wudGV4UGFyYW1ldGVyaSgvKmxheWEud2ViZ2wuV2ViR0xDb250ZXh0LlRFWFRVUkVfMkQqLzB4MERFMSwvKmxheWEud2ViZ2wuV2ViR0xDb250ZXh0LlRFWFRVUkVfV1JBUF9TKi8weDI4MDIsLypsYXlhLndlYmdsLldlYkdMQ29udGV4dC5DTEFNUF9UT19FREdFKi8weDgxMkYpO1xyXG5cdFx0dGhpcy5nbC50ZXhQYXJhbWV0ZXJpKC8qbGF5YS53ZWJnbC5XZWJHTENvbnRleHQuVEVYVFVSRV8yRCovMHgwREUxLC8qbGF5YS53ZWJnbC5XZWJHTENvbnRleHQuVEVYVFVSRV9XUkFQX1QqLzB4MjgwMywvKmxheWEud2ViZ2wuV2ViR0xDb250ZXh0LkNMQU1QX1RPX0VER0UqLzB4ODEyRik7XHJcblx0XHR0aGlzLmdsLnRleFBhcmFtZXRlcmkoLypsYXlhLndlYmdsLldlYkdMQ29udGV4dC5URVhUVVJFXzJEKi8weDBERTEsLypsYXlhLndlYmdsLldlYkdMQ29udGV4dC5URVhUVVJFX01BR19GSUxURVIqLzB4MjgwMCwvKmxheWEud2ViZ2wuV2ViR0xDb250ZXh0LkxJTkVBUiovMHgyNjAxKTtcclxuXHRcdHRoaXMuZ2wudGV4UGFyYW1ldGVyaSgvKmxheWEud2ViZ2wuV2ViR0xDb250ZXh0LlRFWFRVUkVfMkQqLzB4MERFMSwvKmxheWEud2ViZ2wuV2ViR0xDb250ZXh0LlRFWFRVUkVfTUlOX0ZJTFRFUiovMHgyODAxLC8qbGF5YS53ZWJnbC5XZWJHTENvbnRleHQuTElORUFSKi8weDI2MDEpO1xyXG5cdFx0V2ViR0xDb250ZXh0LmJpbmRUZXh0dXJlKHRoaXMuZ2wsLypsYXlhLndlYmdsLldlYkdMQ29udGV4dC5URVhUVVJFXzJEKi8weDBERTEsbnVsbCk7XHJcblx0fVxyXG5cclxuXHRfX2NsYXNzKFdlYkdMVmlkZW8sJ2xheWEuZGV2aWNlLm1lZGlhLldlYkdMVmlkZW8nLF9zdXBlcik7XHJcblx0dmFyIF9fcHJvdG89V2ViR0xWaWRlby5wcm90b3R5cGU7XHJcblx0Ly8ocHJlVGFyZ2V0ICYmIHByZVRleHR1cmUpJiYgKFdlYkdMQ29udGV4dC5iaW5kVGV4dHVyZShnbCxwcmVUYXJnZXQscHJlVGV4dHVyZSkpO1xyXG5cdF9fcHJvdG8udXBkYXRlVGV4dHVyZT1mdW5jdGlvbigpe1xyXG5cdFx0aWYoIVJlbmRlci5pc0NvbmNoQXBwICYmIEJyb3dzZXIub25JUGhvbmUpXHJcblx0XHRcdHJldHVybjtcclxuXHRcdFdlYkdMQ29udGV4dC5iaW5kVGV4dHVyZSh0aGlzLmdsLC8qbGF5YS53ZWJnbC5XZWJHTENvbnRleHQuVEVYVFVSRV8yRCovMHgwREUxLHRoaXMuX3NvdXJjZSk7XHJcblx0XHR0aGlzLmdsLnRleEltYWdlMkQoLypsYXlhLndlYmdsLldlYkdMQ29udGV4dC5URVhUVVJFXzJEKi8weDBERTEsMCwvKmxheWEud2ViZ2wuV2ViR0xDb250ZXh0LlJHQiovMHgxOTA3LC8qbGF5YS53ZWJnbC5XZWJHTENvbnRleHQuUkdCKi8weDE5MDcsLypsYXlhLndlYmdsLldlYkdMQ29udGV4dC5VTlNJR05FRF9CWVRFKi8weDE0MDEsdGhpcy52aWRlbyk7XHJcblx0XHRXZWJHTFZpZGVvLmN1ckJpbmRTb3VyY2U9dGhpcy5fc291cmNlO1xyXG5cdH1cclxuXHJcblx0X19wcm90by5kZXN0cm95PWZ1bmN0aW9uKCl7XHJcblx0XHRpZiAodGhpcy5fc291cmNlKXtcclxuXHRcdFx0dGhpcy5nbD0vKl9fSlNfXyAqL1JlbmRlci5pc0NvbmNoQXBwID8gTGF5YUdMQ29udGV4dC5pbnN0YW5jZSA6V2ViR0wubWFpbkNvbnRleHQ7XHJcblx0XHRcdGlmIChXZWJHTFZpZGVvLmN1ckJpbmRTb3VyY2U9PXRoaXMuX3NvdXJjZSl7XHJcblx0XHRcdFx0V2ViR0xDb250ZXh0LmJpbmRUZXh0dXJlKHRoaXMuZ2wsLypsYXlhLndlYmdsLldlYkdMQ29udGV4dC5URVhUVVJFXzJEKi8weDBERTEsbnVsbCk7XHJcblx0XHRcdFx0V2ViR0xWaWRlby5jdXJCaW5kU291cmNlPW51bGw7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5nbC5kZWxldGVUZXh0dXJlKHRoaXMuX3NvdXJjZSk7XHJcblx0XHR9XHJcblx0XHRsYXlhLnJlc291cmNlLlJlc291cmNlLnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XHJcblx0fVxyXG5cclxuXHRfX2dldHNldCgwLF9fcHJvdG8sJ19nbFRleHR1cmUnLGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5fc291cmNlO1xyXG5cdH0pO1xyXG5cclxuXHRXZWJHTFZpZGVvLmN1ckJpbmRTb3VyY2U9bnVsbDtcclxuXHRyZXR1cm4gV2ViR0xWaWRlbztcclxufSkoSHRtbFZpZGVvKVxyXG5cclxuXHJcblx0TGF5YS5fX2luaXQoW01lZGlhXSk7XHJcbn0pKHdpbmRvdyxkb2N1bWVudCxMYXlhKTtcclxuIiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXHJcbmltcG9ydCBNYWluU2NlbmUgZnJvbSBcIi4vc2NyaXB0L01haW5TY2VuZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlnIHtcclxuICAgIHN0YXRpYyBpbml0KCkge1xyXG4gICAgICAgIC8v5rOo5YaMU2NyaXB05oiW6ICFUnVudGltZeW8leeUqFxyXG4gICAgICAgIGxldCByZWcgPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XHJcblx0XHRyZWcoXCJzY3JpcHQvTWFpblNjZW5lLmpzXCIsTWFpblNjZW5lKTtcclxuICAgIH1cclxufVxyXG5HYW1lQ29uZmlnLndpZHRoID0gNjQwO1xyXG5HYW1lQ29uZmlnLmhlaWdodCA9IDExMzY7XHJcbkdhbWVDb25maWcuc2NhbGVNb2RlID1cImV4YWN0Zml0XCI7XHJcbkdhbWVDb25maWcuc2NyZWVuTW9kZSA9IFwibm9uZVwiO1xyXG5HYW1lQ29uZmlnLmFsaWduViA9IFwidG9wXCI7XHJcbkdhbWVDb25maWcuYWxpZ25IID0gXCJsZWZ0XCI7XHJcbkdhbWVDb25maWcuc3RhcnRTY2VuZSA9IFwiTWFpbi5zY2VuZVwiO1xyXG5HYW1lQ29uZmlnLnNjZW5lUm9vdCA9IFwiXCI7XHJcbkdhbWVDb25maWcuZGVidWcgPSBmYWxzZTtcclxuR2FtZUNvbmZpZy5zdGF0ID0gZmFsc2U7XHJcbkdhbWVDb25maWcucGh5c2ljc0RlYnVnID0gZmFsc2U7XHJcbkdhbWVDb25maWcuZXhwb3J0U2NlbmVUb0pzb24gPSB0cnVlO1xyXG5cclxuR2FtZUNvbmZpZy5pbml0KCk7XHJcbiIsImltcG9ydCBHYW1lQ29uZmlnIGZyb20gXCIuL0dhbWVDb25maWdcIjtcclxuY2xhc3MgTWFpbiB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHQvL+agueaNrklEReiuvue9ruWIneWni+WMluW8leaTjlx0XHRcclxuXHRcdGlmICh3aW5kb3dbXCJMYXlhM0RcIl0pIExheWEzRC5pbml0KEdhbWVDb25maWcud2lkdGgsIEdhbWVDb25maWcuaGVpZ2h0KTtcclxuXHRcdGVsc2UgTGF5YS5pbml0KEdhbWVDb25maWcud2lkdGgsIEdhbWVDb25maWcuaGVpZ2h0LCBMYXlhW1wiV2ViR0xcIl0pO1xyXG5cdFx0TGF5YVtcIlBoeXNpY3NcIl0gJiYgTGF5YVtcIlBoeXNpY3NcIl0uZW5hYmxlKCk7XHJcblx0XHRMYXlhW1wiRGVidWdQYW5lbFwiXSAmJiBMYXlhW1wiRGVidWdQYW5lbFwiXS5lbmFibGUoKTtcclxuXHRcdExheWEuc3RhZ2Uuc2NhbGVNb2RlID0gR2FtZUNvbmZpZy5zY2FsZU1vZGU7XHJcblx0XHRMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBHYW1lQ29uZmlnLnNjcmVlbk1vZGU7XHJcblx0XHRMYXlhLnN0YWdlLmFsaWduViA9IEdhbWVDb25maWcuYWxpZ25WO1xyXG5cdFx0TGF5YS5zdGFnZS5hbGlnbkggPSBHYW1lQ29uZmlnLmFsaWduSDtcclxuXHRcdC8v5YW85a655b6u5L+h5LiN5pSv5oyB5Yqg6L29c2NlbmXlkI7nvIDlnLrmma9cclxuXHRcdExheWEuVVJMLmV4cG9ydFNjZW5lVG9Kc29uID0gR2FtZUNvbmZpZy5leHBvcnRTY2VuZVRvSnNvbjtcclxuXHJcblx0XHQvL+aJk+W8gOiwg+ivlemdouadv++8iOmAmui/h0lEReiuvue9ruiwg+ivleaooeW8j++8jOaIluiAhXVybOWcsOWdgOWinuWKoGRlYnVnPXRydWXlj4LmlbDvvIzlnYflj6/miZPlvIDosIPor5XpnaLmnb/vvIlcclxuXHRcdGlmIChHYW1lQ29uZmlnLmRlYnVnIHx8IExheWEuVXRpbHMuZ2V0UXVlcnlTdHJpbmcoXCJkZWJ1Z1wiKSA9PSBcInRydWVcIikgTGF5YS5lbmFibGVEZWJ1Z1BhbmVsKCk7XHJcblx0XHRpZiAoR2FtZUNvbmZpZy5waHlzaWNzRGVidWcgJiYgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0pIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdLmVuYWJsZSgpO1xyXG5cdFx0aWYgKEdhbWVDb25maWcuc3RhdCkgTGF5YS5TdGF0LnNob3coKTtcclxuXHRcdExheWEuYWxlcnRHbG9iYWxFcnJvciA9IHRydWU7XHJcblxyXG5cdFx0Ly/mv4DmtLvotYTmupDniYjmnKzmjqfliLbvvIx2ZXJzaW9uLmpzb27nlLFJREXlj5HluIPlip/og73oh6rliqjnlJ/miJDvvIzlpoLmnpzmsqHmnInkuZ/kuI3lvbHlk43lkI7nu63mtYHnqItcclxuXHRcdExheWEuUmVzb3VyY2VWZXJzaW9uLmVuYWJsZShcInZlcnNpb24uanNvblwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25WZXJzaW9uTG9hZGVkKSwgTGF5YS5SZXNvdXJjZVZlcnNpb24uRklMRU5BTUVfVkVSU0lPTik7XHJcblx0fVxyXG5cclxuXHRvblZlcnNpb25Mb2FkZWQoKSB7XHJcblx0XHQvL+a/gOa0u+Wkp+Wwj+WbvuaYoOWwhO+8jOWKoOi9veWwj+WbvueahOaXtuWAme+8jOWmguaenOWPkeeOsOWwj+WbvuWcqOWkp+WbvuWQiOmbhumHjOmdou+8jOWImeS8mOWFiOWKoOi9veWkp+WbvuWQiOmbhu+8jOiAjOS4jeaYr+Wwj+WbvlxyXG5cdFx0TGF5YS5BdGxhc0luZm9NYW5hZ2VyLmVuYWJsZShcImZpbGVjb25maWcuanNvblwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25Db25maWdMb2FkZWQpKTtcclxuXHR9XHJcblxyXG5cdG9uQ29uZmlnTG9hZGVkKCkge1xyXG5cdFx0Ly/liqDovb1JREXmjIflrprnmoTlnLrmma9cclxuXHRcdEdhbWVDb25maWcuc3RhcnRTY2VuZSAmJiBMYXlhLlNjZW5lLm9wZW4oR2FtZUNvbmZpZy5zdGFydFNjZW5lKTtcclxuXHR9XHJcbn1cclxuLy/mv4DmtLvlkK/liqjnsbtcclxubmV3IE1haW4oKTtcclxuIiwiaW1wb3J0IFNoYWtlIGZyb20gXCIuLi8uLi9iaW4vbGlicy9sYXlhLmRldmljZVwiXHJcbmxldCBzaGFrZUNvdW50PTA7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5TY2VuZSBleHRlbmRzIExheWEuU2NlbmUge1xyXG5cclxuIFxyXG4gICAgc3RhcnRTaGFrZSgpIHtcclxuXHRcdGNvbnN0IFNoYWtlID0gTGF5YS5TaGFrZTtcclxuICAgICAgICBpZihTaGFrZT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblx0XHRTaGFrZS5pbnN0YW5jZS5zdGFydCg1LCA1MDApO1xyXG5cdFx0U2hha2UuaW5zdGFuY2Uub24oTGF5YS5FdmVudC5DSEFOR0UsIHRoaXMsIHRoaXMub25TaGFrZSk7XHJcbiAgICAgICAgLy9jb25zb2xlLnRleHQgPSAn5byA5aeL5o6l5pS26K6+5aSH5pGH5YqoXFxuJztcclxuICAgICAgICBjb25zb2xlLmxvZygn5byA5aeL5o6l5pS26K6+5aSH5pGH5YqoXFxuJyk7XHJcblx0fVxyXG5cdFxyXG5cdG9uU2hha2UoKSB7XHJcblx0XHRjb25zdCBTaGFrZSA9IExheWEuU2hha2U7XHJcblxyXG5cdFx0c2hha2VDb3VudCsrO1xyXG5cdFx0XHJcblx0XHQvL2NvbnNvbGUudGV4dCArPSBcIuiuvuWkh+aRh+aZg+S6hlwiICsgc2hha2VDb3VudCArIFwi5qyhXFxuXCI7XHJcblx0XHRjb25zb2xlLmxvZyhcIuiuvuWkh+aRh+aZg+S6hlwiICsgc2hha2VDb3VudCArIFwi5qyhXFxuXCIpO1xyXG5cdFx0bV9TaGFrZV9UZXh0LnRleHQ9c2hha2VDb3VudCtcIlwiO1xyXG5cdFx0aWYgKHNoYWtlQ291bnQgPj0gMykge1xyXG5cdFx0XHQvL1NoYWtlLmluc3RhbmNlLnN0b3AoKTtcclxuXHRcdFx0XHJcbiAgICAgICAgICAgIC8vY29uc29sZS50ZXh0ICs9IFwi5YGc5q2i5o6l5pS26K6+5aSH5pGH5YqoXCI7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ+WBnOatouaOpeaUtuiuvuWkh+aRh+WKqFxcbicpO1xyXG5cdFx0fVxyXG5cdH1cclxuICAgIGNvbnN0cnVjdG9yKCkgeyBcclxuICAgICAgICBzdXBlcigpOyBcclxuICAgICAgICB0aGlzLmxvYWRTY2VuZShcIk1haW4uc2NlbmVcIik7XHJcbiAgICAgICAgdGhpcy5zdGFydFNoYWtlKCk7XHJcblx0fVxyXG5cdG9uRW5hYmxlKCkge1xyXG5cdH1cclxufSJdfQ==
