[![CircleCI](https://circleci.com/gh/andela/travel_tool_front.svg?style=svg)](https://circleci.com/gh/andela/travel_tool_front)

# Andela Travel

## Description

**travel_tool_front** is the frontend application for the Andela Travel application which automates travel processes in Andela. This application also helps to collate and manage all travel-related data across Andela's locations.

## Table of Contents

- [Description](#description)
- [Documentation](#documentation)
- [Setup](#setup)
  - [Dependencies](#dependencies)
  - [Getting Started](#getting-started)
- [Testing](#testing)
- [To use Storybook](#to-use-storybook)
- [Contribute](#contribute)
- [Deployment](#deployment)

## Documentation

TODO - when endpoints are ready

## Setup

### Dependencies

List of libraries, tools, etc needed (e.g. yarn, node.js, python, etc)

- [React.js](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Node.js](https://nodejs.org/en/) - A JavaScript runtime environment
- A package manager - [yarn](https://yarnpkg.com/lang/en/) or [NPM](https://www.npmjs.com/)

### Getting Started

- Clone the repo - `git clone https://github.com/andela/travel_tool_front.git`
- Change into the project directory
- Install project dependencies run `make ssh` and then `yarn install`
- Run the server `make start`

## Testing

- Run `make test` on the terminal to run test inside containers

## To use Storybook

- Ensure docker is installed, to install docker click [here](https://www.docker.com/products/docker-desktop)
- Run `make components` docker build command on the terminal to run storybook in the docker development environment server
- On the web browser, type `http://localhost:9001` to access storybook.

## Contribute

Contributions to the project are welcome! Before contributing, look through the branch naming, commit message and pull request conventions [here](https://github.com/andela/engineering-playbook/tree/master/5.%20Developing/Conventions). When you are all done, follow the guidelines below to raise a pull request:

- Identify the feature, chore or bug to be worked on from the [pivotal tracker board](https://www.pivotaltracker.com/n/projects/2184887). If the ticket does not exist on the board, consult the project owners for approval before adding the ticket to the board
- Clone the repository and checkout from `develop` to a new branch to start working on the assigned task. Ensure branch names follow the convention linked above
- Work on the task following the coding standards and [style guide](https://github.com/airbnb/javascript) used in the project
- When task has been completed, make commits and raise a pull request against `develop` branch, also ensure to follow the conventions linked above

If the pull request is accepted by the owners of the repository, then it is merged into the `develop` branch and closed.

## Deployment

TODO - add deployment commands
