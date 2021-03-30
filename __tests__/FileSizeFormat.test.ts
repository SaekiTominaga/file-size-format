import FileSizeFormat from '../src/FileSizeFormat';

describe('2進接頭辞', () => {
	test('Byte - min', () => {
		expect(FileSizeFormat.iec(0)).toBe('0byte');
	});
	test('Byte - max', () => {
		expect(FileSizeFormat.iec(1024 ** 1 - 1)).toBe('1023byte');
	});
	test('KiB - min', () => {
		expect(FileSizeFormat.iec(1024 ** 1)).toBe('1KiB');
	});
	test('KiB - max', () => {
		expect(FileSizeFormat.iec(1024 ** 2 - 1)).toBe('1024KiB');
	});
	test('MiB - min', () => {
		expect(FileSizeFormat.iec(1024 ** 2)).toBe('1MiB');
	});
	test('MiB - max', () => {
		expect(FileSizeFormat.iec(1024 ** 3 - 1)).toBe('1024MiB');
	});
	test('GiB - min', () => {
		expect(FileSizeFormat.iec(1024 ** 3)).toBe('1GiB');
	});
	test('GiB - max', () => {
		expect(FileSizeFormat.iec(1024 ** 4 - 1)).toBe('1024GiB');
	});
	test('TiB - min', () => {
		expect(FileSizeFormat.iec(1024 ** 4)).toBe('1TiB');
	});
	test('TiB - max', () => {
		expect(FileSizeFormat.iec(1024 ** 5 - 1)).toBe('1024TiB');
	});
	test('PiB - min', () => {
		expect(FileSizeFormat.iec(1024 ** 5)).toBe('1PiB');
	});
	test('PiB - max', () => {
		expect(FileSizeFormat.iec(BigInt('1152921504606846975'))).toBe('1024PiB');
	});
	test('EiB - min', () => {
		expect(FileSizeFormat.iec(BigInt('1152921504606846976'))).toBe('1EiB');
	});
	test('EiB - max', () => {
		expect(FileSizeFormat.iec(BigInt('1180591620717411303423'))).toBe('1024EiB');
	});
	test('ZiB - min', () => {
		expect(FileSizeFormat.iec(BigInt('1180591620717411303424'))).toBe('1ZiB');
	});
	test('ZiB - max', () => {
		expect(FileSizeFormat.iec(BigInt('1208925819614629174706175'))).toBe('1024ZiB');
	});
	test('YiB - min', () => {
		expect(FileSizeFormat.iec(BigInt('1208925819614629174706176'))).toBe('1YiB');
	});
	test('YiB - max', () => {
		expect(FileSizeFormat.iec(BigInt('1237940039285380274899124223'))).toBe('1024YiB');
	});
	test('YiB - over', () => {
		expect(FileSizeFormat.iec(BigInt('1237940039285380274899124224'))).toBe('1024YiB');
	});
});

