/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./images/weatherBackground.jpg */ "./src/images/weatherBackground.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
  margin: 0;
  padding: 0;
  color: white;
  font-family: montserrat,sans-serif;
}

html, body {
  height: 100vh;
  width: 100vw;
  overflow-y: hidden;
  overflow-x: hidden;
}

body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

html {
  background-color: gray;
}

#backgroundContainer {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  height: 100vh;
  width: 100vw;

  background: linear-gradient(
    rgba(0, 0, 0, 0.164), 
    rgba(0, 0, 0, 0.7)
  ),
  url(${___CSS_LOADER_URL_REPLACEMENT_0___});
  background-size: cover;
  background-repeat:no-repeat;
  background-position: center center;
}

#mainContainer {
  height: 90%;
  width: 90%;

  display: grid;
  grid-template: 2fr 1fr / 1fr 1fr;
}

/* Upper Left Display */

#upperLeft {
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
  gap: 15px;
}

#mainForecast, #mainTemperature {
  font-size: 3rem;
  font-weight: bold;
}

#mainTemperature {
  font-size: 3.5rem;
}

#location, #date, #time {
  font-size: 1.1rem;
}

button {
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
}

#switchTemperatureButton {
  font-weight: bold;
}

#mainIcon {
  width: 60px;
  height: 60px;
  padding: 10px 0px;
  /* border: 1px solid white; */
}

#searchContainer {
  display: flex;
  position: relative;
  border-bottom: 2px solid white;
  width: 200px;
}

#searchIconContainer {
  width: 1.3rem;
  position: relative;
  left: 10px;
}

input[type="text"] {
  width: 160px;
  height: 1.1rem;
  border: none;
  /* border-bottom: 2px solid white; */
  background-color: transparent;
  text-indent: 7px;
  font-size: 0.9rem;
  padding: 2px;
}

input[type="text"]::placeholder {
  color: white;
}

input[type="text"]:focus {
  outline-width: 0;
}

/* Upper Right Display */

#upperRight {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

#alignRight {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.upperRightContainer {
  display: flex;
  gap: 10px;
  /* border: 1px solid red; */
}

.upperRightContainer > div > p {
  margin-bottom: 5px;
}

.iconContainer {
  width: 3rem;
}

.upperLeftText {
  font-size: 1.1rem;
}

/* Footer */

#footer {
  grid-column: 1 / 3;
  /* border: 1px solid blue; */
  display: flex;
  flex-direction: column;

}

#dailyHourlyContainer {
  display: flex;
  gap: 10px;
}

#dailyHourlyContainer button {
  /* border: 1px solid white; */
  padding: 5px;
  border-radius: 5px;
}

#dailyButton {
  border: 1px solid white;
}

#dailyForecastGrid {
  display: grid;
  grid-template: 1fr / repeat(7, 1fr);
  flex: 1;
  /* border: 1px solid red; */
  
}

.dayCard {
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

#dayName {
  font-size: 1.4rem;
}

#dayMaxTemp {
  font-size: 1.6rem;
  font-weight: bold;
}

#dayMinTemp {
  font-size: 0.9rem;
}

#dayIcon {
  width: 70px;
}

.testBorder {
  border: 1px solid white;
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,UAAU;EACV,YAAY;EACZ,kCAAkC;AACpC;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,aAAa;EACb,YAAY;;EAEZ;;;;yCAIqC;EACrC,sBAAsB;EACtB,2BAA2B;EAC3B,kCAAkC;AACpC;;AAEA;EACE,WAAW;EACX,UAAU;;EAEV,aAAa;EACb,gCAAgC;AAClC;;AAEA,uBAAuB;;AAEvB;EACE,aAAa;EACb,sBAAsB;EACtB,2BAA2B;EAC3B,SAAS;AACX;;AAEA;EACE,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;CACC,gBAAgB;CAChB,cAAc;CACd,YAAY;CACZ,UAAU;CACV,aAAa;CACb,eAAe;CACf,gBAAgB;AACjB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,6BAA6B;AAC/B;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,8BAA8B;EAC9B,YAAY;AACd;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,UAAU;AACZ;;AAEA;EACE,YAAY;EACZ,cAAc;EACd,YAAY;EACZ,oCAAoC;EACpC,6BAA6B;EAC7B,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,gBAAgB;AAClB;;AAEA,wBAAwB;;AAExB;EACE,aAAa;EACb,sBAAsB;EACtB,qBAAqB;AACvB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,SAAS;EACT,2BAA2B;AAC7B;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,iBAAiB;AACnB;;AAEA,WAAW;;AAEX;EACE,kBAAkB;EAClB,4BAA4B;EAC5B,aAAa;EACb,sBAAsB;;AAExB;;AAEA;EACE,aAAa;EACb,SAAS;AACX;;AAEA;EACE,6BAA6B;EAC7B,YAAY;EACZ,kBAAkB;AACpB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,mCAAmC;EACnC,OAAO;EACP,2BAA2B;;AAE7B;;AAEA;EACE,2BAA2B;EAC3B,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,SAAS;AACX;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,iBAAiB;EACjB,iBAAiB;AACnB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,uBAAuB;AACzB","sourcesContent":["* {\r\n  margin: 0;\r\n  padding: 0;\r\n  color: white;\r\n  font-family: montserrat,sans-serif;\r\n}\r\n\r\nhtml, body {\r\n  height: 100vh;\r\n  width: 100vw;\r\n  overflow-y: hidden;\r\n  overflow-x: hidden;\r\n}\r\n\r\nbody {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\nhtml {\r\n  background-color: gray;\r\n}\r\n\r\n#backgroundContainer {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  z-index: -1;\r\n  height: 100vh;\r\n  width: 100vw;\r\n\r\n  background: linear-gradient(\r\n    rgba(0, 0, 0, 0.164), \r\n    rgba(0, 0, 0, 0.7)\r\n  ),\r\n  url(\"./images/weatherBackground.jpg\");\r\n  background-size: cover;\r\n  background-repeat:no-repeat;\r\n  background-position: center center;\r\n}\r\n\r\n#mainContainer {\r\n  height: 90%;\r\n  width: 90%;\r\n\r\n  display: grid;\r\n  grid-template: 2fr 1fr / 1fr 1fr;\r\n}\r\n\r\n/* Upper Left Display */\r\n\r\n#upperLeft {\r\n  display: flex;\r\n  flex-direction: column;\r\n  /* border: 1px solid red; */\r\n  gap: 15px;\r\n}\r\n\r\n#mainForecast, #mainTemperature {\r\n  font-size: 3rem;\r\n  font-weight: bold;\r\n}\r\n\r\n#mainTemperature {\r\n  font-size: 3.5rem;\r\n}\r\n\r\n#location, #date, #time {\r\n  font-size: 1.1rem;\r\n}\r\n\r\nbutton {\r\n\tbackground: none;\r\n\tcolor: inherit;\r\n\tborder: none;\r\n\tpadding: 0;\r\n\tfont: inherit;\r\n\tcursor: pointer;\r\n\toutline: inherit;\r\n}\r\n\r\n#switchTemperatureButton {\r\n  font-weight: bold;\r\n}\r\n\r\n#mainIcon {\r\n  width: 60px;\r\n  height: 60px;\r\n  padding: 10px 0px;\r\n  /* border: 1px solid white; */\r\n}\r\n\r\n#searchContainer {\r\n  display: flex;\r\n  position: relative;\r\n  border-bottom: 2px solid white;\r\n  width: 200px;\r\n}\r\n\r\n#searchIconContainer {\r\n  width: 1.3rem;\r\n  position: relative;\r\n  left: 10px;\r\n}\r\n\r\ninput[type=\"text\"] {\r\n  width: 160px;\r\n  height: 1.1rem;\r\n  border: none;\r\n  /* border-bottom: 2px solid white; */\r\n  background-color: transparent;\r\n  text-indent: 7px;\r\n  font-size: 0.9rem;\r\n  padding: 2px;\r\n}\r\n\r\ninput[type=\"text\"]::placeholder {\r\n  color: white;\r\n}\r\n\r\ninput[type=\"text\"]:focus {\r\n  outline-width: 0;\r\n}\r\n\r\n/* Upper Right Display */\r\n\r\n#upperRight {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: flex-end;\r\n}\r\n\r\n#alignRight {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 30px;\r\n}\r\n\r\n.upperRightContainer {\r\n  display: flex;\r\n  gap: 10px;\r\n  /* border: 1px solid red; */\r\n}\r\n\r\n.upperRightContainer > div > p {\r\n  margin-bottom: 5px;\r\n}\r\n\r\n.iconContainer {\r\n  width: 3rem;\r\n}\r\n\r\n.upperLeftText {\r\n  font-size: 1.1rem;\r\n}\r\n\r\n/* Footer */\r\n\r\n#footer {\r\n  grid-column: 1 / 3;\r\n  /* border: 1px solid blue; */\r\n  display: flex;\r\n  flex-direction: column;\r\n\r\n}\r\n\r\n#dailyHourlyContainer {\r\n  display: flex;\r\n  gap: 10px;\r\n}\r\n\r\n#dailyHourlyContainer button {\r\n  /* border: 1px solid white; */\r\n  padding: 5px;\r\n  border-radius: 5px;\r\n}\r\n\r\n#dailyButton {\r\n  border: 1px solid white;\r\n}\r\n\r\n#dailyForecastGrid {\r\n  display: grid;\r\n  grid-template: 1fr / repeat(7, 1fr);\r\n  flex: 1;\r\n  /* border: 1px solid red; */\r\n  \r\n}\r\n\r\n.dayCard {\r\n  /* border: 1px solid red; */\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  align-items: center;\r\n  gap: 10px;\r\n}\r\n\r\n#dayName {\r\n  font-size: 1.4rem;\r\n}\r\n\r\n#dayMaxTemp {\r\n  font-size: 1.6rem;\r\n  font-weight: bold;\r\n}\r\n\r\n#dayMinTemp {\r\n  font-size: 0.9rem;\r\n}\r\n\r\n#dayIcon {\r\n  width: 70px;\r\n}\r\n\r\n.testBorder {\r\n  border: 1px solid white;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/images/feelsLikeIcon.svg":
/*!**************************************!*\
  !*** ./src/images/feelsLikeIcon.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a76cbc057d1734738c3a.svg";

/***/ }),

