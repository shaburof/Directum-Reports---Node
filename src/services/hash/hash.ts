import crypto from 'crypto';

class Hash {

    public static async hash(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const salt = crypto.randomBytes(16).toString("hex")

            crypto.scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) reject(err);
                return resolve(salt + ":" + derivedKey.toString('hex'))
            });
        })
    };

    public static async verify({ password, hash }: { password: string, hash: string }): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const [salt, key] = hash.split(":")
            crypto.scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) reject(err);
                resolve(key == derivedKey.toString('hex'))
            });
        })
    };

}

export { Hash }