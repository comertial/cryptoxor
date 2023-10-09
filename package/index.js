const fs = require("fs");

class cryptoxor{
    constructor() {
        this.input = "";
        this.output = "";
        this.keys = [];
        this.inputFile = "";
        this.outputFile = "";
        return this;
    }

    // HELPER METHODS
    _handleInput(options = {}){
        if(!options) return;
        if(options.input) this.input = options.input;
        if(options.output) this.output = options.output;
        if(options.keys) this.keys = typeof options.keys === "string" ? [options.keys] : options.keys;
        if(options.inputFile) this.inputFile = options.inputFile;
        if(options.outputFile) this.outputFile = options.outputFile;
    }

    _xor(input, key) {
        let output;
        key = key.repeat(Math.ceil(input.length/key.length));
        key = key.slice(0,input.length);
        if (Buffer.isBuffer(input)){
            output = input;
            for (let i = 0; i < input.length; i++){
                output[i] = output[i] ^ key.charCodeAt(i);
            }
        } else {
            output = "";
            for (let i = 0; i < input.length; i++){
                output = output + String.fromCharCode(input.charCodeAt(i) ^ key.charCodeAt(i));
            }
        }
        return output;
    }

    _multiLayerEncryptDecrypt(input, keys) {
        this._handleInput({input, keys});
        for (const key of this.keys){
            this.output = this._xor(this.input, key);
        }
        return this.output;
    }

    // USER ACCESSED METHODS
    encryptString(input, keys){
        this._handleInput({input, keys});
        this.output = this._multiLayerEncryptDecrypt(this.input, this.keys);
        return this.output;
    }

    decryptString(input, keys){
        this._handleInput({input, keys});
        this.output = this._multiLayerEncryptDecrypt(this.input, this.keys);
        return this.output;
    }

    encryptFile(inputFile, outputFile, keys) { //`${filename}.enc`
        this._handleInput({inputFile, outputFile, keys});
        if (!this.outputFile.endsWith(".cpxr") && this.outputFile !== "") {
            console.warn(`Incompatible output file: "${this.outputFile}". Renaming to "${this.outputFile}.cpxr"`);
            this.outputFile = `${this.outputFile}.cpxr`;
        }
        this.output = this._multiLayerEncryptDecrypt(fs.readFileSync(this.inputFile), this.keys);
        if (this.outputFile !== "") {
            fs.writeFileSync(this.outputFile, this.output);
        }
        return this.output;
    }

    decryptFile(inputFile, outputFile, keys) {
        this._handleInput({inputFile, outputFile, keys});
        if (!this.inputFile.endsWith(".cpxr")) {
            console.warn(`Incompatible input file: "${this.inputFile}". Renaming to "${this.inputFile}.cpxr"`);
            this.inputFile = `${this.inputFile}.cpxr`;
        }
        this.output = this._multiLayerEncryptDecrypt(fs.readFileSync(this.inputFile), this.keys);
        if (this.outputFile !== "") {
            fs.writeFileSync(this.outputFile, this.output);
        }
        return this.output;
    }
}

module.exports = cryptoxor;