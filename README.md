# Norlys Play Compatibility Fix

Unofficial browser-compatibility extension for Norlys Play.

The extension works around a browser-detection issue where Norlys Play can fail to start protected video in Opera even though the same Chromium/Widevine stack can play the stream when the browser identifies itself as Chrome.

## What it does

Only on `norlysplay.dk`, the extension:

- presents a Chrome-compatible `User-Agent`;
- aligns User-Agent Client Hints such as `Sec-CH-UA`;
- aligns JavaScript values such as `navigator.userAgent` and `navigator.userAgentData`;
- automatically follows the Chromium version used by the installed browser.

It does **not** disable DRM, bypass subscriptions, modify account access, or provide access to content the user is not entitled to watch.

## Privacy

The extension does not collect, store, transmit, sell, or share personal data. It does not contact any server of its own.

See [PRIVACY.md](PRIVACY.md).

## Installation for development

1. Download or clone this repository.
2. Open `opera://extensions`.
3. Enable **Developer mode**.
4. Choose **Load unpacked**.
5. Select the `extension` folder.
6. Close existing Norlys Play tabs and reopen `https://norlysplay.dk`.

## Compatibility

The current implementation is intended for Opera on Windows and was created to address a Norlys Play browser-detection compatibility issue.

Because Norlys Play and Chromium-based browsers can change independently, future updates may require adjustments.

## Disclaimer

This is an independent, unofficial project. It is not affiliated with, endorsed by, or sponsored by Norlys.

“Norlys” and “Norlys Play” are trademarks of their respective owner.

## License

MIT — see [LICENSE](LICENSE).