/***/ "./src/images/humidityIcon.svg":
/*!*************************************!*\
  !*** ./src/images/humidityIcon.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "285012c48709b595dccd.svg";

/***/ }),

/***/ "./src/images/precipitationIcon.svg":
/*!******************************************!*\
  !*** ./src/images/precipitationIcon.svg ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "eb8125f7ed77abf01963.svg";

/***/ }),

/***/ "./src/images/searchIcon.svg":
/*!***********************************!*\
  !*** ./src/images/searchIcon.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "d46c1d565eac631fdac5.svg";

/***/ }),

/***/ "./src/images/weatherBackground.jpg":
/*!******************************************!*\
  !*** ./src/images/weatherBackground.jpg ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "7bae6e94fa88265ada67.jpg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/clearSkyCropped.svg":
/*!****************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/clearSkyCropped.svg ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "c3fa66f40127756c5343.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/drizzleCropped.svg":
/*!***************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/drizzleCropped.svg ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "3a7ae8f3521304f1d514.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/foggyCropped.svg":
/*!*************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/foggyCropped.svg ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e9dca14f2729654c05b5.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/freezingDrizzleCropped.svg":
/*!***********************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/freezingDrizzleCropped.svg ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a01fefe66a9531096371.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/freezingRainCropped.svg":
/*!********************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/freezingRainCropped.svg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "5175bf8ad121ddf62b02.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/partlyCloudyCropped.svg":
/*!********************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/partlyCloudyCropped.svg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a831295d93ec49f4f460.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/rainCropped.svg":
/*!************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/rainCropped.svg ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "c43a8eaaa172bd14a4e8.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/rainShowersCropped.svg":
/*!*******************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/rainShowersCropped.svg ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ef03d3660182539936f9.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/snowGrainsCropped.svg":
/*!******************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/snowGrainsCropped.svg ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "5a84ad51327f6ee2805e.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/snowShowersCropped.svg":
/*!*******************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/snowShowersCropped.svg ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "3d6299dd0f1989a52d82.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/snowfallCropped.svg":
/*!****************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/snowfallCropped.svg ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "90ac81ea5040c97b2094.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/thunderStormBothCropped.svg":
/*!************************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/thunderStormBothCropped.svg ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "1844d34a98ef770748e4.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/clearSky.svg":
/*!**************************************************!*\
  !*** ./src/images/weatherCodeIcons/clearSky.svg ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "57115272e13f63d2b6eb.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/drizzle.svg":
/*!*************************************************!*\
  !*** ./src/images/weatherCodeIcons/drizzle.svg ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "eaa047ffecc293178e8b.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/foggy.svg":
/*!***********************************************!*\
  !*** ./src/images/weatherCodeIcons/foggy.svg ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a6cb1a62bf26dff88673.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/freezingDrizzle.svg":
/*!*********************************************************!*\
  !*** ./src/images/weatherCodeIcons/freezingDrizzle.svg ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a6c557e6f6c1be983599.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/freezingRain.svg":
/*!******************************************************!*\
  !*** ./src/images/weatherCodeIcons/freezingRain.svg ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e0afcc3dbb38db0f744a.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/partlyCloudy.svg":
/*!******************************************************!*\
  !*** ./src/images/weatherCodeIcons/partlyCloudy.svg ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "132deb8460c23708c06c.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/rain.svg":
/*!**********************************************!*\
  !*** ./src/images/weatherCodeIcons/rain.svg ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "283ea8b5f692002ac283.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/rainShowers.svg":
/*!*****************************************************!*\
  !*** ./src/images/weatherCodeIcons/rainShowers.svg ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "989db99cbd4c524458e1.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/snowGrains.svg":
/*!****************************************************!*\
  !*** ./src/images/weatherCodeIcons/snowGrains.svg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a6c557e6f6c1be983599.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/snowShowers.svg":
/*!*****************************************************!*\
  !*** ./src/images/weatherCodeIcons/snowShowers.svg ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "bafa4a458f7f6f723324.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/snowfall.svg":
/*!**************************************************!*\
  !*** ./src/images/weatherCodeIcons/snowfall.svg ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "d4fa716f7b0121462f6c.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/thunderStormBoth.svg":
/*!**********************************************************!*\
  !*** ./src/images/weatherCodeIcons/thunderStormBoth.svg ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "439bc95ff0ee4edc085e.svg";

/***/ }),

/***/ "./src/images/windIcon.svg":
/*!*********************************!*\
  !*** ./src/images/windIcon.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "2801ccc432fcc717bc51.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _images_searchIcon_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images/searchIcon.svg */ "./src/images/searchIcon.svg");
