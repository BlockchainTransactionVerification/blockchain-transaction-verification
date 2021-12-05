const ptvAcl = artifacts.require("ptvAcl");

module.exports = function (deployer) {
  deployer.deploy(ptvAcl);
};