describe('SI接頭辞', () => {
	test('Byte - min', () => {
		expect(FileSizeFormat.si(0)).toBe('0byte');
	});
	test('Byte - max', () => {
		expect(FileSizeFormat.si(1000 ** 1 - 1)).toBe('999byte');
	});
	test('KB - min', () => {
		expect(FileSizeFormat.si(1000 ** 1)).toBe('1kB');
	});
	test('KB - max', () => {
		expect(FileSizeFormat.si(1000 ** 2 - 1)).toBe('1000kB');
	});
	test('MB - min', () => {
		expect(FileSizeFormat.si(1000 ** 2)).toBe('1MB');
	});
	test('MB - max', () => {
		expect(FileSizeFormat.si(1000 ** 3 - 1)).toBe('1000MB');
	});
	test('GB - min', () => {
		expect(FileSizeFormat.si(1000 ** 3)).toBe('1GB');
	});
	test('GB - max', () => {
		expect(FileSizeFormat.si(1000 ** 4 - 1)).toBe('1000GB');
	});
	test('TB - min', () => {
		expect(FileSizeFormat.si(1000 ** 4)).toBe('1TB');
	});
	test('TB - max', () => {
		expect(FileSizeFormat.si(1000 ** 5 - 1)).toBe('1000TB');
	});
	test('PB - min', () => {
		expect(FileSizeFormat.si(1000 ** 5)).toBe('1PB');
	});
	test('PB - max', () => {
		expect(FileSizeFormat.si(BigInt('999999999999999999'))).toBe('1000PB');
	});
	test('EB - min', () => {
		expect(FileSizeFormat.si(BigInt('1000000000000000000'))).toBe('1EB');
	});
	test('EB - max', () => {
		expect(FileSizeFormat.si(BigInt('999999999999999999999'))).toBe('1000EB');
	});
	test('ZB - min', () => {
		expect(FileSizeFormat.si(BigInt('1000000000000000000000'))).toBe('1ZB');
	});
	test('ZB - max', () => {
		expect(FileSizeFormat.si(BigInt('999999999999999999999999'))).toBe('1000ZB');
	});
	test('YB - min', () => {
		expect(FileSizeFormat.si(BigInt('1000000000000000000000000'))).toBe('1YB');
	});
	test('YB - max', () => {
		expect(FileSizeFormat.si(BigInt('999999999999999999999999999'))).toBe('1000YB');
	});
	test('YB - over', () => {
		expect(FileSizeFormat.si(BigInt('1000000000000000000000000000'))).toBe('1000YB');
	});
});

describe('オプション', () => {
	test('byte (IEC・Number)', () => {
		expect(FileSizeFormat.iec(512, { byte: 'B' })).toBe('512B');
	});
	test('byte (SI・BigInt)', () => {
		expect(FileSizeFormat.si(BigInt(512), { byte: 'B' })).toBe('512B');
	});
	test('space (IEC・Number)', () => {
		expect(FileSizeFormat.iec(1024, { space: true })).toBe('1 KiB');
	});
	test('space (SI・BigInt)', () => {
		expect(FileSizeFormat.si(BigInt(1024), { space: true })).toBe('1 kB');
	});
	test('digits (IEC・Number)', () => {
		expect(FileSizeFormat.iec(1280, { digits: 1 })).toBe('1.3KiB');
	});
	test('digits (IEC・Number)', () => {
		expect(FileSizeFormat.iec(1280, { digits: 3 })).toBe('1.25KiB');
	});
	test('digits (SI・BigInt)', () => {
		expect(FileSizeFormat.si(BigInt(1280), { digits: 2 })).toBe('1kB'); // BigInt なので効果なし
	});
	test('digits (小数)', () => {
		expect(() => {
			FileSizeFormat.iec(0, { digits: 1.1 });
		}).toThrow('The options `digits` must be an integer greater than or equal to 0.');
	});
	test('digits (マイナスの値)', () => {
		expect(() => {
			FileSizeFormat.iec(0, { digits: -1 });
		}).toThrow('The options `digits` must be an integer greater than or equal to 0.');
	});
});

describe('不正な値', () => {
	test('マイナス (Number)', () => {
		expect(() => {
			FileSizeFormat.iec(-1);
		}).toThrow('The file size must be a number greater than or equal to 0.');
	});
	test('マイナス (BigInt)', () => {
		expect(() => {
			FileSizeFormat.iec(BigInt(-1));
		}).toThrow('The file size must be a number greater than or equal to 0.');
	});
	test('NaN', () => {
		expect(() => {
			FileSizeFormat.iec(NaN);
		}).toThrow('The file size must be a number greater than or equal to 0.');
	});
	test('Infinity', () => {
		expect(() => {
			FileSizeFormat.iec(Infinity);
		}).toThrow('The file size must be a number greater than or equal to 0.');
	});
	test('unsafe', () => {
		expect(() => {
			FileSizeFormat.iec(9007199254740992);
		}).toThrow('`BigInt` should be used when specifying huge numbers (Value greater than 9007199254740991).');
	});
});
