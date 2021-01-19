(function () {

  function setStyle(dom, css) {
    Object.keys(css).forEach(function (styleProp) {
      dom.style[styleProp] = css[styleProp];
    });
  }

  function createFrame(frameStyle) {
    var frameBackground = document.createElement("div");
    setStyle(frameBackground, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "transform 300ms, opacity 300ms",
      zIndex: 10000000,
      userSelect: "none",
    });
    var frame = document.createElement("div");
    setStyle(frame, Object.assign({
      width: "80%",
      height: "80%",
      backgroundColor: "#FFFFFF",
      display: "flex",
      flexDirection: "column",
      transition: "transform 300ms, opacity 300ms",
      borderRadius: "4px",
      boxShadow: "1px 1px 10px 2px rgba(0,0,0,0.05)",
      overflow: "hidden",
    }, frameStyle));
    frameBackground.frame = frame;
    frameBackground.appendChild(frame);

    var titleBar = document.createElement("div");
    setStyle(titleBar, {
      width: "100%",
      height: "30px",
      backgroundColor: "#FFFFFF",
      display: "flex",
      alignItems: "center",
      borderBottom: "1px solid #CCCCCC",
      overflow: "hidden",
    });
    frameBackground.titleBar = titleBar;
    frame.appendChild(titleBar);

    var flex = document.createElement("div");
    flex.style.flex = "1";
    titleBar.appendChild(flex);

    var closeBtn = document.createElement("div");
    setStyle(closeBtn, {
      cursor: "pointer",
      width: "40px",
      fontSize: "30px",
      lineHeight: "30px",
      textAlign: "center",
      paddingBottom: "5px",
      transition: "color 300ms, background-color 300ms",
      color: "#999999",
      backgroundColor: "#FFFFFF",
    });
    closeBtn.onmouseenter = function () {
      setStyle(closeBtn, {
        color: "#FFFFFF",
        backgroundColor: "#FF4433",
      });
    };
    closeBtn.onmouseleave = function () {
      setStyle(closeBtn, {
        color: "#999999",
        backgroundColor: "#FFFFFF",
      });
    };
    closeBtn.innerText = "×";
    frameBackground.closeBtn = closeBtn;
    titleBar.appendChild(closeBtn);

    var iframe = document.createElement("iframe");
    setStyle(iframe, {
      width: "100%",
      flex: "1",
      border: "none",
    });
    iframe.src = "/__cbdui";
    frameBackground.iframe = iframe;
    frame.appendChild(iframe);

    return frameBackground;
  }

  var _frameHolder;
  var _frameShow = false;

  function show() {
    if (_frameHolder) {
      _frameShow = true;
      var routePath = sessionStorage.getItem("__cbdui_route_path");
      if (!routePath || routePath === "/home") {
        if (window.iframeMessager) {
          window.iframeMessager.emit("home");
        }
      }
      setStyle(_frameHolder, { opacity: "1", pointerEvents: "" });
      setStyle(_frameHolder.frame, { transform: "translate(0, 0) scale(1)" });
    }
  }

  function hide() {
    if (_frameHolder) {
      _frameShow = false;
      setStyle(_frameHolder, { opacity: "0", pointerEvents: "none" });
      setStyle(_frameHolder.frame, { transform: "translate(0, 100%) scale(0.3)" });
    }
  }

  function toggle() {
    if (_frameShow) {
      hide();
    } else {
      show();
    }
  }

  window.__cbduiInit = function (config) {
    delete window.__cbduiInit;

    // console.log(config);


    _frameHolder = createFrame(config.frameStyle || {});
    hide();
    document.body.appendChild(_frameHolder);

    _frameHolder.closeBtn.onclick = hide;
    _frameHolder.onclick = function (e) {
      if (e.target === _frameHolder) {
        hide();
      }
    };

    window.addEventListener("keydown", function (event) {
      var triggerKeys = config.triggerKeys;
      var platform = config.platform;
      if (
        event.altKey === !!triggerKeys[platform].altKey &&
        event.ctrlKey === !!triggerKeys[platform].ctrlKey &&
        event.metaKey === !!triggerKeys[platform].metaKey &&
        event.shiftKey === !!triggerKeys[platform].shiftKey &&
        event.key === triggerKeys[platform].key
      ) {
        event.preventDefault();
        toggle();
      }
    });

    if (window.IframeMsgHelper) {
      window.iframeMessager = new IframeMsgHelper(_frameHolder.iframe, "__cbdui")
        .on("config", function (data) {
          config = data;
        })
        .on("hideFrame", function () {
          hide();
          window.focus();
        });
    }


    if (!sessionStorage.getItem("__cbdui_first_tips")) {
      sessionStorage.setItem("__cbdui_first_tips", "true");
      /* 弹出提示 */
      var tips = document.createElement("div");
      setStyle(tips, {
        borderRadius: "5px",
        padding: "10px",
        backgroundColor: "rgba(30,30,30,0.6)",
        color: "#FFFFFF",
        transform: "translate(-50%, 100%)",
        transition: "transform 300ms, opacity 300ms",
        opacity: "0",
        position: "fixed",
        left: "50%",
        bottom: "30px",
        zIndex: "10000000",
        cursor: "pointer",
      });
      var triggerKeys = config.triggerKeys;
      var platform = config.platform;
      var triggerKey = triggerKeys[platform];
      if (triggerKey.key) {
        var tipsArr = [];
        if (triggerKey.ctrlKey) {
          tipsArr.push("Ctrl");
        }
        if (triggerKey.metaKey) {
          tipsArr.push("Command");
        }
        if (triggerKey.shiftKey) {
          tipsArr.push("Shift");
        }
        if (triggerKey.altKey) {
          tipsArr.push("Alt");
        }
        tipsArr.push(triggerKey.key.toUpperCase());
        tips.innerText = "提示：使用快捷键 " + tipsArr.join(" + ") + " 唤起CBD-UI";
        document.body.appendChild(tips);
        setTimeout(function () {
          setStyle(tips, {
            transform: "translate(-50%, 0)",
            opacity: "1",
          });
        });

        setTimeout(function () {
          setStyle(tips, {
            transform: "translate(-50%, 100%)",
            opacity: "0",
          });
          setTimeout(function () {
            document.body.removeChild(tips);
            tips = undefined;
          }, 500);
        }, 5000);
      }
    }
  };
})();
