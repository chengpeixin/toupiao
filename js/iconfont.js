(function(window){var svgSprite="<svg>"+""+'<symbol id="icon-toupiao" viewBox="0 0 1024 1024">'+""+'<path d="M64.983 908.396c-18.99 0-34.401-15.417-34.401-34.3v-481.09c0-18.882 15.406-34.294 34.401-34.294 18.883 0 34.401 15.33 34.401 34.294v481.086c-0.107 18.887-15.406 34.304-34.401 34.304z m825.365-549.684H686.76c14.853-34.401 31.877-123.233 22.006-203.97-7.987-64.563-45.594-113.91-100.762-132.634-40.893-13.803-83.942-7.147-107.259 16.635-27.632 28.124-40.596 81.413-54.425 137.718-9.022 36.848-18.345 75.003-29.89 94.648-33.373 56.766-103.4 82.719-117.505 87.5h-96.44c-18.883 0-34.402 15.325-34.402 34.32v481.065c0 18.883 15.437 34.289 34.402 34.289h93.076c28.667 15.519 135.731 68.73 259.702 68.73h231.987c38.267 0 104.054-14.76 128.67-55.654 24.802-41.175 77.359-417.157 77.359-458.87-0.276-57.446-56.5-103.777-102.932-103.777z m-33.562 527.396c-5.161 8.643-39.076 22.288-69.653 22.288H555.172c-122.85 0-231.137-68.813-232.28-68.813h-86.087V427.218h68.7c2.827 0 5.381-0.927 7.987-1.495 0.574-0.19 1.142 0 1.603-0.19 0.195-0.081 0.952-0.27 1.797-0.573a31.43 31.43 0 0 0 2.719-0.922c20.977-6.876 110.162-40.053 156.032-118.072 16.655-28.288 26.716-69.54 37.422-113.157 9.974-40.627 22.282-91.197 36.654-105.846 3.297-2.831 19.349-6.497 39.485 1.413 16.446 6.574 45.036 24.894 51.226 74.896 13.537 110.08-33.833 214.891-34.212 215.92-5.007 10.63-4.05 22.743 2.253 32.722 6.282 9.866 17.28 15.406 28.856 15.406h252.831c9.211 0 33.94 16.17 33.94 35.246 0.103 45.686-52.915 390.928-67.312 423.542z m0 0" fill="" ></path>'+""+"</symbol>"+""+"</svg>";var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)