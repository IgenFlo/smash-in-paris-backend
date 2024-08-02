# Notes personnalisées

## Le backend : NestJS 

C'est un backend NestJS (framework de NodeJS).
Nest fonctionne par module, on crée en général un module (*.module.ts) par table en base de données, chaque module contient un service ( *.service.ts ) et un controller ( *.controller.ts ). Le controller spécifie les endpoints (routes) et le service toutes les fonctions qui vont servir à manipuler les données.
Il est possible de générer un module très facilement grâce à des commandes de nest-cli (https://docs.nestjs.com/cli/overview), notamment : `nest generate resource users` qui va créer les fichiers users.module.ts, users.controller.ts, users.service.ts ainsi que d'autres fichiers utiles dans un dossier qui sera aussi nommé users. Le fichier controller contiendra même les principales routes classique (create, update, findOne, findAll, delete), il ne reste plus qu'a les implémenter.

Niveau validation des requêtes, Nest utilise des DTO (Data Transfer Object) : https://docs.nestjs.com/techniques/validation

Nest a un concept particulier de décorateurs, avec beaucoup qui sont déjà créés et mis à disposition par Nest, par exemple le décorateur @Get() mis au-dessus d'une route d'un controller fait en sorte qu'elle soit accessible par la méthode GET. Mais on peut aussi créer les notres totalement personnalisés : https://docs.nestjs.com/custom-decorators

## Gestion de la base de données : Prisma

Le schéma de base données est géré grâce à l'ORM Prisma : https://www.prisma.io/docs.

Prisma peut se connecter à la base de données grâce à la valeur de la variable d'environnement DATABASE_URL à mettre dans un .env à la racine du projet (un exemple est donné dans .env.example).
Ainsi, il est possible de modifier la base de données directement depuis le projet. Pour ce faire, il faut modifier le fichier schema.prisma, une fois la modification faite, pour l'appliquer à la base de données il suffit de lancer la commande `npx prisma migrate dev --name nom_de_la_migration`. Cette commande crée une migration sauvegardée dans le dossier prisma/migrations/. Ainsi, on garde une trace des changements faits sur le schéma de base de données au fil du temps.

C'est également le client Prisma qui va servir à agir sur les tables (créer un user, supprimer une session, ...). Pour cela un fichier client.ts exporte une instance de prisma, il est important d'en garder qu'une seule et donc d'importer cette instance partout où on en aura besoin, notamment dans les fichiers *.service.ts.

Si vous utilisez vscode, le package prisma permet d'ajouter des couleurs et du formattage automatique sur le fichier schema.prisma.

# First collaborators

Flow - https://x.com/FlowXII  
Wtrcld - https://x.com/WtrcldF  
Lidrial - https://x.com/LidrialSSB  
Jukerme - https://x.com/Jukerme  
Seillemar  
GateauLune - https://x.com/gateaulune_  

This project is an open source backend for a website allowing the creation of sessions for players from the smash bro community.

# Doc autogénérée de NestJS

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# start in dev mode (watch file changes and hot reload)
$ yarn run start:dev
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
