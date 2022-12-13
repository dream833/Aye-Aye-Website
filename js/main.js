var isInViewport = function (elem) {
  var distance = elem.getBoundingClientRect();
  return (
    distance.top >= 0 &&
    distance.bottom <=
      (window.innerHeight || document.documentElement.clientHeight)
  );
};

var isInViewportTop = function (elem) {
  var distance = elem.getBoundingClientRect();
  return distance.top <= window.innerHeight - 250;
};

// Function: Is element scrolled into view?
function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  if ($(window).width() > 800) {
    return elemBottom <= docViewBottom && elemTop >= docViewTop;
  } else {
    return true;
  }
}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}

if (document.querySelector(".contract")) {
  var copyContract = document.querySelector(".contract");
  var copyContractText = document.querySelector(".contract-hash");

  copyContract.addEventListener("click", function (event) {
    copyTextToClipboard(copyContractText.innerHTML);
  });
}

var findMe = document.querySelectorAll(".addShow");
var findMeTop = document.querySelectorAll(".addShowTop");
var imgbn = document.querySelectorAll(".img-bn");
window.addEventListener(
  "scroll",
  function (event) {
    for (i = 0; i < findMeTop.length; ++i) {
      if (isInViewportTop(findMeTop[i])) {
        findMeTop[i].classList.add("show");
        imgbn[i].classList.add("show");

      }
    }

    for (i = 0; i < findMe.length; ++i) {
      if (isInViewport(findMe[i])) {
        findMe[i].classList.add("show");
      }
    }
  },
  false
);

for (i = 0; i < findMe.length; ++i) {
  if (isInViewport(findMe[i])) {
    findMe[i].classList.add("show");
  }
}
for (i = 0; i < findMeTop.length; ++i) {
  if (isInViewportTop(findMeTop[i])) {
    findMeTop[i].classList.add("show");
  }
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const id = this.getAttribute("href");
    const yOffset = -110;
    const element = document.querySelector(id);
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
    document.querySelector(".menu").classList.remove("open");
  });
});

if (document.querySelector(".menu")) {
  document
    .querySelector(".menu-show")
    .addEventListener("click", function (event) {
      document.querySelector(".menu").classList.add("open");
    });

  document
    .querySelector(".menu-close")
    .addEventListener("click", function (event) {
      document.querySelector(".menu").classList.remove("open");
    });
}

function setCookie(b, h, c, f, e) {
  var a;
  if (c === 0) {
    a = "";
  } else {
    var g = new Date();
    g.setTime(g.getTime() + c * 24 * 60 * 60 * 1000);
    a = "expires=" + g.toGMTString() + "; ";
  }
  var e = typeof e === "undefined" ? "" : "; domain=" + e;
  document.cookie = b + "=" + h + "; " + a + "path=" + f + e;
}
function getCookie(d) {
  var b = d + "=";
  var a = document.cookie.split(";");
  for (var e = 0; e < a.length; e++) {
    var f = a[e].trim();
    if (f.indexOf(b) == 0) {
      return f.substring(b.length, f.length);
    }
  }
  return "";
}

TweenMax.from("#fernLeftBack, #fernTop", 40, {
  rotation: -8,
  repeat: -1,
  yoyo: true,
  transformOrigin: "50% 100%",
  ease: Sine.easeInOut,
});
TweenMax.from("#tallFernFront, #leafRightBack, #fernRightBack", 4, {
  rotation: 13,
  repeat: -1,
  yoyo: true,
  transformOrigin: "50% 100%",
  ease: Sine.easeInOut,
});

$(document).ready(function () {
  var theTranCookie = getCookie("googtrans");
  var theCookieDish = theTranCookie.split("/");
  var theTranLang = theCookieDish[theCookieDish.length - 1];
  if (!theTranCookie) {
    $(".tran-en").addClass("active");
  }
  if (!theTranLang) {
    $(".tran-en").addClass("active");
  } else {
    $(".tran-" + theTranLang).addClass("active");
  }

  $(".langauges .item").click(function () {
    var theLang = $(this).attr("data-lang");

    if (theLang == "en") {
      setCookie("googtrans", "", 0, "/", "." + location.host);
      setCookie("googtrans", "", 0, "/");
    } else {
      setCookie("googtrans", "/en/" + theLang, 0, "/", "." + location.host);
      setCookie("googtrans", "/en/" + theLang, 0, "/");
    }

    location.reload();
  });

  if ($("#page-home").length) {
    var $lis = $(".charity-box");

    for (var i = 0; i < $lis.length; i++) {
      var $li = $($lis[i]);

      if (isScrolledIntoView($li)) {
        $li.removeClass("item-hide");
        $li.addClass("item-focus");
      } else {
        $li.addClass("item-hide");
        $li.removeClass("item-focus");
      }
    }

    var Scrollbar = window.Scrollbar;
    Scrollbar.use(window.OverscrollPlugin);
    var customScroll = Scrollbar.init(
      document.querySelector(".charity-cont-list"),
      {
        plugins: {
          overscroll: true,
        },
      }
    );

    customScroll.addListener(function (status) {
      var $lis = $(".charity-box");

      for (var i = 0; i < $lis.length; i++) {
        var $li = $($lis[i]);

        if (isScrolledIntoView($li)) {
          $li.removeClass("item-hide");
          $li.addClass("item-focus");
        } else {
          $li.addClass("item-hide");
          $li.removeClass("item-focus");
        }
      }
    });
  }
});

$(window).scroll(function () {
  var scrollPos = $(document).scrollTop();

  if (scrollPos > 100) {
    $("header").addClass("set");
  } else {
    $("header").removeClass("set");
  }

  if ($(".charity-box").length) {
    var $lis = $(".charity-box");
    for (var i = 0; i < $lis.length; i++) {
      var $li = $($lis[i]);

      if (isScrolledIntoView($li)) {
        $li.removeClass("item-hide");
        $li.addClass("item-focus");
      } else {
        $li.addClass("item-hide");
        $li.removeClass("item-focus");
      }
    }
  }
});