/* harmony import */ var _images_feelsLikeIcon_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images/feelsLikeIcon.svg */ "./src/images/feelsLikeIcon.svg");
/* harmony import */ var _images_humidityIcon_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./images/humidityIcon.svg */ "./src/images/humidityIcon.svg");
/* harmony import */ var _images_precipitationIcon_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./images/precipitationIcon.svg */ "./src/images/precipitationIcon.svg");
/* harmony import */ var _images_windIcon_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./images/windIcon.svg */ "./src/images/windIcon.svg");
/* harmony import */ var _images_weatherCodeIcons_clearSky_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./images/weatherCodeIcons/clearSky.svg */ "./src/images/weatherCodeIcons/clearSky.svg");
/* harmony import */ var _images_weatherCodeIcons_partlyCloudy_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./images/weatherCodeIcons/partlyCloudy.svg */ "./src/images/weatherCodeIcons/partlyCloudy.svg");
/* harmony import */ var _images_weatherCodeIcons_foggy_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./images/weatherCodeIcons/foggy.svg */ "./src/images/weatherCodeIcons/foggy.svg");
/* harmony import */ var _images_weatherCodeIcons_drizzle_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./images/weatherCodeIcons/drizzle.svg */ "./src/images/weatherCodeIcons/drizzle.svg");
/* harmony import */ var _images_weatherCodeIcons_freezingDrizzle_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./images/weatherCodeIcons/freezingDrizzle.svg */ "./src/images/weatherCodeIcons/freezingDrizzle.svg");
/* harmony import */ var _images_weatherCodeIcons_rain_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./images/weatherCodeIcons/rain.svg */ "./src/images/weatherCodeIcons/rain.svg");
/* harmony import */ var _images_weatherCodeIcons_freezingRain_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./images/weatherCodeIcons/freezingRain.svg */ "./src/images/weatherCodeIcons/freezingRain.svg");
/* harmony import */ var _images_weatherCodeIcons_snowfall_svg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./images/weatherCodeIcons/snowfall.svg */ "./src/images/weatherCodeIcons/snowfall.svg");
/* harmony import */ var _images_weatherCodeIcons_snowGrains_svg__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./images/weatherCodeIcons/snowGrains.svg */ "./src/images/weatherCodeIcons/snowGrains.svg");
/* harmony import */ var _images_weatherCodeIcons_rainShowers_svg__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./images/weatherCodeIcons/rainShowers.svg */ "./src/images/weatherCodeIcons/rainShowers.svg");
/* harmony import */ var _images_weatherCodeIcons_snowShowers_svg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./images/weatherCodeIcons/snowShowers.svg */ "./src/images/weatherCodeIcons/snowShowers.svg");
/* harmony import */ var _images_weatherCodeIcons_thunderStormBoth_svg__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./images/weatherCodeIcons/thunderStormBoth.svg */ "./src/images/weatherCodeIcons/thunderStormBoth.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_clearSkyCropped_svg__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/clearSkyCropped.svg */ "./src/images/weatherCodeIconsCropped/clearSkyCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_partlyCloudyCropped_svg__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/partlyCloudyCropped.svg */ "./src/images/weatherCodeIconsCropped/partlyCloudyCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_foggyCropped_svg__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/foggyCropped.svg */ "./src/images/weatherCodeIconsCropped/foggyCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_drizzleCropped_svg__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/drizzleCropped.svg */ "./src/images/weatherCodeIconsCropped/drizzleCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_freezingDrizzleCropped_svg__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/freezingDrizzleCropped.svg */ "./src/images/weatherCodeIconsCropped/freezingDrizzleCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_rainCropped_svg__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/rainCropped.svg */ "./src/images/weatherCodeIconsCropped/rainCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_freezingRainCropped_svg__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/freezingRainCropped.svg */ "./src/images/weatherCodeIconsCropped/freezingRainCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_snowfallCropped_svg__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/snowfallCropped.svg */ "./src/images/weatherCodeIconsCropped/snowfallCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_snowGrainsCropped_svg__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/snowGrainsCropped.svg */ "./src/images/weatherCodeIconsCropped/snowGrainsCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_rainShowersCropped_svg__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/rainShowersCropped.svg */ "./src/images/weatherCodeIconsCropped/rainShowersCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_snowShowersCropped_svg__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/snowShowersCropped.svg */ "./src/images/weatherCodeIconsCropped/snowShowersCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_thunderStormBothCropped_svg__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/thunderStormBothCropped.svg */ "./src/images/weatherCodeIconsCropped/thunderStormBothCropped.svg");






// import backgroud from "./images/weatherBackground.jpg";
// import testImage from "./images/testImage.png";
// import getWeatherData from "./apiHandler";

// Weather Icons













// Cropped Weather Icons












const weatherIcons = [_images_weatherCodeIcons_clearSky_svg__WEBPACK_IMPORTED_MODULE_6__, _images_weatherCodeIcons_partlyCloudy_svg__WEBPACK_IMPORTED_MODULE_7__, _images_weatherCodeIcons_foggy_svg__WEBPACK_IMPORTED_MODULE_8__, _images_weatherCodeIcons_drizzle_svg__WEBPACK_IMPORTED_MODULE_9__, _images_weatherCodeIcons_freezingDrizzle_svg__WEBPACK_IMPORTED_MODULE_10__, _images_weatherCodeIcons_rain_svg__WEBPACK_IMPORTED_MODULE_11__, _images_weatherCodeIcons_freezingRain_svg__WEBPACK_IMPORTED_MODULE_12__, _images_weatherCodeIcons_snowfall_svg__WEBPACK_IMPORTED_MODULE_13__, _images_weatherCodeIcons_snowGrains_svg__WEBPACK_IMPORTED_MODULE_14__, _images_weatherCodeIcons_rainShowers_svg__WEBPACK_IMPORTED_MODULE_15__, _images_weatherCodeIcons_snowShowers_svg__WEBPACK_IMPORTED_MODULE_16__, _images_weatherCodeIcons_thunderStormBoth_svg__WEBPACK_IMPORTED_MODULE_17__];
const weatherIconsCropped = [_images_weatherCodeIconsCropped_clearSkyCropped_svg__WEBPACK_IMPORTED_MODULE_18__, _images_weatherCodeIconsCropped_partlyCloudyCropped_svg__WEBPACK_IMPORTED_MODULE_19__, _images_weatherCodeIconsCropped_foggyCropped_svg__WEBPACK_IMPORTED_MODULE_20__, _images_weatherCodeIconsCropped_drizzleCropped_svg__WEBPACK_IMPORTED_MODULE_21__, _images_weatherCodeIconsCropped_freezingDrizzleCropped_svg__WEBPACK_IMPORTED_MODULE_22__, _images_weatherCodeIconsCropped_rainCropped_svg__WEBPACK_IMPORTED_MODULE_23__, _images_weatherCodeIconsCropped_freezingRainCropped_svg__WEBPACK_IMPORTED_MODULE_24__, _images_weatherCodeIconsCropped_snowfallCropped_svg__WEBPACK_IMPORTED_MODULE_25__, _images_weatherCodeIconsCropped_snowGrainsCropped_svg__WEBPACK_IMPORTED_MODULE_26__, _images_weatherCodeIconsCropped_rainShowersCropped_svg__WEBPACK_IMPORTED_MODULE_27__, _images_weatherCodeIconsCropped_snowShowersCropped_svg__WEBPACK_IMPORTED_MODULE_28__, _images_weatherCodeIconsCropped_thunderStormBothCropped_svg__WEBPACK_IMPORTED_MODULE_29__];

// function component() {
//   // Test CSS
//   const element = document.createElement("div");
//   element.innerHTML = "Testing...";
//   element.classList.add("hello");

//   // Test Asset loader
//   const imageElement = new Image();
//   imageElement.src = testImage;
//   element.appendChild(imageElement);

//   // Test source map --> uncomment to test tracking
//   // cosnole.log('I get called from print.js!');

//   // Test Eslint --> uncomment to see suggestions
//   // if (true) {}

//   return element;
// }
// document.body.appendChild(component());

// Move these to dom?

