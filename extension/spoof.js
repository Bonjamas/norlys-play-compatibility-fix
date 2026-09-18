(() => {
  "use strict";

  const originalUA = navigator.userAgent || "";
  const versionMatch = originalUA.match(/Chrome\/([\d.]+)/);
  const fullVersion = versionMatch ? versionMatch[1] : "151.0.0.0";
  const majorVersion = fullVersion.split(".")[0];

  const chromeUA =
    `Mozilla/5.0 (Windows NT 10.0; WOW64) ` +
    `AppleWebKit/537.36 (KHTML, like Gecko) ` +
    `Chrome/${fullVersion} Safari/537.36`;

  const chromeAppVersion =
    `5.0 (Windows NT 10.0; WOW64) ` +
    `AppleWebKit/537.36 (KHTML, like Gecko) ` +
    `Chrome/${fullVersion} Safari/537.36`;

  const brands = Object.freeze([
    Object.freeze({ brand: "Not A;Brand", version: "99" }),
    Object.freeze({ brand: "Chromium", version: majorVersion }),
    Object.freeze({ brand: "Google Chrome", version: majorVersion })
  ]);

  const fullVersionList = Object.freeze([
    Object.freeze({ brand: "Not A;Brand", version: "99.0.0.0" }),
    Object.freeze({ brand: "Chromium", version: fullVersion }),
    Object.freeze({ brand: "Google Chrome", version: fullVersion })
  ]);

  function defineNavigatorValue(name, value) {
    try {
      Object.defineProperty(Navigator.prototype, name, {
        configurable: true,
        enumerable: true,
        get: () => value
      });
      return;
    } catch (_) {}

    try {
      Object.defineProperty(navigator, name, {
        configurable: true,
        enumerable: true,
        get: () => value
      });
    } catch (_) {}
  }

  defineNavigatorValue("userAgent", chromeUA);
  defineNavigatorValue("appVersion", chromeAppVersion);
  defineNavigatorValue("platform", "Win32");
  defineNavigatorValue("vendor", "Google Inc.");
  defineNavigatorValue("productSub", "20030107");

  const nativeUAData = navigator.userAgentData;
  const fakeUAData = nativeUAData
    ? Object.create(Object.getPrototypeOf(nativeUAData))
    : {};

  Object.defineProperties(fakeUAData, {
    brands: {
      configurable: true,
      enumerable: true,
      get: () => brands
    },
    mobile: {
      configurable: true,
      enumerable: true,
      get: () => false
    },
    platform: {
      configurable: true,
      enumerable: true,
      get: () => "Windows"
    }
  });

  Object.defineProperty(fakeUAData, "toJSON", {
    configurable: true,
    enumerable: false,
    value: function () {
      return {
        brands,
        mobile: false,
        platform: "Windows"
      };
    }
  });

  Object.defineProperty(fakeUAData, "getHighEntropyValues", {
    configurable: true,
    enumerable: false,
    value: async function (hints = []) {
      const result = {
        brands,
        mobile: false,
        platform: "Windows"
      };

      for (const hint of hints) {
        switch (hint) {
          case "architecture":
            result.architecture = "x86";
            break;
          case "bitness":
            result.bitness = "64";
            break;
          case "formFactors":
            result.formFactors = ["Desktop"];
            break;
          case "fullVersionList":
            result.fullVersionList = fullVersionList;
            break;
          case "model":
            result.model = "";
            break;
          case "platformVersion":
            result.platformVersion = "10.0";
            break;
          case "uaFullVersion":
            result.uaFullVersion = fullVersion;
            break;
          case "wow64":
            result.wow64 = true;
            break;
        }
      }

      return result;
    }
  });

  try {
    Object.defineProperty(Navigator.prototype, "userAgentData", {
      configurable: true,
      enumerable: true,
      get: () => fakeUAData
    });
  } catch (_) {
    try {
      Object.defineProperty(navigator, "userAgentData", {
        configurable: true,
        enumerable: true,
        get: () => fakeUAData
      });
    } catch (_) {}
  }
})();
