async function main() {
  // We get the contract to deploy
  const Token = await ethers.getContractFactory("Token");
  token = await Token.deploy("Best", "BES", (10 ** 18).toString());
  await token.deployed();
  console.log("Exchange deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