function renderImage(parent, image) {
  const imageElement = new Image();
  imageElement.src = image;
  // imageElement.classList.add("testBorder");
  parent.appendChild(imageElement);
}
function renderIcons() {
  // Searchbar icon
  const searchIconContainer = document.getElementById("searchIconContainer");
  renderImage(searchIconContainer, _images_searchIcon_svg__WEBPACK_IMPORTED_MODULE_1__);

  // Upper right icons
  const feelsLikeContainer = document.getElementById("feelsLikeIcon");
  renderImage(feelsLikeContainer, _images_feelsLikeIcon_svg__WEBPACK_IMPORTED_MODULE_2__);
  const humidityContainer = document.getElementById("humidityIcon");
  renderImage(humidityContainer, _images_humidityIcon_svg__WEBPACK_IMPORTED_MODULE_3__);
  const precipitationContainer = document.getElementById("precipitationIcon");
  renderImage(precipitationContainer, _images_precipitationIcon_svg__WEBPACK_IMPORTED_MODULE_4__);
  const windSpeedContainer = document.getElementById("windSpeedIcon");
  renderImage(windSpeedContainer, _images_windIcon_svg__WEBPACK_IMPORTED_MODULE_5__);
}
function interpretWeatherCode(code, cropped) {
  let imagesToUse = weatherIcons;
  if (cropped) {
    imagesToUse = weatherIconsCropped;
  }
  switch (code) {
    case 0:
      return imagesToUse[0];
    case 1:
    case 2:
    case 3:
      return imagesToUse[1];
    case 45:
    case 48:
      return imagesToUse[2];
    case 51:
    case 53:
    case 55:
      return imagesToUse[3];
    case 56:
    case 57:
      return imagesToUse[4];
    case 61:
    case 63:
    case 65:
      return imagesToUse[5];
    case 66:
    case 67:
      return imagesToUse[6];
    case 71:
    case 73:
    case 75:
      return imagesToUse[7];
    case 77:
      return imagesToUse[8];
    case 80:
    case 81:
    case 82:
      return imagesToUse[9];
    case 85:
    case 86:
      return imagesToUse[10];
    case 95:
    case 96:
    case 99:
      return imagesToUse[11];
    default:
      return imagesToUse[0];
  }
}
function renderForecastIcons(iconCodes) {
  const dayCardsCollection = document.getElementsByClassName("dayCard");
  for (let i = 0; i < dayCardsCollection.length; i += 1) {
    const dayIconContainer = dayCardsCollection[i].children[dayCardsCollection[i].children.length - 1];
    renderImage(dayIconContainer, interpretWeatherCode(iconCodes[i], false));
  }
}
function renderCurrentIcon(iconCode) {
  const mainIconContainer = document.getElementById("mainIcon");
  renderImage(mainIconContainer, interpretWeatherCode(iconCode, true));
}
renderIcons();
renderCurrentIcon(51);
renderForecastIcons([71, 77, 80, 85, 95, 61, 66]);
// getWeatherData("new york city");
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDO0VBQ3pCO0FBQ0Y7QUFFQSxTQUFTQyxtQkFBbUJBLENBQUNDLFNBQVMsRUFBRTtFQUN0QyxNQUFNQyxrQkFBa0IsR0FBR1osUUFBUSxDQUFDYSxzQkFBc0IsQ0FBQyxTQUFTLENBQUM7RUFDckUsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdGLGtCQUFrQixDQUFDRyxNQUFNLEVBQUVELENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDckQsTUFBTUUsZ0JBQWdCLEdBQ3BCSixrQkFBa0IsQ0FBQ0UsQ0FBQyxDQUFDLENBQUNHLFFBQVEsQ0FBQ0wsa0JBQWtCLENBQUNFLENBQUMsQ0FBQyxDQUFDRyxRQUFRLENBQUNGLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDM0V4QixXQUFXLENBQUN5QixnQkFBZ0IsRUFBRVYsb0JBQW9CLENBQUNLLFNBQVMsQ0FBQ0csQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7RUFDMUU7QUFDRjtBQUVBLFNBQVNJLGlCQUFpQkEsQ0FBQ0MsUUFBUSxFQUFFO0VBQ25DLE1BQU1DLGlCQUFpQixHQUFHcEIsUUFBUSxDQUFDQyxjQUFjLENBQUMsVUFBVSxDQUFDO0VBQzdEVixXQUFXLENBQUM2QixpQkFBaUIsRUFBRWQsb0JBQW9CLENBQUNhLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN0RTtBQUVBckIsV0FBVyxDQUFDLENBQUM7QUFDYm9CLGlCQUFpQixDQUFDLEVBQUUsQ0FBQztBQUNyQlIsbUJBQW1CLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNqRCxtQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2ltYWdlcy93ZWF0aGVyQmFja2dyb3VuZC5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCoge1xyXG4gIG1hcmdpbjogMDtcclxuICBwYWRkaW5nOiAwO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBmb250LWZhbWlseTogbW9udHNlcnJhdCxzYW5zLXNlcmlmO1xyXG59XHJcblxyXG5odG1sLCBib2R5IHtcclxuICBoZWlnaHQ6IDEwMHZoO1xyXG4gIHdpZHRoOiAxMDB2dztcclxuICBvdmVyZmxvdy15OiBoaWRkZW47XHJcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG59XHJcblxyXG5ib2R5IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuaHRtbCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcclxufVxyXG5cclxuI2JhY2tncm91bmRDb250YWluZXIge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMDtcclxuICB6LWluZGV4OiAtMTtcclxuICBoZWlnaHQ6IDEwMHZoO1xyXG4gIHdpZHRoOiAxMDB2dztcclxuXHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxyXG4gICAgcmdiYSgwLCAwLCAwLCAwLjE2NCksIFxyXG4gICAgcmdiYSgwLCAwLCAwLCAwLjcpXHJcbiAgKSxcclxuICB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSk7XHJcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICBiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7XHJcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcclxufVxyXG5cclxuI21haW5Db250YWluZXIge1xyXG4gIGhlaWdodDogOTAlO1xyXG4gIHdpZHRoOiA5MCU7XHJcblxyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZTogMmZyIDFmciAvIDFmciAxZnI7XHJcbn1cclxuXHJcbi8qIFVwcGVyIExlZnQgRGlzcGxheSAqL1xyXG5cclxuI3VwcGVyTGVmdCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIC8qIGJvcmRlcjogMXB4IHNvbGlkIHJlZDsgKi9cclxuICBnYXA6IDE1cHg7XHJcbn1cclxuXHJcbiNtYWluRm9yZWNhc3QsICNtYWluVGVtcGVyYXR1cmUge1xyXG4gIGZvbnQtc2l6ZTogM3JlbTtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuI21haW5UZW1wZXJhdHVyZSB7XHJcbiAgZm9udC1zaXplOiAzLjVyZW07XHJcbn1cclxuXHJcbiNsb2NhdGlvbiwgI2RhdGUsICN0aW1lIHtcclxuICBmb250LXNpemU6IDEuMXJlbTtcclxufVxyXG5cclxuYnV0dG9uIHtcclxuXHRiYWNrZ3JvdW5kOiBub25lO1xyXG5cdGNvbG9yOiBpbmhlcml0O1xyXG5cdGJvcmRlcjogbm9uZTtcclxuXHRwYWRkaW5nOiAwO1xyXG5cdGZvbnQ6IGluaGVyaXQ7XHJcblx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdG91dGxpbmU6IGluaGVyaXQ7XHJcbn1cclxuXHJcbiNzd2l0Y2hUZW1wZXJhdHVyZUJ1dHRvbiB7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbiNtYWluSWNvbiB7XHJcbiAgd2lkdGg6IDYwcHg7XHJcbiAgaGVpZ2h0OiA2MHB4O1xyXG4gIHBhZGRpbmc6IDEwcHggMHB4O1xyXG4gIC8qIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlOyAqL1xyXG59XHJcblxyXG4jc2VhcmNoQ29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBib3JkZXItYm90dG9tOiAycHggc29saWQgd2hpdGU7XHJcbiAgd2lkdGg6IDIwMHB4O1xyXG59XHJcblxyXG4jc2VhcmNoSWNvbkNvbnRhaW5lciB7XHJcbiAgd2lkdGg6IDEuM3JlbTtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgbGVmdDogMTBweDtcclxufVxyXG5cclxuaW5wdXRbdHlwZT1cInRleHRcIl0ge1xyXG4gIHdpZHRoOiAxNjBweDtcclxuICBoZWlnaHQ6IDEuMXJlbTtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgLyogYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHdoaXRlOyAqL1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gIHRleHQtaW5kZW50OiA3cHg7XHJcbiAgZm9udC1zaXplOiAwLjlyZW07XHJcbiAgcGFkZGluZzogMnB4O1xyXG59XHJcblxyXG5pbnB1dFt0eXBlPVwidGV4dFwiXTo6cGxhY2Vob2xkZXIge1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuaW5wdXRbdHlwZT1cInRleHRcIl06Zm9jdXMge1xyXG4gIG91dGxpbmUtd2lkdGg6IDA7XHJcbn1cclxuXHJcbi8qIFVwcGVyIFJpZ2h0IERpc3BsYXkgKi9cclxuXHJcbiN1cHBlclJpZ2h0IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xyXG59XHJcblxyXG4jYWxpZ25SaWdodCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGdhcDogMzBweDtcclxufVxyXG5cclxuLnVwcGVyUmlnaHRDb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZ2FwOiAxMHB4O1xyXG4gIC8qIGJvcmRlcjogMXB4IHNvbGlkIHJlZDsgKi9cclxufVxyXG5cclxuLnVwcGVyUmlnaHRDb250YWluZXIgPiBkaXYgPiBwIHtcclxuICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcbn1cclxuXHJcbi5pY29uQ29udGFpbmVyIHtcclxuICB3aWR0aDogM3JlbTtcclxufVxyXG5cclxuLnVwcGVyTGVmdFRleHQge1xyXG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xyXG59XHJcblxyXG4vKiBGb290ZXIgKi9cclxuXHJcbiNmb290ZXIge1xyXG4gIGdyaWQtY29sdW1uOiAxIC8gMztcclxuICAvKiBib3JkZXI6IDFweCBzb2xpZCBibHVlOyAqL1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHJcbn1cclxuXHJcbiNkYWlseUhvdXJseUNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBnYXA6IDEwcHg7XHJcbn1cclxuXHJcbiNkYWlseUhvdXJseUNvbnRhaW5lciBidXR0b24ge1xyXG4gIC8qIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlOyAqL1xyXG4gIHBhZGRpbmc6IDVweDtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbiNkYWlseUJ1dHRvbiB7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XHJcbn1cclxuXHJcbiNkYWlseUZvcmVjYXN0R3JpZCB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlOiAxZnIgLyByZXBlYXQoNywgMWZyKTtcclxuICBmbGV4OiAxO1xyXG4gIC8qIGJvcmRlcjogMXB4IHNvbGlkIHJlZDsgKi9cclxuICBcclxufVxyXG5cclxuLmRheUNhcmQge1xyXG4gIC8qIGJvcmRlcjogMXB4IHNvbGlkIHJlZDsgKi9cclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDEwcHg7XHJcbn1cclxuXHJcbiNkYXlOYW1lIHtcclxuICBmb250LXNpemU6IDEuNHJlbTtcclxufVxyXG5cclxuI2RheU1heFRlbXAge1xyXG4gIGZvbnQtc2l6ZTogMS42cmVtO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4jZGF5TWluVGVtcCB7XHJcbiAgZm9udC1zaXplOiAwLjlyZW07XHJcbn1cclxuXHJcbiNkYXlJY29uIHtcclxuICB3aWR0aDogNzBweDtcclxufVxyXG5cclxuLnRlc3RCb3JkZXIge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xyXG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsU0FBUztFQUNULFVBQVU7RUFDVixZQUFZO0VBQ1osa0NBQWtDO0FBQ3BDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLE1BQU07RUFDTixPQUFPO0VBQ1AsV0FBVztFQUNYLGFBQWE7RUFDYixZQUFZOztFQUVaOzs7O3lDQUlxQztFQUNyQyxzQkFBc0I7RUFDdEIsMkJBQTJCO0VBQzNCLGtDQUFrQztBQUNwQzs7QUFFQTtFQUNFLFdBQVc7RUFDWCxVQUFVOztFQUVWLGFBQWE7RUFDYixnQ0FBZ0M7QUFDbEM7O0FBRUEsdUJBQXVCOztBQUV2QjtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsMkJBQTJCO0VBQzNCLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGVBQWU7RUFDZixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7Q0FDQyxnQkFBZ0I7Q0FDaEIsY0FBYztDQUNkLFlBQVk7Q0FDWixVQUFVO0NBQ1YsYUFBYTtDQUNiLGVBQWU7Q0FDZixnQkFBZ0I7QUFDakI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQiw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLDhCQUE4QjtFQUM5QixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLFVBQVU7QUFDWjs7QUFFQTtFQUNFLFlBQVk7RUFDWixjQUFjO0VBQ2QsWUFBWTtFQUNaLG9DQUFvQztFQUNwQyw2QkFBNkI7RUFDN0IsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUEsd0JBQXdCOztBQUV4QjtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsU0FBUztFQUNULDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQSxXQUFXOztBQUVYO0VBQ0Usa0JBQWtCO0VBQ2xCLDRCQUE0QjtFQUM1QixhQUFhO0VBQ2Isc0JBQXNCOztBQUV4Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixTQUFTO0FBQ1g7O0FBRUE7RUFDRSw2QkFBNkI7RUFDN0IsWUFBWTtFQUNaLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQ0FBbUM7RUFDbkMsT0FBTztFQUNQLDJCQUEyQjs7QUFFN0I7O0FBRUE7RUFDRSwyQkFBMkI7RUFDM0IsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgY29sb3I6IHdoaXRlO1xcclxcbiAgZm9udC1mYW1pbHk6IG1vbnRzZXJyYXQsc2Fucy1zZXJpZjtcXHJcXG59XFxyXFxuXFxyXFxuaHRtbCwgYm9keSB7XFxyXFxuICBoZWlnaHQ6IDEwMHZoO1xcclxcbiAgd2lkdGg6IDEwMHZ3O1xcclxcbiAgb3ZlcmZsb3cteTogaGlkZGVuO1xcclxcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG5odG1sIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XFxyXFxufVxcclxcblxcclxcbiNiYWNrZ3JvdW5kQ29udGFpbmVyIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIHRvcDogMDtcXHJcXG4gIGxlZnQ6IDA7XFxyXFxuICB6LWluZGV4OiAtMTtcXHJcXG4gIGhlaWdodDogMTAwdmg7XFxyXFxuICB3aWR0aDogMTAwdnc7XFxyXFxuXFxyXFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXFxyXFxuICAgIHJnYmEoMCwgMCwgMCwgMC4xNjQpLCBcXHJcXG4gICAgcmdiYSgwLCAwLCAwLCAwLjcpXFxyXFxuICApLFxcclxcbiAgdXJsKFxcXCIuL2ltYWdlcy93ZWF0aGVyQmFja2dyb3VuZC5qcGdcXFwiKTtcXHJcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxyXFxuICBiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7XFxyXFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4jbWFpbkNvbnRhaW5lciB7XFxyXFxuICBoZWlnaHQ6IDkwJTtcXHJcXG4gIHdpZHRoOiA5MCU7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZTogMmZyIDFmciAvIDFmciAxZnI7XFxyXFxufVxcclxcblxcclxcbi8qIFVwcGVyIExlZnQgRGlzcGxheSAqL1xcclxcblxcclxcbiN1cHBlckxlZnQge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAvKiBib3JkZXI6IDFweCBzb2xpZCByZWQ7ICovXFxyXFxuICBnYXA6IDE1cHg7XFxyXFxufVxcclxcblxcclxcbiNtYWluRm9yZWNhc3QsICNtYWluVGVtcGVyYXR1cmUge1xcclxcbiAgZm9udC1zaXplOiAzcmVtO1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxufVxcclxcblxcclxcbiNtYWluVGVtcGVyYXR1cmUge1xcclxcbiAgZm9udC1zaXplOiAzLjVyZW07XFxyXFxufVxcclxcblxcclxcbiNsb2NhdGlvbiwgI2RhdGUsICN0aW1lIHtcXHJcXG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xcclxcbn1cXHJcXG5cXHJcXG5idXR0b24ge1xcclxcblxcdGJhY2tncm91bmQ6IG5vbmU7XFxyXFxuXFx0Y29sb3I6IGluaGVyaXQ7XFxyXFxuXFx0Ym9yZGVyOiBub25lO1xcclxcblxcdHBhZGRpbmc6IDA7XFxyXFxuXFx0Zm9udDogaW5oZXJpdDtcXHJcXG5cXHRjdXJzb3I6IHBvaW50ZXI7XFxyXFxuXFx0b3V0bGluZTogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuI3N3aXRjaFRlbXBlcmF0dXJlQnV0dG9uIHtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbn1cXHJcXG5cXHJcXG4jbWFpbkljb24ge1xcclxcbiAgd2lkdGg6IDYwcHg7XFxyXFxuICBoZWlnaHQ6IDYwcHg7XFxyXFxuICBwYWRkaW5nOiAxMHB4IDBweDtcXHJcXG4gIC8qIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlOyAqL1xcclxcbn1cXHJcXG5cXHJcXG4jc2VhcmNoQ29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICBib3JkZXItYm90dG9tOiAycHggc29saWQgd2hpdGU7XFxyXFxuICB3aWR0aDogMjAwcHg7XFxyXFxufVxcclxcblxcclxcbiNzZWFyY2hJY29uQ29udGFpbmVyIHtcXHJcXG4gIHdpZHRoOiAxLjNyZW07XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICBsZWZ0OiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG5pbnB1dFt0eXBlPVxcXCJ0ZXh0XFxcIl0ge1xcclxcbiAgd2lkdGg6IDE2MHB4O1xcclxcbiAgaGVpZ2h0OiAxLjFyZW07XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxuICAvKiBib3JkZXItYm90dG9tOiAycHggc29saWQgd2hpdGU7ICovXFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG4gIHRleHQtaW5kZW50OiA3cHg7XFxyXFxuICBmb250LXNpemU6IDAuOXJlbTtcXHJcXG4gIHBhZGRpbmc6IDJweDtcXHJcXG59XFxyXFxuXFxyXFxuaW5wdXRbdHlwZT1cXFwidGV4dFxcXCJdOjpwbGFjZWhvbGRlciB7XFxyXFxuICBjb2xvcjogd2hpdGU7XFxyXFxufVxcclxcblxcclxcbmlucHV0W3R5cGU9XFxcInRleHRcXFwiXTpmb2N1cyB7XFxyXFxuICBvdXRsaW5lLXdpZHRoOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBVcHBlciBSaWdodCBEaXNwbGF5ICovXFxyXFxuXFxyXFxuI3VwcGVyUmlnaHQge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XFxyXFxufVxcclxcblxcclxcbiNhbGlnblJpZ2h0IHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgZ2FwOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udXBwZXJSaWdodENvbnRhaW5lciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZ2FwOiAxMHB4O1xcclxcbiAgLyogYm9yZGVyOiAxcHggc29saWQgcmVkOyAqL1xcclxcbn1cXHJcXG5cXHJcXG4udXBwZXJSaWdodENvbnRhaW5lciA+IGRpdiA+IHAge1xcclxcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uaWNvbkNvbnRhaW5lciB7XFxyXFxuICB3aWR0aDogM3JlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnVwcGVyTGVmdFRleHQge1xcclxcbiAgZm9udC1zaXplOiAxLjFyZW07XFxyXFxufVxcclxcblxcclxcbi8qIEZvb3RlciAqL1xcclxcblxcclxcbiNmb290ZXIge1xcclxcbiAgZ3JpZC1jb2x1bW46IDEgLyAzO1xcclxcbiAgLyogYm9yZGVyOiAxcHggc29saWQgYmx1ZTsgKi9cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG4jZGFpbHlIb3VybHlDb250YWluZXIge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGdhcDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuI2RhaWx5SG91cmx5Q29udGFpbmVyIGJ1dHRvbiB7XFxyXFxuICAvKiBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTsgKi9cXHJcXG4gIHBhZGRpbmc6IDVweDtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuI2RhaWx5QnV0dG9uIHtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4jZGFpbHlGb3JlY2FzdEdyaWQge1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGU6IDFmciAvIHJlcGVhdCg3LCAxZnIpO1xcclxcbiAgZmxleDogMTtcXHJcXG4gIC8qIGJvcmRlcjogMXB4IHNvbGlkIHJlZDsgKi9cXHJcXG4gIFxcclxcbn1cXHJcXG5cXHJcXG4uZGF5Q2FyZCB7XFxyXFxuICAvKiBib3JkZXI6IDFweCBzb2xpZCByZWQ7ICovXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGdhcDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuI2RheU5hbWUge1xcclxcbiAgZm9udC1zaXplOiAxLjRyZW07XFxyXFxufVxcclxcblxcclxcbiNkYXlNYXhUZW1wIHtcXHJcXG4gIGZvbnQtc2l6ZTogMS42cmVtO1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxufVxcclxcblxcclxcbiNkYXlNaW5UZW1wIHtcXHJcXG4gIGZvbnQtc2l6ZTogMC45cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4jZGF5SWNvbiB7XFxyXFxuICB3aWR0aDogNzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRlc3RCb3JkZXIge1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XFxyXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xyXG5pbXBvcnQgc2VhcmNoSWNvbiBmcm9tIFwiLi9pbWFnZXMvc2VhcmNoSWNvbi5zdmdcIjtcclxuaW1wb3J0IGZlZWxzTGlrZUljb24gZnJvbSBcIi4vaW1hZ2VzL2ZlZWxzTGlrZUljb24uc3ZnXCI7XHJcbmltcG9ydCBodW1pZGl0eUljb24gZnJvbSBcIi4vaW1hZ2VzL2h1bWlkaXR5SWNvbi5zdmdcIjtcclxuaW1wb3J0IHByZWNpcGl0YXRpb25JY29uIGZyb20gXCIuL2ltYWdlcy9wcmVjaXBpdGF0aW9uSWNvbi5zdmdcIjtcclxuaW1wb3J0IHdpbmRTcGVlZEljb24gZnJvbSBcIi4vaW1hZ2VzL3dpbmRJY29uLnN2Z1wiO1xyXG4vLyBpbXBvcnQgYmFja2dyb3VkIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQmFja2dyb3VuZC5qcGdcIjtcclxuLy8gaW1wb3J0IHRlc3RJbWFnZSBmcm9tIFwiLi9pbWFnZXMvdGVzdEltYWdlLnBuZ1wiO1xyXG4vLyBpbXBvcnQgZ2V0V2VhdGhlckRhdGEgZnJvbSBcIi4vYXBpSGFuZGxlclwiO1xyXG5cclxuLy8gV2VhdGhlciBJY29uc1xyXG5pbXBvcnQgY2xlYXJTa3kgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnMvY2xlYXJTa3kuc3ZnXCI7XHJcbmltcG9ydCBwYXJ0bHlDbG91ZHkgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnMvcGFydGx5Q2xvdWR5LnN2Z1wiO1xyXG5pbXBvcnQgZm9nZ3kgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnMvZm9nZ3kuc3ZnXCI7XHJcbmltcG9ydCBkcml6emxlIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zL2RyaXp6bGUuc3ZnXCI7XHJcbmltcG9ydCBmcmVlemluZ0RyaXp6bGUgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnMvZnJlZXppbmdEcml6emxlLnN2Z1wiO1xyXG5pbXBvcnQgcmFpbiBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29ucy9yYWluLnN2Z1wiO1xyXG5pbXBvcnQgZnJlZXppbmdSYWluIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zL2ZyZWV6aW5nUmFpbi5zdmdcIjtcclxuaW1wb3J0IHNub3dmYWxsIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zL3Nub3dmYWxsLnN2Z1wiO1xyXG5pbXBvcnQgc25vd0dyYWlucyBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29ucy9zbm93R3JhaW5zLnN2Z1wiO1xyXG5pbXBvcnQgcmFpblNob3dlcnMgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnMvcmFpblNob3dlcnMuc3ZnXCI7XHJcbmltcG9ydCBzbm93U2hvd2VycyBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29ucy9zbm93U2hvd2Vycy5zdmdcIjtcclxuaW1wb3J0IHRodW5kZXJTdG9ybUJvdGggZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnMvdGh1bmRlclN0b3JtQm90aC5zdmdcIjtcclxuXHJcbi8vIENyb3BwZWQgV2VhdGhlciBJY29uc1xyXG5pbXBvcnQgY2xlYXJTa3lDIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zQ3JvcHBlZC9jbGVhclNreUNyb3BwZWQuc3ZnXCI7XHJcbmltcG9ydCBwYXJ0bHlDbG91ZHlDIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zQ3JvcHBlZC9wYXJ0bHlDbG91ZHlDcm9wcGVkLnN2Z1wiO1xyXG5pbXBvcnQgZm9nZ3lDIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zQ3JvcHBlZC9mb2dneUNyb3BwZWQuc3ZnXCI7XHJcbmltcG9ydCBkcml6emxlQyBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29uc0Nyb3BwZWQvZHJpenpsZUNyb3BwZWQuc3ZnXCI7XHJcbmltcG9ydCBmcmVlemluZ0RyaXp6bGVDIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zQ3JvcHBlZC9mcmVlemluZ0RyaXp6bGVDcm9wcGVkLnN2Z1wiO1xyXG5pbXBvcnQgcmFpbkMgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnNDcm9wcGVkL3JhaW5Dcm9wcGVkLnN2Z1wiO1xyXG5pbXBvcnQgZnJlZXppbmdSYWluQyBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29uc0Nyb3BwZWQvZnJlZXppbmdSYWluQ3JvcHBlZC5zdmdcIjtcclxuaW1wb3J0IHNub3dmYWxsQyBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29uc0Nyb3BwZWQvc25vd2ZhbGxDcm9wcGVkLnN2Z1wiO1xyXG5pbXBvcnQgc25vd0dyYWluc0MgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnNDcm9wcGVkL3Nub3dHcmFpbnNDcm9wcGVkLnN2Z1wiO1xyXG5pbXBvcnQgcmFpblNob3dlcnNDIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zQ3JvcHBlZC9yYWluU2hvd2Vyc0Nyb3BwZWQuc3ZnXCI7XHJcbmltcG9ydCBzbm93U2hvd2Vyc0MgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnNDcm9wcGVkL3Nub3dTaG93ZXJzQ3JvcHBlZC5zdmdcIjtcclxuaW1wb3J0IHRodW5kZXJTdG9ybUJvdGhDIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zQ3JvcHBlZC90aHVuZGVyU3Rvcm1Cb3RoQ3JvcHBlZC5zdmdcIjtcclxuXHJcbmNvbnN0IHdlYXRoZXJJY29ucyA9IFtcclxuICBjbGVhclNreSxcclxuICBwYXJ0bHlDbG91ZHksXHJcbiAgZm9nZ3ksXHJcbiAgZHJpenpsZSxcclxuICBmcmVlemluZ0RyaXp6bGUsXHJcbiAgcmFpbixcclxuICBmcmVlemluZ1JhaW4sXHJcbiAgc25vd2ZhbGwsXHJcbiAgc25vd0dyYWlucyxcclxuICByYWluU2hvd2VycyxcclxuICBzbm93U2hvd2VycyxcclxuICB0aHVuZGVyU3Rvcm1Cb3RoLFxyXG5dO1xyXG5cclxuY29uc3Qgd2VhdGhlckljb25zQ3JvcHBlZCA9IFtcclxuICBjbGVhclNreUMsXHJcbiAgcGFydGx5Q2xvdWR5QyxcclxuICBmb2dneUMsXHJcbiAgZHJpenpsZUMsXHJcbiAgZnJlZXppbmdEcml6emxlQyxcclxuICByYWluQyxcclxuICBmcmVlemluZ1JhaW5DLFxyXG4gIHNub3dmYWxsQyxcclxuICBzbm93R3JhaW5zQyxcclxuICByYWluU2hvd2Vyc0MsXHJcbiAgc25vd1Nob3dlcnNDLFxyXG4gIHRodW5kZXJTdG9ybUJvdGhDLFxyXG5dO1xyXG5cclxuLy8gZnVuY3Rpb24gY29tcG9uZW50KCkge1xyXG4vLyAgIC8vIFRlc3QgQ1NTXHJcbi8vICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbi8vICAgZWxlbWVudC5pbm5lckhUTUwgPSBcIlRlc3RpbmcuLi5cIjtcclxuLy8gICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoZWxsb1wiKTtcclxuXHJcbi8vICAgLy8gVGVzdCBBc3NldCBsb2FkZXJcclxuLy8gICBjb25zdCBpbWFnZUVsZW1lbnQgPSBuZXcgSW1hZ2UoKTtcclxuLy8gICBpbWFnZUVsZW1lbnQuc3JjID0gdGVzdEltYWdlO1xyXG4vLyAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VFbGVtZW50KTtcclxuXHJcbi8vICAgLy8gVGVzdCBzb3VyY2UgbWFwIC0tPiB1bmNvbW1lbnQgdG8gdGVzdCB0cmFja2luZ1xyXG4vLyAgIC8vIGNvc25vbGUubG9nKCdJIGdldCBjYWxsZWQgZnJvbSBwcmludC5qcyEnKTtcclxuXHJcbi8vICAgLy8gVGVzdCBFc2xpbnQgLS0+IHVuY29tbWVudCB0byBzZWUgc3VnZ2VzdGlvbnNcclxuLy8gICAvLyBpZiAodHJ1ZSkge31cclxuXHJcbi8vICAgcmV0dXJuIGVsZW1lbnQ7XHJcbi8vIH1cclxuLy8gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb21wb25lbnQoKSk7XHJcblxyXG4vLyBNb3ZlIHRoZXNlIHRvIGRvbT9cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckltYWdlKHBhcmVudCwgaW1hZ2UpIHtcclxuICBjb25zdCBpbWFnZUVsZW1lbnQgPSBuZXcgSW1hZ2UoKTtcclxuICBpbWFnZUVsZW1lbnQuc3JjID0gaW1hZ2U7XHJcbiAgLy8gaW1hZ2VFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ0ZXN0Qm9yZGVyXCIpO1xyXG4gIHBhcmVudC5hcHBlbmRDaGlsZChpbWFnZUVsZW1lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJJY29ucygpIHtcclxuICAvLyBTZWFyY2hiYXIgaWNvblxyXG4gIGNvbnN0IHNlYXJjaEljb25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaEljb25Db250YWluZXJcIik7XHJcbiAgcmVuZGVySW1hZ2Uoc2VhcmNoSWNvbkNvbnRhaW5lciwgc2VhcmNoSWNvbik7XHJcblxyXG4gIC8vIFVwcGVyIHJpZ2h0IGljb25zXHJcbiAgY29uc3QgZmVlbHNMaWtlQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmZWVsc0xpa2VJY29uXCIpO1xyXG4gIHJlbmRlckltYWdlKGZlZWxzTGlrZUNvbnRhaW5lciwgZmVlbHNMaWtlSWNvbik7XHJcblxyXG4gIGNvbnN0IGh1bWlkaXR5Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJodW1pZGl0eUljb25cIik7XHJcbiAgcmVuZGVySW1hZ2UoaHVtaWRpdHlDb250YWluZXIsIGh1bWlkaXR5SWNvbik7XHJcblxyXG4gIGNvbnN0IHByZWNpcGl0YXRpb25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByZWNpcGl0YXRpb25JY29uXCIpO1xyXG4gIHJlbmRlckltYWdlKHByZWNpcGl0YXRpb25Db250YWluZXIsIHByZWNpcGl0YXRpb25JY29uKTtcclxuXHJcbiAgY29uc3Qgd2luZFNwZWVkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5kU3BlZWRJY29uXCIpO1xyXG4gIHJlbmRlckltYWdlKHdpbmRTcGVlZENvbnRhaW5lciwgd2luZFNwZWVkSWNvbik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGludGVycHJldFdlYXRoZXJDb2RlKGNvZGUsIGNyb3BwZWQpIHtcclxuICBsZXQgaW1hZ2VzVG9Vc2UgPSB3ZWF0aGVySWNvbnM7XHJcbiAgaWYgKGNyb3BwZWQpIHtcclxuICAgIGltYWdlc1RvVXNlID0gd2VhdGhlckljb25zQ3JvcHBlZDtcclxuICB9XHJcblxyXG4gIHN3aXRjaCAoY29kZSkge1xyXG4gICAgY2FzZSAwOlxyXG4gICAgICByZXR1cm4gaW1hZ2VzVG9Vc2VbMF07XHJcbiAgICBjYXNlIDE6XHJcbiAgICBjYXNlIDI6XHJcbiAgICBjYXNlIDM6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVsxXTtcclxuICAgIGNhc2UgNDU6XHJcbiAgICBjYXNlIDQ4OlxyXG4gICAgICByZXR1cm4gaW1hZ2VzVG9Vc2VbMl07XHJcbiAgICBjYXNlIDUxOlxyXG4gICAgY2FzZSA1MzpcclxuICAgIGNhc2UgNTU6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVszXTtcclxuICAgIGNhc2UgNTY6XHJcbiAgICBjYXNlIDU3OlxyXG4gICAgICByZXR1cm4gaW1hZ2VzVG9Vc2VbNF07XHJcbiAgICBjYXNlIDYxOlxyXG4gICAgY2FzZSA2MzpcclxuICAgIGNhc2UgNjU6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVs1XTtcclxuICAgIGNhc2UgNjY6XHJcbiAgICBjYXNlIDY3OlxyXG4gICAgICByZXR1cm4gaW1hZ2VzVG9Vc2VbNl07XHJcbiAgICBjYXNlIDcxOlxyXG4gICAgY2FzZSA3MzpcclxuICAgIGNhc2UgNzU6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVs3XTtcclxuICAgIGNhc2UgNzc6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVs4XTtcclxuICAgIGNhc2UgODA6XHJcbiAgICBjYXNlIDgxOlxyXG4gICAgY2FzZSA4MjpcclxuICAgICAgcmV0dXJuIGltYWdlc1RvVXNlWzldO1xyXG4gICAgY2FzZSA4NTpcclxuICAgIGNhc2UgODY6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVsxMF07XHJcbiAgICBjYXNlIDk1OlxyXG4gICAgY2FzZSA5NjpcclxuICAgIGNhc2UgOTk6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVsxMV07XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gaW1hZ2VzVG9Vc2VbMF07XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJGb3JlY2FzdEljb25zKGljb25Db2Rlcykge1xyXG4gIGNvbnN0IGRheUNhcmRzQ29sbGVjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJkYXlDYXJkXCIpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGF5Q2FyZHNDb2xsZWN0aW9uLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICBjb25zdCBkYXlJY29uQ29udGFpbmVyID1cclxuICAgICAgZGF5Q2FyZHNDb2xsZWN0aW9uW2ldLmNoaWxkcmVuW2RheUNhcmRzQ29sbGVjdGlvbltpXS5jaGlsZHJlbi5sZW5ndGggLSAxXTtcclxuICAgIHJlbmRlckltYWdlKGRheUljb25Db250YWluZXIsIGludGVycHJldFdlYXRoZXJDb2RlKGljb25Db2Rlc1tpXSwgZmFsc2UpKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckN1cnJlbnRJY29uKGljb25Db2RlKSB7XHJcbiAgY29uc3QgbWFpbkljb25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5JY29uXCIpO1xyXG4gIHJlbmRlckltYWdlKG1haW5JY29uQ29udGFpbmVyLCBpbnRlcnByZXRXZWF0aGVyQ29kZShpY29uQ29kZSwgdHJ1ZSkpO1xyXG59XHJcblxyXG5yZW5kZXJJY29ucygpO1xyXG5yZW5kZXJDdXJyZW50SWNvbig1MSk7XHJcbnJlbmRlckZvcmVjYXN0SWNvbnMoWzcxLCA3NywgODAsIDg1LCA5NSwgNjEsIDY2XSk7XHJcbi8vIGdldFdlYXRoZXJEYXRhKFwibmV3IHlvcmsgY2l0eVwiKTtcclxuIl0sIm5hbWVzIjpbInNlYXJjaEljb24iLCJmZWVsc0xpa2VJY29uIiwiaHVtaWRpdHlJY29uIiwicHJlY2lwaXRhdGlvbkljb24iLCJ3aW5kU3BlZWRJY29uIiwiY2xlYXJTa3kiLCJwYXJ0bHlDbG91ZHkiLCJmb2dneSIsImRyaXp6bGUiLCJmcmVlemluZ0RyaXp6bGUiLCJyYWluIiwiZnJlZXppbmdSYWluIiwic25vd2ZhbGwiLCJzbm93R3JhaW5zIiwicmFpblNob3dlcnMiLCJzbm93U2hvd2VycyIsInRodW5kZXJTdG9ybUJvdGgiLCJjbGVhclNreUMiLCJwYXJ0bHlDbG91ZHlDIiwiZm9nZ3lDIiwiZHJpenpsZUMiLCJmcmVlemluZ0RyaXp6bGVDIiwicmFpbkMiLCJmcmVlemluZ1JhaW5DIiwic25vd2ZhbGxDIiwic25vd0dyYWluc0MiLCJyYWluU2hvd2Vyc0MiLCJzbm93U2hvd2Vyc0MiLCJ0aHVuZGVyU3Rvcm1Cb3RoQyIsIndlYXRoZXJJY29ucyIsIndlYXRoZXJJY29uc0Nyb3BwZWQiLCJyZW5kZXJJbWFnZSIsInBhcmVudCIsImltYWdlIiwiaW1hZ2VFbGVtZW50IiwiSW1hZ2UiLCJzcmMiLCJhcHBlbmRDaGlsZCIsInJlbmRlckljb25zIiwic2VhcmNoSWNvbkNvbnRhaW5lciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJmZWVsc0xpa2VDb250YWluZXIiLCJodW1pZGl0eUNvbnRhaW5lciIsInByZWNpcGl0YXRpb25Db250YWluZXIiLCJ3aW5kU3BlZWRDb250YWluZXIiLCJpbnRlcnByZXRXZWF0aGVyQ29kZSIsImNvZGUiLCJjcm9wcGVkIiwiaW1hZ2VzVG9Vc2UiLCJyZW5kZXJGb3JlY2FzdEljb25zIiwiaWNvbkNvZGVzIiwiZGF5Q2FyZHNDb2xsZWN0aW9uIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImkiLCJsZW5ndGgiLCJkYXlJY29uQ29udGFpbmVyIiwiY2hpbGRyZW4iLCJyZW5kZXJDdXJyZW50SWNvbiIsImljb25Db2RlIiwibWFpbkljb25Db250YWluZXIiXSwic291cmNlUm9vdCI6IiJ9