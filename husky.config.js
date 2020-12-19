module.exports = {
  hooks: {
    "pre-commit": "npm run lint && CI=true npm run test:coverage"
  }
};
