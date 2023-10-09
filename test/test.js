const cryptoxor = require('@comertial/cryptoxor')

async function main(){
    let test = new cryptoxor();
    let encrypted = test.encryptString('Hello World!', 'EncryptKey');
    let decrypted = test.decryptString(encrypted, 'EncryptKey');
    console.log('Encrypted:');
    console.log(encrypted);
    console.log('Decrypted:');
    console.log(decrypted);

    test.encryptFile('examplefile.txt', 'examplefileEncrypted.txt', ['uz&M!wuI3fkxLGDNrU', '!0PPc7m8TQOo5zgvxLoaew#*7f3Tf17pH^E3Xx6eBxcvi'])
    test.decryptFile('examplefileEncrypted.txt', 'examplefileDecrypted.txt', ['uz&M!wuI3fkxLGDNrU', '!0PPc7m8TQOo5zgvxLoaew#*7f3Tf17pH^E3Xx6eBxcvi'])
}

main().then();