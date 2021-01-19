(function () {
  function IframeMsgHelper(frame, targetId) {
    if (!frame) {
      throw new Error("frame is required");
    }
    if (!targetId) {
      throw new Error("targetId is required");
    }
    this.targetId = targetId;
    if (frame.constructor.name === "Window" || frame.constructor.toString() === "[object Window]") {
      this.frame = frame;
    } else if (frame.tagName === "IFRAME" || frame instanceof HTMLIFrameElement) {
      this.frame = frame.contentWindow;
    } else {
      this.frame = frame;
      console.error("frame must be window or iframe");
    }
    this.listener = {};

    this.messageHandler = (function (event) {
      var data = event.data;
      if (typeof data === "object" && data.type === "iframeMsgHelper" && data.targetId === this.targetId) {
        var listeners = this.listener[data.eventName] || [];
        for (var i = 0; i < listeners.length; i++) {
          var listener = listeners[i];
          listener.apply(this, data.data);
        }
      }
    }).bind(this);

    window.addEventListener("message", this.messageHandler);
  }

  IframeMsgHelper.prototype = {
    emit: function () {
      var event = arguments[0];
      var data = [];
      for (var i = 1; i < arguments.length; i += 1) {
        data.push(arguments[i]);
      }
      this.frame.postMessage({
        type: "iframeMsgHelper",
        targetId: this.targetId,
        eventName: event,
        data: data,
      }, "*");
      return this;
    },
    on: function (eventName, callback) {
      var listener = this.listener[eventName] || [];
      listener.push(callback);
      this.listener[eventName] = listener;
      return this;
    },
    off: function (eventName, callback) {
      var listeners = this.listener[eventName] || [];
      var newListener = [];
      for (var i = 0; i < listeners.length; i++) {
        var listener = listeners[i];
        if (listener !== callback) {
          newListener.push(listener);
        }
      }
      this.listener[eventName] = newListener;
      return this;
    },
    destroy: function () {
      window.removeEventListener("message", this.messageHandler);
      this.listener = {};
    },
  };

  window.IframeMsgHelper = IframeMsgHelper;
})();
