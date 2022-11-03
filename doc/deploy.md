# Deploy

## On contract change
1. Go to [remix.ethereum](https://remix.ethereum.org/).
2. Connect to [metamask](https://metamask.io/).
3. Compile source.
4. Publish to a network.
    1. If network is changed update network info under. `assets/contractAssets.json`
5. Update contract hash from. `assets/contractAssets.json`
6. Add contract source to [etherscan](https://etherscan.io/).
7. Update readme contract addresses.

## On frontend change
1. Upload project folder **without the .git folder** to [ipfs](https://ipfs.tech/) from [pinata](https://www.pinata.cloud/).
* GitHub auto deploys for github pages, no change needed.
