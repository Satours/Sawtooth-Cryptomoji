import * as secp256k1 from 'secp256k1';
import { randomBytes, createHash } from 'crypto';


/**
 * This module is essentially identical to part-one's signing module.
 * Feel free to copy in your solution from there.
 *
 * This function generates a random Secp256k1 private key, returning it as
 * a 64 character hex string.
 */
export const createPrivateKey = () => {
  // Enter your solution here
  let privateKey = null;
  do {
    privateKey = randomBytes(32);
  } while (!secp256k1.privateKeyVerify(privateKey));

return privateKey.toString('hex');
};

/**
 * Takes a hexadecimal private key and returns its public pair as a
 * 66 character hexadecimal string.
 */
export const getPublicKey = privateKey => {
  // Your code here
  let publicKey
	publicKey = secp256k1.publicKeyCreate(Buffer.from(privateKey,'hex'))
	
	return publicKey.toString('hex')
};

/**
 * This convenience function did not exist in part-one's signing module, but
 * should be simple to implement. It creates both private and public keys,
 * returning them in an object with two properties:
 *   - privateKey: the hex private key
 *   - publicKey: the matching hex public key
 *
 * Example:
 *   const keys = createKeys();
 *   console.log(keys);
 *   // {
 *   //   privateKey: 'e291df3eede7f0c520fddbe5e9e53434ff7ef3c0894ed9d9cbc...',
 *   //   publicKey: '0202694593ddc71061e622222ed400f5373cfa7ea607ce106cca...'
 *   // }
 */
export const createKeys = () => {
  // Your code here
  let privKey = createPrivateKey();
  let publicKey = getPublicKey(privKey);
  const keys = {
    privateKey : privKey, 
    publicKey : publicKey
  }
  return keys
};

/**
 * Takes a hex private key and a string message, returning a
 * hexadecimal signature.
 */
export const sign = (privateKey, message) => {
  // Your code here
  // const { signature } = secp256k1.sign(sha256(message), toBytes(privateKey));
  // return signature.toString('hex');

  console.log(message)
	const hash = createHash('sha256');
	if (message)
	{
	   console.log('true')
   	   hash.update(Buffer.from(message))
	   //console.log(hash.digest('hex'))
    }
 	else 
	{
    	   console.log('Error')
  	}
	console.log('Before')
	let msg = Buffer.from(hash.digest('hex'), 'hex')
	//hash.update(privateKey)
	let privKey = Buffer.from(privateKey, 'hex')
	let sigObj = secp256k1.sign(msg, privKey)
	console.log('After')
	let sig = Buffer.toString(sigObj.signature)
	//console.log(sigObj.signature.buffer.toString())
	return sigObj.signature.toString('hex')
};
