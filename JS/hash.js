const privateKey = "654d7c684912a3820fc490638e2ecd36ee4b65d0";
const publicKey = "05d5edfd3e007033ef671fef6037f850";

export function createHash(timeStamp) {
  const myHash = timeStamp + privateKey + publicKey;
  const hashMessage = md5(myHash);
  return hashMessage;
}
