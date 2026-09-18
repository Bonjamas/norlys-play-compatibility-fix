const RULE_ID = 4001;

function getChromiumVersion() {
  const ua = navigator.userAgent || "";
  const match = ua.match(/Chrome\/([\d.]+)/);
  return match ? match[1] : "151.0.0.0";
}

function buildRule() {
  const fullVersion = getChromiumVersion();
  const majorVersion = fullVersion.split(".")[0];

  const chromeUserAgent =
    `Mozilla/5.0 (Windows NT 10.0; WOW64) ` +
    `AppleWebKit/537.36 (KHTML, like Gecko) ` +
    `Chrome/${fullVersion} Safari/537.36`;

  const brands =
    `"Not A;Brand";v="99", ` +
    `"Chromium";v="${majorVersion}", ` +
    `"Google Chrome";v="${majorVersion}"`;

  const fullVersionList =
    `"Not A;Brand";v="99.0.0.0", ` +
    `"Chromium";v="${fullVersion}", ` +
    `"Google Chrome";v="${fullVersion}"`;

  return {
    id: RULE_ID,
    priority: 100,
    action: {
      type: "modifyHeaders",
      requestHeaders: [
        { header: "user-agent", operation: "set", value: chromeUserAgent },
        { header: "sec-ch-ua", operation: "set", value: brands },
        { header: "sec-ch-ua-mobile", operation: "set", value: "?0" },
        { header: "sec-ch-ua-platform", operation: "set", value: "\"Windows\"" },
        { header: "sec-ch-ua-arch", operation: "set", value: "\"x86\"" },
        { header: "sec-ch-ua-platform-version", operation: "set", value: "\"10.0\"" },
        { header: "sec-ch-ua-full-version", operation: "set", value: `\"${fullVersion}\"` },
        { header: "sec-ch-ua-full-version-list", operation: "set", value: fullVersionList },
        { header: "sec-ch-ua-model", operation: "set", value: "\"\"" }
      ]
    },
    condition: {
      requestDomains: ["norlysplay.dk"]
    }
  };
}

async function installRules() {
  try {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [RULE_ID],
      addRules: [buildRule()]
    });
  } catch (error) {
    console.error("Norlys Play Compatibility Fix:", error);
  }
}

chrome.runtime.onInstalled.addListener(installRules);
chrome.runtime.onStartup.addListener(installRules);

// Also install/update the rule whenever the service worker starts.
installRules();
