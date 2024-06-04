class Hash {
  constructor() {
    this.id = 1;
  }

  encode(str) {
    let encoded = "";
    for (let i = 0; i < str.length; i++) {
      encoded += String.fromCharCode(str.charCodeAt(i) + this.id);
    }
    return encoded;
  }
  decode(encoded) {
    let decoded = "";
    for (let i = 0; i < encoded.length; i++) {
      decoded += String.fromCharCode(encoded.charCodeAt(i) - this.id);
    }
    return decoded;
  }
}
export default Hash;