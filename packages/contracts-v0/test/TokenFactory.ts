// const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenFactory", function () {
  let factory: any, logicV1: any, logicV2: any, proxy: any;
  let deployer, addr1, addr2;

  beforeEach(async function () {
    [deployer, addr1, addr2] = await ethers.getSigners();

    const LogicV1 = await ethers.getContractFactory("BusinessLogicV1");
    logicV1 = await LogicV1.deploy();
    await logicV1.deployed();

    factory = await ethers.getContractFactory("TokenFactory");

    const tx = await factory.deploy();
    await tx.deployed();

    proxy = await factory.createTokenProxy(logicV1.address);

    const LogicV2 = await ethers.getContractFactory("BusinessLogicV2");
    logicV2 = await LogicV2.deploy();
    await logicV2.deployed();
  });

  it("should set the logic contract to the BusinessLogicV1", async function () {
    const delegate = await ethers.provider.getStorageAt(
      proxy.address,
      2
    ); // slot 2 holds the logic contract address

    expect(delegate).toBe(logicV1.address);
  });

  it("should execute BusinessLogicV1 functions via the proxy", async function () {
    await proxy.setName("My Token");

    const name = await proxy.getName();
    expect(name).toBe("My Token");
  });

  it("should set the logic contract to the BusinessLogicV2", async function () {
    await factory.setTokenLogic(proxy.address, logicV2.address);

    const delegate = await ethers.provider.getStorageAt(
      proxy.address,
      2
    ); // slot 2 holds the logic contract address

    expect(delegate).toBe(logicV2.address);
  });

  it("should execute BusinessLogicV2 functions via the proxy", async function () {
    await factory.setTokenLogic(proxy.address, logicV2.address);

    await proxy.setName("My Token V2");
    await proxy.setSymbol("MT2");

    const name = await proxy.getName();
    const symbol = await proxy.getSymbol();

    expect(name).toBe("My Token V2");
    // expect(erc20TokensCount).to.equal(1);
    expect(symbol).toBe("MT2");

    const totalSupply = await proxy.totalSupply();
    expect(totalSupply).toBe(0);
  });

  it("should inherit BusinessLogicV1 functions when using BusinessLogicV2", async function () {
    await factory.setTokenLogic(proxy.address, logicV2.address);

    await proxy.setName("My Token V2");

    const name = await proxy.getName();
    expect(name).toBe("My Token V2");

    const totalSupply = await proxy.totalSupply();
    expect(totalSupply).toBe(0);
  });
});
