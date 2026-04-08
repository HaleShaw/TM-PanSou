// ==UserScript==
// @name               PanSou
// @name:zh-CN         猫狸盘搜
// @description        猫狸盘搜自动打开链接
// @description:zh-CN  猫狸盘搜自动打开链接
// @namespace          https://github.com/HaleShaw
// @version            1.0.0
// @author             HaleShaw
// @copyright          2024+, HaleShaw (https://github.com/HaleShaw)
// @license            AGPL-3.0-or-later
// @homepage           https://github.com/HaleShaw/TM-PanSou
// @supportURL         https://github.com/HaleShaw/TM-PanSou/issues
// @downloadURL        https://github.com/HaleShaw/TM-PanSou/raw/main/PanSou.user.js
// @updateURL          https://github.com/HaleShaw/TM-PanSou/raw/main/PanSou.user.js
// @contributionURL    https://www.jianwudao.com/
// @icon               https://icons.duckduckgo.com/ip2/xunjiso.com.ico
// @match              https://xunjiso.com/*
// @match              https://www.alipansou.com/*
// @match              https://aipanso.com/*
// @match              https://www.tianyiso.com/*
// @match              https://xiongdipan.com/*
// @compatible	       Chrome
// @grant              GM_addStyle
// @grant              GM_info
// ==/UserScript==

// ==OpenUserJS==
// @author             HaleShaw
// @collaborator       HaleShaw
// ==/OpenUserJS==

(function () {
  "use strict";

  const style = `
  h1 {
    margin-block-start: 5px !important;
    margin-block-end: 5px !important;
  }

  .van-card {
    padding: 1px 10px !important;
  }

  .van-divider {
    margin: 8px 0 !important;
    line-height: 16px !important;
    border-color: white !important;
  }

  .van-card__thumb {
    width: 40px !important;
    height: 40px !important;
  }

  .van-card__bottom {
    line-height: unset !important;
  }

  .van-card__bottom > div {
    padding-bottom: unset !important;
  }

  .van-card__content {
    min-height: 48px !important;
  }

  .van-row > .van-cell,
  #app > div:last-child {
    display: none !important;
  }

  #openAll,
  .van-search__action{
    cursor: pointer;
    border-radius: 8px;
    border: 1px solid;
    color: #1989fa;
    background-color: #fff;
    padding: 4px 16px;
  }

  #openAll:hover,
  .van-search__action:hover {
    color: #fff;
    background-color: #1989fa;
  }

  #app > div:nth-child(1) > div.van-row.van-row--flex.van-row--justify-center {
    display: none !important;
  }
  `;

  let path = location.pathname;
  if (path.startsWith("/search")) {
    GM_addStyle(style);
    let parent = document.querySelector("div.van-dropdown-menu__bar");
    let button = document.createElement("button");
    button.setAttribute("id", "openAll");
    button.textContent = "打开全部";
    button.onclick = function () {
      let cards = document.querySelectorAll("a.van-card__thumb");
      for (let i = 0; i < cards.length; i++) {
        cards[i].click();
      }
    };
    parent.appendChild(button);
    let cards = document.querySelectorAll("a.van-card__thumb");
    for (let i = 0; i < cards.length; i++) {
      const span = document.createElement("span");
      span.textContent = i + 1;
      span.style.display = "inline-block";
      span.style.width = "24px";
      span.style.alignContent = "center";
      span.style.textAlign = "center";
      span.style.fontSize = "16px";
      span.style.fontWeight = "bold";
      cards[i].parentNode.insertBefore(span, cards[i]);
    }
  } else if (path.startsWith("/s/")) {
    let i = 0;
    let btn;
    let interval = setInterval(() => {
      btn = document.querySelectorAll(
        "button.van-button.van-button--info.van-button--large.van-goods-action-button.van-goods-action-button--first.van-goods-action-button--info"
      );
      i++;
      if (btn.length > 0 || i > 100) {
        if (btn.length > 0) {
          btn[0].focus();
          btn[0].click();
          const mouseEvent = new MouseEvent("click", {
            view: document.defaultView,
            bubbles: true,
            cancelable: true,
            composed: true,
          });
          btn[0].dispatchEvent(mouseEvent);

          clearInterval(interval);
          setTimeout(() => {
            if (!validateTips()) {
              window.close();
            }
          }, 800);
        }
        clearInterval(interval);
      }
    }, 100);
  }

  function validateTips() {
    const className = document.body.className;
    return className.includes("van-overflow-hidden");
  }
})();
