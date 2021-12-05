const ptvAcl = artifacts.require("ptvAcl.sol");

contract("ptvAcl", (accounts) => {
  let hashes = [
    "bafybeigtx2xhieekl3gk7ayjmmhaiwhhhuwjuh3crraem4qgszylfxohga",
    "bafybeib6vz6rkkz7hnokkjopma7c6xoo2qkx2j75rtqx6ovakg46ljbrlu",
    "bafybeidz4uiz3h4w2qitla2b5itrj5f4rfxpslxnmx6fcxnvf3xodlv7ua",
    //"0x7D883C53DDA9E55106405199D8938A83FF94B45F867B001C62E6D921C0AEB205",
    //"0xE5CD8C0E452B65FED3FBE3738AE00C4D5F4BBD7DC5C9F75423573865F4F2B925",
    //"0x6A260C949C31A52BB827FA64566C5384B181F984F6A592F8F162812FBE081ECD",
  ];

  // list accounts test
  it("should return the list of accounts", async () => {
    console.log(accounts);
  });

  // addBlock() test
  it("Should map an IPFS CID to a FileData instance and set owner to accounts[i]", async () => {
    const instance = await ptvAcl.deployed();
    await instance.addBlock(hashes[0]);
    const isOwner = await instance.amIOwner(hashes[0]);
    assert.equal(isOwner, true);
  });

  // addBlockMultiple() test
  it("Should map an IPFS CID to a FileData instance and set owner of each block to accounts[i]", async () => {
    const instance = await ptvAcl.deployed();
    await instance.addBlockMultiple(hashes);
    for (let i = 0; i < hashes.length; i++) {
      const isOwner = await instance.amIOwner(hashes[i]);
      assert.equal(isOwner, true);
    }
  });

  // amIOwner() true test
  it("Should return true if msg.sender is the owner of the file", async () => {
    const instance = await ptvAcl.deployed();
    const value = await instance.amIOwner(hashes[0]);
    assert.equal(value, true);
  });

  // amIOwnerMultiple() test
  it("Should return an array of boolean values, and true if msg.sender is the owner of the file", async () => {
    const instance = await ptvAcl.deployed();
    const values = await instance.amIOwnerMultiple(hashes);
    for (let i = 0; i < values.length; i++) {
      assert.equal(values[i], true);
    }
  });

  // checkAccess() test
  it("Should return true if the passed address is the owner of the passed file, or if they have access to the file", async () => {
    const instance = await ptvAcl.deployed();
    const value = await instance.checkAccess(accounts[0], hashes[0]);
    assert.equal(value, true);
  });

  // checkAccessMultiple() test
  it("Should return a boolean array, true if the passed address is the owner of the passed file, or if they have access to the file", async () => {
    const instance = await ptvAcl.deployed();
    const values = await instance.checkAccessMultiple(accounts[0], hashes);
    for (let i = 0; i < values.length; i++) {
      assert.equal(values[i], true);
    }
  });

  // deleteBlock() test
  it("Should remove all addresses with access, and set owner to address(0)", async () => {
    const instance = await ptvAcl.deployed();
    await instance.addBlock(hashes[2]);
    const isOwner = await instance.amIOwner(hashes[2]);
    assert.equal(isOwner, true);
    await instance.deleteBlock(hashes[2]);
    const hasAccess = await instance.checkAccess(accounts[0], hashes[2]);
    assert.equal(hasAccess, false);
  });

  // deleteBlockMultiple() test
  it("Should remove all addresses with access, and set owner to address(0) for each file", async () => {
    const instance = await ptvAcl.deployed();
    await instance.addBlockMultiple(hashes);
    const isOwnerArr = await instance.amIOwnerMultiple(hashes);
    for (let i = 0; i < isOwnerArr.length; i++) {
      assert.equal(isOwnerArr[i], true);
    }
    await instance.deleteBlockMultiple(hashes);
    const hasAccessArr = await instance.checkAccessMultiple(
      accounts[0],
      hashes
    );
    for (let i = 0; i < hasAccessArr.length; i++) {
      assert.equal(hasAccessArr[i], false);
    }
  });

  // grantAccess() test
  it("Should grant access to the passed file to the address passed", async () => {
    const instance = await ptvAcl.deployed();
    await instance.addBlock(hashes[0]);
    const isOwner = await instance.amIOwner(hashes[0]);
    assert.equal(isOwner, true);
    await instance.grantAccess(accounts[1], hashes[0]);
    const value = await instance.checkAccess(accounts[1], hashes[0]);
    assert.equal(value, true);
  });

  // grantAccessMultiple() test
  it("Should grant access to each passed file to the address passed", async () => {
    const instance = await ptvAcl.deployed();
    await instance.addBlockMultiple(hashes);
    const isOwnerArr = await instance.amIOwnerMultiple(hashes);
    for (let i = 0; i < isOwnerArr.length; i++) {
      assert.equal(isOwnerArr[i], true);
    }
    await instance.grantAccessMultiple(accounts[1], hashes);
    const hasAccessArr = await instance.checkAccessMultiple(
      accounts[1],
      hashes
    );
    for (let i = 0; i < hasAccessArr.length; i++) {
      assert.equal(hasAccessArr[i], true);
    }
  });

  // removeAccess() test
  it("Should remove the input address's access to the passed file", async () => {
    const instance = await ptvAcl.deployed();
    await instance.grantAccess(accounts[1], hashes[0]);
    await instance.removeAccess(accounts[1], hashes[0]);
    const value = await instance.checkAccess(accounts[1], hashes[0]);
    assert.equal(value, false);
    const isOwner = await instance.amIOwner(hashes[0]);
    assert.equal(isOwner, true);
  });

  // removeAccessMultiple() test
  it("Should remove the input address's access to the passed files", async () => {
    const instance = await ptvAcl.deployed();
    await instance.removeAccessMultiple(accounts[1], hashes);
    const hasAccessArr = await instance.checkAccessMultiple(
      accounts[1],
      hashes
    );
    for (let i = 0; i < hasAccessArr.length; i++) {
      assert.equal(hasAccessArr[i], false);
    }
  });
});
