module.exports = {
  apps: [
    {
      name: "ProjKevin",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 5000",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};