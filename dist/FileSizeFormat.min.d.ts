/**
 * Expressing file size in a unit system.
 */
interface Option {
    space?: boolean;
    byte?: string;
    digits?: number;
}
export default class {
    /**
     * Expressed with a IEC prefix (Byte, KiB, MiB, ...)
     *
     * @param {number | bigint} size - File size
     * @param {object} options - Option
     *
     * @returns {string} - File size formatted with a IEC prefix
     */
    static iec(size: number | bigint, options?: Option): string;
    /**
     * Expressed with a SI prefix (Byte, kB, MB, ...)
     *
     * @param {number | bigint} size - File size
     * @param {object} options - Option
     *
     * @returns {string} - File size formatted with a SI prefix
     */
    static si(size: number | bigint, options?: Option): string;
    /**
     * オプションの初期処理
     *
     * @param {object} options - オプション
     *
     * @returns {object} - 整形されたファイルサイズ
     */
    private static optionsInit;
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
    private static formatNumber;
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
    private static formatBigInt;
}
export {};
//# sourceMappingURL=FileSizeFormat.d.ts.map