# Changelog

## 2.0.0

- Marked the library as browser-only for frontend runtimes.
- Added a clear runtime error when navigator is unavailable.
- Fixed Edge detection for EdgiOS, EdgA and modern Edg user-agent tokens.
- Reworked version parsing to avoid NaN on modern user-agent formats.
- Added support for CriOS, FxiOS and OPR user-agent markers.
- Improved iPadOS detection for devices reporting MacIntel with touch support.
- Fixed package entry points for npm and Bower metadata.
- Added automated tests using node --test.