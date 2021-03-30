export default class {
    /**
     * Expressed with a IEC prefix (Byte, KiB, MiB, ...)
     *
     * @param {number | bigint} size - File size
     * @param {object} options - Option
     *
     * @returns {string} - File size formatted with a IEC prefix
     */
    static iec(size, options) {
        const optionsInited = this.optionsInit(options);
        const BASE = 1024;
        const UNIT_TABLE = { 1: optionsInited.byte, 2: 'KiB', 3: 'MiB', 4: 'GiB', 5: 'TiB', 6: 'PiB', 7: 'EiB', 8: 'ZiB', 9: 'YiB' };
        return typeof size === 'number' ? this.formatNumber(size, BASE, UNIT_TABLE, optionsInited) : this.formatBigInt(size, BigInt(BASE), UNIT_TABLE, optionsInited);
    }
    /**
     * Expressed with a SI prefix (Byte, kB, MB, ...)
     *
     * @param {number | bigint} size - File size
     * @param {object} options - Option
     *
     * @returns {string} - File size formatted with a SI prefix
     */
    static si(size, options) {
        const optionsInited = this.optionsInit(options);
        const BASE = 1000;
        const UNIT_TABLE = { 1: optionsInited.byte, 2: 'kB', 3: 'MB', 4: 'GB', 5: 'TB', 6: 'PB', 7: 'EB', 8: 'ZB', 9: 'YB' };
        return typeof size === 'number' ? this.formatNumber(size, BASE, UNIT_TABLE, optionsInited) : this.formatBigInt(size, BigInt(BASE), UNIT_TABLE, optionsInited);
    }
    /**
     * オプションの初期処理
     *
     * @param {object} options - オプション
     *
     * @returns {object} - 整形されたファイルサイズ
     */
    static optionsInit(options) {
        /* 値のチェック */
        if (options !== undefined) {
            const roundPrecision = options.digits;
            if (roundPrecision !== undefined) {
                if (!Number.isInteger(roundPrecision) || roundPrecision < 0) {
                    throw new RangeError('The options `digits` must be an integer greater than or equal to 0.');
                }
            }
        }
        /* 初期値の設定 */
        return {
            space: options?.space ?? false,
            byte: options?.byte ?? 'byte',
            digits: options?.digits ?? 0,
        };
    }
    /**
     * Number 型のファイルサイズを整形する
     *
     * @param {number} size - ファイルサイズ
     * @param {number} base - 底
     * @param {object} unitTable - 単位情報
     * @param {object} options - オプション
     *
     * @returns {string} - 整形されたファイルサイズ
     */
    static formatNumber(size, base, unitTable, options) {
        if (Number.isNaN(size) || !Number.isFinite(size) || size < 0) {
            throw new RangeError('The file size must be a number greater than or equal to 0.');
        }
        if (!Number.isSafeInteger(size)) {
            throw new RangeError(`\`BigInt\` should be used when specifying huge numbers (Value greater than ${Number.MAX_SAFE_INTEGER}).`);
        }
        const space = options.space ? ' ' : '';
        const chusu = 10 ** options.digits;
        let format = '';
        for (const [exponentStr, unit] of Object.entries(unitTable)) {
            const exponent = Number(exponentStr); // べき指数
            if (size < base ** exponent) {
                format = `${Math.round((size / base ** (exponent - 1)) * chusu) / chusu}${space}${unit}`;
                break;
            }
        }
        return format;
    }
    /**
     * BigInt 型のファイルサイズを整形する
     *
     * @param {bigint} size - ファイルサイズ
     * @param {bigint} base - 底
     * @param {object} unitTable - 単位情報
     * @param {object} options - オプション
     *
     * @returns {string} - 整形されたファイルサイズ
     */
    static formatBigInt(size, base, unitTable, options) {
        if (size < 0) {
            throw new RangeError('The file size must be a number greater than or equal to 0.');
        }
        const space = options.space ? ' ' : '';
        for (const [exponentStr, unit] of Object.entries(unitTable)) {
            const exponent = BigInt(exponentStr); // べき指数
            if (size < base ** exponent) {
                const denominator = base ** (exponent - 1n);
                return `${(size + denominator / 2n) / denominator}${space}${unit}`;
            }
        }
        /* 1024YiB or 1000YB より大きなサイズの場合 */
        const exponents = Object.keys(unitTable);
        const units = Object.values(unitTable);
        return `${size / base ** (BigInt(exponents[exponents.length - 1]) - 1n)}${space}${units[units.length - 1]}`;
    }
}
//# sourceMappingURL=FileSizeFormat.js.map