"serve": {
      "continuous": true,
      "executor": "@angular/build:dev-server",
      "configurations": {
        "production": {
          "buildTarget": "frontend:build:production"
        },
        "development": {
          "buildTarget": "frontend:build:development"
        }
      },
      "defaultConfiguration": "development",
      "dependsOn": ["my-nest-app:serve"],
      "options": {
        "proxyConfig": "apps/frontend/proxy.conf.json"
      }
    },
