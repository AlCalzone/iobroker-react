/**
 * Encrypts a string.
 */
export function encrypt(secret: string, value: string): string {
	let result = "";
	for (let i = 0; i < value.length; i++) {
		result += String.fromCharCode(
			secret[i % secret.length].charCodeAt(0) ^ value.charCodeAt(i),
		);
	}
	return result;
}

/**
 * Decrypts a string.
 */
export function decrypt(secret: string, value: string): string {
	let result = "";
	for (let i = 0; i < value.length; i++) {
		result += String.fromCharCode(
			secret[i % secret.length].charCodeAt(0) ^ value.charCodeAt(i),
		);
	}
	return result;
}
