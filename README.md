# Expressing file size in a unit system.

[![npm version](https://badge.fury.io/js/%40saekitominaga%2Ffile-size-format.svg)](https://badge.fury.io/js/%40saekitominaga%2Ffile-size-format)
[![Build Status](https://www.travis-ci.com/SaekiTominaga/file-size-format.svg)](https://www.travis-ci.com/SaekiTominaga/file-size-format)
[![Coverage Status](https://coveralls.io/repos/github/SaekiTominaga/file-size-format/badge.svg)](https://coveralls.io/github/SaekiTominaga/file-size-format)

Expresses the size of a file in human-readable units such as `KiB` or `MB`.

- Supports IEC prefix (Byte, KiB, MiB, ...) and SI prefixes (Byte, kB, MB, ...).
- Support for huge file sizes of `PiB` and above by using `BigInt`.
- The notation can be customized by specifying a few options.

## Examples

```JavaScript
import FileSizeFormat from '@saekitominaga/file-size-format';

FileSizeFormat.iec(1024); // 1KiB
FileSizeFormat.si(1000); // 1kB

FileSizeFormat.iec(512, { byte: 'B' }); // 512B
FileSizeFormat.iec(1280, { digits: 1, space: true }); // 1.3 KiB

FileSizeFormat.iec(1208925819614629174706176n); // 1YiB
FileSizeFormat.iec(BigInt('1208925819614629174706176')); // 1YiB

FileSizeFormat.iec(-1); // RangeError: The file size must be a number greater than or equal to 0
FileSizeFormat.iec(1208925819614629174706176); // RangeError: `BigInt` should be used when specifying huge numbers
```

## Methods

<dl>
<dt><code>static iec(size: number | bigint, options?: Option): string</code></dt>
<dd>Expressed with a binary prefix (Byte, KiB, MiB, ...)</dd>
<dt><code>si(size: number | bigint, options?: Option): string</code></dt>
<dd>Expressed with a SI prefix (Byte, kB, MB, ...)</dd>
</dl>

### Option

```TypeScript
interface Option {
    space?: boolean; // Whether to insert a space between the number and the unit. The default is `false`.
    byte?: string; // Byte notation when the file size is less than 1Kib or 1kB. The default is `'byte'`.
    digits?: number; // Number of digits after the decimal point to round. The default is `0`, and the decimal point is always rounded to an integer. In the case of BigInt, the value specified here has no effect because the language specification does not allow decimals to be expressed.
}
```
